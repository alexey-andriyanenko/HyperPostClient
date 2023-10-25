import React from "react";
import { within } from "@testing-library/dom";

import { appTestRender } from "src/shared/tests";
import { useStore } from "src/store";

import { PackageCategoryField } from "./package-category-field";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";

jest.useFakeTimers({
  advanceTimers: 50,
});

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

  it("triggers search only once on multiple key presses", async () => {
    const packageCategories = useStore("packageCategories");
    const loadPackageCategoriesSpy = jest.spyOn(packageCategories, "loadPackageCategories");

    const { findByTestId } = await appTestRender(<PackageCategoryField />);

    loadPackageCategoriesSpy.mockReset();

    const field = (await findByTestId("package-category")) as HTMLElement;
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.type(input, "test");
    await act(jest.runOnlyPendingTimersAsync);

    expect(input).toHaveValue("test");
    expect(loadPackageCategoriesSpy).toHaveBeenCalledTimes(1);
    expect(loadPackageCategoriesSpy).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      name: "test",
    });
  });

  it("selects package category and displays its name as input's value", async () => {
    const { findByTestId, getByText } = await appTestRender(<PackageCategoryField />);

    const field = (await findByTestId("package-category")) as HTMLElement;
    const input = field.querySelector("input");
    if (!input) throw new Error("Input not found");

    await userEvent.click(input);
    await userEvent.click(getByText("package-category-name"));

    expect(input).toHaveValue("package-category-name");
  });
});
