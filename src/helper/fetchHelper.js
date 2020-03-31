import * as jwtHelper from "./jwtHelper";

const makeCustomHeader = jwt => {
  const customHeader = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  if (jwt) customHeader.Authorization = "Bearer ".concat(jwt);

  return customHeader;
};

const API_CALL_PAYLOAD = {
  url: "",
  method: "",
  body: {}
};

// Make http request with fetch api.
const fetchHelper = (payload = API_CALL_PAYLOAD) => {
  return fetch(payload.url, {
    headers: makeCustomHeader(jwtHelper.getJwt()),
    method: payload.method,
    body: JSON.stringify(payload.body)
  }).then(response => {
    if (response.ok) return response.json();
    return new Error("Server error");
  });
};

export default fetchHelper;
