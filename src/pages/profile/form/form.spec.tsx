import React from "react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { useStore } from "src/store";

import { appTestRender } from "src/shared/tests";

import { Form } from "./form";

describe("Form", () => {
  it("renders with correct text", async () => {
    const { getByTestId, findByTestId } = await appTestRender(<Form />);

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
  });

  it("validation works correctly", async () => {
    const { getByTestId, findByTestId } = await appTestRender(<Form />);

    const button = await findByTestId("submit-button");
    expect(button).toBeDisabled();

    // first name ↓
    const firstName = getByTestId("first-name");
    const firstNameInput = firstName.querySelector("input");
    if (!firstNameInput) throw new Error("First name input not found");

    expect(firstNameInput).toHaveValue("Admin");

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
    expect(button).not.toBeDisabled();
    // first name ↑

    // last name ↓
    const lastName = getByTestId("last-name");
    const lastNameInput = lastName.querySelector("input");
    if (!lastNameInput) throw new Error("Last name input not found");

    expect(lastNameInput).toHaveValue("User");

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
    expect(button).not.toBeDisabled();
    // last name ↑

    // email ↓
    const email = getByTestId("email");
    const emailInput = email.querySelector("input");
    if (!emailInput) throw new Error("Email input not found");

    expect(emailInput).toHaveValue("admin@example.com");
    expect(emailInput).toBeDisabled();
    // email ↑

    // role ↓
    const roleId = getByTestId("role-id");
    const roleIdInput = roleId.querySelector("input");
    if (!roleIdInput) throw new Error("Role input not found");

    expect(roleIdInput).toHaveValue("Admin");
    expect(roleIdInput).toBeDisabled();
    // role ↑

    expect(button).not.toBeDisabled();
  });

  it("data is provided to update user action", async () => {
    const store = useStore("user");
    const updateMeSpy = jest.spyOn(store, "updateMe");

    const { getByTestId, findByTestId } = await appTestRender(<Form />);

    const button = await findByTestId("submit-button");
    expect(button).toBeDisabled();

    const firstName = getByTestId("first-name");
    const firstNameInput = firstName.querySelector("input");
    if (!firstNameInput) throw new Error("First name input not found");

    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, "first_name");

    const lastName = getByTestId("last-name");
    const lastNameInput = lastName.querySelector("input");
    if (!lastNameInput) throw new Error("Last name input not found");

    await userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, "last_name");

    await userEvent.click(button);

    expect(updateMeSpy).toHaveBeenCalledWith({
      firstName: "first_name",
      lastName: "last_name",
      email: "admin@example.com",
    });
  });
});
