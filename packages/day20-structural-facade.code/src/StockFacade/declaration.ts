export interface IStockData {
    stat: string;
    date: string;
    title: string;
    fields: T_FieldName[];
    data: Array<string[]>;
}

export type T_FieldName = "日期" |
    "成交股數" |
    "成交金額" |
    "開盤價" |
    "最高價" |
    "最低價" |
    "收盤價" |
    "漲跌價差" |
    "成交筆數";

export type T_QueryType = 'min' | 'mix';

export interface IStockInfo {
    date: string;
    stockAmount: number;
    dealAmount: number;
    openPrice: number;
    highest: number;
    lowest: number;
    closePrice: number;
    spread: number;
    turnover: number;
}