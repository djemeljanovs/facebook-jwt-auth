declare module 'start-server-webpack-plugin' {

    import { Plugin } from "webpack";

    export class StartServerPlugin extends Plugin {
        constructor(options?: any);
    }
}