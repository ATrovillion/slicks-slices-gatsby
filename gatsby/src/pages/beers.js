import React from 'react';
import { graphql } from 'gatsby';
import BeerList from '../components/Beerlist';
import SEO from '../components/SEO';

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;
  return (
    <>
      <SEO title={`Beers! We have ${data.beers.nodes.length} in stock!`} />
      <h2 className="center">
        We have {data.beers.nodes.length} Beers Available. Dine in Only!
      </h2>
      <BeerList beers={beers} />
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        name
        image
        id
        price
        rating {
          average
          reviews
        }
      }
    }
  }
`;
