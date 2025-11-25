import clientPromise from "@/utils/mongodb";
import { getMongoDbName } from "@/utils/get-env";
import { dbCollectionPrefix } from "@/utils/constants";
import { NextResponse } from "next/server";
import { ObjectId } from "bson";

const client = await clientPromise;
const db = client.db(getMongoDbName());

export async function GET(_: Request, { params }: any) {
  const project = (await params).project.toLowerCase();
  const id = (await params).id;

  const result = await db.collection(`${dbCollectionPrefix}${project}`)
    .findOne({ _id: new ObjectId(id) });

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result);
}