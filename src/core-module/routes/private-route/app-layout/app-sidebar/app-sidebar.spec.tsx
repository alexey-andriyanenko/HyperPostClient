import React from "react";
import { spyOn } from "jest-mock";
import userEvent from "@testing-library/user-event";

import { eventBus } from "src/event-bus";
import { appTestRender } from "src/shared-module/tests";

import { AppSidebar } from "./app-sidebar";

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

  it("logout triggers event bus emit", async () => {
    const emitSpy = spyOn(eventBus, "emit");
    const { getByText } = await appTestRender(<AppSidebar />);

    await userEvent.click(getByText("Log Out"));

    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith("logout");
  });
});
