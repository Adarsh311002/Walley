
import jwt from "jsonwebtoken"


const auth = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
         return res.status(401).json({
                             message : "Authorization Header Not Found."    
         });
    }

    

    try {
        const token = authHeader.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        console.log('Authorization Header:', authHeader);
        console.log('Extracted Token:', token);
        
        console.log(req.userId)
        req.userId = decodedToken.userId;
        
        next()

    } catch (error) {
        return res
        .status(400)
        .json({
            message : "Invalid Token.",
            error : error

        })
    }


}

export {auth}