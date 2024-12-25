"use client";

import { useActionState } from "react";
import { createAccount } from "@/app/create-account/action";
import Input from "@/components/Input";

import Link from "next/link";
import Button from "@/components/Button";

export default function Page() {
  const [state, dispatch] = useActionState(createAccount, null);

  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <form
        className="min-w-[400px] gap-4 mx-auto flex flex-col"
        action={dispatch}
      >
        <Input
          type="email"
          name="email"
          placeholder="email"
          errors={state?.fieldErrors?.email}
        />
        <Input
          type="text"
          name="username"
          placeholder="username"
          errors={state?.fieldErrors?.username}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          errors={state?.fieldErrors?.password}
        />
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="passwordConfirm"
          errors={state?.fieldErrors?.passwordConfirm}
        />
        <Button text="Login" />
      </form>
      <span>
        <Link
          className="cursor-pointer hover:underline hover:text-blue-500 hover:underline-offset-4"
          href="/log-in"
        >
          로그인 하러가기
        </Link>
      </span>
    </div>
  );
}
