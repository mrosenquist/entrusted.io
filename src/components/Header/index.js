import React from 'react';
import { Navbar, NavbarBrand, NavbarItem, Icon, NavbarBurger, NavbarStart, NavbarEnd, NavbarMenu } from 'bloomer';
import Link from '../NavbarItemGastbyLink';

export default class AppHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { mobileMenuActive: false };
  }

  handleClick = () => {
    const { mobileMenuActive } = this.state;
    this.setState({ mobileMenuActive: !mobileMenuActive });
  };

  render = () => {
    const { mobileMenuActive } = this.state;
    return (
      <Navbar isTransparent>
        <NavbarBrand>
          <Link href="/">
            <img src="/images/entrusted-logo.png" style={{ marginRight: 5 }} alt="Entrusted.io Logo" /> Entrusted
          </Link>
          <NavbarItem href="https://twitter.com/AlgusDark" isHidden="desktop">
            <Icon className="fa fa-github" />
          </NavbarItem>
          <NavbarItem href="https://twitter.com/AlgusDark" isHidden="desktop">
            <Icon className="fa fa-linkedin" />
          </NavbarItem>
          <NavbarBurger isActive={mobileMenuActive} onClick={this.handleClick} />
        </NavbarBrand>
        <NavbarMenu isActive={mobileMenuActive}>
          <NavbarStart>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/policy">Policy</Link>
          </NavbarStart>
          <NavbarEnd>
            <NavbarItem href="https://github.com/mrosenquist/entrusted.io" isHidden="touch">
              <Icon className="fa fa-github" />
            </NavbarItem>
            <NavbarItem href="https://www.linkedin.com/in/mattrosenquist/" isHidden="touch">
              <Icon className="fa fa-linkedin" />
            </NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Navbar>
    );
  };
}
