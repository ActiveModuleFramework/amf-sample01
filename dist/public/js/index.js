var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
///<reference path="../../../dist/public/js/jsw.d.ts"/>
//ページ読み込み時に実行する処理を設定
addEventListener("DOMContentLoaded", Main);
function Main() {
    var _this = this;
    var lastId = 0; //取得データの最終ID保存用
    //バックエンドからメッセージを取り出し表示する
    var load = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, client, _i, result_1, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, adapter.exec('TestModule.get', lastId)];
                case 1:
                    result = _a.sent();
                    if (result) {
                        client = mainWindow.getClient();
                        //受け取ったデータを表示
                        for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                            value = result_1[_i];
                            client.innerText += value.name + ":" + value.msg + "\n";
                            lastId = value.id;
                        }
                        //スクロールを最終位置へ設定
                        client.scrollTop = client.scrollHeight;
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    //通信用アダプターの作成
    var adapter = new JSW.Adapter();
    //メインウインドウの作成
    var mainWindow = new JSW.FrameWindow();
    mainWindow.setTitle('メインウインドウ');
    mainWindow.getClient().style.overflow = 'auto';
    mainWindow.setSize(640, 480);
    //ユーザ入力用フォームの作成
    var inputWindow = new JSW.TableFormView({ frame: true });
    inputWindow.setOrderTop(true); //ウインドウを常に最上位に
    inputWindow.setTitle('入力ウインドウ');
    inputWindow.setPos();
    //フォームにアイテムを追加
    inputWindow.addItem({ type: 'textbox', name: 'name', label: '名前', value: '太郎' });
    inputWindow.addItem({ type: 'textbox', name: 'msg', label: 'メッセージ' });
    inputWindow.addItem({ type: 'submit', name: 'submit', label: '送信',
        events: { click: function () { return __awaiter(_this, void 0, void 0, function () {
                var p, button, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            p = inputWindow.getParams() //フォームパラメータの取得
                            ;
                            button = inputWindow.getItem('submit');
                            if (!p.msg.length) return [3 /*break*/, 2];
                            button.innerText = '送信中';
                            return [4 /*yield*/, adapter.exec('TestModule.output', p.name, p.msg)];
                        case 1:
                            result = _a.sent();
                            if (result)
                                button.innerText = '送信成功！';
                            _a.label = 2;
                        case 2:
                            load(); //再ロード
                            return [2 /*return*/];
                    }
                });
            }); } } });
    load(); //メッセージのロード
}
//# sourceMappingURL=index.js.map