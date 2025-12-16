import { NextResponse } from "next/server";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export async function GET() {
  try {
    const res = await fetch(URL, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}


