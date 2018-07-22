import * as React from 'react';
import { match } from 'react-router-dom';

interface IProps {
  match: match<{ pollID: string }>;
}

const Poll = ({ match }: IProps) => <div>{match.params.pollID}</div>;

export default Poll;
