import React from "react";
import { appTestRender } from "src/shared/tests";
import userEvent from "@testing-library/user-event";

import Auth from "./auth";

describe("Auth", () => {
  it("renders correct either phone or email form", async () => {
    const { getByTestId, queryByTestId } = await appTestRender(<Auth />, false);

    expect(getByTestId("login-via-email-form")).toBeInTheDocument();
    expect(getByTestId("login-via-phone-button")).toBeInTheDocument();
    expect(queryByTestId("login-via-phone-form")).not.toBeInTheDocument();
    expect(queryByTestId("login-via-email-button")).not.toBeInTheDocument();

    await userEvent.click(getByTestId("login-via-phone-button"));

    expect(getByTestId("login-via-phone-form")).toBeInTheDocument();
    expect(getByTestId("login-via-email-button")).toBeInTheDocument();
    expect(queryByTestId("login-via-email-form")).not.toBeInTheDocument();
    expect(queryByTestId("login-via-phone-button")).not.toBeInTheDocument();
  });
});
