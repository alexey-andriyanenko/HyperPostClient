import React from "react";
import { spyOn } from "jest-mock";

import { appTestRender } from "src/shared/tests";
import { rootStore } from "src/store";

import { AppSidebar } from "./app-sidebar";
import userEvent from "@testing-library/user-event";

describe("AppSidebar", () => {
  it("renders all nav items", async () => {
    const { getByText } = await appTestRender(<AppSidebar />);

    expect(getByText("Packages")).toBeInTheDocument();
    expect(getByText("Users")).toBeInTheDocument();
    expect(getByText("Departments")).toBeInTheDocument();
    expect(getByText("Package Categories")).toBeInTheDocument();
    expect(getByText("Package Statuses")).toBeInTheDocument();
    expect(getByText("Roles")).toBeInTheDocument();
    expect(getByText("Log Out")).toBeInTheDocument();
  });

  it("logout triggers rootStore.logout()", async () => {
    const logoutSpy = spyOn(rootStore, "logout");
    const { getByText } = await appTestRender(<AppSidebar />);

    await userEvent.click(getByText("Log Out"));
    expect(logoutSpy).toHaveBeenCalled();
  });
});
