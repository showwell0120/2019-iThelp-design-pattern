# [Day14] 我需要一台喵喵翻譯機 ─ 轉接器(Adapter) <實作篇>

嗨 大家好 我是一路爬坡的阿肥

寫著寫著竟然已經撐兩個禮拜了！  
果然有參加比賽有差  
可以訓練自己擺脫三分鐘熱度的壞習慣 ![/images/emoticon/emoticon07.gif](/images/emoticon/emoticon07.gif)

---

## 給個定義

我們知道轉接器模式主要的類別會有：希望被轉接的類別，以及轉接後的目標類別。

以喵喵本身來說，她會的方法就是喵喵叫跟搖尾巴；最後希望得到的是，知道她的心情跟動作意涵。

我們先來定義這些方法：

```typescript
namespace AdapterDeclaration {
    // Target類別會用到的型別，先定義在這邊
    export type T_Mood = 'good' | 'angry' | 'sad' | 'happy';
    export type T_Action = 'confident' | 'help' | 'attack';

    // 目標類別
    export interface I_Target {
        getMood: (voice: string) => string;
        getAction: (action: string) => string;
    }

    // 被轉接的類別
    export interface I_MeowAdaptee {
        meowMeow: (voice: any) => string;
        shakeTail: (action: any) => string;
    }
}
```

## 喵喵說喵話　我們要聽人話

先實作一個抽象類別 `Target`，先實作 `I_Target` 的介面。方法的結果都只先回 null 即可，實作可留到轉接器再寫。

```typescript
abstract class Target implements AdapterDeclaration.I_Target {
    public getMood(voice: string): string {
        return null;
    }

    public getAction(action: string): string {
        return null;
    }
}
```

接著實作喵喵類別，我大喵皇不需會什麼，只要會喵喵叫跟搖尾巴就好。

```typescript
export class MeowAdaptee implements AdapterDeclaration.I_MeowAdaptee {
    constructor() {}
    meowMeow(voice: any): string {
        return voice.toString();
    }
    shakeTail(action: any): string {
        return action.toString();
    }
}
```

## 實作轉接器

實作轉接器類別之前我們先定義兩個 dictionary<small>(註 1)</small>： `VoiceMoodMapping` 跟 `ActionNeedMapping`。在實作轉接的方法時，我們會藉由這兩個 dictionary 來查詢對應的結果。

這裡有個 Typescript 的小技巧。我們要宣告一個物件，他的 key 值是某個型別包含的值時，我們可以在型態宣告上用　`key in` 的關鍵字來指定。當在建立這個物件時，就會有自動建議的選項出現，另外也會提醒你是否還有哪些值有遺漏，減少了 bug 發生的可能性。

```typescript
const VoiceMoodMapping: { [key in AdapterDeclaration.T_Mood]: string[] } = {
    good: ['呼嚕嚕~'],
    angry: ['嗚~嗚~', '哈~~!', '咪~噢!', '咪~啊!'],
    sad: ['咪~'],
    happy: ['喵~嗚', '喵~噢']
};
```

好了之後就可以來做轉接器囉！

首先在建構式中把貓咪的實體傳進來，之後可以使用他的方法。

然後這裡有個小技巧。`getMood()` 跟 `getAction()` 方法都是透過 dictionary 來查詢，我們可以再實作一個方法 `getValue<T>()` 來實現查詢結果的回傳。一來減少撰寫過程中來減少重複的邏輯撰寫，讓程式看起來更精簡; 二來利用Typescript的泛型傳入回傳結果的型別，讓開發過程中減少錯誤產生，也讓程式更有彈性。

```typescript
export class MeowAdapter extends Target {
    private meowAdaptee: MeowAdaptee;

    constructor(adaptee: MeowAdaptee) {
        super();
        this.meowAdaptee = adaptee;
    }

    private getValue<T>(mapping, target): T {
        let v = null;
        Object.keys(mapping).forEach(key => {
            if (mapping[key].includes(target)) {
                v = key;
                return false;
            }
        });
        return v;
    }

    public getMood(voice: any): string {
        const result = this.meowAdaptee.meowMeow(voice);
        let translatedResult = this.getValue<AdapterDeclaration.T_Mood>(VoiceMoodMapping, result);
        switch (translatedResult) {
            case 'good':
                return '表示開心 — 本喵想繼續被恩寵🤗';
            case 'angry':
                return '表示生氣 — 本喵氣氣氣氣氣！😡';
            case 'sad':
                return '表示難過 — 本喵知道做錯事惹😢';
            case 'happy':
                return '表示快樂 — 本喵龍心大悅😁';
            default:
                return '???';
        }
    }

    public getAction(action: string): string {
        const result = this.meowAdaptee.shakeTail(action);
        let translatedResult = this.getValue<AdapterDeclaration.T_Action>(ActionNeedMapping, result);

        switch (
            translatedResult
            //...
        ) {
        }
    }
}
```

## 喵喵翻譯機 翻起來

翻譯機的功能非常簡單，只要下拉選擇叫聲跟尾巴的選項，再按送出，就可以得到翻譯結果。所以一樣實作表單元件即可。

不過這裡有個小技巧。我們不希望選項是元件自己慢慢新增，可以的話就從現有的資料來呈現。所以我們匯入剛剛建立的兩個 dictionary ， 利用 JavaScript 陣列的 `map()`, `flat()` 來實作看看。

```typescript
//...
//...取出當作選項的資料
const getOptions = (mappping): string[] => {
    return Object.keys(mappping)
        .map(key => {
            return mappping[key];
        })
        .flat();
};
// ...
return (
    // ...
    <select value={options.tail} id="tail" name="tail" onChange={handleOptionsChange}>
        <option />
        // 對資料陣列用map做list rendering
        {getOptions(ActionNeedMapping).map((value, i) => (
            // 做list rendering 需要加 unique key
            <option key={`tail${i}`} value={value}>
                {value}
            </option>
        ))}
    </select>
    //...
);
```

## Storybook 跑起來

執行`yarn story`後，開啟`http://localhost:6006`，然後切到`MeowTranslator`，就可以看到畫面了。

![MeowTranslator](https://i.imgur.com/A2Gjaky.gif)

## 小結

轉接器模式雖然可以不更改類別本身，也能對應到不同情境使用。不過要注意隨著複雜度提升，或是需求增加，轉接器的類別也會愈繁雜。所以要使用這個模式的話，盡量先規劃好類別的架構與精簡方法的實作。

---

註 1: 字典物件(dictionary)是儲存鍵（Key）/值（Value）對應的物件。

### 參考資料

-   [Notes on TypeScript: Mapped Types and Lookup Types](https://dev.to/busypeoples/notes-on-typescript-mapped-types-and-lookup-types-i36)
-   [React - Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)
-   [貓咪的 12 種聲音語言](https://www.twgreatdaily.com/cat74/node947537)
-   [貓奴必看【從尾巴看出喵星人１４種心情】#2 幾乎所有奴才都懂！](https://clickme.net/39864)