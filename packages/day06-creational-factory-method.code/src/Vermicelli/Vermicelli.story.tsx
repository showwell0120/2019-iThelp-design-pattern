import { storiesOf } from "@storybook/react";
import * as React from "react";

import { FatVermicelli } from ".";

storiesOf("FatVermicelli", module).add("FatVermicelli", () => (
  <FatVermicelli
    onSubmit={v =>
      alert(`
    麵線完成囉！
        麵線顏色是:${v.color}
        麵線口味是:${v.flavor}
        麵線內容物有:${v.content.join(",")}
        已附湯匙:${v.spoons}支
        是否已盛盤:${v.trayed}
    `)
    }
  />
));
