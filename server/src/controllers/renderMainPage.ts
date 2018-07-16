import express from 'express';

const { NODE_ENV, WEBPACK_DEV_SERVER_URL } = process.env;

const renderMainPage: express.Handler = (_, res) => {
  if (process.env.NODE_ENV !== 'production' && WEBPACK_DEV_SERVER_URL)
    res.redirect(WEBPACK_DEV_SERVER_URL);
  else {
    res.render('index', {}, (err, html) => {
      res.send(html);
    });
  }
};

export default renderMainPage;
