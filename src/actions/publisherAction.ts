"use server";
import { db } from "@/lib/db";
import { CreatePublisherSchema } from "@/schemas/publisherSchema";
import { revalidateTag } from "next/cache";

import * as z from "zod";

const createPublisher = async (
  values: z.infer<typeof CreatePublisherSchema>
) => {
  const validated = CreatePublisherSchema.safeParse(values);
  if (!validated.success) {
    return { error: "invalid fields" };
  }

  const { name } = validated.data;

  try {
    const publisher = await db.publisher.create({
      data: { name },
    });
    revalidateTag("publisher");
    return { message: "publisher created", data: publisher };
  } catch (error: any) {
    throw new Error("create publisher failed", error.message);
  }
};

const getAllPublisher = async () => {
  const publishers = await db.publisher.findMany();
  return publishers;
};

const findPublisherByName = async (name: string) => {
  const publisher = await db.publisher.findMany({ where: { name } });
  if (publisher.length === 0) {
    throw new Error("author not found");
  }
  return publisher;
};

export { createPublisher, getAllPublisher, findPublisherByName };
