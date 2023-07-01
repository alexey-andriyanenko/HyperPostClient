import React from "react";
import { appTestRender } from "src/shared/tests";

import Departments from "./departments";

describe("Departments", () => {
  it("renders correctly", async () => {
    const { getByText, getByTestId } = await appTestRender(<Departments />);

    expect(getByText("Departments")).toBeInTheDocument();
    expect(getByTestId("departments-table")).toBeInTheDocument();
  });
});
