namespace AdapterDeclaration {
    export type T_Mood = 'good' | 'angry' | 'sad' | 'happy';
    export type T_Action = 'confident' | 'help' | 'attack';

    export interface I_Target {
        getMood: (voice: string) => string;
        getAction: (action: string) => string;
    }

    export interface I_MeowAdaptee {
        meowMeow: (voice: any) => string;
        shakeTail: (action: any) => string;
    }
}
