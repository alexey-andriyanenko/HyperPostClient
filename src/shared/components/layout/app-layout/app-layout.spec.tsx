import React from "react";

import { appTestRender } from "src/shared/tests";
import { AppLayout } from "./app-layout";

describe("AppLayout", () => {
  it("should render successfully", async () => {
    const { getByTestId, baseElement } = await appTestRender(<AppLayout />, false);
    expect(baseElement).toBeTruthy();

    expect(getByTestId("page-header")).toBeInTheDocument();
    expect(getByTestId("page-container")).toBeInTheDocument();
  });

  it("renders children", async () => {
    const { getByText } = await appTestRender(<AppLayout>Test</AppLayout>, false);
    expect(getByText("Test")).toBeInTheDocument();
  });
});
