import { storiesOf } from "@storybook/react";
import * as React from "react";

import { IChiRanRamen } from ".";

import { linkTo } from "@storybook/addon-links";

storiesOf("IChiRanRamen", module)
  .add("IChiRanRamen", () => (
    <IChiRanRamen onSubmit={v => alert(v.listProduct())} />
  ))
  .add("演示addon-links 2", () => (
    <div>
      <button
        //@ts-ignore
        onClick={linkTo(
          "設計模式範例Demo|建立型模式/工廠方法",
          "演示addon-links 1"
        )}
      >
        我要改吃麵線
      </button>
      <IChiRanRamen onSubmit={v => alert(v.listProduct())} />
    </div>
  ));
