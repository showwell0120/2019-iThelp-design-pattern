/// <reference path="declaration.ts" />

// 抽象類別
abstract class BaseVermicelli {
  vermicelli: Declaration.I_Vermicelli = {
    content: [],
    trayed: false,
    spoons: 0,
    flavor: null,
    color: null
  };
  flavor: Declaration.T_Flavor;
  spoons: number;
  constructor(order: Declaration.I_Order) {
    //... 大家都有的備料過程 e.g. 準備大腸或蚵仔
    this.flavor = order.flavor;
    this.spoons = order.spoons;
  }

  // 取得麵線實體，留給繼承的類別實作
  getInstance() { }

  traying() {
    //... 大家都一樣的盛盤方法，可以在這裡就先寫好
    this.vermicelli.spoons = this.spoons;
    this.vermicelli.trayed = true;
  }
}

// 白麵線的類別
class WhiteVermicelli extends BaseVermicelli {
  constructor(order) {
    // 初始化，先做大家都會有的備料過程
    super(order);
    //...自己的備料
    this.vermicelli.content.push("白麵線");
  }

  //實作大腸麵線，完成後回傳麵線
  intestineFlavor() {
    this.vermicelli.flavor = this.flavor;
    this.vermicelli.color = "white";
    this.vermicelli.content = [
      ...this.vermicelli.content,
      "大腸",
      "香菜",
      "醋",
      "特製醬汁"
    ];
  }
  //實作蚵仔麵線，完成後回傳麵線
  oysterFlavor() {
    this.vermicelli.flavor = this.flavor;
    this.vermicelli.color = "white";
    this.vermicelli.content = [
      ...this.vermicelli.content,
      "蚵仔",
      "蒜泥",
      "胡椒粉",
      "特製醬汁"
    ];
  }

  // 實作取得麵線實體的方法
  getInstance() {
    switch (this.flavor) {
      case "intestine":
        return this.intestineFlavor();
      case "oyster":
        return this.oysterFlavor();
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
    this.vermicelli.content.push("紅麵線");
  }

  //實作大腸麵線
  intestineFlavor() {
    this.vermicelli.flavor = this.flavor;
    this.vermicelli.color = "white";
    this.vermicelli.content = [
      ...this.vermicelli.content,
      "大腸",
      "香菜",
      "醋"
    ];
  }
  //實作蚵仔麵線
  oysterFlavor() {
    this.vermicelli.flavor = this.flavor;
    this.vermicelli.color = "white";
    this.vermicelli.content = [
      ...this.vermicelli.content,
      "蚵仔",
      "蒜泥",
      "胡椒粉"
    ];
  }

  // 實作取得麵線實體的方法
  getInstance() {
    switch (this.flavor) {
      case "intestine":
        return this.intestineFlavor();
      case "oyster":
        return this.oysterFlavor();
      default:
        break;
    }
  }
}

// 前場人員的類別
class FrontStaff {
  contructor() { }
  // 判斷麵線顏色，將口味傳遞給類別並實作
  work(order: Declaration.I_Order) {
    switch (order.color) {
      case "white":
        return new WhiteVermicelli(order);
      case "red":
        return new RedVermicelli(order);
      default:
        return null;
    }
  }
}

// 麵線店的類別
export class VermicelliFactory {
  // 雇用前場人員
  frontStaff = new FrontStaff();

  // 兩種製作方式
  maker: WhiteVermicelli | RedVermicelli = null;

  constructor() { }

  // 收到菜單後的流程
  public receiveOrder(order: Declaration.I_Order) {
    this.maker = this.frontStaff.work(order);
    this.maker.getInstance();
    this.maker.traying();
  }
}
