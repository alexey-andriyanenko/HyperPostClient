import React from "react";

import { appTestRender } from "src/shared/tests";

import { PCTable } from "./pc-table";

describe("Package Categories Table", () => {
  it("renders header", async () => {
    const { findByText, getByText } = await appTestRender(<PCTable />);

    expect(await findByText("ID")).toBeInTheDocument();
    expect(getByText("Name")).toBeInTheDocument();
  });

  it("renders body", async () => {
    const { findByText, getByText } = await appTestRender(<PCTable />);

    expect(await findByText("1")).toBeInTheDocument();
    expect(getByText("package-category-name")).toBeInTheDocument();
  });
});
