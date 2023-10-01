import React from "react";
import { within } from "@testing-library/dom";

import { appTestRender } from "src/shared/tests";
import { useStore } from "src/store";

import { PackageCategoryField } from "./package-category-field";

describe("CategoryField", () => {
  it("renders correctly", async () => {
    const { findByTestId } = await appTestRender(<PackageCategoryField />);

    const field = (await findByTestId("package-category")) as HTMLElement;
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    expect(within(field).getByText("Package Category")).toBeInTheDocument();
  });

  it("triggers package categories fetch on render", async () => {
    const packageCategories = useStore("packageCategories");
    const loadPackageCategoriesSpy = jest.spyOn(packageCategories, "loadPackageCategories");

    await appTestRender(<PackageCategoryField />);

    expect(loadPackageCategoriesSpy).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
    });
  });
});
