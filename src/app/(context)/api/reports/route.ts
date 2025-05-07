import clientPromise from "@/utils/mongodb";
import { getMongoDbName } from "@/utils/get-env";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db(getMongoDbName())

  const data = await db.collection("default").find({}, { projection: { stats: 1 } }).toArray();

  return NextResponse.json({ data });
}