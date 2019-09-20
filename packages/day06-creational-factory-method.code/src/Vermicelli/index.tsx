/// <reference path="declaration.ts" />

import * as React from "react";
import { VermicelliFactory } from "./factory";

interface I_Props_FatVermicelli {
  // 當麵線完成後，再交給外面的人
  onSubmit: (v: Declaration.I_Vermicelli) => void;
}

// 建立Functional Component，props的型別傳入I_Props_FatVermicelli
export const FatVermicelli: React.FC<I_Props_FatVermicelli> = ({
  onSubmit
}) => {
  const vermicelliFactory = new VermicelliFactory();

  const [order, setOrder] = React.useState<Declaration.I_Order>({
    color: "red",
    flavor: "intestine",
    spoons: 1
  });

  // 開始執行麵線的工廠
  const handleSubmitOrder = e => {
    e.preventDefault();
    vermicelliFactory.receiveOrder(order);
    let _vermicelli = vermicelliFactory.maker.vermicelli;
    if (onSubmit) onSubmit(_vermicelli);
  };

  // 表單元件的change handler
  const handleFieldChange = ({ target }) => {
    setOrder(order => ({
      ...order,
      [target.name]: target.value
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmitOrder} id="fatVermicelliOrder">
        <label htmlFor="color">麵線顏色：</label>
        <select
          value={order.color}
          id="color"
          name="color"
          onChange={handleFieldChange}
        >
          <option value="red">紅</option>
          <option value="white">白</option>
        </select>
        <label htmlFor="color">麵線口味：</label>
        <select
          value={order.flavor}
          id="flavor"
          name="flavor"
          onChange={handleFieldChange}
        >
          <option value="intestine">大腸</option>
          <option value="oyster">蚵仔</option>
        </select>
        <label htmlFor="color">湯匙：</label>
        <input
          type="number"
          value={order.spoons}
          min="0"
          max="10"
          name="spoons"
          onChange={handleFieldChange}
        ></input>
        <input type="submit" value="交給阿肥"></input>
      </form>
    </div>
  );
};
