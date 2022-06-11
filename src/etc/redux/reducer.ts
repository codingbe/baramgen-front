import { SET_TOKEN } from "./action";
import { initialState } from "./initialState";

const reducer = (state = initialState, action: { type: string; token: string }) => {
  let clone;
  switch (action.type) {
    case SET_TOKEN:
      clone = Object.assign({}, state);
      clone.token = action.token;
      return clone;
    default:
      return state;
  }
};

export default reducer;
