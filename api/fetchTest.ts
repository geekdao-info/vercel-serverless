import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient } from 'mongodb'
// @ts-ignore
import axios from 'axios'
const CONNECTION_STRING = "mongodb+srv://mr7s:utjfSY8YE56WLNv@cluster0.uncsh.mongodb.net/multichain?retryWrites=true&w=majority";
module.exports = async (req: NowRequest, res: NowResponse) => {

    async function requestGet() {
        return new Promise((resolve, reject)=>{
            const options = {
                hostname: 'bridgeapi.anyswap.exchange',
                port: 443,
                path: '/data/stats/stable',
                method: 'GET'
            }

            axios.get('https://bridgeapi.anyswap.exchange/data/stats/stable')
                .then(function (response) {
                    // console.log(response.data);
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error)
                });

        })
    }

    const resultData = await requestGet()
    const client = await MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db('multichain');
    db.collection("stable").insertOne(...resultData);
    res.status(200).json({result: 'ok'});
}


