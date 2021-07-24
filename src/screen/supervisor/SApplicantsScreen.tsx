import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { PostulantItem } from "../../component/PostulantItem";
import { listPostulant } from "../../actions/postulant";

export const SApplicantsScreen = () => {
  const dispatch = useDispatch();
  const { postulantList } = useSelector((state: RootState) => state.postulant);

  useEffect(() => {
    dispatch(listPostulant());
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
            <h2>Usuarios</h2>
          </div>
          {postulantList !== undefined && postulantList?.length > 0 ? (
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
                      <th scope="col">Habilitar/deshabilitar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {postulantList?.map((postulant, index) => (
                      <PostulantItem key={index} postulant={postulant} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning">
              No hay usuarios disponibles
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
