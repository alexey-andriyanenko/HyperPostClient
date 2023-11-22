import { Validator } from "fluentvalidation-ts";

import { resolverFactory } from "src/shared/utils/resolver-factory";

import { ICreatePackageForm } from "./create-package-form.types";

export class CreatePackageFormValidator extends Validator<ICreatePackageForm> {
  constructor() {
    super();
    this.ruleFor("categoryId").notNull().withMessage("This field is required");

    this.ruleFor("senderUserId").notNull().withMessage("This field is required");
    this.ruleFor("senderUserId")
      .must((senderUserId, model) => senderUserId !== model.receiverUserId)
      .withMessage("Sender cannot be equal to Receiver")
      .when((model) => model.receiverUserId !== undefined);

    this.ruleFor("receiverUserId").notNull().withMessage("This field is required");
    this.ruleFor("receiverUserId")
      .must((receiverUserId, model) => receiverUserId !== model.senderUserId)
      .withMessage("Receiver cannot be equal to Sender")
      .when((model) => model.senderUserId !== undefined);

    this.ruleFor("senderDepartmentId").notNull().withMessage("This field is required");
    this.ruleFor("senderDepartmentId")
      .must((senderDepartmentId, model) => senderDepartmentId !== model.receiverDepartmentId)
      .withMessage("Sender Department cannot be equal to Receiver Department")
      .when((model) => model.receiverDepartmentId !== undefined);

    this.ruleFor("receiverDepartmentId").notNull().withMessage("This field is required");
    this.ruleFor("receiverDepartmentId")
      .must((receiverDepartmentId, model) => receiverDepartmentId !== model.senderDepartmentId)
      .withMessage("Receiver Department cannot be equal to Sender Department");

    this.ruleForTransformed("packagePrice", (packagePrice) => Number(packagePrice))
      .greaterThanOrEqualTo(0)
      .withMessage("Package price must be greater than or equal to 0$");
    this.ruleForTransformed("packagePrice", (packagePrice) => Number(packagePrice))

      .lessThanOrEqualTo(99999999)
      .withMessage("Package price must be less than or equal to 99999999$");

    this.ruleForTransformed("deliveryPrice", (v) => Number(v))
      .lessThanOrEqualTo(99999999)
      .withMessage("Delivery price must be less than or equal to 99999999$");
    this.ruleForTransformed("deliveryPrice", (v) => Number(v))
      .greaterThanOrEqualTo(5)
      .withMessage("Delivery price must be greater than or equal to 5$");

    this.ruleForTransformed("weight", (v) => Number(v))
      .greaterThanOrEqualTo(0.2)
      .withMessage("Weight must be greater than 0.2kg");
    this.ruleForTransformed("weight", (v) => Number(v))
      .lessThanOrEqualTo(1000)
      .withMessage("Weight must be less than or equal to 1000kg");

    this.ruleFor("description").notNull().withMessage("This field is required");
    this.ruleFor("description")
      .maxLength(50)
      .withMessage("Description must be less than or equal to 50 characters");
  }
}

export const createPackageFormResolver = resolverFactory<ICreatePackageForm>(
  new CreatePackageFormValidator(),
);
