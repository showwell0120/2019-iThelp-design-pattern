var SomethingSingleton = /** @class */ (function () {
    // 建構子要設為私有，避免外部直接用 new 來建立實體
    function SomethingSingleton() {
    }
    // 提供外部取得實體的方法，並且實體只存在一個的限制
    SomethingSingleton.getSomething = function () {
        if (!SomethingSingleton.something) {
            SomethingSingleton.something = new SomethingSingleton();
        }
        return SomethingSingleton.something;
    };
    //可針對實體提供一些操作上的方法
    SomethingSingleton.prototype.someBusinessLogic = function () {
        // ...
    };
    return SomethingSingleton;
}());
function clientCode() {
    var s1 = SomethingSingleton.getSomething();
    var s2 = SomethingSingleton.getSomething();
    if (s1 === s2) {
        console.log("耶!獨體模式成功~取到的都是同一個!");
    }
    else {
        console.log("歐!獨體模式失敗~我們不一樣!");
    }
}
clientCode();
