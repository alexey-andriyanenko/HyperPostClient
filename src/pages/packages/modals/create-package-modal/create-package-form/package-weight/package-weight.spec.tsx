import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared/tests";

import { PackageWeight } from "./package-weight";

describe("PackageWeight", () => {
  const Component = () => {
    const form = useForm({
      defaultValues: {
        weight: "",
      },
      mode: "onChange",
    });

    return (
      <FormProvider {...form}>
        <PackageWeight />
      </FormProvider>
    );
  };

  it("renders correctly", async () => {
    const { getByTestId } = await appTestRender(<Component />);

    const field = getByTestId("package-weight");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    expect(within(field).getByText("Package Weight (kg)")).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Enter package weight");
  });

  it("changes package price", async () => {
    const { getByTestId } = await appTestRender(<Component />);

    const field = getByTestId("package-weight");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "100");

    expect(input).toHaveValue(100);
  });

  it("clears value and displays required error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("package-weight");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "100");
    await userEvent.clear(input);

    expect(input).toHaveValue(null);
    expect(getByText("This field is required")).toBeInTheDocument();
  });

  it("triggers min value error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("package-weight");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "0.1");

    expect(getByText("Minimum weight is 0.2 kg")).toBeInTheDocument();
  });

  it("triggers max value error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("package-weight");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "10000");

    expect(getByText("Maximum weight is 9999 kg")).toBeInTheDocument();
  });
});
