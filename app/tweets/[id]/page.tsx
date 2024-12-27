import db from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";

async function getTweetById(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return tweet;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const tweetId = Number(id);

  if (isNaN(tweetId)) return notFound();

  const tweet = await getTweetById(tweetId);

  if (!tweet) return notFound();

  return (
    <div className="w-full">
      <p className="mb-4">{tweet.tweet}</p>
      <div className="flex items-center gap-2">
        <div className="relative aspect-square size-10 overflow-hidden rounded-full">
          <Image src={tweet.user.bio} alt={tweet.user.username} fill />
        </div>
        <span>{tweet.user.username}</span>
      </div>
    </div>
  );
}
