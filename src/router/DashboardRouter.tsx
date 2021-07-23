import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { MyApplications } from "../screen/MyApplications";
import { OffersJobScreen } from "../screen/OffersJobScreen";
import { AppDispatch, RootState } from "../store/store";
import Swal from "sweetalert2";
import { ROLE_POSTULANT } from "../helpers/Constants";
import { NoMatch } from "../component/NoMatch";

export const DashboardRouter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.auth);
  console.log("rol");
  console.log(data);
  const logout = () => {
    Swal.fire({
      title: "¿Quieres cerrar sesión?",
      showDenyButton: true,
      confirmButtonText: `Si`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch({ type: "clear" });
        localStorage.clear();
        Swal.fire("Sesión terminada!", "", "success");
      }
    });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {data?.role.includes(ROLE_POSTULANT) ? (
              <>
                <li className="nav-item">
                  <NavLink to="/job-offers" className="nav-link">
                    Ofertas
                  </NavLink>
                  {/* <a className="nav-link active">Ofertas</a> */}
                </li>
                <li className="nav-item">
                  <NavLink to="/my-applications" className="nav-link">
                    Mis postulaciones
                  </NavLink>
                  {/* <a className="nav-link">Mis postulaciones</a> */}
                </li>
              </>
            ) : null}
          </ul>
          <button className="btn btn-danger" onClick={logout}>
            Cerrar sessión
          </button>
        </div>
      </nav>
      <div>
        {data?.role.includes(ROLE_POSTULANT) ? (
          <Switch>
            <Route exact path="/job-offers" component={OffersJobScreen} />
            <Route exact path="/my-applications" component={MyApplications} />
            <Route component={NoMatch} />
          </Switch>
        ) : null}
      </div>
    </>
  );
};
