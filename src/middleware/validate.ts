import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const validateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.headers.authorization.split(" ")[1];
        if(token)
        {
            verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
                if(err)
                {
                    return res.status(401).json({
                        success: false,
                        message: "Authentication failed",
                        error: err
                    });
                }
                else
                {
                    res.locals.user = decoded.payload;
                    next();
                }
            });
        }
        else
        {
            return res.status(401).json({
                success: false,
                message: "Authentication failed",
                error: "No token provided"
            });
        }
    }
    catch(err)
    {
        return res.status(401).json({
            success: false,
            message: "Authentication failed",
            error: err
        });
    }
};

export { validateUser };