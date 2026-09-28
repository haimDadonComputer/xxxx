import cookieParser from "cookie-parser";
import express, { Express } from "express";


export function createServer(): void {
    globalThis._Server = express();


    //גדרות בסיסיות
    _Server.use(express.json());
    _Server.use( express.urlencoded({extended: true}) );
    _Server.use(express.static("public"));
    _Server.use(cookieParser());

}



