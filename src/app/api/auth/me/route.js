import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, getUserFromSession } from "@/lib/auth";

export async function GET(request) {
  const sessionValue = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = getUserFromSession(sessionValue);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
