import React from "react";
import { render } from "@testing-library/react";

import { AppHeader } from "./app-header";

describe("PageHeader", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<AppHeader />);
    expect(baseElement).toBeTruthy();
  });
});
