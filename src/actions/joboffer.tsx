import { jobOfferAction } from '../reducers/jobOfferReducer';
import employApi from '../api/employApi';


export const listJobOffer = () => {
  return async (dispatch: (value: jobOfferAction) => void) => {
    try {
      const { data, status } = await employApi.get("/job-offer/list");
      if (status === 200) {
        dispatch({type: 'job-offer-save-list', payload: {data: data}});
      }
    } catch (error) {
      console.log(JSON.stringify(error.response.data, null, 3));
    }
  }
}