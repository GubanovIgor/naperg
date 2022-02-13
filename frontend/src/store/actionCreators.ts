import { ACTIONS } from "./actions";

export interface UserAuthorizedActions {
  type: ACTIONS.USER_AUTHORIZED;
  payload: boolean;
}
