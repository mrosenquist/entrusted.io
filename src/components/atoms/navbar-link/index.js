import React from 'react';
import GatsbyLink from 'gatsby-link';
import { NavbarItem } from 'bloomer';

class Link extends React.PureComponent {
  subRender = props => {
    const { href, children } = props;
    return (
      <GatsbyLink {...props} to={href} rel="noopener">
        {children}
      </GatsbyLink>
    );
  };

  render = () => {
    const { children } = this.props;
    return (
      <NavbarItem {...this.props} render={this.subRender}>
        {children}
      </NavbarItem>
    );
  };
}

export default Link;
