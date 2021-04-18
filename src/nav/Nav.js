import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";

function Nav(props) {
  // const listItems = props.cats.map((item, index) => {
  //   if (index < 3)
  //     return (
  //       <li key={index} className="w-full h-full">
  //         <Link
  //           className="block w-full h-full p-3 text-center text-xl capitalize hover:text-blue-500"
  //           to={`/${item["category_name"]}`}
  //         >
  //           {item["category_name"]}
  //         </Link>
  //       </li>
  //     );
  //   return "";
  // });

  const logoutHandle = (e) => {
    e.preventDefault();
    Cookies.remove("login");
    window.location = "/";
  };
  return (
    <nav className="bg-gray-200">
      <ul className="flex justify-evenly">
        <li className="w-full h-full">
          <span className="block w-full h-full md:p-3 text-center text-xl capitalize font-bold">
            React+Node(Express)
          </span>
        </li>
        <li className="w-full h-full">
          <Link
            to="/"
            className="block w-full h-full md:p-3 text-center text-xl capitalize hover:text-blue-500"
          >
            Home
          </Link>
        </li>
        <li className="w-full h-full">
          <Link
            to="/user/order"
            className="block w-full h-full md:p-3 text-center text-xl capitalize hover:text-blue-500"
          >
            Đơn hàng
          </Link>
        </li>
        <Link
          to="/cart"
          className="block w-full h-full md:p-3 text-center text-xl capitalize hover:text-blue-500"
        >
          Giỏ hàng <sup className="font-bold text-red-400">{props.number}</sup>
        </Link>
        <li className="w-full h-full">
          {props.logged ? (
            <form onSubmit={logoutHandle}>
              <button
                type="submit"
                className="block w-full h-full md:p-3 text-center text-xl capitalize hover:text-blue-500 focus:outline-none"
              >
                Đăng xuất
              </button>
            </form>
          ) : (
            <Link
              to="/login"
              className="block w-full h-full md:p-3 text-center text-xl capitalize hover:text-blue-500"
            >
              Đăng nhập
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
