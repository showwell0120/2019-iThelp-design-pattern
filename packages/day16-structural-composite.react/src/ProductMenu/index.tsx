import * as React from 'react';

export interface I_Props_Menu {
    type: string;
    description: string;
}

export interface I_Props_Product {
    name: string;
    price: number;
}

export const Menu: React.FC<I_Props_Menu> = props => {
    return (<div>
        <h3>[{props.type}] <small>{props.description}</small></h3>
        {props.children}
    </div>);
}

export const Product: React.FC<I_Props_Product> = props => {
    return <p>- ▢ {props.name} {props.price}元</p>
}

