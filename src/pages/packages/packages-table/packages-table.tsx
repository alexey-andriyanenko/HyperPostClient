import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  IconButton,
  Icon,
} from "@mui/material";

import { useStore } from "src/store";
import { IPackage } from "src/models";
import { TableSkeleton } from "src/shared/components/ui";
import { formatDate } from "src/shared/utils";

import { columns } from "./packages-table.constants";
import { PackageStatus } from "./package-status";

export const PackagesTable: React.FC = observer(() => {
  const modals = useStore("modals");
  const packages = useStore("packages");

  useEffect(() => {
    packages.loadPackages(packages.filters);
  }, []);

  const handleView = (p: IPackage) => {
    modals.open("ViewPackageModal", {
      data: p,
    });
  };

  return (
    <TableContainer data-testid="packages-table">
      {packages.isLoading ? (
        <TableSkeleton columns={columns.length} data-testid="packages-table-skeleton" />
      ) : (
        <Table data-testid="packages-table-content">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}> {column} </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {packages.packages.map((p) => (
              <TableRow key={p.id}>
                <TableCell> {p.id} </TableCell>
                <TableCell> {p.category.name} </TableCell>
                <TableCell>{`${p.senderUser.firstName} ${p.senderUser.lastName}`}</TableCell>
                <TableCell>{`${p.receiverUser.firstName} ${p.receiverUser.lastName}`}</TableCell>
                <TableCell> {formatDate(new Date(p.createdAt))} </TableCell>
                <TableCell>
                  <PackageStatus status={p.statusId} />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(p)} data-testid="view-btn">
                    <Icon className="material-symbols-outlined">visibility</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
});
