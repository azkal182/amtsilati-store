"use client";
import { createBook } from "@/actions/bookAction";
import { CreateBookSchema } from "@/schemas/bookSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Author, Book, Category, Prisma, Publisher } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import * as z from "zod";

type BookWithAuthor = Prisma.BookGetPayload<{
  include: {
    author: true;
    category: true;
    publisher: true;
  };
}>;

const FormBook = ({
  authors,
  publishers,
  categories,
  books,
}: {
  authors: any;
  publishers: any;
  categories: any;
  books: BookWithAuthor[];
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof CreateBookSchema>>({
    resolver: zodResolver(CreateBookSchema),
  });
  const onSubmit = (values: z.infer<typeof CreateBookSchema>) => {
    createBook(values).then((data) => {
      if (data.error) {
        return toast.error(data.error);
      } else {
        toast.success("Author created successfully");
        closeModal();
        reset();
      }
    });
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <Button className="mb-2" onPress={openModal}>
        New Book
      </Button>
      <Modal size="5xl" isOpen={modalOpen} onOpenChange={closeModal}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">New Book</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
                    type="text"
                    {...register("title")}
                    placeholder="Title"
                  />
                  <Input
                    isInvalid={!!errors.price}
                    errorMessage={errors.price?.message}
                    type="text"
                    {...register("price")}
                    placeholder="Price"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    isInvalid={!!errors.authorId}
                    errorMessage={errors.authorId?.message}
                    {...register("authorId")}
                    onChange={(value) =>
                      setValue("authorId", value.target.value)
                    }
                    label="Select an author"
                  >
                    {authors.map((item: Author) => (
                      <SelectItem key={item.id}>{item.name}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    isInvalid={!!errors.publisherId}
                    errorMessage={errors.publisherId?.message}
                    {...register("publisherId")}
                    onChange={(value) =>
                      setValue("publisherId", value.target.value)
                    }
                    label="Select a publisher"
                  >
                    {publishers.map((item: Publisher) => (
                      <SelectItem key={item.id}>{item.name}</SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    isInvalid={!!errors.categoryId}
                    errorMessage={errors.categoryId?.message}
                    {...register("categoryId")}
                    onChange={(value) =>
                      setValue("categoryId", value.target.value)
                    }
                    label="Select a category"
                  >
                    {categories.map((item: Category) => (
                      <SelectItem key={item.id}>{item.name}</SelectItem>
                    ))}
                  </Select>
                  <Textarea
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                    {...register("description")}
                    placeholder="Description"
                    className="col-span-2 sm:col-span-2"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    isInvalid={!!errors.total_page}
                    errorMessage={errors.total_page?.message}
                    type="number"
                    {...register("total_page")}
                    placeholder="Total Page"
                  />
                  <Input
                    isInvalid={!!errors.width}
                    errorMessage={errors.width?.message}
                    type="number"
                    {...register("width")}
                    placeholder="Width"
                  />
                  <Input
                    isInvalid={!!errors.long}
                    errorMessage={errors.long?.message}
                    type="number"
                    {...register("long")}
                    placeholder="Long"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    isInvalid={!!errors.image}
                    errorMessage={errors.image?.message}
                    type="text"
                    {...register("image")}
                    placeholder="Image URL"
                  />
                  <Input
                    isInvalid={!!errors.isbn}
                    errorMessage={errors.isbn?.message}
                    type="number"
                    {...register("isbn")}
                    placeholder="ISBN"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button color="danger" onPress={closeModal}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Create
                  </Button>
                </div>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <div>
        <Table>
          <TableHeader>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>AUTHOR</TableColumn>
            <TableColumn>PUBLISHER</TableColumn>
            <TableColumn>ISBN</TableColumn>
            <TableColumn>HARGA</TableColumn>
          </TableHeader>
          <TableBody>
            {books.map((item: BookWithAuthor) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.author.name}</TableCell>
                <TableCell>{item.publisher.name}</TableCell>
                <TableCell>{item.isbn}</TableCell>
                <TableCell className="text-right">{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FormBook;
