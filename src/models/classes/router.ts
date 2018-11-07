import { IRoute } from "../interfaces/route";
import { Content } from "./content";

export class Router {
    routes: IRoute[];

    constructor(routes: IRoute[]) {
        this.routes = routes;
    }

    routing(location: Location) {
        this.routes.map(
            data => {
                let url = location.hash.slice(1) || '/';
                let parts, param;
                parts = url.substr(1).split('/');

                if (data.path === '/' && url == '/') {
                    let content = new Content(`./components/${data.component}`, data.controller);
                    content.getContent();
                } else if (data.path.match(/:id/g)) {
                    let mod = data.path.split('/:id')[0].slice(1);

                    while (parts.length) {
                        if (parts.shift() == mod) {
                            param = parts.shift();
                            let content = new Content(`./components/${data.component}`, data.controller, param);
                            content.getContent();
                        } else {
                            parts.shift();
                        }
                    }
                } else {
                    let mod = data.path.slice(1);
                    while (parts.length) {
                        if (parts.shift() == mod) {
                            let content = new Content(`./components/${data.component}`, data.controller);
                            content.getContent();
                        } else {
                            parts.shift();
                        }
                    }
                }
            }
        );
    }
}