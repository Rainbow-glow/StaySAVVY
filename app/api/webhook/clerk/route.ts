import { NextResponse } from "next/server";

import User from "@/models/user.model";
import connectDB from "@/lib/connectDB";

export async function POST(req: Request) {
  const payload = await req.json();
  
  const { id, email_addresses, first_name, last_name } = payload.data;

  await connectDB()
  
  const newUser = new User({
    userId: id,
    email: email_addresses[0].email_address,
    name: `${first_name} ${last_name}`,
  });

  try {
    await newUser.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
