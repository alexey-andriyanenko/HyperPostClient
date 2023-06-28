import React from "react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import { appTestRender } from "src/shared/tests";
import { server } from "tests/msw-server";

import { LoginViaEmailForm } from "./login-via-email-form";

describe("LoginViaEmailForm", () => {
  it("renders with correct text", async () => {
    const { getByTestId } = await appTestRender(<LoginViaEmailForm />, false);

    const emailField = getByTestId("email");
    const emailInput = emailField.querySelector("input");
    if (!emailInput) throw new Error("Email input not found");

    expect(within(emailField).getByText("Email Address")).toBeInTheDocument();
    expect(emailInput.placeholder).toBe("Enter email");

    const passwordField = getByTestId("password");
    const passwordInput = passwordField.querySelector("input");
    if (!passwordInput) throw new Error("Password input not found");

    expect(within(passwordField).getByText("Password")).toBeInTheDocument();
    expect(passwordInput.placeholder).toBe("Enter password");

    expect(getByTestId("submit")).toHaveTextContent("Sign In");
  });

  it("validation works correctly", async () => {
    const { getByTestId } = await appTestRender(<LoginViaEmailForm />, false);

    const emailField = getByTestId("email");
    const emailInput = emailField.querySelector("input");
    if (!emailInput) throw new Error("Email input not found");

    const passwordField = getByTestId("password");
    const passwordInput = passwordField.querySelector("input");
    if (!passwordInput) throw new Error("Password input not found");

    const submitButton = getByTestId("submit");

    // Submit without filling in any fields
    await userEvent.click(submitButton);

    expect(within(emailField).getByText("Email is required")).toBeInTheDocument();
    expect(within(passwordField).getByText("Password is required")).toBeInTheDocument();

    // Fill in email field with invalid email
    await userEvent.type(emailInput, "123");
    await userEvent.click(submitButton);

    expect(within(emailField).getByText("Please enter a valid email address")).toBeInTheDocument();

    // Fill in email field with valid email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "example@mail.com");
    expect(
      within(emailField).queryByText("Please enter a valid email address"),
    ).not.toBeInTheDocument();

    // Fill in password
    await userEvent.type(passwordInput, "123456");
    await userEvent.click(submitButton);

    expect(within(passwordField).queryByText("Password is required")).not.toBeInTheDocument();
  });

  it("button state changes correctly on form submit", async () => {
    const { getByTestId } = await appTestRender(<LoginViaEmailForm />, false);

    const emailField = getByTestId("email");
    const emailInput = emailField.querySelector("input");
    if (!emailInput) throw new Error("Email input not found");

    const passwordField = getByTestId("password");
    const passwordInput = passwordField.querySelector("input");
    if (!passwordInput) throw new Error("Password input not found");

    const submitButton = getByTestId("submit");

    // Fill in email field with valid email
    await userEvent.type(emailInput, "admin@example.com");
    expect(submitButton).not.toBeDisabled();

    // Fill in password
    await userEvent.type(passwordInput, "123456");
    expect(submitButton).not.toBeDisabled();

    // Submit form
    await userEvent.click(submitButton);
    expect(submitButton).not.toBeDisabled();
  });

  it("form becomes invalid after submit with invalid credentials", async () => {
    server.use(
      rest.post("http://localhost:8000/users/login/email", (req, res, ctx) => res(ctx.status(401))),
    );

    const { getByTestId } = await appTestRender(<LoginViaEmailForm />, false);

    const emailField = getByTestId("email");
    const emailInput = emailField.querySelector("input");
    if (!emailInput) throw new Error("Email input not found");

    const passwordField = getByTestId("password");
    const passwordInput = passwordField.querySelector("input");
    if (!passwordInput) throw new Error("Password input not found");

    const submitButton = getByTestId("submit");

    // Fill in email field with valid email
    await userEvent.type(emailInput, "admin@example.com");
    expect(submitButton).not.toBeDisabled();

    // Fill in password
    await userEvent.type(passwordInput, "123456");
    expect(submitButton).not.toBeDisabled();

    // Submit form
    await userEvent.click(submitButton);
    expect(submitButton).not.toBeDisabled();

    // check if form is invalid
    expect(await within(emailField).findByText("Invalid email or password")).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    expect(submitButton).not.toBeDisabled();
  });
});
