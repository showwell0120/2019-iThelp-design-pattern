export interface I_CustomerData {
    name: string;
    address: string;
}

export interface I_Iterator<T> {
    current(): any;
    next(): T;
    key(): number;
    hasNext(): boolean;
    rewind(): void;
}

export interface I_Aggregator {
    getIterator(): I_Iterator<I_CustomerData>;
}

export class CustomerIterator implements I_Iterator<I_CustomerData> {
    private collection: CustomerCollection;
    private position: number = 0;
    private reverse: boolean = false;

    constructor(collection: CustomerCollection, reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;

        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }

    public rewind() {
        this.position = this.reverse ? this.collection.getCount() - 1 : 0;
    }

    public current(): any {
        return this.collection.getCustomers()[this.position];
    }

    public key(): number {
        return this.position;
    }

    public next(): any {
        const customer = this.collection.getCustomers()[this.position];
        this.position += this.reverse ? -1 : 1;
        return customer;
    }

    public hasNext(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }
}

export class CustomerCollection implements I_Aggregator {
    private customers: I_CustomerData[] = [];

    constructor(customers: I_CustomerData[] = []) {
        this.customers = customers;
    }

    public getCustomers(): I_CustomerData[] {
        return this.customers;
    }

    public getCount(): number {
        return this.customers.length;
    }

    public addCustomer(customer: I_CustomerData): void {
        this.customers.push(customer);
    }

    public getIterator(): I_Iterator<I_CustomerData> {
        return new CustomerIterator(this);
    }

    public getReverseIterator(): I_Iterator<I_CustomerData> {
        return new CustomerIterator(this, true);
    }
}

//client

let collection: CustomerCollection;
async function fakeFetchCustomer(): Promise<I_CustomerData[]> {
    let data: I_CustomerData[] = [];
    setTimeout(() => {
        data.push({ name: 'John', address: '123 Main St' });
    }, 500);
    return data;
}
async function startIterate() {
    let customers = await fakeFetchCustomer();
    collection = new CustomerCollection(customers);
}

// 加入今天臨時要寄的潛在客戶
collection.addCustomer({ name: 'Jane', address: '1600 Amphitheatre' });

const iterator = collection.getIterator();
let mailInfoList: string[] = [],
    recordList: string[] = [],
    recordCount: number = 0;
const makeMailInfo = (c: I_CustomerData): string => {
    return `
    阿肥國際有限公司 A-Fat International Co. Ltd
    寄件人地址: 999 Main St

        ${c.name} 收
                     收件人地址:${c.address}
    `;
};
const makeRecord = (c: I_CustomerData): string => {
    recordCount++;
    let record = `日期:${Date.now().toLocaleString()} 編號: ${recordCount} 姓名:${c.name}`;
    return record;
};
while (iterator.hasNext()) {
    let customer = iterator.next();

    // do work
    mailInfoList.push(makeMailInfo(customer));
    recordList.push(makeRecord(customer));
}
