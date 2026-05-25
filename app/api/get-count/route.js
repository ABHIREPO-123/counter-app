import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Database se sabse latest record fetch karein
    const latestCounter = await prisma.counter.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Agar koi data nahi mila, toh count 0 return karein
    const countValue = latestCounter ? latestCounter.value : 0;

    return NextResponse.json(
      { success: true, count: countValue },
      { status: 200 },
    );
  } catch (error) {
    console.error("Database Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
