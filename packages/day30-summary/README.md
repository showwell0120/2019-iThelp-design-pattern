# [Day30] 總而言之 融會貫通最重要

嗨 大家好 我是一路爬坡的阿肥   
   
雖然是第一次參加 有很多不足的地方   
但是謝謝有訂閱這個系列文章的你們   
讓阿肥有繼續寫下去的動力   
之後還有機會的話 就繼續再來看我的文章吧！

---

## 設計模式三大心法
主要參考物件導向設計的SOLID原則，阿肥抽出公司前輩們最常說，也是最基本的三個原則：
### 開放封閉 (Open/close)
**開放（擴充）封閉（修改）**。系統應該要保留彈性，方便擴充新功能。如果內部程式的過度依賴其他程式，造成高耦合，新增功能時可能會造成bug。
### 單一職責 (Single responsibility)
一段程式，或一個類別只負責一件事情。不過要注意功能被切的太細造成過度設計的情況，徒增複雜度。所以依系統實際的需求而定。
### 依賴倒轉 (Dependency Inversion)
高階模組不應依賴低階模組，兩個都應該依賴在抽象概念上；抽象概念不依賴細節，而是細節依賴在抽象概念。
套句參考資料所說的白話:
> 話不能說的太死，盡量講一些概念性的東西

