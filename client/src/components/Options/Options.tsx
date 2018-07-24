import * as React from 'react';
import classNames from 'classnames';

import { IOption } from 'src/state/state';
import {
  form,
  option as optionClass,
  title,
  input,
  plus
} from './Options.scss';

interface IProps {
  options: IOption[];
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
    }
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.inputValue = e.target.value;
  };

  handlePlusClick: React.MouseEventHandler = () => {
    this.setState(prevState => ({ isEditing: true }));
  };

  render() {
    const { options } = this.props;
    const { isEditing, additionalOptions } = this.state;

    return (
      <form className={form}>
        <h3 className={title}>Vote for:</h3>

        {[...options, ...additionalOptions].map((option, i) => (
          <React.Fragment key={i}>
            <input className={optionClass} type="radio" name="vote" />
            <label>{option.name}</label>
            <br />
          </React.Fragment>
        ))}

        {isEditing ? (
          <input
            className={input}
            type="text"
            placeholder="Add option"
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
          />
        ) : (
          <div
            className={classNames(optionClass, plus)}
            onClick={this.handlePlusClick}
          >
            &#x271A;
          </div>
        )}
      </form>
    );
  }
}

export default Options;
