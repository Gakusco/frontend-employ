import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toggleBusiness } from "../actions/business";
import { Business } from "../response/response";

interface Props {
  business: Business;
}

export const BusinessItem = ({ business }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const navigateUpdate = () => {
    dispatch({ type: "business-active", payload: business });
    history.push("/business/add");
  };

  return (
    <tr>
      <th scope="row">{business.id}</th>
      <td>{business.name}</td>
      <td>
        {business?.aboutUs?.length > 10
          ? business.aboutUs.substring(0, 10).concat("...")
          : business.aboutUs}
      </td>
      <td>{business.email}</td>
      <td>
        <button
          className={business.enable ? "btn btn-primary" : "btn btn-secondary"}
          disabled={!business.enable}
          onClick={navigateUpdate}
        >
          <i className="fa fa-pencil-square-o"></i>
        </button>
      </td>
      <td>
        <button
          className={business.enable ? "btn btn-info" : "btn btn-secondary"}
          disabled={!business.enable}
          onClick={() => {
            dispatch({ type: "business-active", payload: business });
            history.push("/job-offers");
          }}
        >
          <i className="fa fa-building-o"></i>
        </button>
      </td>
      <td>
        {business?.enable === true ? (
          <button className="btn btn-danger" title="deshabilitar">
            <i
              className="fa fa-times"
              onClick={() => dispatch(toggleBusiness(business))}
            ></i>
          </button>
        ) : (
          <button className="btn btn-success" title="habilitar">
            <i
              className="fa fa-check"
              onClick={() => dispatch(toggleBusiness(business))}
            ></i>
          </button>
        )}
      </td>
    </tr>
  );
};
