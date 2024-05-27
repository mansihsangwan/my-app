import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

test('renders login form', () => {
  const { getByLabelText } = render(<Login />);
  const usernameInput = getByLabelText(/username/i);
  const passwordInput = getByLabelText(/password/i);
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('updates on change', () => {
  const { getByLabelText } = render(<Login />);
  const usernameInput = getByLabelText(/username/i);
  const passwordInput = getByLabelText(/password/i);

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });

  expect(usernameInput.value).toBe('testuser');
  expect(passwordInput.value).toBe('testpass');
});

test('submits form', () => {
  const handleLogin = jest.fn();
  const { getByLabelText, getByRole } = render(<Login handleLogin={handleLogin} />);
  const usernameInput = getByLabelText(/username/i);
  const passwordInput = getByLabelText(/password/i);
  const submitButton = getByRole('button', { name: /login/i });

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });
  fireEvent.click(submitButton);

  expect(handleLogin).toHaveBeenCalledTimes(1);
});