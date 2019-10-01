import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { QueryStock } from '.';

storiesOf('Facade Pattern', module).add('QueryStock', () => <QueryStock onGetStock={n => alert(`查詢結果筆數:${n}`)} />);
