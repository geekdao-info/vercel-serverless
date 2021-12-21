import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient } from 'mongodb'
const CONNECTION_STRING = "mongodb+srv://mr7s:utjfSY8YE56WLNv@cluster0.uncsh.mongodb.net/test?retryWrites=true&w=majority";
module.exports = async (req: NowRequest, res: NowResponse) => {
    const client = await MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db('test');
    let datetime = new Date().getTime();
    db.collection("test").insertOne({name: '你好', timestamp: datetime, date: new Date()});
    res.status(200).json({result: 'ok'});
}

