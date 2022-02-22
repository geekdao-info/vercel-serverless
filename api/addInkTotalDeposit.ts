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
  // db.collection("total_deposit").insertMany([
  //   { amount: 2434600, denom: "uusd", create: 1641569400000 },
  //   { amount: 2442960, denom: "uusd", create: 1641655800000 },
  //   { amount: 2466526, denom: "uusd", create: 1641742200000 },
  //   { amount: 2477722, denom: "uusd", create: 1641828600000 },
  //   { amount: 2479965, denom: "uusd", create: 1641915000000 },
  //   { amount: 2364532, denom: "uusd", create: 1642001400000 },
  //   { amount: 2320427, denom: "uusd", create: 1642087800000 },
  //   { amount: 2356415, denom: "uusd", create: 1642174200000 },
  //   { amount: 2391763, denom: "uusd", create: 1642260600000 },
  //   { amount: 2411774, denom: "uusd", create: 1642347000000 },
  //   { amount: 2479604, denom: "uusd", create: 1642433400000 },
  //   { amount: 2506502, denom: "uusd", create: 1642519800000 },
  //   { amount: 2572900, denom: "uusd", create: 1642606200000 },
  //   { amount: 2551710, denom: "uusd", create: 1642692600000 },
  //   { amount: 2555888, denom: "uusd", create: 1642779000000 },
  //   { amount: 2535911, denom: "uusd", create: 1642865400000 },
  //   { amount: 2485868, denom: "uusd", create: 1642951800000 },
  //   { amount: 3543514, denom: "uusd", create: 1643038200000 },
  //   { amount: 3534644, denom: "uusd", create: 1643124600000 },
  //   { amount: 3449480, denom: "uusd", create: 1643211000000 },
  //   { amount: 3475674, denom: "uusd", create: 1643297400000 },
  //   { amount: 3446303, denom: "uusd", create: 1643383800000 },
  //   { amount: 3376210, denom: "uusd", create: 1643470200000 },
  //   { amount: 3411319, denom: "uusd", create: 1643556600000 },
  //   { amount: 3421476, denom: "uusd", create: 1643643000000 },
  //   { amount: 3425148, denom: "uusd", create: 1643729400000 },
  //   { amount: 3223730, denom: "uusd", create: 1643815800000 },
  //   { amount: 3223428, denom: "uusd", create: 1643902200000 },
  //   { amount: 3233195, denom: "uusd", create: 1643988600000 },
  //   { amount: 3234202, denom: "uusd", create: 1644075000000 },
  //   { amount: 3240464, denom: "uusd", create: 1644161400000 },
  //   { amount: 3234569, denom: "uusd", create: 1644247800000 },
  //   { amount: 3233512, denom: "uusd", create: 1644334200000 },
  //   { amount: 4324783, denom: "uusd", create: 1644420600000 },
  //   { amount: 4414815, denom: "uusd", create: 1644507000000 },
  //   { amount: 4456076, denom: "uusd", create: 1644593400000 },
  //   { amount: 4597323, denom: "uusd", create: 1644679800000 },
  //   { amount: 4684873, denom: "uusd", create: 1644766200000 },
  //   { amount: 4790763, denom: "uusd", create: 1644852600000 },
  //   { amount: 4880893, denom: "uusd", create: 1644939000000 },
  //   { amount: 5975577, denom: "uusd", create: 1645025400000 },
  // ]);
  res.status(200).json({ result: "ok" });
};
