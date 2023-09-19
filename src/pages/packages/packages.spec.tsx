import React from "react";

import { appTestRender } from "src/shared/tests";

import Packages from "./packages";

describe("Packages", () => {
  it("renders correctly", async () => {
    const { findByText, getByText, getByTestId } = await appTestRender(<Packages />);

    expect(await findByText("Packages")).toBeInTheDocument();
    expect(getByText("Create New Package")).toBeInTheDocument();
    expect(getByTestId("packages-table")).toBeInTheDocument();
  });
});
