import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import UserModel from "@/db/models/User";

export async function GET(request: NextRequest) {
  try {
    connectDb();
    const users = await UserModel.find().select("_id email name");
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
