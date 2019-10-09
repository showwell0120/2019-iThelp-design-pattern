# [Day24] 每個人都要訂閱的颱風假最新通知 ─ 觀察者(Observer) <模式篇>

嗨 大家好 我是一路爬坡的阿肥   

今天上班 發現好多人沒來   
今年的最後一個連假   
終於要來啦！   

---

## 情境描述

不管是上班族還是學生，除了關心國定假日放哪幾天、接下來有哪幾個連假以外，最想要馬上知道的，應該就是明天會不會放颱風假吧！只要颱風要登陸的前一晚，很多人就會透過許多方式來關注自己的縣市會不會放假，像是PTT、Facebook、LINE，甚至守在新聞台前等著跑馬燈。

但是如果有人跟阿肥一樣，就算是下班後的晚上，也是很認真的寫鐵人文章，沒有辦法隨時地關注這些消息來源。如果很幸運地在住家裡的話，不用特別交代，你家阿母可能一知道結果就會跑來跟你說。但是如果像阿肥的單身狗朋友們就沒那麼吃香了。為了那些晚上還奮力工作的單身狗朋友們，是不是能夠做點什麼貼心的服務呢？

我們可以想像會有一個工具程式，工具的使用者只要訂閱關注的縣市，宣布放颱風假的時候，就會主動通知那些有訂閱的使用者。這種訂閱 ─ 通知的最佳實踐，就是使用 **觀察者模式(Observer Pattern)啦！ 

## 觀察者模式 (Observer Pattern)
先看guru上的解釋：
> Observer is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing.   
(觀察者模式是行為型的模式，讓你定義一個訂閱的機制，當正在被觀察的物件有任何事情發生時，就會通知所有觀察此物件的訂閱者。)

舉大家最舉的跟報社訂閱報紙例子就能一目瞭然。
報社將我加到訂戶清單 -> 每天清晨將報紙交給派報生 -> 派報生發給各個訂戶 -> 訂戶們包括我可以看到最新的報紙

以上，觀察模式說明完畢。剩下的就是轉換為程式來思考囉！

這個流程主要會有兩個角色：
- Observerable/Subject(可觀察的/主題)：也就是報社，負責管理訂戶，並且呼叫派報生將最新報紙送給訂戶。所以主要實作的方法有：
嗨 大家好 我是一路爬坡的阿肥   

今天上班 發現好多人沒來   
今年的最後一個連假   
終於要來啦！   

---

## 情境描述

不管是上班族還是學生，除了關心國定假日放哪幾天、接下來有哪幾個連假以外，最想要馬上知道的，應該就是明天會不會放颱風假吧！只要颱風要登陸的前一晚，很多人就會透過許多方式來關注自己的縣市會不會放假，像是PTT、Facebook、LINE，甚至守在新聞台前等著跑馬燈。

但是有些人跟阿肥一樣，就算是下班後的晚上，也是很認真的寫鐵人文章，沒有辦法隨時地關注這些消息來源。如果住家裡的話，你家阿母可能一知道結果就會跑來跟你說。但是如果像阿肥的單身狗朋友們就沒那麼吃香了。![/images/emoticon/emoticon02.gif](/images/emoticon/emoticon02.gif)

為了單身狗朋友們，是不是能夠做點什麼貼心的服務呢？

我們可以想像會有一個工具程式，工具的使用者只要訂閱關注的縣市，宣布放颱風假的時候，就會主動通知那些有訂閱的使用者。這種訂閱 ─ 通知的最佳實踐，就是使用 **觀察者模式(Observer Pattern)** 啦！ 

## 觀察者模式 (Observer Pattern)
先看guru上的解釋：
> Observer is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing.   
(觀察者模式是行為型的模式，讓你定義一個訂閱的機制，當正在被觀察的物件有任何事情發生時，就會通知所有觀察此物件的訂閱者。)

舉大家最舉的跟報社訂閱報紙例子就能一目瞭然。
報社將我加到訂戶清單 -> 每天清晨將報紙交給派報生 -> 派報生發給各個訂戶 -> 訂戶們包括我可以看到最新的報紙

以上，觀察模式說明完畢。剩下的就是轉換為程式來思考囉！

這個流程主要會有兩個角色：
- Observerable/Subject(可觀察的/主題)：也就是報社，負責管理訂戶，並且呼叫派報生將最新報紙送給訂戶。所以主要實作的方法有：
  - `addObserver()`: 新增觀察者
  - `removeObserver()`: 移除觀察者
  - `notifyObserver()`: 通知觀察者，相當於派報生的角色 
- Observer(觀察者)：也就是訂戶，訂戶會知道自己訂閱什麼主題的報紙，並且只要有收到報紙就能看到最新消息。最重要的方法就一個：
  - `update()`: `Observerable` 在 執行 `notifyObserver()` 時會呼叫到的方法，並且會接收到最新的資料

## 看例子大概怎麼實作
### Observerable - TyphoonNotifyCenter 颱風假通知管理中心
```typescript
class TyphoonNotifyCenter implements I_Observerable {
    // 依城市來劃分，紀錄訂閱者列表
    protected observerList: { [key in E_CityCode]: I_Observer[] } = {
        //...
    };

    //...

    // 透過新增與移除方法來管理訂閱者列表
    public addObserver(o: I_Observer): void {
        // ...
    }
    public removeObserver(o: I_Observer): void {
        // ...
    }

    // 呼叫每個訂閱者的 update()
    public notifyObservers(o: I_NotifyData): void {
        //...
    }
}
```
### Observer - TyphoonNotifyClient 訂閱颱風假通知服務的客戶端
```typescript
class TyphoonNotifiedClient implements I_Observer {
    constructor() {
        //...
    }

    public update(result: E_Result): void {
        //...
    }
}
```

## 小結
有了這個訂閱服務，就算是晚上還要奮戰工作，沒時間關心颱風假的單身狗們，也能感受到那種被主動關懷的溫暖了。

> Wake me up before you go-go  你走之前叫醒我     
> Don't leave me hanging on like a yo-yo  別讓我像溜溜球一樣到處閒晃     
> Wake me up before you go-go  你走之前叫醒我    
> I don't want to miss it when you hit that high  當你high翻時我可不想錯過          
> 《Wake Me Up Before You Go Go》

[![Wake Me Up Before You Go Go](https://img.youtube.com/vi/ELflyACZXQQ/0.jpg)](http://www.youtube.com/watch?v=ELflyACZXQQ 'Wake Me Up Before You Go Go')

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day25-behavioral.observer.code`

明天會介紹怎麼用 Typescript 加上 React 實作流程，對於模式的應用跟程式會再更詳細的說明喔！

---

### 參考資料   

- [guru - Observer](https://refactoring.guru/design-patterns/observer)
