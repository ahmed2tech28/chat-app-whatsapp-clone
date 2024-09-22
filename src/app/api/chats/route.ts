import { NextRequest, NextResponse } from "next/server";
import MessageModel from "@/db/models/Message";
import connectDb from "@/db/connectDb";

export async function GET(request: NextRequest) {
  try {
    await connectDb();
    const from = request.nextUrl.searchParams.get("from");
    const to = request.nextUrl.searchParams.get("to");

    if (!from || !to) {
      return NextResponse.json(
        { error: "Both 'from' and 'to' parameters are required." },
        { status: 400 }
      );
    }

    const messages = await MessageModel.find({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    }).sort({ createdAt: 1 });

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
