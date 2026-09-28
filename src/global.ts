import { Express } from "express";
import { UserToken } from "./interfaces";



declare global {

    var _Server: Express;
    var _Error: any;
    var _NODE_ENV: "production"|"dev";
    var _port: number;
    var _MAX_TOKEN_AGE: number;
    var _allowedMethodsHTTP: string[];
    var _UPLOAD_FOLDER :string
    var _authorizationMW :any
    var _MAX_FILE_SIZE :number
    var _ALLOWED_EXTENSIONS :Set<string>
    var _ALLOWED_MIME_TYPES :Set<string>
    var _ENV :{
        JWT_SECRET : string
    }
    var _USER_ROLES : "admin"|"user"


    namespace Express {
        interface Request {
            user: UserToken | null;
        }
    }
}



export {};