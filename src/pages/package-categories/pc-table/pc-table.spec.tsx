import React from "react";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared/tests";
import { useStore } from "src/store";

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

  it("renders skeleton and then content", async () => {
    const { getByTestId, findByTestId } = await appTestRender(<PCTable />);

    expect(getByTestId("package-categories-table-skeleton")).toBeInTheDocument();
    expect(await findByTestId("package-categories-table")).toBeInTheDocument();
  });

  it("opens create package category modal", async () => {
    const modals = useStore("modals");
    const openSpy = jest.spyOn(modals, "open");

    const { findByTestId, getByTestId } = await appTestRender(<PCTable />);

    const edit = await findByTestId("edit-btn");

    await userEvent.click(edit);
    expect(openSpy).toHaveBeenCalledWith("CreatePackageCategoryModal", {
      packageCategory: {
        id: 1,
        name: "package-category-name",
      },
    });
    expect(getByTestId("create-package-category-modal")).toBeInTheDocument();
  });

  it("opens delete package category modal", async () => {
    const modals = useStore("modals");
    const openSpy = jest.spyOn(modals, "open");

    const { findByTestId } = await appTestRender(<PCTable />);

    const del = await findByTestId("delete-btn");

    await userEvent.click(del);

    expect(openSpy).toHaveBeenCalledWith("ConfirmModal", {
      title: "Delete Package Category",
      onConfirm: expect.any(Function),
    });
  });

  it("triggers delete package category", async () => {
    const packageCategories = useStore("packageCategories");
    const deleteSpy = jest.spyOn(packageCategories, "deletePackageCategory");

    const { findByTestId, getByTestId } = await appTestRender(<PCTable />);
    const del = await findByTestId("delete-btn");

    await userEvent.click(del);

    const confirm = getByTestId("confirm-btn");

    await userEvent.click(confirm);

    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});
