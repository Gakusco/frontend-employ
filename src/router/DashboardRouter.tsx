import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import Swal from "sweetalert2";
import { NoMatch } from "../component/NoMatch";
import { ROLE_POSTULANT, ROLE_SUPERVISOR } from "../helpers/Constants";
import { JobOfferDetails } from "../screen/JobOfferDetails";
import { MyApplications } from "../screen/MyApplications";
import { OffersJobScreen } from "../screen/OffersJobScreen";
import { AppDispatch, RootState } from "../store/store";
import { SJobOfferScreen } from "../screen/supervisor/SJobOfferScreen";
import { SBusinessScreen } from "../screen/supervisor/SBusinessScreen";
import { SApplicantsScreen } from "../screen/supervisor/SApplicantsScreen";
import { SAddBusinessScreen } from "../screen/supervisor/SAddBusinessScreen";
import { SJobOfferAddScreen } from "../screen/supervisor/SJobOfferAddScreen";
import { HomeScreen } from "../screen/HomeScreen";
import { SApplicantsActiveScreen } from '../screen/supervisor/SApplicantsActiveScreen';

export const DashboardRouter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.auth);
  const logout = () => {
    Swal.fire({
      title: "¿Quieres cerrar sesión?",
      showDenyButton: true,
      confirmButtonText: `Si`,
      icon: "warning"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "clear" });
        localStorage.clear();
        Swal.fire("Sesión terminada!", "", "success");
      }
    });
  };

  useEffect(() => {
    if (data?.role.includes(ROLE_POSTULANT)) {
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {data?.role.includes(ROLE_POSTULANT) ? (
              <>
                <li className="nav-item">
                  <NavLink to="/home" className="nav-link">
                    Inicio
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/job-offers" className="nav-link">
                    Ofertas
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/my-applications" className="nav-link">
                    Mis postulaciones
                  </NavLink>
                </li>
              </>
            ) : data?.role.includes(ROLE_SUPERVISOR) ? (
              <>
                <li className="nav-item">
                  <NavLink to="/home" className="nav-link">
                    Inicio
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/business" className="nav-link">
                    Empresas
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/applicants" className="nav-link">
                    Usuarios
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
          <button className="btn btn-danger" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </nav>
      <div>
        {data?.role.includes(ROLE_POSTULANT) ? (
          <Switch>
            <Route exact path="/home" component={HomeScreen} />
            <Route exact path="/job-offers" component={OffersJobScreen} />
            <Route exact path="/job-offers/:id" component={JobOfferDetails} />
            <Route exact path="/my-applications" component={MyApplications} />
            <Route component={NoMatch} />
          </Switch>
        ) : data?.role.includes(ROLE_SUPERVISOR) ? (
          <Switch>
            <Route exact path="/home" component={HomeScreen} />
            <Route exact path="/job-offers" component={SJobOfferScreen} />
            <Route exact path="/job-offer/add" component={SJobOfferAddScreen} />
            <Route exact path="/job-offer/applicants" component={SApplicantsActiveScreen}/>
            <Route exact path="/business" component={SBusinessScreen} />
            <Route exact path="/business/add" component={SAddBusinessScreen} />
            <Route exact path="/applicants" component={SApplicantsScreen} />
            <Route component={NoMatch} />
          </Switch>
        ) : null}
      </div>
    </>
  );
};
