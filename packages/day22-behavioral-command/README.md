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

## 

## 

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