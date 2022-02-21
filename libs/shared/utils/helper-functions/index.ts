import { IReport } from '../models/Report';

export function compareByDate(reportA: IReport, reportB: IReport) {
  if (reportA.created < reportB.created) {
    return -1;
  }
  if (reportA.created > reportB.created) {
    return 1;
  }
  return 0;
}
