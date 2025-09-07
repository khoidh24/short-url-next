import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const originalUrl = body.originalUrl;

  if (!originalUrl) {
    return NextResponse.json({ error: "Missing originalUrl" }, { status: 400 });
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.API_KEY!,
    },
    body: JSON.stringify({ originalUrl }),
    cache: "no-cache",
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
