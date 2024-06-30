import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUpPage from './SignUpPage';

// Mock 
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

// Mock 
jest.mock('react-icons/fa', () => ({
  FaSpinner: () => <div data-testid="spinner"></div>,
}));

describe('SignUpPage', () => {
  test('renders the component and matches snapshot', () => {
    const { asFragment } = render(<SignUpPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('shows validation errors when fields are empty', async () => {
    render(<SignUpPage />);

    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.getAllByText('*Please fill the field*')).toHaveLength(3);
    });
  });


  test('submits form successfully with valid input', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ idToken: 'mock-token' }),
      })
    );

    render(<SignUpPage />);

    fireEvent.input(screen.getByPlaceholderText('Email'), { target: { value: 'testmail@example.com' } });
    fireEvent.input(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.input(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password' } });

    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });
});
