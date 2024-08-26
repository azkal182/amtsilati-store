import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@nextui-org/card";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import React from "react";

type BookWithAuthor = Prisma.BookGetPayload<{
  include: {
    author: true;
    category: true;
    publisher: true;
  };
}>;

const Box = ({ books }: { books: BookWithAuthor[] }) => {
  return (
    <ScrollArea className="scrollbar-hide">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  gap-4 m-2">
        {books.map((book) => (
          <Card key={book.id} className="p-3">
            <div className="w-full h-44 md:h-56 border grow-0">
              <Image
                className="w-full h-full"
                //   @ts-ignore
                src={book.image}
                width={80}
                height={20}
              />
               
            </div>
            <div className="capitalize text-xs text-slate-500 mt-0.5">
              {book.author.name}
            </div>
            <div className="capitalize font-semibold">{book.title}</div>
            <p className="line-clamp-3 text-xs leading-tight text-slate-500">
              {book.description}
            </p>
            <div className="text-right text-lg text-teal-600 font-semibold">
              Rp. {book.price.toLocaleString()}
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Box;
