import { JobOfferListRS } from "../response/response";
export interface JobOfferState {
  data?: JobOfferListRS;
}

export type jobOfferAction = { type: "job-offer-save-list"; payload: JobOfferState };

const initialState: JobOfferState = {
  data: undefined,
};

export const jobOfferReducer = (
  state: JobOfferState = initialState,
  action: jobOfferAction
): JobOfferState => {
  switch (action.type) {
    case "job-offer-save-list":
      return {
        ...state,
        data: action.payload.data
      }
    default:
      return state;
  }
};
