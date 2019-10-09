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
