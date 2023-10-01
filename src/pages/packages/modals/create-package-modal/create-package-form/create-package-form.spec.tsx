import React from "react";

import { appTestRender } from "src/shared/tests";

import { CreatePackageForm } from "./create-package-form";

describe("CreatePackageForm", () => {
  it("renders correctly", async () => {
    const { findByTestId } = await appTestRender(<CreatePackageForm />);

    expect(await findByTestId("create-package-form")).toBeInTheDocument();
  });
});
