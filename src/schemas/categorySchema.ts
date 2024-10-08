import * as z from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(3).max(50),
});
