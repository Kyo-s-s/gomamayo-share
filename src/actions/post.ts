"use server";

import { auth } from "@/auth";
import prisma from "@/utils/prisma";
import { err, ok } from "./result";
import { gomamayoCheck } from "@/utils/gomamayoCheck";
import { Prisma } from "@prisma/client";

export const createPostAction = async (content: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return err("ログインしてください。")
  }
  const gomamayoCheckResult = await gomamayoCheck(content);
  if (gomamayoCheckResult !== "") {
    return err(gomamayoCheckResult);
  }
  try {
    const post = await prisma.post.create({
      data: {
        content,
        userId: `${user.id}`,
      }
    })
    return ok({ post })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return err("この内容は既に投稿されています。")
    }
    return err("投稿に失敗しました。")
  }
}

export const getRankingPostsAction = async () => {
  const limit = 15;
  const session = await auth();
  const user = session?.user;
  const postsWithLikes = await prisma.post.findMany({
    orderBy: { likes: { _count: "desc" } },
    take: limit,
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      likes: {
        where: { userId: user?.id || "" },
        select: { id: true },
      },
      _count: {
        select: { likes: true }
      }
    },
  })
  const posts = postsWithLikes.map((postWithLike) => {
    const { likes, _count, ...post } = postWithLike;
    return {
      ...post,
      isLiked: likes.length > 0,
      likesCount: _count.likes,
    }
  })
  return ok({ posts })
}

export const getPostsAction = async (cursorPostID: string | undefined) => {
  const limit = 10;
  const session = await auth();
  const user = session?.user;
  const postsWithLikes = await prisma.post.findMany({
    where: { id: { lt: cursorPostID } },
    orderBy: { id: "desc" },
    take: limit,
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      likes: {
        where: {
          userId: user?.id || "",
        },
        select: {
          id: true,
        },
      },
      _count: {
        select: { likes: true }
      }
    },
  })
  const posts = postsWithLikes.map((postWithLike) => {
    const { likes, _count, ...post } = postWithLike;
    return {
      ...post,
      isLiked: likes.length > 0,
      likesCount: _count.likes,
    }
  })
  return ok({ posts })
}

export const getPostAction = async (postID: string) => {
  const session = await auth();
  const user = session?.user;
  const postWithLike = await prisma.post.findUnique({
    where: { id: postID },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      likes: {
        where: { userId: user?.id || "" },
        select: { id: true },
      },
      _count: {
        select: { likes: true }
      }
    },
  })
  if (!postWithLike) {
    return err("投稿が見つかりません。")
  }
  const { likes, _count, ...post } = postWithLike;
  const isLiked = likes.length > 0;
  return ok({ post: {...post, isLiked, likesCount: _count.likes} })
}

export const deletePostAction = async (postID: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return err("ログインしてください。")
  }
  const post = await prisma.post.findUnique({
    where: { id: postID },
  })
  if (!post) {
    return err("投稿が見つかりません。")
  }
  if (post.userId !== user.id) {
    return err("権限がありません。")
  }
  await prisma.post.delete({
    where: { id: postID, userId: user.id },
  })
  return ok({ message: "投稿を削除しました。" })
}
