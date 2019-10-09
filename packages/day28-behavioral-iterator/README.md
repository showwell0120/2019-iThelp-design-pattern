# [Day28] 操作大量資料的好幫手 ─ 迭代器(Iterator) <模式篇>

嗨 大家好 我是一路爬坡的阿肥

今天要介紹最後一個模式了
真的是...太開心啦！

今天是澎湖遊最後一天，還是一樣跟大家分享個照片～

---

## 情境描述

肥兒是個朝九晚五的上班族。平常的工作內容是把商品型錄以郵寄方式寄給客戶。由於客戶規模不大，一天只需處理幾十件就好，所以地址資訊就算用手寫的，時間也很充裕。

但是，隨著公司發展快速，一下子客戶多了好幾倍！平常用手寫根本無法應付，每天都加班加到手要斷掉。肥兒覺得這樣不行，於是建立了客戶的聯絡資訊的資料庫，並且用列印的方式印出。果然這樣提昇了不少效率。

可是可憐的肥兒還是得加班，因為不僅要貼客戶的資訊，還要貼上公司的地址，最後進行填表記錄編號等等。這些都是跟客戶原本的資訊分開的，所以並不會跟著一起印出來。

有沒有辦法在不影響原本資料庫的情況之下，可以跟客戶的聯絡資訊一起印出，減少這些重複的工呢？

答案是有的！我們需要熟悉的就是 **迭代器模式(Iterator Pattern)** 來協助我們處理大量資料。

## 迭代器模式 (Iterator Pattern)

先看 guru 上的解釋：

> terator is a behavioral design pattern that lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).  
> (迭代器是行為型的模式，讓一個集合，例如列表、堆疊、樹等等，不用暴露他裡面的實作表徵，就能遍歷其各個元素。)

##

##

## 小結

> 曾經辜負哪位 這才被虧欠  
> 路過人間 一直這輪迴  
> 幸運一點 也許最後和誰 都不相欠  
> 《路過人間》

[![路過人間](https://img.youtube.com/vi/FMl7GEaYwAE/0.jpg)](http://www.youtube.com/watch?v=FMl7GEaYwAE '路過人間')

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day29-behavioral.iterator.code`

明天會介紹怎麼用 Typescript 加上 React 實作流程，對於模式的應用跟程式會再更詳細的說明喔！

---

### 參考資料

-   [guru - Iterator](https://refactoring.guru/design-patterns/iterator)
