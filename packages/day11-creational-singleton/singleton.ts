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
