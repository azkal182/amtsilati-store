"use server";
import { db } from "@/lib/db";
import { CreateBookSchema } from "@/schemas/bookSchema";
import { revalidateTag } from "next/cache";
import * as z from "zod";

const createBook = async (values: z.infer<typeof CreateBookSchema>) => {
  const validated = CreateBookSchema.safeParse(values);
  if (!validated.success) {
    console.log(JSON.stringify(validated.error, null, 2));

    return { error: "invalid fields" };
  }

  const {
    title,
    authorId,
    categoryId,
    description,
    image,
    long,
    price,
    publisherId,
    total_page,
    width,
    isbn,
  } = validated.data;

  try {
    const book = await db.book.create({
      data: {
        title,
        description,
        image,
        long,
        price,
        total_page,
        width,
        author: { connect: { id: authorId } },
        category: { connect: { id: categoryId } },
        publisher: { connect: { id: publisherId } },
        ...(isbn && { isbn }),
      },
    });

    revalidateTag("book");
    return { message: "author created", data: book };
  } catch (error: any) {
    console.log(error);

    throw new Error("create author failed", error);
  }
};

const getAllBook = async () => {
  const books = await db.book.findMany({
    include: {
      author: true,
      category: true,
      publisher: true,
    },
  });
  return books;
};

const findBookByName = async (title: string) => {
  const books = await db.book.findMany({ where: { title } });
  return books;
};

export { createBook, getAllBook, findBookByName };
