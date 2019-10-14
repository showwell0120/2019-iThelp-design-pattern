# [Day26] 為厲害的怪獻上會心一擊 ─ 策略(Strategy) <模式篇>

嗨 大家好 我是一路爬坡的阿肥   

今天是澎湖遊 Day2，先來分享個照片吧～
hj/6

![photo](https://i.imgur.com/UBAlZWc.jpg)

---

## 情境描述

佐藤和肥是在異世界奮鬥多年的冒險者。雖然他的同伴們都不給力，還會扯後腿。但是憑著自己的努力和摸索，慢慢的等級愈升愈高，會的技能也愈來愈多了。現在他不僅可以發動不少技能，必要時候也會使用同伴的力量，一起打倒敵人。

不過因為愈強的技能，等待下次可以發動的時間也就愈長; 同時還要掌握同伴們的實力。所以和肥整理了一下作戰策略：

- 遇到會飛高麗菜：武器 啾啾丸第一型＋Dark尼斯的 肉盾戰術
- 遇到巨型蟾蜍：武器 啾啾丸第二型＋啊！嗑啞的 淨化魔法
- 遇到魔王軍幹部：武器 啾啾丸第三型＋會會的 explosion!!

對於和肥來說，只要關注現在的敵人是誰，然後發動對應的技能; 並不需要知道同伴跟武器如何實現技能。我們可以說，想在異世界生存下來，熟悉 **策略模式(Strategy Pattern)** 的運用，就是個不可或缺的實力。

## 策略模式 (Strategy Pattern)
先看guru上的解釋：
> Strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.   
(策略模式是行為型的模式，讓你可以為每個項目產生各自的類別，並且定義一系列的演算法。最後可以讓他們的物件可以交互使用。)

在系統開發中，最常用來做決策與判斷該執行哪段程式的方式，就是 `if else` 跟 `swtich case` 了。 

在決策樹簡單，執行程式也單純的情況下，我們可以用一般的語法來解決。但是如果決策的流程太多或太深，主程式可能光是 `if else` 或 `swtich case` 就佔了大半，大大降低可讀性; 另外決策內容的執行程式如果都有各自複雜的執行邏輯，而且沒有進行封裝的話，可能就不好維護和擴充，甚至也很難妥善分離功能，進行協同開發。

而策略模式就是要解決這種問題，來達到程式單一職責的目的。這個模式有兩大主要的類別，接下來搭配例子來說明。

### Strategy - 抽象策略類別 & 實體策略類別
對應到 `if else`的實作，其實就是區塊裡執行的內容。我們把執行的內容稱為 **策略**，並且為這些策略建立一個抽象的類別。其中，`excute()` 是定義每個策略類別需要實作複雜邏輯的方法，另外可以定義一些共用的方法供類別使用。
```typescript
abstract class FightStrategy {
    // 留給繼承的策略實作細節
    public excute(): any { }

    // 共用方法
    public setWeapon(e: E_ChuchuMaru): string {
        //...
    }
}
```

繼承抽象類別的策略類別，只要實作 `excute()`即可。
```typescript
export class Lavel1FightStrategy extends FightStrategy {
    public excute(): I_StrategyResult {
        //...
    }
}
```

### Context - 策略中心類別
這個類別負責決策的流程，以及策略類別的建立與存取。其中，`outputStrategy()` 會執行目前儲存的策略實體的 `excute()`，來產出決策的結果。 `setStrategy()` 可以根據實際情況，直接將新的策略實體傳入取代現有策略; 或是將判斷用的參數傳入，在這裏進行決策的流程，並且決定要建立哪種策略實體。
```typescript
export class StrategyCenter {
    protected strategy: FightStrategy;

    constructor(strategy?: FightStrategy) {
        if (strategy) this.strategy = strategy;
    }

    public setStrategy() {
        // ...
    }

    public outputStrategy(): I_StrategyResult {
        return this.strategy.excute();
    }
}
```

## 小結
已經熟悉策略模式的和肥，接下來不管遇到什麼樣的敵人，只要經過策略模式的演算，使出完美技能，相信可以在異世界闖出一片天地的！
 
> 今日もまた　バカにされたよ 今天又被當作笨蛋了         
> 恥ずかしいし　悔しいけれど 好丟臉　又好不甘心       
> へっちゃらさ　覚えておけよ 沒關係啦　 通通給我記住了   
> 今に笑い返してやる 趁現在笑吧　我一定會奉還的             
> 《この素晴らしい世界に祝福を！ED ちいさな冒険者》

[![ちいさな冒険者](https://img.youtube.com/vi/Pjl_Vud-Jmg/0.jpg)](http://www.youtube.com/watch?v=Pjl_Vud-Jmg 'ちいさな冒険者')

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day27-behavioral.stretegy.code`

明天會介紹怎麼用 Typescript 加上 React 實作流程，對於模式的應用跟程式會再更詳細的說明喔！

---

### 參考資料   

- [guru - Stretegy](https://refactoring.guru/design-patterns/stretegy)
- [策略模式 Strategy Pattern](https://skyyen999.gitbooks.io/-study-design-pattern-in-java/content/strategy.html)