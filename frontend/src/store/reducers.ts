import { UserAuthorizedActions } from "./actionCreators";
import { ACTIONS } from "./actions";
import { InitialState } from "./initialState";

export type MainReducer = UserAuthorizedActions["payload"];

export type Action = UserAuthorizedActions;

const mainReducer = (
  state: InitialState,
  action: UserAuthorizedActions
): MainReducer | InitialState => {
  switch (action.type) {
    case ACTIONS.USER_AUTHORIZED: {
      return { ...state, userAuthorized: action.payload };
    }

    default:
      return state;
  }
};

export { mainReducer };
