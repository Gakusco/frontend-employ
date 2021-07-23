import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React from "react";
import { LoginScreen } from "../screen/LoginScreen";
import { RegisterScreen } from "../screen/RegisterScreen";
import { NoMatch } from '../component/NoMatch';

export const HomeRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/auth/login" component={LoginScreen} />
        <Route exact path="/auth/register" component={RegisterScreen} />
        <Redirect to="/auth/login"/>
      </Switch>
    </div>
  );
};
