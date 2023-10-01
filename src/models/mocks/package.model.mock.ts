import { IPackage } from "../business/package";

export const packageModelMock: IPackage = {
  id: "uuid",
  statusId: 1,
  category: {
    id: 1,
    name: "category-name",
  },
  senderUser: {
    id: 1,
    roleId: 3,
    firstName: "sender-first-name",
    lastName: "sender-last-name",
    email: "sender@email.com",
    phoneNumber: "123454321",
  },
  receiverUser: {
    id: 2,
    roleId: 3,
    firstName: "receiver-first-name",
    lastName: "receiver-last-name",
    email: "receiver@email.com",
    phoneNumber: "12344321",
  },
  senderDepartment: {
    id: 1,
    number: 1,
    fullAddress: "sender-department-address",
  },
  receiverDepartment: {
    id: 2,
    number: 2,
    fullAddress: "receiver-department-address",
  },
  createdAt: "2020-01-01T00:00:00.000Z",
  modifiedAt: null,
  sentAt: null,
  arrivedAt: null,
  receivedAt: null,
  archivedAt: null,
  packagePrice: 50,
  deliveryPrice: 5,
  weight: 2,
  description: "package-description",
};

export const packageSentMock: IPackage = {
  ...packageModelMock,
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
