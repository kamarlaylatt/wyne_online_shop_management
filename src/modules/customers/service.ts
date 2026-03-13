import { prisma } from "../../../lib/prisma"

export abstract class CustomerService {
    static async getAll() {
        return prisma.customer.findMany({ orderBy: { createdAt: "desc" } })
    }

    static async getById(id: string) {
        return prisma.customer.findUnique({ where: { id } })
    }

    static async create(data: { name: string; phone?: string; address?: string }) {
        return prisma.customer.create({ data })
    }

    static async update(id: string, data: { name?: string; phone?: string; address?: string }) {
        return prisma.customer.update({ where: { id }, data })
    }

    static async delete(id: string) {
        return prisma.customer.delete({ where: { id } })
    }
}
