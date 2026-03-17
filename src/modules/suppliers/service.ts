import { prisma } from "../../../lib/prisma.js"

export abstract class SupplierService {
    static async getAll() {
        return prisma.supplier.findMany({
            include: { _count: { select: { purchaseItems: true } } },
            orderBy: { createdAt: "desc" }
        })
    }

    static async getById(id: string) {
        return prisma.supplier.findUnique({ where: { id } })
    }

    static async create(data: { name: string; phone?: string; email?: string }) {
        return prisma.supplier.create({ data })
    }

    static async update(id: string, data: { name?: string; phone?: string; email?: string }) {
        return prisma.supplier.update({ where: { id }, data })
    }

    static async delete(id: string) {
        return prisma.supplier.delete({ where: { id } })
    }
}
