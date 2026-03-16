import { Elysia } from "elysia"
import { DashboardService } from "./service"

export const dashboardController = new Elysia({ prefix: "/api/admin/dashboard" })
    // @ts-ignore - auth macro registered in parent route
    .get("/", () => DashboardService.getStats(), { auth: true })
