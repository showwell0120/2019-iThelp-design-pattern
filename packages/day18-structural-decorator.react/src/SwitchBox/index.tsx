import * as React from 'react';

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

