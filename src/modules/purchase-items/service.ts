import { prisma } from "../../../lib/prisma"

export abstract class PurchaseItemService {
    static async getAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit
        const [data, total] = await Promise.all([
            prisma.purchaseItem.findMany({
                include: { supplier: { select: { id: true, name: true } } },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.purchaseItem.count(),
        ])
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
    }

    static async getById(id: string) {
        return prisma.purchaseItem.findUnique({
            where: { id },
            include: { supplier: { select: { id: true, name: true } } }
        })
    }

    static async create(data: { name: string; totalPrice: number; quantity: number; supplierId: string; purchaseDate: Date }) {
        return prisma.purchaseItem.create({ data })
    }

    static async update(id: string, data: { name?: string; totalPrice?: number; quantity?: number; supplierId?: string; purchaseDate?: Date }) {
        return prisma.purchaseItem.update({ where: { id }, data })
    }

    static async delete(id: string) {
        return prisma.purchaseItem.delete({ where: { id } })
    }
}
