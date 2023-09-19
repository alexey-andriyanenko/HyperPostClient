import { IPackage, TPaginationResponse } from "src/models";

export const packagesMock: TPaginationResponse<IPackage> = {
  list: [
    {
      id: "uuid",
      statusId: 1,
      categoryId: 2,
      senderUserId: 3,
      receiverUserId: 4,
      senderDepartmentId: 5,
      receiverDepartmentId: 6,
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
    },
  ],
  totalPages: 1,
  totalCount: 1,
};
