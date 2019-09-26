# [Day13] 我需要一台喵喵翻譯機 ─ 轉接器(Adapter) <模式篇>

嗨 大家好 我是一路爬坡的阿肥

阿肥在寫本篇範例的時候  
認真地想 如果真的有人成功發明出喵喵翻譯機的話  
應該會造福各地的奴才們  
然後就變成世界首富 人生勝利組！

---

## 情境描述

> 世界上最遠的距離　不是生與死  
> 而是妳對我喵喵叫時　卻不知道妳在示愛還是生氣

當汪汪或是喵喵對主人(奴才)叫或是搖尾巴的時候，通常相處久了，就會知道他們想表達什麼。可是如果是剛成為主人(奴才)的話，一定會恨不得要台翻譯機，尤其養的是一隻活潑~~GY~~的喵喵時。

遺憾的是，現實中還沒有人成功發明出這樣的產品。不過，當真的出現的話，這台翻譯機會是怎麼運作呢？

## 這個世界需要轉接器模式

我們先看 guru 的解釋：

> You can create an adapter. This is a special object that converts the interface of one object so that another object can understand it.  
> (妳可以建立一個轉接器。他是一個可以把物件的介面轉換成另一個物件認識的特別物件)

如果覺得有點饒舌的話，可以想想生活周遭跟**轉接器**有關的事物：

-   去歐美旅遊時，需要**萬國插頭**，在各種不一樣的插座跟電器之間加一個轉接頭做轉換
-   手機要把照片存進電腦的話，需要有**USB 轉接線**，來連結手機跟電腦
-   當阿嬤要出國玩的時候，會買**多國翻譯機**，幫助阿嬤跟外國人溝通

所以其實這個模式已經無所不在，在軟體開發的世界也是。當有個 client 是希望可以透過已知介面來存取未知類別的方法結果時，我們就需要實作這個介面，並且這個介面可以做到這兩件事情：

-   可接收由未知類別產生的實體
-   實作某 client 已知的目標介面，並且在目標介面提供的方法中，調用實體的方法

我們回到情境的一開始，如果要用轉接器模式實作喵喵翻譯機的話，需要產生三種類別：

### Target - 目標類別

通常目標類別會為抽象類別，強調定義了 client 會使用到的方法和屬性。實作細節會再由繼承的轉接器類別來寫轉接的邏輯。

```typescript
abstract class Target implements AdapterDeclaration.I_Target {
    public getMood(voice: string): string {
        return null;
    }
    // ...
}
```

### Adapteee - 被轉接的類別

一般可產生實體和調用方法的類別。不會為 client 再做變動。

```typescript
export class MeowAdaptee implements AdapterDeclaration.I_MeowAdaptee {
    constructor() {}
    meowMeow(voice: any): string {
        //...
    }
}
```

### Adapter - 轉接器類別

繼承了目標類別，轉接器的實體將被轉接的實體作為自己的屬性，並調用被轉接的實體方法來實作轉接邏輯。

```typescript
export class MeowAdapter extends Target {
    private meowAdaptee: MeowAdaptee;

    constructor(adaptee: MeowAdaptee) {
        super();
        this.meowAdaptee = adaptee;
    }

    public getMood(voice: any): string {
        // ...
    }
    // ...
}
```

## 小結

> 我們一起學貓叫 一起喵喵喵喵喵  
> 在你面前撒個嬌 哎呦喵喵喵喵喵  
> 我的心臟砰砰跳 迷戀上你的壞笑  
> 你不說愛我我就喵喵喵  
> 《學貓叫 Say Meow Meow》

[![學貓叫 Say Meow Meow](https://img.youtube.com/vi/OHbwkZgkBIU/0.jpg)](http://www.youtube.com/watch?v=OHbwkZgkBIU '學貓叫 Say Meow Meow')

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day14-strusctural.adapter.code`

明天會介紹怎麼用 Typescript 加上 React 實作流程，對於模式的應用跟程式會再更詳細的說明喔！

### 參考資料

-   [guru- Adapter](https://refactoring.guru/design-patterns/adapter)
