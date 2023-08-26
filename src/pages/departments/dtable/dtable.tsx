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

import { useStore } from "src/store";
import { TableSkeleton } from "src/shared/components/ui";
import { IDepartment } from "src/models";

import { DTableContainer } from "./dtable.style";
import { columns } from "./dtable.constants";

export const DTable = observer(() => {
  const departments = useStore("departments");
  const modals = useStore("modals");

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
              <TableRow key={department.id}>
                <TableCell> {department.number} </TableCell>
                <TableCell> {department.fullAddress} </TableCell>
                <TableCell>
                  <IconButton
                    data-testid="edit-button"
                    onClick={() => handleEditDepartment(department)}
                  >
                    <Icon className="material-symbols-outlined">edit</Icon>
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
