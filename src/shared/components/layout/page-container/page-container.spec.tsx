import React from "react";
import { render } from "@testing-library/react";

import { PageContainer } from "./page-container";

describe("PageContainer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<PageContainer />);
    expect(baseElement).toBeTruthy();
  });

  it("renders children", () => {
    const { getByText } = render(<PageContainer>Test</PageContainer>);
    expect(getByText("Test")).toBeInTheDocument();
  });
});
