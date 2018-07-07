const throwUnauth = (): never => {
  throw Object.assign(new Error('Unauthorized access.'), {
    httpStatusCode: 401
  });
};

export default throwUnauth;
