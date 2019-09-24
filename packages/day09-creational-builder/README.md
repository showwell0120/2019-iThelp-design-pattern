# [Day9] 吃壹 LAN 就是要硬麵加半熟蛋 ─ 建設者(Builder) <模式篇>

嗨 大家好 我是一路爬坡的阿肥

阿肥在想好今天的標題後...  
突然超級嘴饞想吃一蘭
決定鐵人賽結束後去吃一波！![/images/emoticon/emoticon31.gif](/images/emoticon/emoticon31.gif)

---

## 情境描述

肥肥是個標準的哈日族，每年一定會去日本玩，而且會找當地的壹 LAN 拉麵吃個 2,3 餐。他對壹 LAN 拉麵愛到一直期待哪天會來台灣展店，進壹 LAN 付出心力。

沒想到這一天真的給肥肥盼到了！再過幾個月後就會在台灣開分店。於是肥肥毫不猶豫辭掉工作，跟壹 LAN 毛遂自薦。壹 LAN 看到肥肥的熱情與決心，也相當歡迎他的加入。

壹 LAN 將點餐的流程交給肥肥負責，希望透過他的專長可以幫忙改進客人點餐到處理菜單的流程，讓客人跟服務生在壹 LAN 都有良好的體驗。

## 原本的點餐流程

原本的菜單長這樣。拉麵選項的部分用圈選的方式選，赤紅秘製醬汁則是填入數字。

![原本的菜單](https://i.imgur.com/A5S3Ogl.png)

如果是熟客的話，比較不會落掉選項或是填寫不符的內容；老鳥服務生的話，對於建單的流程也相當熟悉。

但如果是第一次來的客人的話，就會容易填單不完整，或是根本不知道怎麼選才適合；新手服務生也要手忙腳亂一陣子，才知道每個選項對應哪個設定。

## 需要為客人和服務生再多點方便

肥肥先對菜單做以下調整：

- 請給我建議的選項設定：客人勾這個的話，就會按照所有選項的建議設定進行製作
- 如果加點的餐點跟拉麵選項有關的話，就另外拉出來，放在相關選項旁邊。這樣可以跟加點的邏輯切開，也能避免客人在拉麵選項圈選無叉燒，卻加點叉燒的情況。

![後來的菜單](https://i.imgur.com/G3qrVY0.png)

服務生點餐流程上也做了一些調整：

肥肥為了新手服務生新增一個類別 `RamenDirector`。只要是勾選“請給我建議的選項設定”的點單，就給新手服務生處理。只要呼叫 `buildDefaultRamen()`，就會自動帶入建議選項執行一連串的設定

```typescript
export class RamenDirector {
  private builder: RamenBuilder;

  constructor() {
    this.builder = new RamenBuilder();
  }

  public setBuilder(builder: RamenBuilder): void {
    this.builder = builder;
  }

  public buildDefaultRamen(): void {
    this.builder.produceStandard(DefaultOptions);
  }

  public addExtraDish(a: string[] = []): void {
    this.builder.addExtra(a);
  }

  public getProduct(): RamenProduct {
    return this.builder.getProduct();
  }
}
```

另外，有關於拉麵各選項的邏輯和追加功能，統一放在 `RamenBuilder` 的類別。有經驗的服務生就可以直接呼叫這個類別的方法來進行設定。

```typescript
export class RamenBuilder implements BuilderDeclaration.I_RamenBuilder {
  private product: RamenProduct;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new RamenProduct();
  }

  public setGreenOnion(g: number = 1): void {
    //...
  }

  // ...

  public addExtra(a: string[] = []): void {
    this.product.parts.extra = a && a.length ? a.join(",") : "";
  }

  // 標準的製作拉麵流程
  public produceStandard(o: BuilderDeclaration.I_Order_Ramen = {}): void {
    this.setNoodle(o.noodle);
    this.setTaste(o.taste);
    this.setGreenOnion(o.greenOnion);
    this.setSlicedPork(o.slicedPork);
    this.setSpicy(o.spicy);
  }

  // 取得拉麵
  public getProduct(): RamenProduct {
    const result = this.product;
    this.reset();
    return result;
  }
}
```

## 這就是 建設者模式

看到肥肥建立的 `RamenDirector` 、 `RamenBuilder` 這兩個類別，我們就知道肥肥是有真材實料的！因為呢，這就是建設者模式的起手式。

在 guru 上的解釋：

> The pattern organizes object construction into a set of steps. To create an object, you execute a series of these steps on a builder object. The important part is that you don’t need to call all of the steps. You can call only those steps that are necessary for producing a particular configuration of an object.  
> (這個模式透過步驟的組合來組織物件的建構，並透過執行建設者物件上的方法來新增物件。重要的是，你不需要呼叫所有的步驟。只需要呼叫新增物件所需要的設定即可)

新增的物件需要有客製化的彈性時，如果按照工廠模式來實作，就會需要建立多個建構式或工廠才能滿足需求; 對於使用者來說，他也需要知道輸入哪些參數才有辦法產生物件。

建設者模式提供一個彈性的結構，將建構和表現分離，並且進一步設定客製化的方法，讓同樣的建構過程可以產生出不同的表現。

其中， `Builder` 在建設者模式中，是物件產生的類別，將產生的細節切分了一系列 `setXXX()` 或 `addXXX()`的方法。 `Director` 是指導 `builder` 產生特定物件的類別。

如果有使用者無法直接使用 `builder`，或是對於 `builder`的建構不了解，就可以藉由 `Director` 作爲一個中介者，來調用 `builder` 產生物件。

所以，我們看到例子會有兩種情境：

- 客人僅勾選第一個建議設定，並給新手服務生建單

```typescript
// 為新手服務生建立一個 director
const ramenDirector = new RamenDirector();
ramenDirector.buildDefaultRamen();
if (extras && extras.length) ramenDirector.addExtraDish(extras);
product = ramenDirector.getProduct();
```

- 客人有偏好的拉麵選項，讓老鳥服務生建單

```typescript
//不用建立 director，直接調用 `builder`
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
```

## 小結

看完之後來聽點有感覺的歌吧！

> 這世界 很複雜 混淆我想說的話  
> 我不懂 太複雜的文法  
> ...  
> 寫一首簡單的歌 讓妳的心情快樂  
> 好像我 那麼的 平凡卻又 深刻  
> 一首簡單的歌

[![一首簡單的歌](https://img.youtube.com/vi/PihQffGOL54/0.jpg)](http://www.youtube.com/watch?v=PihQffGOL54 "一首簡單的歌")

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day10-creational-builder.code`

明天會介紹怎麼用 Typescript 加上 React 實作流程，對於模式的應用跟程式會再更詳細的說明喔！

---

### 參考資料

- [guru - Builder](https://refactoring.guru/design-patterns/builder)
- [建立者模式 (Builder Pattern)](http://corrupt003-design-pattern.blogspot.com/2017/01/builder-pattern.html)
