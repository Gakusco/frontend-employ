import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { jobOfferReducer } from "./jobOfferReducer";

// export interface RootState {
//   auth: AuthState;
// }

export const rootReducer = combineReducers({
  auth: authReducer,
  joboffer: jobOfferReducer,
});
