import * as React from 'react';
import classNames from 'classnames';

import { alert, container, message, button, ok, cancel } from './Alert.scss';

interface IProps extends React.Props<HTMLElement> {
  className?: string;
  onOk: React.EventHandler<React.MouseEvent>;
  onCancel: React.EventHandler<React.MouseEvent>;
  okClass?: string;
  cancelClass?: string;
}

const Alert = (props: IProps) => (
  <div className={classNames(alert, props.className)}>
    <div className={container}>
      <div className={message}>{props.children}</div>
      <button
        className={classNames(button, ok, props.okClass)}
        onClick={props.onOk}
      >
        OK
      </button>
      <button
        className={classNames(button, cancel, props.cancelClass)}
        onClick={props.onCancel}
      >
        Cancel
      </button>
    </div>
  </div>
);

export default Alert;
