import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../component/LoginForm";

// Mocking the required props
const mockSetEmail = jest.fn();
const mockSetPassword = jest.fn();
const mockOnSubmit = jest.fn();

describe("login form Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders login component correctly", () => {
    render(
      <LoginForm
        email=""
        setEmail={mockSetEmail}
        password=""
        setPassword={mockSetPassword}
        onSubmit={mockOnSubmit}
      />
    );

    expect(
      screen.getByRole("heading", { name: /sign in to your account/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your email address/i)
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your password/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("login form call onsubmit function if have been submited", () => {
    render(
      <LoginForm
        email="revou@example.com"
        setEmail={mockSetEmail}
        password="password123"
        setPassword={mockSetPassword}
        onSubmit={mockOnSubmit}
      />
    );
    const submitButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test("set email from localStorage if available", () => {
    localStorage.setItem("rememberedEmail", "revou@example.com");
    render(
      <LoginForm
        email=""
        setEmail={mockSetEmail}
        password=""
        setPassword={mockSetPassword}
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByLabelText(/email address/i)).toHaveValue(
      "revou@example.com"
    );
  });
});
