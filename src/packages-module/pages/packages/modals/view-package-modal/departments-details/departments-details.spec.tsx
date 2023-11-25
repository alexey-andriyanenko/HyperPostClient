import React from "react";

import { appTestRender } from "src/shared-module/tests";
import { departmentModelMock } from "src/departments-module/models/mocks";

import { DepartmentsDetails } from "./departments-details";

describe("DepartmentsDetails", () => {
  it("renders correctly", async () => {
    const { findByText, getByText } = await appTestRender(
      <DepartmentsDetails
        senderDepartment={{ ...departmentModelMock, fullAddress: "sender-address" }}
        receiverDepartment={{ ...departmentModelMock, fullAddress: "receiver-address" }}
      />,
    );

    expect(await findByText("From address:")).toBeInTheDocument();
    expect(getByText("sender-address")).toBeInTheDocument();

    expect(getByText("To address:")).toBeInTheDocument();
    expect(getByText("receiver-address")).toBeInTheDocument();
  });
});
