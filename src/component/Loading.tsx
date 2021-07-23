import React from "react";
import Loader from "react-loader-spinner";
import { cyanDark } from "../helpers/Constants";

export const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader type="TailSpin" color={cyanDark} height={100} width={100} />
    </div>
  );
};
