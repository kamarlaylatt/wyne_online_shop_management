import { t } from "elysia"

export const SupplierCreateBody = t.Object({
    name: t.String(),
    phone: t.Optional(t.String()),
    email: t.Optional(t.String()),
})

export const SupplierUpdateBody = t.Object({
    name: t.Optional(t.String()),
    phone: t.Optional(t.String()),
    email: t.Optional(t.String()),
})

export const IdParams = t.Object({ id: t.String() })
