export interface IPackage {
  id: string;
  statusId: number;
  categoryId: number;
  senderUserId: number;
  receiverUserId: number;
  senderDepartmentId: number;
  receiverDepartmentId: number;
  createdAt: string;
  modifiedAt: string | null;
  sentAt: string | null;
  arrivedAt: string | null;
  receivedAt: string | null;
  archivedAt: string | null;
  packagePrice: number;
  deliveryPrice: number;
  weight: number;
  description: string | null;
}
