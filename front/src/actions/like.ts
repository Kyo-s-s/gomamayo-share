"use server";

import { auth } from "@/auth";
import { ok, err } from "./result";
import prisma from "@/utils/prisma";

export const createLikeAction = async (postID: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return err("ログインしてください。")
  }
  try {
    await prisma.like.create({
      data: {
        userId: `${user.id}`,
        postId: postID,
      },
    })
  } catch {
    return err("いいねに失敗しました。")
  }
  return ok({ message: "いいねしました。" })
}

export const deleteLikeAction = async (postID: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return err("ログインしてください。")
  }
  try {
    await prisma.like.deleteMany({
      where: {
        userId: `${user.id}`,
        postId: postID,
      },
    })
  } catch {
    return err("いいねを削除に失敗しました。")
  }
  return ok({ message: "いいねを削除しました。" })
}
