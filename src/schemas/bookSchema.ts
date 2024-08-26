import * as z from "zod";

export const CreateBookSchema = z.object({
  title: z.string().min(3).max(50),
  authorId: z.string().min(1),
  publisherId: z.string().min(1),
  categoryId: z.string().min(1),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .refine((val) => !isNaN(val), { message: "Must be a number" }),
  description: z.string().min(1),
  total_page: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .refine((val) => !isNaN(val), { message: "Must be a number" }),
  width: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .refine((val) => !isNaN(val), { message: "Must be a number" }),
  long: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .refine((val) => !isNaN(val), { message: "Must be a number" }),
  image: z.string().min(1),
  isbn: z.string().optional(),
});
