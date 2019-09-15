# [Day4] 結婚後要一起住才比較省錢 ─ Mono-Repo

嗨 大家好 我是一路爬坡的阿肥   

老家有台用了十年的筆電   
在前陣子進行大清理後，意外發現卡頓的次數少很多
像現在這樣邊寫文章邊開Chrome放音樂還是很順   
果然東西跟人一樣，時間久了就要清掉有的沒的   
才能繼續往前

---

## 兩種管理程式碼的方式
在Git、npm等成為開發流程的主流後，為了能獨立各自的開發環境，我們會為每個專案建立一個repository進行版控和套件管理，這種方式就稱為 **Multi-Repo**。

不過產品線的範圍變大時，專案B、C都是基於專案A的底層程式去做新服務的開發，或甚至專案之間都有一些相依的程式碼時，除非能將這些共用的程式另外做成套件，並且保證每次的更動在多個專案下都能運作，不然通常會很難維護在同一支產品線下的各個專案。

## Monorepo的好壞處
跟Multi-Repo相反，**Mono-Repo**是將相關的產品專案都放在同一個repository。

Mono-Repo的好處主要有：
- Better developer testing - 可以立即知道修改程式碼後，所有相關的專案是否還能正常運作
- Sharing of common components － 只要開發一次元件，就能給所有專案使用
- Effective code reviews - 要在專案之間檢視程式碼時，可以省下切換的時間

不過有幾個問題是：
- 程式碼會日益龐大，目錄結構會日趨複雜。因此在建立初期，最後可以做好規劃，並保有彈性
- 建置測試的時間可能會愈花愈長。所以在開發工具與環境設定時盡量能區分專案各自的範圍，只針對影響的範圍進行測試

## Lerna ft. Yarn Workspaces
簡單來說：

[Lerna](https://github.com/lerna/lerna)是在Javascript專案中，實現Mono-Repo的管理工具，透過設定與指令，協助開發者進行套件與各個子專案的管理。

[Yarn Workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)是套件管理工具```Yarn```發展出來的開發環境設定，可以讓多個子專案聚集為一個工作區(Workspace)，並且在專案的root就為工作區進行套件的管理與更新。所以搭配Lerna的基本設定跟指令大致上會長像這樣：

```javascript
// package.json
"workspaces": [
    "packages/*"
],

//lerna.json
{
  "packages": ["packages/*"],
  "version": "independent",
  "useWorkspaces": true,
  "npmClient": "yarn"
}

// 在 root 安裝外部套件
`yarn add -DW <npm pkg1> <npm pkg2> ...`

// 在 package 加入外部套件作為 peerDependencies

`yarn workspace @project-name/pkg-name add -P <npm pkg1> <npm pkg2> ...`

// 在 package 加入內部套件作為 dependencies

`yarn lerna add @project-name/pkg-name1  --scope=@project-name/pkg-name2`
```

## 跟設計模式有什麼關係？
沒有關係！(被揍)   
不過因為接下來的文章和範例程式檔，會以Monorepo的方式管理，加上在某些性質的產品或專案上，用Monorepo的確是有它的好處在，所以藉由這個機會跟大家介紹，也順手練習一下Monorepo的起手式。

另外有興趣的話可以下載或fork我的[Github專案](https://github.com/showwell0120/Design-Pattern-Typescript-React.git)玩玩看。

## 小結
不知道看完內文後，對於阿肥我下的標題是不是覺得很貼切(自以為)   
明天開始就正式進入本系列的重點囉！

---

### 參考資料   

- [Creating a Monorepo with Lerna & Yarn Workspaces](https://medium.com/hy-vee-engineering/creating-a-monorepo-with-lerna-yarn-workspaces-cf163908965d)
- [monorepo 架構是否可行?](https://blog.kevinyang.net/2018/01/08/angular-monorepo-1/)