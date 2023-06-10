import React from "react";
import { appTestRender } from "src/shared/tests";
import { Form } from "./form";

describe("Form", () => {
  it("should render successfully", () => {
    const { baseElement } = appTestRender(<Form />);
    expect(baseElement).toBeInTheDocument();
  });
});
