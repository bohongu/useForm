"use server";

import db from "@/lib/db";

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
