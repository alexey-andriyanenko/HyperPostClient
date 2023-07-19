import React from "react";
import { appTestRender } from "src/shared/tests";
import userEvent from "@testing-library/user-event";

import Departments from "./departments";

describe("Departments", () => {
  it("renders correctly", async () => {
    const { getByText, getByTestId } = await appTestRender(<Departments />);

    expect(getByText("Departments")).toBeInTheDocument();
    expect(getByTestId("departments-table")).toBeInTheDocument();
    expect(getByTestId("create-department-button")).toBeInTheDocument();
  });

  it("opens create department modal", async () => {
    const { getByTestId } = await appTestRender(<Departments />);

    const createDepartmentButton = getByTestId("create-department-button");
    expect(createDepartmentButton).toBeInTheDocument();

    await userEvent.click(createDepartmentButton);
    expect(getByTestId("create-department-modal")).toBeInTheDocument();
  });
});
