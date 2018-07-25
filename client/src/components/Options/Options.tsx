import * as React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { IOption, TAuth } from 'src/state/state';
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

  isAuth() {
    const { auth } = this.props;
    return auth.fetchStatus === 'done' && auth.data;
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
    const { options, className } = this.props;
    const { additionalOptions } = this.state;

    return (
      <form className={classNames(form, className)}>
        <h3 className={title}>Vote for:</h3>

        <ul className={optionList}>
          {[...options, ...additionalOptions].map((option, i) => (
            <li key={i}>
              <input className={optionClass} type="radio" name="vote" />
              <label>{option.name}</label>
            </li>
          ))}

          {this.isAuth() && this.addOption()}
        </ul>

        <input className={submit} type="submit" value="Submit" />
      </form>
    );
  }
}

export default connect(({ auth }: IProps) => ({ auth }))(Options);
