import React from "react";
import userEvent from "@testing-library/user-event";

import { appTestRender } from "src/shared-module/tests";

import { CreatePackageCategoryModal } from "./create-package-category-modal";

describe("CreatePackageCategoryModal", () => {
  it("renders correctly", async () => {
    const { getByText, getByTestId } = await appTestRender(
      <CreatePackageCategoryModal isOpen={true} onClose={jest.fn} />,
    );

    expect(getByText("Create Package Category")).toBeInTheDocument();
    expect(getByTestId("create-package-category-form")).toBeInTheDocument();
  });

  it("triggers onClose on cancel btn click", async () => {
    const onClose = jest.fn();
    const { getByTestId } = await appTestRender(
      <CreatePackageCategoryModal isOpen={true} onClose={onClose} />,
    );

    const cancelBtn = getByTestId("cancel-btn");

    await userEvent.click(cancelBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
