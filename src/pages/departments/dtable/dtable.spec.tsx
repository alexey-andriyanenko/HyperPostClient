import React from "react";
import { appTestRender } from "src/shared/tests";

import { DTable } from "./dtable";
import userEvent from "@testing-library/user-event";
import { useStore } from "../../../store";

describe("Departments Table", () => {
  it("renders header", async () => {
    const { findByText, getByText } = await appTestRender(<DTable />);

    expect(await findByText("Number #")).toBeInTheDocument();
    expect(getByText("Address")).toBeInTheDocument();
    expect(getByText("Action")).toBeInTheDocument();
  });

  it("renders body", async () => {
    const { findByText, getByText, getByTestId } = await appTestRender(<DTable />);

    expect(await findByText("1")).toBeInTheDocument();
    expect(getByText("Full Address")).toBeInTheDocument();
    expect(getByTestId("edit-button")).toBeInTheDocument();
  });

  it("renders skeleton and then content", async () => {
    const { getByTestId, findByTestId } = await appTestRender(<DTable />);

    expect(getByTestId("departments-table-skeleton")).toBeInTheDocument();
    expect(await findByTestId("departments-table-content")).toBeInTheDocument();
  });

  it("opens create department modal", async () => {
    const modals = useStore("modals");
    const openSpy = jest.spyOn(modals, "open");

    const { findByTestId, getByTestId } = await appTestRender(<DTable />);

    const edit = await findByTestId("edit-button");

    await userEvent.click(edit);
    expect(openSpy).toHaveBeenCalledWith("CreateDepartmentModal", {
      department: {
        id: 1,
        number: 1,
        fullAddress: "Full Address",
      },
    });
    expect(getByTestId("create-department-modal")).toBeInTheDocument();
  });
});
