import React from "react";
import { http, HttpResponse } from "msw";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { server } from "src/msw";
import { appTestRender } from "src/shared-module/tests";

import { LoginViaPhoneForm } from "./login-via-phone-form";
import { apiUrl } from "../../../../shared-module/constants";

describe("LoginViaPhoneForm", () => {
  it("renders with correct text", async () => {
    const { getByTestId } = await appTestRender(<LoginViaPhoneForm />, false);

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
    const { getByTestId } = await appTestRender(<LoginViaPhoneForm />, false);

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

  it("button state changes correctly on form submit", async () => {
    const { getByTestId } = await appTestRender(<LoginViaPhoneForm />, false);

    const phoneField = getByTestId("phone");
    const phoneInput = phoneField.querySelector("input");
    if (!phoneInput) throw new Error("Phone input not found");

    const passwordField = getByTestId("password");
    const passwordInput = passwordField.querySelector("input");
    if (!passwordInput) throw new Error("Password input not found");

    const submitButton = getByTestId("submit");

    await userEvent.type(phoneInput, "111111");
    expect(submitButton).not.toBeDisabled();

    await userEvent.type(passwordInput, "123456");
    expect(submitButton).not.toBeDisabled();

    await userEvent.click(submitButton);
    expect(submitButton).not.toBeDisabled();
  });

  it("form becomes invalid after submit with invalid credentials", async () => {
    server.use(
      http.post(apiUrl + "/users/login/phone", () =>
        HttpResponse.json(null, {
          status: 401,
        }),
      ),
    );

    const { getByTestId } = await appTestRender(<LoginViaPhoneForm />, false);

    const phoneField = getByTestId("phone");
    const phoneInput = phoneField.querySelector("input");
    if (!phoneInput) throw new Error("Phone input not found");

    const passwordField = getByTestId("password");
    const passwordInput = passwordField.querySelector("input");
    if (!passwordInput) throw new Error("Password input not found");

    const submitButton = getByTestId("submit");

    await userEvent.type(phoneInput, "111111");
    expect(submitButton).not.toBeDisabled();

    await userEvent.type(passwordInput, "123456");
    expect(submitButton).not.toBeDisabled();

    await userEvent.click(submitButton);
    expect(submitButton).not.toBeDisabled();

    // check if form is invalid
    expect(
      await within(phoneField).findByText("Invalid phone number or password"),
    ).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    expect(submitButton).not.toBeDisabled();
  });
});
