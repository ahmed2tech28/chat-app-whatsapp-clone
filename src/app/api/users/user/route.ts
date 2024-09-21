import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import UserModel from "@/db/models/User";

export async function GET(request: NextRequest) {
  try {
    connectDb();
    const id = await request.nextUrl.searchParams.get("id");
    console.log(id);
    const user = await UserModel.findOne({ _id: id }).select("_id email name");
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
