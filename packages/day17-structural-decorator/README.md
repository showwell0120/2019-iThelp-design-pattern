# [Day17] Switch的各種同捆包 統統裝起來 ─ 裝飾者(Decorator) <模式篇>

嗨 大家好 我是一路爬坡的阿肥   


---

## 情境描述
老肥是販賣遊戲的經銷商。因為今年任天堂的Switch大夯，所以老肥進了一堆主機、配件跟遊戲片，並且希望主機可以搭配不同的配件與遊戲同捆販售。

原本老肥乖乖地一個字一個字打，準備產品的標籤。但是他愈打愈覺得麻煩 - 每個同捆包一定會有主機，所以每次就複製上一個產品的主機名稱再貼上; 可是配件跟遊戲片有各種的組合，想要每次都靠複製貼上也是很麻煩！另外產品價格也要每次產生一種同捆包就要計算一次。

老肥想通了！其實準備同捆包就像人穿衣服一樣，Switch主機像是人，而配件跟遊戲片就像衣服，人靠不同的衣服來裝飾自己，呈現不同風格; Switch主機搭配不同配件跟遊戲就會吸引不同客群來購買。

所以，老肥決定要用裝飾模式(Decorator Pattern)來解決製造產品標籤的問題！

## 裝飾者模式
在guru上的解釋：
> Decorator is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.   
(裝飾者是結構型的模式，能讓你將目標物件透過包裝的方式傳入含有特定行為的特別物件，並且產生出具有特定方法的目標物件)

換句話說，裝飾模式就像繼承一樣，可以擁有原本物件的屬性方法，並且進行功能的擴充。可是裝飾者有個優點是，假設有多個功能是要基於某個類別上任意搭配擴充的話，以繼承的方式需要建立很多個類別; 但是裝飾者可以提供了更彈性的選擇，動態地為物件擴充功能。

實作裝飾模式有幾個重點：

- 共同的實作介面
- 目標物件不需靠裝飾者就能單獨使用
- 裝飾者需要有個屬性參考到目標元件的實體

我們來做做看吧！

### 共同的實作介面
以例子來說，我們需要 `displayName()` 印出產品的全名; `getPrice()` 取得產品計算後的價格。
```typescript
interface NintendoSwitch {
    displayName(): string;
    getPrice(): number;
}
```

### 目標物件的類別
實作介面，建立Switch主機名稱與價格的類別。

```typescript
class MainBox implements NintendoSwitch {
    public displayName(): string {
        return 'Nintendo Switch 主機';
    }

    public getPrice(): number {
        return 7500;
    }
}
```

### 裝飾者類別
實作介面，將主機的實體傳入，並調用實體的方法來實作 `displayName()` 跟 `getPrice()` 的方法。

```typescript
class SwitchDecorator implements NintendoSwitch {
    protected mainBox: MainBox;

    constructor(mainBox: MainBox) {
        this.mainBox = mainBox;
    }

    public displayName(): string {
        return this.mainBox.displayName();
    }

    public getPrice(): number {
        return this.mainBox.getPrice();
    }
}
```

### 建立裝飾者
我們建立了兩個特定的裝飾者 `WithBlueRedHandle` 跟 `WithPokemonGame`。

這裡有個小技巧，我們需要調用上層類別的方法再疊加裝飾者的內容。所以我們用 **`super`**來調用上層類別的 `displayName()` 跟 `getPrice()`。

``` typescript
class WithBlueRedHandle extends SwitchDecorator {
    public displayName(): string {
        return `${super.displayName()} / 紅藍手把組`;
    }

    public getPrice(): number {
        return super.getPrice() + 1000;
    }
}

class WithPokemonGame extends SwitchDecorator {
    public displayName(): string {
        return `${super.displayName()} /《精靈寶可夢》超值組合包`;
    }

    public getPrice(): number {
        return super.getPrice() + 1500;
    }
}
```

## Switch同捆包 裝起來

最後，我們實際產生這些物件看看。
```typescript
console.log('================');
console.log('[先放入switch主機]');
const mainBox = new MainBox();
console.log(`產品名稱：${mainBox.displayName()}`);
console.log(`產品價格：${mainBox.getPrice()}`);
console.log('----------------');
const withBlueRedHandle = new WithBlueRedHandle(mainBox);
console.log('[接著放入手把組]');
console.log(`產品名稱：${withBlueRedHandle.displayName()}`);
console.log(`產品價格：${withBlueRedHandle.getPrice()}`);
console.log('----------------');
const withPokemonGame = new WithPokemonGame(withBlueRedHandle);
console.log('[最後放入遊戲片]');
console.log(`產品名稱：${withPokemonGame.displayName()}`);
console.log(`產品價格：${withPokemonGame.getPrice()}`);
console.log('================');
```

執行 `tsc decorator.ts` 產生js檔，接著執行 `node decorator.js`，就可以看到裝飾過後的同捆包長怎樣囉！

![result](https://i.imgur.com/UFgJX4x.png)

## 小結
有了裝飾模式之後，想要搭配任何配件或遊戲片，都能輕鬆地為不同玩家提供各式各樣的Switch同捆包囉！

結束前再來聽首歌吧！

> Turbo sauce (woo!) 倒下醬汁         
> Let's float around like the fruit at the top (huh) 讓我們像酒杯上點綴的水果一般漂浮著   
> In Miami, where winters are hot 在邁阿密  冬日仍然炎熱        
> 《Sangria wine》

[![Sangria wine](https://img.youtube.com/vi/buky0hLsBa0/0.jpg)](http://www.youtube.com/watch?v=buky0hLsBa0 'Sangria wine')

Sangria wine：是一種西班牙、葡萄牙有名的水果雞尾酒，以紅酒為基底加上各式各樣的新鮮水果。

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day17-strusctural.decorator`

---

### 參考資料   

- [guru - Decorator](https://refactoring.guru/design-patterns/decorator)