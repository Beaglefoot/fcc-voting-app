import * as React from 'react';

import { notFound, errCode, text } from './NotFound.scss';

const NotFound = () => (
  <div className={notFound}>
    <div className={errCode}>404</div>
    <div className={text}>Not Found</div>
  </div>
);

export default NotFound;
