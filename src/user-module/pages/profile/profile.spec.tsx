import React from "react";

import { appTestRender } from "src/shared-module/tests";

import Profile from "./profile";

describe("Profile", () => {
  it("should render successfully", async () => {
    const { getByText, getByTestId } = await appTestRender(<Profile />);

    expect(getByText("Profile")).toBeInTheDocument();
    expect(getByTestId("profile-form")).toBeInTheDocument();
  });
});
