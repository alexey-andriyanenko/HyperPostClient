import React from "react";
import { rest } from "msw";
import { FormProvider, useForm } from "react-hook-form";
import { act } from "@testing-library/react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { server } from "src/msw";
import { appTestRender } from "src/shared-module/tests";
import { apiUrl } from "src/shared-module/constants/api";

import { userApiService } from "src/user-module/api/user";
import { clientUserMock } from "src/user-module/models/mocks";

import { UserFields } from "./user-fields";
import { createPackageFormResolver } from "../create-package-form.validator";

jest.useFakeTimers({
  advanceTimers: 50,
});

describe("UserFields", () => {
  const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
    const form = useForm({
      mode: "onChange",
      defaultValues: {
        senderUserId: undefined,
        receiverUserId: undefined,
      },
      resolver: createPackageFormResolver,
    });
    return <FormProvider {...form}>{children}</FormProvider>;
  };

  it("renders correctly", async () => {
    const { findByText, getByTestId } = await appTestRender(
      <Container>
        <UserFields name="senderUserId" title="Test Title" data-testid="user-fields" />
      </Container>,
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
      <Container>
        <UserFields name="senderUserId" title="Test Title" data-testid="user-fields" />
      </Container>,
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
      <Container>
        <UserFields name="senderUserId" title="Test Title" data-testid="user-fields" />
      </Container>,
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
      <Container>
        <UserFields name="senderUserId" title="Test Title" data-testid="user-fields" />,
      </Container>,
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

  it("displays an error if receiver user equals sender user", async () => {
    server.use(
      rest.get(apiUrl + "/users/check/exists", (req, res, ctx) => {
        return res(ctx.json(clientUserMock));
      }),
    );

    const { findByTestId, getByText } = await appTestRender(
      <Container>
        <UserFields name="senderUserId" title="Sender" data-testid="sender-user" />,
        <UserFields name="receiverUserId" title="Receiver" data-testid="receiver-user" />
      </Container>,
    );

    const senderUser = (await findByTestId("sender-user")) as HTMLElement;
    const senderUserField = within(senderUser).getByTestId("phone-or-email");
    const senderUserInput = senderUserField.querySelector("input");
    if (!senderUserInput) throw new Error("senderUserInput is null");

    const receiverUser = (await findByTestId("receiver-user")) as HTMLElement;
    const receiverUserField = within(receiverUser).getByTestId("phone-or-email");
    const receiverUserInput = receiverUserField.querySelector("input");
    if (!receiverUserInput) throw new Error("receiverUserInput is null");

    await userEvent.type(senderUserInput, "test@mail.com");
    await userEvent.type(receiverUserInput, "test@mail.com");
    await act(jest.runOnlyPendingTimersAsync);

    expect(getByText("Receiver cannot be equal to Sender")).toBeInTheDocument();
  });
});