## 快問快答
Ｑ：設計模式總共有20幾種，阿肥是怎麼決定要寫這12種呢？   
Ａ：基本上我是從 [guru - DESIGN PATTERNS IN TYPESCRIPT](https://refactoring.guru/design-patterns/typescript) 這裡的星星數去篩的。然後3大分類平均挑4個來寫。所以介紹的設計模式都算是應用滿普遍的模式喔。

Ｑ：設計模式裡的範例情境都是自己想的嗎？還是參考其他人寫的呢？   
Ａ：基本上比較容易聯想的，阿肥就會自己想，這樣寫起來會比較起勁。如果沒有什麼想法的話，就會參考其他大大的舉例，自己再變化一下喔。   

Ｑ：可以舉最難準備跟最輕鬆準備的模式嗎？   
Ａ：其實準備起來花的心力都差不多。不過在做外觀模式的實例，去拉資料那塊的確花不少時間在找可以拉資料的API，而且還有CORS的問題還沒順利解決，算是阿肥覺得不足的地方。   

Ｑ：為什麼每個模式介紹完的小結會放歌呢？有什麼意義嗎？   
Ａ：原本想學小生的梗，順便想充個版面XD。不過寫到後來發現根本在挖坑給自己跳(苦笑)，有些主題光是找聯想的歌，就花半天的時間在聽歌哈哈。不過後來就有點妥協了，所以大家如果真的可以從歌詞或意境聯想得到設計模式的話，恭喜你，成為阿肥的soul mate了！

Ｑ：當初為什麼會想參加鐵人賽呢？之後還會想參加嗎？   
Ａ：第一次知道鐵人賽是前年參加朋友的鐵人賽頒獎典禮的時候。雖然那時候有想開始累積屬於自己的技術產出，不過因為一直忙工作，也沒有下定決心，所以就拖到現在才參加呵呵。 之後的話，應該會在平常累積些筆記，如果ＯＫ的話再參加。不然說實在的，每天都是從0開始，真的是寫到懷疑人生。

## 最後做個快速查閱
### 想了解模式定義
模式名稱 | 文章連結
------------- | -------------
工廠方法(Factory Method) | [[Day5] 老闆：來一碗大腸麵線 ─ 工廠方法(Factory Method) <模式篇>](https://ithelp.ithome.com.tw/articles/10218017)
雛型(Prototype) | [[Day7] 聖上說選 3 份奏摺各複寫 500 張 ─ 雛型(Prototype) <模式篇>](https://ithelp.ithome.com.tw/articles/10218703)
建設者(Builder) | [[Day9] 吃壹LAN就是要硬麵加半熟蛋 ─ 建設者(Builder) <模式篇>](https://ithelp.ithome.com.tw/articles/10220090)
獨體(Singleton) | [[Day11] BABY 你就是我唯一 ─ 獨體(Singleton)](https://ithelp.ithome.com.tw/articles/10220642)
轉接器(Adapter) | [[Day13] 我需要一台喵喵翻譯機 ─ 轉接器(Adapter) <模式篇>](https://ithelp.ithome.com.tw/articles/10221998)
組合(Composite) | [[Day15] 一次填好麵線跟拉麵的菜單可以嗎？ ─ 組合(Composite) <模式篇>](https://ithelp.ithome.com.tw/articles/10222843)
裝飾者(Decorator) | [[Day17] Switch的各種同捆包 統統裝起來 ─ 裝飾者(Decorator) <模式篇>](https://ithelp.ithome.com.tw/articles/10222843)
外觀(Facade) | [[Day19] 我要輕鬆成為股海高手！ ─ 外觀(Facade) <模式篇>](https://ithelp.ithome.com.tw/articles/10224517)
命令(Command) | [[Day22] 打造輕鬆編輯的顏文字編輯器吧！ ─ 命令(Command) <模式篇>]()
觀察者(Observer) | [[Day24] 每個人都要訂閱的颱風假最新通知 ─ 觀察者(Observer) <模式篇>]()
策略(Stretegy) | [[Day26] 為厲害的怪獻上會心一擊 ─ 策略(Stretegy) <模式篇>]()
迭代器(Iterator) | [[Day28] 操作大量資料的好幫手 ─ 迭代器(Iterator) <模式篇>]()

### Typescript 小技巧
描述 | 文章連結
------------- | -------------
namespace的使用 | [[Day6] 老闆：來一碗大腸麵線 ─ 工廠方法(Factory Method) <實作篇>](https://ithelp.ithome.com.tw/articles/10218572)
implements 與 extends的比較 | [[Day8] 聖上說選 3 份奏摺各複寫 500 張 ─ 雛型(Prototype) <實作篇>](https://ithelp.ithome.com.tw/articles/10219278)
static的使用 | [[Day11] BABY 你就是我唯一 ─ 獨體(Singleton)](https://ithelp.ithome.com.tw/articles/10220642)
物件的key值是某個型別(key in) / 泛型 | [[Day14] 我需要一台喵喵翻譯機 ─ 轉接器(Adapter) <實作篇>](https://ithelp.ithome.com.tw/articles/10222286)
enum的使用 ｜[[Day25] 每個人都要訂閱的颱風假最新通知 ─ 觀察者(Observer) <實作篇>]()

### React 小技巧
描述 | 文章連結
------------- | -------------
Functional Component (FC) / useState Hook | [[Day6] 老闆：來一碗大腸麵線 ─ 工廠方法(Factory Method) <實作篇>](https://ithelp.ithome.com.tw/articles/10218572)
dangerouslySetInnerHTML | [[Day8] 聖上說選 3 份奏摺各複寫 500 張 ─ 雛型(Prototype) <實作篇>](https://ithelp.ithome.com.tw/articles/10219278)
控制 checkbox 的狀態跟多選的選項 | [[Day10] 吃壹LAN就是要硬麵加半熟蛋 ─ 建設者(Builder) <實作篇>](https://ithelp.ithome.com.tw/articles/10220532)
props & children | [[Day16] 一次填好麵線跟拉麵的菜單可以嗎？ ─ 組合(Composite) <React篇>](https://ithelp.ithome.com.tw/articles/10223286)
HOC / useEffect Hook | [[Day18] Switch 的各種同捆包 統統裝起來 ─ 裝飾者(Decorator) <React篇>](https://ithelp.ithome.com.tw/articles/10224138)
useRef / forwardRef / useImperativeHandle | [[Day23] 打造輕鬆編輯的顏文字編輯器吧！ ─ 命令(Command) <實作篇>]()

### 其他教學
主題 | 文章連結
------------- | -------------
Mono-Repo | [[Day4] 結婚後一起住會比較省錢 ─ Mono-Repo](https://ithelp.ithome.com.tw/articles/10217534)
Storybook | [[Day12] 前端開發好朋友 ─ Storybook](https://ithelp.ithome.com.tw/articles/10221438)
TDD & Jest | [[Day21] 精通React測試驅動開發 ─ TDD & Jest](https://ithelp.ithome.com.tw/articles/10225233)

--- 

### 參考資料

－[物件導向程式設計基本原則 - SOLID](https://skyyen999.gitbooks.io/-study-design-pattern-in-java/content/oodPrinciple.html)
