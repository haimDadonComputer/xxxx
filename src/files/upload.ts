import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
if (!fs.existsSync(_UPLOAD_FOLDER)) {
    fs.mkdirSync(_UPLOAD_FOLDER,{recursive: true});
}

export const upload = multer({
    storage: multer.diskStorage({
        destination: (req,file,callback) => {callback(null,_UPLOAD_FOLDER);},
        filename: (req,file,callback) => {
            const extension = path.extname(file.originalname).toLowerCase();
            const randomName = crypto.randomUUID();
            callback( null, randomName + extension);
        }
    }),
    limits: {
        fileSize: _MAX_FILE_SIZE, // מקסימום 10MB לקובץ
        files: 5, // מקסימום 5 קבצים בבקשה
        fields: 20,  // הגבלת שדות נוספים
        parts: 30   // הגבלת כמות החלקים הכוללת
    },
    fileFilter: (req: Express.Request,file: Express.Multer.File,callback: multer.FileFilterCallback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        if (!_ALLOWED_EXTENSIONS.has(extension))     return callback(new Error("File extension is not allowed"));
        if (!_ALLOWED_MIME_TYPES.has(file.mimetype)) return callback(new Error("File type is not allowed"));
        callback(null,true);
    }
});


