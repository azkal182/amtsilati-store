import { Input } from "@nextui-org/input";
import React from "react";
import Box from "./box";
import { db } from "@/lib/db";

const StorePage = async () => {
  const books = await db.book.findMany({
    include: {
      author: true,
      category: true,
      publisher: true,
    },
  });
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-[]">
        <div className="pt-3 md:pt-0 px-2">
          <div>
            <Input className="w-full md:w-72" placeholder="Search" />
          </div>
        </div>
        <Box books={books} />
      </div>
    </div>
  );
};

export default StorePage;
