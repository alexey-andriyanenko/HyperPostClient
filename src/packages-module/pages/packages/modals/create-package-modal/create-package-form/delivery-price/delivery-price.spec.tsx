import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared-module/tests";

import { DeliveryPrice } from "./delivery-price";
import { createPackageFormResolver } from "../create-package-form.validator";

describe("DeliveryPrice", () => {
  const Component = () => {
    const form = useForm({
      mode: "onChange",
      defaultValues: {
        deliveryPrice: undefined,
      },
      resolver: createPackageFormResolver,
    });

    return (
      <FormProvider {...form}>
        <DeliveryPrice />
      </FormProvider>
    );
  };

  it("renders correctly", async () => {
    const { getByTestId } = await appTestRender(<Component />);

    const field = getByTestId("delivery-price");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    expect(within(field).getByText("Delivery Price ($)")).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Enter delivery price");
  });

  it("changes delivery price", async () => {
    const { getByTestId } = await appTestRender(<Component />);

    const field = getByTestId("delivery-price");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "100");

    expect(input).toHaveValue(100);
  });

  it("triggers min error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("delivery-price");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "4");

    expect(getByText("Delivery price must be greater than or equal to 5$")).toBeInTheDocument();
  });

  it("triggers max error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("delivery-price");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "1000000000");

    expect(getByText("Delivery price must be less than or equal to 99999999$")).toBeInTheDocument();
  });
});
