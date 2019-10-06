export interface I_Observer {
    cityCode: E_CityCode;
    clientId: string;
    update: (result: E_Result) => void;
}

export interface I_Observerable {
    addObserver: (observer: I_Observer) => void;
    removeObserver: (observer: I_Observer) => void;
    notifyObservers: (o: I_NotifyData) => void;
}

export enum E_Result { 'not_yet' = 'not_yet', 'yes' = 'yes', 'no' = 'no' }
export enum E_CityCode { 'tpe' = 'tpe', 'chung' = 'chung', 'nan' = 'nan', 'ka' = 'ka' }

export interface I_NotifyData {
    cityCode: E_CityCode;
    result: E_Result;
}