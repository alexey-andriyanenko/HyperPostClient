import React from "react";

import { appTestRender } from "src/shared-module/tests";
import { packageModelMock } from "src/packages-module/models/mocks";

import { PackageDetails } from "./package-details";
describe("PackageDetails", () => {
  it("renders correctly", async () => {
    const { findByText, getByText } = await appTestRender(
      <PackageDetails data={packageModelMock} />,
    );

    expect(await findByText("Package Price:")).toBeInTheDocument();
    expect(getByText("50$")).toBeInTheDocument();
    expect(getByText("Delivery Price:")).toBeInTheDocument();
    expect(getByText("5$")).toBeInTheDocument();
    expect(getByText("Weight:")).toBeInTheDocument();
    expect(getByText("2kg")).toBeInTheDocument();
    expect(getByText("package-description")).toBeInTheDocument();
  });
});
