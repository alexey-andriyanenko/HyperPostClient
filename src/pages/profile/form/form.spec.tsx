import React from "react";
import { within } from "@testing-library/dom";

import { appTestRender } from "src/shared/tests";

import { Form } from "./form";

describe("Form", () => {
  it("renders with correct text", async () => {
    const { getByTestId, findByTestId } = appTestRender(<Form />);

    const firstName = await findByTestId("first-name");
    const firstNameInput = firstName.querySelector("input");
    if (!firstNameInput) throw new Error("First name input not found");

    expect(within(firstName).getByText("First Name")).toBeInTheDocument();
    expect(firstNameInput.placeholder).toBe("Enter First Name");

    const lastName = getByTestId("last-name");
    const lastNameInput = lastName.querySelector("input");
    if (!lastNameInput) throw new Error("Last name input not found");

    expect(within(lastName).getByText("Last Name")).toBeInTheDocument();
    expect(lastNameInput.placeholder).toBe("Enter Last Name");

    const email = getByTestId("email");
    const emailInput = email.querySelector("input");
    if (!emailInput) throw new Error("Email input not found");

    expect(within(email).getByText("Email")).toBeInTheDocument();
    expect(emailInput.placeholder).toBe("Enter Email");

    const roleId = getByTestId("role-id");
    const roleIdInput = roleId.querySelector("input");
    if (!roleIdInput) throw new Error("Role input not found");

    expect(within(roleId).getByText("Role")).toBeInTheDocument();
    expect(roleIdInput).toBeDisabled();
  });
});
