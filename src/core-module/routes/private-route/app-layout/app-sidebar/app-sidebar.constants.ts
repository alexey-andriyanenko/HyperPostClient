import { PackagesRoutes } from "src/packages-module";
import { DepartmentsRoutes } from "src/departments-module";
import { PackagesCategoriesRoutes } from "src/package-categories-module";

export const navItems: Array<{ path: string; label: string }> = [
  {
    path: PackagesRoutes.packages,
    label: "Packages",
  },
  {
    path: DepartmentsRoutes.departments,
    label: "Departments",
  },
  {
    path: PackagesCategoriesRoutes.packagesCategories,
    label: "Package Categories",
  },
];
