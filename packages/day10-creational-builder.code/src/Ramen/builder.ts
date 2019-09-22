/// <reference path="declaration.ts" />

export class LamenBuilder implements BuilderDeclaration.I_LamenBuilder {
    private product: BuilderDeclaration.LamenProduct;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.product = new BuilderDeclaration.LamenProduct();
    }

    private setSpicy(s: number = 0.5): void {
        this.product.parts.spicy = s;
    }

    private setGreenOnion(g: boolean = true): void {
        this.product.parts.garlic = g ? '有' : '無';
    }

    private setSlicedPork(s: boolean = true): void {
        this.product.parts.slicedPork = s ? '有' : '無';
    }

    private setNoodle(n: BuilderDeclaration.T_Noodle = 'medium'): void {
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

    private setTaste(t: BuilderDeclaration.T_Taste = 'medium'): void {
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

    private setRichness(r: BuilderDeclaration.T_Richness = 'medium'): void {
        switch (r) {
            case 'light':
                this.product.parts.taste = '清淡';
                break;
            case 'medium':
                this.product.parts.taste = '普通';
                break;
            case 'rich':
                this.product.parts.taste = '濃郁';
                break;
        }
    }

    private setGarlic(g: BuilderDeclaration.T_Garlic = 'medium'): void {
        switch (g) {
            case 'none':
                this.product.parts.taste = '無';
                break;
            case 'medium':
                this.product.parts.taste = '普通';
                break;
            case 'clove':
                this.product.parts.taste = '一份';
                break;
        }
    }

    public addExtra(a: string[] = []): BuilderDeclaration.LamenProduct {
        this.product.parts.extra = a && a.length ? a.join(',') : '';
        return this.product;
    }

    public doubleSlicedPork(): BuilderDeclaration.LamenProduct {
        if (!this.product.parts.slicedPork) return;
        this.product.parts.slicedPork += ', 追加3片';
        return this.product;
    }

    public produceStandard(o: BuilderDeclaration.I_Order_Lamen = {}): BuilderDeclaration.LamenProduct {
        this.setNoodle(o.noodle);
        this.setTaste(o.taste);
        this.setGreenOnion(o.greenOnion);
        this.setRichness(o.richness);
        this.setSlicedPork(o.slicedPork);
        this.setSpicy(o.spicy);
        this.setGarlic(o.garlic);

        return this.product;
    }

    public getProduct(): BuilderDeclaration.LamenProduct {
        const result = this.product;
        this.reset();
        return result;
    }
}

export class LamenDirector {
    private builder: LamenBuilder;

    public setBuilder(builder: LamenBuilder): void {
        this.builder = builder;
    }

    public buildDefaultLamen(): BuilderDeclaration.LamenProduct {
        let o: BuilderDeclaration.I_Order_Lamen = {
            taste: 'medium',
            richness: 'medium',
            garlic: 'medium',
            noodle: 'medium',
            greenOnion: true,
            slicedPork: true,
            spicy: 0.5
        }
        return this.builder.produceStandard(o);
    }
}