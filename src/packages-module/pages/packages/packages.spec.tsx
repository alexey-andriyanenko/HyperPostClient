import React from "react";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared-module/tests";
import { useModalsStore } from "src/packages-module/store/modals";

import Packages from "./packages";

describe("Packages", () => {
  it("renders correctly", async () => {
    const { findByText, getByText, getByTestId } = await appTestRender(<Packages />);

    expect(await findByText("Packages")).toBeInTheDocument();
    expect(getByText("Create New Package")).toBeInTheDocument();
    expect(getByTestId("packages-table")).toBeInTheDocument();
  });

  it("opens create package modal", async () => {
    const modals = useModalsStore();
    const openSpy = jest.spyOn(modals, "open");
    const { findByTestId } = await appTestRender(<Packages />);

    await userEvent.click(await findByTestId("create-package-button"));

    expect(openSpy).toHaveBeenCalledWith("CreatePackageModal", {});
  });
});
