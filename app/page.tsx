import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Link href="/log-in">로그인 하러가기</Link>
    </div>
  );
}
