import { Business } from "../response/response";

export interface BusinessState {
  businessList: Business[];
  errors: string[];
  activeBusiness?: Business;
}

export type businessAction =
  | { type: "business-list"; payload: Business[] }
  | { type: "business-save"; payload: Business }
  | { type: "business-update"; payload: Business }
  | { type: "business-toggle"; payload: Business }
  | { type: "business-with-errors"; payload: string[]}
  | { type: "business-without-errors";}
  | { type: "business-active", payload: Business}
  | { type: "business-inactive";};

const initialState: BusinessState = {
  businessList: [],
  errors: [],
  activeBusiness: undefined,
};

export const businessReducer = (
  state: BusinessState = initialState,
  action: businessAction
): BusinessState => {
  switch (action.type) {
    case "business-list":
      return {
        ...state,
        businessList: action.payload,
      };
    case "business-save":
      return {
        ...state,
        businessList: [...state.businessList, action.payload],
      };
    case "business-update":
      return {
        ...state,
        businessList: state.businessList.map((business) =>
          business.id === action.payload.id ? action.payload : business
        ),
      };
    case "business-with-errors":
      return {
        ...state,
        errors: action.payload
      }
    case "business-without-errors":
      return {
        ...state,
        errors: []
      }
    case "business-active":
      return {
        ...state,
        activeBusiness: action.payload
      }
    case "business-inactive":
      return {
        ...state,
        activeBusiness: undefined,
      }
    default:
      return state;
  }
};
