/* eslint-disable import/order */
import React from 'react';
import { render, screen } from '@testing-library/react';

import { Navbar } from '@/common/components/templates';
import { NAV_HEIGHT } from '@/common/constant/config';

import '@testing-library/jest-dom';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Navbar />);
  });
  it('Should have height equal to NAV_HEIGHT constant', () => {
    const container = screen.getByTestId('navbar-container');
    expect(container).toHaveStyle(`height: ${NAV_HEIGHT}px`);
  });
  it('Should have a logo rendered', () => {
    const logo = screen.getByTestId('navbar-logo-button');
    expect(logo).toBeDefined();
  });
  it('Should have a wishlist button rendered', () => {
    const wishlistButton = screen.getByTestId('navbar-wishlist-button');
    expect(wishlistButton).toBeDefined();
  });
  it('Should have a select component with a loader', () => {
    const selectLoader = screen.getByTestId('navbar-select-loader');
    const select = screen.getByTestId('navbar-select');
    expect(selectLoader).toBeDefined();
    expect(select).toBeDefined();
  });
});
