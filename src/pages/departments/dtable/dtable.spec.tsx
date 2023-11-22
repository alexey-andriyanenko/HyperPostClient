import React from "react";
import { appTestRender } from "src/shared/tests";
import userEvent from "@testing-library/user-event";

import { useStore } from "src/store";
import { DTable } from "./dtable";
import { within } from "@testing-library/dom";

describe("Departments Table", () => {
  it("renders header", async () => {
    const { findByText, getByText } = await appTestRender(<DTable />);

    expect(await findByText("Number #")).toBeInTheDocument();
    expect(getByText("Address")).toBeInTheDocument();
    expect(getByText("Action")).toBeInTheDocument();
  });

  it("renders body", async () => {
    const { findByText, getByText, getAllByTestId } = await appTestRender(<DTable />);

    expect(await findByText("1")).toBeInTheDocument();
    expect(getByText("department-1-address")).toBeInTheDocument();

    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("department-2-address")).toBeInTheDocument();

    expect(getAllByTestId("edit-btn")).toHaveLength(2);
    expect(getAllByTestId("delete-btn")).toHaveLength(2);
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
    const row = await findByTestId("department-1");
    const edit = within(row).getByTestId("edit-btn");

    await userEvent.click(edit);

    expect(openSpy).toHaveBeenCalledWith("CreateDepartmentModal", {
      department: {
        id: 1,
        number: 1,
        fullAddress: "department-1-address",
      },
    });
    expect(getByTestId("create-department-modal")).toBeInTheDocument();
  });

  it("opens delete confirm modal on delete", async () => {
    const modals = useStore("modals");
    const openSpy = jest.spyOn(modals, "open");

    const { findByTestId } = await appTestRender(<DTable />);
    const row = await findByTestId("department-1");
    const del = within(row).getByTestId("delete-btn");

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
    const row = await findByTestId("department-1");
    const del = within(row).getByTestId("delete-btn");

    await userEvent.click(del);

    const confirm = await findByTestId("confirm-btn");

    await userEvent.click(confirm);

    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});
