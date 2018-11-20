import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import 'font-awesome/css/font-awesome.css';
import './all.scss';

import { Container, Hero, HeroHeader, HeroBody, Title } from 'bloomer';

import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';

const LayoutWrapper = ({ children, title, isSize, style }) => (
  <div>
    <Helmet title={title} />
    <Hero isColor="primary" isSize={isSize} style={style}>
      <HeroHeader>
        <AppHeader />
      </HeroHeader>
      {isSize === 'medium' && (
        <HeroBody>
          <Container hasTextAlign="centered">
            <Title>{title}</Title>
          </Container>
        </HeroBody>
      )}
    </Hero>
    <noscript>This site requires JavaScript to be enabled</noscript>
    <Container className="site__content">{children}</Container>
    <AppFooter />
  </div>
);

LayoutWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  isSize: PropTypes.string,
  style: PropTypes.object,
};

LayoutWrapper.defaultProps = {
  isSize: 'medium',
  style: null,
};

export default LayoutWrapper;
