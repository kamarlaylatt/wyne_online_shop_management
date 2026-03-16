import { prisma } from "../../../lib/prisma"
import { OrderStatus, PaymentStatus } from "../../../generated/prisma/client"

type OrderItemInput = { purchaseItemId: string; quantity: number; unitPrice: number }
type CustomerInput = { name: string; phone?: string; address?: string }

interface OrderFilters {
    page?: number
    limit?: number
    id?: string
    customerId?: string
    status?: OrderStatus
    paymentStatus?: PaymentStatus
    fromCreatedAt?: string
    toCreatedAt?: string
}

export abstract class OrderService {
    static async getAll(page = 1, limit = 20, filters: OrderFilters = {}) {
        const skip = (page - 1) * limit

        const where: any = {}
        if (filters.id) where.id = filters.id
        if (filters.customerId) where.customerId = filters.customerId
        if (filters.status) where.status = filters.status
        if (filters.paymentStatus) where.paymentStatus = filters.paymentStatus

        if (filters.fromCreatedAt || filters.toCreatedAt) {
            where.createdAt = {}
            if (filters.fromCreatedAt) where.createdAt.gte = new Date(filters.fromCreatedAt)
            if (filters.toCreatedAt) where.createdAt.lte = new Date(filters.toCreatedAt)
        }

        const [data, total] = await Promise.all([
            prisma.order.findMany({
                where,
                include: {
                    customer: { select: { id: true, name: true } },
                    orderItems: { include: { purchaseItem: { select: { id: true, name: true } } } }
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.order.count({ where }),
        ])
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
    }

    static async getById(id: string) {
        return prisma.order.findUnique({
            where: { id },
            include: {
                customer: { select: { id: true, name: true, phone: true, address: true } },
                orderItems: { include: { purchaseItem: { select: { id: true, name: true } } } }
            }
        })
    }

    static async create(data: {
        customerId?: string
        customer?: CustomerInput
        items: OrderItemInput[]
        status?: OrderStatus
        paymentStatus?: PaymentStatus
    }) {
        if (!data.customerId && !data.customer) {
            throw new Error("Either customerId or customer must be provided")
        }

        const totalPrice = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

        return prisma.$transaction(async (tx) => {
            const customerId = data.customerId
                ?? (await tx.customer.create({ data: data.customer! })).id

            const order = await tx.order.create({
                data: {
                    customerId,
                    totalPrice,
                    status: data.status,
                    paymentStatus: data.paymentStatus,
                    orderItems: {
                        create: data.items.map((item) => ({
                            purchaseItemId: item.purchaseItemId,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                        })),
                    },
                },
                include: {
                    customer: { select: { id: true, name: true, phone: true, address: true } },
                    orderItems: { include: { purchaseItem: { select: { id: true, name: true } } } },
                },
            })

            return order
        })
    }

    static async update(id: string, data: {
        status?: OrderStatus
        paymentStatus?: PaymentStatus
        totalPrice?: number
        items?: OrderItemInput[]
    }) {
        if (data.items) {
            const totalPrice = data.totalPrice
                ?? data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

            return prisma.$transaction(async (tx) => {
                await tx.orderItem.deleteMany({ where: { orderId: id } })
                return tx.order.update({
                    where: { id },
                    data: {
                        status: data.status,
                        paymentStatus: data.paymentStatus,
                        totalPrice,
                        orderItems: {
                            create: data.items!.map((item) => ({
                                purchaseItemId: item.purchaseItemId,
                                quantity: item.quantity,
                                unitPrice: item.unitPrice,
                            })),
                        },
                    },
                    include: {
                        customer: { select: { id: true, name: true, phone: true, address: true } },
                        orderItems: { include: { purchaseItem: { select: { id: true, name: true } } } },
                    },
                })
            })
        }

        return prisma.order.update({ where: { id }, data: {
            status: data.status,
            paymentStatus: data.paymentStatus,
            totalPrice: data.totalPrice,
        }})
    }

    static async delete(id: string) {
        return prisma.order.delete({ where: { id } })
    }

    static async preload() {
        const [purchaseItems, customers] = await Promise.all([
            prisma.purchaseItem.findMany({
                select: {
                    id: true,
                    name: true,
                    totalPrice: true,
                    quantity: true,
                    sellPerPrice: true,
                    supplier: { select: { id: true, name: true } },
                    _count: { select: { orderItems: true } },
                },
                orderBy: { createdAt: "desc" },
            }),
            prisma.customer.findMany({
                select: { id: true, name: true, phone: true, address: true },
                orderBy: { createdAt: "desc" },
            }),
        ])
        return { purchaseItems, customers }
    }
}
