"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweetSchema = z.object({
  tweet: z.string().min(1, { message: "Tweet is required" }),
});

export async function getMoreTweet(page: number) {
  const tweets = await db.tweet.findMany({
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: true,
    },
  });

  return tweets;
}

export async function addTweet(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);

  const result = tweetSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/tweets/${tweet.id}`);
    }
  }
}
