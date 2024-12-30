"use client";

import { addTweet } from "@/app/action";
import { useActionState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function AddTweet() {
  const [state, dispatch, isPending] = useActionState(addTweet, null);

  return (
    <form action={dispatch}>
      <Input
        type="text"
        name="tweet"
        placeholder="What's on your mind?"
        errors={state?.fieldErrors?.tweet}
        disabled={isPending}
      />
      <Button className="w-full mt-4" text="Add" />
    </form>
  );
}
