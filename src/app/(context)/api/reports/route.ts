import clientPromise from "@/utils/mongodb";
import { getMongoDbName } from "@/utils/get-env";
import { NextResponse } from "next/server";
import { TestReportSchema } from "@/lib/schemas/test-report.schema";

const client = await clientPromise;
const db = client.db(getMongoDbName());

export async function GET() {
  const data = await db.collection("default").find({}, { projection: { stats: 1 } }).toArray();
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = TestReportSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid Json", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const result = await db.collection("default").insertOne(parsed.data);
    return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Error saving report:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}