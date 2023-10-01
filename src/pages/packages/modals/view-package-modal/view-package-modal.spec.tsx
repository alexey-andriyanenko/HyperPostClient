import React from "react";

import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared/tests";
import { packageModelMock } from "src/models/mocks";

import { ViewPackageModal } from "./view-package-modal";

describe("ViewPackageModal", () => {
  it("should render successfully", async () => {
    const { findByText, getByText, getByTestId } = await appTestRender(
      <ViewPackageModal isOpen onClose={jest.fn} data={packageModelMock} />,
    );

    expect(await findByText("Package Details")).toBeInTheDocument();
    expect(getByTestId("status-details")).toBeInTheDocument();
    expect(getByTestId("users-details")).toBeInTheDocument();
    expect(getByTestId("departments-details")).toBeInTheDocument();
    expect(getByTestId("package-details")).toBeInTheDocument();
    expect(getByText("Close")).toBeInTheDocument();
  });

  it("triggers onClose on close button click", async () => {
    const onClose = jest.fn();
    const { findByTestId } = await appTestRender(
      <ViewPackageModal isOpen onClose={onClose} data={packageModelMock} />,
    );

    await userEvent.click(await findByTestId("close-button"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
