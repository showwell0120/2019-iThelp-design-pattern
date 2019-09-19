# [Day5] 老闆：來一碗大腸麵線 ─ 工廠方法(Factory Method) <模式篇>

嗨 大家好 我是一路爬坡的阿肥

轉眼間 中秋連假結束了  
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

// 客人的菜單組成，紀錄口味跟需要附幾支湯匙
interface I_Order {
  flavor?: T_Flavor;
  spoon?: number;
}

// 最後給客人的麵線組成
export interface I_Vermicelli extends I_Order {
  trayed: boolean;
  content: string[];
}
```

## 先做再說

```typescript
// 做大腸麵線的流程
class IntestineVermicelli {
  vermicelli: I_Vermicelli = {
    //...
  };
  constructor(props) {
    //...備料
  }

  // 準備麵線
  cook() {
    // ...
  }

  // 盛盤
  traying() {
    // ...
  }
}

// 做蚵仔麵線的流程
class OysterVermicelli {
  //...
}

// 收到菜單的流程
class VermicelliFactory {
  // 兩種製作方式
  maker: OysterVermicelli | IntestineVermicelli = null;

  constructor() {}

  // 收到菜單後的流程，結果要傳回麵線的實體
  public static receiveOrder(order: I_Order): I_Vermicelli {
    // 用if/else 決定要做哪種麵線
    if (order.flavor == "intestine") this.maker = new IntestineVermicelli();
    else if (order.flavor == "oyster") this.maker = new OysterVermicelli();

    // 每種麵線都有各自烹飪和盛盤的方法
    this.maker.cook();
    this.maker.traying();
  }
}
```

因為阿肥的堅持好品質，生意絡繹不絕，阿肥又陸續開發了幾個新口味。

不過阿肥發現：新增愈多口味，收到菜單那邊就會形成超長的 if/else 來判斷，然後還要另外做新口味麵線的流程。

是否可以先讓收到菜單那邊的流程單純一點呢？

## 簡單工廠

阿肥想到應該再多請一個人分工接到菜單後的事情，於是聘了一個前場人員 A，A 要做的事情就是判斷客人訂的口味，然後進行備料，接著後場人員就可以進行烹飪和盛盤。

```typescript
// 新增前場人員要做的流程
class FrontStaff {
  contructor() {}
  // 用switch減少巢狀if/else
  work(order): I_Vermicelli {
    switch (order.flavor) {
      case "intestine":
        return new IntestineVermicelli();
      case "oyster":
        return new OysterVermicelli();
      default:
        return null;
    }
  }
}

class VermicelliFactory {
  // 雇用前場人員
  frontStaff = new FrontStaff();
  //...
  public static receiveOrder(order: I_Order): I_Vermicelli {
    //...
    // 把決定要做哪種麵線交給前場人員執行
    this.maker = this.frontStaff.work(order);
    //...
  }
}
```

`FrontStaff`這個類別，把決定要哪個口味的麵線的流程封裝(encapsulate)起來，外面的人只要知道最後的結果是什麼就好，這種就叫做 **簡單工廠**。這在 Web 前端開發中是蠻常應用的模式，因為建立物件的邏輯通常沒那麼複雜，用簡單工廠就能實現。

## 紅麵線跟白麵線

做了一陣子之後，突然有位熟客跟阿肥說：「大家都用紅麵線來做，不知道用一般的麵線的話口感會怎樣...」 這句無心的話卻激起了阿肥想挑戰的鬥志，如果白麵線熱門的話，就可以跟市場做出區隔，生意也會愈好。

不過白麵線跟紅麵線的處理方式不一樣，所以得另外做兩個口味的白麵線流程。

```typescript
// 多一個麵線顏色的種類
type T_Color = "white" | "red";

// 菜單多一個顏色選項
interface I_Order {
  //...
  color: T_Color;
}

// 白麵線的大腸口味的流程
class WhiteIntestineVermicelli {
    // ...
}

// 白麵線的蚵仔口味的流程
class WhiteOysterVermicelli {
    // ...
}

