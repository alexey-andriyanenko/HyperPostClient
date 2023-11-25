import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared-module/tests";

import { PackageWeight } from "./package-weight";
import { createPackageFormResolver } from "../create-package-form.validator";

describe("PackageWeight", () => {
  const Component = () => {
    const form = useForm({
      defaultValues: {
        weight: undefined,
      },
      resolver: createPackageFormResolver,
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

  it("triggers min value error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("package-weight");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "0.1");

    expect(getByText("Weight must be greater than 0.2kg")).toBeInTheDocument();
  });

  it("triggers max value error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("package-weight");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "1001");

    expect(getByText("Weight must be less than or equal to 1000kg")).toBeInTheDocument();
  });
});
