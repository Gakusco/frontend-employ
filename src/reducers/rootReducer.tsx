import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { jobOfferReducer } from "./jobOfferReducer";
import { businessReducer } from './businessReducer';
import { postulantReducer } from './postulantReducer';
import { jobOfferSuperReducer } from './jobOfferSuperReducer';

// export interface RootState {
//   auth: AuthState;
// }

export const rootReducer = combineReducers({
  auth: authReducer,
  joboffer: jobOfferReducer,
  business: businessReducer,
  postulant: postulantReducer,
  jobOfferSuper: jobOfferSuperReducer
});
