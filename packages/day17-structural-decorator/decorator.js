var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MainBox = /** @class */ (function () {
    function MainBox() {
    }
    MainBox.prototype.displayName = function () {
        return 'Nintendo Switch 主機';
    };
    MainBox.prototype.getPrice = function () {
        return 7500;
    };
    return MainBox;
}());
var SwitchDecorator = /** @class */ (function () {
    function SwitchDecorator(mainBox) {
        this.mainBox = mainBox;
    }
    SwitchDecorator.prototype.displayName = function () {
        return this.mainBox.displayName();
    };
    SwitchDecorator.prototype.getPrice = function () {
        return this.mainBox.getPrice();
    };
    return SwitchDecorator;
}());
var WithBlueRedHandle = /** @class */ (function (_super) {
    __extends(WithBlueRedHandle, _super);
    function WithBlueRedHandle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WithBlueRedHandle.prototype.displayName = function () {
        return _super.prototype.displayName.call(this) + " / \u7D05\u85CD\u624B\u628A\u7D44";
    };
    WithBlueRedHandle.prototype.getPrice = function () {
        return _super.prototype.getPrice.call(this) + 1000;
    };
    return WithBlueRedHandle;
}(SwitchDecorator));
var WithPokemonGame = /** @class */ (function (_super) {
    __extends(WithPokemonGame, _super);
    function WithPokemonGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WithPokemonGame.prototype.displayName = function () {
        return _super.prototype.displayName.call(this) + " /\u300A\u7CBE\u9748\u5BF6\u53EF\u5922\u300B\u8D85\u503C\u7D44\u5408\u5305";
    };
    WithPokemonGame.prototype.getPrice = function () {
        return _super.prototype.getPrice.call(this) + 1500;
    };
    return WithPokemonGame;
}(SwitchDecorator));
function makeSwitchProduct() {
    console.log('================');
    console.log('[先放入switch主機]');
    var mainBox = new MainBox();
    console.log("\u7522\u54C1\u540D\u7A31\uFF1A" + mainBox.displayName());
    console.log("\u7522\u54C1\u50F9\u683C\uFF1A" + mainBox.getPrice());
    console.log('----------------');
    var withBlueRedHandle = new WithBlueRedHandle(mainBox);
    console.log('[接著放入手把組]');
    console.log("\u7522\u54C1\u540D\u7A31\uFF1A" + withBlueRedHandle.displayName());
    console.log("\u7522\u54C1\u50F9\u683C\uFF1A" + withBlueRedHandle.getPrice());
    console.log('----------------');
    var withPokemonGame = new WithPokemonGame(withBlueRedHandle);
    console.log('[最後放入遊戲片]');
    console.log("\u7522\u54C1\u540D\u7A31\uFF1A" + withPokemonGame.displayName());
    console.log("\u7522\u54C1\u50F9\u683C\uFF1A" + withPokemonGame.getPrice());
    console.log('================');
}
makeSwitchProduct();
