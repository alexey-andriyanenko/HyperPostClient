import React from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Skeleton } from "@mui/material";

export interface ITableSkeletonProps {
  columns: number;
  rows?: number;
  "data-testid"?: string;
}

export const TableSkeleton: React.FC<ITableSkeletonProps> = ({
  columns,
  rows = 8,
  "data-testid": testId = "table-skeleton",
}) => {
  const c = new Array(columns).fill(0, 0, columns);
  const r = new Array(rows).fill(0, 0, rows);

  return (
    <Table data-testid={testId}>
      <TableHead>
        <TableRow>
          {c.map((_, index) => (
            <TableCell key={index}>
              <Skeleton variant="rectangular" />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {r.map((_, ri) => (
          <TableRow key={ri}>
            {c.map((_, ci) => (
              <TableCell key={ci}>
                <Skeleton variant="rectangular" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
