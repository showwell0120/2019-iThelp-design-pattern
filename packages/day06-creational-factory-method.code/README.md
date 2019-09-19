# [Day6] 老闆：來一碗大腸麵線 ─ 工廠方法(Factory Method) <實作篇>

嗨 大家好 我是一路爬坡的阿肥

最近天氣開始有點涼爽，騎車去上班瀏海也不分岔了～
上班族小確幸++💖

---

**今日文章適合搭配[範例專案](https://github.com/showwell0120/Design-Pattern-Typescript-React)的`packages/day06-creational-factory-method.code`一起搭配觀看，歡迎把專案clone下來喔**

## 目錄結構介紹
由於Mono-Repo的管理方式，在`packages`底下的所有目錄都會視為獨立的專案，所以我們可以看到會有`package.json`紀錄專案的相關資訊與設定，source code的部分主要會放在`src`的目錄中。

以今天這個例子來說，接下來範例程式，基本上會有這些檔案：

- `declaration.ts`： 類別、屬性、資料結構等相關的定義
- `factory.ts`： 使用介紹到的設計模式實作的類別
- `index.tsx`：React元件的主程式
- `Vermicelli.story.tsx`：執行Storybook後，所呈現React UI flow 的story檔。Storybook是最近幾年相當熱門的前端開發工具，對於元件的手動測試幫助相當大，阿肥之後會再抽出一天跟大家介紹喔。
- `Vermicelli.test.tsx`：元件的測試檔，本專案是用Facebook開發的Jest作為測試框架，之後也會進行分享。

## 做東西前要知道做的東西是什麼
乍聽之下覺得是廢話，不過其實是有意義的！就像小時候黏土一樣，你會先知道要先做手、腳、頭、身軀，最後再接起來形成人偶。我們要先定義麵線的口味和顏色、客人填的菜單有哪些選項，以及最後給客人的產品。

在接下來的範例中，阿肥會把這些定義包在一個 **namespace** 中，只要其他檔案 **reference** 到這個檔案，就可以參考到裡面的定義。

```typescript
namespace Declaration {
    // 麵線顏色的種類
    export type T_Color = "white" | "red";

    // 麵線的口味種類，目前有大腸跟蚵仔兩種選項
    export type T_Flavor = "intestine" | "oyster";

    // 客人的菜單內容
    export interface I_Order {
        flavor: T_Flavor;
        color: T_Color;
        spoons: number;
    }

    // 最後給客人的麵線組成
    export interface I_Vermicelli extends I_Order {
        trayed: boolean;
        content: string[];
    }
}
```

## 實現工廠模式
首先，我們先把定義檔參考進來：
`/// <reference path="declaration.ts" />`

接著，我們實作一個抽象類別`BaseVermicelli`來為做麵線的流程做出一個介面，讓做白麵線的`WhiteVermicelli`跟`RedVermicelli`可以繼承這個抽象類別實作各自的流程。

最後，我們實作類別`FrontStaff`與`VermicelliFactory`。因為主程式中，我們只會用到 `VermicelliFactory`來取得麵線，其他的類別與邏輯都會封裝在裡面，所以我們只要匯出這個即可。所以`factory.ts`會有以下這些類別：

```typescript
// 用 abstract 的關鍵字宣告這個是抽象類別
abstract class BaseVermicelli {
    //...
}

//繼承 BaseVermicelli
class WhiteVermicelli extends BaseVermicelli {
    //...
}

//繼承 BaseVermicelli
class WhiteVermicelli extends BaseVermicelli {
    //...
}

class FrontStaff {
    //...
}

// 用 export 匯出 VermicelliFactory 給外部使用
export class VermicelliFactory {
    //...
}
```

## 小肥的店
跟`factory.ts`一樣，我們先把定義先參考進來：
`/// <reference path="declaration.ts" />`

接著是React起手式，先宣告一個元件，先簡單return一個div。
`export const FatVermicelli: React.FC => <div></div>`

### Functional Component (FC)
阿肥這邊把`FatVermicelli`用`React.FC`定義為這是個 **Functional Component (FC)**。簡單來說，不同於過去繼承React元件類別的方式，而是用最單純的方式 - function 建立元件，不僅可以更方便為元件的邏輯進行測試，在React 16.8 之後正式推出的 **React Hooks**，更是讓FC可以實現state的管理、life cycle的事件處理等等。所以接下來的範例，阿肥都會盡量用FC實作，讓大家順便熟悉喔。

### useState Hook
客人菜單的部分我們用表單元件實作，然後用`React.useState`管理各欄位值的變化，就像這樣：
```typescript
// Declaration.I_Order 定義 order，並給定預設值
const [order, setOrder] = React.useState<Declaration.I_Order>({
    color: "red",
    flavor: "intestine",
    spoons: 1
});

// 用 setOrder 更新欄位值
const handleFieldChange = ({ target }) => {
    setOrder(order => ({
      ...order,
      [target.name]: target.value
    }));
  };

// value傳入 order.flavor 控制欄位值，並在 onChange 事件傳入 handleFieldChange 執行 setOrder
<select
    value={order.flavor}
    id="flavor"
    name="flavor"
    onChange={handleFieldChange}
>
    <option value="intestine">大腸</option>
    <option value="oyster">蚵仔</option>
</select>
```

### 設定props, 把完成的麵線送出去
當送出表單後，我們用表單的 `onSubmit` 事件來觸發製作麵線的方法，並且定義props裡有個 `onSubmit`，將做好的麵線傳給外面的 function。
```typescript
interface I_Props_FatVermicelli {
  // 當麵線完成後，再交給外面的人
  onSubmit: (v: Declaration.I_Vermicelli) => void;
}

// 宣告FC的 props 型別為 I_Props_FatVermicelli
export const FatVermicelli: React.FC<I_Props_FatVermicelli> = ({
  onSubmit
}) => {
    // 建立一個麵線工廠的實體
    const vermicelliFactory = new VermicelliFactory();

    // 執行製作麵線的流程，並回傳給 props 的 onSubmit
    const handleSubmitOrder = e => {
        e.preventDefault();
        vermicelliFactory.receiveOrder(order);
        let _vermicelli = vermicelliFactory.maker.vermicelli;
        if (onSubmit) onSubmit(_vermicelli);
    };

    //...
    return (
        // 在 onChange 事件傳入 handleSubmitOrder 執行
        <form onSubmit={handleSubmitOrder}>
    )
}
```

## Storybook跑起來
執行`yarn story`後，開啟`http://localhost:6006`，然後切到`FatVermicelli`，就可以看到畫面了🎉
![storybook](https://i.imgur.com/N8X9uTX.png)

## 小結
從昨天工廠方法的模式篇，到今天的實作篇，大致就是之後阿肥介紹每種模式的步驟：先讓大家從生活化的情境了解設計模式的理論，再藉由實作來加深對設計模式的理解。如果有興趣的話，可以訂閱阿肥這系列的文章，這樣阿肥會更有動力完賽喔！

---

### 參考資料

- [typescript namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html#introduction)
- [React useState](https://reactjs.org/docs/hooks-state.html)
- [Function and Class Components](https://reactjs.org/docs/components-and-props.html#function-and-class-components)
