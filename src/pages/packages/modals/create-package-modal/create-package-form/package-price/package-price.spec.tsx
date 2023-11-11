import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared/tests";

import { PackagePrice } from "./package-price";

describe("PackagePrice", () => {
  const Component = () => {
    const form = useForm();

    return (
      <FormProvider {...form}>
        <PackagePrice />
      </FormProvider>
    );
  };

  it("renders correctly", async () => {
    const { getByTestId } = await appTestRender(<Component />);

    const field = getByTestId("package-price");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    expect(within(field).getByText("Package Price")).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Enter package price");
  });

  it("changes package price", async () => {
    const { getByTestId } = await appTestRender(<Component />);

    const field = getByTestId("package-price");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "100");

    expect(input).toHaveValue("100");
  });
});
