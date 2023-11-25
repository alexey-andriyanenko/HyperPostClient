import React from "react";

import { appTestRender } from "src/shared-module/tests";
import { clientUserMock } from "src/user-module/models/mocks";

import { UsersDetails } from "./users-details";

describe("UsersDetails", () => {
  it("renders correctly", async () => {
    const { findByText, getByText } = await appTestRender(
      <UsersDetails
        senderUser={clientUserMock}
        receiverUser={{
          ...clientUserMock,
          firstName: "receiver-first-name",
          lastName: "receiver-last-name",
        }}
      />,
    );

    expect(await findByText("Sender")).toBeInTheDocument();
    expect(getByText("client-first-name client-last-name")).toBeInTheDocument();

    expect(getByText("Receiver")).toBeInTheDocument();
    expect(getByText("receiver-first-name receiver-last-name")).toBeInTheDocument();
  });
});
