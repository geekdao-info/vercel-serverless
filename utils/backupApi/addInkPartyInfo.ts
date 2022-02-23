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
  let datetime = new Date().getTime();
  // db.collection("party_info").insertMany([
  //   {
  //     create: 1644249600000,
  //     partyCount: 50,
  //     partyPlayersCount: 259,
  //     partyTotalAmount: 32322.929,
  //   },
  //   {
  //     create: 1644336000000,
  //     partyCount: 95,
  //     partyPlayersCount: 658,
  //     partyTotalAmount: 110626.78,
  //   },
  //   {
  //     create: 1644422400000,
  //     partyCount: 108,
  //     partyPlayersCount: 814,
  //     partyTotalAmount: 133777.282,
  //   },
  //   {
  //     create: 1644508800000,
  //     partyCount: 116,
  //     partyPlayersCount: 1018,
  //     partyTotalAmount: 197089.942,
  //   },
  //   {
  //     create: 1644595200000,
  //     partyCount: 127,
  //     partyPlayersCount: 1218,
  //     partyTotalAmount: 221910.982,
  //   },
  //   {
  //     create: 1644681600000,
  //     partyCount: 135,
  //     partyPlayersCount: 1599,
  //     partyTotalAmount: 324667.362,
  //   },
  //   {
  //     create: 1644768000000,
  //     partyCount: 137,
  //     partyPlayersCount: 1646,
  //     partyTotalAmount: 351618.327,
  //   },
  //   {
  //     create: 1644854400000,
  //     partyCount: 143,
  //     partyPlayersCount: 1697,
  //     partyTotalAmount: 376590.973,
  //   },
  //   {
  //     create: 1644940800000,
  //     partyCount: 161,
  //     partyPlayersCount: 1856,
  //     partyTotalAmount: 889412.861543,
  //   },
  // ]);
  res.status(200).json({ result: "ok" });
};
