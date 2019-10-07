import * as React from 'react';
import * as Stg from './strategy';

export const FightStrategy: React.FC<any> = props => {
    let strategyCenter = new Stg.StrategyCenter();
    const [monsterLevel, setMonsterLevel] = React.useState<number>(null);
    const [strategyResult, setStrategyResult] = React.useState<Stg.I_StrategyResult>(null)

    React.useEffect(() => {
        if (monsterLevel && monsterLevel > 0) {
            strategyCenter.setStrategy(monsterLevel);
            let result = strategyCenter.outputStrategy();
            if (result) setStrategyResult(result);
        }
    }, [monsterLevel]);

    return <div>
        <div>
            <button onClick={e => setMonsterLevel(1)}>會飛的高麗菜</button>
            <button onClick={e => setMonsterLevel(2)}>巨型蟾蜍</button>
            <button onClick={e => setMonsterLevel(3)}>魔王軍幹部</button>
        </div>
        <div>
            <h3>佐藤和肥的作戰策略</h3>
            {strategyResult && <div><h4>{strategyResult.weapon}</h4><h4>{strategyResult.partnerSkill}</h4></div>}
        </div>
    </div>
}