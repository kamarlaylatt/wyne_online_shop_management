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

export const OrderCreateBody = t.Object({
    customerId: t.String(),
    status: t.Optional(OrderStatusEnum),
    paymentStatus: t.Optional(PaymentStatusEnum),
})

export const OrderUpdateBody = t.Object({
    status: t.Optional(OrderStatusEnum),
    paymentStatus: t.Optional(PaymentStatusEnum),
    totalPrice: t.Optional(t.Number()),
})

export const IdParams = t.Object({ id: t.String() })
