import { React, useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router";
import Contants from "../Constants";
import { stringToMoney } from "../Functions";
export default function Order(props) {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (props.logged) {
      fetch(Contants["SERVER_PATH"] + "/user/orders", {
        method: "GET",
        headers: {
          "x-auth-token": props.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            console.log("Lấy danh sách đơn hàng thất bại");
            return;
          }
          setOrder(data);
        });
    }
  }, []);

  const rowClickHandle = (e) => {
    const target = e.currentTarget;
    const sibling = target.nextElementSibling;
    if (!prevItem) {
      prevItem = sibling;
    } else {
      prevItem.classList.add("hidden");
      prevItem = sibling;
    }
    if (
      sibling.classList.contains("hidden-item") &&
      sibling.classList.contains("hidden")
    ) {
      sibling.classList.remove("hidden");
    } else {
      sibling.classList.add("hidden");
    }
  };
  if (!props.logged) {
    return <Redirect to="/login" />;
  }
  let prevItem = null;
  const renderOrdersList = () => {
    return order.map((item, index) => {
      return (
        <Fragment key={index}>
          <tr
            className="border border-collapse hover:bg-gray-100 cursor-pointer text-center"
            onClick={rowClickHandle}
          >
            <td className="border border-collapse p-3">{item["order_id"]}</td>
            <td className="border border-collapse p-3">
              {props.user["customer_name"]}
            </td>
            <td className="border border-collapse p-3">
              {item["product_name"]}
            </td>
            <td className="border border-collapse p-3">
              <img
                src={`/images/products/${item["product_thumb"]}`}
                className="block w-12 h-12"
                alt={item["product_thumb"]}
              ></img>
            </td>
            <td className="border border-collapse p-3">
              {stringToMoney(item["order_detail_originprice"])}
            </td>
            <td className="border border-collapse p-3">
              {item["order_detail_number"]}
            </td>
            <td className="border border-collapse p-3">
              {item["order_address"]}
            </td>
          </tr>
          <tr className="border border-collapse hidden hidden-item">
            <td colSpan="8" className="text-right p-3">
              <span className="text-lg font-bold mr-3">Thành tiền:</span>
              <span>{stringToMoney(item["order_detail_worth"])}</span>
            </td>
          </tr>
          {order[index + 1] ? (
            order[index + 1]["order_id"] !== item["order_id"] ? (
              <tr className="border border-collapse hover:bg-gray-100">
                <td colSpan="8" className="text-right p-3">
                  <span className="text-lg font-bold mr-3">
                    Trị giá đơn hàng:
                  </span>
                  <span>{stringToMoney(item["order_worth"])}</span>
                </td>
              </tr>
            ) : (
              ""
            )
          ) : (
            <tr className="border border-collapse hover:bg-gray-100">
              <td colSpan="8" className="text-right p-3">
                <span className="text-lg font-bold mr-3">
                  Trị giá đơn hàng:
                </span>
                <span>{stringToMoney(item["order_worth"])}</span>
              </td>
            </tr>
          )}
        </Fragment>
      );
    });
  };
  return (
    <div>
      <h3 className="text-2xl font-bold p-2 mb-2">
        <span className="border-b-4 border-blue-500 capitalize text-black p-1">
          Đơn hàng của tôi:
        </span>
      </h3>
      <table className="border border-collapse w-full">
        <thead className="border border-collapse">
          <tr className="border border-collapse">
            <th className="border border-collapse">Mã đơn hàng</th>
            <th className="border border-collapse">Tên khách hàng</th>
            <th className="border border-collapse">Tên sản phẩm</th>
            <th className="border border-collapse">Hình ảnh</th>
            <th className="border border-collapse">Giá bán</th>
            <th className="border border-collapse">Số lượng</th>
            <th className="border border-collapse">Địa chỉ giao</th>
          </tr>
        </thead>
        <tbody className="border border-collapse">{renderOrdersList()}</tbody>
      </table>
    </div>
  );
}
