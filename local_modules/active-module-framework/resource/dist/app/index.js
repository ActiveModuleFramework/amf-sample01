"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amf = require("active-module-framework");
new amf.Manager({
    remotePath: '/',
    execPath: '/',
    rootPath: 'dist/public',
    indexPath: 'src/template/index.html',
    cssPath: ['css'],
    jsPath: ['js'],
    localDBPath: 'dist/db/app.db',
    modulePath: 'dist/app/modules',
    jsPriority: ['jsw.js'],
    debug: true,
    listen: 8080 //受付ポート/UNIXドメインソケット
    //listen:'dist/sock/app.sock'
});
//# sourceMappingURL=index.js.map