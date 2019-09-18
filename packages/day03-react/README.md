# [Day3] 虛實之間 就用 React 築起所見即所得的世界吧！

嗨 大家好 我是一路爬坡的阿肥

每次搭高鐵往返老家跟北部的時候，就會想著：  
「每次搭車可以省 3 個小時，每年搭個 20 次，這樣一年就幫我省了 60 個小時，可以多陪家人和多點睡眠時間」

這樣想的話就會覺得車票錢也貴的值得了

---

## 成本高 維護難 這樣的前端你喜歡嗎？

在 React、Vue 等這些前端框架成為主流之前，許多人通常是使用 jQuery 或純 JS 進行開發。

jQuery 和純 JS 的開發模式主要是靠對真實 DOM 進行事件的綁定與操作。當開發小型或簡單邏輯的網頁應用程式時，靠 jQuery 和純 JS 就能實現，不僅能單純化專案的架構，也不太需要考慮性能的問題。

但是，當專案的規模與複雜度提升的時候，傳統的寫法就會引起以下這兩種問題：

- 每一次微幅的更新，就要整個重新渲染頁面上的 DOM。當 DOM 的結構愈深，就造成更多成本上的浪費
- 愈來愈多的事件管理與 DOM 操作綁在一起，可讀性更低，日後更難維護程式

因此，Facebook 為了要克服這些問題，發展出了 React 這套 UI 函式庫，也推動了前端開發進到下一個更成熟的階段。

## 你不能不知道的 React

寫第一行 React 之前，最重要的事情不是直接看 Get Start 寫出 Hello World，而是了解它運作的基礎和架構。

話不多說，來看看哪些是必須要知道的觀念吧！

### Virtual DOM

Virtual DOM 是描述真實 DOM 的數據結構，並且以樹狀呈現 DOM 的巢狀關係。當資料一有更新，程式並不會直接呼叫頁面重新渲染，而是比對出差異的地方，一段時間後批次更新對應到的真實 DOM。這樣做即可大幅改善上面問題的第一點，讓開發者不必花額外的力氣優化效能。

![來源：https://cythilya.github.io](https://cythilya.github.io/assets/2017-03-31-virtual-dom.png)

### JSX & Component

在寫 jQuery 和純 JS 的時代，我們會把模板寫成 html 檔、樣式寫成 css 檔，以及邏輯互動寫成 js 檔，讓軟體開發中的 V(View)的部分更進一步做關注點分離。
但是在 React 中，能獨立運作的最小單位就是元件(Component)，並且使用 JSX 語法糖，將模板的建立、邏輯互動的綁定，甚至是注入樣式(可以參考 [styled-component](https://www.styled-components.com/))，用更方便的方式寫在元件中。

```jsx
// Class Component
class CompA extends React.Component {
    constructor() {
        //...
    }
    render {
        {/* JSX的註記這樣寫 */}
        {/* 變數用{}包起來 */}
        return <div>{this.props.wording}</div>
    }
}

// 用Typescript寫Functional Component
const CompB:React.FC<I_Props_CompB> = props => {
    {/*以標籤的方式建立元件*/}
    return <CompA wording="Hello~" />
}
```

### One-Way Data Binding & Two-Way Data Binding

資料綁定(Data Binding)指的是資料端與 UI 端之間會透過事件的綁定，當某一端有異動時，另一端可以進行更新。

但單向(One-Way)跟雙向(Two-Way)又是怎麼回事呢？其實就只是表示資料流向(Data flow)的不同而已。

A. 從資料端出發，資料一有異動，就通知 UI 端更新  
B. 從 UI 端出發，UI 一有異動，就通知資料端更新

通常現代的前端框架(包含 jQuery, React, Angular)都可以實作出單向或雙向的資料綁定，所以我們不是偏頗地定義某某框架就是哪種資料綁定，而是會去描述某某框架，他容易實現哪種資料綁定。

以 React 來說，官方文件是說：

> React’s one-way data flow (also called one-way binding) keeps everything modular and fast.

原因是 React 提供`state`跟`props`去做狀態的管理與屬性的傳遞，UI 可以隨資料的異動去更新。

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    // 宣告state初始值
    this.state = { date: new Date() };
  }

  componentDidMount() {
    // 定時器
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // 用setState更新state值
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        {/*接收上層的屬性值*/}
        <h1>{this.props.header}</h1>
        <h2>
          It is
          {/*更新state後 UI就會更新*/}
          {this.state.date.toLocaleTimeString()}.
        </h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock header={"Hello, world!"} />,
  document.getElementById("root")
);
```

### Functional Programming

React 16 之後，React 愈來愈重視 Functional Programming 的撰寫方式，並且發布了 Functional Component(函式型元件)、Hooks 等重要更新。為什麼呢？

Functional Programming 是一種寫程式的方法論，並且以 **Function First** 的思維，將所有邏輯運算都包成獨立的函式，並且以組合的方式，將上一個函式的執行，當作是下一個函式的參數傳遞。

寫成 Functional Component 有些好處，目前阿肥體會較深的是：

- 容易測試，基本上能為這些獨立的函式寫 unit test
- 編譯過後，會比以往的類別少更多程式碼; 沒有狀態管理下，效能通常也會較好

如果要更了解 Functional Programming，可以參考[2017 年鐵人賽的系列文章](https://ithelp.ithome.com.tw/articles/10186465)

如果理解以上這些觀念的話，恭喜你可以開始 React 學習之旅了 🎉

## React ft. Typescript ft. Design Patterns

> 一個人的晚餐 無聊寂寞  
> 兩個朋友能 開心的直說  
> 三個人可以 給妳勇氣  
> ─《仨人》

[![仨人](https://img.youtube.com/vi/L8sEFu9ByaA/0.jpg)](http://www.youtube.com/watch?v=L8sEFu9ByaA "仨人")

由於現在 React 生態系發展豐富，愈來愈多應用程式都會以 React 進行開發。當你 Google "React Design Pattern"，你就會發現不少人已經整理出 React 開發的特有幾個 pattern。

但是在這裡，阿肥會希望以各個設計模式的使用情境出發，當過去其他語言開發大型應用時會碰到什麼問題，用什麼模式解決; 而在 Web 前端開發這個領域，如何用 Typescript 演示架構與流程，並搭配 React 做最後 UI flow 的呈現。

## 小結

React 目前為止一直在領先的地位，衍生出來的套件更是多到數不清，現在還能寫行動端的應用。雖然不知道他還能主流多久，但是不會錯的是，React 已經成為現階段的典範 UI 框架。Keep learning!

---

### 參考資料

- [The functional side of React](https://medium.com/@andrea.chiarelli/the-functional-side-of-react-229bdb26d9a6)
- [为什么是 React－浅谈 React 与 jQuery 的思维差异](http://xunli.xyz/2016/01/16/react-vs-jquery/)
- [一看就懂的 JSX 簡明入門教學指南](https://blog.techbridge.cc/2016/04/21/react-jsx-introduction/)
- [Virtual DOM 概述](https://cythilya.github.io/2017/03/31/virtual-dom/)
- [簡單聊一下 ONE-WAY DATA FLOW、TWO-WAY DATA BINDING 與前端框架](http://blog.turn.tw/?p=2948)
