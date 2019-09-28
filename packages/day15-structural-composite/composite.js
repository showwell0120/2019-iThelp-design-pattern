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
var AbstractMenu = /** @class */ (function () {
    function AbstractMenu() {
    }
    AbstractMenu.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    AbstractMenu.prototype.getParent = function () {
        return this.parent;
    };
    AbstractMenu.prototype.add = function (menus) { };
    AbstractMenu.prototype.remove = function (menu) { };
    AbstractMenu.prototype.isComposite = function () {
        return true;
    };
    return AbstractMenu;
}());
var DefaultWording = {
    type: '肥肥麵線＆壹LAN拉麵 聯合菜單',
    description: '兩家一起點，讓你好方便！'
};
var CompositeMenu = /** @class */ (function (_super) {
    __extends(CompositeMenu, _super);
    function CompositeMenu(type, description) {
        if (type === void 0) { type = DefaultWording.type; }
        if (description === void 0) { description = DefaultWording.description; }
        var _this = _super.call(this) || this;
        _this.children = [];
        _this.type = type;
        _this.description = description;
        return _this;
    }
    CompositeMenu.prototype.add = function (items) {
        var me = this;
        this.children = this.children.concat(items);
        this.children.map(function (child) { return child.setParent(me); });
    };
    CompositeMenu.prototype.remove = function (item) {
        var itemIndex = this.children.indexOf(item);
        this.children.splice(itemIndex, 1);
        item.setParent(null);
    };
    CompositeMenu.prototype.printContent = function () {
        var results = "\n[" + this.type + "] " + this.description + "\n";
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            results = results.concat(child.printContent() + "\n");
        }
        return results;
    };
    return CompositeMenu;
}(AbstractMenu));
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product(name, price) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.price = price;
        return _this;
    }
    Product.prototype.isComposite = function () {
        return false;
    };
    Product.prototype.printContent = function () {
        return "- " + this.name + " " + this.price + "\u5143";
    };
    return Product;
}(AbstractMenu));
var vermicelliProduct1 = new Product('大腸口味', 40);
var vermicelliProduct2 = new Product('蚵仔口味', 40);
var vermicelliMenu = new CompositeMenu('麵線', '');
vermicelliMenu.add([vermicelliProduct1, vermicelliProduct2]);
var drinkProduct1 = new Product('古早味紅茶', 20);
var drinkProduct2 = new Product('彈珠汽水', 30);
var drinkMenu = new CompositeMenu('涼飲', '');
drinkMenu.add([drinkProduct1, drinkProduct2]);
var FatFatMenu = new CompositeMenu('肥肥麵線攤', '想吃點台味來這邊');
FatFatMenu.add([vermicelliMenu, drinkMenu]);
var ramenProduct1 = new Product('壹LAN特製拉麵', 120);
var ramenProduct2 = new Product('鮭魚味噌湯', 40);
var IChiRanMenu = new CompositeMenu('壹LAN拉麵店', 'ようこそ、こちらへ！');
IChiRanMenu.add([ramenProduct1, ramenProduct2]);
var linkedInMenu = new CompositeMenu();
linkedInMenu.add([IChiRanMenu, FatFatMenu]);
console.log(linkedInMenu.printContent());
