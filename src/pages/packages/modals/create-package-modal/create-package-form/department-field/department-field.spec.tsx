import React from "react";
import { within } from "@testing-library/dom";

import { appTestRender } from "src/shared/tests";
import { useStore } from "src/store";

import { DepartmentField } from "./department-field";

describe("DepartmentField", () => {
  it("renders correctly", async () => {
    const { findByTestId } = await appTestRender(
      <DepartmentField
        label="Sender Department"
        placeholder="Select Sender Department"
        data-testid="sender-department"
      />,
    );

    const field = (await findByTestId("sender-department")) as HTMLElement;
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    expect(within(field).getByText("Sender Department")).toBeInTheDocument();
  });

  it("triggers package categories fetch on render", async () => {
    const departments = useStore("departments");
    const loadDepartmentsSpy = jest.spyOn(departments, "loadDepartments");

    await appTestRender(
      <DepartmentField label="Label" placeholder="Placeholder" data-testid="testid" />,
    );

    expect(loadDepartmentsSpy).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
    });
  });
});
