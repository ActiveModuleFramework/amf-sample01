"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amf = require("active-module-framework");
const path = require("path");
new amf.Manager({
    remotePath: '/',
    execPath: '/',
    indexPath: path.resolve(__dirname, '../template/index.html'),
    rootPath: path.resolve(__dirname, '../public'),
    cssPath: ['css'],
    jsPath: ['js'],
    localDBPath: path.resolve(__dirname, '../db/app.db'),
    modulePath: path.resolve(__dirname, './modules'),
    jsPriority: [],
    debug: false,
    listen: 8080 //受付ポート/UNIXドメインソケット
    //listen:'dist/sock/app.sock'
});
//# sourceMappingURL=index.js.map