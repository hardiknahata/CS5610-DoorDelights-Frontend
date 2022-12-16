import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutAction, getUserData } from "./redux/actions/authActions";
import axios from "./util/axios";
import jwtDecode from "jwt-decode";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import ScrollToTop from "./util/scrollToTop";
import {AdminRoute, AuthRoute, SellerRoute, UserRoute} from "./util/route";
import home from "./home/home";
import error404 from "./errors/404";
import signup from "./signup/sign-up";
import login from "./login/login";
import search from "./search/search";
import addRestaurant from "./restaurant/addRestaurant";
import restaurant from "./restaurant/restaurant";
import sellerDash from "./seller/sellerDashboard";
import cart from "./cart/cart";
import orders from "./orders/orders";
import profile from "./profile/profile";
import editProfile from "./edit-profile/edit-profile";
import adminDash from "./admin/adminDashboard";
import searchDetails from "./restaurant/details";
const theme = createMuiTheme(themeFile);

const token = localStorage.jwt;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutAction());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <AppBar />
          <ScrollToTop />
          <Switch>
            <Route exact path="/" component={home} />
            <AuthRoute exact path="/search" component={search} />
            <AuthRoute exact path="/login" component={login} />
            <AuthRoute exact path="/register" component={signup} />
            <Route exact path="/profile" component={profile} />
            <Route exact path="/edit-profile" component={editProfile} />
            <AuthRoute exact path="/addrestaurant" component={addRestaurant} />
            <UserRoute exact path="/order/:restName" component={restaurant} />
            <UserRoute exact path="/details/:restName" component={searchDetails} />
            <SellerRoute
              exact
              path="/seller/dashboard"
              component={sellerDash}
            />
            <AdminRoute
                exact
                path="/admin/dashboard"
                component={adminDash}
            />
            <UserRoute exact path="/cart" component={cart} />
            <UserRoute exact path="/orders" component={orders} />
            <SellerRoute exact path="/seller/orders" component={orders} />
            <Route component={error404} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
