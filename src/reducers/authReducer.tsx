export interface AuthState {
  data?: Data;
  isOnline: boolean;
}

interface Data {
  access_token: string;
  role: string[];
  credentialId: number;
  userId: number;
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
  data: undefined,
  isOnline: false,
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
        isOnline: action.payload.isOnline
      };
    case "clear":
      return {data: undefined, isOnline: false};
    default:
      return state;
  }
};
