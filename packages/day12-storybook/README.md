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

阿肥為了前面介紹的三種模式寫了三個 story，阿肥就以 `day6-creational-factory-method.code`的範例程式來說明。

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
})
.add("第四層文字", () => (
    //... 還可以再加第二個story
));
```

## addons 大集結

## 小結

---

### 參考資料

- [Storybook](https://storybook.js.org/)
- [Storybook-addons](https://storybook.js.org/addons/)
