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
      console.log('im here2');
      
      return { ...state, userAuthorized: action.payload };
    }

    default:
      return state;
  }
};

export { mainReducer };
