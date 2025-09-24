"use server";

import { auth } from "@/auth";
import prisma from "@/utils/prisma";
import { ok, err } from "./result";
import { validateName } from "@/utils/validateName";

export const changeNameAction = async (name: string) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return err("ログインしてください。")
  }
  const nameErr = validateName(name);
  if (nameErr !== "") {
    return err(nameErr);
  }
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { name },
  })
  return ok({ user: updatedUser })
}
