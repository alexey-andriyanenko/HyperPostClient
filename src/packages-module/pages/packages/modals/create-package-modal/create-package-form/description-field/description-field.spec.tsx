import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared-module/tests";

import { DescriptionField } from "./description-field";
import { createPackageFormResolver } from "../create-package-form.validator";

describe("DescriptionField", () => {
  const Component = () => {
    const form = useForm({
      mode: "onChange",
      defaultValues: {
        description: "",
      },
      resolver: createPackageFormResolver,
    });
    return (
      <FormProvider {...form}>
        <DescriptionField />
      </FormProvider>
    );
  };

  it("renders correctly", async () => {
    const { getByTestId } = await appTestRender(<Component />);

    const field = getByTestId("description");
    const textarea = field.querySelector("textarea");
    if (!textarea) throw new Error("Textarea not found");

    expect(within(field).getAllByText("Package Description")).toHaveLength(2); // material-ui implementation details
    expect(textarea).toHaveAttribute("placeholder", "Enter Package Description");
  });

  it("changes description", async () => {
    const { getByTestId } = await appTestRender(<Component />);

    const field = getByTestId("description");
    const textarea = field.querySelector("textarea");
    if (!textarea) throw new Error("Textarea not found");

    await userEvent.type(textarea, "test description");

    expect(textarea).toHaveValue("test description");
  });

  it("triggers maxLength error", async () => {
    const { getByTestId, getByText } = await appTestRender(<Component />);

    const field = getByTestId("description");
    const textarea = field.querySelector("textarea");
    if (!textarea) throw new Error("Textarea not found");

    await userEvent.type(textarea, "a".repeat(51));

    expect(
      getByText("Description must be less than or equal to 50 characters"),
    ).toBeInTheDocument();
  });
});
