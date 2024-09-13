import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Login from '../component/Login';
import userEvent from '@testing-library/user-event';

// Mocking dependencies
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const mockLogin = jest.fn();
const mockNavigate = jest.fn();
const mockSwal = Swal.fire as jest.Mock;

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("login form submits and redirects when success", async () => {
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    mockLogin.mockResolvedValue({}); 
    localStorage.setItem("authToken", "mockToken"); 

    render(<Login />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /sign in/i });

    userEvent.type(emailInput, 'revou@example.com');
    userEvent.type(passwordInput, '123345666');
    userEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'revou@example.com',
        password: '123345666',
      });
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    expect(mockSwal).not.toHaveBeenCalled();
    const authToken = localStorage.getItem('authToken');
    expect(authToken).toBe('mockToken');
  });

  test("login function running but error because token absent", async () => {
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    mockLogin.mockResolvedValue({});

    render(<Login />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /sign in/i });

    userEvent.type(emailInput, "revou@example.com");
    userEvent.type(passwordInput, "123345666");
    userEvent.click(loginButton);
    //sama kayak atas
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "revou@example.com",
        password: "123345666",
      });
    });

    await waitFor(() => {
      expect(mockSwal).toHaveBeenCalledWith(
        //copy paste errornya
        "ERROR!  ","No registered user found","error"
      );
    });
    //test
    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled(); 
    });
  });
});
