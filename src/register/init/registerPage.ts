import { Child } from "hono/jsx";



export function registerPage(){
    globalThis._render = async function (component: Child): Promise<string> { return "<!DOCTYPE html>" + await component?.toString();}
}


export async function AddPage(api:string, roles: typeof _USER_ROLES[], jsx:any){
    if(!api.startsWith('/')) api = '/' +api;
    globalThis._Server.get(`${api}`, _authorizationMW(roles) , async (req,res)=>{
        res.type("html").send(await _render(jsx()));
    })
}