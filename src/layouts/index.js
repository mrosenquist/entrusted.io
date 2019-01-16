import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { get } from 'lodash';
import 'font-awesome/css/font-awesome.css';
import './all.scss';
import { StaticQuery, Link, graphql } from 'gatsby';
import { Container, Hero, HeroHeader, HeroBody, Title } from 'bloomer';

import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';

const LayoutWrapper = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `}
    render={data => {
      const {
        site: { siteMetadata },
      } = data;
      const { children, isSize, style, author } = props;
      const title = get(props, 'title', siteMetadata.title);
      const description = get(props, 'description', siteMetadata.description);
      const featuredImage = get(props, 'featuredImage', '/images/logo-social.png');
      return (
        <div>
          <Helmet htmlAttributes={{ lang: 'en' }}>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="author" content={author} />
            <link rel="canonical" href="http://mysite.com/example" />
            {/* Google / Search Engine Tags */}
            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={description} />
            <meta itemProp="image" content={featuredImage} />
            {/* Facebook Meta Tags */}
            <meta property="og:url" content="https://entrusted.io" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={featuredImage} />
            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={featuredImage} />
          </Helmet>
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
    }}
  />
);

LayoutWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object.isRequired,
  isSize: PropTypes.string,
  style: PropTypes.object,
};

LayoutWrapper.defaultProps = {
  isSize: 'medium',
  style: undefined,
  title: undefined,
};

export default LayoutWrapper;
