import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slick's Slices`,
    siteUrl: 'http://localhost:8888/',
    description: `The best pizza place in Silver Spring!`,
    // twitter: '@slicksSlices',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      // name of the plugin
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '5pfs7p1a',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
