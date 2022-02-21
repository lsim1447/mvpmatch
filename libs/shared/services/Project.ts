import { IProject } from '../utils/models/Project';
import { DEFAULT_PROJECT_VALUE } from '../utils/constants';
import { GroupedReportsByTarget, IReport } from '../utils/models/Report';

export const getProjectById = (
  projects: IProject[],
  projectId: string
): IProject => {
  const similarProjects = projects.filter(
    (project: IProject) => project.projectId === projectId
  );

  if (similarProjects.length > 0) {
    return similarProjects[0];
  }

  return DEFAULT_PROJECT_VALUE;
};

export const getProjectTotalAmountById = (
  groupedReportsByProject: GroupedReportsByTarget,
  projectId: string
): number => {
  return groupedReportsByProject[`${projectId}`].reduce(function (
    acc: number,
    report: IReport
  ) {
    return acc + report.amount;
  },
  0);
};
