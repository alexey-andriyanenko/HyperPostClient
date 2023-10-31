import React from "react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared/tests";

import { DescriptionField } from "./description-field";

describe("DescriptionField", () => {
  it("renders correctly", async () => {
    const { getByTestId } = await appTestRender(<DescriptionField />);

    const field = getByTestId("description");
    const textarea = field.querySelector("textarea");
    if (!textarea) throw new Error("Textarea not found");

    expect(within(field).getAllByText("Package Description")).toHaveLength(2); // material-ui implementation details
    expect(textarea).toHaveAttribute("placeholder", "Enter Package Description");
  });

  it("changes description", async () => {
    const { getByTestId } = await appTestRender(<DescriptionField />);

    const field = getByTestId("description");
    const textarea = field.querySelector("textarea");
    if (!textarea) throw new Error("Textarea not found");

    await userEvent.type(textarea, "test description");

    expect(textarea).toHaveValue("test description");
  });

  it("limits description length", async () => {
    const { getByTestId } = await appTestRender(<DescriptionField />);

    const field = getByTestId("description");
    const textarea = field.querySelector("textarea");
    if (!textarea) throw new Error("Textarea not found");

    await userEvent.type(textarea, "a".repeat(151));

    expect(textarea).toHaveValue("a".repeat(150));
  });
});