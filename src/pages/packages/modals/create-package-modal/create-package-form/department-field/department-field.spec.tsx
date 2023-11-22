import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { within } from "@testing-library/dom";
import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared/tests";
import { useStore } from "src/store";

import { DepartmentField } from "./department-field";
import { createPackageFormResolver } from "../create-package-form.validator";

jest.useFakeTimers({
  advanceTimers: 50,
});

describe("DepartmentField", () => {
  const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
    const form = useForm({
      mode: "onChange",
      resolver: createPackageFormResolver,
    });
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
    await userEvent.click(getByText("#1 - department-1-address"));

    expect(input).toHaveValue("#1 - department-1-address");
  });

  it("clears value and displays required error", async () => {
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
    await userEvent.click(getByText("#1 - department-1-address"));
    await userEvent.clear(input);

    expect(input).toHaveValue("");
    expect(getByText("This field is required")).toBeInTheDocument();
  });

  it("displays error message if receiver department equals sender department", async () => {
    const { findByTestId, getByText } = await appTestRender(
      <Container>
        <DepartmentField
          name="senderDepartmentId"
          label="Sender Department"
          placeholder="Select Sender Department"
          data-testid="sender-department"
        />
        <DepartmentField
          name="receiverDepartmentId"
          label="Receiver Department"
          placeholder="Select Receiver Department"
          data-testid="receiver-department"
        />
      </Container>,
    );

    const senderDepartmentField = (await findByTestId("sender-department")) as HTMLElement;
    const senderDepartmentInput = senderDepartmentField.querySelector("input");
    if (!senderDepartmentInput) throw new Error("Input not found");

    const receiverDepartmentField = (await findByTestId("receiver-department")) as HTMLElement;
    const receiverDepartmentInput = receiverDepartmentField.querySelector("input");
    if (!receiverDepartmentInput) throw new Error("Input not found");

    await userEvent.click(senderDepartmentInput);
    await userEvent.click(getByText("#1 - department-1-address"));

    await userEvent.click(receiverDepartmentInput);
    await userEvent.click(getByText("#1 - department-1-address"));

    expect(
      getByText("Receiver Department cannot be equal to Sender Department"),
    ).toBeInTheDocument();
  });

  it("displays error message if sender department equals receiver department", async () => {
    const { findByTestId, getByText } = await appTestRender(
      <Container>
        <DepartmentField
          name="senderDepartmentId"
          label="Sender Department"
          placeholder="Select Sender Department"
          data-testid="sender-department"
        />
        <DepartmentField
          name="receiverDepartmentId"
          label="Receiver Department"
          placeholder="Select Receiver Department"
          data-testid="receiver-department"
        />
      </Container>,
    );

    const senderDepartmentField = (await findByTestId("sender-department")) as HTMLElement;
    const senderDepartmentInput = senderDepartmentField.querySelector("input");
    if (!senderDepartmentInput) throw new Error("Input not found");

    const receiverDepartmentField = (await findByTestId("receiver-department")) as HTMLElement;
    const receiverDepartmentInput = receiverDepartmentField.querySelector("input");
    if (!receiverDepartmentInput) throw new Error("Input not found");

    await userEvent.click(receiverDepartmentInput);
    await userEvent.click(getByText("#1 - department-1-address"));

    await userEvent.click(senderDepartmentInput);
    await userEvent.click(getByText("#1 - department-1-address"));

    expect(
      getByText("Sender Department cannot be equal to Receiver Department"),
    ).toBeInTheDocument();
  });
});
