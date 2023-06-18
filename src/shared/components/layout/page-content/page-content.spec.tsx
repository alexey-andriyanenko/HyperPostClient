import React from "react";
import { render } from "@testing-library/react";

import { PageContent } from "./page-content";

describe("PageContent", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<PageContent />);
    expect(baseElement).toBeTruthy();
  });

  it("renders children", () => {
    const { getByText } = render(<PageContent>Test</PageContent>);
    expect(getByText("Test")).toBeTruthy();
  });
});
