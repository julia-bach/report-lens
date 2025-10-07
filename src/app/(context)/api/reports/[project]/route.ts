import clientPromise from "@/utils/mongodb";
import { getMongoDbName } from "@/utils/get-env";
import { NextResponse } from "next/server";
import { TestReportSchema } from "@/lib/schemas/test-report.schema";
import { dbCollectionPrefix } from "@/utils/constants";

const client = await clientPromise;
const db = client.db(getMongoDbName());

export async function GET(_: Request, { params }: any) {
  const project = (await params).project.toLowerCase();

  const result = await db.collection(`${dbCollectionPrefix}${project}`).find({}).toArray();
  const data = result.sort((a, b) => {
    return new Date(b.stats.startTime).getTime() - new Date(a.stats.startTime).getTime();
  });

  return NextResponse.json({ data });
}

export async function POST(req: Request, { params }: any) {
  try {
    const json = await req.json();
    const project = (await params).project.toLowerCase();

    const parsed = TestReportSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid Json", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const result = await db.collection(`${dbCollectionPrefix}${project}`).insertOne(parsed.data);
    return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Error saving report:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}