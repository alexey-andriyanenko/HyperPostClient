import React from "react";
import { appTestRender } from "src/shared/tests";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { CreateDepartmentForm } from "./create-department-form";

describe("CreateDepartmentForm", () => {
  it("renders with correct texts and default values", async () => {
    const { getByTestId } = await appTestRender(<CreateDepartmentForm />);

    const numberField = getByTestId("number");
    const numberInput = numberField.querySelector("input");
    if (!numberInput) throw new Error("Number input not found");

    expect(within(numberField).getByText("Department number")).toBeInTheDocument();
    expect(numberInput.placeholder).toBe("Enter department number");
    expect(numberInput).toHaveValue("0");

    const fullAddressField = getByTestId("fullAddress");
    const fullAddressInput = fullAddressField.querySelector("input");
    if (!fullAddressInput) throw new Error("Full address input not found");

    expect(within(fullAddressField).getByText("Department address")).toBeInTheDocument();
    expect(fullAddressInput.placeholder).toBe("Enter department address");
    expect(fullAddressInput).toHaveValue("");

    const cancelBtn = getByTestId("cancel-btn");
    expect(cancelBtn).toHaveTextContent("Cancel");

    const submitBtn = getByTestId("submit-btn");
    expect(submitBtn).toHaveTextContent("Submit");
  });

  it("validation works correctly", async () => {
    const { getByTestId, queryAllByText } = await appTestRender(<CreateDepartmentForm />);

    const submitBtn = getByTestId("submit-btn");
    await userEvent.click(submitBtn);
    expect(queryAllByText("This field is required")).toHaveLength(0);

    // number field ↓
    const numberField = getByTestId("number");
    const numberInput = numberField.querySelector("input");
    if (!numberInput) throw new Error("Number input not found");

    await userEvent.type(numberInput, "1");
    await userEvent.clear(numberInput);
    expect(within(numberField).queryByText("This field is required")).toBeInTheDocument();

    await userEvent.type(numberInput, "1");
    expect(within(numberField).queryByText("This field is required")).not.toBeInTheDocument();

    await userEvent.type(numberInput, "a");
    expect(
      within(numberField).queryByText("Only number characters are allowed"),
    ).toBeInTheDocument();

    // number field ↑

    // fullAddress field ↓
    const fullAddressField = getByTestId("fullAddress");
    const fullAddressInput = fullAddressField.querySelector("input");
    if (!fullAddressInput) throw new Error("Full address input not found");

    await userEvent.type(fullAddressInput, "1");
    await userEvent.clear(fullAddressInput);
    expect(within(fullAddressField).queryByText("This field is required")).toBeInTheDocument();

    await userEvent.type(fullAddressInput, "1");
    expect(within(fullAddressField).queryByText("This field is required")).not.toBeInTheDocument();

    await userEvent.type(fullAddressInput, "a".repeat(101));
    expect(within(fullAddressField).queryByText("Max length: 100")).toBeInTheDocument();
    // fullAddress field ↑

    expect(queryAllByText("This field is required")).toHaveLength(0);
  });
});
