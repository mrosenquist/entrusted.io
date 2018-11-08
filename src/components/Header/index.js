import React from 'react'
import Link from 'gatsby-link'
import { Navbar, NavbarBrand, NavbarItem, Icon, NavbarBurger, NavbarStart, NavbarEnd, NavbarMenu } from 'bloomer'

export default class AppHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {mobileMenuActive: false};
  }

  handleClick = () => {
    this.setState({mobileMenuActive: !this.state.mobileMenuActive});
  };

  render = () => (
    <Navbar isTransparent>
      <NavbarBrand>
        <NavbarItem>
          <img src="/images/entrusted-logo.png" style={{marginRight: 5}}/> Entrusted
        </NavbarItem>
        <NavbarItem href="https://twitter.com/AlgusDark" isHidden='desktop'>
          <Icon className='fa fa-github'/>
        </NavbarItem>
        <NavbarItem href="https://twitter.com/AlgusDark" isHidden='desktop'>
          <Icon className='fa fa-linkedin'/>
        </NavbarItem>
        <NavbarBurger isActive={this.state.mobileMenuActive} onClick={this.handleClick}/>
      </NavbarBrand>
      <NavbarMenu isActive={this.state.mobileMenuActive}>
        <NavbarStart>
          <NavbarItem href='#/'>Home</NavbarItem>
        </NavbarStart>
        <NavbarStart>
          <NavbarItem href='#/about'>About</NavbarItem>
        </NavbarStart>
        <NavbarEnd>
          <NavbarItem href="https://github.com/AlgusDark/bloomer" isHidden='touch'>
            <Icon className='fa fa-github'/>
          </NavbarItem>
          <NavbarItem href="https://twitter.com/AlgusDark" isHidden='touch'>
            <Icon className='fa fa-linkedin'/>
          </NavbarItem>
        </NavbarEnd>
      </NavbarMenu>
    </Navbar>
  )
}
