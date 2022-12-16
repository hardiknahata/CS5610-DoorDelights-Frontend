import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const AuthRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export const UserRoute = ({ component: Component, ...rest }) => {
  const {
    authenticated,
    account: { role },
  } = useSelector((state) => state.auth);

  return (
      <Route
          {...rest}
          render={(props) => {
              if (authenticated && role === "ROLE_ADMIN") {
                  return (
                      <Redirect to="/admin/dashboard"/>
                  )
              } else if (authenticated && role === "ROLE_SELLER") {
                  return (
                      <Redirect to="/seller/dashboard"/>
                  )
              } else {
                  return (
                      <Component {...props} />
                  )
              }
          }
          }
      />
  );
};

export const SellerRoute = ({ component: Component, ...rest }) => {

  const {
    authenticated,
    account: { role },
  } = useSelector((state) => state.auth);

  return (
      <Route
          {...rest}
          render={(props) => {
              if (authenticated && role === "ROLE_ADMIN") {
                  return (
                      <Redirect to="/admin/dashboard"/>
                  )
              } else if (authenticated && role === "ROLE_USER") {
                  return (
                      <Redirect to="/"/>
                  )
              } else {
                  return (
                      <Component {...props} />
                  )
              }
          }
          }
      />
  );
};

export const AdminRoute = ({ component: Component, ...rest }) => {
    const {
        authenticated,
        account: { role },
    } = useSelector((state) => state.auth);

    return (
        <Route
        {...rest}
        render={(props) => {
            if (authenticated && role === "ROLE_SELLER") {
                return (
                    <Redirect to="/seller/dashboard"/>
                )
            } else if (authenticated && role === "ROLE_USER") {
                return (
                    <Redirect to="/"/>
                )
            } else {
                return (
                    <Component {...props} />
                )
            }
        }
        }
        />
    );
};