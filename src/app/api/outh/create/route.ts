import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import UserModel from "@/db/models/User";

export async function POST(request: NextRequest) {
  try {
    connectDb();
    const { email, password, name } = await request.json();
    const newUser = new UserModel({ email, name, password });
    await newUser.save();
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({
      err: "New User Registratin Failed",
    });
  }
}
