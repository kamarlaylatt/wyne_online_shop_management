import { prisma } from "../../../lib/prisma.js"

export abstract class OrderItemService {
    static async getByOrderId(orderId: string) {
        return prisma.orderItem.findMany({
            where: { orderId },
            include: { purchaseItem: { select: { id: true, name: true } } },
            orderBy: { createdAt: "asc" }
        })
    }

    static async getById(id: string) {
        return prisma.orderItem.findUnique({
            where: { id },
            include: { purchaseItem: { select: { id: true, name: true } } }
        })
    }

    static async create(data: { orderId: string; purchaseItemId: string; quantity: number; unitPrice: number }) {
        return prisma.orderItem.create({ data })
    }

    static async update(id: string, data: { quantity?: number; unitPrice?: number }) {
        return prisma.orderItem.update({ where: { id }, data })
    }

    static async delete(id: string) {
        return prisma.orderItem.delete({ where: { id } })
    }
}
