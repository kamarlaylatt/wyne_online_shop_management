import { t } from "elysia"

export const PurchaseItemCreateBody = t.Object({
    name: t.String(),
    totalPrice: t.Number(),
    quantity: t.Integer(),
    supplierId: t.String(),
    purchaseDate: t.String({ format: "date-time" }),
    sellPerPrice: t.Optional(t.Number()),
})

export const PurchaseItemUpdateBody = t.Object({
    name: t.Optional(t.String()),
    totalPrice: t.Optional(t.Number()),
    quantity: t.Optional(t.Integer()),
    supplierId: t.Optional(t.String()),
    purchaseDate: t.Optional(t.String({ format: "date-time" })),
    sellPerPrice: t.Optional(t.Number()),
})

export const IdParams = t.Object({ id: t.String() })

export const PaginationQuery = t.Object({
    page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100, default: 20 })),
})
