import { NowRequest, NowResponse } from "@vercel/node";
import { MongoClient } from "mongodb";
// @ts-ignore
import axios from "axios";
const CONNECTION_STRING =
  "mongodb+srv://mr7s:utjfSY8YE56WLNv@cluster0.uncsh.mongodb.net/multichain?retryWrites=true&w=majority";
module.exports = async (req: NowRequest, res: NowResponse) => {
  async function requestGet() {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "https://fcd.terra.dev/wasm/contracts/terra1nlsfl8djet3z70xu2cj7s9dn7kzyzzfz5z2sd9/store?query_msg=%7B%22strategy%22:%7B%22sid%22:0%7D%7D"
        )
        .then(function (response) {
          // console.log(response.data);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  }
  try {
    const resultData = await requestGet();
    const client = await MongoClient.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = await client.db("inker-data");
    const saveData = {
      amount: resultData.result.total_deposit.amount / 1e6,
      denom: resultData.result.total_deposit.info.native_token.denom,
      create: Date.now(),
    };
    db.collection("total_deposit").insertOne(saveData);
    res.status(200).json({ result: "ok" });
  } catch (e) {
    console.log(e);
  }
};
