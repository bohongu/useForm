"use client";

import { InitialTweetProps } from "@/app/page";
import { useState } from "react";
import Tweet from "@/components/Tweet";
import { getMoreTweet } from "@/app/action";

interface TweetListProps {
  initialTweet: InitialTweetProps;
}

export default function TweetList({ initialTweet }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweet);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const handleMoreTweet = async () => {
    setIsLoading(true);
    const newTweets = await getMoreTweet(page + 1);
    if (!!newTweets.length) {
      setPage((prev) => prev + 1);
      setTweets((prev) => [...prev, ...newTweets]);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
      <button onClick={handleMoreTweet} disabled={isLoading || isLastPage}>
        {isLoading ? "로딩중" : "더보기"}
      </button>
    </>
  );
}
