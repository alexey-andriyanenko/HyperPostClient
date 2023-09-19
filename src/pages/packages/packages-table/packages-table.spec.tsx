import React from "react";

import { appTestRender } from "src/shared/tests";

import { PackagesTable } from "./packages-table";
import { waitForElementToBeRemoved } from "@testing-library/dom";

describe("PackagesTable", () => {
  it("renders header", async () => {
    const { findByText, getByText } = await appTestRender(<PackagesTable />);

    expect(await findByText("ID")).toBeInTheDocument();
    expect(getByText("Category")).toBeInTheDocument();
    expect(getByText("Sender")).toBeInTheDocument();
    expect(getByText("Receiver")).toBeInTheDocument();
    expect(getByText("Created At")).toBeInTheDocument();
    expect(getByText("Status")).toBeInTheDocument();
    expect(getByText("Actions")).toBeInTheDocument();
  });

  it("renders body", async () => {
    const { findByText, getByText } = await appTestRender(<PackagesTable />);

    expect(await findByText("uuid")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument();
    expect(getByText("2020-01-01T00:00:00.000Z")).toBeInTheDocument();
  });

  it("renders skeleton and then body", async () => {
    const { findByTestId, getByTestId } = await appTestRender(<PackagesTable />);

    expect(await findByTestId("packages-table-skeleton")).toBeInTheDocument();
    expect(
      await waitForElementToBeRemoved(() => getByTestId("packages-table-skeleton")),
    ).toBeUndefined();

    expect(await findByTestId("packages-table-content")).toBeInTheDocument();
  });
});
