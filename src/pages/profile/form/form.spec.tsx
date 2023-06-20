import React from "react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

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

  it("validation works correctly", async () => {
    const { getByTestId, findByTestId } = appTestRender(<Form />);

    const button = await findByTestId("submit-button");
    expect(button).toBeDisabled();

    // first name ↓
    const firstName = getByTestId("first-name");
    const firstNameInput = firstName.querySelector("input");
    if (!firstNameInput) throw new Error("First name input not found");

    await userEvent.type(firstNameInput, "a");
    await userEvent.clear(firstNameInput);
    expect(await within(firstName).findByText("First Name is required")).toBeInTheDocument();
    expect(button).toBeDisabled();

    await userEvent.type(firstNameInput, "a".repeat(31));
    expect(await within(firstName).findByText("Max Length: 30")).toBeInTheDocument();
    expect(button).toBeDisabled();

    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, "a");
    expect(within(firstName).queryByText("First Name is required")).not.toBeInTheDocument();
    expect(within(firstName).queryByText("Max Length: 30")).not.toBeInTheDocument();
    expect(button).toBeDisabled();
    // first name ↑

    // last name ↓
    const lastName = getByTestId("last-name");
    const lastNameInput = lastName.querySelector("input");
    if (!lastNameInput) throw new Error("Last name input not found");

    await userEvent.type(lastNameInput, "a");
    await userEvent.clear(lastNameInput);
    expect(await within(lastName).findByText("Last Name is required")).toBeInTheDocument();
    expect(button).toBeDisabled();

    await userEvent.type(lastNameInput, "a".repeat(31));
    expect(await within(lastName).findByText("Max Length: 30")).toBeInTheDocument();
    expect(button).toBeDisabled();

    await userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, "a");
    expect(within(lastName).queryByText("Last Name is required")).not.toBeInTheDocument();
    expect(within(lastName).queryByText("Max Length: 30")).not.toBeInTheDocument();
    expect(button).toBeDisabled();
    // last name ↑

    // email ↓
    const email = getByTestId("email");
    const emailInput = email.querySelector("input");
    if (!emailInput) throw new Error("Email input not found");

    await userEvent.type(emailInput, "a");
    await userEvent.clear(emailInput);
    expect(await within(email).findByText("Email is required")).toBeInTheDocument();
    expect(button).toBeDisabled();

    await userEvent.type(emailInput, "a".repeat(51));
    expect(await within(email).findByText("Max Length: 50")).toBeInTheDocument();
    expect(button).toBeDisabled();

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "mail@sometext");
    expect(within(email).queryByText("Please enter a valid email address")).toBeInTheDocument();
    expect(button).toBeDisabled();

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "example@mail.com");
    expect(within(email).queryByText("Email is required")).not.toBeInTheDocument();
    expect(within(email).queryByText("Max Length: 50")).not.toBeInTheDocument();
    expect(within(email).queryByText("Please enter a valid email address")).not.toBeInTheDocument();
    // email ↑

    expect(button).not.toBeDisabled();
  });
});
