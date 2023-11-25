import React from "react";

import { appTestRender } from "src/shared-module/tests";
import { AppHeader } from "./app-header";

describe("PageHeader", () => {
  it("should render successfully", async () => {
    const { container } = await appTestRender(<AppHeader />, false);
    expect(container).not.toBeNull();
  });
});
