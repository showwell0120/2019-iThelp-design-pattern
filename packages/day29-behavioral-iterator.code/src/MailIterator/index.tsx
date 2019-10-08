import * as React from 'react';
import * as It from './iterator';

let collection: It.CustomerCollection = null;
async function fakeFetchCustomer(): Promise<It.I_CustomerData[]> {
    let data: It.I_CustomerData[] = [];
    setTimeout(() => {
        data.push({ name: 'John', address: '123 Main St' });
    }, 500);
    return data;
}
async function startIterate() {
    let customers = await fakeFetchCustomer();
    collection = new It.CustomerCollection(customers);
}

export const CustomerProcessor: React.FC<any> = props => {
    const [customer, setCustomer] = React.useState<It.I_CustomerData>({ name: '', address: '' });

    function addTodayCustomer() {}

    const handleCustomerChange = ({ target }) => {
        setCustomer(fields => ({
            ...fields,
            [target.name]: target.value
        }));
    };

    return (
        <div>
            <h3>今日要寄的潛在客戶資料</h3>
            <form onSubmit={addTodayCustomer}>
                <label htmlFor="name">姓名：</label>
                <input type="text" name="name" value={customer.name} onChange={handleCustomerChange} />
                <label htmlFor="address">地址：</label>
                <input type="text" name="address" value={customer.address} onChange={handleCustomerChange} />
                <input type="submit" value="加入"></input>
            </form>
            <hr />
        </div>
    );
};
