import * as React from 'react';
import classNames from 'classnames';
import { spinner, path } from './Spinner.scss';

interface IProps {
  className?: string;
}

const Spinner = (props: IProps) => (
  <svg className={classNames(spinner, props.className)} viewBox="0 0 50 50">
    <circle
      className={path}
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="5"
    />
  </svg>
);

export default Spinner;
