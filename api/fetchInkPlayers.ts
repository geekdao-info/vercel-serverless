import { NowRequest, NowResponse } from "@vercel/node";
import { MongoClient } from "mongodb";
// @ts-ignore
import axios from "axios";
const CONNECTION_STRING =
  "mongodb+srv://mr7s:utjfSY8YE56WLNv@cluster0.uncsh.mongodb.net/multichain?retryWrites=true&w=majority";
module.exports = async (req: NowRequest, res: NowResponse) => {
  async function requestGet(startAddress) {
    return new Promise((resolve, reject) => {
      const queryMsg = {
        players: {
          sid: 0,
          start_address: startAddress,
          end_address: null,
          limit: 1000,
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
          "https://lcd.terra.dev/wasm/contracts/terra1nlsfl8djet3z70xu2cj7s9dn7kzyzzfz5z2sd9/store",
          requestParams
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
  let players = [];
  const fetchData = async (startAddress: string | null) => {
    try {
      const playersRes = await requestGet(startAddress);
      const tempPlayers = playersRes?.result?.players;
      if (
        tempPlayers.length === 1 &&
        tempPlayers[0]?.address === startAddress
      ) {
        const client = await MongoClient.connect(CONNECTION_STRING, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        const db = await client.db("inker-data");
        const saveData = {
          players: players.length,
          create: Date.now(),
        };
        db.collection("players").insertOne(saveData);
        res.status(200).json({ result: "ok" });
        return;
      }
      // 第二次开始查询时 上次的最后一条和这次的第一条一样，需要去除
      if (startAddress) {
        tempPlayers.splice(0, 1);
      }
      players = [...players, ...tempPlayers];
      fetchData(tempPlayers[tempPlayers.length - 1].address);
    } catch (e) {
      /* eslint-disable no-console */
      console.log("dashboard err", e);
    }
  };

  fetchData(null);
};
