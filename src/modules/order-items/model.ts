import { t } from "elysia"

export const OrderItemCreateBody = t.Object({
    orderId: t.String(),
    purchaseItemId: t.String(),
    quantity: t.Integer(),
    unitPrice: t.Number(),
})

export const OrderItemUpdateBody = t.Object({
    quantity: t.Optional(t.Integer()),
    unitPrice: t.Optional(t.Number()),
})

export const IdParams = t.Object({ id: t.String() })

export const OrderIdQuery = t.Object({ orderId: t.String() })
