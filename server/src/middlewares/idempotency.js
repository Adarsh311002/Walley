import { IdempotencyKey } from "../models/idempotency.models";

export const idempotency = async(req,res,next) => {
    const key = req.headers['idempotency-key'];

    if(!key){
        return next();
    }

    try {
        const existingRecord = await IdempotencyKey.findOne({
                key,
                userId: req.userId
        })

        if(existingRecord){
            return res
              .status(existingRecord.statusCode)
              .json(existingRecord.response);
        }

        const originalJson = res.json;

        res.json = async function(body){
            if(res.statusCode < 500 ){
                try {
                    await IdempotencyKey.create({
                        key,
                        userId: req.userId,
                        path: req.originalUrl,
                        statusCode: res.statusCode,
                        response: body
                    })
                } catch (err) {
                    console.error("Failed to save idempotency key:", err);
                }
            }
            return originalJson.call(this, body);
        }
        next();
    } catch (error) {
        console.error("Idempotency error:", error);
        next();        
    }
}