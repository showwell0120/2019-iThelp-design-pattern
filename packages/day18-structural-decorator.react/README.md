# [Day18] Switch 的各種同捆包 統統裝起來 ─ 裝飾者(Decorator) <React 篇>

嗨 大家好 我是一路爬坡的阿肥

最近家裡大人把一些舊的遊戲轉賣  
發現原來遊戲片可以這麼保值!  
準備入手新的遊戲好期待呀

---

## React 中的裝飾者

有讀過 React 的文件的人，或許會對進階指南中的 **高階元件(Higher-Order Components, HOC)** 會有點印象。不過如果沒有先建立些觀念的話，可能會對這種開發元件的方式會有點難懂。阿肥第一次使用這種方式的時候，也是在似懂非懂的情況下摸索。

所以我們在這裡一次搞清楚吧！

先看在官方上的說明：

> Concretely, a higher-order component is a function that takes a component and returns a new component.  
> (具體來說，高階元件是一個可以傳入元件，並回傳一個新元件的函式)

大致上像這樣:

```typescript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

疑? 這不就是昨天說的裝飾模式嗎？`WrappedComponent`是目標物件，`higherOrderComponent`是裝飾者函式，動態地將功能加到目標物件上，最後回傳擴充過的物件`EnhancedComponent`。

## HOC 做做看

我們延伸昨天的例子，假設除了現有的產品標籤，還需要多一標示特價的標籤。所以我們先為這兩種 UI 做簡單的元件。

```typescript
//接收 產品名稱 & 產品價格 的值
export interface I_Props_SwitchBox {
    displayName: string;
    totalPrice: number;
}

// 簡單的產品標籤
export const SimpleSwitchBox: React.FC<I_Props_SwitchBox> = props => {
    return (
        <div>
            <p>產品名稱：{props.displayName}</p>
            <p>產品價格：{props.totalPrice}元</p>
        </div>
    );
};

// 顯示特價的產品標籤
export const BarginSwitchBox: React.FC<I_Props_SwitchBox> = props => {
    return (
        <div>
            <h2>商品八折特價中！！</h2>
            <div>
                <p>產品名稱：{props.displayName}</p>
                <p>產品原價：{props.totalPrice}元</p>
                <p style={{ fontWeight: 'bold' }}>特價只要：{props.totalPrice * 0.8}元</p>
            </div>
        </div>
    );
};
```

接著來做這兩種 UI 的 HOC。這個 HOC 可以幫我們處理產品名稱的格式化，以及價格的計算。我們先定義 HOC 會有什麼 prop。

```typescript
interface I_Props_WithSwitchParts {
    name: string[]; //傳入一系列配件或遊戲的名稱
    price: number[]; //傳入一系列配件或遊戲的單價
}
```

實作 HOC。因為搭配 Typescript 開發，所以在型別宣告上要特別注意。最後，這個 HOC 會把傳入的原件包裝過後，回傳一個新的元件。

這裡用一個 React Hook 的小技巧: `useEffect`。使用`useEffect`的第二個陣列參數來接收 props 的變動，如果有變動的話，就執行第一個 callback 來做產品名稱的格式化和價格計算，並且呼叫 `setDisplayName`跟`setTotalPrice` 更新狀態。

```typescript
// 泛型<P>：是WrappedComponent的props型別
// React.ComponentType：是泛指class component和 function component，表示傳入的元件兩者皆可
// React.FC<P & I_Props_WithSwitchParts>：表示回傳的新元件除了自己的props，還添加了HOC本身的props

const withSwitchParts = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P & I_Props_WithSwitchParts> => ({
    ...props
}: P & I_Props_WithSwitchParts) => {
    const [displayName, setDisplayName] = React.useState<string>('');
    const [totalPrice, setTotalPrice] = React.useState<number>(0);

    React.useEffect(() => {
        if (props.name && props.name.length) {
            let _name = ['Nintendo Switch 主機', ...props.name].join(' / ');
            setDisplayName(_name);
        }
        if (props.price && props.price.length) {
            let _price = props.price.reduce((a, b) => a + b, 7500);
            setTotalPrice(_price);
        }
    }, [props]);

    const wrappedProps = { ...(props as P), displayName, totalPrice };

    return <WrappedComponent {...wrappedProps} />;
};
```

最後來做新元件。

```typescript
export const SimpleSwitchBoxWithParts = withSwitchParts(SimpleSwitchBox);
export const BarginSwitchBoxWithParts = withSwitchParts(BarginSwitchBox);
```

## Storybook 跑起來

執行`yarn story`後，開啟`http://localhost:6006`，然後切到`Decorator`，就可以看到畫面了。

![Decorator](https://i.imgur.com/fwII6Xd.gif)

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day18-strusctural.decorator.react`

## 小結

HOC 會根據實際的專案需求應用在各種地方，基本上如果發現有些元件有相似的資料處理邏輯，就可以考慮做成 HOC，像是可以把 React 的 Context 實作成 HOC，替某些元件注入狀態等等。雖然程式複雜度通常會提升許多，不過可以做到 **關注點分離**、減少重複邏輯撰寫等等。有機會的話就著手試試看吧！

---

### 參考資料

-   [React - Higher-Order Components](https://zh-hant.reactjs.org/docs/higher-order-components.html)
-   [Using the Effect Hook](https://zh-hant.reactjs.org/docs/hooks-effect.html)
-   [React Higher-Order Components in TypeScript](https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb)
