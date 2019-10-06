# [Day23] 打造輕鬆編輯的顏文字編輯器吧！ ─ 命令(Command) <實作篇>

嗨 大家好 我是一路爬坡的阿肥   


---

## 定義 Command 的 介面與抽象類別

## 實作各種 Command 類別

## 指令的接收者 Receiver - 文字內容框元件

### useRef

### forwardRef

### useImperativeHandle

## 指令的發送者 Sender - 主程式元件

## Storybook 跑起來

執行`yarn story`後，開啟`http://localhost:6006`，然後切到`Command Pattern/EmojiApp`，就可以看到畫面了。

文字輸入框可以輸入一般的文字，點選顏文字的按鍵就能把對應的符號串接到內容中。另外利用javascript原生的clipboard API實作了文字框內容複製與貼上的功能。最後，我們還實作了命令模式中紀錄指令堆疊的部分，所以可以進行復原。

![result](https://i.imgur.com/YVduvNA.gif)

## 小結

今天的實例不但實現了命令模式，也運用了React的ref觀念和相關hooks的使用。不過切記，這個實例是藉由React的ref存取，加上一層命令的類別，來包覆邏輯操作與呼叫狀態的更新，所以會稍微加深些程式的複雜度。其實在React中還有其他方式可以實踐，例如使用hook實作操作的部分，一樣可以達到邏輯與介面分離的目的。大家有興趣的話可以嘗試看看喔！

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day23-behavioral.command.code`

---

### 參考資料  

- [React - Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)
- [React - useImperativeHandle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)
- [Codesandbox - Call Child Method (using hooks)](https://codesandbox.io/s/8lxr0pq179)