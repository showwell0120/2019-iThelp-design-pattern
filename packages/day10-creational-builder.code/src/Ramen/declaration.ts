namespace BuilderDeclaration {
    export type T_Taste = 'light' | 'medium' | 'strong';
    export type T_Noodle = 'firm' | 'medium' | 'soft';
    export interface I_RamenBuilder {
        addExtra(a: string[]): void;
        doubleSlicedPork(): void;
        doubleGreenOnion(): void;
        produceStandard(o: I_Order_Ramen): void;

    }

    export interface I_Product_Ramen {
        taste: string;
        noodle: string;
        greenOnion: string;
        slicedPork: string;
        spicy: number;
        extra?: string;
    }

    export interface I_Order_Ramen {
        taste?: T_Taste;
        noodle?: T_Noodle;
        greenOnion?: number;
        slicedPork?: number;
        spicy?: number;
        extra?: string;
    }
}



