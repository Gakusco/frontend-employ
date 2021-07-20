export interface AuthState {
  data?: Data;
}

interface Data {
  access_token: string;
  role: string[];
  credentialId: number;
}

export type authAction =
  | {
      type: "save";
      payload: AuthState;
    }
  | {
      type: "clear";
    };

const initialState: AuthState = {
  data: undefined
}

export const authReducer = (
  state: AuthState = initialState,
  action: authAction
): AuthState => {
  switch (action.type) {
    case "save":
      return {
        ...state,
        data: action.payload.data,
      };
    case "clear":
      return {data: undefined};
    default:
      return state;
  }
};
