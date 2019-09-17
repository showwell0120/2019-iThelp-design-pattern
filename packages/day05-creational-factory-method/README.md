# [Day5] 老闆：來一碗大腸麵線 ─ 工廠方法(Factory Method)

嗨 大家好 我是一路爬坡的阿肥

轉眼間 中秋連假就要結束了  
不過很快雙十連假就可以飛去澎湖渡假啦(灑花)  
啊 等一下(是真的突然想到)  
那不就表示就連在澎湖也要記得發文嗎 😳

---

## 情境描述

阿肥工作幾年後，終於存到了圓夢基金，在附近廟口開一家麵線店，希望可以看到每位客人吃完麵線後滿足的笑容。

阿肥只會做簡單的滷大腸跟處理蚵仔，所以目前只有大腸麵線跟蚵仔麵線。客人只要在菜單上勾哪一個，並且交給阿肥，稍等片待就可以拿到熱騰騰的麵線了。

然而，這兩種麵線看似作法都差不多，卻有他的堅持，所以兩種麵線加的佐料會不太一樣，兩種吃起來各有其風味。

## 來定義什麼叫麵線吧！

```typescript
// 麵線的口味種類，目前有大腸跟蚵仔兩種選項
type T_Flavor = "intestine" | "oyster";

// 麵線的組成
interface I_Vermicelli {
    flavor: T_Flavor
}

// 客人的菜單組成，紀錄口味跟需要附幾支湯匙
interface I_Order {
    flavor?: T_Flavor;
    spoon?: number;
}
```

## 先做再說
```typescript
// 做大腸麵線的流程
class IntestineVermicelli {
    private _vermicelli: I_Vermicelli;
    constructor(props) {
      //...備料
    }
    get vermicelli(): I_Vermicelli {
        return this._vermicelli;
    }
    // 準備麵線
    cook() {
        // this._vermcelli = ...
    }
    // 盛盤
    traying() {
        // this._vermcelli = ...
    }
}

// 做蚵仔麵線的流程
class OysterVermicelli {
    private _vermicelli: I_Vermicelli;
    constructor(props) {
      //...備料
    }
    get vermicelli(): I_Vermicelli {
        return this._vermicelli;
    }
    // 準備麵線
    cook() {
        // this._vermicelli = ...
    }
    // 盛盤
    traying() {
        // this._vermicelli = ...
    }
}

// 收到菜單的流程
class VermicelliStore {
    order: I_Order = {
        flavor: 'intestine',
        spoon: 1
    };

    // 後場人員目前會兩種製作方式
    maker: OysterVermicelli | IntestineVermicelli;

    constructor() { }

    // 收到菜單後的流程，結果要傳回麵線的實體
    public static receiveOrder(order: I_Order): I_Vermicelli {
        // 內定有預設的菜單選項，如果客人沒填就走預設選項
        this.order = { ...this.order, ...order };

        const { flavor } = this.order;

        // 用if/else 決定要做哪種麵線
        if (flavor == 'intestine') this.maker = new IntestineVermicelli();
        else if (flavor == 'oyster') this.maker = new OysterVermicelli();

        // 每種麵線都有各自烹飪和盛盤的方法
        this.maker.cook();
        this.maker.traying();

        return this.maker.vermicelli;
    }
}
```

因為阿肥的堅持好口味，讓生意絡繹不絕，阿肥又陸續開發了幾個新口味。   

不過阿肥發現：新增愈多口味，收到菜單那邊就會形成超長的 if/else來判斷，然後還要另外做新口味麵線的流程。   

是否可以先讓收到菜單那邊的流程單純一點呢？

## 簡單工廠
有，那就是增加人手！

阿肥聘了一個前場人員A，A要做的事情就是判斷客人訂的口味，然後進行備料，接著後場人員就可以進行烹飪和盛盤。

```typescript
// 新增前場人員要做的流程
class DetectFlavor {
    contructor() { }
    // 用switch減少巢狀if/else
    pubic static work(flavor: T_Flavor):I_Vermicelli {
        switch (flavor) {
            case 'intestine':
                return new IntestineVermicelli();
            case 'oyster':
                return new OysterVermicelli();
            default:
                return null;
        }
    }
}

class VermicelliStore {
  //...
  //...
  public static receiveOrder(order: I_Order): I_Vermicelli {
    //...
    // 把決定要做哪種麵線交給前場人員執行
    this.maker = DetectFlavor.work(flavor);
    //...
  }
}
```
我們看到```DetectFlavor```這個類別把決定要哪種麵線的流程封裝(encapsulate)起來，外面的人只要知道最後的結果是什麼就好，這種就叫做 **簡單工廠**。這在Web前端開發中是蠻常應用的模式，因為建立物件的邏輯通常沒那麼複雜，用簡單工廠就能實現。

## 工廠方法

## 小結

> 面對新的世界　需要一些新口味  
> 態度應該正面 用快樂去調味  
> 希望每道餐點都能夠完美   
> ─《開心餐廳》

[![開心餐廳](https://img.youtube.com/vi/oXTPEJwXEjc/0.jpg)](http://www.youtube.com/watch?v=oXTPEJwXEjc "開心餐廳")

---

### 參考資料

- [設計模式 - 工廠方法及抽象工廠](https://blog.techbridge.cc/2017/05/22/factory-method-and-abstract-factory/)
