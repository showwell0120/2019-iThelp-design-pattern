import * as React from 'react';

export interface I_Props_SwitchBox {
    displayName?: string;
    totalPrice?: number;
}

export const SimpleSwitchBox: React.FC<I_Props_SwitchBox> = props => {
    return (
        <div>
            <div>
                <p>產品名稱：{props.displayName}</p>
                <p>產品價格：{props.totalPrice}元</p>
            </div>
        </div>
    );
};

export const BarginSwitchBox: React.FC<I_Props_SwitchBox> = props => {
    return (
        <div>
            <h2>商品八折特價中！！</h2>
            <div>
                <p>產品名稱：{props.displayName}</p>
                <p>產品原價：{props.totalPrice}元</p>
                <p style={{ fontWeight: 'bold' }}>特價只要：{props.totalPrice * 0.8}元</p>
            </div>
        </div>
    );
};

interface I_Props_WithSwitchParts {
    name: string[];
    price: number[];
}

const withSwitchParts = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P & I_Props_WithSwitchParts> => ({
    ...props
}: P & I_Props_WithSwitchParts) => {
    const [displayName, setDisplayName] = React.useState<string>('');
    const [totalPrice, setTotalPrice] = React.useState<number>(0);

    React.useEffect(() => {
        if (props.name && props.name.length) {
            let _name = ['Nintendo Switch 主機', ...props.name].join(' / ');
            setDisplayName(_name);
        }
        if (props.price && props.price.length) {
            let _price = props.price.reduce((a, b) => a + b, 7500);
            setTotalPrice(_price);
        }
    }, [props]);

    const wrappedProps = { ...(props as P), displayName, totalPrice };

    return <WrappedComponent {...wrappedProps} />;
};

export const SimpleSwitchBoxWithParts = withSwitchParts(SimpleSwitchBox);
export const BarginSwitchBoxWithParts = withSwitchParts(BarginSwitchBox);
