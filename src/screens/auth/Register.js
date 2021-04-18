import { React, useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import Constants from "../../Constants";
export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const registerHandle = (e) => {
    e.preventDefault();
    fetch(Constants["SERVER_PATH"] + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, address, phone, name }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data["success"]) {
          alert("Đăng ký thất bại");
          setErrors(data["errors"]);
          setPassword("");
        } else {
          alert("Đăng ký thành công User ID: " + data["id"]);
          history.replace("/login");
          setEmail("");
          setPassword("");
          setName("");
          setPhone("");
          setAddress("");
          setErrors([]);
        }
      });
  };

  if (props.logged) {
    return <Redirect to="/" />;
  }
  return (
    <div className="w-full h-full">
      <h1 className="text-center font-bold text-3xl py-5">Đăng Ký</h1>

      <form
        className="w-full lg:w-3/6 lg:mx-auto py-2 h-full"
        onSubmit={registerHandle}
        autoComplete="off"
      >
        <div className="w-full flex justify-center items-center mb-4">
          <label
            className="text-block mr-3 flex-shrink-0 flex-grow-0 w-32 font-medium"
            htmlFor="name"
          >
            Họ tên:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            placeholder="Họ tên..."
            className="p-1 flex-shrink-1 flex-grow-1 w-64 border"
          ></input>
          <span className="text-red-500 font-medium"></span>
        </div>
        <div className="w-full flex flex-col justify-center items-center mb-4">
          {errors.length > 0 &&
            errors.map((error, index) => {
              if (error["param"] === "name") {
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
            className="text-block mr-3 flex-shrink-0 flex-grow-0 w-32 font-medium"
            htmlFor="phone"
          >
            Số điện thoại:
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            placeholder="Điện thoại liên lạc..."
            className="p-1 flex-shrink-1 flex-grow-1 w-64 border"
          ></input>
          <span className="text-red-500 font-medium"></span>
        </div>
        <div className="w-full flex flex-col justify-center items-center mb-4">
          {errors.length > 0 &&
            errors.map((error, index) => {
              if (error["param"] === "phone") {
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
            className="text-block mr-3 flex-shrink-0 flex-grow-0 w-32 font-medium"
            htmlFor="address"
          >
            Địa chỉ:
          </label>
          <input
            id="address"
            type="text"
            name="address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
            placeholder="Địa chỉ email..."
            className="p-1 flex-shrink-1 flex-grow-1 w-64 border"
          ></input>
          <span className="text-red-500 font-medium"></span>
        </div>
        <div className="w-full flex flex-col justify-center items-center mb-4">
          {errors.length > 0 &&
            errors.map((error, index) => {
              if (error["param"] === "address") {
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
            className="text-block mr-3 flex-shrink-0 flex-grow-0 w-32 font-medium"
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
          <span className="text-red-500 font-medium"></span>
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
            className="text-block mr-3 flex-shrink-0 flex-grow-0 w-32 font-medium"
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
            Đăng ký
          </button>
        </div>
        <div className="w-full flex justify-center items-center mb-4">
          <span className="inline-block text-black mr-3">Đã có tài khoản?</span>
          <Link to="/login" className="text-blue-600 hover:underline ">
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
}
