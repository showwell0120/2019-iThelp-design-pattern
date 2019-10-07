export enum E_ChuchuMaru { One = '壹之型', Two = '貳之型', Three = '參之型' };
export enum E_Partner { Akeia = '啊！嗑啞', Darknis = 'Dark尼斯', Hui = '會會' };

export interface I_StrategyResult {
    weapon: string;
    partnerSkill: string;
}

abstract class FightStrategy {
    public setWeapon(e: E_ChuchuMaru): string {
        return `武器使用：啾啾丸 ${e}`;
    }
    public excute(): any { }
}

class Partner {
    protected partnerName: E_Partner;

    constructor(partnerName: E_Partner) {
        this.partnerName = partnerName;
    }

    public setSkill(skill: string, count: number): string {
        return `${this.partnerName} 發動 ${skill} X ${count} 次`;
    }
}

export class Lavel1FightStrategy extends FightStrategy {
    public excute(): I_StrategyResult {
        let partner = new Partner(E_Partner.Darknis);
        return {
            weapon: this.setWeapon(E_ChuchuMaru.One),
            partnerSkill: partner.setSkill('肉盾戰術', 3)
        }
    }
}

export class Lavel2FightStrategy extends FightStrategy {
    public excute(): I_StrategyResult {
        let partner = new Partner(E_Partner.Akeia);
        return {
            weapon: this.setWeapon(E_ChuchuMaru.Two),
            partnerSkill: partner.setSkill('淨化魔法', 1)
        }
    }
}

export class Lavel3FightStrategy extends FightStrategy {
    public excute(): I_StrategyResult {
        let partner = new Partner(E_Partner.Hui);
        return {
            weapon: this.setWeapon(E_ChuchuMaru.Three),
            partnerSkill: partner.setSkill('explosion!!', 10)
        }
    }
}

export class StrategyCenter {
    protected strategy: FightStrategy;

    constructor(strategy?: FightStrategy) {
        if (strategy) this.strategy = strategy;
    }

    public setStrategy(monsterLevel: number) {
        switch (monsterLevel) {
            case 1:
                this.strategy = new Lavel1FightStrategy();
                break;
            case 2:
                this.strategy = new Lavel2FightStrategy();
                break;
            case 3:
                this.strategy = new Lavel3FightStrategy();
                break;
            default:
                break;
        }
    }

    public outputStrategy(): I_StrategyResult {
        return this.strategy.excute();
    }
}