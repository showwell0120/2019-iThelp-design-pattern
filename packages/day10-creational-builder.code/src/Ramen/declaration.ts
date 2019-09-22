namespace BuilderDeclaration {
    export type T_Taste = 'light' | 'medium' | 'strong';
    export type T_Richness = 'light' | 'medium' | 'rich';
    export type T_Garlic = 'none' | 'medium' | 'clove';
    export type T_Noodle = 'firm' | 'medium' | 'soft';
    export interface I_LamenBuilder {
        addExtra(a: string[]): LamenProduct;
        doubleSlicedPork(): LamenProduct;
        produceStandard(o: I_Order_Lamen): LamenProduct;

    }

    export interface I_Product_Ramen {
        taste: string;
        richness: string;
        garlic: string;
        noodle: string;
        greenOnion: string;
        slicedPork: string;
        spicy: number;
        extra?: string;
    }

    export interface I_Order_Lamen {
        taste?: T_Taste;
        richness?: T_Richness;
        garlic?: T_Garlic;
        noodle?: T_Noodle;
        greenOnion?: boolean;
        slicedPork?: boolean;
        spicy?: number;
        extra?: string;
    }

    export class LamenProduct {
        public parts: I_Product_Ramen = null;

        public listProduct(): string {
            return `
                口味濃淡：${this.parts.taste}
                油濃郁度：${this.parts.richness}
                蒜泥：${this.parts.garlic}
                蔥：${this.parts.greenOnion}
                叉燒：${this.parts.slicedPork}
                赤紅秘製醬汁：${this.parts.spicy}
                麵的硬度：${this.parts.noodle}
                加點：${this.parts.extra}
            `
        }
    }
}



