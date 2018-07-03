import _ from 'lodash';
import os from 'os';

const getCurrentIp = (): string =>
  _.chain(Object.values(os.networkInterfaces()))
    .flatten()
    .find({ family: 'IPv4', internal: false })
    .value().address;

export default getCurrentIp;
