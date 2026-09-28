import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

export function scurityServer(): void {
    if (!globalThis._Server) _Error("SERVER does not exist. Run createServer() first.");
    _Server.disable("x-powered-by");
    helmetScurity();
    ratelimit();
    jsonlimit();
    formlimit();
    allowMethods();
    setHeaderScurity();
}



function helmetScurity(){
    _Server.use(helmet({
            frameguard: {action: "deny"},
            noSniff: true,
            referrerPolicy: {policy: "strict-origin-when-cross-origin"},
            hsts: process.env.NODE_ENV === "production"? {maxAge: 31536000,includeSubDomains: true}: false
        })
    );
}

function allowMethods(){
    _Server.use((req, res, next) => {
        if (!_allowedMethodsHTTP.includes(req.method)) 
            return res.status(405).send("Method Not Allowed");
        next();
    });
}

function setHeaderScurity(){
    _Server.use((req, res, next) => {res.setHeader("Cache-Control","no-store");next();});
    _Server.use((req, res, next) => {res.removeHeader("Server");next();});
}

function ratelimit(){
    _Server.use(rateLimit({
        windowMs: 60 * 1000,
        limit: 300,
        standardHeaders: "draft-8",
        legacyHeaders: false,
        message: "Too many requests. Please try again later."
    }));
}

function jsonlimit(){
    _Server.use(express.json({
        limit: "1mb",
        strict: true
    }));
}

function formlimit(){
    _Server.use(express.urlencoded({
        extended: true,
        limit: "1mb",
        parameterLimit: 1000
    }));
}