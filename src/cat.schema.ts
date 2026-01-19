import z from "zod";

export const createCatSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;
