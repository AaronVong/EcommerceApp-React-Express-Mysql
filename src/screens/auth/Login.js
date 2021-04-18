import Cookies from "js-cookie";
import { React, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Constants from "../../Constants";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const loginHandle = (e) => {
    e.preventDefault();
    fetch(Constants["SERVER_PATH"] + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data["logged"]) {
          alert("Đăng nhập thất bại");
          setErrors(data["errors"]);
          setPassword("");
        } else {
          alert("Đăng nhập thành công");
          Cookies.set("login", data);
          setEmail("");
          setPassword("");
          setErrors([]);
          window.location = "/";
        }
      });
  };

  if (props.logged) {
    return <Redirect to="/" />;
  }
  return (
    <div className="h-full w-full">
      <h1 className="text-center font-bold text-3xl py-5">Đăng nhập</h1>
      <form
        className="w-full lg:w-3/6 lg:mx-auto py-2 h-full"
        onSubmit={loginHandle}
        autoComplete="off"
      >
        <div className="w-full flex justify-center items-center mb-4">
          <label
            className="text-block mr-3 flex-shrink-0 flex-grow-0 w-24 font-medium"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="Địa chỉ email..."
            className="p-1 flex-shrink-1 flex-grow-1 w-64 border"
          ></input>
        </div>
        <div className="w-full flex flex-col justify-center items-center mb-4">
          {errors.length > 0 &&
            errors.map((error, index) => {
              if (error["param"] === "email") {
                return (
                  <span className="text-red-500 font-medium" key={index}>
                    {error["msg"]}
                  </span>
                );
              }
              return "";
            })}
        </div>
        <div className="w-full flex justify-center items-center mb-4">
          <label
            className="text-block mr-3 flex-shrink-0 flex-grow-0 w-24 font-medium"
            htmlFor="password"
          >
            Mật khẩu:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="Mật khẩu..."
            className="p-1 flex-shrink-1 flex-grow-1 w-64 border"
          ></input>
          <span className="text-red-500 font-medium"></span>
        </div>
        <div className="w-full flex flex-col justify-center items-center mb-4">
          {errors.length > 0 &&
            errors.map((error, index) => {
              if (error["param"] === "password") {
                return (
                  <span className="text-red-500 font-medium" key={index}>
                    {error["msg"]}
                  </span>
                );
              }
              return "";
            })}
        </div>
        <div className="w-full flex justify-center items-center mb-4">
          <button
            type="submit"
            className="w-24 p-2 border bg-gray-300 hover:bg-gray-400 rounded-lg"
          >
            Đăng nhập
          </button>
        </div>
        <div className="w-full flex justify-center items-center mb-4">
          <span className="inline-block text-black mr-3">
            Chưa có tài khoản?
          </span>
          <Link to="/register" className="text-blue-600 hover:underline ">
            Đăng ký
          </Link>
        </div>
      </form>
    </div>
  );
}
