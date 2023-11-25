import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import { TableSkeleton } from "src/shared-module/components/ui";

import { IPackageCategory } from "src/package-categories-module/models";
import { useStore } from "src/package-categories-module/store/package-categories";
import { useModalsStore } from "src/package-categories-module/store/modals";
import { useModalsStore as useSharedModalsStore } from "src/shared-module/store/modals";

import { columns } from "./pc-table.constants";
import { PCTableContainer } from "./pc-table.styles";

export const PCTable = observer(() => {
  const modals = useModalsStore();
  const sharedModals = useSharedModalsStore();
  const packageCategories = useStore();

  useEffect(() => {
    packageCategories.loadPackageCategories(packageCategories.filters);
  }, []);

  const handleEditPackageCategory = (packageCategory: IPackageCategory) => {
    modals.open("CreatePackageCategoryModal", { packageCategory });
  };

  const handleDeletePackageCategory = (packageCategory: IPackageCategory) => {
    sharedModals.open("ConfirmModal", {
      title: "Delete Package Category",
      onConfirm: () => packageCategories.deletePackageCategory(packageCategory.id),
    });
  };

  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement> | null, page: number) =>
    packageCategories.loadPackageCategories({ ...packageCategories.filters, page: page + 1 });

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    packageCategories.loadPackageCategories({
      ...packageCategories.filters,
      limit: +event.target.value,
    });
  };

  return (
    <PCTableContainer data-testid="package-categories-table">
      {packageCategories.isLoading ? (
        <TableSkeleton columns={columns.length} data-testid="package-categories-table-skeleton" />
      ) : (
        <Table data-testid="departments-table-content">
          <TableHead>
            <TableRow>
              {columns.map((title) => (
                <TableCell key={title}> {title} </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {packageCategories.packageCategories.map((pc) => (
              <TableRow key={pc.id}>
                <TableCell> {pc.id} </TableCell>
                <TableCell> {pc.name} </TableCell>
                <TableCell>
                  <IconButton data-testid="edit-btn" onClick={() => handleEditPackageCategory(pc)}>
                    <Icon className="material-symbols-outlined">edit</Icon>
                  </IconButton>
                  <IconButton
                    data-testid="delete-btn"
                    onClick={() => handleDeletePackageCategory(pc)}
                  >
                    <Icon className="material-symbols-outlined">delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <TablePagination
        count={packageCategories.totalCount}
        page={packageCategories.filters.page - 1}
        rowsPerPage={packageCategories.filters.limit}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />
    </PCTableContainer>
  );
});
