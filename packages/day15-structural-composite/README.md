# [Day15] 一次填好麵線跟拉麵的菜單可以嗎？ ─ 組合(Composite) <模式篇>

嗨 大家好 我是一路爬坡的阿肥   

今天是Blue Monday   
不過因為有鐵人賽的加入   
讓阿肥想blue也沒時間blue啦！   

---

## 情境描述
在大肥百貨美食街的麵食區，開著肥肥麵線攤跟壹LAN拉麵店。雖然只有這兩家，但是生意特好，很多人都是呼朋引伴，想吃麵線就去肥肥點、想吃拉麵就去壹LAN點。

不過愈來愈多人反應說，希望他們兩家的菜單可以合成一張，這樣如果兩個人各要吃不同家的話，不用為了顧包包而輪流去點餐，增加等待的時間。

剛好，麵線攤的老闆肥肥跟壹LAN負責人小肥是好朋友，他們聽到顧客的聲音之後，決定製作聯合菜單，為這些需要一次點不同家的顧客多些便利。

## 先來畫個圖
之前為壹LAN改善點單流程的小肥，這次一樣要用他的專業來完成這項任務。不過這次是兩家菜單要合在一起，怎麼樣能讓菜單呈現一致性，日後更新時又好維護，變成這次主要解決的問題。

所以小肥針對聯合菜單的內容架構先畫個圖：

![chart](https://i.imgur.com/hcDYgmI.png)

當他看著這張圖念念有詞地說：「樹狀結構、聯合菜單的部分就是店的整體、......」

「啊！這不就是組合模式嗎？」

## 組合模式
先看guru上的解釋：
> Composite is a structural design pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects.   
(組合是一種行為型的模式，讓你以樹狀的結構組合物件，並且可視為單一的物件，對於這些結構進行操作)

我們對於樹狀結構最熟悉的就是檔案總管啦。一個資料夾中可以只包含檔案，也可以包含資料夾。把這些目錄的關係用畫圖來顯示的話，就是一個樹狀結構。

樹狀結構可以很簡單，也可以相當複雜。我們不希望隨著節點增加，要維護的類別愈來愈龐雜；當需要訪問到每個子節點時，還要不同的方法調用。

所以組合模式的精神在於，建立一個各節點共同的介面，提供統一的方法來訪問各節點。接著建立簡單類別，實作最尾端的節點; 以及複雜類別，實作容器節點來管理子節點。

我們來試試看吧！

### 抽象類別，定義共同的屬性與方法
```typescript
abstract class AbstractMenu {
    // 記住父節點是誰
    protected parent: AbstractMenu;

    // 提供存取父節點的方法
    public setParent(parent: AbstractMenu) {
        this.parent = parent;
    }
    public getParent(): AbstractMenu {
        return this.parent;
    }

    // 提供管理子節點管理的方法，留給繼承的類別來實作
    public add(menus: AbstractMenu[]): void { }
    public remove(menu: AbstractMenu): void { }

    public isComposite(): boolean {
        return true;
    }

    // 節點的操作方法，留給繼承的類別來實作
    public abstract printContent(): string;
}
```

### 尾端節點的類別，繼承抽象類別實作操作方法
```typescript
class Product extends AbstractMenu {
    protected name: string;
    protected price: number;

    constructor(name: string, price: number) {
        super();
        this.name = name;
        this.price = price;
    }

    public isComposite(): boolean {
        return false;
    }

    // 實作操作方法
    public printContent(): string {
        return `- ▢ ${this.name} ${this.price}元`;
    }
}
```
### 容器節點的類別，繼承抽象類別實作管理子節點與操作方法

```typescript
class CompositeMenu extends AbstractMenu {
    protected type: string;
    protected description: string;
    protected children: AbstractMenu[] = [];

    constructor(type: string = DefaultWording.type, description: string = DefaultWording.description) {
        super();
        this.type = type;
        this.description = description;
    }

    // 實作管理子節點的方法
    public add(items: AbstractMenu[]): void {
        const me = this;
        this.children = [...this.children, ...items];
        this.children.map(child => child.setParent(me));
    }
    public remove(item: AbstractMenu): void {
        const itemIndex = this.children.indexOf(item);
        this.children.splice(itemIndex, 1);
        item.setParent(null);
    }

    // 實作操作方法
    public printContent(): string {
        let results: string = `\n[${this.type}] ${this.description}\n`;
        for (const child of this.children) {
            results = results.concat(`${child.printContent()}\n`)
        }
        return results
    }
}
```

## 聯合菜單 組起來
類別都建立好之後，就可以來組合菜單囉！
```typescript
// 建立肥肥麵線攤-麵線類的產品
const vermicelliProduct1 = new Product('大腸口味', 40);
const vermicelliProduct2 = new Product('蚵仔口味', 40);
// 建立肥肥麵線攤-麵線類的容器節點
const vermicelliMenu = new CompositeMenu('麵線', '');
// 把產品加進容器節點
vermicelliMenu.add([vermicelliProduct1, vermicelliProduct2]);

const drinkProduct1 = new Product('古早味紅茶', 20);
const drinkProduct2 = new Product('彈珠汽水', 30);
const drinkMenu = new CompositeMenu('涼飲', '');
drinkMenu.add([drinkProduct1, drinkProduct2]);

// 建立肥肥麵線攤的容器節點
const FatFatMenu = new CompositeMenu('肥肥麵線攤', '想吃點台味來這邊');
// 把麵線類&冷飲類的容器節點加進來
FatFatMenu.add([vermicelliMenu, drinkMenu]);

const ramenProduct1 = new Product('壹LAN特製拉麵', 120);
const ramenProduct2 = new Product('鮭魚味噌湯', 40);
const IChiRanMenu = new CompositeMenu('壹LAN拉麵店', 'ようこそ、こちらへ！');
IChiRanMenu.add([ramenProduct1, ramenProduct2]);

// 建立聯合菜單的節點
const linkedInMenu = new CompositeMenu();
// 把麵線攤的菜單跟拉麵店的菜單加進來
linkedInMenu.add([IChiRanMenu, FatFatMenu]);
```

執行 `tsc composite.ts` 產生js檔，接著執行 `node composite.js`，就可以看到菜單長怎樣囉！

![result](https://i.imgur.com/wyYKg2z.png)

## 小結

太好了！這樣的設計不僅統一菜單選項的產生方式，日後要維護也不用再改到類別，只要在最後的組合進行變動就好。他們的生意也愈來愈好了！

結束前再來聽首歌吧！

> 好想再回到那些年的時光   
> 回到教室座位前後　故意討妳溫柔的罵   
> 黑板上排列組合　妳捨得解開嗎   
> 誰與誰坐他又愛著她   
> 《那些年》

[![那些年](https://img.youtube.com/vi/xWzlwGVQ6_Q/0.jpg)](http://www.youtube.com/watch?v=xWzlwGVQ6_Q '那些年')

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day15-strusctural.composite`

---

### 參考資料   

- [guru - Composite](https://refactoring.guru/design-patterns/composite)
- [如何讓孩子愛上設計模式 ——9.組合模式(Composite Pattern)](https://www.itread01.com/articles/1485506384.html)