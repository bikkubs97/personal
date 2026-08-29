import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifyCredentials } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};

    const user = verifyCredentials(username, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      message: "Login successful",
      user,
    });

    response.cookies.set(SESSION_COOKIE_NAME, user.username, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Could not process login request." },
      { status: 400 },
    );
  }
}
