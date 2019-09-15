# [Day2] 太陽與月亮 Typescript與Javascript

嗨 大家好 我是一路爬坡的阿肥   
今天吃月餅消化的熱量，應該可以讓大腦擠出10天份的文章   
不過實際上應該會變成肚子的一部份吧(哭)
   
---

## 先談Javascript
Javascript是由前網景(Netscape)工程師Brendan Eich所發明的語言，雖然只有短短的10天開發時間，卻讓原本只是個靜態的瀏覽器世界有了重大的蛻變。到現在我們能開發出各種使用者互動的網頁應用程式，甚至是後端服務、行動應用等等，都要感謝有Javascript的誕生。

Javascript好上手的程度就跟他熱門的程度一樣，只要google一下，看完搜尋結果的第一頻連結，恭喜你，你已經會寫Javascript了！

但是，我想會來看這系列文章的你，應該有了什麼痛的領悟，才會下定決心看這篇的吧！

Ｊavascript跟其他語言相比，雖然學習門檻低，但是卻有不少地方需要好好掌握。不然當你很開心地開發下去，最後會收到滿天飛的bug。

舉一些例子來說：

- var/let/const scope/hoisting - 變數的作用範圍與提升
- function closure/curry - 函式的閉包與柯里化
- ```this``` - 函式指向的作用物件
- ==/=== - 兩個等於跟三個等於的差異
- ...（族繁不及備載）

以上這些就提供給大家自行google，這裡要關注的是：**型別**。

## 有了型別，一切都不一樣了
資料型別，你可能會說：「Ｊavascript也有呀，而且宣告的時候，我說他是字串就是字串，是數字就是數字，真方便！」   

但是只要開發過大型應用程式的人都知道，當你宣告一個複雜的物件或函式，並且在其他地方使用到的話，你可能需要有個嚴謹的規範、清楚的註釋才能減少錯誤的機會。例如：

```javascript
// obj.js
export var complicatedObject = {
    prop1: "...",
    prop2: 123,
    prop3: true
    prop4: [{
        prop1ofProp4: "..."
        prop2OfProp4: 0
    }, ...]
};

//func.js'
import {complicatedObj} from 'obj';
function doSomething(obj) {
    console.log(`print string${complicatedObj.sprop1}`);
    let a = complicatedObject.prop2+1;
    if(complicatedObject.prop3) {
        let b = prop4.map(item => {
            // 不知道item是什麼，執行以下這行就會報錯
            return item + a;
        });
    }
}
doSomething(complicatedObj);
```

但如果我們能為complicatedObj加個型別：

```typescript
// obj.ts
export interface I_Props4_Item {
    prop1ofProp4:string;
    prop2ofProp4:number;
}
export interface I_ComplicatedObj {
    prop1:string;
    prop2:number;
    prop3:boolean;
    prop4:I_Props4_Item[];
}
export var complicatedObj:I_ComplicatedObj = {
    //當在宣告時就能即時知道屬性的型別
    ...
};

//func.ts'
import {complicatedObj,I_ComplicatedObj} from 'obj';
function doSomething(obj:I_ComplicatedObj) {
    ...
    if(complicatedObj.prop3) {
        let b:number[] = prop4.map(item => {
            // 可以知道item的物件型別，即能正常執行
            return item.prop2OfPro4 + a;
        });
    }
}
doSomething(complicatedObj);
```

因此，微軟釋出的Typescript逐漸在Web前端開發中展露頭角，不僅解救了為弱型別而苦的工程師們，也讓開發高複雜度和大規模應用程式的過程可以更有規範、更能減少除錯機率。成熟的開發環境與社群，也讓他熱門的程度遠高於其他相似的語言。

![TS vs Flow npm downloads over the last 2 years (npmtrends.com)](https://miro.medium.com/max/1105/1*FyWQBtNziW8DBvHn6AG89g.png)

## Typescript的學習之路

不知道有沒有人跟阿肥一樣，剛接觸Typescript的時候就像...

咳咳...先來聽首歌吧！

> 怎麼在愛裡微加幸福 少一點自由就變負    
>太多了你說我的關心 是一種束縛   
>─《微加幸福》

[![微加幸福](https://img.youtube.com/vi/wgwIfD9Ihik/0.jpg)](http://www.youtube.com/watch?v=wgwIfD9Ihik "微加幸福")

疑？通常我開發完一個元件，應該只要2小時就好，現在竟然要多半小時寫各種型別的宣告?!而且還要加設定檔、加loader等等才能跑起來?! 怎麼比以前寫Javascript的時候還要麻煩？

的確，不僅要先建立相關的開發環境，開始寫主程式前要先寫定義檔，有的複雜一點的型別還得先研究怎麼寫。但是阿肥只能說，
這就是寫強型別語言的工作日常，我們只是把爾後除錯和維護的時間挪一點點來寫型別。想要成為~~可以更早下班~~更優秀的工程師，這是一條值得走下去的學習之路。

接下來的設計模式教學文，阿肥會藉由程式實例順便介紹寫Typescript的一些眉角，請敬請期待！

## 跟設計模式有什麼關係？

關係可大囉！當初在軟體開發的領域被第一次提出這些設計模式時，就是在物件導向的語言 - C++中發跡，隨後成為Java、Ｃ#等其他物件導向語言中普及，成為軟體開發人員的必備知識。

設計模式的演示通常會以[UML](https://zh.wikipedia.org/zh-tw/%E7%BB%9F%E4%B8%80%E5%BB%BA%E6%A8%A1%E8%AF%AD%E8%A8%80)描述類/物件之間的關係與作用方式。有了Typescript，我們可以為物件或類別建立介面，不僅能透過UML上來解釋，更能貼近實際程式碼的產出。

## 小結   

可能有些人看完還是覺得標題下得很莫名其妙XD  ~~沒錯，阿肥的確是硬掰的(被揍)~~ 阿肥認為，Typescript的出現，就像太陽一樣，讓原本黯淡都是坑的月球明亮了起來。所以，不要害怕，學就對了！

---

### 參考資料   
- [維基百科](https://zh.wikipedia.org/wiki/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F_(%E8%AE%A1%E7%AE%97%E6%9C%BA))
- [快速瞭解 TypeScript 是什麼東西](https://blogs.msdn.microsoft.com/ericsk/2012/10/01/typescript/)
- [JavaScript傳奇：從跑龍套到挑大樑的程式語言](https://tw.twincl.com/javascript/*662x)