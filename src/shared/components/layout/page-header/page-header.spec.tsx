import React from "react";
import { render } from "@testing-library/react";

import { PageHeader } from "./page-header";

describe("PageHeader", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<PageHeader />);
    expect(baseElement).toBeTruthy();
  });
});
