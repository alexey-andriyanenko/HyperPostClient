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
    expect(getByTestId("package-price")).toBeInTheDocument();
    expect(getByTestId("delivery-price")).toBeInTheDocument();
    expect(getByTestId("package-weight")).toBeInTheDocument();
    expect(getByTestId("description")).toBeInTheDocument();
    expect(getByTestId("submit-btn")).toBeInTheDocument();
  });
});
