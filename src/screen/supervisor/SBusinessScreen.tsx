import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { listBusiness } from "../../actions/business";
import { BusinessItem } from "../../component/BusinessItem";
import { RootState } from "../../store/store";

export const SBusinessScreen = () => {
  const dispatch = useDispatch();
  const { businessList } = useSelector((state: RootState) => state.business);
  const history = useHistory();

  useEffect(() => {
    dispatch(listBusiness());
    dispatch({type: "business-inactive"});
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
              <h2>Empresas</h2>
              <button
                className="btn btn-success"
                onClick={() => history.push("/business/add")}
              >
                Agregar empresa
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive" style={{ width: "100%" }}>
              <table className="table text-center">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Editar empresa</th>
                    <th scope="col">Ofertas de trabajo</th>
                    <th scope="col">Habilitar/deshabilitar</th>
                  </tr>
                </thead>
                <tbody>
                  {businessList !== undefined ? (
                    businessList?.map((business, index) => (
                      <BusinessItem key={index} business={business} />
                    ))
                  ) : (
                    <div className="alert alert-warning">
                      No hay empresas disponibles
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
