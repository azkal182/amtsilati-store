"use server";
import { db } from "@/lib/db";
import { CreateAuthorSchema } from "@/schemas/authorSchema";
import { revalidateTag } from "next/cache";
import * as z from "zod";

const createAuthor = async (values: z.infer<typeof CreateAuthorSchema>) => {
  const validated = CreateAuthorSchema.safeParse(values);
  if (!validated.success) {
    return { error: "invalid fields" };
  }

  const { name } = validated.data;

  try {
    const author = await db.author.create({
      data: { name },
    });
    revalidateTag("author");
    return { message: "author created", data: author };
  } catch (error: any) {
    throw new Error("create author failed", error.message);
  }
};

const getAllAuthor = async () => {
  const authors = await db.author.findMany();
  return authors;
};

const findAuthorByName = async (name: string) => {
  const authors = await db.author.findMany({ where: { name } });
  if (authors.length === 0) {
    throw new Error("author not found");
  }
  return authors;
};

export { createAuthor, getAllAuthor, findAuthorByName };
