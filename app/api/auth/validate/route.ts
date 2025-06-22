import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();

  if(!user) {
    return NextResponse.json(
      {authentificated: false, user: null}
    );
  }

  return NextResponse.json({ authenticated: true, user });
}