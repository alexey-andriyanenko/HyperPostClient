import React from "react";

import { appTestRender } from "src/shared-module/tests";
import { departmentModelMock } from "src/departments-module/models/mocks";

import { DetailsItem } from "./details-item";

describe("DetailsItem", () => {
  it("renders correctly", async () => {
    const { findByText, getByText } = await appTestRender(
      <DetailsItem title="Title" data={departmentModelMock} />,
    );

    expect(await findByText("Title")).toBeInTheDocument();
    expect(getByText("Full Address")).toBeInTheDocument();
  });
});
