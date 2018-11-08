import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import 'font-awesome/css/font-awesome.css'
import './all.scss'

import {
  Container,
  Hero,
  HeroHeader,
  HeroBody,
  HeroFooter,
  Title,
  Tabs,
  TabList,
  Tab,
  TabLink,
} from 'bloomer'

import AppHeader from '../components/Header'
import AppFooter from '../components/Footer'

const TemplateWrapper = ({ children, title }) => (
  <div className="site">
    <Helmet title={title} />
    <Hero isFullHeight={false} isColor="primary" isSize="medium">
      <HeroHeader>
        <AppHeader />
      </HeroHeader>

      <HeroBody>
        <Container hasTextAlign='centered'>
          <Title>{title}</Title>
        </Container>
      </HeroBody>

      {/*<HeroFooter>*/}
        {/*<Container>*/}
          {/*<Tabs isAlign="centered">*/}
            {/*<TabList>*/}
              {/*<Tab>*/}
                {/*<TabLink>And this at the bottom</TabLink>*/}
              {/*</Tab>*/}
            {/*</TabList>*/}
          {/*</Tabs>*/}
        {/*</Container>*/}
      {/*</HeroFooter>*/}
    </Hero>
    <Container className="site__content">
      {children}
    </Container>
    <AppFooter />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.object,
  title: PropTypes.string
}

TemplateWrapper.defaultProps = {
  title: "Home | Gatsby + Bulma & Bloomer"
}

export default TemplateWrapper
