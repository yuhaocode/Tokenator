import axios from "axios";

export const FIND_TOKEN_FAILURE = "FIND_TOKEN_FAILURE";
export const FIND_TOKEN_SUCCESS = "FIND_TOKEN_SUCCESS";

export const FIND_TOKEN_LIST = "FIND_TOKEN_LIST";

export const CREATE_TOKEN_SUCCESS = "CREATE_TOKEN_SUCCESS";

export const CREATE_TOKEN_LIST_SUCCESS = "CREATE_TOKEN_LIST_SUCCESS";

export function findTokenFailure() {
  return {
    type: FIND_TOKEN_FAILURE
  };
}

export function findTokenSuccess(data) {
  return {
    type: FIND_TOKEN_SUCCESS,
    payload: {
      pan: data.pan,
      expr: data.expr
    }
  };
}

export function submitOneToken(token, expr, dispatch) {
  axios({
    method: "get",
    url: "http://localhost:4343/api/primaries/surrogates/" + token + "/" + expr,
    headers: { "Access-Control-Allow-Origin": "*" }
  })
    .then(function(response) {
      console.log(response);
      dispatch(findTokenSuccess(response.data));
    })
    .catch(e => {
      console.log(e);
      dispatch(findTokenFailure());
    });
}

export function findTokenList(result) {
  return {
    type: FIND_TOKEN_LIST,
    payload: {
      primaryList: result
    }
  };
}

export function submitTokenList(list, dispatch) {
  var payload = { param: [] };

  for (var i = 0; i < list.length; i += 2) {
    var s = "".concat(list[i], "/", list[i + 1]);
    console.log(s);
    payload.param.push(s);
  }
  axios({
    method: "post",
    url: "http://localhost:4343/api/primaries/findAll",
    params: payload,
    headers: { "Access-Control-Allow-Origin": "*" }
  })
    .then(function(response) {
      console.log(response);
      dispatch(findTokenList(response.data));
    })
    .catch(e => {
      console.log(e);
    });
}

export function createTokenSuccess(data) {
  return {
    type: CREATE_TOKEN_SUCCESS,
    payload: {
      san: data.san,
      sanExpr: data.expr
    }
  };
}

export function createToken(credit, year, month, length, dispatch) {
  console.log(year + month);
  axios({
    method: "post",
    url: "http://localhost:4343/api/primaries?i=" + length,
    data: {
      pan: credit,
      expr: year + month
    },
    headers: { "Access-Control-Allow-Origin": "*" }
  })
    .then(function(response) {
      console.log(response);
      dispatch(createTokenSuccess(response.data));
    })
    .catch(e => {
      console.log(e);
    });
}

export function createTokenListSuccess(data) {
  return {
    type: CREATE_TOKEN_LIST_SUCCESS,
    payload: {
      tokenList: data
    }
  };
}

export function createListToken(list, dispatch) {
  var payload = { param: [] };

  for (var i = 0; i < list.length; i += 3) {
    var s = "".concat(list[i], "/", list[i + 1], "/", list[i + 2]);
    console.log(s);
    payload.param.push(s);
  }
  axios({
    method: "post",
    url: "http://localhost:4343/api/primaries/submitAll",
    params: payload,
    headers: { "Access-Control-Allow-Origin": "*" }
  })
    .then(function(response) {
      dispatch(createTokenListSuccess(response.data));
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
}
