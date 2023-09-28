import React from "react";

import { appTestRender } from "src/shared/tests";
import { packageModelMock } from "src/models/mocks";

import { ViewPackageModal } from "./view-package-modal";

describe("ViewPackageModal", () => {
  it("should render successfully", async () => {
    const { findByText, getByTestId } = await appTestRender(
      <ViewPackageModal isOpen onClose={jest.fn} data={packageModelMock} />,
    );

    expect(await findByText("Package Details")).toBeInTheDocument();
    expect(getByTestId("status-details")).toBeInTheDocument();
    expect(getByTestId("users-details")).toBeInTheDocument();
    expect(getByTestId("departments-details")).toBeInTheDocument();
  });
});
