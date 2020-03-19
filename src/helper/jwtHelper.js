import jwtDecode from "jwt-decode";

const jwtLocalStorageVariableName = "toeflJwt";

export const getJwt = () => sessionStorage.getItem(jwtLocalStorageVariableName);

export const setJwt = jwt => {
  if (typeof jwt === "undefined") return false;
  sessionStorage.setItem(jwtLocalStorageVariableName, jwt);
  return true;
};

export const removeJwt = () => {
  sessionStorage.removeItem(jwtLocalStorageVariableName);
  return true;
};

export const jwtExpiryValidate = () => {
  const jwt = getJwt();

  if (!jwt) return new Error("No jwt");

  const decodedJwt = jwtDecode(jwt);
  const currentTime = new Date().getTime();

  // new Date().getTime() return millisecond(1/1000 second)
  if (decodedJwt.exp > currentTime / 1000) return true;
  return false;
};
