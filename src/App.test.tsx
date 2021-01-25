import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('should renders a div', () => {
  const element = render(<App />);
  expect(element.container.getElementsByTagName("div").length).toBeGreaterThan(1);
});

