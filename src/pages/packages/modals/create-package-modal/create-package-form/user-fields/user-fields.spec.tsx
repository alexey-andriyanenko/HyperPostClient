import React from "react";

import { appTestRender } from "src/shared/tests";

import { UserFields } from "./user-fields";
import { within } from "@testing-library/dom";

describe("UserFields", () => {
  it("renders correctly", async () => {
    const { findByText, getByTestId } = await appTestRender(
      <UserFields title="Test Title" data-testid="user-fields" />,
    );

    expect(await findByText("Test Title")).toBeInTheDocument();

    const phoneOrEmail = getByTestId("phone-or-email");
    const phoneOrEmailInput = phoneOrEmail.querySelector("input");
    if (!phoneOrEmailInput) throw new Error("phoneOrEmailInput is null");

    expect(within(phoneOrEmail).getByText("Phone number or email")).toBeInTheDocument();
    expect(phoneOrEmailInput).toHaveAttribute("placeholder", "Enter phone number or email");

    const firstName = getByTestId("first-name");
    const firstNameInput = firstName.querySelector("input");
    if (!firstNameInput) throw new Error("firstNameInput is null");

    expect(within(firstName).getByText("First Name")).toBeInTheDocument();
    expect(firstNameInput).toHaveAttribute("placeholder", "Enter First Name");

    const lastName = getByTestId("last-name");
    const lastNameInput = lastName.querySelector("input");
    if (!lastNameInput) throw new Error("lastNameInput is null");

    expect(within(lastName).getByText("Last Name")).toBeInTheDocument();
    expect(lastNameInput).toHaveAttribute("placeholder", "Enter Last Name");
  });
});
