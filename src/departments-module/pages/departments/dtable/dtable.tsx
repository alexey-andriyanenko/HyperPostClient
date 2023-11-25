import React, { useEffect } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TablePagination,
  IconButton,
  Icon,
} from "@mui/material";
import { observer } from "mobx-react-lite";

import { TableSkeleton } from "src/shared-module/components/ui";

import { IDepartment } from "src/departments-module/models";
import { useStore } from "src/departments-module/store/departments";
import { useModalsStore } from "src/departments-module/store/modals";
import { useModalsStore as useSharedModalsStore } from "src/shared-module/store/modals";

import { DTableContainer } from "./dtable.style";
import { columns } from "./dtable.constants";

export const DTable = observer(() => {
  const departments = useStore();
  const modals = useModalsStore();
  const sharedModals = useSharedModalsStore();

  useEffect(() => {
    departments.loadDepartments(departments.filters);
  }, []);

  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement> | null, page: number) =>
    departments.loadDepartments({ ...departments.filters, page: page + 1 });

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    departments.loadDepartments({
      ...departments.filters,
      limit: +event.target.value,
    });

  const handleEditDepartment = (department: IDepartment) => {
    modals.open("CreateDepartmentModal", { department });
  };

  const handleDeleteDepartment = (department: IDepartment) => {
    sharedModals.open("ConfirmModal", {
      title: "Delete Department",
      onConfirm: () => departments.deleteDepartment(department.id),
    });
  };

  return (
    <DTableContainer data-testid="departments-table">
      {departments.isLoading ? (
        <TableSkeleton columns={columns.length} data-testid="departments-table-skeleton" />
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
            {departments.departments.map((department) => (
              <TableRow
                key={`department-${department.id}`}
                data-testid={`department-${department.id}`}
              >
                <TableCell> {department.number} </TableCell>
                <TableCell> {department.fullAddress} </TableCell>
                <TableCell>
                  <IconButton
                    data-testid="edit-btn"
                    onClick={() => handleEditDepartment(department)}
                  >
                    <Icon className="material-symbols-outlined">edit</Icon>
                  </IconButton>
                  <IconButton
                    data-testid="delete-btn"
                    onClick={() => handleDeleteDepartment(department)}
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
        count={departments.totalCount}
        page={departments.filters.page - 1}
        rowsPerPage={departments.filters.limit}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />
    </DTableContainer>
  );
});
