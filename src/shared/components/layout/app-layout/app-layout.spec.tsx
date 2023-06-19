import React from "react";

import { appTestRender } from "src/shared/tests";
import { AppLayout } from "./app-layout";

describe("AppLayout", () => {
  it("should render successfully", () => {
    const { getByTestId, baseElement } = appTestRender(<AppLayout />);
    expect(baseElement).toBeTruthy();

    expect(getByTestId("page-header")).toBeInTheDocument();
    expect(getByTestId("page-container")).toBeInTheDocument();
  });

  it("renders children", () => {
    const { getByText } = appTestRender(<AppLayout>Test</AppLayout>);
    expect(getByText("Test")).toBeInTheDocument();
  });
});
