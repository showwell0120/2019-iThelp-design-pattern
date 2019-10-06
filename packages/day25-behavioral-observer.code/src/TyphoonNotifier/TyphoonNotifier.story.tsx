import { storiesOf } from '@storybook/react';
import * as React from 'react';
import * as Obs from './observer';

import { TyphoonNotifier, startDesiding } from '.'

let notifierCenter = new Obs.TyphoonNotifyCenter();
let notifier1 = new Obs.TyphoonNotifiedClient("台北李先生", Obs.E_CityCode.tpe);
notifierCenter.addObserver(notifier1);
let notifier2 = new Obs.TyphoonNotifiedClient("台中莊同學", Obs.E_CityCode.chung);
notifierCenter.addObserver(notifier2);
let notifier3 = new Obs.TyphoonNotifiedClient("台南蔡小姐", Obs.E_CityCode.nan);
notifierCenter.addObserver(notifier3);
let notifier4 = new Obs.TyphoonNotifiedClient("高雄陳先生", Obs.E_CityCode.ka);
notifierCenter.addObserver(notifier4);

startDesiding(notifierCenter);

storiesOf('Observer Pattern', module).add('TyphoonNotifier', () => <div>
    <TyphoonNotifier notifier={notifier1} />
    <TyphoonNotifier notifier={notifier2} />
    <TyphoonNotifier notifier={notifier3} />
    <TyphoonNotifier notifier={notifier4} />
</div>);
