import * as React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RouterProps } from 'react-router';
import { AxiosResponse } from 'axios';

import { createPoll } from 'src/actions/createPoll';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import Spinner from 'src/components/Spinner/Spinner';
import { TAuth, TPollCreation, IState as IGlobalState } from 'src/state/state';
import {
  createPoll as createPollClass,
  form,
  title,
  fieldsList,
  field,
  input,
  label,
  line,
  plus,
  button
} from './CreatePoll.scss';

interface IProps extends RouterProps {
  auth: TAuth;
  pollCreation: TPollCreation;
  createPoll: ThunkActionFunctionCreator;
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

  addField: React.MouseEventHandler = e => {
    e.preventDefault();
    this.setState(({ numOfFields }) => ({ numOfFields: numOfFields + 1 }));
  };

  handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();

    const formData = Array.from(
      new FormData(e.target as HTMLFormElement).entries()
    ).reduce(
      (result, [name, value]) => {
        if (name === 'options') result.options.push({ name: value });
        else if (name === 'title') result.title = value as string;
        return result;
      },
      { title: '', options: [] }
    );

    const redirectToNewPoll = (res: AxiosResponse) => {
      if (res.data._id) this.props.history.push(`/polls/${res.data._id}`);
    };

    this.props.createPoll(null, formData, redirectToNewPoll);
  };

  render() {
    const { auth, pollCreation } = this.props;

    if (auth.fetchStatus === 'done' && auth.data.ip && !auth.data._id)
      return <Redirect to="/" />;
    if (auth.fetchStatus === 'error') return <div>{auth.error}</div>;

    return (
      <div className={createPollClass}>
        <h2 className={title}>Create A New Poll</h2>

        {{
          done: () => (
            <form className={form} onSubmit={this.handleSubmit}>
              <ul className={fieldsList}>
                {Array.from({ length: this.state.numOfFields }).map((_, i) => (
                  <li key={i} className={field}>
                    <input
                      type="text"
                      name={i ? 'options' : 'title'}
                      required
                      className={input}
                    />
                    <label className={label}>{i ? 'Answer' : 'Title'}</label>
                    <div className={line} />
                  </li>
                ))}

                <li className={field}>
                  <button
                    className={classNames(button, plus)}
                    onClick={this.addField}
                  >
                    &#x271A;
                  </button>
                </li>

                <li className={field}>
                  <input type="submit" className={button} />
                </li>
              </ul>
            </form>
          ),

          pending: () => <Spinner />,
          error: () => <div>{pollCreation.error}</div>
        }[pollCreation.fetchStatus]()}
      </div>
    );
  }
}

export default connect(
  ({ auth, pollCreation }: IGlobalState) => ({
    auth,
    pollCreation
  }),
  { createPoll }
)(CreatePoll);
