# [Day22] 打造輕鬆編輯的顏文字編輯器吧！ ─ 命令(Command) <模式篇>

嗨 大家好 我是一路爬坡的阿肥   

今天是blue nonday...   
不過因為有鐵人賽的加入   
讓阿肥想blue也沒時間blue啦！ 

---

## 情境描述

肥醬喜歡在社交軟體上使用顏文字，像是開心的時候就會用： ヽ(́◕◞౪◟◕‵)ﾉ 、想要玩笑性地使出猥瑣表情的時候就會用： ლ(◉◞౪◟◉ )ლ 等等一些固定的顏文字。可是網路上提供的顏文字庫選項太多了，不然就是不好編輯。所以肥醬決定為自己做一個簡單的顏文字小工具。

這個小工具很簡單：有幾個肥醬常用的顏文字選項，點選之後就可以複製到剪貼簿; 另外也會顯示在輸入框，可以在後面打字或是連接其他的顏文字選項。肥醬希望這個輸入框還能提供簡單的複製、貼上、及上下一步按鍵可以操作。

好的，我們幫肥醬整理一下開發的思緒：這個小工具會有複製跟貼上的操作指令，另外還須記錄操作的狀態來實現上下一步的功能；前端的介面上就是一個輸入框加上數個操作按鍵。

更進一步地轉換想法，這個工具會提供相似的介面來實現不同的操作指令，並且需要儲存每次的操作狀態。肥醬有想法了！要開發這個小工具的最佳實踐，就是要用 **命令模式(Command Pattern)**。
 
## 命令模式 (Command Pattern)
先看guru上的解釋：
> Command is a behavioral design pattern that turns a request into a stand-alone object that contains all information about the request. This transformation lets you parameterize methods with different requests, delay or queue a request’s execution, and support undoable operations.   
(命令模式是行為型的模式，可以將請求轉換為獨立的物件，包含了所有有關這個請求的資訊。轉換過程中可以讓你藉由不同的請求、延遲請求的執行或排入佇列，以及支援可還原的操作。)

我們可以用生活中的例子來大致理解這個模式。有些東西其實是我們需要發送某種命令，這個命令可能還會透過一個媒介，讓實際製作東西的人接收。   
例如：   
- 想吃拉麵的客人點餐 -> 服務生將單子給師傅 -> 師傅收到單子後製作拉麵
- 想喝飲料的某人在自動販賣機的面板按下號碼 -> 面板將號碼傳給機器 -> 機器將飲料推下來   

...其實命令模式是無所不在，在軟體開發中也是一樣。

敏捷開發大師 Robert C. Martin 關於命令模式曾這麼說過：
>命令模式，是我認為最簡單且優雅的模式之一，其可運用的範圍，或許沒有界限。

在管理系統、資料庫交易、遊戲的指令控制等等，都能用命令模式實現。當中如果需要實作特殊功能，像是 **紀錄指令動作**、 **復原上次指令**、 **佇列**、**日誌** 等，更適用命令模式。

## 四大角色
接著我們來搭配今天的例子來說明命令模式的四大角色吧！

### Receiver - 接收者 EmojiEditor
根據命令的請求執行，並產出最後的結果。我們寫在EmojiEditor。這個元件主要是文字輸入框，並且會輸出一些可以使本身狀態更新的方法。明天會再來說明實作的細節。
```typescript
const EmojiEditor = React.forwardRef((props, ref) => {
    // ... 提供Command呼叫的方法，並且執行狀態的更新。
    getText(): string {
        return textContent;
    },
    setText(s: string): void {
        setTextContent(s);
    },
    selectText(): void {
        textAreaRef.current.select();
    }
    // ...

    return <textarea {...} value={textContent} onChange={e => setTextContent(e.target.value)}></textarea>
})
```
### Command & ConcreteCommand - 命令的抽象類別與具體類別
抽象類別負責定義必要的方法跟屬性，其中至少會有一個 execute() 的抽象操作。以及實作基本共用的方法。   
具體類別根據命令的不同，來繼承抽象類別，實作自己的邏輯。

先看抽象類別。
```typescript
abstract class Command {
    //...

    // 實作基本共用的方法
    public saveBackUp() {
        // ...
    }
    public undo() {
        //...
    }

    // 留給具體類別實作
    public execute(): void { }
}
```

再看繼承抽象類別的具體類別。

```typescript
export class CopyCommand extends Command {
    public execute(): void {
        // 呼叫接收者
        this.editorRef.current.selectText();
        // ...
    }
}
```

### Client - EmojiApp
建立具體命令類別的物件，並且設定Receiver。我們寫在 EmojiApp。
```typescript
export const EmojiApp: React.FC<any> = props => {
    // 產生接收者，也就是EmojiEditor元件
    const editorRef = React.useRef<HTMLDivElement>(null);

    // 建立具體命令類別的物件
    const copyCmd = new CopyCommand(editorRef);

    // ...

    return (<div>
            //...
            // 渲染接收者
            <EmojiEditor ref={editorRef} />
        </div>
    </div>);
```
### Invoker - EmojiApp
儲存建立好的具體命令物件，並且負責呼叫指令的執行function。如果有實作復原功能，也會在這裡儲存指令的狀態。由於這個例子很單純，我們一樣寫在 EmojiApp 就可以。
```typescript
export const EmojiApp: React.FC<any> = props => {
    // ... 儲存指令的狀態
    const history: I_Command[] = [];

    // 負責呼叫指令的執行function
    const executeCmd = (cmd: I_Command) => {
        if (cmd.execute) {
            history.push(cmd);
            console.log('executeCmd - history:', history)
            cmd.execute();
        }
    }

    //...
```

## 小結
現在肥醬可以更快地在他的訊息加上顏文字，可以聊的天又更多了～

> 在等誰 一聲下令以後    
> 才想起 呼吸你的自由    
> 從何時 習慣這種生活 Oh ～ 你忘了     
> 《將軍令Your Legend》

[![將軍令Your Legend](https://img.youtube.com/vi/83I_5lq5MwI/0.jpg)](http://www.youtube.com/watch?v=83I_5lq5MwI '將軍令Your Legend')

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day23-behavioral.command.code`

明天會介紹怎麼用 Typescript 加上 React 實作流程，對於模式的應用跟程式會再更詳細的說明喔！

---

### 參考資料   

- [guru - Command](https://refactoring.guru/design-patterns/command)
- [命令模式 (Command Pattern)](https://notfalse.net/4/command-pattern)