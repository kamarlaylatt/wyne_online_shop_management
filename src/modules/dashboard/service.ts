import { prisma } from "../../../lib/prisma.js"

export abstract class DashboardService {
    static async getStats() {
        const [totalOrders, totalPaidOrders, totalPurchaseItems, totalCustomers] = await Promise.all([
            prisma.order.count(),
            prisma.order.count({ where: { paymentStatus: "PAID" } }),
            prisma.purchaseItem.count(),
            prisma.customer.count(),
        ])

        return {
            total_orders: totalOrders,
            total_paid_orders: totalPaidOrders,
            total_purchase_items: totalPurchaseItems,
            total_customers: totalCustomers,
        }
    }
}
