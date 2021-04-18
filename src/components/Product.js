import { React, useState } from "react";
import { stringToMoney } from "../Functions";
export default function Product(props) {
  let [number, setNumber] = useState(props.product["number"]);

  const onClick = (e) => {
    if (e.target.getAttribute("name") === "increment") {
      props.incre(props.index);
      setNumber(number + 1);
    }
    if (e.target.getAttribute("name") === "decrement" && number > 1) {
      props.decre(props.index);
      setNumber(number - 1);
    }
  };
  return (
    <div className="w-full grid grid-cols-2 border mb-2 items-center">
      <div className="col-start-1 col-span-1 w-64 h-64 p-4 mx-auto">
        <img
          src={`/images/products/${props.product["product_thumb"]}`}
          alt={props.product["product_thumb"]}
          className="black w-full h-full"
        ></img>
      </div>
      <div className="flex flex-col w-full border-l-2 h-full justify-evenly px-4">
        <span className="text-lg text-black capitalize truncate ">
          {props.product["product_name"]}
        </span>
        <span className="text-lg text-black font-medium">
          {stringToMoney(props.product["product_originprice"])}
        </span>
        <div className="w-full flex items-center">
          <span>Số lượng: </span>
          <button
            type="button"
            name="decrement"
            className="font-bold text-3xl w-12 h-12 bg-gray-300"
            onClick={onClick}
          >
            -
          </button>
          <input
            value={number}
            type="text"
            readOnly
            className="w-12 h-12 bg-gray-50 py-2 text-center"
          ></input>
          <button
            type="button"
            name="increment"
            className="font-bold text-3xl w-12 h-12 bg-gray-300"
            onClick={onClick}
          >
            +
          </button>
        </div>
        <div>
          <button
            type="button"
            className="bg-red-500 w-32 h-12 text-white font-medium hover:bg-red-600"
            onClick={() => {
              props.remove(props.index);
            }}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
