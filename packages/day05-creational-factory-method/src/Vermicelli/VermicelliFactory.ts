
// 麵線顏色的種類
type T_Color = "white" | "red";
// 麵線的口味種類，目前有大腸跟蚵仔兩種選項
type T_Flavor = "intestine" | "oyster";

// 客人的菜單內容
interface I_Order {
    flavor: T_Flavor;
    color: T_Color;
    spoons: number;
}

// 最後給客人的麵線組成
interface I_Vermicelli extends I_Order {
    trayed: boolean;
    content: string[];
}

// 抽象類別
abstract class BaseVermicelli {
    vermicelli: I_Vermicelli;
    flavor: T_Flavor;
    constructor(order: I_Order) {
        //... 大家都有的備料過程 e.g. 準備大腸或蚵仔
        this.flavor = order.flavor;
    }

    // 取得麵線實體，留給繼承的類別實作
    getInstance() { }

    traying() {
        //... 大家都一樣的盛盤方法，可以在這裡就先寫好
        this.vermicelli.spoons = this.vermicelli.spoons;
        this.vermicelli.trayed = true;
    }
}

// 白麵線的類別
class WhiteVermicelli extends BaseVermicelli {
    constructor(order) {
        // 初始化，先做大家都會有的備料過程
        super(order);
        //...自己的備料
        this.vermicelli.content.push("白麵線")
    }

    //實作大腸麵線，完成後回傳麵線
    intestineFlavor() {
        this.vermicelli.content = [...this.vermicelli.content, "大腸", "香菜", "醋", "特製醬汁"];
    }
    //實作蚵仔麵線，完成後回傳麵線
    oysterFlavor() {
        this.vermicelli.content = [...this.vermicelli.content, "蚵仔", "蒜泥", "胡椒粉", "特製醬汁"];
    }

    // 實作取得麵線實體的方法
    getInstance() {
        switch (this.flavor) {
            case 'intestine':
                return this.intestineFlavor()
            case 'oyster':
                return this.oysterFlavor()
            default:
                break;
        }
    }
}

// 紅麵線的類別
class RedVermicelli extends BaseVermicelli {
    constructor(order) {
        // 初始化，先做大家都會有的備料過程
        super(order);
        //...自己的備料
        this.vermicelli.content.push("紅麵線")
    }

    //實作大腸麵線，完成後回傳麵線
    intestineFlavor() {
        this.vermicelli.content = [...this.vermicelli.content, "大腸", "香菜", "醋"];
    }
    //實作蚵仔麵線，完成後回傳麵線
    oysterFlavor() {
        this.vermicelli.content = [...this.vermicelli.content, "蚵仔", "蒜泥", "胡椒粉"];
    }

    // 實作取得麵線實體的方法
    getInstance() {
        switch (this.flavor) {
            case 'intestine':
                return this.intestineFlavor()
            case 'oyster':
                return this.oysterFlavor()
            default:
                break;
        }
    }
}

// 前場人員的類別
class FrontStaff {
    contructor() { }
    // 判斷麵線顏色，將口味傳遞給類別並實作
    work(order: I_Order) {
        switch (order.color) {
            case 'white':
                return new WhiteVermicelli(order);
            case 'red':
                return new RedVermicelli(order);
            default:
                return null;
        }
    }
}

// 阿肥的店的類別
class VermicelliStore {
    frontStaff = new FrontStaff();
    // 後場人員目前會兩種製作方式
    maker: WhiteVermicelli | RedVermicelli = null;

    constructor() { }

    // 收到菜單後的流程，結果要傳回麵線的實體
    public receiveOrder(order: I_Order): I_Vermicelli {
        this.maker = this.frontStaff.work(order);
        this.maker.getInstance();
        this.maker.traying();

        return this.maker.vermicelli;
    }
}