import React from "react";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared/tests";
import { packageCategoriesApiService } from "src/api/package-categories";

import { CreatePackageCategoryForm } from "./create-package-category-form";
import { within } from "@testing-library/dom";

describe("CreatePackageCategoryForm", () => {
  it("renders with correct text", async () => {
    const { getByTestId } = await appTestRender(<CreatePackageCategoryForm onClose={jest.fn} />);

    const nameField = getByTestId("name");
    const nameInput = nameField.querySelector("input");
    if (!nameInput) throw new Error("Name input not found");

    expect(within(nameField).getByText("Package category name")).toBeInTheDocument();
    expect(nameInput.placeholder).toBe("Enter package category name");
    expect(nameInput.value).toBe("");

    const cancelBtn = getByTestId("cancel-btn");
    expect(cancelBtn).toHaveTextContent("Cancel");

    const submitBtn = getByTestId("submit-btn");
    expect(submitBtn).toHaveTextContent("Submit");
  });

  it("validation works correctly", async () => {
    const { getByTestId } = await appTestRender(<CreatePackageCategoryForm onClose={jest.fn} />);

    const submitBtn = getByTestId("submit-btn");
    expect(submitBtn).toBeDisabled();

    const nameField = getByTestId("name");
    const nameInput = nameField.querySelector("input");
    if (!nameInput) throw new Error("Name input not found");

    await userEvent.type(nameInput, "t");
    await userEvent.clear(nameInput);
    expect(within(nameField).getByText("This field is required")).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    await userEvent.type(nameInput, "test");
    expect(within(nameField).queryByText("This field is required")).not.toBeInTheDocument();
    expect(submitBtn).not.toBeDisabled();
  });

  it("inherits initial values from provided package category", async () => {
    const { findByTestId } = await appTestRender(
      <CreatePackageCategoryForm onClose={jest.fn} packageCategory={{ id: 1, name: "test" }} />,
    );

    const nameField = await findByTestId("name");
    const nameInput = nameField.querySelector("input");
    if (!nameInput) throw new Error("Name input not found");

    expect(nameInput.value).toBe("test");
  });

  it("triggers creation request on submit and closes modal on success", async () => {
    const onClose = jest.fn();
    const requestSpy = jest.spyOn(packageCategoriesApiService, "createPackageCategory");
    const { getByTestId } = await appTestRender(<CreatePackageCategoryForm onClose={onClose} />);

    const submitBtn = getByTestId("submit-btn");
    const nameField = getByTestId("name");
    const nameInput = nameField.querySelector("input");
    if (!nameInput) throw new Error("Name input not found");

    await userEvent.type(nameInput, "test");
    await userEvent.click(submitBtn);

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("triggers edit request if package category is provided and closes modal on success", async () => {
    const onClose = jest.fn();
    const requestSpy = jest.spyOn(packageCategoriesApiService, "editPackageCategory");
    const { findByTestId, getByTestId } = await appTestRender(
      <CreatePackageCategoryForm onClose={onClose} packageCategory={{ id: 1, name: "test" }} />,
    );

    const submitBtn = await findByTestId("submit-btn");
    const nameField = getByTestId("name");
    const nameInput = nameField.querySelector("input");
    if (!nameInput) throw new Error("Name input not found");

    await userEvent.type(nameInput, "test");
    await userEvent.click(submitBtn);

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("triggers onClose on cancel click", async () => {
    const onClose = jest.fn();
    const { getByTestId } = await appTestRender(<CreatePackageCategoryForm onClose={onClose} />);

    const cancelBtn = getByTestId("cancel-btn");

    await userEvent.click(cancelBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
