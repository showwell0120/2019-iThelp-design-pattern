# Design-Pattern-Typescript-React

## 從哪裡開始?

這個專案是以 monprepo 的架構管理。每天的文章內文跟程式碼都會在`packages`, package 名稱格式為`day${X}-${類型}-${名稱}`

## 建置指令

### 安裝初始套件

`yarn install`

### storybook

`yarn story`

### jest

`yarn test`

## 套件管理

### 新增套件

`mkdir pkg-name && cd pkg-name && yarn init`

### 在 root 安裝外部套件

`yarn add -DW <npm pkg1> <npm pkg2> ...`

### 在 root 移除外部套件

`yarn remove -W <npm pkg1> <npm pkg2> ...`

### 在 package 加入外部套件作為 peerDependencies

`yarn workspace @monprepo-react-starter/core add -P <npm pkg1> <npm pkg2> ...`

### 在 package 加入內部套件作為 dependencies

`yarn lerna add @monprepo-react-starter/core --scope=@monprepo-react-starter/website`

### 在 package 移除套件

`yarn workspace @monprepo-react-starter/core remove <npm pkg1> <npm pkg2> ...`

## 參考

- [monorepo-babel-ts-lerna-starter](https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter)
- [Workspaces in Yarn](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)
