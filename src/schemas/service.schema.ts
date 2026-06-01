import * as z from "zod";

export const ServiceSchema = z.object({
  name: z.string(),
  price: z.number(),
  active: z.boolean(),
  description: z.string(),
});
