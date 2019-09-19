namespace Declaration {
    // 麵線顏色的種類
    export type T_Color = "white" | "red";

    // 麵線的口味種類，目前有大腸跟蚵仔兩種選項
    export type T_Flavor = "intestine" | "oyster";

    // 客人的菜單內容
    export interface I_Order {
        flavor: T_Flavor;
        color: T_Color;
        spoons: number;
    }

    // 最後給客人的麵線組成
    export interface I_Vermicelli extends I_Order {
        trayed: boolean;
        content: string[];
    }
}

