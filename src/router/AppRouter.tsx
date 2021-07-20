import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { DashboardScreen } from "../screen/DashboardScreen";
import { HomeScreen } from "../screen/HomeScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRouter } from "./PublicRouter";

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PublicRouter
          exact
          path="/home"
          component={HomeScreen}
          isLoggedIn={false}
        />
        <PrivateRoute
          exact
          path="/"
          component={DashboardScreen}
          isLoggedIn={false}
        />
      </Switch>
    </Router>
  );
};
