import { prisma } from "../lib/prisma";
import { ServiceSchema } from "../schemas/service.schema";
import { Service } from "../schemas/types/types";

export async function checkServiceValidity(service: Service) {
  const validated = ServiceSchema.parse(service);

  const count = await prisma.service.count({
    where: {
      name: validated.name,
    },
  });

  return count === 0;
}
