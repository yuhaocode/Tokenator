import { FIND_TOKEN_SUCCESS } from "../actions/index";
import { FIND_TOKEN_FAILURE } from "../actions/index";
import { CREATE_TOKEN_SUCCESS } from "../actions/index";

const initialState = {
  failure: false,
  pan: "",
  expr: "",
  success: false,
  san: "",
  sanExpr: "",
  sanSuccess: false
};

const forToken = (state = initialState, action) => {
  switch (action.type) {
    case FIND_TOKEN_SUCCESS:
      return {
        ...state,
        pan: action.payload.pan,
        expr: action.payload.expr,
        failure: false,
        success: true
      };
    case FIND_TOKEN_FAILURE:
      return {
        ...state,
        failure: true,
        success: false
      };
    case CREATE_TOKEN_SUCCESS:
      return {
        ...state,
        san: action.payload.san,
        sanExpr: action.payload.sanExpr,
        sanSuccess: true
      };
    default:
      return state;
  }
};
export default forToken;
