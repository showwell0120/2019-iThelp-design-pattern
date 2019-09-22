/// <reference path="declaration.ts" />

export const DefaultOptions: BuilderDeclaration.I_Order_Ramen = {
    taste: 'medium',
    noodle: 'medium',
    greenOnion: 1,
    slicedPork: 1,
    spicy: 0.5
}

export class RamenProduct {
    public parts: BuilderDeclaration.I_Product_Ramen = {
        taste: '',
        greenOnion: '',
        slicedPork: '',
        spicy: 0,
        noodle: '',
        extra: ''
    };

    public listProduct(): string {
        return `
            口味濃淡：${this.parts.taste}
            蔥：${this.parts.greenOnion}
            叉燒：${this.parts.slicedPork}
            赤紅秘製醬汁：${this.parts.spicy}
            麵的硬度：${this.parts.noodle}
            加點：${this.parts.extra}
        `
    }
}

export class RamenBuilder implements BuilderDeclaration.I_RamenBuilder {
    private product: RamenProduct;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.product = new RamenProduct();
    }

    public setGreenOnion(g: number = 1): void {
        this.product.parts.greenOnion = g === 1 ? '有' : '無';
    }

    public setSlicedPork(s: number = 1): void {
        this.product.parts.slicedPork = s === 1 ? '有' : '無';
    }

    public setNoodle(n: BuilderDeclaration.T_Noodle = 'medium'): void {
        switch (n) {
            case 'firm':
                this.product.parts.noodle = '硬';
                break;
            case 'medium':
                this.product.parts.noodle = '普通';
                break;
            case 'soft':
                this.product.parts.noodle = '軟';
                break;
        }
    }

    public setTaste(t: BuilderDeclaration.T_Taste = 'medium'): void {
        switch (t) {
            case 'light':
                this.product.parts.taste = '淡味';
                break;
            case 'medium':
                this.product.parts.taste = '普通';
                break;
            case 'strong':
                this.product.parts.taste = '濃味';
                break;
        }
    }

    public setSpicy(s: number = 0.5): void {
        this.product.parts.spicy = s;
    }

    public addExtra(a: string[] = []): void {
        this.product.parts.extra = a && a.length ? a.join(',') : '';
    }

    public doubleSlicedPork(): void {
        if (this.product.parts.slicedPork === '無') return;
        this.product.parts.slicedPork += ', 追加3片';
    }

    public doubleGreenOnion(): void {
        if (this.product.parts.greenOnion === '無') return;
        this.product.parts.greenOnion += ', 追加1份';
    }

    public produceStandard(o: BuilderDeclaration.I_Order_Ramen = {}): void {
        this.setNoodle(o.noodle);
        this.setTaste(o.taste);
        this.setGreenOnion(o.greenOnion);
        this.setSlicedPork(o.slicedPork);
        this.setSpicy(o.spicy);
    }

    public getProduct(): RamenProduct {
        const result = this.product;
        this.reset();
        return result;
    }
}

export class RamenDirector {
    private builder: RamenBuilder;

    constructor() {
        this.builder = new RamenBuilder();
    }

    public setBuilder(builder: RamenBuilder): void {
        this.builder = builder;
    }

    public buildDefaultRamen(): void {
        this.builder.produceStandard(DefaultOptions);
    }

    public addExtraDish(a: string[] = []): void {
        this.builder.addExtra(a);
    }

    public getProduct(): RamenProduct {
        return this.builder.getProduct();
    }
}