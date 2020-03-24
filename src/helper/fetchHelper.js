import * as jwtHelper from "./jwtHelper";

const customHeader = () => {
  if (jwtHelper.getJwt()) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer ".concat(jwtHelper.getJwt())
    };
  }

  return {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
};

const USE_FETCH_PAYLOAD = {
  url: "",
  method: "",
  body: {}
};

const USE_FETCH_LIFE_CYCLE = {
  apiCallPending: () => {},
  apiCallSuccess: () => {},
  // Api call failure means server error not response error
  apiCallFailure: () => {}
};

// Make http request with fetch api.
const fetchHelper = (
  payload = USE_FETCH_PAYLOAD,
  lifeCycle = USE_FETCH_LIFE_CYCLE
) => {
  return fetch(payload.url, {
    headers: customHeader(),
    method: payload.method,
    body: JSON.stringify(payload.body)
  })
    .then(response => {
      if (response.ok) return response.json();
      return new Error("Server error");
    })
    .then(responseJson => lifeCycle.apiCallSuccess(responseJson))
    .catch(() => lifeCycle.apiCallFailure());
};

export default fetchHelper;
