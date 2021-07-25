import React from "react";
import { Postulant } from "../response/response";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { togglePostulant } from "../actions/postulant";
import { downloadFile } from "../services/uploadFile";

interface Props {
  postulant: Postulant;
}

const baseURL = process.env.REACT_APP_API_EMPLOYMENT;

export const PostulantItem = ({ postulant }: Props) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <th scope="row">{postulant.id}</th>
      <td>{postulant.name}</td>
      <td>{postulant.lastName}</td>
      <td>{postulant.email}</td>
      <td>{postulant.web}</td>
      <td>{postulant.phoneNumber}</td>
      <td>{postulant.run}</td>
      <td>{postulant.dateOfBirth}</td>
      <td>
        <a
          href={`${baseURL}/auth/download/${postulant.curriculumVitae}`}
          className="btn btn-danger"
        >
          <i className="fa fa-file-pdf-o" />
        </a>
      </td>
      <td>
        {postulant?.credential?.enabled === true ? (
          <button className="btn btn-danger" title="deshabilitar">
            <i
              className="fa fa-times"
              onClick={() => dispatch(togglePostulant(postulant))}
            ></i>
          </button>
        ) : (
          <button className="btn btn-success" title="habilitar">
            <i
              className="fa fa-check"
              onClick={() => dispatch(togglePostulant(postulant))}
            ></i>
          </button>
        )}
      </td>
    </tr>
  );
};
