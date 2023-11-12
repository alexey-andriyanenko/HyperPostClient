import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared/tests";

import { DeliveryPrice } from "./delivery-price";

describe("DeliveryPrice", () => {
  const Component = () => {
    const form = useForm({
      mode: "onChange",
      defaultValues: {
        deliveryPrice: "",
      },
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

  it("clears input and displays required error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("delivery-price");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "100");
    await userEvent.clear(input);
    await userEvent.tab();

    expect(getByText("This field is required")).toBeInTheDocument();
  });

  it("triggers min error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("delivery-price");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "4");

    expect(getByText("Minimum delivery price is 5$")).toBeInTheDocument();
  });

  it("triggers max error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("delivery-price");
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "100000000");

    expect(getByText("Maximum delivery price is 99999999$")).toBeInTheDocument();
  });
});
