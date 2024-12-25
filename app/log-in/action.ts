"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const checkExistEmail = async ({ email }: { email: string }) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !!user;
};

const formSchema = z
  .object({
    email: z.string().email("이메일 형식이 올바르지 않습니다."),
    password: z.string().min(5, "비밀번호는 최소 5자 이상이어야 합니다."),
  })
  .refine(checkExistEmail, {
    message: "로그인에 실패하였습니다.",
  });

export async function login(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const { email, password } = result.data;

    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        password: true,
        id: true,
      },
    });

    const isPasswordCorrect = await bcrypt.compare(password, user!.password);

    if (isPasswordCorrect) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        formErrors: ["로그인에 실패하였습니다."],
        fieldErrors: {
          email: [],
          password: [],
        },
      };
    }
  }
}
