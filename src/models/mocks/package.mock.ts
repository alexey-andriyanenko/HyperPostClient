import { IPackage } from "../package";

export const packageMock: IPackage = {
  id: "uuid",
  statusId: 1,
  categoryId: 1,
  senderUserId: 1,
  receiverUserId: 2,
  senderDepartmentId: 1,
  receiverDepartmentId: 2,
  createdAt: "2020-01-01T00:00:00.000Z",
  modifiedAt: null,
  sentAt: null,
  arrivedAt: null,
  receivedAt: null,
  archivedAt: null,
  packagePrice: 50,
  deliveryPrice: 5,
  weight: 5,
  description: null,
};
