import React, { useEffect } from "react";
import { Table, TableRow, TableCell, TableBody, TableHead } from "@mui/material";
import { observer } from "mobx-react-lite";

import { useStore } from "src/store";
import { TableSkeleton } from "src/shared/components/ui";

import { DTableContainer } from "./dtable.style";
import { columns } from "./dtable.constants";

export const DTable = observer(() => {
  const departments = useStore("departments");

  useEffect(() => {
    departments.loadDepartments();
  }, []);

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DTableContainer>
  );
});
