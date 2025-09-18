import { z } from 'astro:schema';

export const InitPoint = z.object({
  lon: z.coerce.number(),
  lat: z.coerce.number(),
  z: z.coerce.number()
});
export type InitPoint = z.infer<typeof InitPoint>;
