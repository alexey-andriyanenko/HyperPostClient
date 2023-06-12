import React from "react";
import { within } from "@testing-library/dom";

import { appTestRender } from "src/shared/tests";
import { LoginViaEmailForm } from "./login-via-email-form";
describe("LoginViaEmailForm", () => {
  it("renders with correct text", () => {
    const { getByTestId } = appTestRender(<LoginViaEmailForm />);

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
});
