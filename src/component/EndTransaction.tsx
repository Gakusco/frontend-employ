import React from "react";
import { useLocation } from "react-router-dom";

export const EndTransaction = () => {
  const location = useLocation();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h3>
        La transacción en la dirección <code>{location.pathname}</code> ha
        terminado
      </h3>
    </div>
  );
};
