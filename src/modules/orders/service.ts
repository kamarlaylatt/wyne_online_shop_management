import { prisma } from "../../../lib/prisma"
import { OrderStatus, PaymentStatus } from "../../../../generated/prisma/client"

export abstract class OrderService {
    static async getAll() {
        return prisma.order.findMany({
            include: {
                customer: { select: { id: true, name: true } },
                orderItems: { include: { purchaseItem: { select: { id: true, name: true } } } }
            },
            orderBy: { createdAt: "desc" }
        })
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

    static async create(data: { customerId: string; status?: OrderStatus; paymentStatus?: PaymentStatus }) {
        return prisma.order.create({ data })
    }

    static async update(id: string, data: { status?: OrderStatus; paymentStatus?: PaymentStatus; totalPrice?: number }) {
        return prisma.order.update({ where: { id }, data })
    }

    static async delete(id: string) {
        return prisma.order.delete({ where: { id } })
    }
}
