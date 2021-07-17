import React from "react";
import { Redirect, Route } from "react-router";
import { RouteProps } from "react-router-dom";

interface Props extends RouteProps {
  isLoggedIn: boolean;
  component: any;
}

export const PrivateRoute = ({
  isLoggedIn,
  component: Component,
  ...rest
}: Props) => {
  return (
    <Route
      {...rest}
      component={(props: any) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};
