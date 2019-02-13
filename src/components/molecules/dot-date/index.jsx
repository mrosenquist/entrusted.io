import React from 'react';
import classNames from 'classnames';
import './index.scss';

const DotDate = props => {
  const { className, top, bottom } = props;
  return (
    <div className={classNames(className, 'dot-date')}>
      <div className="dot-date__top">{top}</div>
      <div className="dot-date__bottom">{bottom}</div>
    </div>
  );
};

export default DotDate;
