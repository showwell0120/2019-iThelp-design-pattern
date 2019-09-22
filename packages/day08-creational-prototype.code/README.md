# [Day8] 聖上說選 3 份奏摺各複寫 500 張 ─ 雛型(Prototype) <實作篇>

嗨 大家好 我是一路爬坡的阿肥

最近天氣的關係加上拼命寫文章   
睡眠品質好到一直爬不起來(眼神死)   
羨慕一天只需要睡3小時就精神飽滿的人

---

**今日文章適合搭配[範例專案](https://github.com/showwell0120/Design-Pattern-Typescript-React)的`packages/day08-creational-prototype.code`一起搭配觀看，歡迎把專案clone下來喔**

## 定義物件共有的介面   
我們為這個物件共有的介面 `I_OutputPrototype` 定義了一個 `clone()`，並且指定的回傳也要是依 `I_OutputPrototype` 介面實作的實體。另外我們為了這個例子再多一個 `getInnerHTML()` 定義轉印出來的方法。
```typescript
namespace PrototypeDeclaration {
    export interface I_OutputPrototype {
        clone(): I_OutputPrototype;
        getInnerHTML(): string
    }
}
```

## 建立顯影的類別
在 `prototype.ts` 中，我們建立一個 namespace `PrototypeClass`，並且建立了兩個類別 `OutputReportA` 跟 `OutputReportB`。這兩個類別對應到昨天的故事，就是針對老肥的不同奏摺所產生的顯影。

```typescript
namespace PrototypeClass {
    interface I_ReportData {
        reporter: string;
        date: string;
        subject: string;
    }

    export class OutputReportA extends implements PrototypeDeclaration.I_OutputPrototype {
        reportData:I_I_ReportData = null;
        constructor() {
            super();
            this.reportData = {
                reporter: '老肥',
                date: '乾隆12年02月12日',
                subject: '<p><strong>奏請司庫墊款而免公用拮据由</strong><br />(附一：動撥司庫應於節年耗羨歸還墊款銀兩清單)<br />(附二：應動各年耗羨候款撥給銀兩清單)</p>'
            }
        }

        clone(): PrototypeDeclaration.I_OutputPrototype {
            return new OutputReportA();
        }
    }

    export class OutputReportB extends implements PrototypeDeclaration.I_OutputPrototype {
        reportData:I_I_ReportData = null;
        constructor() {
            super();
            this.reportData = {
                reporter: '老肥',
                date: '乾隆12年02月18日',
                subject: '<p><strong>奏查鹽山慶雲二縣貧戶酌供籽種並報初十後得雨分寸事</strong><br />(附件：各屬得雨分寸清單)</p>'
            }
        }

        clone(): PrototypeDeclaration.I_OutputPrototype {
            return new OutputReportB();
        }
    }
}
```

這兩個類別除了文字內容不一樣以外，同樣的都是需要實作 `I_OutputPrototype` 的介面、實作 `clone()`，還有最後轉印到紙上的部分。如果有好好看過本系列第5、6天的文章的話可能就會想到：「嘿！我們還可以用工廠方法為這兩個類別再建立一個工廠」

```typescript
// 工廠方法 實作抽象類別
abstract class OutputReport implements PrototypeDeclaration.I_OutputPrototype {
    reportData: I_ReportData = null;

    constructor() { }

    clone() {
        return null;
    }

    // 實作轉印到紙上的方法
    getInnerHTML() {
        if (!this.reportData) return '';
        return `<div>
            <ul>
                <li>具奏人：${this.reportData.reporter}</li>
                <li>具奏日期：${this.reportData.date}</li>
                <li>事由：${this.reportData.subject}</li>
            </ul>
        </div>`
    }
}

// 簡化 OutputReportA & OutputReportB
export class OutputReportA extends OutputReport {
    constructor() {
        super();
        this.reportData = {
            // ...
        }
    }

    clone(): PrototypeDeclaration.I_OutputPrototype {
        return new OutputReportA();
    }
}
```

### `implements` 與 `extends`的比較：
許多強型別語言都會有這兩個關鍵字，雖然看似都是規範子類別的實作，但用途跟意義是不一樣的。   

`extends` 是讓子類別繼承父類別的關鍵字。子類別繼承後可以使用父類別的方法，也可以覆寫，實現自己的邏輯。

`implements` 強調的則是 **類別需對於指定的介面進行實作**，如果類別沒有實作方法的話，IDE就會先報錯。由於是介面，通常也不會先實作好方法的邏輯，

## 建立複印機的類別
我們設定複印機有個屬性 `outputPrototypeMap` 來儲存顯影的實體，並且具有 `createOne()` 的方法，呼叫顯影實體的 `clone()`的方法。

```typescript
export class Copier {
    private outputPrototypeMap: { [s: string]: PrototypeDeclaration.I_OutputPrototype } = {};

    constructor(fileList: string[]) {
        let me = this;
        if (fileList && fileList.length) {
            fileList.map(f => me.outputPrototypeMap[f] = new PrototypeClass[`OutputReport${f}`]());
        }
    }

    createOne(s: string): PrototypeDeclaration.I_OutputPrototype {
        return this.outputPrototypeMap[s].clone();
    }
}
```

## 複印機跑起來
我們建立表單輸入兩份A, B奏摺要複印的份數，這部分的功能和UI與上個實作相似，如果有不懂的地方可以再回去複習喔。

這裡先介紹一個React的小技巧：`dangerouslySetInnerHTML`。在JSX裡，如果輸入HTML的字串，這個字串並不會處理成DOM渲染。所以可以在 `dangerouslySetInnerHTML` 傳入物件，物件傳屬性 `__html` 來指定HTML的字串。

```jsx
<div>{output.reportA && output.reportA.length && output.reportA.map(copied => {
        return <div dangerouslySetInnerHTML={{ __html: copied }}></div>
    })}
</div>
```
當我們按下啟動時，要開始進行複印的流程。這裏我們只要建立 `Copier`的實體，並根據各個奏摺的份數決定呼叫 `createOne()`的次數，最後用 `getInnerHMTL()`來實作轉印的方法。

```typescript
const handleSubmit = e => {
    e.preventDefault();

    const reportCopier = new Copier(['A', 'B']);
    let copiedReportAList: string[] = [];
    for (let i = 0; i < setting.reportA; i++) {
        let clonedA = reportCopier.createOne("A");
        copiedReportAList.push(clonedA.getInnerHTML().concat(`<small>這是reportA的第${i + 1}份<small>`));
    }
    let copiedReportBList: string[] = [];
    //...

    setOutput(output => ({
        ...output,
        reportA: copiedReportAList,
        reportB: copiedReportBList
    }))
}
```

## Storybook跑起來   
執行`yarn story`後，開啟`http://localhost:6006`，然後切到`ReportCopier`，就可以看到畫面了。
![storybook](https://i.imgur.com/Y2RMr8w.png)

## 小結
我們看到主程式本身雖然沒有匯入物件的類別，但是透過雛型模式的實作卻可以任意產生多個物件。雖然這種模式有這樣的好處在，但如果物件本身複雜度高，複製物件的成本就會提升，所以使用上也要特別注意。

---

### 參考資料
- [java中extends與implements的區別淺談](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/323178/)

