import * as React from 'react'
import * as Obs from './observer';

import './TyphoonNotifier.scss'

const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];

export function startDesiding(center: Obs.TyphoonNotifyCenter) {
    alert('開始決定各縣市是否放颱風假，請按確定繼續');

    let cityCodeList: string[] = Object.keys(Obs.E_CityCode).map(c => (c));
    let resultList: string[] = Object.keys(Obs.E_Result).map(c => (c));
    resultList = resultList.filter(s => s !== 'not_yet');

    let timer = setInterval(() => {
        if (!cityCodeList.length) {
            clearInterval(timer);
            alert('各縣市已決定完是否放颱風假');
            return;
        }
        let curCity = getRandomItem(cityCodeList);
        let result = getRandomItem(resultList);
        cityCodeList = cityCodeList.filter(c => c !== curCity);
        if (center)
            center.notifyObservers({ cityCode: curCity, result: result });
    }, 2000);
}

const CityCodeWordDict: { [key in Obs.E_CityCode]: string } = {
    'tpe': '北北基',
    'chung': '台中',
    'nan': '台南',
    'ka': '高雄'
}

const ResultWordDict: { [key in Obs.E_Result]: string } = {
    'not_yet': '尚未公布',
    'yes': '明日停班停課',
    'no': '明天照常上班上課'
}

export interface I_Props_TyphoonNotifier {
    notifier: Obs.TyphoonNotifiedClient;
}

export const TyphoonNotifier: React.FC<I_Props_TyphoonNotifier> = ({ notifier }) => {
    const [result, setResult] = React.useState<Obs.E_Result>(Obs.E_Result.not_yet)
    notifier.setUpdateCallback(setResult);

    return <div>
        <ul>
            <li>名稱：{notifier.clientId}</li>
            <li>關注的城市：{CityCodeWordDict[notifier.cityCode]}</li>
            <li className={result}>是否放颱風假：{ResultWordDict[result]}</li>
        </ul>
    </div>
}

export interface I_Props_TyphoonCenter {
    center: Obs.TyphoonNotifyCenter;
}

export const TyphoonCenter: React.FC<I_Props_TyphoonCenter> = ({ center, children }) => {
    React.useEffect(() => {
        startDesiding(center)
    }, []);

    return <div>{children}</div>
}



