import * as React from 'react';
import { compose } from 'recompose';

const sayHi = cmp => {
    cmp.intro = 'Hi';
    return cmp;
};

@sayHi
export class HelloWorld extends React.Component {
    render() {
        return <div>Hello World!</div>;
    }
}

export const App: React.FC = () => {
    return (
        <div className="App">
            <HelloWorld />
        </div>
    );
}

export interface I_Props_SwitchBox {
    displayName: string;
    price: number;
}

export const SwitchBox: React.FC<I_Props_SwitchBox> = props => {
    return <div>
        <p>產品名稱：{props.displayName}</p>
        <p>產品價格：{props.price}</p>
    </div>
}

