const callSignInApi = ({ id, password }) => {
  return new Promise(resolve => {
    console.log(id, password);
    resolve({ jwt: "hello" });
  });
};

export default callSignInApi;
