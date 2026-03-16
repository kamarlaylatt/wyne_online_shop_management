import { prisma } from "../../../lib/prisma"

export abstract class PurchaseItemService {
    static async getAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit
        const [data, total, orderItemSums] = await Promise.all([
            prisma.purchaseItem.findMany({
                include: {
                    supplier: { select: { id: true, name: true } },
                    _count: { select: { orderItems: true } },
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.purchaseItem.count(),
            prisma.orderItem.groupBy({
                by: ["purchaseItemId"],
                _sum: { quantity: true },
            }),
        ])
        const sumMap = new Map(orderItemSums.map(s => [s.purchaseItemId, s._sum.quantity ?? 0]))
        const enriched = data.map(item => ({ ...item, orderItemsQuantity: sumMap.get(item.id) ?? 0 }))
        return { data: enriched, total, page, limit, totalPages: Math.ceil(total / limit) }
    }

    static async getById(id: string) {
        const [item, orderItemSum] = await Promise.all([
            prisma.purchaseItem.findUnique({
                where: { id },
                include: {
                    supplier: { select: { id: true, name: true } },
                    _count: { select: { orderItems: true } },
                },
            }),
            prisma.orderItem.aggregate({
                where: { purchaseItemId: id },
                _sum: { quantity: true },
            }),
        ])
        if (!item) return null
        return { ...item, orderItemsQuantity: orderItemSum._sum.quantity ?? 0 }
    }

    static async create(data: { name: string; totalPrice: number; quantity: number; supplierId: string; purchaseDate: string; sellPerPrice?: number }) {
        return prisma.purchaseItem.create({ data: { ...data, purchaseDate: new Date(data.purchaseDate) } })
    }

    static async update(id: string, data: { name?: string; totalPrice?: number; quantity?: number; supplierId?: string; purchaseDate?: string; sellPerPrice?: number }) {
        return prisma.purchaseItem.update({ where: { id }, data: { ...data, purchaseDate: data.purchaseDate ? new Date(data.purchaseDate) : undefined } })
    }

    static async delete(id: string) {
        return prisma.purchaseItem.delete({ where: { id } })
    }
}
