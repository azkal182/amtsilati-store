import * as z from "zod";

export const CreatePublisherSchema = z.object({
  name: z.string().min(3).max(50),
});
