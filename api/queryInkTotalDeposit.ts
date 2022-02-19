import { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";
const CONNECTION_STRING =
  "mongodb+srv://mr7s:utjfSY8YE56WLNv@cluster0.uncsh.mongodb.net/test?retryWrites=true&w=majority";
module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const client = await MongoClient.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db("inker-data");
  const result = await db.collection("total_deposit").find().toArray();
  res.status(200).json(result);
};
