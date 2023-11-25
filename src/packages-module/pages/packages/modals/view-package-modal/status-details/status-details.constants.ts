import { PackageDateFieldName } from "./status-details.types";

export const statusSteps: Array<{
  label: string;
  labelFor: PackageDateFieldName;
  statusName: string;
}> = [
  {
    label: "Created",
    labelFor: "createdAt",
    statusName: "created",
  },
  {
    label: "Sent",
    labelFor: "sentAt",
    statusName: "sent",
  },
  {
    label: "Arrived",
    labelFor: "arrivedAt",
    statusName: "arrived",
  },
  {
    label: "Received",
    labelFor: "receivedAt",
    statusName: "received",
  },
  {
    label: "Archived",
    labelFor: "archivedAt",
    statusName: "archived",
  },
];
