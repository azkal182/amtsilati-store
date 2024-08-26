"use server";
import { db } from "@/lib/db";
import { CreateCategorySchema } from "@/schemas/categorySchema";
import { revalidateTag } from "next/cache";
import * as z from "zod";

const createCAtegory = async (values: z.infer<typeof CreateCategorySchema>) => {
  const validated = CreateCategorySchema.safeParse(values);
  if (!validated.success) {
    return { error: "invalid fields" };
  }

  const { name } = validated.data;

  try {
    const category = await db.category.create({
      data: { name },
    });
    revalidateTag("category");
    return { message: "category created", data: category };
  } catch (error: any) {
    throw new Error("create category failed", error.message);
  }
};

const getAllCategory = async () => {
  const categories = await db.category.findMany();
  return categories;
};

const findCategoryByName = async (name: string) => {
  const categories = await db.category.findMany({ where: { name } });
  if (categories.length === 0) {
    throw new Error("author not found");
  }
  return categories;
};

export { createCAtegory, getAllCategory, findCategoryByName };
