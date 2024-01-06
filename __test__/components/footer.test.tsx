/* eslint-disable import/order */
import React from 'react';
import { render, screen } from '@testing-library/react';

import { Footer } from '@/common/components/templates';
import { FOOTER_HEIGHT } from '@/common/constant/config';

import '@testing-library/jest-dom';

describe('Footer Component', () => {
  it('Should have height equal to FOOTER_HEIGHT constant', () => {
    render(<Footer />);

    const container = screen.getByTestId('footer-container');
    expect(container).toHaveStyle(`height: ${FOOTER_HEIGHT}px`);
  });
});
