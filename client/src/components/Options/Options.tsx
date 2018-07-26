import * as React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { ActionCreator } from 'redux';

import Spinner from 'src/components/Spinner/Spinner';
import getFormDataAsObject from 'src/helpers/getFormDataAsObject';
import { fetchVote } from 'src/actions/fetchVote';
import cleanVote, { ICleanVote } from 'src/actions/cleanVote';
import { ThunkActionFunctionCreator } from 'src/actions/actions';
import {
  IOption,
  IState as IGlobalState,
  TAuth,
  TVote,
  TSelectedPoll,
  IUser
} from 'src/state/state';
import {
  form,
  optionList,
  option as optionClass,
  title,
  input,
  plus,
  submit
} from './Options.scss';

interface IProps {
  options: IOption[];
  auth: TAuth;
  vote: TVote;
  selectedPoll: TSelectedPoll;
  fetchVote: ThunkActionFunctionCreator;
  cleanVote: ActionCreator<ICleanVote>;
  className?: string;
}

interface IState {
  isEditing: boolean;
  additionalOptions: IOption[];
}

class Options extends React.Component<IProps, IState> {
  inputValue: string;

  constructor(props: IProps) {
    super(props);

    this.inputValue = '';
    this.state = {
      isEditing: false,
      additionalOptions: []
    };
  }

  componentWillUnmount() {
    this.props.cleanVote();
  }

  handleKeyPress: React.KeyboardEventHandler = e => {
    if (e.charCode === 13) {
      e.preventDefault();

      const newOption: IOption = {
        name: this.inputValue,
        votes: 0
      };

      this.setState(prevState => ({
        isEditing: false,
        additionalOptions: [...prevState.additionalOptions, newOption]
      }));

      this.inputValue = '';
    }
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.inputValue = e.target.value;
  };

  handlePlusClick: React.MouseEventHandler = () => {
    this.setState(prevState => ({ isEditing: true }));
  };

  handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();

    const formData = getFormDataAsObject(e.target as HTMLFormElement);
    this.props.fetchVote(
      `/api/polls/${this.props.selectedPoll.data._id}/vote`,
      formData
    );
  };

  isAuth() {
    const { auth } = this.props;
    return auth.fetchStatus === 'done' && auth.data._id;
  }

  isVoted() {
    const { selectedPoll, auth } = this.props;

    return selectedPoll.data.voters.some(
      this.isAuth()
        ? ({ user }) => user === (auth.data as IUser)._id
        : ({ ip }) => ip === auth.data.ip
    );
  }

  addOption() {
    return this.state.isEditing ? (
      <input
        className={input}
        type="text"
        placeholder="Add option"
        onKeyPress={this.handleKeyPress}
        onChange={this.handleChange}
        ref={e => e && e.focus()}
      />
    ) : (
      <div
        className={classNames(optionClass, plus)}
        onClick={this.handlePlusClick}
      >
        &#x271A;
      </div>
    );
  }

  render() {
    const { options, className, vote } = this.props;
    const { additionalOptions } = this.state;

    return (
      <form
        className={classNames(form, className)}
        onSubmit={this.handleSubmit}
      >
        {{
          done: () =>
            !this.isVoted() ? (
              <React.Fragment>
                <h3 className={title}>Vote for:</h3>

                <ul className={optionList}>
                  {[...options, ...additionalOptions].map((option, i) => (
                    <li key={i}>
                      <input
                        className={optionClass}
                        type="radio"
                        name="name"
                        value={option.name}
                      />
                      <label>{option.name}</label>
                    </li>
                  ))}

                  {this.isAuth() && this.addOption()}
                </ul>

                <input className={submit} type="submit" />
              </React.Fragment>
            ) : (
              <div>Thanks for voting!</div>
            ),
          pending: () => <Spinner />,
          error: () => <div>{vote.error}</div>
        }[vote.fetchStatus]()}
      </form>
    );
  }
}

export default connect(
  ({ auth, selectedPoll, vote }: IGlobalState) => ({
    auth,
    selectedPoll,
    vote
  }),
  { fetchVote, cleanVote }
)(Options);
