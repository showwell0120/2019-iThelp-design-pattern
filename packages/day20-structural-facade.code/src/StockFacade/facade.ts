import { StockAPI } from './StockAPI';
import { StockProcessor } from './StockProcessor';
import { IStockInfo, T_FieldName, T_QueryType } from './declaration'

export { IStockInfo, T_FieldName, T_QueryType };

interface I_StockFacade {
    stockId?: number;
    stockAPI?: StockAPI;
    stockProcessor?: StockProcessor;
}

export class StockFacade {
    protected stockAPI: StockAPI;
    protected stockProcessor: StockProcessor;

    constructor(param: I_StockFacade) {
        if (param.stockId) {
            this.stockAPI = new StockAPI(param.stockId);
            this.stockProcessor = new StockProcessor();
        } else {
            this.stockAPI = param.stockAPI;
            this.stockProcessor = param.stockProcessor;
        }
    }

    public async getData(fieldName: T_FieldName, type: T_QueryType) {
        let result: IStockInfo[] = [];
        let reqResult = await this.stockAPI.getStockData();
        this.stockProcessor.setReqResult(reqResult);
        result = this.stockProcessor.queryData(fieldName, type);
        return result;
    }
}