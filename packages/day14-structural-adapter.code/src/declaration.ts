namespace AdapterDeclaration {
    export type T_Mood = 'good' | 'angry' | 'sad' | 'happy';
    export type T_Action = 'tender' | 'help' | 'attack';
    export interface I_Target {
        getMood: (voice: string) => T_Mood;
        getAction: (action: string) => T_Action;
    }
    export interface I_MeowAdaptee {}
}

class MeowAdaptee implements AdapterDeclaration.I_MeowAdaptee {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    meowMeow(voice: string): string {
        return voice;
    }
    shakeTail(action: string): string {
        return action;
    }
}

abstract class Target implements AdapterDeclaration.I_Target {
    public getMood(voice: string): AdapterDeclaration.T_Mood {
        return null;
    }

    public getAction(action: string): AdapterDeclaration.T_Action {
        return null;
    }
}

class MeowAdapter extends Target {
    private meowAdaptee: MeowAdaptee;

    constructor(adaptee: MeowAdaptee) {
        super();
        this.meowAdaptee = adaptee;
    }

    public getMood(voice: string): AdapterDeclaration.T_Mood {
        const result = this.meowAdaptee.meowMeow(voice);
        return 'good';
    }

    public getAction(action: string): AdapterDeclaration.T_Action {
        const result = this.meowAdaptee.shakeTail(action);
        return 'attack';
    }
}
