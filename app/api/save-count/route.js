import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { count } = body;

    if (typeof count !== "number") {
      return NextResponse.json(
        { error: "Invalid count value" },
        { status: 400 },
      );
    }

    // Save count to MongoDB
    const savedData = await prisma.counter.create({
      data: { value: count },
    });

    return NextResponse.json(
      { success: true, data: savedData },
      { status: 200 },
    );
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
