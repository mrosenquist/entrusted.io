import React from 'react';
import { Footer, Container, Content, Columns, Column, Icon } from 'bloomer';

const AppFooter = () => (
  <Footer id="footer">
    <Container>
      <Content>
        <Columns>
          <Column>
            <p>
              Made by Matt Rosenquist
            </p>
          </Column>
        </Columns>
        {/*<Content isSize="small">*/}
          {/*<p>*/}
            {/*The source code is licensed under <a target="_blank">MIT</a>.*/}
          {/*</p>*/}
          {/*<p>*/}
            {/*The website content is licensed under <a target="_blank">CC ANS 4.0</a>.*/}
          {/*</p>*/}
        {/*</Content>*/}
      </Content>
    </Container>
  </Footer>
);

export default AppFooter;
