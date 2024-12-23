"use client";

import { useActionState } from "react";
import { login } from "@/app/action";
import Input from "@/components/Input";
import { Button } from "@/components/Button";

export default function Page() {
  const [state, dispatch] = useActionState(login, null);

  return (
    <div className="h-screen flex justify-center items-center">
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
          name="name"
          placeholder="name"
          errors={state?.fieldErrors?.name}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          errors={state?.fieldErrors?.password}
        />
        <Button text="Login" />
      </form>
    </div>
  );
}
