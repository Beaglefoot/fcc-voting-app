import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { TAuth } from 'src/state/state';
import {
  form,
  title,
  fieldsList,
  field,
  input,
  label,
  line
} from './CreatePoll.scss';

interface IProps {
  auth: TAuth;
}

interface IState {
  numOfFields: number;
}

class CreatePoll extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      numOfFields: 3
    };
  }

  render() {
    const {
      auth: { fetchStatus, data, error }
    } = this.props;

    if (fetchStatus === 'done' && data.ip && !data._id)
      return <Redirect to="/" />;
    if (fetchStatus === 'error') return <div>{error}</div>;

    return (
      <form className={form}>
        <h2 className={title}>Create A New Poll</h2>
        <ul className={fieldsList}>
          {Array.from({ length: this.state.numOfFields }).map((_, i) => (
            <li key={i} className={field}>
              <input type="text" name="name" required className={input} />
              <label className={label}>{i ? 'Answer' : 'Title'}</label>
              <div className={line} />
            </li>
          ))}
        </ul>
      </form>
    );
  }
}

export default connect(({ auth }: IProps) => ({ auth }))(CreatePoll);
