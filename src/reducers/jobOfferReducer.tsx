import { JobOfferListRS } from "../response/response";
export interface JobOfferState {
  data?: JobOfferListRS;
  myoffer?: JobOfferListRS;
  navigateMyApplications?: boolean;
}

export type jobOfferAction =
  | { type: "job-offer-save-list"; payload: JobOfferState }
  | { type: "my-job-offer-save-list"; payload: JobOfferState }
  | { type: "navigation-my-applications-true" }
  | { type: "navigation-my-applications-false" };

const initialState: JobOfferState = {
  data: undefined,
  myoffer: undefined,
  navigateMyApplications: false,
};

export const jobOfferReducer = (
  state: JobOfferState = initialState,
  action: jobOfferAction
): JobOfferState => {
  switch (action.type) {
    case "job-offer-save-list":
      return {
        ...state,
        data: action.payload.data,
      };
    case "my-job-offer-save-list":
      return {
        ...state,
        myoffer: action.payload.data,
      };
    case "navigation-my-applications-true":
      return {
        ...state,
        navigateMyApplications: true,
      };
    case "navigation-my-applications-false":
      return {
        ...state,
        navigateMyApplications: false,
      };
    default:
      return state;
  }
};
