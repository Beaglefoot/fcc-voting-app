import * as React from 'react';
import { connect } from 'react-redux';

import { container } from './App.scss';

export interface IProps {
  msg: string;
}

const App = (props: IProps) => {
  return (
    <div className={container}>
      <h1>fcc-voting-app</h1>
      <p>{props.msg}</p>
    </div>
  );
};

const mapStateToProps = ({ msg }: IProps) => ({ msg });

export default connect(mapStateToProps)(App);
