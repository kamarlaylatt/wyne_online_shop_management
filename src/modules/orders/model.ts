import { t } from "elysia"

const OrderStatusEnum = t.Union([
    t.Literal("PENDING"),
    t.Literal("PROCESSING"),
    t.Literal("COMPLETED"),
    t.Literal("CANCELLED"),
])

const PaymentStatusEnum = t.Union([
    t.Literal("UNPAID"),
    t.Literal("PAID"),
    t.Literal("REFUNDED"),
])

const CustomerInlineSchema = t.Object({
    name: t.String(),
    phone: t.Optional(t.String()),
    address: t.Optional(t.String()),
})

const OrderItemInlineSchema = t.Object({
    purchaseItemId: t.String(),
    quantity: t.Number(),
    unitPrice: t.Number(),
})

export const OrderCreateBody = t.Object({
    customerId: t.Optional(t.String()),
    customer: t.Optional(CustomerInlineSchema),
    items: t.Array(OrderItemInlineSchema, { minItems: 1 }),
    status: t.Optional(OrderStatusEnum),
    paymentStatus: t.Optional(PaymentStatusEnum),
})

export const OrderUpdateBody = t.Object({
    status: t.Optional(OrderStatusEnum),
    paymentStatus: t.Optional(PaymentStatusEnum),
    totalPrice: t.Optional(t.Number()),
    items: t.Optional(t.Array(OrderItemInlineSchema, { minItems: 1 })),
})

export const IdParams = t.Object({ id: t.String() })

export const PaginationQuery = t.Object({
    page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100, default: 20 })),
})
