import type { Child } from "hono/jsx";


export async function render(component: Child): Promise<string> {
    return "<!DOCTYPE html>" + await component?.toString();
}


