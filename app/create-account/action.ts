"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const checkExistEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !user;
};

const formSchema = z
  .object({
    email: z
      .string()
      .email("이메일 형식이 올바르지 않습니다.")
      .refine(checkExistEmail, "이미 존재하는 이메일입니다."),
    username: z.string().min(3, "이름은 최소 3자 이상이어야 합니다."),
    password: z.string().min(5, "비밀번호는 최소 5자 이상이어야 합니다."),
    passwordConfirm: z.string(),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export async function createAccount(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const { email, username, password } = result.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        bio: "",
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
}
