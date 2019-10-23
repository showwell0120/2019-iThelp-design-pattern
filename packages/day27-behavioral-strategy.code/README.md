# [Day27] 為厲害的怪獻上會心一擊 ─ 策略(Strategy) <實作篇>

嗨 大家好 我是一路爬坡的阿肥   

今天是澎湖遊 Day3，先來分享個照片吧～

南海跳島之旅+海洋牧場get開牡蠣技能   
晚上參加大人們的喝喝大會 充實的一天～

![photo](https://i.imgur.com/VYlVHJU.jpg)

---

## 宣告抽象類別與型態
我們先為一些資料進行型態宣告。`E_ChuchuMaru` 是武器-啾啾丸的形態選項; `E_Partner` 是伙伴的名稱選項。
```typescript
export enum E_ChuchuMaru { One = '壹之型', Two = '貳之型', Three = '參之型' };
export enum E_Partner { Akeia = '啊！嗑啞', Darknis = 'Dark尼斯', Hui = '會會' };
```

接著我們先建立最核心的策略類別，以抽象的方式來將策略該有的方法概念化。
```typescript
abstract class FightStrategy {
    // 共用方法
    public setWeapon(e: E_ChuchuMaru): string {
        return `武器使用：啾啾丸 ${e}`;
    }
    // 留給繼承的策略類別實作細節
    public excute(): any { }
}
```

## 各種作戰策略類別
我們有三個等級的作戰策略，所以建立三個類別，分別實作不同等級的策略細節。另外，三個類別對於伙伴會有相似的實作方式，我們再為伙伴產生技能的方式建立一個類別。
```typescript
class Partner {
    // 紀錄伙伴名稱
    protected partnerName: E_Partner;

    constructor(partnerName: E_Partner) {
        this.partnerName = partnerName;
    }
    // 設定技能，回傳伙伴名稱、發動的技能跟發動次數
    public setSkill(skill: string, count: number): string {
        return `${this.partnerName} 發動 ${skill} X ${count} 次`;
    }
}
```
舉其中一個策略類別來做說明。這個類別只要實作 `excute()`的方法即可，最後回傳有特定型態的結果。
```typescript
export class Lavel1FightStrategy extends FightStrategy {
    public excute(): I_StrategyResult {
        // 建立對應的partner
        let partner = new Partner(E_Partner.Darknis);
        // 回傳執行過的結果
        return {
            weapon: this.setWeapon(E_ChuchuMaru.One),
            partnerSkill: partner.setSkill('肉盾戰術', 3)
        }
    }
}

```

## 策略中心類別
策略中心的類別主要會有以下的屬性和方法：
- `strategy`: 紀錄當前使用的策略類別實體。可以在初始化傳入，也可以使用方法來替換策略。
- `setStrategy()`: 設定策略，可以依照需求傳入參數來判斷建立哪種策略實體; 或是直接傳入策略實體來替換。
- `outputStrategy()`:執行策略實體的 `excute()`，可以再做一些共同的業務邏輯，最後回傳結果。

```typescript
export class StrategyCenter {
    protected strategy: FightStrategy;

    constructor(strategy?: FightStrategy) {
        if (strategy) this.strategy = strategy;
    }

    public setStrategy(monsterLevel: number) {
        switch (monsterLevel) {
            case 1:
                this.strategy = new Lavel1FightStrategy();
                break;
            case 2:
                this.strategy = new Lavel2FightStrategy();
                break;
            case 3:
                this.strategy = new Lavel3FightStrategy();
                break;
            default:
                break;
        }
    }

    public outputStrategy(): I_StrategyResult {
        return this.strategy.excute();
    }
}
```

## 前端UI元件
我們建立一個FC元件 `FightStrategy`。並且先建立策略中心的實體。
```typescript
let strategyCenter = new Stg.StrategyCenter();
```

接著建立兩種狀態的管理，一個是魔獸等級，另一個是策略的執行結果。
```typescript
const [monsterLevel, setMonsterLevel] = React.useState<number>(null);
    const [strategyResult, setStrategyResult] = React.useState<Stg.I_StrategyResult>(null)
```

UI邏輯中，只要點擊到對應的魔獸button，就會變動 `monsterLevel` 的值。 一旦變動這個值，我們就開始執行策略。所以用 `React.useEffect` 來控制流程。
```typescript
React.useEffect(() => {
    if (monsterLevel && monsterLevel > 0) {
        strategyCenter.setStrategy(monsterLevel);
        let result = strategyCenter.outputStrategy();
        if (result) setStrategyResult(result);
    }
}, [monsterLevel]);
```

接著補完return 的jsx部分就大功告成囉！
```typescript
return <div>
    <div>
        <button onClick={e => setMonsterLevel(1)}>會飛的高麗菜</button>
        <button onClick={e => setMonsterLevel(2)}>巨型蟾蜍</button>
        <button onClick={e => setMonsterLevel(3)}>魔王軍幹部</button>
    </div>
    <div>
        <h3>佐藤和肥的作戰策略</h3>
        {strategyResult && <div><h4>{strategyResult.weapon}</h4><h4>{strategyResult.partnerSkill}</h4></div>}
    </div>
</div>
```

## Storybook 跑起來
執行`yarn story`後，開啟`http://localhost:6006`，然後切到`Strategy Pattern/FightStrategy`，就可以看到畫面了。

點擊相關的魔獸名稱，下方就會顯示對應的策略結果。

![result](https://i.imgur.com/w7m5GVE.gif)

## 小結
自己實作過一次後，就會發現這個模式的概念真的 很 簡 單！ 應用也可以非常廣泛。假設系統的需求是針據不同的輸入條件來執行不同邏輯，但是最後要以同一種格式回應給需求端的話，這個模式就非常適合，並且可以幫助你進行功能的劃分，在多人開發的情況下就能很請楚地分工。希望大家可以學以致用，幫助開發過程更順暢喔。

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day27-behavioral.strategy.code`