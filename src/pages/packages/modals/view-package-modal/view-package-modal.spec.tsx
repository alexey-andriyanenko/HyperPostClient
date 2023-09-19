import React from "react";

import { appTestRender } from "src/shared/tests";
import { packageMock } from "src/models/mocks";

import { ViewPackageModal } from "./view-package-modal";

describe("ViewPackageModal", () => {
  it("should render successfully", async () => {
    const { findByText } = await appTestRender(
      <ViewPackageModal isOpen onClose={jest.fn} data={packageMock} />,
    );

    expect(await findByText("Package Details")).toBeInTheDocument();
  });
});
