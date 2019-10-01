# [Day19] 我要輕鬆成為股海高手！ ─ 外觀(Facade) <模式篇>

嗨 大家好 我是一路爬坡的阿肥

---

## 情境描述

大肥是個資深的玩股票高手，使用過不少平台或軟體來協助他看盤分析。

最近他覺得市面上的平台或軟體還是無法能夠有效率的進行各種分析與查詢。所以他希望可以依照自己做功課的習慣，開發一個屬於自己的查詢工具。

不過大肥馬上想到一個問題：如果要開發這樣的工具的話，主要會有三大部分要實作：

-   跟各個股票相關的 API，例如台灣證交所來寫串接的程式
-   取到資料後需要進行格式處理，甚至可能還會有些運算
-   前端查詢的介面，以及與取得資料的接口

如果這三個部分都自己做的話，不僅花時間，而且在開發過程中可能會將這三塊的邏輯和實作混在一起寫，之後要維護或擴充功能也會很艱難。

所以大肥決定了，他要請兩位工讀生，一起完成這項大業！

## 分工合作 開始！

大肥開始跟工讀生 A、B 兩人說一些協同開發的細節，重點大致上是：

-   A 負責寫 API 的串接類別，B 寫資料的格式處理類別
-   大肥負責做前端操作與取得資料呈現
-   A、B 需要為老肥再做一個類別，這個類別要封裝他們寫的複雜程式，並且提供簡易的方法，就能同時做 API 串接跟資料處理的工作。

A、B 問了大肥：「為什麼還另外寫個類別來包裝我們寫的東西呢？」  
大肥就說了；「對於我來說，我只在乎輸入的條件是否可以回應正確的資料，接著再做我的事情。如果還要研究怎麼個別使用你們的東西的話，就太花時間了！」

大肥說的呢，正是外觀模式(Facade Pattern)的精神，接著介紹一下外觀模式吧。

## 外觀模式(Facade Pattern)

在 guru 上的解釋：

> Facade is a structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes.  
> (外觀是結構型的模式，可以為函示庫、或是框架，或甚至是其他類別的複雜集合，來提供統一簡化過的介面)

試想今天有個系統需要實作一個功能，而這個功能是需要集結 10 個子系統的部分功能來完成。如果直接就在主程式引用的話，就會像這樣：

```typescript
import {subsystem1}　from 'subsystem1';
import {subsystem2}　from 'subsystem2';
//...
class TargetFeature {
    //...
    constructor() {
        this.subsystem1 = new subsystem1(...);
        this.subsystem2 = new subsystem2(...);
        //...
    }

    // ...實作主要功能
}
```

如此一來，不但主程式的結構會變得龐雜，你可能還要了解各個子系統怎麼建構，需要使用什麼方法等等。最後你會發現光是要找主要功能的程式會花大半時間。

因此外觀模式做的事情就是，把這些複雜類別/子系統的行為封裝在一個外觀類別裡，並且針對 client 的需求提供方法，在方法裡再去調用各個複雜類別/子系統來做邏輯處理。

所以這個模式很簡單，我們只須建立一個外觀類別，並且建立複雜類別/子系統的實體來調用。

```typescript
export class StockFacade {
    protected stockAPI: StockAPI;
    protected stockProcessor: StockProcessor;

    constructor(param) {
        //建立複雜類別的實體
        this.stockAPI = param.stockAPI;
        this.stockProcessor = param.stockProcessor;
    }
    //提供外部簡易的調用方法
    public async getData(fieldName: T_FieldName, type: T_QueryType) {
        //...
        this.stockAPI.getStockData();
        this.stockProcessor.setReqResult(reqResult);
        //...
        return result;
    }
}

// 建立外觀類別的實體
let stockFacade = new StockFacade({ stockId: options.stockId });
// 只要調用getData就能取到資料
let data: IStockInfo[] = await stockFacade.getData(options.fieldName, options.queryType);
```

## 跟建設者模式(Builder Pattern)的比較

不知道大家跟阿肥我是不是有相同的疑問，這種封裝複雜類別的行為，提供簡易的接口方法，這不是跟建設者模式有 87%像嗎？

所以跟著阿肥一起釐清一下，這兩個的主要差異 —

建設者模式是**建立型**的模式，也就是說這個模式的目的是在**產生新的物件**；而外觀模式是**結構型**的模式，提供一個更高層級的介面供外部使用，重點是在讓外部可以更容易調用多個複雜類別或子系統。

## 小結

現在，大肥朝股海高手的目標又往前邁進一步了！

好歌值得一聽再聽！讓阿肥再 po 一次力宏的歌

> 這世界 很複雜 混淆我想說的話  
> 我不懂 太複雜的文法  
> ...  
> 寫一首簡單的歌 讓妳的心情快樂  
> 好像我 那麼的 平凡卻又 深刻  
> 《一首簡單的歌》

[![一首簡單的歌](https://img.youtube.com/vi/PihQffGOL54/0.jpg)](http://www.youtube.com/watch?v=PihQffGOL54 '一首簡單的歌')

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day20-strusctural.facade.code`

明天會介紹怎麼用 Typescript 加上 React 實作流程，對於模式的應用跟程式會再更詳細的說明喔！

---

### 參考資料

-   [guru - Facade](https://refactoring.guru/design-patterns/facade)
-   [外觀模式 Facade Pattern](https://dotblogs.com.tw/jesperlai/2018/04/15/153646)
-   [Builder vs Facade design pattern](https://stackoverflow.com/questions/39577474/builder-vs-facade-design-pattern)
