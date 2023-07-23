/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import Nav from '../Nav/Nav.component';
import Footer from '../Footer';
import 'normalize.css';
import GlobalStyles from '../../styles/GlobalStyles';
import { ContentStyles, SiteBorderStyles } from './Layout.styles';
import Typography from '../../styles/Typography';

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <SiteBorderStyles>
        <ContentStyles>
          <Nav />
          {children}
          <Footer />
        </ContentStyles>
      </SiteBorderStyles>
    </>
  );
}
