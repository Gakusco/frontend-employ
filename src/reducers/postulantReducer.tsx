import { Postulant } from "../response/response";

export interface PostulantState {
  postulantList: Postulant[];
  errors: string[];
  activePostulant?: Postulant;
}

export type postulantAction =
  | { type: "postulant-list"; payload: Postulant[] }
  | { type: "postulant-save"; payload: Postulant }
  | { type: "postulant-update"; payload: Postulant }
  | { type: "postulant-toggle"; payload: Postulant }
  | { type: "postulant-with-errors"; payload: string[] }
  | { type: "postulant-without-errors" }
  | { type: "postulant-active"; payload: Postulant }
  | { type: "postulant-inactive" };

const initialState: PostulantState = {
  postulantList: [],
  errors: [],
  activePostulant: undefined,
};

export const postulantReducer = (
  state: PostulantState = initialState,
  action: postulantAction
): PostulantState => {
  switch (action.type) {
    case "postulant-list":
      return {
        ...state,
        postulantList: action.payload,
      };
    case "postulant-save":
      return {
        ...state,
        postulantList: [...state.postulantList, action.payload],
      };
    case "postulant-update":
      return {
        ...state,
        postulantList: state.postulantList.map((postulant) =>
          postulant.id === action.payload.id ? action.payload : postulant
        ),
      };
    case "postulant-with-errors":
      return {
        ...state,
        errors: action.payload,
      };
    case "postulant-without-errors":
      return {
        ...state,
        errors: [],
      };
    case "postulant-active":
      return {
        ...state,
        activePostulant: action.payload,
      };
    case "postulant-inactive":
      return {
        ...state,
        activePostulant: undefined,
      };
    default:
      return state;
  }
};
