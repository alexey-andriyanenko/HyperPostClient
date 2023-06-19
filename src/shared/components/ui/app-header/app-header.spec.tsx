import React from "react";

import { appTestRender } from "src/shared/tests";
import { AppHeader } from "./app-header";

describe("PageHeader", () => {
  it("should render successfully", async () => {
    const { container } = appTestRender(<AppHeader />);
    expect(container).not.toBeNull();
  });
});
