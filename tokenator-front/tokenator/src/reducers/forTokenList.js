import { FIND_TOKEN_LIST } from "../actions/index";
import { CREATE_TOKEN_LIST_SUCCESS } from "../actions/index";

const initialState = {
  primarylist: [],
  number: 0,
  tokenlist: []
};

const forTokenList = (state = initialState, action) => {
  switch (action.type) {
    case FIND_TOKEN_LIST:
      return {
        ...state,
        primarylist: action.payload.primaryList,
        number: 1
      };
    case CREATE_TOKEN_LIST_SUCCESS: {
      return {
        ...state,
        tokenlist: action.payload.tokenList
      };
    }
    default:
      return state;
  }
};
export default forTokenList;
