# [Day7] 聖上說選 3 份奏摺各複寫 500 張 ─ 雛型(Prototype) <模式篇>

嗨 大家好 我是一路爬坡的阿肥

如果看到這篇，表示阿肥撐過了第一個禮拜   
也就是一個月的 1/4，168 個小時，10080 分，604800 秒！
接下來也要繼續爬下去！

---

## 情境描述　　　

老肥是古代朝廷中的大臣，他非常講究上呈的奏摺需字寫的方正整齊，而且敘述政事要條理分明、井然有序。因此皇上對老肥一直以來讚賞有加。

某日上朝的時候，皇上突然要求老肥選 3 份奏摺，各複寫 500 張，發給朝中大臣，皇上希望大家能夠借鏡老肥的奏摺，更精進撰寫奏摺的技巧。

老肥雖然被皇上褒揚，欣喜萬分，但是想到要生出數量這麼多的奏摺便頭痛不已。如果無法完成的話，恐怕就會影響在皇上心目中的地位。

## 土法煉鋼　來的及嗎？
老肥先試著複寫一張奏摺，算一算需5分完成。所以 3 (份奏摺) X 500 (張) Ｘ 5 (分) / 60 = 125 個小時。一天的時間根本無法完成！

突然，他想起一位友人曾經跟說過一個秘密，雖然當時只是覺得玩笑話，不過他決定放手一搏，尋求這位友人的幫忙。

## 歡迎來到科技王國　
這位友人聽了老肥的狀況之後，嘴角露出微笑說：「這小事包在我身上！在我的那個世界，有個玩意兒可以解決你的煩惱！」 

隨後，這位友人帶著老肥到井的前面，話也不說地跳進去，老肥雖然非常驚嚇，但也硬著頭皮跳了。

「歡迎來到科技王國，跟著我走吧！」老肥走著走著看眼前的高樓大廈和人群，他才信了友人的秘密。

他們走進了一間店面，友人掀開一台龐然大物的蓋子，把奏摺放進去，按了幾個鍵後，旁邊便不斷地吐出跟奏摺內容完全一樣的紙。這番景象讓老肥看到目瞪口呆。差不多過了半小時，3 份奏摺，1500 張的複寫已經完成了！

「這就是科技與智慧的力量！這台龐然大物叫做複印機，不用知道這張紙上寫了什麼，只要掃描這個文件，就會形成一個顯影，然後透過定影的方法轉印在紙上。無論是多少份，只要有這個顯影，要幾張就能有幾張！」

## 雛型模式
透過老肥的例子，除了要感謝有複印機的發明以外，我們也可以用它基本的運作原理解釋什麼叫雛型模式(Prototype Pattern)。

來看一下Guru的說明：
> The Prototype pattern delegates the cloning process to the actual objects that are being cloned. The pattern declares a common interface for all objects that support cloning. This interface lets you clone an object without coupling your code to the class of that object. 
(雛型模式表示複製一個真實物件的過程。這個模式宣告了一個物件共有的介面，並且支援複製。這個介面讓你複製物件時，不會讓程式對於物件的類別依賴，形成耦合。)

這段話就十足了解釋雛型模式的精神。當主程式需要針對某個物件複製多個時，我們不用額外匯入物件的類別來建立。只要物件有提供一個 `clone()`的方法，就能夠進行複製。

![複印機](https://i.imgur.com/sS5Jer9.png)

拿複印機的運作轉為程式來看：

- 產生顯影的介面定義了 `clone()`，回傳的結果要是 `OutputPrototype`
- 實作介面的 `OutputReportA`、`OutputReportB`、`OutputReportC`的類別，實作各自的 `clone()`，結果是回傳自己的實體
- 複印機本身是主程式， 執行 `createOne()`的話，可以呼叫實體物件的`clone()`進行複製

以Typescript來演示以上說明的話：
```typescript
// 產生顯影的介面
interface OutputPrototype {
    clone(): OutputPrototype;
}

// 實作介面的類別
namespace OutputClass {
    export class OutputReportA implements OutputPrototype {
        clone(): OutputPrototype {
        return new OutputReportA();
        }
        // ...
    }

    export class OutputReportB implements OutputPrototype {
        //...
    }

    export class OutputReportC implements OutputPrototype {
        //...
    }
}


// 複印機的類別
class Copier {
    private outputPrototypeMap: { [s: string]: Prototype } = {};

    constructor(fileNameList:string[]) {
        let me = this;
      if(fileNameList && fileNameList.length) {
          fileNameList.map(fName => me.outputPrototypeMap[fName] = new OutputClass[`OutputReport${fName}`]());
      }
    }

    createOne(s: string): Prototype {
      return this.outputPrototypeMap[s].clone();
    }
  }
```

## 小結

看完之後來聽點有感覺的歌吧！

> 遍地開滿了花 遍地的芬芳  
> 遍地佈滿 倔強的倔強 有悲傷 就歌唱  
> 跌跌撞撞 依然很瘋狂   
> ─《遍地開花》

[![遍地開花](https://img.youtube.com/vi/NGbnRoL26CA/0.jpg)](http://www.youtube.com/watch?v=oXTPEJwXEjc "NGbnRoL26CA")

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day8-creational-prototype.code`

明天會介紹怎麼用 Typescript 加上 React 實作複印機的流程，對於模式的應用跟程式會再更詳細的說明喔！

---

### 參考資料

- [guru - Prototype](https://refactoring.guru/design-patterns/prototype)
- [Design Patterns in TypeScript - prototype](https://github.com/torokmark/design_patterns_in_typescript)
