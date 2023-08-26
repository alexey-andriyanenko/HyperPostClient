import React from "react";

import { appTestRender } from "src/shared/tests";

import PackageCategories from "./package-categories";

describe("PackageCategories", () => {
  it("renders correctly", async () => {
    const { getByText, getByTestId } = await appTestRender(<PackageCategories />);

    expect(getByText("Package Categories")).toBeInTheDocument();
    expect(getByTestId("package-categories-table")).toBeInTheDocument();
  });
});
