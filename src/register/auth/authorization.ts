import {Request,Response,NextFunction} from "express";

export function authorization() {
    globalThis._authorizationMW = (...roles: typeof _USER_ROLES[])=>(req: Request,res: Response,next: NextFunction) => {
        if (!req.user) {
            return res.redirect("/login");
        }
        if (roles.length === 0) {
            return next();
        }
        if (!roles.includes(req.user.role as any)) {
            return res.status(403).render("pages/403");
        }
        next();
    };

}