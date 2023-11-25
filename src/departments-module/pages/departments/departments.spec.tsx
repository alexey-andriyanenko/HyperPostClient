import React from "react";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared-module/tests";
import { useModalsStore } from "src/departments-module/store/modals";

import Departments from "./departments";

describe("Departments", () => {
  it("renders correctly", async () => {
    const { getByText, getByTestId } = await appTestRender(<Departments />);

    expect(getByText("Departments")).toBeInTheDocument();
    expect(getByTestId("departments-table")).toBeInTheDocument();
    expect(getByTestId("create-department-button")).toBeInTheDocument();
  });

  it("opens create department modal", async () => {
    const modals = useModalsStore();
    const openSpy = jest.spyOn(modals, "open");

    const { getByTestId } = await appTestRender(<Departments />);

    const createDepartmentButton = getByTestId("create-department-button");
    expect(createDepartmentButton).toBeInTheDocument();

    await userEvent.click(createDepartmentButton);
    expect(openSpy).toHaveBeenCalledWith("CreateDepartmentModal", {});
    expect(getByTestId("create-department-modal")).toBeInTheDocument();
  });
});
