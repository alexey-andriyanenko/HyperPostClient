import React from "react";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared/tests";
import { ConfirmModal } from "./confirm-modal";

jest.useFakeTimers({
  advanceTimers: 10,
});

describe("ConfirmModal", () => {
  it("renders text", async () => {
    const { findByText, getByText } = await appTestRender(
      <ConfirmModal title="title" onConfirm={jest.fn()} onClose={jest.fn()} isOpen />,
    );

    expect(await findByText("title")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Confirm")).toBeInTheDocument();
  });

  it("triggers onConfirm and then onClose on confirm btn click", async () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const { findByTestId } = await appTestRender(
      <ConfirmModal title="title" onConfirm={onConfirm} onClose={onClose} isOpen />,
    );
    const confirmBtn = await findByTestId("confirm-btn");

    await userEvent.click(confirmBtn);

    expect(onConfirm).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("disabled confirm btn, show loader inside of it if async onConfirm was provided", async () => {
    const onConfirm = () => new Promise((resolve) => setTimeout(resolve, 10));
    const { findByTestId, getByTestId } = await appTestRender(
      <ConfirmModal title="title" onConfirm={onConfirm} onClose={jest.fn()} isOpen />,
    );
    const confirmBtn = await findByTestId("confirm-btn");

    await userEvent.click(confirmBtn);

    expect(confirmBtn).toBeDisabled();
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("triggers onClose on cancel btn click", async () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const { findByTestId } = await appTestRender(
      <ConfirmModal title="title" onConfirm={onConfirm} onClose={onClose} isOpen />,
    );
    const cancelBtn = await findByTestId("cancel-btn");

    await userEvent.click(cancelBtn);

    expect(onClose).toHaveBeenCalled();
  });
});
