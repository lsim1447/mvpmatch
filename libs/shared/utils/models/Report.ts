export interface IReport {
  amount: number;
  created: string;
  gatewayId: string;
  modified: string;
  paymentId: string;
  projectId: string;
  userIds: string[];
}

export interface GroupedReportsByTarget {
  [key: string]: IReport[];
}
