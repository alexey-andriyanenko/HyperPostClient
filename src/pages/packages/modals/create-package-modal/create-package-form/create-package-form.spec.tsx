import React from "react";

import { appTestRender } from "src/shared/tests";

import { CreatePackageForm } from "./create-package-form";

describe("CreatePackageForm", () => {
  it("renders correctly", async () => {
    const { getByTestId } = await appTestRender(<CreatePackageForm />);

    expect(getByTestId("package-category")).toBeInTheDocument();
    expect(getByTestId("sender-department")).toBeInTheDocument();
    expect(getByTestId("receiver-department")).toBeInTheDocument();
    expect(getByTestId("from-user")).toBeInTheDocument();
    expect(getByTestId("to-user")).toBeInTheDocument();
    expect(getByTestId("description")).toBeInTheDocument();
  });
});
