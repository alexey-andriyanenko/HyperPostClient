import React from "react";
import { render } from "@testing-library/react";
import { within } from "@testing-library/dom";

import { AppLayout } from "./app-layout";

describe("AppLayout", () => {
  it("should render successfully", () => {
    const { getByTestId, baseElement } = render(<AppLayout />);
    expect(baseElement).toBeTruthy();

    expect(getByTestId("page-header")).toBeInTheDocument();
    expect(getByTestId("page-container")).toBeInTheDocument();
    expect(getByTestId("page-content")).toBeInTheDocument();
  });

  it("renders children", () => {
    const { getByTestId } = render(<AppLayout>Test</AppLayout>);
    expect(within(getByTestId("page-content")).getByText("Test")).toBeInTheDocument();
  });
});
