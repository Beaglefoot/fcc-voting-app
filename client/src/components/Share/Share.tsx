import * as React from 'react';
import classNames from 'classnames';
import * as SR from 'react-share';

import { share } from './Share.scss';

interface IProps {
  size: number;
  className?: string;
}

const Share = ({ className, size }: IProps) => (
  <div className={classNames(share, className)}>
    <SR.FacebookShareButton url={location.href}>
      <SR.FacebookIcon size={size} round />
    </SR.FacebookShareButton>

    <SR.TwitterShareButton url={location.href}>
      <SR.TwitterIcon size={size} round />
    </SR.TwitterShareButton>

    <SR.TelegramShareButton url={location.href}>
      <SR.TelegramIcon size={size} round />
    </SR.TelegramShareButton>

    <SR.GooglePlusShareButton url={location.href}>
      <SR.GooglePlusIcon size={size} round />
    </SR.GooglePlusShareButton>

    <SR.VKShareButton url={location.href}>
      <SR.VKIcon size={size} round />
    </SR.VKShareButton>

    <SR.RedditShareButton url={location.href}>
      <SR.RedditIcon size={size} round />
    </SR.RedditShareButton>

    <SR.MailruShareButton url={location.href}>
      <SR.MailruIcon size={size} round />
    </SR.MailruShareButton>

    <SR.EmailShareButton url={location.href}>
      <SR.EmailIcon size={size} round />
    </SR.EmailShareButton>
  </div>
);

export default Share;
