/// <reference path="declaration.ts" />

abstract class Target implements AdapterDeclaration.I_Target {
    public getMood(voice: string): string {
        return null;
    }

    public getAction(action: string): string {
        return null;
    }
}

export const VoiceMoodMapping: { [key in AdapterDeclaration.T_Mood]: string[] } = {
    good: ['呼嚕嚕~'],
    angry: ['嗚~嗚~', '哈~~!', '咪~噢!', '咪~啊!'],
    sad: ['咪~'],
    happy: ['喵~嗚', '喵~噢']
};

export const ActionNeedMapping: { [key in AdapterDeclaration.T_Action]: string[] } = {
    confident: ['垂直式搖', '雨刷式搖'],
    help: ['夾在雙腿間'],
    attack: ['炸毛', '小山狀搖', '鐘擺式瘋狂搖']
};

export class MeowAdapter extends Target {
    private meowAdaptee: MeowAdaptee;

    constructor(adaptee: MeowAdaptee) {
        super();
        this.meowAdaptee = adaptee;
    }

    private getValue<T>(mapping, target): T {
        let v = null;
        Object.keys(mapping).forEach(key => {
            if (mapping[key].includes(target)) {
                v = key;
                return false;
            }
        });
        return v;
    }

    public getMood(voice: any): string {
        const result = this.meowAdaptee.meowMeow(voice);
        let translatedResult = this.getValue<AdapterDeclaration.T_Mood>(VoiceMoodMapping, result);
        switch (translatedResult) {
            case 'good':
                return '表示開心 — 本喵想繼續被恩寵🤗';
            case 'angry':
                return '表示生氣 — 本喵氣氣氣氣氣！😡';
            case 'sad':
                return '表示難過 — 本喵知道做錯事惹😢';
            case 'happy':
                return '表示快樂 — 本喵龍心大悅😁';
            default:
                return '???';
        }
    }

    public getAction(action: string): string {
        const result = this.meowAdaptee.shakeTail(action);
        let translatedResult = this.getValue<AdapterDeclaration.T_Action>(ActionNeedMapping, result);

        switch (translatedResult) {
            case 'confident':
                return '表示有自信 — 一切都在本喵的掌握之中😏';
            case 'help':
                return '表示需要幫助 — 本喵遇到麻煩了，奴才快來😰';
            case 'attack':
                return '表示受到威脅，準備攻擊 — 本喵殺無赦！👿';
            default:
                return '???';
        }
    }
}

export class MeowAdaptee implements AdapterDeclaration.I_MeowAdaptee {
    constructor() {}
    meowMeow(voice: any): string {
        return voice.toString();
    }
    shakeTail(action: any): string {
        return action.toString();
    }
}
