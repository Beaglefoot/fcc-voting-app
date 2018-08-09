import express from 'express';

const { WEBPACK_DEV_SERVER_URL } = process.env;

const redirectToWebpack: express.Handler = (_, res) => {
  res.redirect(WEBPACK_DEV_SERVER_URL);
};

export default redirectToWebpack;
