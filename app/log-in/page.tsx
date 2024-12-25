"use client";

import { useActionState } from "react";
import { login } from "@/app/log-in/action";
import Input from "@/components/Input";

import Link from "next/link";
import Button from "@/components/Button";

export default function Page() {
  const [state, dispatch] = useActionState(login, null);

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
          type="password"
          name="password"
          placeholder="password"
          errors={state?.fieldErrors?.password}
        />
        <Button text="Login" />
      </form>
      {state?.formErrors && (
        <span className="text-red-500">{state?.formErrors}</span>
      )}
      <span>
        <Link
          className="cursor-pointer hover:underline hover:text-blue-500 hover:underline-offset-4"
          href="/create-account"
        >
          회원가입 하러가기
        </Link>
      </span>
    </div>
  );
}
