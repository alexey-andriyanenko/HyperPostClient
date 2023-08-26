import React, { useEffect } from "react";

import { useStore } from "src/store";
import { TableSkeleton } from "src/shared/components/ui";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import { columns } from "./pc-table.constants";
import { PCTableContainer } from "./pc-table.styles";
import { observer } from "mobx-react-lite";

export const PCTable = observer(() => {
  const packageCategories = useStore("packageCategories");

  useEffect(() => {
    packageCategories.loadPackageCategories(packageCategories.filters);
  }, []);

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
