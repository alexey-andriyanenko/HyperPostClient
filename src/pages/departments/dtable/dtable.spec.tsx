import React from "react";
import { appTestRender } from "src/shared/tests";

import { DTable } from "./dtable";

describe("Departments Table", () => {
  it("renders header", async () => {
    const { findByText, getByText } = await appTestRender(<DTable />);

    expect(await findByText("Number #")).toBeInTheDocument();
    expect(getByText("Address")).toBeInTheDocument();
  });

  it("renders body", async () => {
    const { findByText, getByText } = await appTestRender(<DTable />);

    expect(await findByText("1")).toBeInTheDocument();
    expect(getByText("Full Address")).toBeInTheDocument();
  });

  it("renders skeleton and then content", async () => {
    const { getByTestId, findByTestId } = await appTestRender(<DTable />);

    expect(getByTestId("departments-table-skeleton")).toBeInTheDocument();
    expect(await findByTestId("departments-table-content")).toBeInTheDocument();
  });
});
