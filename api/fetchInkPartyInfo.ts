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
          "https://lcd.terra.dev/wasm/contracts/terra1p4y54kfdn9uhvh62rjvgz3sydceuw9s6c65aef/store?query_msg=%7B%22parties_with_deposits%22:%7B%22start_after%22:null,%22limit%22:10000,%22is_ascending%22:true%7D%7D"
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
    let partyTotalAmount = 0;
    let partyPlayersCount = 0;
    resultData.result.parties.forEach((v) => {
      partyTotalAmount += v.total_deposit;
      partyPlayersCount += v.current_member;
    });
    const saveData = {
      partyCount: resultData.result.parties.length,
      create: Date.now(),
      partyTotalAmount: partyTotalAmount / 1e6,
      partyPlayersCount,
    };
    db.collection("party_info").insertOne(saveData);
    res.status(200).json({ result: "ok" });
  } catch (e) {
    console.log(e);
  }
};
