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

// Make http request with fetch api.
const base = (method, url, data) => {
  return fetch(url, {
    method,
    headers: customHeader(),
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) return response.json();
      return { error: "Error" };
    })
    .catch(() => ({ error: "Server Error" }));
};

const fetchHelper = {};

["get", "post", "put", "delete"].forEach(method => {
  fetchHelper[method] = base.bind(Object.create(null), method);
});

export default fetchHelper;
