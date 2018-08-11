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

class Alert extends React.Component<IProps> {
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp: EventListener = (e: KeyboardEvent) => {
    if (e.key.toLocaleLowerCase() === 'escape')
      (this.props.onCancel as () => {})();
  };

  render() {
    const {
      className,
      children,
      okClass,
      onOk,
      cancelClass,
      onCancel
    } = this.props;

    return (
      <div className={classNames(alert, className)}>
        <div className={container}>
          <div className={message}>{children}</div>
          <button className={classNames(button, ok, okClass)} onClick={onOk}>
            OK
          </button>
          <button
            className={classNames(button, cancel, cancelClass)}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default Alert;
