import express from 'express';

const renderMainPage: express.Handler = (_, res) => {
  res.render('index', {}, (err, html) => {
    res.send(html);
  });
};

export default renderMainPage;
