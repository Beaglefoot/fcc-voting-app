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

class Options extends React.Component<IProps> {
  state: {
    isEditing: boolean;
  };

  inputValue: string;

  constructor(props: IProps) {
    super(props);

    this.inputValue = '';
    this.state = {
      isEditing: false
    };
  }

  handleKeyPress: React.KeyboardEventHandler = e => {
    if (e.charCode === 13) {
      e.preventDefault();

      this.setState(prevState => ({
        ...prevState,
        isEditing: false
      }));
    }
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.inputValue = e.target.value;
  };

  handlePlusClick: React.MouseEventHandler = () => {
    this.setState(prevState => ({ ...prevState, isEditing: true }));
  };

  render() {
    const { options } = this.props;
    const { isEditing } = this.state;

    return (
      <form className={form}>
        <h3 className={title}>Vote for:</h3>

        {options.map((option, i) => (
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
