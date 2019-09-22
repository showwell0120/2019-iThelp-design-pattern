import { storiesOf } from "@storybook/react";
import * as React from "react";

import { IChiRanRamen } from ".";

storiesOf("IChiRanRamen", module).add("IChiRanRamen", () => (
    <IChiRanRamen
        onSubmit={v =>
            alert(v.listProduct())
        }
    />
));
