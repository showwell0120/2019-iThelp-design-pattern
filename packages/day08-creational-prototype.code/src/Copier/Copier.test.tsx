import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReportCopier } from '.';

let container;

//每個測試案例前執行(更換element,Reseting)
beforeEach(() => {
    container = document.createElement('div');
});

//提取重複程式
const render = component => ReactDOM.render(component, container);
const form = (id: string) => container.querySelector(`form[id="${id}"]`);

describe('ReportCopier', () => {
    it('render ReportCopier', () => {
        render(<ReportCopier />);
        expect(form('setting')).not.toBeNull();
    });
});
