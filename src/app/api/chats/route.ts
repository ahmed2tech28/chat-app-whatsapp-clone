import { NextRequest, NextResponse } from "next/server";
import MessageModel from "@/db/models/Message";
import connectDb from "@/db/connectDb";

export async function GET(request: NextRequest) {
  try {
    connectDb();
    const from = request.nextUrl.searchParams.get("from");
    const to = request.nextUrl.searchParams.get("to");
    const messages = await MessageModel.find({ from, to });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
