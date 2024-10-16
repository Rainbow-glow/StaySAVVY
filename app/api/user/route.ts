import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/user.model";
import connectDB from "@/lib/connectDB";

export async function POST(req: Request) {
  const { userId } = auth();
  const payload = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { email, name } = payload;

  await connectDB()

  const newUser = new User({
    userId,
    email,
    name,
  });

  try {
    await newUser.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
