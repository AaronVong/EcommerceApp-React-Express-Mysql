import "./App.css";
import React from "react";
import Constants from "./Constants";
import Nav from "./nav/Nav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Cookies from "js-cookie";
import Cart from "./screens/Cart";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Order from "./screens/Order";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phones: [],
      laptops: [],
      tablets: [],
      cats: [],
      product: {},
      searchKey: "",
      foundProduct: null,
      isSubmit: false,
      cart: [],
      cartCount: 0,
      token: "",
      logged: false,
      user: null,
    };
  }

  componentDidMount() {
    const loginInfo = Cookies.getJSON("login");
    // kiểm tra nếu đã login thì gửi request lấy thông tin
    if (loginInfo) {
      this.setState({
        token: loginInfo["accessToken"],
        logged: loginInfo["logged"],
      });
      fetch(Constants["SERVER_PATH"] + "/user", {
        method: "GET",
        headers: {
          "x-auth-token": loginInfo["accessToken"],
        },
      })
        .then((response) => response.json())
        .then((data) => this.setState({ user: data[0] }));
    }
    // lấy danh sách loại sản phẩm
    // fetch(Constants["SERVER_PATH"] + "/category", {
    //   method: "GET",
    // })
    //   .then((response) => response.json())
    //   .then((data) => this.setState({ cats: data["data"] }));

    // lấy 10 sản phầm thuộc loại 'phone'
    fetch(Constants["SERVER_PATH"] + "/product/category/phone/10-0", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => this.setState({ phones: data["data"] }));

    // lấy 10 sản phẩm thuộc loại 'laptop
    fetch(Constants["SERVER_PATH"] + "/product/category/laptop/10-0", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => this.setState({ laptops: data["data"] }));

    // lấy 10 sản phầm thuộc loại 'tablet'
    fetch(Constants["SERVER_PATH"] + "/product/category/tablet/10-0", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => this.setState({ tablets: data["data"] }));

    let cart = JSON.parse(sessionStorage.getItem("cart"));
    if (cart == null) {
      cart = [];
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
    this.setState({ cart: cart, cartCount: cart.length });
  }

  // submit tìm kiếm
  searchHandle = (e) => {
    e.preventDefault();
    this.setState({ foundProduct: [] });
    fetch(Constants["SERVER_PATH"] + "/product/name/" + this.state.searchKey, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ foundProduct: data["data"], searchKey: "" });
      });
  };

  // xử lý khi nhập
  onChangeHandle = (e) => {
    const value = e.target.value;
    this.setState({ searchKey: value });
  };

  // thêm item vào session giỏ hàng
  addToCart = (product) => {
    let cart = [];
    // nếu session chưa tồn tại
    if (sessionStorage.getItem("cart") === null) {
      product["number"] = 1; // thêm thuộc tính number
      cart.push(product);
    } else {
      // nếu đã có session
      cart = [...JSON.parse(sessionStorage.getItem("cart"))];
      let found = false; // tìm xem product có trong giỏ hay chưa nếu có tăng number thêm 1
      cart.forEach((item) => {
        if (item["product_id"] === product["product_id"]) {
          item["number"] += 1;
          found = true; // đánh dấu đã tìm thấy
        }
      });

      // đến cuối vẫn không tìm thầy thì thêm prroduct vào giỏ hàng
      if (!found) {
        product["number"] = 1;
        cart.push(product);
      }
    }
    // thêm cart vào session
    sessionStorage.setItem("cart", JSON.stringify(cart));
    // đặt lại state
    this.setState({ cart: cart, cartCount: cart.length });
    alert("Đã thêm sản phẩm vào giỏ hàng");
  };

  increment = (index) => {
    let cart = this.state.cart;
    cart[index]["number"] += 1;
    this.setState({ cart: cart });
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  decrement = (index) => {
    let cart = this.state.cart;
    if (cart[index]["number"] > 1) {
      cart[index]["number"] -= 1;
    }
    this.setState({ cart: cart });
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  removeItem = (index) => {
    let cart = this.state.cart;
    cart.splice(index, 1);
    this.setState({ cart: cart, cartCount: cart.length });
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  render() {
    return (
      <Router>
        <div className="md:container md:mx-auto border">
          <Nav
            cats={this.state.cats}
            number={this.state.cartCount}
            logged={this.state.logged}
          />
          <div className="flex justify-between items-center border">
            <form
              onSubmit={this.searchHandle}
              className="my-3"
              autoComplete="off"
            >
              <label htmlFor="search">Search: </label>
              <input
                id="search"
                className="focus:outline-none border p-2 h-12 w-64"
                type="text"
                placeholder="Search product by name..."
                onChange={this.onChangeHandle}
              ></input>
            </form>
            {this.state.logged & (this.state.user != null) ? (
              <div className="flex flex-col border h-full">
                <h4 className="text-black text-lg font-medium">Thông tin:</h4>
                <span className="m-2">{this.state.user["customer_name"]}</span>
                <span className="m-2">{this.state.user["customer_email"]}</span>
                <span className="m-2">
                  {this.state.user["customer_address"]}
                </span>
                <span className="m-2">{this.state.user["customer_phone"]}</span>
              </div>
            ) : (
              ""
            )}
          </div>
          {this.state.foundProduct && <Redirect to="/search" />}
          <Switch>
            <Route path="/search">
              <Search
                products={this.state.foundProduct}
                name={this.state.searchKey}
                addToCart={this.addToCart}
              />
            </Route>
            <Route path="/" exact>
              <Home
                phones={this.state.phones}
                laptops={this.state.laptops}
                tablets={this.state.tablets}
                addToCart={this.addToCart}
              />
            </Route>
            <Route path="/phone" exact>
              <h1>Phone</h1>
            </Route>
            <Route path="/laptop" exact>
              <h1>Laptop</h1>
            </Route>
            <Route path="/tablet" exact>
              <h1>Tablet</h1>
            </Route>
            <Route path="/cart" exact>
              <Cart
                cart={this.state.cart}
                incre={this.increment}
                decre={this.decrement}
                remove={this.removeItem}
                logged={this.state.logged}
                token={this.state.token}
              />
            </Route>
            <Route path="/login">
              <Login logged={this.state.logged} />
            </Route>
            <Route path="/register">
              <Register logged={this.state.logged} />
            </Route>
            <Route path="/user/order">
              <Order
                logged={this.state.logged}
                token={this.state.token}
                user={this.state.user}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
