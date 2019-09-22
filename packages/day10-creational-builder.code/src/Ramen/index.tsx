/// <reference path="declaration.ts" />

import * as React from 'react';
import { RamenBuilder, RamenDirector, DefaultOptions, RamenProduct } from './builder'

import './Ramen.scss';

export interface I_Props_IChiRanRamen {
    onSubmit?: (product: RamenProduct) => void;
}

export const IChiRanRamen: React.FC<I_Props_IChiRanRamen> = ({ onSubmit }) => {

    const [allDefault, setAllDefault] = React.useState<boolean>(false);
    const [options, setOptions] = React.useState<BuilderDeclaration.I_Order_Ramen>(DefaultOptions);
    const [doubleGreenOnion, setDoubleGreenOnion] = React.useState<boolean>(false);
    const [doubleSlicedPork, setDoubleSlicedPork] = React.useState<boolean>(false);
    const [extras, setExtras] = React.useState<string[]>([]);

    const handleSubmitOrder = e => {
        e.preventDefault();

        let product: RamenProduct;
        if (allDefault) {
            const ramenDirector = new RamenDirector();
            ramenDirector.buildDefaultRamen();
            if (extras && extras.length)
                ramenDirector.addExtraDish(extras);
            product = ramenDirector.getProduct();
        } else {
            const ramenBuilder = new RamenBuilder();
            ramenBuilder.setNoodle(options.noodle);
            ramenBuilder.setTaste(options.taste);
            ramenBuilder.setGreenOnion(options.greenOnion);
            ramenBuilder.setSlicedPork(options.slicedPork);
            ramenBuilder.setSpicy(options.spicy);
            if (extras && extras.length)
                ramenBuilder.addExtra(extras);
            if (doubleGreenOnion)
                ramenBuilder.doubleGreenOnion();
            if (doubleSlicedPork)
                ramenBuilder.doubleSlicedPork();
            product = ramenBuilder.getProduct();
        }
        if (onSubmit) onSubmit(product);
    }

    const handleOptionsChange = ({ target }) => {
        setOptions(options => ({
            ...options,
            [target.name]: target.value
        }));
    };

    const handleExtrasChange = ({ target }) => {
        let i = extras.indexOf(target.value);
        let newArr = i > -1 ? extras.slice(i, 1) : [...extras, target.value];
        setExtras(newArr);
    }

    const isChecked = (v: string) => extras.includes(v);

    return <form onSubmit={handleSubmitOrder} id="ramenOrder">
        <div>
            <label htmlFor="allDefault">請給我建議的選項設定</label>
            <input type="checkbox" name="allDefault" checked={allDefault} onChange={e => setAllDefault(!allDefault)} ></input>
        </div>
        <div className={allDefault ? "disable" : "enable"}>
            <label htmlFor="taste">口味濃淡：</label>
            <select
                value={options.taste}
                id="taste"
                name="taste"
                onChange={handleOptionsChange}
            >
                <option value="light">淡味</option>
                <option value="medium">普通(建議)</option>
                <option value="strong">濃味</option>
            </select>
            <div>
                <label htmlFor="greenOnion">蔥：</label>
                <select
                    value={options.greenOnion}
                    id="greenOnion"
                    name="greenOnion"
                    onChange={handleOptionsChange}
                >
                    <option value={1}>有(建議)</option>
                    <option value={0}>無</option>
                </select>
                <label htmlFor="doubleGreenOnion">追加1份</label>
                <input type="checkbox" name="doubleGreenOnion" checked={doubleGreenOnion} onChange={e => setDoubleGreenOnion(!doubleGreenOnion)} ></input>
            </div>
            <div>
                <label htmlFor="slicedPork">叉燒：</label>
                <select
                    value={options.slicedPork}
                    id="slicedPork"
                    name="slicedPork"
                    onChange={handleOptionsChange}
                >
                    <option value={1}>有(建議)</option>
                    <option value={0}>無</option>
                </select>
                <label htmlFor="doubleSlicedPork">追加3片</label>
                <input type="checkbox" name="doubleSlicedPork" checked={doubleSlicedPork} onChange={e => setDoubleSlicedPork(!doubleSlicedPork)} ></input>
            </div>
            <label htmlFor="spicy">赤紅秘製醬汁：</label>
            <input
                type="number"
                value={options.spicy}
                min="0"
                max="2"
                step="0.5"
                name="spicy"
                onChange={handleOptionsChange}
            ></input>
            <label htmlFor="noodle">麵的硬度：</label>
            <select
                value={options.noodle}
                id="noodle"
                name="noodle"
                onChange={handleOptionsChange}
            >
                <option value="firm">硬</option>
                <option value="medium">普通(建議)</option>
                <option value="soft">軟</option>
            </select>
        </div>
        <div>
            <label htmlFor="egg">半熟蛋</label>
            <input type="checkbox" name="egg" value="半熟蛋" checked={isChecked("半熟蛋")} onChange={handleExtrasChange}></input>
            <label htmlFor="rice">白飯</label>
            <input type="checkbox" name="rice" value="白飯" checked={isChecked("白飯")} onChange={handleExtrasChange}></input>
            <label htmlFor="nori">海苔</label>
            <input type="checkbox" name="nori" value="海苔" checked={isChecked("海苔")} onChange={handleExtrasChange}></input>
            <label htmlFor="mochaTofu">抹茶杏仁豆腐</label>
            <input type="checkbox" name="mochaTofu" value="抹茶杏仁豆腐" checked={isChecked("抹茶杏仁豆腐")} onChange={handleExtrasChange}></input>
        </div>
        <input type="submit" value="送出"></input>
    </form>
}