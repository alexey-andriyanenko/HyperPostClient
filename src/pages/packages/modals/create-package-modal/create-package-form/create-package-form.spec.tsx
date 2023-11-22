import React from "react";
import { rest } from "msw";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { server } from "tests/msw-server";

import { appTestRender } from "src/shared/tests";
import { apiUrl } from "src/constants/api";
import { clientMock, managerMock } from "src/api/user/mocks";
import { packagesApiService } from "src/api/packages";

import { CreatePackageForm } from "./create-package-form";

describe("CreatePackageForm", () => {
  const senderEmail = "sender@example.com";
  const receiverEmail = "receiver@example.com";

  beforeEach(() => {
    server.use(
      rest.get(apiUrl + "/users/check/exists", (req, res, ctx) => {
        const email = req.url.searchParams.get("email");
        let result;

        if (email === senderEmail) result = clientMock;
        if (email === receiverEmail) result = managerMock;

        return res(ctx.json(result));
      }),
    );
  });

  it("renders components", async () => {
    const { getByTestId } = await appTestRender(<CreatePackageForm onClose={jest.fn} />);

    expect(getByTestId("package-category")).toBeInTheDocument();
    expect(getByTestId("sender-department")).toBeInTheDocument();
    expect(getByTestId("receiver-department")).toBeInTheDocument();
    expect(getByTestId("from-user")).toBeInTheDocument();
    expect(getByTestId("to-user")).toBeInTheDocument();
    expect(getByTestId("package-price")).toBeInTheDocument();
    expect(getByTestId("delivery-price")).toBeInTheDocument();
    expect(getByTestId("package-weight")).toBeInTheDocument();
    expect(getByTestId("description")).toBeInTheDocument();
    expect(getByTestId("submit-btn")).toBeInTheDocument();
  });

  it("renders titles/placeholders", async () => {
    const { getByTestId } = await appTestRender(<CreatePackageForm onClose={jest.fn} />);

    const senderDepartment = getByTestId("sender-department");
    const senderDepartmentInput = senderDepartment.querySelector("input");
    if (!senderDepartmentInput) throw new Error("senderDepartmentInput is null");
    expect(senderDepartmentInput).toHaveAttribute("placeholder", "Select Sender Department");
    expect(within(senderDepartment).getByText("Sender Department")).toBeInTheDocument();

    const receiverDepartment = getByTestId("receiver-department");
    const receiverDepartmentInput = receiverDepartment.querySelector("input");
    if (!receiverDepartmentInput) throw new Error("receiverDepartmentInput is null");
    expect(receiverDepartmentInput).toHaveAttribute("placeholder", "Select Receiver Department");
    expect(within(receiverDepartment).getByText("Receiver Department")).toBeInTheDocument();

    const senderUser = getByTestId("from-user");
    const senderUserInput = senderUser.querySelector("input");
    if (!senderUserInput) throw new Error("senderUserInput is null");
    expect(within(senderUser).getByText("From")).toBeInTheDocument();

    const receiverUser = getByTestId("to-user");
    const receiverUserInput = receiverUser.querySelector("input");
    if (!receiverUserInput) throw new Error("receiverUserInput is null");
    expect(within(receiverUser).getByText("To")).toBeInTheDocument();
  });

  it("triggers package creation request on submit and onClose on success", async () => {
    const requestSpy = jest.spyOn(packagesApiService, "createPackage");
    const onClose = jest.fn();

    const { getByTestId, getByText } = await appTestRender(<CreatePackageForm onClose={onClose} />);

    const packageCategory = getByTestId("package-category");
    const packageCategoryInput = packageCategory.querySelector("input");
    if (!packageCategoryInput) throw new Error("packageCategoryInput is null");

    const senderDepartment = getByTestId("sender-department");
    const senderDepartmentInput = senderDepartment.querySelector("input");
    if (!senderDepartmentInput) throw new Error("senderDepartmentInput is null");

    const receiverDepartment = getByTestId("receiver-department");
    const receiverDepartmentInput = receiverDepartment.querySelector("input");
    if (!receiverDepartmentInput) throw new Error("receiverDepartmentInput is null");

    const senderUser = getByTestId("from-user");
    const senderUserInput = senderUser.querySelector("input");
    if (!senderUserInput) throw new Error("senderUserInput is null");

    const receiverUser = getByTestId("to-user");
    const receiverUserInput = receiverUser.querySelector("input");
    if (!receiverUserInput) throw new Error("receiverUserInput is null");

    const packagePrice = getByTestId("package-price");
    const packagePriceInput = packagePrice.querySelector("input");
    if (!packagePriceInput) throw new Error("packagePriceInput is null");

    const deliveryPrice = getByTestId("delivery-price");
    const deliveryPriceInput = deliveryPrice.querySelector("input");
    if (!deliveryPriceInput) throw new Error("deliveryPriceInput is null");

    const packageWeight = getByTestId("package-weight");
    const packageWeightInput = packageWeight.querySelector("input");
    if (!packageWeightInput) throw new Error("packageWeightInput is null");

    const description = getByTestId("description");
    const descriptionInput = description.querySelector("textarea");
    if (!descriptionInput) throw new Error("descriptionInput is null");

    const submitButton = getByTestId("submit-btn");

    expect(submitButton).not.toBeDisabled();

    await userEvent.click(packageCategoryInput);
    await userEvent.click(getByText("package-category-name"));

    await userEvent.click(senderDepartmentInput);
    await userEvent.click(getByText("#1 - department-1-address"));

    await userEvent.click(receiverDepartmentInput);
    await userEvent.click(getByText("#2 - department-2-address"));

    await userEvent.type(senderUserInput, senderEmail);
    await userEvent.type(receiverUserInput, receiverEmail);

    await userEvent.type(packagePriceInput, "100");
    await userEvent.type(deliveryPriceInput, "100");
    await userEvent.type(packageWeightInput, "100");
    await userEvent.type(descriptionInput, "test description");

    await userEvent.click(submitButton);

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith({
      categoryId: 1,
      senderDepartmentId: 1,
      receiverDepartmentId: 2,
      senderUserId: 3,
      receiverUserId: 2,
      packagePrice: 100,
      deliveryPrice: 100,
      weight: 100,
      description: "test description",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not trigger onClose if package creation request returns an error", async () => {
    const senderEmail = "sender@example.com";
    const receiverEmail = "receiver@example.com";
    const onClose = jest.fn();

    server.use(
      rest.post(apiUrl + "/packages", (req, res, ctx) => {
        return res(ctx.status(422));
      }),
    );

    const { getByTestId, getByText } = await appTestRender(<CreatePackageForm onClose={onClose} />);

    const packageCategory = getByTestId("package-category");
    const packageCategoryInput = packageCategory.querySelector("input");
    if (!packageCategoryInput) throw new Error("packageCategoryInput is null");

    const senderDepartment = getByTestId("sender-department");
    const senderDepartmentInput = senderDepartment.querySelector("input");
    if (!senderDepartmentInput) throw new Error("senderDepartmentInput is null");

    const receiverDepartment = getByTestId("receiver-department");
    const receiverDepartmentInput = receiverDepartment.querySelector("input");
    if (!receiverDepartmentInput) throw new Error("receiverDepartmentInput is null");

    const senderUser = getByTestId("from-user");
    const senderUserInput = senderUser.querySelector("input");
    if (!senderUserInput) throw new Error("senderUserInput is null");

    const receiverUser = getByTestId("to-user");
    const receiverUserInput = receiverUser.querySelector("input");
    if (!receiverUserInput) throw new Error("receiverUserInput is null");

    const packagePrice = getByTestId("package-price");
    const packagePriceInput = packagePrice.querySelector("input");
    if (!packagePriceInput) throw new Error("packagePriceInput is null");

    const deliveryPrice = getByTestId("delivery-price");
    const deliveryPriceInput = deliveryPrice.querySelector("input");
    if (!deliveryPriceInput) throw new Error("deliveryPriceInput is null");

    const packageWeight = getByTestId("package-weight");
    const packageWeightInput = packageWeight.querySelector("input");
    if (!packageWeightInput) throw new Error("packageWeightInput is null");

    const description = getByTestId("description");
    const descriptionInput = description.querySelector("textarea");
    if (!descriptionInput) throw new Error("descriptionInput is null");

    const submitButton = getByTestId("submit-btn");

    expect(submitButton).not.toBeDisabled();

    await userEvent.click(packageCategoryInput);
    await userEvent.click(getByText("package-category-name"));

    await userEvent.click(senderDepartmentInput);
    await userEvent.click(getByText("#1 - department-1-address"));

    await userEvent.click(receiverDepartmentInput);
    await userEvent.click(getByText("#2 - department-2-address"));

    await userEvent.type(senderUserInput, senderEmail);
    await userEvent.type(receiverUserInput, receiverEmail);

    await userEvent.type(packagePriceInput, "100");
    await userEvent.type(deliveryPriceInput, "100");
    await userEvent.type(packageWeightInput, "100");
    await userEvent.type(descriptionInput, "test description");

    await userEvent.click(submitButton);

    expect(onClose).not.toHaveBeenCalled();
  });
});
