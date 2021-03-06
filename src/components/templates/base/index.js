import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { get } from 'lodash';
import 'font-awesome/css/font-awesome.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import '../all.scss';
import { StaticQuery, graphql } from 'gatsby';
import { Container, Hero, HeroHeader, HeroBody, Title } from 'bloomer';

import AppHeader from '../../organisms/header';
import AppFooter from '../../organisms/footer';

const LayoutWrapper = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
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
      const siteUrl = get(props, 'siteUrl', 'https://entrusted.io');
      const description = get(props, 'description', siteMetadata.description);
      const featuredImage = get(props, 'featuredImage', `${siteMetadata.siteUrl}/images/logo-social.png`);
      return (
        <div>
          <Helmet htmlAttributes={{ lang: 'en' }}>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="author" content={author} />
            <link rel="canonical" href={siteUrl} />
            {/* Google / Search Engine Tags */}
            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={description} />
            <meta itemProp="image" content={featuredImage} />
            {/* Facebook Meta Tags */}
            <meta property="og:url" content={siteUrl} />
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
          <Hero isColor="primary" isSize={isSize} style={style} className={isSize === 'medium' ? '' : 'hero--sticky'}>
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
  isSize: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  style: PropTypes.object,
};

LayoutWrapper.defaultProps = {
  isSize: 'medium',
  style: undefined,
  title: undefined,
};

export default LayoutWrapper;
