import React from 'react';
import Link from 'gatsby-link';
import { NavbarItem } from 'bloomer';

class NavbarItemGastbyLink extends React.PureComponent {
  subRender = props => {
    const { href, children } = props;
    return (
      <Link {...props} to={href}>
        {children}
      </Link>
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

export default NavbarItemGastbyLink;
