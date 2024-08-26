/*
  Warnings:

  - Made the column `description` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "isbn" TEXT,
ALTER COLUMN "publishedAt" DROP NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
