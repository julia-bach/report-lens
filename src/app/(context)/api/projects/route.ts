import clientPromise from "@/utils/mongodb";
import { getMongoDbName } from "@/utils/get-env";
import { dbCollectionPrefix } from "@/utils/constants";

export async function GET() {
  const client = await clientPromise;
  const db = client.db(getMongoDbName());

  const collections = await db.listCollections({
    name: { $regex: new RegExp(`^${dbCollectionPrefix}`) }
  }).toArray();

  const projects = collections.map(c =>
    c.name.replace(dbCollectionPrefix, "")
  );
  return Response.json({ projects });
}