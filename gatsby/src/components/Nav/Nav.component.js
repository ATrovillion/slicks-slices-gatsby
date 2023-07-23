import React from 'react';
import { Link } from 'gatsby';
import NavStyles from './Nav.styles';
import Logo from '../Logo';

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/slicemasters">Slice Masters</Link>
        </li>
        <li>
          <Link to="/orders">Order Ahead!</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
