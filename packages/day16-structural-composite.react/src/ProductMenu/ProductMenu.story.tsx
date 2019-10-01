import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Menu, Product } from '.';


storiesOf('ProductMenu', module).add('ProductMenu', () =>
    <Menu type="肥肥麵線＆壹LAN拉麵 聯合菜單" description="兩家一起點，讓你好方便!">
        <Menu type="壹LAN拉麵店" description="ようこそ、こちらへ！!">
            <Product name="壹LAN特製拉麵" price={120}></Product>
            <Product name="鮭魚味噌湯" price={40}></Product>
        </Menu>
        <Menu type="肥肥麵線攤" description="想吃點台味來這邊!">
            <Menu type="麵線" description="">
                <Product name="大腸口味" price={40}></Product>
                <Product name="蚵仔口味" price={40}></Product>
            </Menu>
            <Menu type="涼飲" description="">
                <Product name="古早味紅茶" price={20}></Product>
                <Product name="彈珠汽水" price={30}></Product>
            </Menu>
        </Menu>
    </Menu>
)