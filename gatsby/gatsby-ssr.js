import React from 'react';
import Layout from './src/components/Layout/Layout.component';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
