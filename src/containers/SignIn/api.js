import fetchHelper from "../../helper/fetchHelper";

const callSignInApi = async ({
  id,
  password,
  apiCallStart,
  apiCallSuccess,
  apiCallFailure
}) => {
  apiCallStart();

  await fetchHelper
    .post(`/login`, { id, password })
    .then(response => apiCallSuccess(response))
    .catch(() => apiCallFailure());
};

export default callSignInApi;
