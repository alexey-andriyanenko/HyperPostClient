export interface ICreatePackageRequest {
  categoryId: number;
  senderUserId: number;
  receiverUserId: number;
  senderDepartmentId: number;
  receiverDepartmentId: number;
  packagePrice: number;
  deliveryPrice: number;
  weight: number;
  description: string | null;
}
