# [Day21] 精通React測試驅動開發 ─ TDD & Jest

嗨 大家好 我是一路爬坡的阿肥   

阿肥竟然撐過第三個禮拜了！
真的太感動了嗚嗚
希望可以撐到最後！

---

## 前言
今天阿肥又要講跟設計模式沒什麼直接相關的主題啦（被揍）。雖然沒直接的關連，但是阿肥覺得，在軟體開發中，這是跟學好設計模式同等重要的！那就是 **要做測試** 。

試想在某專案中，你心血來潮地用了某種設計模式開發出資料模型，但是沒有先自行驗證資料邏輯是否有誤，建立出來的物件是否有符合期待的屬性，操作方法是否為正確的行為...等等。如果到了實際開發主程式時，才用手動的方式慢慢測。這樣不但影響了開發效率，開發人員對自己程式碼的信心度也會降低，日後可能光是修bug就佔了日常一半的工作時間。

很多開發人員或許都有經過這樣的惡性循環：為了減少開發時間不寫測試，結果QA階段到上線階段花大半時間改bug，日後維護程式因為沒有做測試，要更動邏輯的部分又花更久的時間在重構程式...。這樣的開發日常妳/你喜歡嗎？

## 極限開發(Extreme programming, XP )
極限開發(XP)，是敏捷軟體開發 <small>（註1）</small> 中最著名的一個方法論。強調的是將任務/系統細分為可以在較短週期解決的一個個子任務/模組，並且強調要做測試、重視程式碼的質量和及早發現問題。

XP主要會有這些實踐原則：

- **Incremental planning**: 將需求記錄到story card，並依重要順序決定要不要加到這次的release中，並將需求切分成細部的子任務
- **Pair programming**: 開發以兩人一組，分工合作，並互相監督、code review，提升程式品質
- **Test-first development ( writing test before code )**: 也就是 **TDD(Test-Driven Development)**，實作功能前先撰寫單元測試，這也是今天接下來要講的重點
- **Continuous integration**: 只要新功能完成就持續整合到系統中，並確保所有的單元測試都能通過
- **Sustainable pace**: 大量加班會影響開發人員的生產力，造成程式品質不佳（這太重要啦！希望每個老闆都能銘記這句，不要過度壓榨RD呀!）

## 《精通React測試驅動開發》導讀
阿肥的團隊最近舉辦的的讀書會，主題就是這本書《Mastering React Test-Driven Development, 精通React測試驅動開發》

