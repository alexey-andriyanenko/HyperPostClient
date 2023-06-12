import React from "react";
import { within } from "@testing-library/dom";

import { appTestRender } from "src/shared/tests";
import { LoginViaPhoneForm } from "./login-via-phone-form";

describe("LoginViaPhoneForm", () => {
  it("renders with correct text", () => {
    const { getByTestId } = appTestRender(<LoginViaPhoneForm />);

    const phoneField = getByTestId("phone");
    const phoneInput = phoneField.querySelector("input");
    if (!phoneInput) throw new Error("Phone input not found");

    expect(within(phoneField).getByText("Phone")).toBeInTheDocument();
    expect(phoneInput.placeholder).toBe("Enter phone");

    const passwordField = getByTestId("password");
    const passwordInput = passwordField.querySelector("input");
    if (!passwordInput) throw new Error("Password input not found");

    expect(within(passwordField).getByText("Password")).toBeInTheDocument();
    expect(passwordInput.placeholder).toBe("Enter password");

    expect(getByTestId("submit")).toHaveTextContent("Sign In");
  });
});
