import React from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Constants from "../Constants";
import { stringToMoney } from "../Functions";

export default function Cart(props) {
  let sum = 0;
  const cartItems = props.cart.map((item, index) => {
    sum += item["product_originprice"] * item["number"];
    return (
      <Product
        product={item}
        key={index}
        index={index}
        incre={props.incre}
        decre={props.decre}
        remove={props.remove}
      />
    );
  });
  const orderHandle = async (e) => {
    e.preventDefault();
    fetch(Constants["SERVER_PATH"] + "/order", {
      method: "POST",
      headers: {
        "x-auth-token": props.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: props.cart, worth: sum }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          alert("Đặt hàng thất bại");
          return;
        }
        alert("Đặt hàng thành công, mã đơn hàng: " + data.orderId);
        sessionStorage.removeItem("cart");
        window.location.reload();
      });
  };
  return (
    <div>
      <h3 className="text-2xl font-bold p-2 mb-2">
        <span className="border-b-4 border-blue-500 capitalize text-black p-1">
          Giỏ hàng
        </span>
      </h3>
      <div>
        {props.cart.length > 0 ? (
          <div className="flex flex-col">
            {cartItems}
            <form onSubmit={orderHandle} className="ml-auto px-2">
              <h3 className="text-black text-2xl py-2">
                Tổng thành tiền: <span>{stringToMoney(sum)}</span>
              </h3>
              {props.logged ? (
                <button
                  type="submit"
                  className="bg-green-500 w-64 h-12 text-white font-medium hover:bg-green-600 my-4"
                >
                  Đặt hàng
                </button>
              ) : (
                <span className="text-black text-lg p-2">
                  <Link
                    to="/login"
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Đăng nhập
                  </Link>
                  để đặt hàng
                </span>
              )}
            </form>
          </div>
        ) : (
          <span className="text-red-500 text-lg p-2">Giỏ hàng rỗng</span>
        )}
      </div>
    </div>
  );
}
