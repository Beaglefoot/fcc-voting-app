import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { TAuth } from 'src/state/state';
import {
  createPoll,
  form,
  title,
  fieldsList,
  field,
  input,
  label,
  line,
  plus
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

  addField = () =>
    this.setState(({ numOfFields }) => ({ numOfFields: numOfFields + 1 }));

  render() {
    const {
      auth: { fetchStatus, data, error }
    } = this.props;

    if (fetchStatus === 'done' && data.ip && !data._id)
      return <Redirect to="/" />;
    if (fetchStatus === 'error') return <div>{error}</div>;

    return (
      <div className={createPoll}>
        <h2 className={title}>Create A New Poll</h2>

        <form className={form}>
          <ul className={fieldsList}>
            {Array.from({ length: this.state.numOfFields }).map((_, i) => (
              <li key={i} className={field}>
                <input type="text" name="name" required className={input} />
                <label className={label}>{i ? 'Answer' : 'Title'}</label>
                <div className={line} />
              </li>
            ))}

            <li className={field}>
              <div className={plus} onClick={this.addField}>
                &#x271A;
              </div>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default connect(({ auth }: IProps) => ({ auth }))(CreatePoll);
