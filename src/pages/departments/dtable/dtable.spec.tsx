import React from "react";
import { appTestRender } from "src/shared/tests";
import userEvent from "@testing-library/user-event";

import { useStore } from "src/store";
import { DTable } from "./dtable";

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
    expect(getByTestId("edit-btn")).toBeInTheDocument();
    expect(getByTestId("delete-btn")).toBeInTheDocument();
  });

  it("renders skeleton and then content", async () => {
    const { getByTestId, findByTestId } = await appTestRender(<DTable />);

    expect(getByTestId("departments-table-skeleton")).toBeInTheDocument();
    expect(await findByTestId("departments-table-content")).toBeInTheDocument();
  });

  it("opens create department modal on edit", async () => {
    const modals = useStore("modals");
    const openSpy = jest.spyOn(modals, "open");

    const { findByTestId, getByTestId } = await appTestRender(<DTable />);
    const edit = await findByTestId("edit-btn");

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

  it("opens delete confirm modal on delete", async () => {
    const modals = useStore("modals");
    const openSpy = jest.spyOn(modals, "open");

    const { findByTestId } = await appTestRender(<DTable />);
    const del = await findByTestId("delete-btn");

    await userEvent.click(del);

    expect(openSpy).toHaveBeenCalledWith("ConfirmModal", {
      title: "Delete Department",
      onConfirm: expect.any(Function),
    });
  });

  it("triggers department delete on confirm", async () => {
    const departments = useStore("departments");
    const deleteSpy = jest.spyOn(departments, "deleteDepartment");

    const { findByTestId } = await appTestRender(<DTable />);
    const del = await findByTestId("delete-btn");

    await userEvent.click(del);

    const confirm = await findByTestId("confirm-btn");

    await userEvent.click(confirm);

    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});
