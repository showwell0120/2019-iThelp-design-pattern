# [Day11] BABY 你就是我唯一 ─ 獨體(Singleton)

嗨 大家好 我是一路爬坡的阿肥

今天的文章對阿肥來說好輕鬆呀~  
不用寫太多範例程式  
而且看到題目的第一眼就瞬間想到歌  
如果接下來每個模式都那麼好懂就好了(不可能)

---

## 前言

在社會或是法律道德的規範之下，有些個體同時會希望只存在一個。像是一個國家只能有一個政府，女(男)朋友同時只能交一個。如果某些意外導致個體超出一個時，就會容易造成混亂，甚至造成運作的中止。

同樣地，在軟體開發上也有相同的情況，所以我們需要獨體(Singleton)模式來規範物件的產生機制。

## 以 Typescript 演示獨體(Singleton)

獨體(Singleton)算是建立型模式中概念最簡單的模式，我們只需要建立一個類別，並且確保這個類別可以：

- 只產生一個實體：如果每次取得物件都是從類別建立實體開始，由於經過建構呼叫後，必定會回一個新的物件，這樣就無法都是存取同一個物件
- 提供存取物件的方法：提供程式全域存取，無論在哪裡都能使用同一個物件

以 Typescript 來說，我們需要的是 **`static`** 的特性來實作。`static` 是建立類別裡成員的關鍵字，無論是屬性或是方法，都能直接在類別上呼叫，而不需建立實體。

來看一下類別會長怎樣

```typescript
class SomethingSingleton {
  //欲存取的實體，設為私有避免外部直接取得
  private static something: SomethingSingleton;

  // 建構子要設為私有，避免外部直接用 new 來建立實體
  private constructor() {}

  // 提供外部取得實體的方法，並且實體只存在一個的限制
  public static getSomething(): SomethingSingleton {
    if (!SomethingSingleton.something) {
      SomethingSingleton.something = new SomethingSingleton();
    }

    return SomethingSingleton.something;
  }

  //可針對實體提供一些操作上的方法
  public someBusinessLogic() {
    // ...
  }
}
```

主程式來嘗試存取 `SomethingSingleton`

```typescript
function clientCode() {
  const s1 = SomethingSingleton.getSomething();
  const s2 = SomethingSingleton.getSomething();

  if (s1 === s2) {
    console.log("耶!獨體模式成功~取到的都是同一個!");
  } else {
    console.log("歐!獨體模式失敗~我們不一樣!");
  }
}

clientCode();
```

想要執行看看的話，可以先在全域安裝 typescript
`npm intall -g typescript`  
在 `packages/day11-creational-singleton` 的目錄下執行 `tsc singleton.ts`，typescript 的編譯器會產生 js 檔 ─ `singleton.js`  
最後再執行這支 js `node singleton.js` 就可以看到結果囉。

![singleton](https://i.imgur.com/bbjLZYq.png)

## 主要的應用

獨體模式在後端開發有比較多的應用，JAVA 還有更進階的語法，可以更完整獨體模式的操作([可參考 2018 鐵人賽 orcarex 大大的文章](https://ithelp.ithome.com.tw/articles/10203092))

主要的應用像是：

- 資料庫連線
- 使用者登入
- 網站瀏覽人數統計
- 全域的快取

## 為什麼不直接用全域變數?

獨體模式的特性是，程式需要時才會執行實體化；而全域變數是不管有沒有用到就先配置一塊記憶體給他，如果執行中都沒使用到的話會造成資源的浪費。

另外全域變數雖然可以提供全域的存取，但並不保證只能存在一個實體，無法達到獨體模式可實踐單一實體的效果。

## 小結

看完之後來聽點有感覺的歌做個 ending 吧！

> 妳就是我的唯一　　  
> 獨自對著電話說我愛你  
> 《唯一》

## [![唯一](https://img.youtube.com/vi/P7Qv4AV_StM/0.jpg)](http://www.youtube.com/watch?v=P7Qv4AV_StM "唯一")

### 參考資料

- [Leo 程式筆記 - 獨體模式](https://dotblogs.com.tw/leo_codespace/2017/06/03/204504)
- [guru - singleton](https://refactoring.guru/design-patterns/singleton)
