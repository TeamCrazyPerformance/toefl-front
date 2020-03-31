const API_CALL_LIFE_CYCLE = {
  apiCallPending: () => {},
  apiCallSuccess: () => {},
  // Api call failure means server error not response error
  apiCallFailure: () => {}
};

const apiCallHelper = (
  fetcher = () => new Promise(),
  lifeCycle = API_CALL_LIFE_CYCLE
) => {
  return fetcher
    .then(responseJson => lifeCycle.apiCallSuccess(responseJson))
    .catch(() => lifeCycle.apiCallFailure());
};

export default apiCallHelper;
