import { VercelRequest, VercelResponse } from "@vercel/node";
// @ts-ignore
import axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { address } = req.query;
  async function requestGet(address: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://airdrop.like.co/api/overview?address=${address}`)
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
  try {
    const apiRes = await requestGet(address as any);
    res.status(200).json({ result: "ok", ...apiRes });
  } catch (e) {
    console.log(e);
  }
};
