import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRouter } from "./PublicRouter";
import { HomeScreen } from '../screen/HomeScreen';
import { DashboardScreen } from '../screen/DashboardScreen';

export const AppRouter = () => {
  return (
    <Router>
      <div>
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
            isLoggedIn={true}
          />
          <Redirect to="/home" />
        </Switch>
      </div>
    </Router>
  );
};
