// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { postAnswer } from "@/services/answer";

function genAnswerInfo(reqBody:any){
    const answerList:any[]=[];

    Object.keys(reqBody).forEach(key => {
        if(key === 'questionId') return;
        answerList.push({
            componentId:key,
            value:reqBody[key]
        });
    })

    return {
        questionId:reqBody.questionId||'',
        answerList
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'POST') {
        //当req的请求类型不为post时，返回对应的状态
        return res.status(405).json({ errno: -1, msg: 'Method错误！' });
    }

    //获取并格式化表单数据
    const answerInfo = genAnswerInfo(req.body);

    try {
        //提交到服务端Mock
        const resData = (await postAnswer(answerInfo)) as { errno: number };

        if (resData.errno === 0) {
            return res.redirect('/success');
        }
        return res.redirect('/fail');
    } catch {
        return res.redirect('/fail');
    }

    // res.status(200).json({ errno: 0, msg: '成功！' });
}
