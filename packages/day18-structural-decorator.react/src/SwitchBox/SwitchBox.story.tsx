import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { App, HelloWorld } from '.';

//@ts-ignore
console.log(HelloWorld.intro)
storiesOf('App', module).add('App', () => (<App />));