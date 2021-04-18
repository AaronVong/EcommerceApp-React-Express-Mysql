import React from "react";
import { stringToMoney } from "../Functions";

export default function Search(props) {
  const renderProducts = (list) => {
    const listItems = list.map((item, index) => {
      return (
        <li
          className="flex flex-col w-full h-full border-2 items-center"
          key={index}
        >
          <div className="w-full md:p-4 p-16 h-full">
            <img
              src={`/images/products/${item["product_thumb"]}`}
              alt={item["product_thumb"]}
              className="block w-full h-full"
            ></img>
          </div>
          <div className="flex flex-col w-full">
            <span className="px-3 py-2 text-lg text-black capitalize truncate ">
              {item["product_name"]}
            </span>
            <span className="px-3 py-2 text-lg text-black">
              {stringToMoney(item["product_originprice"])}
            </span>
          </div>
          <div className="w-full">
            <button
              className="block w-full focus:outline-none bg-green-400 hover:bg-green-500 focus:ring-2 focus:ring-green-600 h-12 py-3 text-center"
              onClick={() => {
                props.addToCart(item);
              }}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </li>
      );
    });
    return (
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-5 place-items-center lg:place-items-start">
        {listItems}
      </ul>
    );
  };

  return (
    <div>
      <h3 className="text-2xl font-bold p-2">Kết quả tìm kiếm</h3>
      {props.products && renderProducts(props.products)}
    </div>
  );
}
