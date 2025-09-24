/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_content_key" ON "public"."Post"("content");
