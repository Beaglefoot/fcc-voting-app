import countBy from 'lodash/countBy';

const isUniqBy = <T, K extends keyof T>(prop: K, arr: T[]): boolean =>
  !Object.values(countBy(arr, obj => obj[prop])).some(count => count > 1);

export default isUniqBy;
