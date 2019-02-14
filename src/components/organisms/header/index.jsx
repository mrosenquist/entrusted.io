import React from 'react';
import { Navbar, NavbarBrand, NavbarItem, Icon, NavbarBurger, NavbarStart, NavbarEnd, NavbarMenu } from 'bloomer';
import Link from '../../atoms/navbar-link';

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
          <NavbarItem href="https://github.com/mrosenquist" isHidden="desktop">
            <Icon className="fa fa-github" />
          </NavbarItem>
          <NavbarItem href="https://www.linkedin.com/in/mattrosenquist/" isHidden="desktop">
            <Icon className="fa fa-linkedin" />
          </NavbarItem>
          <NavbarBurger isActive={mobileMenuActive} onClick={this.handleClick} />
        </NavbarBrand>
        <NavbarMenu isActive={mobileMenuActive}>
          <NavbarStart>
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/policy">Policy</Link>
            {/*<Link href="/trusted-resources">Resources</Link>*/}
          </NavbarStart>
          <NavbarEnd>
            <NavbarItem href="https://github.com/mrosenquist" isHidden="touch">
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
