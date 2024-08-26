"use client";
import { createAuthor } from "@/actions/authorAction";
import { CreateAuthorSchema } from "@/schemas/authorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const FormAuthor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof CreateAuthorSchema>>({
    resolver: zodResolver(CreateAuthorSchema),
  });
  const onSubmit = (values: z.infer<typeof CreateAuthorSchema>) => {
    createAuthor(values).then((data) => {
      if (data.error) {
        return toast.error(data.error);
      } else {
        toast.success("Author created successfully");
        reset();
      }
    });
  };
  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-4">
          <Input
            isInvalid={errors.name ? true : false}
            errorMessage={errors.name?.message}
            {...register("name")}
            placeholder="Author"
          />
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Card>
  );
};

export default FormAuthor;
