import { t } from "elysia"

export const CustomerCreateBody = t.Object({
    name: t.String(),
    phone: t.Optional(t.String()),
    address: t.Optional(t.String()),
})

export const CustomerUpdateBody = t.Object({
    name: t.Optional(t.String()),
    phone: t.Optional(t.String()),
    address: t.Optional(t.String()),
})

export const IdParams = t.Object({ id: t.String() })
