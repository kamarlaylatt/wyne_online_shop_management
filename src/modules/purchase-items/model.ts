import { t } from "elysia"

export const PurchaseItemCreateBody = t.Object({
    name: t.String(),
    totalPrice: t.Number(),
    quantity: t.Integer(),
    supplierId: t.String(),
})

export const PurchaseItemUpdateBody = t.Object({
    name: t.Optional(t.String()),
    totalPrice: t.Optional(t.Number()),
    quantity: t.Optional(t.Integer()),
    supplierId: t.Optional(t.String()),
})

export const IdParams = t.Object({ id: t.String() })
