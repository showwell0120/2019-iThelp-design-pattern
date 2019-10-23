import { storiesOf } from "@storybook/react";
import * as React from "react";

import { FatVermicelli } from ".";

// import { text, boolean } from "@storybook/addon-knobs";
import { linkTo } from "@storybook/addon-links";

// storiesOf("設計模式範例Demo|建立型模式/工廠方法", module)
//   .add("原本的FatVermicelli", () => (
//     <FatVermicelli
//       onSubmit={v =>
//         alert(`
//     麵線完成囉！
//         麵線顏色是:${v.color}
//         麵線口味是:${v.flavor}
//         麵線內容物有:${v.content.join(",")}
//         已附湯匙:${v.spoons}支
//         是否已盛盤:${v.trayed}
//     `)
//       }
//     />
//   ))
//   .add("演示addon-knob", () => (
//     <FatVermicelli
//       storeName={text("storeName", "無名麵線攤")}
//       showName={boolean("showName", true)}
//     />
//   ))
//   .add("演示addon-links 1", () => (
//     <div>
//       <button
//         //@ts-ignore
//         onClick={linkTo("IChiRanRamen", "演示addon-links 2")}
//       >
//         我要改吃拉麵
//       </button>
//       <FatVermicelli
//         storeName={text("storeName", "無名麵線攤")}
//         showName={boolean("showName", true)}
//       />
//     </div>
//   ))
//   .add(
//     "演示addon-notes",
//     () => (
//       <FatVermicelli
//         storeName={text("storeName", "無名麵線攤")}
//         showName={boolean("showName", true)}
//       />
//     ),
//     {
//       notes: {
//         markdown: ` 
//                 ### Example Domain 
//                 - This domain is established to be used for illustrative examples in documents. 
//                 - You may use this domain in examples without prior coordination or asking for permissio
//                 - As described in RFC 2606 and RFC 6761, a number of domains such as example.com .   

//                 - This domain is established to be used for illustrative examples in documents. 
//                 - You may use this domain in examples without prior coordination or asking for permissio
//                 - As described in RFC 2606 and RFC 6761, a number of domains such as example.com .
//             `
//       }
//     }
//   );
