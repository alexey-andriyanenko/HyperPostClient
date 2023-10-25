import React from "react";
import { rest } from "msw";
import { act } from "@testing-library/react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { server } from "tests/msw-server";
import { appTestRender } from "src/shared/tests";
import { userApiService } from "src/api/user";
import { apiUrl } from "src/constants/api";
import { clientUserMock } from "src/models/mocks";

import { UserFields } from "./user-fields";

jest.useFakeTimers({
  advanceTimers: 50,
});

describe("UserFields", () => {
  it("renders correctly", async () => {
    const { findByText, getByTestId } = await appTestRender(
      <UserFields title="Test Title" data-testid="user-fields" />,
    );

    expect(await findByText("Test Title")).toBeInTheDocument();

    const phoneOrEmail = getByTestId("phone-or-email");
    const phoneOrEmailInput = phoneOrEmail.querySelector("input");
    if (!phoneOrEmailInput) throw new Error("phoneOrEmailInput is null");

    expect(within(phoneOrEmail).getByText("Phone number or email")).toBeInTheDocument();
    expect(phoneOrEmailInput).toHaveAttribute("placeholder", "Enter phone number or email");

    const firstName = getByTestId("first-name");
    const firstNameInput = firstName.querySelector("input");
    if (!firstNameInput) throw new Error("firstNameInput is null");

    expect(within(firstName).getByText("First Name")).toBeInTheDocument();
    expect(firstNameInput).toHaveAttribute("placeholder", "Enter First Name");

    const lastName = getByTestId("last-name");
    const lastNameInput = lastName.querySelector("input");
    if (!lastNameInput) throw new Error("lastNameInput is null");

    expect(within(lastName).getByText("Last Name")).toBeInTheDocument();
    expect(lastNameInput).toHaveAttribute("placeholder", "Enter Last Name");
  });

  it("searches user by email", async () => {
    const requestSpy = jest.spyOn(userApiService, "checkIfUserExists");

    const { getByTestId } = await appTestRender(
      <UserFields title="Test Title" data-testid="user-fields" />,
    );

    const phoneOrEmail = getByTestId("phone-or-email");
    const phoneOrEmailInput = phoneOrEmail.querySelector("input");
    if (!phoneOrEmailInput) throw new Error("phoneOrEmailInput is null");

    await userEvent.type(phoneOrEmailInput, "test@example.com");
    await act(jest.runOnlyPendingTimersAsync);

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith({
      email: "test@example.com",
      phone: undefined,
    });
  });

  it("searches user by phone", async () => {
    const requestSpy = jest.spyOn(userApiService, "checkIfUserExists");

    const { getByTestId } = await appTestRender(
      <UserFields title="Test Title" data-testid="user-fields" />,
    );

    const phoneOrEmail = getByTestId("phone-or-email");
    const phoneOrEmailInput = phoneOrEmail.querySelector("input");
    if (!phoneOrEmailInput) throw new Error("phoneOrEmailInput is null");

    await userEvent.type(phoneOrEmailInput, "123456789");
    await act(jest.runOnlyPendingTimersAsync);

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith({
      email: undefined,
      phone: "123456789",
    });
  });

  it("fills first name and last name with values of found user", async () => {
    server.use(
      rest.get(apiUrl + "/users/check/exists", (req, res, ctx) => {
        return res(ctx.json(clientUserMock));
      }),
    );

    const { getByTestId } = await appTestRender(
      <UserFields title="Test Title" data-testid="user-fields" />,
    );

    const phoneOrEmail = getByTestId("phone-or-email");
    const phoneOrEmailInput = phoneOrEmail.querySelector("input");
    if (!phoneOrEmailInput) throw new Error("phoneOrEmailInput is null");

    const firstName = getByTestId("first-name");
    const firstNameInput = firstName.querySelector("input");
    if (!firstNameInput) throw new Error("firstNameInput is null");

    const lastName = getByTestId("last-name");
    const lastNameInput = lastName.querySelector("input");
    if (!lastNameInput) throw new Error("lastNameInput is null");

    await userEvent.type(phoneOrEmailInput, "test@mail.com");
    await act(jest.runOnlyPendingTimersAsync);

    expect(firstNameInput).toHaveValue(clientUserMock.firstName);
    expect(lastNameInput).toHaveValue(clientUserMock.lastName);
  });
});
