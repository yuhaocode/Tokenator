import { combineReducers } from "redux";
import forToken from "./forToken";
import forTokenList from "./forTokenList";

const rootReducer = combineReducers({
  forToken,
  forTokenList
});

export default rootReducer;
