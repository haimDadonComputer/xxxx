import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "express";
import { UserToken } from "../../interfaces";




export function authentication(): void {
    if (!globalThis._ENV.JWT_SECRET) {throw new Error("JWT_SECRET is missing");}
    if (!globalThis._Server) throw new Error("SERVER does not exist. Run createServer() first.");
     
    _Server.use((req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies?.token;
        req.user = null;
        res.locals.user = null;
        if (!token) return next();
        try {
            const user = jwt.verify(token,_ENV.JWT_SECRET,{algorithms: ["HS256"]}) as UserToken;
            req.user = user;
            res.locals.user = user;
        }
        catch {res.clearCookie("token");}
        next();
    });

}


export function createToken(user: UserToken): string {
    return jwt.sign({id: user.id,username: user.username,role: user.role},_ENV.JWT_SECRET,{algorithm: "HS256",expiresIn: "8h"});
}

export function setToken(res: Response,token: string): void {
    res.cookie("token",token,{httpOnly: true,secure: _NODE_ENV === "production",sameSite: "lax",maxAge:8 * 60 * 60 * 1000});
}

export function removeToken(res: Response): void {
    res.clearCookie("token",{httpOnly: true,secure:_NODE_ENV === "production",sameSite: "lax"});

}