![book](https://www.packtpub.com/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/b/1/b10700_cover.png)

這本書是目前少數是介紹React專案中，如何導入TDD流程來開發。在觀念解釋，和程式演示都相當清楚易懂。第一次接觸React的新手也是相當推薦從這本入門喔。

接著就藉由這本的第一章內容來認識React的TDD吧！

### 建立React專案
有些人可能是從 `create-react-app` clone下來開始。但是作者認為這與極限開發中提及到的 **YAGNI(You aren't gonna need it)** 原則相抵觸。我們應該確定使用到的才加入到專案中，一來我們可以掌握專案使用到的外部資源; 二來也不會專案中存在過多無用的東西。

### 先建立寫測試的環境
TDD的精神之一就是要先寫測試，所以先準備好測試環境，作者推薦以Jest作為React專案的測試框架。

所以我們先來裝相關套件。以本範例專案是用 Typescript 開發的話，我們需要另外裝相關的定義檔跟loader:   
`yarn add -DW jest @types/ject ts-jest`

接著在根目錄下新增 `jest.config.js`，根據專案所需設定
```javascript
module.exports = {
    //...
    globals: {
        'ts-jest': {
            extends: './babel.config.js',
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    //...
    testMatch: ['**/__tests__/*.+(ts|tsx|js)', '**/*.test.+(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    //...
}
```
環境準備好之後，就可以開始寫第一個測試囉！

### 測試命名與位置
作者的習慣是將測試程式與產品程式分離，不過這就看個人的喜好，阿肥目前是將測試檔跟元件目錄放在一起，這樣匯入與查詢相關程式會比較方便。檔案名稱通常命名為 `XXX.test.ts(x)` ，能符合設定檔中的 `testMatch` 的正規即可。

### 寫測試前必須知道的 `describe` 跟 `it` 
- **it**: 建立測試的最小單位。每個單元測試以it包覆。
- **describe**: 包覆多個單元測試(it)，建立測試群組的區塊

所以看起來會像這樣：
```typescript
describe("元件名稱", () => {
  it("單元測試的描述", () => {
    //...測試內容
  });
});
```

### 紅綠測試
紅綠測試是指，一開始先寫好單元測試的內容，包括傳入props給元件，渲染成DOM，以及驗證期待的結果。這時候由於還沒實作元件，所以執行測試時，會出現紅字並提示哪個驗證不符預期結果。 然後再去實作功能的細節，讓紅字能變成綠字通過。透過這樣的循環達到TDD的開發準則。

不過我們是用 Typescript 開發。如果匯入一個不存在的元件的話就會報錯。所以我們可以先建立好元件基本的架構、props的介面宣告等。之後針對實際要開發的功能再進行紅綠測試的流程。

ComponentA.tsx
```typescript
export const ComponentA: React.FC<I_Props_ComponentA> = ({
  //...
}) => {
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="componentAForm"></form>
    </div>
  );
};
```

ComponentA.test.tsx
```typescript
let container;

//每個測試案例前執行(更換element,Reseting)
beforeEach(() => {
  container = document.createElement("div");
});

//提取重複程式
const render = component => ReactDOM.render(component, container);
const form = (id: string) => container.querySelector(`form[id="${id}"]`);

describe("ComponentA", () => {
  it("產生表單", () => {
    // Arrange: 安排，產生目標的測試實體或資料
    render(<ComponentA onSubmit={null} />);
    // Assert: 斷言，檢查結果是否為預期
    expect(form("componentAForm")).not.toBeNull();
  });
});
```

### 測試的三A準則
好的測試需要清楚、獨立的條列出：

- 安排(Arrange): 準備好測試要依賴的項目(如資料、DOM) e.g.  
渲染 ComponentA 元件
`render(<ComponentA onSubmit={null} />);`
- 行動(Act): 要執行測試的程式碼 e.g.
觸發 button 的點擊事件(調用 react-test-utils 的 act 來模擬)    
`act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });`
- 斷言(Assert): 檢查結果是否如預期 e.g.  
期待存在一個 id 為 componentAForm 的表單DOM
`expect(form("componentAForm")).not.toBeNull();`

## 小結
今天講的內容只是測試的冰山一角而已。如果下定決心跟阿肥一樣想學好這塊的話，可以看參考資料的連結，並且開始動手做。下一次的鐵人賽阿肥或許會進一步介紹這本書，請大家敬請期待囉！

---

註1: 為了解決許多公司的軟體團隊在開發過程中浮現的問題陷入泥沼，一批業界專家概括出了一些可讓團隊具有快速工作、響應變化能力的價值觀和原則，並自稱為敏捷聯盟。目前敏捷開發的方法論有：SCRUM，Crystal，特徵驅動軟體開發（Feature Driven Development，簡稱FDD），自適應軟體開發(Adaptive Software Development，簡稱ASD)，以及今天提到的極限開發(eXtreme Programming,簡稱XP)。

### 參考資料   
- [Jest](https://jestjs.io/)
- [React - Test Utilities](https://reactjs.org/docs/test-utils.html#act)
- [極限開發與敏捷開發](https://www.itread01.com/content/1544588858.html)
- [【筆記】極限開發 Extreme programming (XP)](https://wayne265265.pixnet.net/blog/post/113348468-%E3%80%90%E7%AD%86%E8%A8%98%E3%80%91%E6%A5%B5%E9%99%90%E9%96%8B%E7%99%BC-extreme-programming-%28xp%29)
- [Mastering React Test-Driven Development](https://www.packtpub.com/web-development/mastering-react-test-driven-development)