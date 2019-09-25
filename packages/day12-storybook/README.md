# [Day12] 前端開發好朋友 ─ Storybook

嗨 大家好 我是一路爬坡的阿肥

---

## Storybook 簡介

今天阿肥要先插個花，介紹一下本系列的範例專案用到的工具 — Storybook。

雖然跟設計模式本身沒什麼關係，但是跟設計模式一樣，目的就是幫助我們在開發上可以更有品質跟有效率。

如果你正在進行一件高複雜度或大規模的前端開發時，不妨先從 Storybook 開始吧！

我們看 Storybook 的介紹：

> Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components.  
> (Storybook 是 UI 元件的開發環境，它可以讓你瀏覽元件庫、檢視元件在不同狀態下的變化，並且可以即時互動地針對元件開發與測試)

話不多說，直接開始吧！

## 準備環境

**因為 Storybook 版本差異，可能在環境的準備或設定會有不同，所以這裡會特定標註版號。你也可以視情況安裝最新版本喔**

由於範例專案是用 React+Typescript 開發，所以我們安裝的是 Storybook 的 React 版本，並且安裝定義檔  
`yarn add -DW @storybook/react@5.1.11 @types/storybook__react@4.0.2`

Storybook 有提供許多相當實用的外掛，基本可以根據專案情況看是否要安裝。如果要使用外掛的話，首先要先安裝相關套件  
`yarn add -DW @storybook/addons@5.1.11`

我們找一個外掛裝裝看，如果有另外裝定義檔也要一起裝  
`yarn add -DW @storybook/addon-knobs@5.1.11 @types/storybook__addon-knobs@3.4.1`

接著建立在根目錄下新增 **.storybook** 的資料夾，基本上會需要三個檔案：

- `webpack.config.js`：Storybook 是使用 webpack 建立開發環境，所以各種檔案需要的 loader 都要在這裡設定。([注意: Storybook v5.X 之後跟 v4 以前的設定會有點差異](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecate-webpack-extend-mode))

```javascript
module.exports = ({ config, mode }) => {
  //設定loader
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      loader: require.resolve("awesome-typescript-loader"),
      include: path.resolve(__dirname, "../")
    }
    // ...
  );
  config.resolve.extensions.push(".ts", ".tsx");
  config.plugins.push();
  Object.assign(config.resolve.alias, {
    ...packages.reduce(
      (acc, name) => ({
        ...acc,
        [`@monorepo-react-starter/${name}`]: path.join(basePath, name, "src")
      }),
      {}
    )
  });

  return config;
};
```

- `addons.js`: 在這個檔案 import 所有會用到的外掛的入口點

```javascript
import "@storybook/addon-knobs/register";
```

- `config.js`：Storybook 的基本設定，有些外掛會需要在這裡以 `addDecorator`執行，Storybook 就會在頁面上幫這個外掛新增一個 tab，開發者就可以使用他的功能

```javascript
//匯入addon的hook
import { withKnobs } from "@storybook/addon-knobs";

const req = require.context("../packages", true, /.story.tsx?$/);
function loadStories() {
  // 加入外掛的hook
  addDecorator(withKnobs);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
```

## 第一個 story

story 檔的命名格式通常為 `元件名.story.tsx`，須符合你在設定檔的篩選規則。

在 story 檔匯入相關套件，通常是

```typescript
import { storiesOf } from "@storybook/react";
import * as React from "react";
// 目標元件
import { FatVermicelli } from ".";
```

接著就可以開始寫 story 囉！架構上大致是

```typescript
storiesOf("第一層文字|第二層文字/第三層文字", module)
.add("第四層文字", () => (
  // 第一個story 元件在這裡
  <FatVermicelli
    //...
  />
), {
    //... 外掛的相關設定
    notes: 'A very simple example of addon notes',
})
.add("第四層文字", () => (
    //... 還可以再加第二個story

));
```

撰寫要點：

- `storiesOf`第一個參數是 story 列表的名稱。我們可以透過`|`跟`/`顯示層狀的目錄結構，加上 `add` 的第一個參數也是帶入 story 的描述，我們最多可以有四層的列表結構。

- `add` 的第二個參數是元件顯示的地方，我們可以根據元件的情境增加多個 add

- `add` 的第三個參數可以進行外掛的設定。例如 `@storybook/addon-notes`就是在這裡輸入對於這個 story 的註記

## addons 大集結

為了演示這些 addons，阿肥就以 `day6-creational-factory-method.code`的範例程式來改造囉。

### @storybook/addon-knobs

knobs 可以在 story 頁面上更改元件的 prop 值，讓你只要寫一個 story 就可以進行不同 prop 設定的測試。

在 story 的寫法

```typescript
// 針對prop的型別匯入對應的function
import { text, boolean } from "@storybook/addon-knobs";

//...
.add("演示addon-knob", () => (
  <FatVermicelli
    // prop傳入knobs提供的function 參數為(prop名稱, prop預設值)
    storeName={text("storeName", "無名麵線攤")}
    showName={boolean("showName", true)}
  />
))
```

結果畫面如同以下

![knobs](https://i.imgur.com/JC6wj79.gif)

### @storybook/addon-links

links 可以在 story 產生一個連結，點擊後就會跳到指定的 story。這對做前端 UI flow 的 prototype 相當有幫助。

在 story 的寫法

```typescript
//Vermicelli.story.tsx
import { linkTo } from "@storybook/addon-links";
//...

.add("演示addon-links 1", () => (
  <div>
    <button
      //@ts-ignore
      // linkTo(storiesOf名稱, add名稱))
      onClick={linkTo("IChiRanRamen", "演示addon-links 2")}
    >我要改吃拉麵</button>
    <FatVermicelli
      storeName={text("storeName", "無名麵線攤")}
      showName={boolean("showName", true)}
    />
  </div>
))

//Ramen.story.tsx
.add("演示addon-links 2", () => (
  <div>
    <button
      //@ts-ignore
      onClick={linkTo(
        "設計模式範例Demo|建立型模式/工廠方法",
        "演示addon-links 1"
      )}
    >我要改吃麵線</button>
    <IChiRanRamen onSubmit={v => alert(v.listProduct())} />
  </div>
));
```

結果畫面如同以下

![links](https://i.imgur.com/eNcUao8.gif)

### @storybook/addon-notes

notes 可以幫你在畫布旁邊再多一個 notes 的 tab，裡面可以寫對於這個 story 相關的敘述。格式可以為純文字或是 markdown。不過 markdown 似乎格式還沒有完全支援，大家可以斟酌使用。

![notes](https://i.imgur.com/cjdPwe5.png)

官方還有其他實用的 addons，甚至可以整合 Jest 做靜態測試的 addon，有興趣的可以再看參考資料的連結喔。

## 小結

> Sé que solo, sé que ya no soy oy oy oy 我只知道 那個人已經不是我了  
> Mira, Sofia 看啊 蘇菲亞  
> Sin tu mirada, sigo 沒有你的注視 我就繼續自己的人生  
> —《Sofia》

[![Sofia](https://img.youtube.com/vi/qaZ0oAh4evU/0.jpg)](http://www.youtube.com/watch?v=qaZ0oAh4evU "Sofia")

聽起來很歡樂，看歌詞才知道是描述失戀的歌  
就像開發元件，沒看到他真實的樣子，就不知道跟心目中想的差了多少

最後一個重點是 Alvaro Soler 好帥，完全是阿肥我的菜！ ![/images/emoticon/emoticon42.gif](/images/emoticon/emoticon42.gif)

---

### 參考資料

- [Storybook](https://storybook.js.org/)
- [Storybook-addons](https://storybook.js.org/addons/)
