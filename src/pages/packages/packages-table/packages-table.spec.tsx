import React from "react";
import { waitForElementToBeRemoved } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared/tests";
import { useStore } from "src/store";

import { PackagesTable } from "./packages-table";

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
    const { findByText, getByText, getByTestId } = await appTestRender(<PackagesTable />);

    expect(await findByText("uuid")).toBeInTheDocument();
    expect(getByText("category-name")).toBeInTheDocument();
    expect(getByText("sender-first-name sender-last-name")).toBeInTheDocument();
    expect(getByText("receiver-first-name receiver-last-name")).toBeInTheDocument();
    expect(getByTestId("package-status")).toBeInTheDocument();
    expect(getByText("01/01/2020")).toBeInTheDocument();
  });

  it("renders skeleton and then body", async () => {
    const { findByTestId, getByTestId } = await appTestRender(<PackagesTable />);

    expect(await findByTestId("packages-table-skeleton")).toBeInTheDocument();
    expect(
      await waitForElementToBeRemoved(() => getByTestId("packages-table-skeleton")),
    ).toBeUndefined();

    expect(await findByTestId("packages-table-content")).toBeInTheDocument();
  });

  it("opens view package modal on view btn click", async () => {
    const modals = useStore("modals");
    const openSpy = jest.spyOn(modals, "open");
    const { findByTestId } = await appTestRender(<PackagesTable />);

    await userEvent.click(await findByTestId("view-btn"));

    expect(openSpy).toHaveBeenCalledWith("ViewPackageModal", {
      data: expect.any(Object),
    });
  });
});
