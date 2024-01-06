import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function verifyAuth(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ mensagem: `Token não informado!` });
    }

    const [, token] = authToken.split(" ");

    if (!token) {
        return res.status(401).json({ mensagem: `Token inválido!` });
    }

    try {
        const {sub} = verify(token, '748923897hjhg3u1y2GHG8y23g3');

        console.log(sub);
        return next();
    } catch (error) {
        return res.status(401).json({ mensagem: `Unauthorized!` });
    }
}