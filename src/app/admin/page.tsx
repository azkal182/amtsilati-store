import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { getAllAuthor } from "@/actions/authorAction";
import { getAllPublisher } from "@/actions/publisherAction";
import { getAllCategory } from "@/actions/categoryAction";
import { getAllBook } from "@/actions/bookAction";
import { Author, Category, Publisher } from "@prisma/client";
import FormAuthor from "@/components/formAuthor";
import FormPublisher from "@/components/formPublisher";
import FormCategory from "@/components/formCategory";
import FormBook from "@/components/formBook";

export default async function Admin() {
  const authors = await getAllAuthor();
  const publishers = await getAllPublisher();
  const categories = await getAllCategory();
  const books = await getAllBook();
  return (
    <div>
      <h1>Author</h1>
      <ul className="list-disc">
        {authors.map((item: Author) => (
          <li key={item.id} className="ml-2">
            - {item.name}
          </li>
        ))}
      </ul>
      <h1>Publisher</h1>
      <ul>
        {publishers.map((item: Publisher) => (
          <li key={item.id} className="ml-2">
            - {item.name}
          </li>
        ))}
      </ul>

      <h1>Category</h1>
      <ul>
        {categories.map((item: Category) => (
          <li key={item.id} className="ml-2">
            - {item.name}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between space-x-3 space-y-4 px-14 mt-4">
        <FormAuthor />
        <FormPublisher />
        <FormCategory />
      </div>
      <div className="mt-4 mx-14">
        <FormBook
          authors={authors}
          publishers={publishers}
          categories={categories}
          books={books}
        />
      </div>
    </div>
  );
}
