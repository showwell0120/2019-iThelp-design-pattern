import { IStockData } from './declaration';

export class StockAPI {
    protected baseURL: string = 'https://www.twse.com.tw/exchangeReport/STOCK_DAY';
    protected stockId: number;
    constructor(stockId: number) {
        this.stockId = stockId;
    }
    public async getStockData(): Promise<IStockData> {
        let url = new URL(this.baseURL),
            params = { response: 'json', stockNo: this.stockId };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        try {
            const resp = await fetch(url.href);
            console.log('TCL: StockAPI -> resp', resp);
            let theJson: IStockData = fakeJson;
            theJson = await resp.json();
            console.log('TCL: StockAPI -> theJson', theJson);
            return theJson;
        } catch (error) {
            console.log('TCL: StockAPI -> error', error);
            return fakeJson;
        }
    }
}

const fakeJson: IStockData = {
    stat: 'OK',
    date: '20190927',
    title: '108年09月 2330 台積電 各日成交資訊',
    fields: ['日期', '成交股數', '成交金額', '開盤價', '最高價', '最低價', '收盤價', '漲跌價差', '成交筆數'],
    data: [
        ['108/09/02', '14,776,854', '3,800,453,292', '258.00', '258.00', '256.00', '257.50', '-1.50', '7,608'],
        ['108/09/03', '26,086,495', '6,642,868,555', '256.50', '258.00', '253.00', '254.00', '-3.50', '11,210'],
        ['108/09/04', '23,697,733', '6,081,456,520', '254.00', '258.00', '254.00', '257.50', '+3.50', '9,291'],
        ['108/09/05', '49,041,728', '12,869,665,251', '263.00', '263.00', '260.50', '263.00', '+5.50', '22,796'],
        ['108/09/06', '26,609,515', '7,016,868,801', '265.00', '265.00', '263.00', '263.50', '+0.50', '11,957'],
        ['108/09/09', '17,317,833', '4,585,545,966', '265.50', '266.00', '263.50', '265.00', '+1.50', '8,762'],
        ['108/09/10', '30,019,866', '7,862,297,242', '263.50', '264.00', '260.50', '261.50', '-3.50', '11,831'],
        ['108/09/11', '36,266,015', '9,508,884,445', '264.00', '264.50', '260.50', '263.00', '+1.50', '12,058'],
        ['108/09/12', '38,792,293', '10,198,483,555', '265.00', '265.00', '261.50', '262.50', '-0.50', '8,282'],
        ['108/09/16', '38,913,966', '10,258,240,252', '262.00', '265.50', '261.50', '265.50', '+3.00', '11,120'],
        ['108/09/17', '30,069,844', '7,979,032,930', '266.50', '266.50', '264.50', '265.00', '-0.50', '9,222'],
        ['108/09/18', '51,360,759', '13,754,334,364', '267.00', '269.50', '266.50', '267.00', '+2.00', '17,993'],
        ['108/09/19', '27,165,567', '7,216,457,755', '268.00', '268.00', '264.00', '265.00', 'X0.00', '10,194'],
        ['108/09/20', '44,555,865', '11,785,924,559', '266.00', '266.50', '264.00', '264.00', '-1.00', '9,109'],
        ['108/09/23', '14,220,208', '3,749,146,092', '264.00', '264.00', '263.00', '264.00', ' 0.00', '5,647'],
        ['108/09/24', '24,304,943', '6,419,420,695', '263.50', '265.50', '262.00', '265.00', '+1.00', '9,180'],
        ['108/09/25', '23,244,163', '6,144,037,875', '262.50', '266.00', '262.00', '266.00', '+1.00', '7,145'],
        ['108/09/26', '34,128,103', '9,139,219,995', '269.00', '269.50', '266.50', '268.00', '+2.00', '11,861'],
        ['108/09/27', '44,242,817', '12,021,629,536', '271.50', '272.50', '271.00', '272.00', '+4.00', '16,626']
    ]
};