# [Day26] 為厲害的怪獻上會心一擊 ─ 策略(Strategy) <模式篇>

嗨 大家好 我是一路爬坡的阿肥   


---

## 情境描述

佐藤和肥是在異世界奮鬥多年的冒險者。雖然他的同伴們都不給力，還會扯後腿。但是憑著自己的努力和摸索，慢慢的等級愈升愈高，會的技能也愈來愈多了。現在他不僅可以發動不少技能，必要時候也會使用同伴的力量，一起打倒敵人。

不過因為愈強的技能，等待下次可以發動的時間也就愈長; 同時還要掌握同伴們的實力。所以和肥整理了一下作戰策略：

- 遇到會飛高麗菜：武器 啾啾丸第一型＋Dark尼斯的 肉盾戰術
- 遇到巨型蟾蜍：武器 啾啾丸第二型＋啊！嗑啞的 淨化魔法
- 遇到魔王軍幹部：武器 啾啾丸第三型＋會會的 explosion!!

對於和肥來說，只要關注現在的敵人是誰，然後發動對應的技能; 並不需要知道同伴跟武器如何實現技能。我們可以說，想在異世界生存下來，熟悉 **策略模式(Strategy Pattern)** 的運用，就是個不可或缺的實力。

## 策略模式 (Strategy Pattern)
先看guru上的解釋：
> Strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.   
(策略模式是行為型的模式，讓你可以為每個項目產生各自的類別，並且定義一系列的演算法。最後可以讓他們的物件可以交互使用。)

## 

## 

## 小結
已經熟悉策略模式的和肥，接下來不管遇到什麼樣的敵人，只要經過策略模式的演算，使出完美技能，相信可以在異世界闖出一片天地的！
 
> 今日もまた　バカにされたよ 今天又被當作笨蛋了         
> 恥ずかしいし　悔しいけれど 好丟臉　又好不甘心       
> へっちゃらさ　覚えておけよ 沒關係啦　 通通給我記住了   
> 今に笑い返してやる 趁現在笑吧　我一定會奉還的             
> 《この素晴らしい世界に祝福を！ED ちいさな冒険者》

[![ちいさな冒険者](https://img.youtube.com/vi/Pjl_Vud-Jmg/0.jpg)](http://www.youtube.com/watch?v=Pjl_Vud-Jmg 'ちいさな冒険者')

今天的程式實作會在 [github](https://github.com/showwell0120/Design-Pattern-Typescript-React) 的 `packages/src/day27-behavioral.stretegy.code`

明天會介紹怎麼用 Typescript 加上 React 實作流程，對於模式的應用跟程式會再更詳細的說明喔！

---

### 參考資料   

- [guru - Stretegy](https://refactoring.guru/design-patterns/stretegy)
- [策略模式 Strategy Pattern](https://skyyen999.gitbooks.io/-study-design-pattern-in-java/content/strategy.html)