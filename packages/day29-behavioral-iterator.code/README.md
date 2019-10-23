# [Day29] 操作大量資料的好幫手 ─ 迭代器(Iterator) <實作篇>

嗨 大家好 我是一路爬坡的阿肥

昨天晚上搭立榮的飛機回來
真心覺得座位大 還有飲料可以喝
而且只要40幾分就到了
已經回不去坐船省錢的堅持啦

---

## 顧客的資訊
先建立顧客資料的介面，有名字跟地址。
```typescript
interface I_CustomerData {
    name: string;
    address: string;
}
```

## 迭代器的訪問方法 - CustomerIterator
為了日後可以有彈性的建立不同資料型別的迭代器，我們以泛型的方式建立他的介面。
```typescript
interface I_Iterator<T> {
    current(): any;
    next(): T;
    key(): number;
    hasNext(): boolean;
    rewind(): void;
}
```

建立 `CustomerIterator` 類別，來操作型別為 `I_CustomerData` 的資料陣列。另外，可以加入 `reverse` 的參數，控制從資料的前面開始，或是從後面開始訪問。
```typescript
class CustomerIterator implements I_Iterator<I_CustomerData> {
    // 紀錄資料陣列
    private collection: CustomerCollection;

    // 紀錄當前位置
    private position: number = 0;

    // 控制資料訪問的方向
    private reverse: boolean = false;

    constructor(collection: CustomerCollection, reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;

        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }

    /* 一系列訪問方法 */

    // 回到一開始的位置
    public rewind() {
        this.position = this.reverse ? this.collection.getCount() - 1 : 0;
    }
    // 取得目前資料
    public current(): any {
        return this.collection.getCustomers()[this.position];
    }
    // 取得目前位置
    public key(): number {
        return this.position;
    }
    // 訪問下一個資料
    public next(): any {
        const customer = this.collection.getCustomers()[this.position];
        this.position += this.reverse ? -1 : 1;
        return customer;
    }
    // 是否還有下一個資料
    public hasNext(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }
}
```

## 資料操作的集合 - CustomerCollection
為了取得迭代器，可以先定義這個類別至少要含有一個方法 `getIterator()`。
```typescript
interface I_IterableCollection {
    getIterator(): I_Iterator<I_CustomerData>;
}
```

接著建立類別 `CustomerCollection` 來實作 `I_IterableCollection`，並且傳入資料陣列作為初始化。
```typescript
class CustomerCollection implements I_IterableCollection {
    private customers: I_CustomerData[] = [];

    constructor(customers: I_CustomerData[] = []) {
        this.customers = customers;
    }

    /* 取得資料本身&長度 */
    public getCustomers(): I_CustomerData[] {
        return this.customers;
    }
    public getCount(): number {
        return this.customers.length;
    }

    /* 變動資料 */
    public addCustomer(customer: I_CustomerData): void {
        this.customers.push(customer);
    }

    /* 將本身傳入迭代器做初始化 */
    public getIterator(): I_Iterator<I_CustomerData> {
        return new CustomerIterator(this);
    }
    public getReverseIterator(): I_Iterator<I_CustomerData> {
        return new CustomerIterator(this, true);
    }
}
```

## UI Component
### CustomerApp
這個元件主要建立資料操作的集合實體，和模擬非同步行為取得資料陣列。當實體完成後，將實體當作 prop 傳入 `CustomerProcessor` 拿來資料操作。
```typescript
const CustomerApp: React.FC<any> = props => {
    const [collection, setCollection] = React.useState<It.CustomerCollection>(null);

    React.useEffect(() => {
        startIterate();
    }, []);

    async function fakeFetchCustomer(): Promise<It.I_CustomerData[]> {
        let data: It.I_CustomerData[] = [];
        setTimeout(() => {
            data.push({ name: 'John', address: '123 Main St' });
        }, 500);
        return data;
    }
    async function startIterate() {
        let customers = await fakeFetchCustomer();
        setCollection(new It.CustomerCollection(customers));
    }

    return <div>{collection && <CustomerProcessor collection={collection} />}</div>;
};
```
### CustomerProcessor
這個元件主要有兩種UI呈現：
- 輸入今日的潛在客戶資料，加入到資料陣列
- 按下 產生郵寄資訊與紀錄 後，輸出處理過後的資料陣列

所以狀態上我們需要有紀錄潛在客戶、郵寄資訊與紀錄
```typescript
const [customer, setCustomer] = React.useState<It.I_CustomerData>({ name: '', address: '' });
const [mailInfoList, setMailInfoList] = React.useState<string[]>([]);
const [recordList, setRecordList] = React.useState<string[]>([]);
```

按下 加入 後，使用資料操作的集合實體的 `addCustomer()`對資料列表新增一筆。
```typescript
function addTodayCustomer(e) {
    e.preventDefault();
    if (collection && customer.name && customer.address) collection.addCustomer(customer);
    setCustomer({ name: '', address: '' });
}
```

按下 產生郵寄資訊與紀錄 後，以 `collection.getIterator();` 取得迭代器 `iterator`。並且建立兩種資料格式化的方法：
```typescript
const makeMailInfo = (c: It.I_CustomerData): string => {
    return `<div style="width:360px;"><p>阿肥國際有限公司 A-Fat International Co. Ltd<br /></p><p style="text-align:center; font-size: 20px;"><br />${c.name} 收</p><p style="text-align:right;">收件人地址:${c.address}</p></div>`;
};
const makeRecord = (c: It.I_CustomerData): string => {
    recordCount++;
    let d = new Date();
    let record = `日期:${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} 編號: ${recordCount} 姓名:${c.name}`;
    return record;
};
```

最後，以 `iterator.hasNext()` 來執行資料的訪問迴圈。
```typescript
while (iterator.hasNext()) {
    let customer = iterator.next();

    // do work
    _mailInfoList.push(makeMailInfo(customer));
    _recordList.push(makeRecord(customer));
}

setMailInfoList(_mailInfoList);
setRecordList(_recordList);
```

## Storybook 跑起來

執行`yarn story`後，開啟`http://localhost:6006`，然後切到`Iterator Pattern/CustomerApp`，就可以看到畫面了。

先加入今天要寄的潛在客戶資訊到資料列表中，然後點擊產生信封資訊與紀錄，就會執行迭代器，依序輸出處理過後的資料。

![result](https://i.imgur.com/KMb8Kvr.gif)

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day29-behavioral.iterator.code`
