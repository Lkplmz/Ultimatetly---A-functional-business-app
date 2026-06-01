import { prisma } from "../lib/prisma";

// src/services/business.service.ts
export async function getBusinessSettings() {
  return await prisma.businessConfig.upsert({
    where: { id: "SETTINGS" },
    update: {}, // No hace nada si ya existe
    create: {
      id: "SETTINGS",
      businessName: "Mi Empresa",
      operatingHours: {
        /* default hours */
      },
      totalRevenue: 0,
      contactEmail: "lkplmz@gmail.com",
      currency: "USD",
    },
  });
}
