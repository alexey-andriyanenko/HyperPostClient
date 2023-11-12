import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared/tests";

import { PackagePrice } from "./package-price";

describe("PackagePrice", () => {
  const Component = () => {
    const form = useForm({
      mode: "onChange",
      defaultValues: {
        packagePrice: "",
      },
    });

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

    expect(within(field).getByText("Package Price ($)")).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Enter package price");
  });

  it("changes package price", async () => {
    const { getByTestId } = await appTestRender(<Component />);

    const field = getByTestId("package-price");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "100");

    expect(input).toHaveValue(100);
  });

  it("clears input and displays required error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("package-price");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "100");
    await userEvent.clear(input);

    expect(input).toHaveValue(null);
    expect(getByText("This field is required")).toBeInTheDocument();
  });

  it("triggers displays min error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("package-price");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "0");

    expect(getByText("Minimum package price is 1$")).toBeInTheDocument();
  });

  it("triggers displays max error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("package-price");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "999999999");

    expect(getByText("Maximum package price is 99999999$")).toBeInTheDocument();
  });
});
