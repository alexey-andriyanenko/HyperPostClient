export interface ICreatePackageForm {
  categoryId: number;
  senderUserId: number;
  receiverUserId: number;
  senderDepartmentId: number;
  receiverDepartmentId: number;
  packagePrice: string;
  deliveryPrice: string;
  weight: string;
  description?: string;
}
