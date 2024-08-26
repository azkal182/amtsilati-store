"use client";
import { createCAtegory } from "@/actions/categoryAction";
import { CreateCategorySchema } from "@/schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const FormCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof CreateCategorySchema>>({
    resolver: zodResolver(CreateCategorySchema),
  });
  const onSubmit = (values: z.infer<typeof CreateCategorySchema>) => {
    createCAtegory(values).then((data) => {
      if (data.error) {
        return toast.error(data.error);
      } else {
        toast.success("Category created successfully");
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
            placeholder="Category"
          />
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Card>
  );
};

export default FormCategory;
