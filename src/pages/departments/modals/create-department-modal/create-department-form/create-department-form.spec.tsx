import React from "react";
import { appTestRender } from "src/shared/tests";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { CreateDepartmentForm } from "./create-department-form";
import { spyOn } from "jest-mock";
import { departmentsApiService } from "src/api/departments";
import { server } from "tests/msw-server";
import { rest } from "msw";
import { apiUrl } from "src/constants/api";
import {
  departmentMaxLengthConstraintErrorMock,
  departmentUniqueConstraintErrorMock,
  departmentValidationErrorMock,
} from "src/api/departments/mocks";
import { departmentModelMock } from "src/models/mocks";

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

  it("inherits initial values from department in props", async () => {
    const { findByTestId, getByTestId } = await appTestRender(
      <CreateDepartmentForm department={departmentModelMock} onClose={jest.fn} />,
    );

    const numberField = await findByTestId("number");
    const numberInput = numberField.querySelector("input");
    if (!numberInput) throw new Error("Number input not found");

    expect(within(numberField).getByText("Department number")).toBeInTheDocument();
    expect(numberInput.placeholder).toBe("Enter department number");
    expect(numberInput).toHaveValue("1");

    const fullAddressField = getByTestId("fullAddress");
    const fullAddressInput = fullAddressField.querySelector("input");
    if (!fullAddressInput) throw new Error("Full address input not found");

    expect(fullAddressInput).toHaveValue("Full Address");
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

  it("number field becomes disabled if department was provided", async () => {
    const { findByTestId } = await appTestRender(
      <CreateDepartmentForm department={departmentModelMock} onClose={jest.fn} />,
    );

    const numberField = await findByTestId("number");
    const numberInput = numberField.querySelector("input");

    expect(numberInput).toBeDisabled();
  });

  it("create request is called no department was provided", async () => {
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
    expect(createDepartmentSpy).toHaveBeenCalled();
  });

  it("edit request is called if department was provided", async () => {
    const onClose = jest.fn();
    const editDepartmentSpy = spyOn(departmentsApiService, "editDepartment");

    const { getByTestId } = await appTestRender(
      <CreateDepartmentForm department={departmentModelMock} onClose={onClose} />,
    );

    const submitBtn = getByTestId("submit-btn");
    expect(submitBtn).toBeDisabled();

    const fullAddressField = getByTestId("fullAddress");
    const fullAddressInput = fullAddressField.querySelector("input");
    if (!fullAddressInput) throw new Error("Full address input not found");

    await userEvent.type(fullAddressInput, "new-address");
    await userEvent.click(submitBtn);

    expect(onClose).toHaveBeenCalled();
    expect(editDepartmentSpy).toHaveBeenCalled();
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
        return res(ctx.status(400), ctx.json(departmentUniqueConstraintErrorMock));
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
      await within(numberField).findByText("department-unique-constraint-error"),
    ).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it("max length constraint validation error is displayed", async () => {
    server.use(
      rest.post(apiUrl + "/departments", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json(departmentMaxLengthConstraintErrorMock));
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
      await within(fullAddressField).findByText("department-max-length-constraint-error"),
    ).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it("full address validation api error is displayed", async () => {
    server.use(
      rest.post(apiUrl + "/departments", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json(departmentValidationErrorMock));
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
