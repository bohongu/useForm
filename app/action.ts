"use server";

export async function login(_prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const { password } = Object.fromEntries(formData.entries());

  if (password !== "12345") {
    return { error: "Wrong Password" };
  }

  return { success: "Login Success" };
}
