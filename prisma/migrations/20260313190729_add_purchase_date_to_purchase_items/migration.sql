/*
  Warnings:

  - Added the required column `purchaseDate` to the `purchase_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchase_items" ADD COLUMN "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT NOW();
ALTER TABLE "purchase_items" ALTER COLUMN "purchaseDate" DROP DEFAULT;
