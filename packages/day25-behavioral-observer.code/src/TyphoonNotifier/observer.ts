import { I_Observer, I_Observerable, I_NotifyData, E_Result, E_CityCode } from './declaration';

export { I_Observer, I_Observerable, I_NotifyData, E_Result, E_CityCode };

export class TyphoonNotifyCenter implements I_Observerable {
    protected observerList: { [key in E_CityCode]: I_Observer[] } = {
        tpe: [],
        chung: [],
        nan: [],
        ka: [],
    };

    private getTargetList(code: E_CityCode): I_Observer[] {
        return this.observerList[code];
    }

    private findObserverIndex(targetList: I_Observer[], observerId: string) {
        return targetList.findIndex(o => o.clientId === observerId);
    }

    public addObserver(o: I_Observer): void {
        let targetList = this.getTargetList(o.cityCode);
        if (this.findObserverIndex(targetList, o.clientId) < 0) {
            targetList.push(o);
        }
    }

    public removeObserver(o: I_Observer): void {
        let targetList = this.getTargetList(o.cityCode);
        let i = this.findObserverIndex(targetList, o.clientId)
        if (i > -1) {
            targetList.splice(i, 1);
        }
    }

    public notifyObservers(o: I_NotifyData): void {
        let targetList = this.getTargetList(o.cityCode);
        if (targetList.length) {
            targetList.forEach(obs => obs.update(o.result));
        }
    }
}

export class TyphoonNotifiedClient implements I_Observer {
    public cityCode: E_CityCode;
    public clientId: string;
    public updateCallback: (result: E_Result) => void;

    constructor(clientId: string, cityCode: E_CityCode) {
        this.cityCode = cityCode;
        this.clientId = clientId;
    }

    public setUpdateCallback(callback): void {
        this.updateCallback = callback;
    }

    public update(result: E_Result): void {
        if (this.updateCallback) this.updateCallback(result);
    }
}