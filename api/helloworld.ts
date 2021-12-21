import { NowRequest, NowResponse } from '@vercel/node';
module.exports = async (req: NowRequest, res: NowResponse) => {
    var data = {
        msg: "hello world!"
    }
    res.status(200).json(data);
}
