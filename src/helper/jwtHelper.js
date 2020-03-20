import jwtDecode from "jwt-decode";

const jwtLocalStorageVariableName = "toeflJwt";

export const setJwt = jwt => {
  if (!jwt) return;
  sessionStorage.setItem(jwtLocalStorageVariableName, jwt);
};

export const removeJwt = () =>
  sessionStorage.removeItem(jwtLocalStorageVariableName);

export const validateJwt = () => {
  const jwt = sessionStorage.getItem(jwtLocalStorageVariableName);

  if (!jwt) throw new Error("No jwt");

  const jwtExpire = jwtDecode(jwt).exp;
  const currentTime = new Date().getTime();

  // new Date().getTime() return millisecond(1/1000 second)
  if (jwtExpire > currentTime / 1000) return true;
  return false;
};
