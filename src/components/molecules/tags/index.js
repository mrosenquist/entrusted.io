import React from 'react';
import classNames from 'classnames';
import './index.scss';
import { Tag } from 'bloomer';

const Tags = props => {
  const { tags, className } = props;
  if (!tags) {
    return null;
  }
  return (
    <div className={classNames(className, 'tags')}>
      {tags.map(tag => (
        <Tag isColor="light">{tag}</Tag>
      ))}
    </div>
  );
};

export default Tags;
