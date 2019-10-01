# [Day20] 我要輕鬆成為股海高手！ ─ 外觀(Facade) <實作篇>

嗨 大家好 我是一路爬坡的阿肥

---

## 複雜的 API connector 跟 Data processor

工讀生 A、B 各別負責寫個股相關資料的 API 串接類別，以及回傳結果的資料處理類別。這兩個類別在外觀模式中扮演 client 需要面對的兩個複雜系統。

StockAPI.ts - 台灣證交所 API 串接

```typescript
export class StockAPI {
    protected baseURL: string = 'https://www.twse.com.tw/exchangeReport/STOCK_DAY';
    protected stockId: number;

    constructor(stockId: number) {
        this.stockId = stockId;
    }
    //待會建立的Facade會調用的方法
    public async getStockData(): Promise<IStockData> {
        let url = new URL(this.baseURL),
            params = { response: 'json', stockNo: this.stockId };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        try {
            const resp = await fetch(url.href);
            let theJson: IStockData = fakeJson;
            theJson = await resp.json();
            return theJson;
        } catch (error) {
            return fakeJson;
        }
    }

    //... 之後可能會再擴充功能，形成複雜的類別
}
```

StockProcessor.ts - 處理 API 回傳的結果給 client

```typescript
export class StockProcessor {
    protected reqResult: IStockData;

    public setReqResult(reqResult: IStockData) {
        //...
    }

    public checkStat() {
        //...
    }

    private getFieldIndex(fieldName: T_FieldName): number {
        //...
    }

    private getNumber(str: string): number {
        //...
    }

    private getValueList(index: number): number[] {
        //...
    }

    private getExtrmeValueIndex(list: number[], type: T_QueryType): number[] {
        //...
    }

    private getResultDataList(indexList: number[]): Array<IStockInfo> {
        //...
    }

    //待會建立的Facade會調用的方法
    public queryData(fieldName: T_FieldName, queryType: T_QueryType) {
        let fieldIndex = this.getFieldIndex(fieldName);
        let valueList: number[] = this.getValueList(fieldIndex);
        let targetIndexList: number[] = this.getExtrmeValueIndex(valueList, queryType);
        let resultList = this.getResultDataList(targetIndexList);
        return resultList ? resultList : [];
    }

    //... 之後可能會再擴充功能，形成複雜的類別
}
```

## 為老闆建立方便使用的外觀

接著再以外觀模式來做這兩個複雜類別的使用接口，讓 client 可以透過更簡易的方式調用。

首先先建立外觀類別的建構子參數的介面，其中宣告了兩個複雜類別，表示這個外觀會使用到這兩個類別來實作細節。

```typescript
interface I_StockFacade {
    stockId?: number;
    stockAPI?: StockAPI;
    stockProcessor?: StockProcessor;
}
```

接著建立外觀類別。我們在 constructor 做了點彈性的設計 ─ 如果只傳入 stockId 的話，就由外觀自己建立複雜類別的實體；否則由外部傳入來建立。

```typescript
export class StockFacade {
    protected stockAPI: StockAPI;
    protected stockProcessor: StockProcessor;

    constructor(param: I_StockFacade) {
        if (param.stockId) {
            this.stockAPI = new StockAPI(param.stockId);
            this.stockProcessor = new StockProcessor();
        } else {
            this.stockAPI = param.stockAPI;
            this.stockProcessor = param.stockProcessor;
        }
    }

    // client調用這個方法，就可以取得經處理過的資料
    public async getData(fieldName: T_FieldName, type: T_QueryType) {
        let result: IStockInfo[] = [];
        let reqResult = await this.stockAPI.getStockData();
        this.stockProcessor.setReqResult(reqResult);
        result = this.stockProcessor.queryData(fieldName, type);
        return result;
    }
}
```

## 前端接起來 老闆好開心

前端的程式很簡單。建立一個表單，輸入相關欄位，按送出就能查詢。

我們看一下剛剛建立的 Facade 怎麼使用。

```typescript
async function handleSubmit(e) {
    e.preventDefault();

    if (!options.fieldName || !options.queryType || !options.stockId) {
        alert('請輸入完整選項');
        return false;
    }

    // 建立facade的實體
    let stockFacade = new StockFacade({ stockId: options.stockId });

    // 只要調用getData就能取到資料
    let data: IStockInfo[] = await stockFacade.getData(options.fieldName, options.queryType);
    if (data) setData(data);
}
```

## Storybook 跑起來

看到畫面後就可以輸入台股的代碼、選擇篩選的欄位，以及選最大或最小值。不過因為 CORS 的關係，目前沒有辦法取得 API 回來的真實資料。所以阿肥先以台積電 2019 年 9 月的資料作為結果回傳。阿肥之後有時間再來改進這部分，讓 demo 可以更真實喔。

![result](https://i.imgur.com/9d2Catm.gif)

## 小結

阿肥相信只要開發過中型以上的專案，大部分都有用過外觀模式的概念實作過。

像是以前用 redux 做狀態管理時，我們通常會再寫個類別或是模組，來統整 API 的串接和處理 redux 的資料邏輯；甚至再大型專案中，要引入多個專案來實作一個功能時，外觀模式就是一個協助 client 作簡易接口的方式。

所以外觀模式算是相當實用也蠻重要的模式，希望大家看完都會有收穫喔！

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day20-strusctural.facade.react`

---

### 參考資料

-   [Github - TaiwanStockAPI](https://github.com/ouvek-kostiva/TaiwanStockAPI)
