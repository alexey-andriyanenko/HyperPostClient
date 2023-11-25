import React from "react";

import { appTestRender } from "src/shared-module/tests";

import { CreatePackageModal } from "./create-package-modal";

describe("CreatePackageModal", () => {
  it("renders correctly", async () => {
    const { findByText, getByTestId } = await appTestRender(
      <CreatePackageModal isOpen={true} onClose={jest.fn} />,
    );

    expect(await findByText("Create Package")).toBeInTheDocument();
    expect(getByTestId("create-package-form")).toBeInTheDocument();
  });
});
