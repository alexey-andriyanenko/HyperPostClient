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

export const packageSentMock: IPackage = {
  ...packageMock,
  statusId: 2,
  sentAt: "2020-01-02T00:00:00.000Z",
};

export const packageArrivedMock: IPackage = {
  ...packageSentMock,
  statusId: 3,
  arrivedAt: "2020-01-03T00:00:00.000Z",
};

export const packageReceivedMock: IPackage = {
  ...packageArrivedMock,
  statusId: 4,
  receivedAt: "2020-01-04T00:00:00.000Z",
};

export const packageArchivedMock: IPackage = {
  ...packageReceivedMock,
  statusId: 5,
  archivedAt: "2020-01-05T00:00:00.000Z",
};
