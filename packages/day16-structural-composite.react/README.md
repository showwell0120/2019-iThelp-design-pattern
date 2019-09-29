# [Day16] 一次填好麵線跟拉麵的菜單可以嗎？ ─ 組合(Composite) <React篇>

嗨 大家好 我是一路爬坡的阿肥   

---

## React的組合模式
在前端開發中，我們會實作出許多UI元件，像是對話框、工具列等等。其中，某些元件可能會需要共用的操作邏輯或UI，像是對話框元件會根據內容和性質的不同，會有警示對話框、提示對話框，或表單輸入的對話框等等。所以React在這一方面效仿組合模式的精神，建立了傳遞 **`props`** 的機制，透過最基本的props功能，就能達到元件間共用邏輯&UI的目的。

### 自訂props
只要寫過React的人應該都很熟悉，目前為止的範例程式也用了不少自訂props來傳遞屬性和方法。這種方式就是React中的組合模式。

### 預設prop - children
每個React元件都會有一個預設的prop - **`children`**。只要是在jsx中，元件標籤中有任何的元件、一般的元素、文字等，都會成為元件的children值。我們如果有在元件使用這個prop，也能達到組合的目的。

需要注意的是，在React中，如果我們有宣告元件是Functional Component(FC)的話，我們就不用另外再props的介面加上children的型別喔。

我們以昨天的例子來改造看看。

先建立 `Product` 跟 `Menu` 兩種元件。其中，Product元件需要傳入 `name` 跟 `price` 作為元件的props; `Menu` 除了自訂props - `type` 跟 `description` 以外，還使用 `children`，來呈現子節點的UI。
```typescript
export interface I_Props_Menu {
    type: string;
    description: string;
}

export interface I_Props_Product {
    name: string;
    price: number;
}

export const Menu: React.FC<I_Props_Menu> = props => {
    return (<div>
        <h3>[{props.type}] <small>{props.description}</small></h3>
        {props.children}
    </div>);
}

export const Product: React.FC<I_Props_Product> = props => {
    return <p>- ▢ {props.name} {props.price}元</p>
}

```
在story裡面，我們來建立聯合菜單。
```typescript
storiesOf('ProductMenu', module).add('ProductMenu', () =>
    <Menu type="肥肥麵線＆壹LAN拉麵 聯合菜單" description="兩家一起點，讓你好方便!">
        <Menu type="壹LAN拉麵店" description="ようこそ、こちらへ！!">
            <Product name="壹LAN特製拉麵" price={120}></Product>
            <Product name="鮭魚味噌湯" price={40}></Product>
        </Menu>
        <Menu type="肥肥麵線攤" description="想吃點台味來這邊!">
            <Menu type="麵線" description="">
                <Product name="大腸口味" price={40}></Product>
                <Product name="蚵仔口味" price={40}></Product>
            </Menu>
            <Menu type="涼飲" description="">
                <Product name="古早味紅茶" price={20}></Product>
                <Product name="彈珠汽水" price={30}></Product>
            </Menu>
        </Menu>
    </Menu>
)
```

## Storybook 跑起來
![result](https://i.imgur.com/tbKAc1k.png)

## 寫React用組合還是繼承 どち？ 
在React文件中，很明確地說明：
>在 Facebook 中，我們使用 React 在成千上萬個 component，我們找不到任何使用案例來推薦你建立繼承結構的 component。     
...   
如果你想要在 component 之間複用非 UI 的功能，我們建議抽離它到一個獨立的 JavaScript 模組。Component 可以 import 並使用它的 function、object，或者是 class，而不需要繼承它。

### 什麼是繼承(Inheritance)？
在類別中，可以透過 `extends` 讓子類別可以擁有父類別的的屬性和方法，並且根據子類別需求加以擴增。所以使用繼承也可以達到共用程式碼的目的。

但是繼承的缺點是，子類別可以覆寫父類別原有的操作。這樣做不但容易破壞封裝性，父類別與子類別若過度依賴緊密，也會限制了靈活性，甚至在開發過程中出現程式上的錯誤。

相對之下，組合不需知道裡面的實作細節，只需驗證輸入與輸出都符合期待即可。

## 小結
希望透過今天的講解，大家可以對組合和繼承可以有更進一步地了解。當然不是說組合多多益善，而是要針對開發的環境、需求以及維護的便利性來彈性地使用。

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day16-strusctural.composite.react`

---

### 參考資料   

- [React - Composition vs Inheritance](https://zh-hant.reactjs.org/docs/composition-vs-inheritance.html)
- [React - Composition vs Inheritance](https://programmingwithmosh.com/react/react-composition-vs-inheritance/)
- [TypeScript and React: Children](https://fettblog.eu/typescript-react/children/)