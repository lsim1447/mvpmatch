import { IReport } from '../utils/models/Report';

export const getTotal = (reports: IReport[]): number => {
  return reports.reduce((acc: number, report: IReport) => {
    return acc + report.amount;
  }, 0);
};
