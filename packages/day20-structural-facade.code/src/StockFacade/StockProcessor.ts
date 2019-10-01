import { IStockData, T_FieldName, T_QueryType, IStockInfo } from './declaration';

export class StockProcessor {
    protected reqResult: IStockData;

    public setReqResult(reqResult: IStockData) {
        this.reqResult = { ...reqResult };
    }

    public checkStat() {
        return this.reqResult.stat === 'OK';
    }

    private getFieldIndex(fieldName: T_FieldName): number {
        return this.reqResult.fields.indexOf(fieldName);
    }

    private getNumber(str: string): number {
        let valueStr = str.split(',').join('');
        let valueNum = parseFloat(valueStr);
        return valueNum;
    }

    private getValueList(index: number): number[] {
        let list: number[] = [];
        const me = this;
        if (index >= 0) {
            list = this.reqResult.data.map(d => me.getNumber(d[index]));
        }
        return list;
    }

    private getExtrmeValueIndex(list: number[], type: T_QueryType): number[] {
        let targetValue = type === 'min' ? Math.min(...list) : Math.max(...list);
        let resultList: number[] = [];
        list.map((d, i) => {
            if (d === targetValue) resultList.push(i);
        });
        return resultList;
    }

    private getResultDataList(indexList: number[]): Array<IStockInfo> {
        const me = this;
        return this.reqResult.data.filter((d, i) => indexList.indexOf(i) >= 0).map(d => {
            let _d: IStockInfo = {
                date: d[0],
                stockAmount: me.getNumber(d[1]),
                dealAmount: me.getNumber(d[2]),
                openPrice: me.getNumber(d[3]),
                highest: me.getNumber(d[4]),
                lowest: me.getNumber(d[5]),
                closePrice: me.getNumber(d[6]),
                spread: me.getNumber(d[7]),
                turnover: me.getNumber(d[8]),
            }
            return _d;
        })
    }

    public queryData(fieldName: T_FieldName, queryType: T_QueryType) {
        let fieldIndex = this.getFieldIndex(fieldName);
        let valueList: number[] = this.getValueList(fieldIndex);
        let targetIndexList: number[] = this.getExtrmeValueIndex(valueList, queryType);
        let resultList = this.getResultDataList(targetIndexList);
        return resultList ? resultList : [];
    }
}