import React from "react";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared-module/tests";

import { useModalsStore } from "src/package-categories-module/store/modals";

import PackageCategories from "./package-categories";

describe("PackageCategories", () => {
  it("renders correctly", async () => {
    const { getByText, getByTestId } = await appTestRender(<PackageCategories />);

    expect(getByText("Package Categories")).toBeInTheDocument();
    expect(getByText("Create New Package Category")).toBeInTheDocument();
    expect(getByTestId("package-categories-table")).toBeInTheDocument();
  });

  it("opens create package category modal on button click", async () => {
    const modals = useModalsStore();
    const openModalSpy = jest.spyOn(modals, "open");

    const { getByTestId } = await appTestRender(<PackageCategories />);

    await userEvent.click(getByTestId("create-package-category-button"));

    expect(openModalSpy).toHaveBeenCalledWith("CreatePackageCategoryModal", {});
    expect(getByTestId("create-package-category-modal")).toBeInTheDocument();
  });
});
