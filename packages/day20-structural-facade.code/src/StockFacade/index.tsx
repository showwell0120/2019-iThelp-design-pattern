import * as React from 'react';
import { StockFacade, IStockInfo, T_FieldName, T_QueryType } from './facade';

export interface I_Props_QueryStock { }

export const QueryStock: React.FC<I_Props_QueryStock> = props => {
    const [options, setOptions] = React.useState<{ fieldName: T_FieldName; queryType: T_QueryType, stockId: number }>({ fieldName: null, queryType: null, stockId: null });
    const [data, setData] = React.useState<IStockInfo[]>([]);

    const handleChange = ({ target }) => {
        setOptions(options => ({
            ...options,
            [target.name]: target.value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (!options.fieldName || !options.queryType || !options.stockId) {
            alert("請輸入完整選項");
            return false;
        }
        let stockFacade = new StockFacade({ stockId: options.stockId });
        let data: IStockInfo[] = await stockFacade.getData(options.fieldName, options.queryType);
        if (data) setData(data);

    };

    return (
        <div>
            <h1>當月股勢查詢</h1>
            <form onSubmit={handleSubmit} id="meowBehavior">
                <div>
                    <label htmlFor="stockId">台股代碼：</label>
                    <input
                        type="number"
                        value={options.stockId}
                        name="stockId"
                        onChange={handleChange}
                    ></input>
                    <label htmlFor="fieldName">查詢欄位：</label>
                    <select value={options.fieldName} id="fieldName" name="fieldName" onChange={handleChange}>
                        <option />
                        <option value="成交股數">成交股數</option>
                        <option value="成交金額">成交金額</option>
                        <option value="開盤價">開盤價</option>
                        <option value="最高價">最高價</option>
                        <option value="最低價">最低價</option>
                        <option value="收盤價">收盤價</option>
                        <option value="漲跌價差">漲跌價差</option>
                        <option value="成交筆數">成交筆數</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="queryType">找出：</label>
                    <select value={options.queryType} id="queryType" name="queryType" onChange={handleChange}>
                        <option />
                        <option value="max">最大值</option>
                        <option value="min">最小值</option>
                    </select>
                </div>
                <input type="submit" value="送出"></input>
            </form>
            <div>
                <h2>查詢結果</h2>
                {data && data.length && data.map((d, i) => {
                    return <div key={`data_${i}`}>
                        <ul>
                            <li>日期：{d.date}</li>
                            <li>成交金額：{d.dealAmount}</li>
                            <li>成交股數：{d.stockAmount}</li>
                            <li>開盤價：{d.openPrice}</li>
                            <li>最高價：{d.highest}</li>
                            <li>最低價：{d.lowest}</li>
                            <li>收盤價：{d.closePrice}</li>
                            <li>漲跌價差：{d.spread}</li>
                            <li>成交筆數：{d.turnover}</li>
                        </ul>
                        <hr />
                    </div>
                })}
            </div>
        </div>
    );
};
