import React from "react";
import { within } from "@testing-library/dom";
import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared/tests";
import { useStore } from "src/store";

import { DepartmentField } from "./department-field";

jest.useFakeTimers({
  advanceTimers: 50,
});

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
    expect(input).toHaveAttribute("placeholder", "Select Sender Department");
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

  it("triggers search on multiple key presses only once", async () => {
    const departments = useStore("departments");
    const loadDepartmentsSpy = jest.spyOn(departments, "loadDepartments");

    const { findByTestId } = await appTestRender(
      <DepartmentField
        label="Sender Department"
        placeholder="Select Sender Department"
        data-testid="sender-department"
      />,
    );

    loadDepartmentsSpy.mockReset();

    const field = (await findByTestId("sender-department")) as HTMLElement;
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "test");
    await act(jest.runOnlyPendingTimersAsync);

    expect(loadDepartmentsSpy).toHaveBeenCalledTimes(1);
    expect(loadDepartmentsSpy).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      address: "test",
    });
  });

  it("selects department and displays its label as input's value", async () => {
    const { findByTestId, getByText } = await appTestRender(
      <DepartmentField
        label="Sender Department"
        placeholder="Select Sender Department"
        data-testid="sender-department"
      />,
    );

    const field = (await findByTestId("sender-department")) as HTMLElement;
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.click(input);
    await userEvent.click(getByText("#1 - Full Address"));

    expect(input).toHaveValue("#1 - Full Address");
  });
});
