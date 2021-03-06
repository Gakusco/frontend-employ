import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Loading } from "../component/Loading";
import { KEY_TOKEN } from "../helpers/Constants";
import { TokenDecode } from "../interface/interface";
import { AppDispatch, RootState } from "../store/store";
import { DashboardRouter } from "./DashboardRouter";
import { HomeRouter } from "./HomeRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRouter } from "./PublicRouter";

export const AppRouter = () => {
  const { data, isOnline } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);
    const token = localStorage.getItem(KEY_TOKEN);
    if (token) {
      const decodeToken = jwtDecode<TokenDecode>(token);
      const isTokenValid = dayjs(decodeToken.exp * 1e3).isAfter(dayjs());
      if (isTokenValid) {
        dispatch({
          type: "save",
          payload: {
            isOnline: true,
            data: {
              access_token: token,
              credentialId: decodeToken.credentialId,
              userId: decodeToken.userId,
              role: decodeToken.authorities,
            },
          },
        });
        setIsLoading(false);
      } else {
        dispatch({ type: "clear" });
        localStorage.clear();
        setIsLoading(false);
      }
    } else {
      dispatch({ type: "clear" });
      localStorage.clear();
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Switch>
        <PublicRouter
          path="/auth"
          component={HomeRouter}
          isLoggedIn={isOnline}
        />
        <PrivateRoute
          path="/"
          component={DashboardRouter}
          isLoggedIn={isOnline}
        />
      </Switch>
    </Router>
  );
};
