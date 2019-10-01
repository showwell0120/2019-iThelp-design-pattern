interface NintendoSwitch {
    displayName(): string;
    getPrice(): number;
}

class MainBox implements NintendoSwitch {
    public displayName(): string {
        return 'Nintendo Switch 主機';
    }

    public getPrice(): number {
        return 7500;
    }
}

class SwitchDecorator implements NintendoSwitch {
    protected mainBox: MainBox;

    constructor(mainBox: MainBox) {
        this.mainBox = mainBox;
    }

    public displayName(): string {
        return this.mainBox.displayName();
    }

    public getPrice(): number {
        return this.mainBox.getPrice();
    }
}

class WithBlueRedHandle extends SwitchDecorator {
    public displayName(): string {
        return `${super.displayName()} / 紅藍手把組`;
    }

    public getPrice(): number {
        return super.getPrice() + 1000;
    }
}

class WithPokemonGame extends SwitchDecorator {
    public displayName(): string {
        return `${super.displayName()} /《精靈寶可夢》超值組合包`;
    }

    public getPrice(): number {
        return super.getPrice() + 1500;
    }
}

function makeSwitchProduct() {
    console.log('================');
    console.log('[先放入switch主機]');
    const mainBox = new MainBox();
    console.log(`產品名稱：${mainBox.displayName()}`);
    console.log(`產品價格：${mainBox.getPrice()}`);
    console.log('----------------');
    const withBlueRedHandle = new WithBlueRedHandle(mainBox);
    console.log('[接著放入手把組]');
    console.log(`產品名稱：${withBlueRedHandle.displayName()}`);
    console.log(`產品價格：${withBlueRedHandle.getPrice()}`);
    console.log('----------------');
    const withPokemonGame = new WithPokemonGame(withBlueRedHandle);
    console.log('[最後放入遊戲片]');
    console.log(`產品名稱：${withPokemonGame.displayName()}`);
    console.log(`產品價格：${withPokemonGame.getPrice()}`);
    console.log('================');
}

makeSwitchProduct();