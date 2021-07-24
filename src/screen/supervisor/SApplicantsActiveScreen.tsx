import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { jobOfferListPostulant } from "../../actions/jobOfferSuper";
import { useEffect } from "react";
import { PostulantActiveItem } from "../../component/PostulantActiveItem";
import { useHistory } from "react-router-dom";

export const SApplicantsActiveScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { activeJobOffer, postulantListActive } = useSelector(
    (state: RootState) => state.jobOfferSuper
  );

  useEffect(() => {
    dispatch(jobOfferListPostulant(activeJobOffer?.id ?? 0));
  }, []);
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
          maxWidth: "1300px",
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
              <h2>Postulantes de la oferta de trabajo</h2>
              <button
                className="btn btn-info"
                onClick={() => history.goBack()}
              >
                Regresar
              </button>
            </div>
          </div>
          {postulantListActive !== undefined &&
          postulantListActive?.length > 0 ? (
            <div className="card-body">
              <div className="table-responsive" style={{ width: "100%" }}>
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Correo</th>
                      <th scope="col">web</th>
                      <th scope="col">Número teléfono</th>
                      <th scope="col">R.U.N</th>
                      <th scope="col">Fecha nacimiento</th>
                      <th scope="col">Curriculum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {postulantListActive?.map((postulant, index) => (
                      <PostulantActiveItem key={index} postulant={postulant} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning">
              No hay postulantes disponibles
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
