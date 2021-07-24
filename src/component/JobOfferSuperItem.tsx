import { JobOffer } from '../response/response';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toggleJobOfferSuper } from '../actions/jobOfferSuper';
import dayjs from 'dayjs';


interface Props {
  jobOffer: JobOffer;
}

export const JobOfferSuperItem = ({jobOffer}: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const navigateUpdate = () => {
    dispatch({ type: "job-offer-active", payload: jobOffer });
    history.push("/job-offer/add");
  };

  const navigateApplicants = () => {
    dispatch({ type: "job-offer-active", payload: jobOffer });
    history.push("/job-offer/applicants");
  };

  return (
    <tr>
      <th scope="row">{jobOffer.id}</th>
      <td>{jobOffer.responsabilities}</td>
      <td>
        {jobOffer.position}
      </td>
      <td>{dayjs(jobOffer.validDate).format("DD-MM-YYYY")}</td>
      <td>{jobOffer.vacancyNumbers}</td>
      <td>
        <button
          className={jobOffer.enabled ? "btn btn-primary" : "btn btn-secondary"}
          disabled={!jobOffer.enabled}
          onClick={navigateUpdate}
        >
          <i className="fa fa-pencil-square-o"></i>
        </button>
      </td>
      <td>
        <button
          className={jobOffer.enabled ? "btn btn-warning" : "btn btn-secondary"}
          disabled={!jobOffer.enabled}
          onClick={navigateApplicants}
        >
          <i className="fa fa-user"></i>
        </button>
      </td>
      <td>
        {jobOffer?.enabled === true ? (
          <button className="btn btn-danger" title="deshabilitar">
            <i
              className="fa fa-times"
              onClick={() => dispatch(toggleJobOfferSuper(jobOffer.id))}
            ></i>
          </button>
        ) : (
          <button className="btn btn-success" title="habilitar">
            <i
              className="fa fa-check"
              onClick={() => dispatch(toggleJobOfferSuper(jobOffer.id))}
            ></i>
          </button>
        )}
      </td>
    </tr>
  );
}