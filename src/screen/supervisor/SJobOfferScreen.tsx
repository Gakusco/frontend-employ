import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { listJobOfferByBusinessId } from "../../actions/jobOfferSuper";
import { EndTransaction } from "../../component/EndTransaction";
import { JobOfferSuperItem } from "../../component/JobOfferSuperItem";
import { RootState } from "../../store/store";

export const SJobOfferScreen = () => {
  const dispatch = useDispatch();
  const { jobOfferList } = useSelector(
    (state: RootState) => state.jobOfferSuper
  );
  const history = useHistory();
  const { activeBusiness } = useSelector((state: RootState) => state.business);
  useEffect(() => {
    dispatch(listJobOfferByBusinessId(activeBusiness?.id ?? 0));
  }, []);

  useEffect(() => {
    dispatch({ type: "job-offer-inactive" });
  }, []);

  if (!activeBusiness) {
    return <EndTransaction />;
  }

  return (
    <div
      style={{
        display: "flex",
        margin: "20px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "95%",
          minWidth: "240px",
          maxWidth: "900px",
        }}
      >
        <div className="card w-100">
          <div className="card-header">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h2>Ofertas de trabajo de la empresa '{activeBusiness?.name}'</h2>
              <button className="btn btn-info" onClick={() => history.goBack()}>
                Regresar
              </button>
            </div>
            <button
              className="btn btn-success w-100 mt-2"
              onClick={() => history.push("/job-offer/add")}
            >
              Agregar oferta de trabajo
            </button>
          </div>
          <div className="card-body">
            {jobOfferList !== undefined && jobOfferList.length > 0 ? (
              <div className="table-responsive" style={{ width: "100%" }}>
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Cargo</th>
                      <th scope="col">Validez oferta</th>
                      <th scope="col">N° Vacantes</th>
                      <th scope="col">Editar oferta</th>
                      <th scope="col">Postulantes</th>
                      <th scope="col">Habilitar/deshabilitar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobOfferList?.map((jobOffer, index) => (
                      <JobOfferSuperItem key={index} jobOffer={jobOffer} />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="alert alert-warning">
                No hay ofertas de trabajo disponibles
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
