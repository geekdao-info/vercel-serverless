import { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";
// @ts-ignore
import axios from "axios";
const CONNECTION_STRING =
  "mongodb+srv://mr7s:utjfSY8YE56WLNv@cluster0.uncsh.mongodb.net/multichain?retryWrites=true&w=majority";
module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { address } = req.query;
  async function requestGet() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://api.airdrop.pstake.finance/users/airdrop/" + address)
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
    res.status(200).json({ result: "ok", ...resultData });
  } catch (e) {
    console.log(e);
  }
};
