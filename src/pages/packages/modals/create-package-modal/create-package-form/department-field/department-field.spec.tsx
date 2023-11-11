import React from "react";
import { FormProvider, useForm } from "react-hook-form";
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
  const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
    const form = useForm();
    return <FormProvider {...form}>{children}</FormProvider>;
  };

  it("renders correctly", async () => {
    const { findByTestId } = await appTestRender(
      <Container>
        <DepartmentField
          name="senderDepartmentId"
          label="Sender Department"
          placeholder="Select Sender Department"
          data-testid="sender-department"
        />
      </Container>,
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
      <Container>
        <DepartmentField
          name="senderDepartmentId"
          label="Label"
          placeholder="Placeholder"
          data-testid="testid"
        />
      </Container>,
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
      <Container>
        <DepartmentField
          name="senderDepartmentId"
          label="Sender Department"
          placeholder="Select Sender Department"
          data-testid="sender-department"
        />
      </Container>,
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
      <Container>
        <DepartmentField
          name="senderDepartmentId"
          label="Sender Department"
          placeholder="Select Sender Department"
          data-testid="sender-department"
        />
      </Container>,
    );

    const field = (await findByTestId("sender-department")) as HTMLElement;
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.click(input);
    await userEvent.click(getByText("#1 - Full Address"));

    expect(input).toHaveValue("#1 - Full Address");
  });
});
