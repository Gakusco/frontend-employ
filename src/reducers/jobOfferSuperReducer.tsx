import { JobOffer, Postulant } from "../response/response";

export interface JobOfferSuperState {
  jobOfferList: JobOffer[];
  errors: string[];
  activeJobOffer?: JobOffer;
  postulantListActive?: Postulant[];
}

export type jobOfferSuperAction =
  | { type: "job-offer-list"; payload: JobOffer[] }
  | { type: "job-offer-save"; payload: JobOffer }
  | { type: "job-offer-update"; payload: JobOffer }
  | { type: "job-offer-toggle"; payload: JobOffer }
  | { type: "job-offer-with-errors"; payload: string[] }
  | { type: "job-offer-without-errors" }
  | { type: "job-offer-active"; payload: JobOffer }
  | { type: "job-offer-inactive" }
  | { type: "job-offer-postulant-active"; payload: Postulant[] }
  | { type: "job-offer-postulant-inactive" };

const initialState: JobOfferSuperState = {
  jobOfferList: [],
  errors: [],
  activeJobOffer: undefined,
};

export const jobOfferSuperReducer = (
  state: JobOfferSuperState = initialState,
  action: jobOfferSuperAction
): JobOfferSuperState => {
  switch (action.type) {
    case "job-offer-list":
      return {
        ...state,
        jobOfferList: action.payload,
      };
    case "job-offer-save":
      return {
        ...state,
        jobOfferList: [...state.jobOfferList, action.payload],
      };
    case "job-offer-update":
      return {
        ...state,
        jobOfferList: state.jobOfferList.map((jobOffer) =>
          jobOffer.id === action.payload.id ? action.payload : jobOffer
        ),
      };
    case "job-offer-with-errors":
      return {
        ...state,
        errors: action.payload,
      };
    case "job-offer-without-errors":
      return {
        ...state,
        errors: [],
      };
    case "job-offer-active":
      return {
        ...state,
        activeJobOffer: action.payload,
      };
    case "job-offer-inactive":
      return {
        ...state,
        activeJobOffer: undefined,
      };
    case "job-offer-postulant-active":
      return {
        ...state,
        postulantListActive: action.payload,
      };
    case "job-offer-postulant-inactive":
      return {
        ...state,
        postulantListActive: undefined,
      };
    default:
      return state;
  }
};
