import { setGlobal } from "./global.function";
import { authentication } from "./register/auth/authentication";
import { authorization } from "./register/auth/authorization";
import { createServer } from "./register/server/createServer";
import { scurityServer } from "./register/server/scurityServer";
import { serverListener } from "./register/server/serverListener";
import { render } from "./render";
import { Home } from "./views/pages/Home";



function registerHome(){
    _Server.get("/", async (req, res) => {
        res.type("html").send(await render(Home()));
    });
}

function registerAdminPanel(){
    _Server.get("/", async (req, res) => {
        res.type("html").send(await render(Home()));
    });
}


async function main(){
    setGlobal();
    //server:
        createServer();
        scurityServer();

    // auth:
        authentication()
        authorization()


    //home:
        registerHome()
        registerAdminPanel()

   //server:
        serverListener();

}



main();