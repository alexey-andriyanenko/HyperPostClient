import React from "react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared/tests";
import { LoginViaPhoneForm } from "./login-via-phone-form";

describe("LoginViaPhoneForm", () => {
  it("renders with correct text", () => {
    const { getByTestId } = appTestRender(<LoginViaPhoneForm />);

    const phoneField = getByTestId("phone");
    const phoneInput = phoneField.querySelector("input");
    if (!phoneInput) throw new Error("Phone input not found");

    expect(within(phoneField).getByText("Phone")).toBeInTheDocument();
    expect(phoneInput.placeholder).toBe("(123) 456-7890");

    const passwordField = getByTestId("password");
    const passwordInput = passwordField.querySelector("input");
    if (!passwordInput) throw new Error("Password input not found");

    expect(within(passwordField).getByText("Password")).toBeInTheDocument();
    expect(passwordInput.placeholder).toBe("Enter password");

    expect(getByTestId("submit")).toHaveTextContent("Sign In");
  });

  it("validation works correctly", async () => {
    const { getByTestId } = appTestRender(<LoginViaPhoneForm />);

    const phoneField = getByTestId("phone");
    const phoneInput = phoneField.querySelector("input");
    if (!phoneInput) throw new Error("Phone input not found");

    const passwordField = getByTestId("password");
    const passwordInput = passwordField.querySelector("input");
    if (!passwordInput) throw new Error("Password input not found");

    const submitButton = getByTestId("submit");

    // Submit without filling in any fields
    await userEvent.click(submitButton);

    expect(within(phoneField).getByText("Phone is required")).toBeInTheDocument();
    expect(within(passwordField).getByText("Password is required")).toBeInTheDocument();

    // Fill in phone field with valid phone number
    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, "(123) 456-7890");
    await userEvent.click(submitButton);

    expect(
      within(phoneField).queryByText("Please enter a valid phone number"),
    ).not.toBeInTheDocument();

    // Fill in password
    await userEvent.type(passwordInput, "password");
    await userEvent.click(submitButton);

    expect(within(passwordField).queryByText("Password is required")).not.toBeInTheDocument();
  });

  // TODO: implement this test
  it("button state changes correctly on form submit", async () => {});
});
