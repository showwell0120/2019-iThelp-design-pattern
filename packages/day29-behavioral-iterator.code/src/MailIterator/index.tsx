import * as React from 'react';
import * as It from './iterator';

interface I_Props_CustomerProcessor {
    collection: It.CustomerCollection;
}

const CustomerProcessor: React.FC<I_Props_CustomerProcessor> = ({ collection }) => {
    const [customer, setCustomer] = React.useState<It.I_CustomerData>({ name: '', address: '' });
    const [mailInfoList, setMailInfoList] = React.useState<string[]>([]);
    const [recordList, setRecordList] = React.useState<string[]>([]);

    function addTodayCustomer(e) {
        e.preventDefault();
        if (collection && customer.name && customer.address) collection.addCustomer(customer);
        setCustomer({ name: '', address: '' });
        console.log('TCL: addTodayCustomer -> collection', collection);
    }

    const handleCustomerChange = ({ target }) => {
        setCustomer(fields => ({
            ...fields,
            [target.name]: target.value
        }));
    };

    const outputMailInfo = () => {
        const iterator = collection.getIterator();
        let recordCount: number = 0,
            _mailInfoList = [],
            _recordList = [];
        const makeMailInfo = (c: It.I_CustomerData): string => {
            return `<div style="width:360px;"><p>阿肥國際有限公司 A-Fat International Co. Ltd<br /></p><p style="text-align:center; font-size: 20px;"><br />${c.name} 收</p><p style="text-align:right;">收件人地址:${c.address}</p></div>`;
        };
        const makeRecord = (c: It.I_CustomerData): string => {
            recordCount++;
            let d = new Date();
            let record = `日期:${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} 編號: ${recordCount} 姓名:${c.name}`;
            return record;
        };
        while (iterator.hasNext()) {
            let customer = iterator.next();

            // do work
            _mailInfoList.push(makeMailInfo(customer));
            _recordList.push(makeRecord(customer));
        }

        setMailInfoList(_mailInfoList);
        console.log('TCL: outputMailInfo -> _mailInfoList', _mailInfoList);

        setRecordList(_recordList);
        console.log('TCL: outputMailInfo -> _recordList', _recordList);
    };

    return (
        <div>
            <h3>今日要寄的潛在客戶資料</h3>
            <form onSubmit={e => addTodayCustomer(e)}>
                <label htmlFor="name">姓名：</label>
                <input type="text" name="name" value={customer.name} onChange={e => handleCustomerChange(e)} />
                <label htmlFor="address">地址：</label>
                <input type="text" name="address" value={customer.address} onChange={e => handleCustomerChange(e)} />
                <input type="submit" value="加入"></input>
                <button onClick={() => outputMailInfo()}>產生信封資訊與紀錄</button>
            </form>
            <hr />

            {mailInfoList && mailInfoList.length ? (
                <div>
                    <h3>信封資訊</h3>
                    {mailInfoList.map((mailInfo, i) => (
                        <div>
                            <div key={`mail_${i}`} dangerouslySetInnerHTML={{ __html: mailInfo }}></div>
                            <hr />
                        </div>
                    ))}
                </div>
            ) : null}

            {recordList && mailInfoList.length ? (
                <div>
                    <h3>今日寄信紀錄</h3>
                    {recordList.map((record, i) => (
                        <p key={`record_${i}`}>{record}</p>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export const CustomerApp: React.FC<any> = props => {
    const [collection, setCollection] = React.useState<It.CustomerCollection>(null);

    React.useEffect(() => {
        startIterate();
    }, []);

    async function fakeFetchCustomer(): Promise<It.I_CustomerData[]> {
        let data: It.I_CustomerData[] = [];
        setTimeout(() => {
            data.push({ name: 'John', address: '123 Main St' });
        }, 500);
        return data;
    }
    async function startIterate() {
        let customers = await fakeFetchCustomer();
        setCollection(new It.CustomerCollection(customers));
    }

    return <div>{collection && <CustomerProcessor collection={collection} />}</div>;
};
