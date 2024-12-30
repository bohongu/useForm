import AddTweet from "@/components/AddTweet";
import TweetList from "@/components/TweetList";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialTweet() {
  const tweets = await db.tweet.findMany({
    orderBy: {
      created_at: "desc",
    },
    take: 1,
    include: {
      user: true,
    },
  });
  return tweets;
}

export type InitialTweetProps = Prisma.PromiseReturnType<
  typeof getInitialTweet
>;

export default async function Page() {
  const initialTweet = await getInitialTweet();

  return (
    <section className="flex flex-col gap-4 w-full">
      <AddTweet />
      <TweetList initialTweet={initialTweet} />
    </section>
  );
}
