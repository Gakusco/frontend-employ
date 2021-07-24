import React from 'react'
import { Postulant } from '../response/response';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

interface Props {
  postulant: Postulant;
}

export const PostulantActiveItem = ({postulant}: Props) => {
  
  return (
    <tr>
      <th scope="row">{postulant.id}</th>
      <td>{postulant.name}</td>
      <td>
        {postulant.lastName}
      </td>
      <td>{postulant.email}</td>
      <td>{postulant.web}</td>
      <td>{postulant.phoneNumber}</td>
      <td>{postulant.run}</td>
      <td>{postulant.dateOfBirth}</td>
      <td>{postulant.curriculumVitae}</td>
    </tr>
  );
}
