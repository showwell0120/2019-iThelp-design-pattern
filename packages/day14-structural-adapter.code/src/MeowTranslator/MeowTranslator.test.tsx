import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MeowTranslator } from '.';

let container;

//每個測試案例前執行(更換element,Reseting)
beforeEach(() => {
    container = document.createElement('div');
});

//提取重複程式
const render = component => ReactDOM.render(component, container);

const form = (id: string) => container.querySelector(`form[id="${id}"]`);

describe('MeowTranslator', () => {
    it('render MeowTranslator form', () => {
        render(<MeowTranslator />);
        expect(form('meowBehavior')).not.toBeNull();
    });
});
