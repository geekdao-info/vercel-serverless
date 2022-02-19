import { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";
// @ts-ignore
import axios from "axios";
import { accurateAdd, accurateDiv } from "../utils";
const CONNECTION_STRING =
  "mongodb+srv://mr7s:utjfSY8YE56WLNv@cluster0.uncsh.mongodb.net/multichain?retryWrites=true&w=majority";
module.exports = async (req: VercelRequest, res: VercelResponse) => {
  async function requestGet(startAfter: number | null) {
    return new Promise((resolve, reject) => {
      const queryMsg = {
        parties_with_deposits: {
          start_after: startAfter,
          limit: 50,
          is_ascending: true,
        },
      };
      const encodeQueryMsg = JSON.stringify(queryMsg);
      const requestParams = {
        params: {
          query_msg: encodeQueryMsg,
        },
      };
      axios
        .get(
          "https://lcd.terra.dev/wasm/contracts/terra1p4y54kfdn9uhvh62rjvgz3sydceuw9s6c65aef/store",
          requestParams
        )
        .then(function (response) {
          console.log(response.data);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  }
  let parties = [];
  const fetchData = async (startAfter: number | null) => {
    try {
      const partyRes = await requestGet(startAfter);
      const tempParties = partyRes?.result?.parties;
      if (tempParties.length <= 0) {
        const client = await MongoClient.connect(CONNECTION_STRING, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        const db = await client.db("inker-data");
        let partyTotalAmount = 0;
        let partyPlayersCount = 0;
        parties.forEach((v) => {
          partyTotalAmount = accurateAdd(partyTotalAmount, v.total_deposit);
          partyPlayersCount += v.current_member;
        });
        const saveData = {
          partyCount: parties.length,
          create: Date.now(),
          partyTotalAmount: accurateDiv(partyTotalAmount, 1e6),
          partyPlayersCount,
        };
        db.collection("party_info").insertOne(saveData);
        res.status(200).json({ result: "ok" });
        return;
      }
      parties = [...parties, ...tempParties];
      fetchData(tempParties[tempParties.length - 1].info.id);
    } catch (e) {
      /* eslint-disable no-console */
      console.log("dashboard err", e);
    }
  };
  fetchData(null);
};
