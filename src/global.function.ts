import path from "path";

export function setGlobal(){
	globalThis._ENV = {
		JWT_SECRET  :  "dd",
	};
	globalThis._allowedMethodsHTTP = ["GET","POST","PUT","PATCH","DELETE","HEAD","OPTIONS"];
	globalThis._UPLOAD_FOLDER = path.join(process.cwd(), "uploads");
	globalThis._MAX_FILE_SIZE =  10 * 1024 * 1024; // 10MB
	globalThis._ALLOWED_EXTENSIONS = new Set([".jpg",".jpeg",".png",".webp",".pdf",".docx",".xlsx"]);
	globalThis._ALLOWED_MIME_TYPES = new Set(["image/jpeg","image/png","image/webp","application/pdf","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]);
	globalThis._port  =  3002;
	globalThis._NODE_ENV  = "dev" ;
	globalThis._MAX_TOKEN_AGE  = 8 * 60 * 60 * 1000 ;



	globalThis._Error = (msg)=>{
	throw new Error(msg);
	}

}