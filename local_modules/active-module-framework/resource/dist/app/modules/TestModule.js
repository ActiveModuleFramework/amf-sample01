"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amf = require("active-module-framework");
/**
 *テストモジュール
 *
 * @export
 * @class TestModule
 * @extends {amf.Module}
 */
class TestModule extends amf.Module {
    async JS_add(a, b) {
        return a + b;
    }
}
exports.TestModule = TestModule;
//# sourceMappingURL=TestModule.js.map