import db from "@/lib/db";
import { getSession } from "@/lib/session";

export default async function Page() {
  const session = await getSession();

  if (!session.id) return null;

  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      username: true,
    },
  });

  return <div>Hello, {user?.username}</div>;
}
