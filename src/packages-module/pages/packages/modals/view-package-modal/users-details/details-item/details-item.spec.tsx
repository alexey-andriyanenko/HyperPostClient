import React from "react";

import { appTestRender } from "src/shared-module/tests";
import { clientUserMock } from "src/user-module/models/mocks";

import { DetailsItem } from "./details-item";

describe("DetailsItem", () => {
  it("renders correctly", async () => {
    const { findByText, getByText } = await appTestRender(
      <DetailsItem title="Title" data={clientUserMock} />,
    );

    expect(await findByText("Title")).toBeInTheDocument();
    expect(getByText("client-first-name client-last-name")).toBeInTheDocument();
    expect(getByText("Email:")).toBeInTheDocument();
    expect(getByText("client@email.com")).toBeInTheDocument();
    expect(getByText("Phone:")).toBeInTheDocument();
    expect(getByText("999999")).toBeInTheDocument();
  });
});
