import React from "react";
import { appTestRender } from "src/shared/tests";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { CreateDepartmentForm } from "./create-department-form";
import { spyOn } from "jest-mock";
import { departmentsApiService } from "src/api/departments";
import { server } from "../../../../../../tests/msw-server";
import { rest } from "msw";
import { apiUrl } from "../../../../../constants/api";
import { createDepartmentUniqueConstraintErrorMock } from "../../../../../api/departments/mocks/create-department-unique-constraint-error.mock";
import { createDepartmentMaxLengthConstraintErrorMock } from "../../../../../api/departments/mocks/create-department-max-length-constraint-error.mock";
import { createDepartmentValidationErrorMock } from "../../../../../api/departments/mocks/create-department-validation-error.mock";

describe("CreateDepartmentForm", () => {
  it("renders with correct texts and default values", async () => {
    const { getByTestId } = await appTestRender(<CreateDepartmentForm onClose={jest.fn} />);

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
    const { getByTestId } = await appTestRender(<CreateDepartmentForm onClose={jest.fn} />);

    const submitBtn = getByTestId("submit-btn");
    expect(submitBtn).toBeDisabled();

    // number field ↓
    const numberField = getByTestId("number");
    const numberInput = numberField.querySelector("input");
    if (!numberInput) throw new Error("Number input not found");

    await userEvent.type(numberInput, "1");
    await userEvent.clear(numberInput);
    expect(within(numberField).getByText("This field is required")).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    await userEvent.type(numberInput, "1");
    expect(within(numberField).queryByText("This field is required")).not.toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    await userEvent.type(numberInput, "a");
    expect(within(numberField).getByText("Only number characters are allowed")).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, "1".repeat(11));
    expect(
      within(numberField).queryByText("Only number characters are allowed"),
    ).not.toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
    // number field ↑

    // fullAddress field ↓
    const fullAddressField = getByTestId("fullAddress");
    const fullAddressInput = fullAddressField.querySelector("input");
    if (!fullAddressInput) throw new Error("Full address input not found");

    await userEvent.type(fullAddressInput, "1");
    await userEvent.clear(fullAddressInput);
    expect(within(fullAddressField).getByText("This field is required")).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    await userEvent.type(fullAddressInput, "1");
    expect(within(fullAddressField).queryByText("This field is required")).not.toBeInTheDocument();
    expect(submitBtn).not.toBeDisabled();

    await userEvent.clear(fullAddressInput);
    await userEvent.type(fullAddressInput, "a".repeat(101));
    expect(within(fullAddressField).getByText("Max length: 100")).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    await userEvent.clear(fullAddressInput);
    await userEvent.type(fullAddressInput, "address");
    expect(within(fullAddressField).queryByText("Max length: 100")).not.toBeInTheDocument();
    // fullAddress field ↑

    expect(submitBtn).not.toBeDisabled();
  });

  it("correct data is provided to request", async () => {
    const onClose = jest.fn();
    const createDepartmentSpy = spyOn(departmentsApiService, "createDepartment");

    const { getByTestId } = await appTestRender(<CreateDepartmentForm onClose={onClose} />);

    const submitBtn = getByTestId("submit-btn");
    expect(submitBtn).toBeDisabled();

    const numberField = getByTestId("number");
    const numberInput = numberField.querySelector("input");
    if (!numberInput) throw new Error("Number input not found");

    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, "1");

    const fullAddressField = getByTestId("fullAddress");
    const fullAddressInput = fullAddressField.querySelector("input");
    if (!fullAddressInput) throw new Error("Full address input not found");

    await userEvent.type(fullAddressInput, "address");

    await userEvent.click(submitBtn);

    expect(onClose).toHaveBeenCalled();
    expect(createDepartmentSpy).toHaveBeenCalledWith({ number: "1", fullAddress: "address" });
  });

  it("cancel button triggers onClose", async () => {
    const onClose = jest.fn();
    const { getByTestId } = await appTestRender(<CreateDepartmentForm onClose={onClose} />);
    const cancelBtn = getByTestId("cancel-btn");

    await userEvent.click(cancelBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it("unique constraint validation error is displayed", async () => {
    server.use(
      rest.post(apiUrl + "/departments", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json(createDepartmentUniqueConstraintErrorMock));
      }),
    );

    const onClose = jest.fn();

    const { getByTestId } = await appTestRender(<CreateDepartmentForm onClose={onClose} />);

    const submitBtn = getByTestId("submit-btn");
    expect(submitBtn).toBeDisabled();

    const numberField = getByTestId("number");
    const numberInput = numberField.querySelector("input");
    if (!numberInput) throw new Error("Number input not found");

    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, "1");

    const fullAddressField = getByTestId("fullAddress");
    const fullAddressInput = fullAddressField.querySelector("input");
    if (!fullAddressInput) throw new Error("Full address input not found");

    await userEvent.type(fullAddressInput, "address");
    await userEvent.click(submitBtn);

    expect(
      await within(numberField).findByText("create-department-unique-constraint-error"),
    ).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it("max length constraint validation error is displayed", async () => {
    server.use(
      rest.post(apiUrl + "/departments", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json(createDepartmentMaxLengthConstraintErrorMock));
      }),
    );

    const onClose = jest.fn();

    const { getByTestId } = await appTestRender(<CreateDepartmentForm onClose={onClose} />);

    const submitBtn = getByTestId("submit-btn");
    expect(submitBtn).toBeDisabled();

    const numberField = getByTestId("number");
    const numberInput = numberField.querySelector("input");
    if (!numberInput) throw new Error("Number input not found");

    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, "1");

    const fullAddressField = getByTestId("fullAddress");
    const fullAddressInput = fullAddressField.querySelector("input");
    if (!fullAddressInput) throw new Error("Full address input not found");

    await userEvent.type(fullAddressInput, "address");
    await userEvent.click(submitBtn);

    expect(
      await within(fullAddressField).findByText("create-department-max-length-constraint-error"),
    ).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it("full address validation api error is displayed", async () => {
    server.use(
      rest.post(apiUrl + "/departments", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json(createDepartmentValidationErrorMock));
      }),
    );

    const onClose = jest.fn();

    const { getByTestId } = await appTestRender(<CreateDepartmentForm onClose={onClose} />);

    const submitBtn = getByTestId("submit-btn");
    expect(submitBtn).toBeDisabled();

    const numberField = getByTestId("number");
    const numberInput = numberField.querySelector("input");
    if (!numberInput) throw new Error("Number input not found");

    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, "1");

    const fullAddressField = getByTestId("fullAddress");
    const fullAddressInput = fullAddressField.querySelector("input");
    if (!fullAddressInput) throw new Error("Full address input not found");

    await userEvent.type(fullAddressInput, "address");
    await userEvent.click(submitBtn);

    expect(await within(fullAddressField).findByText("full address error")).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });
});