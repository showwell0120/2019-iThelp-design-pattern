# [Day28] 操作大量資料的好幫手 ─ 迭代器(Iterator) <模式篇>

嗨 大家好 我是一路爬坡的阿肥

今天要介紹最後一個模式了
真的是...太開心啦！

今天是澎湖遊最後一天，還是一樣跟大家分享個照片～

最想念的應該是漂亮的海水跟夕陽

![photo](https://i.imgur.com/31DJjdx.jpg)

---

## 情境描述

肥兒是個朝九晚五的上班族。平常的工作內容是把商品型錄以郵寄方式寄給客戶。由於客戶規模不大，一天只需處理幾十件就好，所以地址資訊就算用手寫的，時間也很充裕。

但是，隨著公司發展快速，一下子客戶多了好幾倍！平常用手寫根本無法應付，每天都加班加到手要斷掉。肥兒覺得這樣不行，於是建立了客戶的聯絡資訊的資料庫，並且用列印的方式印出。果然這樣提昇了不少效率。

可是肥兒還是得加班，因為不僅要貼客戶的資訊，還要貼上公司的地址，最後進行填表記錄編號等等。這些都是跟客戶原本的資訊分開的，所以並不會跟著一起印出來。

有沒有辦法在不影響原本資料庫的情況之下，可以跟客戶的聯絡資訊一起印出，減少這些重複的工呢？

答案是有的！我們需要熟悉的就是 **迭代器模式(Iterator Pattern)** 來協助我們處理大量資料。

## 迭代器模式 (Iterator Pattern)

先看 guru 上的解釋：

> terator is a behavioral design pattern that lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).  
> (迭代器是行為型的模式，讓一個集合，例如列表、堆疊、樹等等，不用暴露他裡面的實作表徵，就能遍歷其各個元素。)

簡單來說，迭代器為客戶端提供一個介面，依照需求，含有訪問、存取以及操作的資料方法，並且不會讓客戶端直接接觸到資料元素。

所以如果今天想要對某個大量的資料進行一致性的處理，比如運算、字串處理等等，但是我們不想直接面對資料一個個處理，就可以用迭代器模式，把操作資料的方法抽象出來，並且透過他的特性可以作用到所有資料元素。

搭配剛剛的例子，來看看要實現迭代器會有哪些角色吧！

### 迭代器的訪問方法類別 - Iterator
Iterator 提供外部訪問資料的方法，像是：
- `current()` : 取得當前訪問的資料元素
- `next()` : 取得下一個資料元素
- `key()` : 取得當前訪問資料元素的key值
- `hasNext()` : 是否還有下一個資料元素
- `rewind()` : 回到第一個資料元素

實作上大致會像這樣：
```typescript
export class CustomerIterator implements I_Iterator<I_CustomerData> {
    // 儲存資料操作的集合實體
    private collection: CustomerCollection;
    // 紀錄現在的位置
    private position: number = 0;

    // 初始化，傳入資料操作的集合實體
    constructor(collection: CustomerCollection) {
        this.collection = collection;
    }

    // 一系列訪問資料的方法
    public rewind() {
        this.position =  0;
    }
    public current(): any {
        return this.collection.getCustomers()[this.position];
    }
    public key(): number {
        return this.position;
    }
    public next(): any {
        const customer = this.collection.getCustomers()[this.position];
        this.position += 1;
        return customer;
    }
    public hasNext(): boolean {
        return this.position < this.collection.getCount();
    }
}

```

### 資料操作的集合類別 - IterableCollection
客戶端建立這個類別使用迭代器，所以需有個方法 `getIterator()` 來取得迭代器的實體，並且把本身傳入接著根據外部需求，建立需要對資料操作和存取的方法。
```typescript
class CustomerCollection {
    private customers: I_CustomerData[] = [];

    // 初始化將資料傳入
    constructor(customers: I_CustomerData[] = []) {
        this.customers = customers;
    }

    // 取得迭代器的實體，並且把實體本身(this)傳入
    public getIterator(): I_Iterator<I_CustomerData> {
        return new CustomerIterator(this);
    }

    // 一系列操料資料的方法
    public getCustomers(): I_CustomerData[] {
        return this.customers;
    }
    public getCount(): number {
        return this.customers.length;
    }
    public addCustomer(customer: I_CustomerData): void {
        this.customers.push(customer);
    }
}
```

### 建立迭代器
最後來用迭代器看看。我們來看看大致上的程式吧！
```typescript
// 有個資料陣列
let customers = [...];
// 傳入資料，建立資料操作的集合類別
let collection = new It.CustomerCollection(customers);
// 對資料新增元素
collection.addCustomer(customer);
// 對資料進行訪問
while (iterator.hasNext()) {
    let customer = iterator.next();
    // ... do some work
}
```

## 其實 `forEach` `$.each`都是迭代器一族

以前大家常用的 jQuery、lodash，甚至是原生的 javascript，都有迭代器的實作。基本上我們只要準備好資料，以及對資料操作的邏輯，就可以達到迭代的效果。但是如果你有更進階的操作方式的話，也可以自己再封裝一層，開發屬於自己的迭代器喔。

在 lodash
`_.each(arrayWithSomething, function(value) { //... })`

在 jQuery
`$.each(arrayWithSomething, function(index, value) { //... })`

原生 javascript
`arrayWithSomething.forEach(function(value) { //... })`

## 小結

有了用迭代器模式實作的小工具後，肥兒又恢復以前不用加班的幸福快樂的日子了！

> 曾經辜負哪位 這才被虧欠  
> 路過人間 一直這輪迴  
> 幸運一點 也許最後和誰 都不相欠  
> 《路過人間》

[![路過人間](https://img.youtube.com/vi/FMl7GEaYwAE/0.jpg)](http://www.youtube.com/watch?v=FMl7GEaYwAE '路過人間')

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day29-behavioral.iterator.code`

明天會介紹怎麼用 Typescript 加上 React 實作流程，對於模式的應用跟程式會再更詳細的說明喔！

---

### 參考資料

-   [guru - Iterator](https://refactoring.guru/design-patterns/iterator)
