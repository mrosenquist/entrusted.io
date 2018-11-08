import React from 'react'
// import Link from 'gatsby-link'
import get from 'lodash/get'
import { Container, Title, Column, Columns, Notification, Tile } from 'bloomer'
import Layout from '../layouts';

const IndexPage = ({
  data,
}) => (
  <Layout>

    <Tile isAncestor>
      <Tile>Test</Tile>
      <Tile>Test</Tile>

    </Tile>


    <Columns>
      <Column>
        Test
      </Column>

      <Column>
        Test
      </Column>
    </Columns>
    {/*<Columns isCentered>*/}
      {/*<Column isSize='1/3'>*/}
        {/*<Notification isColor='success' hasTextAlign='centered'> isOneThird </Notification>*/}
      {/*</Column>*/}
      {/*<Column isSize={{mobile: 8}}>*/}
        {/*<Notification isColor='warning' hasTextAlign='centered'> isSize={{mobile: 8}} </Notification>*/}
      {/*</Column>*/}
      {/*<Column>*/}
        {/*<Notification isColor='danger' hasTextAlign='centered'> Third column </Notification>*/}
      {/*</Column>*/}
      {/*<Column>*/}
        {/*<Notification isColor='primary' hasTextAlign='centered'> Fourth column </Notification>*/}
      {/*</Column>*/}
    {/*</Columns>*/}
    <Container hasTextAlign="centered">
      <Title isSize="1">Gatsby + Bulma & Bloomer</Title>
      <Title isSize="3">
        Easy <strong>vertical centering</strong> in <strong>fullscreen</strong>
      </Title>
      <Title isSize="4">Include any content you want, it's always centered</Title>
    </Container>
    {/*{JSON.stringify(data)}*/}
  </Layout>
);

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
