import { setGlobal } from "./global.function";
import { authentication } from "./register/auth/authentication";
import { authorization } from "./register/auth/authorization";
import { AddPage, registerPage } from "./register/init/registerPage";
import { createServer } from "./register/server/createServer";
import { scurityServer } from "./register/server/scurityServer";
import { serverListener } from "./register/server/serverListener";
import { Home } from "./views/pages/Home";


async function main(){
    // init:
        setGlobal();
        registerPage()

    //server:
        createServer();
        scurityServer();

    // auth:
        authentication()
        authorization()


    //pages:
        AddPage("/",[],Home)

   //server:
        serverListener();

}



main();