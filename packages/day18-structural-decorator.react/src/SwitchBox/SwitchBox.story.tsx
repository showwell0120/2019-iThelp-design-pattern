import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { SimpleSwitchBoxWithParts, BarginSwitchBoxWithParts } from '.';

storiesOf('Decorator', module)
    .add('SimpleSwitchBoxWithParts', () => <SimpleSwitchBoxWithParts name={['紅藍手把組', '《精靈寶可夢》超值組合包']} price={[1000, 1500]} />)
    .add('BarginSwitchBoxWithParts', () => <BarginSwitchBoxWithParts name={['紅藍手把組', '《精靈寶可夢》超值組合包']} price={[1000, 1500]} />);
