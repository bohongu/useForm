"use server";

import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
  name: z.string().min(3, "이름은 최소 3자 이상이어야 합니다."),
  password: z.string().min(5, "비밀번호는 최소 5자 이상이어야 합니다."),
});

export async function login(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }
}
