import Link from "next/link";

interface TweetProps {
  tweet: {
    id: number;
    tweet: string;
    created_at: Date;
    user: {
      username: string;
    };
  };
}

export default function Tweet({ tweet }: TweetProps) {
  return (
    <Link
      href={`/tweets/${tweet.id}`}
      className="flex flex-col gap-2 border-b border-gray-300"
    >
      <h1>{tweet.tweet}</h1>
      <span>{tweet.user.username}</span>
      <span>{tweet.created_at.toLocaleDateString()}</span>
    </Link>
  );
}
