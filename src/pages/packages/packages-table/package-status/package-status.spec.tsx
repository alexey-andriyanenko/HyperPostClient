import React from "react";

import { appTestRender } from "src/shared/tests";
import { PackageStatusEnum } from "src/models";

import { PackageStatus } from "./package-status";

describe("PackageStatus", () => {
  it("renders correctly with CREATED status", async () => {
    const { getByTestId } = await appTestRender(
      <PackageStatus status={PackageStatusEnum.Created} />,
    );
    expect(getByTestId("package-status")).toHaveTextContent("Created");
  });

  it("renders correctly with SENT status", async () => {
    const { getByTestId } = await appTestRender(<PackageStatus status={PackageStatusEnum.Sent} />);
    expect(getByTestId("package-status")).toHaveTextContent("Sent");
  });

  it("renders correctly with ARRIVED status", async () => {
    const { getByTestId } = await appTestRender(
      <PackageStatus status={PackageStatusEnum.Arrived} />,
    );
    expect(getByTestId("package-status")).toHaveTextContent("Arrived");
  });

  it("renders correctly with RECEIVED status", async () => {
    const { getByTestId } = await appTestRender(
      <PackageStatus status={PackageStatusEnum.Received} />,
    );
    expect(getByTestId("package-status")).toHaveTextContent("Received");
  });

  it("renders correctly with ARCHIVED status", async () => {
    const { getByTestId } = await appTestRender(
      <PackageStatus status={PackageStatusEnum.Archived} />,
    );
    expect(getByTestId("package-status")).toHaveTextContent("Archived");
  });

  it("renders correctly with MODIFIED status", async () => {
    const { getByTestId } = await appTestRender(
      <PackageStatus status={PackageStatusEnum.Modified} />,
    );
    expect(getByTestId("package-status")).toHaveTextContent("Modified");
  });
});
