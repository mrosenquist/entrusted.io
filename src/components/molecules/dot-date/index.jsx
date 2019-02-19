import React from 'react';
import classNames from 'classnames';
import './index.scss';

const DotDate = props => {
  const { className, date } = props;
  const d = new Date(date);
  const now = new Date();
  console.log(d.toISOString(), now.toISOString());

  const currentYear = now.getFullYear() === d.getFullYear();

  const topDate = currentYear
    ? d.toLocaleDateString('en-GB', { month: 'short' })
    : d.toLocaleDateString('en-GB', { year: 'numeric' });

  const bottomDate = currentYear
    ? d.toLocaleDateString('en-GB', { day: 'numeric' })
    : d.toLocaleDateString('en-GB', { month: 'short' });

  return (
    <div className={classNames(className, 'dot-date')}>
      <div className="dot-date__top">{topDate}</div>
      <div className="dot-date__bottom">{bottomDate}</div>
    </div>
  );
};

export default DotDate;
