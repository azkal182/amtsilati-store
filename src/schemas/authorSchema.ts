import * as z from "zod";

export const CreateAuthorSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
});
