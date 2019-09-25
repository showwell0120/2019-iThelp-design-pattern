# [Day10] 吃壹 LAN 就是要硬麵加半熟蛋 ─ 建設者(Builder) <實作篇>

嗨 大家好 我是一路爬坡的阿肥

今天是鐵人賽的第 10 天，已經過了 1/3 了！  
最近發現寫文章卡最久的不是寫 code  
而是在找歌跟想開場白(整個劃錯重點)![/images/emoticon/emoticon16.gif](/images/emoticon/emoticon16.gif)

---

**今日文章適合搭配[範例專案](https://github.com/showwell0120/Design-Pattern-Typescript-React)的`packages/day10-creational-builder.code`一起搭配觀看，歡迎把專案 clone 下來喔**

## 型別跟定義

在 `declaration.ts` 中，我們定義程式中會需要的介面與型別，並存在 `BuilderDeclaration`的 namespace 中。

```typescript
namespace BuilderDeclaration {
  export type T_Taste = "light" | "medium" | "strong";
  export type T_Noodle = "firm" | "medium" | "soft";
  // ...
}
```

其中我們定義 `I_RamenBuilder`的介面裡面有 `addExtra()`跟 `produceStandard()`的宣告，，這兩個方法在之後的 `RamenDirector` 類別會呼叫到，所以要強調 `RamenBuilder` 類別需要實作這兩個方法。

```typescript
export interface I_RamenBuilder {
  addExtra(a: string[]): void;
  produceStandard(o: I_Order_Ramen): void;
}
```

## RamenProduct

在 `builder.ts`我們先定義 `RamenProduct`類別，最後產生的物件會有哪些方法跟屬性。

`parts` 屬性定義了產出的最後結構，並初始化預設值，並且提供 `listProduct()` 印出物件的內容。

```typescript
export class RamenProduct {
  public parts: BuilderDeclaration.I_Product_Ramen = {
    taste: "",
    greenOnion: "",
    slicedPork: "",
    spicy: 0,
    noodle: "",
    extra: ""
  };

  public listProduct(): string {
    return `
            口味濃淡：${this.parts.taste}
            蔥：${this.parts.greenOnion}
            叉燒：${this.parts.slicedPork}
            赤紅秘製醬汁：${this.parts.spicy}
            麵的硬度：${this.parts.noodle}
            加點：${this.parts.extra}
        `;
  }
}
```

## RamenBuilder

在 `RamenBuilder` 類別，我們定義了一系列針對拉麵選項實作細節的方法。其中因為我們需要實作 `I_RamenBuilder`介面，所以還需要提供 `addExtra()` 跟 `produceStandard()` 的方法。

```typescript
export class RamenBuilder implements BuilderDeclaration.I_RamenBuilder {
  private product: RamenProduct;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new RamenProduct();
  }
  /** setXXX(): 一系列實作拉麵選項的製作細節  */
  public setGreenOnion(g: number = 1): void {
    this.product.parts.greenOnion = g === 1 ? "有" : "無";
  }

  public setSlicedPork(s: number = 1): void {
    this.product.parts.slicedPork = s === 1 ? "有" : "無";
  }

  public setNoodle(n: BuilderDeclaration.T_Noodle = "medium"): void {
    switch (n) {
      case "firm":
        this.product.parts.noodle = "硬";
        break;
      case "medium":
        this.product.parts.noodle = "普通";
        break;
      case "soft":
        this.product.parts.noodle = "軟";
        break;
    }
  }

  public setTaste(t: BuilderDeclaration.T_Taste = "medium"): void {
    switch (t) {
      case "light":
        this.product.parts.taste = "淡味";
        break;
      case "medium":
        this.product.parts.taste = "普通";
        break;
      case "strong":
        this.product.parts.taste = "濃味";
        break;
    }
  }

  public setSpicy(s: number = 0.5): void {
    this.product.parts.spicy = s;
  }

  public doubleSlicedPork(): void {
    if (this.product.parts.slicedPork === "無") return;
    this.product.parts.slicedPork += ", 追加3片";
  }

  public doubleGreenOnion(): void {
    if (this.product.parts.greenOnion === "無") return;
    this.product.parts.greenOnion += ", 追加1份";
  }

  /** 實作 I_RamenBuilder 的介面 */
  public produceStandard(o: BuilderDeclaration.I_Order_Ramen = {}): void {
    this.setNoodle(o.noodle);
    this.setTaste(o.taste);
    this.setGreenOnion(o.greenOnion);
    this.setSlicedPork(o.slicedPork);
    this.setSpicy(o.spicy);
  }

  public addExtra(a: string[] = []): void {
    this.product.parts.extra = a && a.length ? a.join(",") : "";
  }

  /** 取得拉麵 */
  public getProduct(): RamenProduct {
    const result = this.product;
    this.reset();
    return result;
  }
}
```

## RamenDirector

我們實作 `RamenDirector`的類別的目的是為了提供新手服務生更簡易的方式，來操作 `RamenBuilder` 產生標準建議的拉麵，並且另外封裝 `addExtra()` 跟 `getProduct()`，讓新手服務生不用 透過`RamenDirector`就能呼叫到這些方法。

```typescript
export class RamenDirector {
  private builder: RamenBuilder;

  constructor() {
    this.builder = new RamenBuilder();
  }

  public setBuilder(builder: RamenBuilder): void {
    this.builder = builder;
  }

  // 呼叫 builder 的 produceStandard，並帶入 DefaultOptions 表示要產生標準建議的拉麵
  public buildDefaultRamen(): void {
    this.builder.produceStandard(DefaultOptions);
  }

  /** 封裝 builder 既有的方法，不用另外再建立 builder */
  public addExtraDish(a: string[] = []): void {
    this.builder.addExtra(a);
  }

  public getProduct(): RamenProduct {
    return this.builder.getProduct();
  }
}
```

## 壹 LAN 拉麵店 開幕囉！

在 `index.tsx` 新增一個 FC ─ `IChiRanRamen`，並且回傳一個表單元件。我們發現這個表單其實跟工廠方法的例子很像。所以我們只看怎麼控制 checkbox 的狀態跟多選的選項。

```JSX
// 為 checkbox 建立 state
const [doubleSlicedPork, setDoubleSlicedPork] = React.useState<boolean>(false);

// ...

return (
    // ...
    // 在 onChange 事件傳入 setState，並把跟 state 相反的值帶進去
    <input type="checkbox" name="doubleSlicedPork" checked={doubleSlicedPork} onChange={e => setDoubleSlicedPork(!doubleSlicedPork)} ></input>
    // ...
);
```

```JSX
// 為 多選選項 建立 state，並用陣列儲存
const [extras, setExtras] = React.useState<string[]>([]);

// ...

// 檢查 value 有沒有在陣列中，如果有就移除，沒有的話就新增
const handleExtrasChange = ({ target }) => {
    let i = extras.indexOf(target.value);
    let newArr = i > -1 ? extras.slice(i, 1) : [...extras, target.value];
    setExtras(newArr);
}

// 檢查選項是否存在陣列中，來控制 checked 的值
const isChecked = (v: string) => extras.includes(v);

// ...

return (
    // ...
    <label htmlFor="egg">半熟蛋</label>
    <input type="checkbox" name="egg" value="半熟蛋" checked={isChecked("半熟蛋")} onChange={handleExtrasChange}></input>
    <label htmlFor="rice">白飯</label>
    <input type="checkbox" name="rice" value="白飯" checked={isChecked("白飯")} onChange={handleExtrasChange}></input>
    // ...
);
```

最後，我們看 `handleSubmitOrder`，我們判斷有沒有勾選第一行的建議選項設定，如果有的話就建立 `RamenDirector`的類別，表示由新手服務生來處理; 如果沒有的話就建立`RamenBuilder`的類別，一步步處理拉麵的細節。

```typescript
const handleSubmitOrder = e => {
  e.preventDefault();

  let product: RamenProduct;
  if (allDefault) {
    const ramenDirector = new RamenDirector();
    ramenDirector.buildDefaultRamen();
    if (extras && extras.length) ramenDirector.addExtraDish(extras);
    product = ramenDirector.getProduct();
  } else {
    const ramenBuilder = new RamenBuilder();
    ramenBuilder.setNoodle(options.noodle);
    ramenBuilder.setTaste(options.taste);
    ramenBuilder.setGreenOnion(options.greenOnion);
    ramenBuilder.setSlicedPork(options.slicedPork);
    ramenBuilder.setSpicy(options.spicy);
    if (extras && extras.length) ramenBuilder.addExtra(extras);
    if (doubleGreenOnion) ramenBuilder.doubleGreenOnion();
    if (doubleSlicedPork) ramenBuilder.doubleSlicedPork();
    product = ramenBuilder.getProduct();
  }
  if (onSubmit) onSubmit(product);
};
```

## Storybook 跑起來

執行`yarn story`後，開啟`http://localhost:6006`，然後切到`IChiRanRamen`，就可以看到畫面了。

選擇建議的選項設定的結果畫面

![storybook 1](https://i.imgur.com/GAEojx8.png)

客製輸入選項設定的結果畫面

![storybook 2](https://i.imgur.com/wyEMKp4.png)

## 小結

我們看到建設者模式可以把複雜的建立流程封裝起來，讓外部使用的人可以不用擔心參數順序錯誤，或是需要了解複雜的建構流程。

不過阿肥也要提醒，過程中如果多次的建立 director 物件與 builder 物件，會造成記憶體消耗。所以需要先設計好類別的結構，並且最後生成物件時，要考慮好各屬性的預設值以處理意外狀況。

---

### 參考資料

- [設計模式——建造者模式（Builder Pattern）](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/547104/#outline__3_2)
- [React Forms](https://reactjs.org/docs/forms.html)