class FrontStaff {
    contructor() { }
    // 先判斷麵線顏色，再決定口味
    pubic static work({flavor, color}) {
        if(color == 'white') {
            switch (flavor) {
                case 'intestine':
                    return new WhiteIntestineVermicelli();
                case 'oyster':
                    return new WhiteOysterVermicelli();
                default:
                    return null;
            }
        } else if(color === 'red') {
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

```

阿肥突然發現不對勁：只是多一個麵線顏色的選擇，不但要多兩個製造的流程類別，在`FrontStaff`中還要多一個 if/else 來判斷，對前場人員來講負擔太重了。顯然簡單工廠已經無法滿足阿肥現在的需求了！

## 工廠方法

阿肥回過頭看這紅麵線跟白麵線的流程，發現他們都有相似的結構：

- 都有大腸跟蚵仔兩個口味
- contructor - 進行備料
- vermicelli 的 getter ─ 取得已經完成的麵線
- cook() ─ 烹調的方法
- traying() - 盛盤的方法

所以阿肥決定，先幫這些流程定義一個 \*\*抽象(abstract)的類別，接著根據麵線顏色來做兩種流程的類別，並繼承這個抽象類別。

```typescript
abstract class BaseVermicelli {
  private _vermicelli: I_Vermicelli;
  private _flavor: T_Flavor;
  constructor(props: T_Flavor) {
    //... 大家都有的備料過程 e.g. 準備大腸或蚵仔
    this._flavor = props;
  }
  get vermicelli(): I_Vermicelli {
    return this._vermicelli;
  }
  // 取得麵線實體，留給繼承的類別實作
  getInstance() {}

  traying() {
    //... 大家都一樣的盛盤方法，可以在這裡就先寫好
  }
}

class WhiteVermicelli extends BaseVermicelli {
  constructor(order) {
    // 初始化，先做大家都會有的備料過程
    super(order);
    //...自己的備料
  }
  //實作大腸麵線
  intestineFlavor() {}
  //實作蚵仔麵線
  oysterFlavor() {}

  // 實作取得麵線實體的方法
  getInstance() {
    switch (this.flavor) {
      case "intestine":
        this.flavor = this.intestineFlavor();
      case "oyster":
        this.flavor = this.oysterFlavor();
      default:
        break;
    }
  }
}

class RedVermicelli extends BaseVermicelli {
  //...
}

class FrontStaff {
  contructor() {}
  // 判斷麵線顏色，將口味傳遞給類別並實作
  work(order: I_Order) {
    switch (color) {
      case "white":
        return new WhiteVermicelli(order);
      case "red":
        return new RedVermicelli(order);
      default:
        return null;
    }
  }
}
```

Magic! 前場人員終於不用擔心看著一堆 if/else 跟 switch case 來決定到底要準備做哪一種麵線，工作起來也更有效率了 🎉

我們看工廠方法的維基百科解釋：

> 定義一個建立物件的介面，但讓實現這個介面的類來決定實體化哪個類。工廠方法讓類別的實體化推遲到子類別中進行。

對照阿肥的例子來看，我們建立的`BaseVermicelli`就是個**建立物件的介面**，; 而實現`BaseVermicelli`的`WhiteVermicelli`跟`RedVermicelli`類別，在執行的`getInstance()`的時候，才知道要實作哪個口味。

## 小結

現在，阿肥的生意興隆，面對各種挑戰也更積極了！

> 面對新的世界　需要一些新口味  
> 態度應該正面 用快樂去調味  
> 希望每道餐點都能夠完美  
> ─《開心餐廳》

[![開心餐廳](https://img.youtube.com/vi/oXTPEJwXEjc/0.jpg)](http://www.youtube.com/watch?v=oXTPEJwXEjc "開心餐廳")

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day6-creational-factory-method.code`

明天會介紹怎麼用 Typescript 加上 React 實作阿肥麵線店，有興趣的話可以先下載專案預習喔！

---

### 參考資料

- [Refactoring.Guru - Factory Method](https://refactoring.guru/design-patterns/factory-method)
- [設計模式 - 工廠方法及抽象工廠](https://blog.techbridge.cc/2017/05/22/factory-method-and-abstract-factory/)
