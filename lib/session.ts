import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionProps {
  id?: number;
}

export async function getSession() {
  return getIronSession<SessionProps>(await cookies(), {
    cookieName: "bohongu-auth",
    password: process.env.COOKIE_PASSWORD!,
  });
}
