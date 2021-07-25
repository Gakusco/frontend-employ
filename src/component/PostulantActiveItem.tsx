import React from "react";
import { Postulant } from "../response/response";

interface Props {
  postulant: Postulant;
}

const baseURL = process.env.REACT_APP_API_EMPLOYMENT;

export const PostulantActiveItem = ({ postulant }: Props) => {
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
    </tr>
  );
};
