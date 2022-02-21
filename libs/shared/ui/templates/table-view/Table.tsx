import { useContext } from 'react';
import { IReport } from '../../../utils/models/Report';
import { GatewayContext } from '../../../utils/context/GatewayContext';
import { ProjectContext } from '../../../utils/context/ProjectContext';
import { getGatewayById } from '../../../services/Gateway';
import {
  getProjectById,
  getProjectTotalAmountById
} from '../../../services/Project';
import { getGatewayTotalAmountById } from '../../../services/Gateway';
import {
  ITableProps,
  TableColumn,
  TableHeader,
  TableRow,
  TableStatus,
  ProjectName,
  ProjectNameContainer,
  ProjectTotal
} from './libs/StyledTableComponents';

const Table = ({
  projectId,
  gatewayId,
  groupedReportsByProject,
  groupedReportsByGateway
}: ITableProps) => {
  const { projects } = useContext(ProjectContext);
  const { gateways } = useContext(GatewayContext);

  const getTableStatusText = (): string => {
    const projectPart = projectId
      ? getProjectById(projects, projectId).name
      : 'All project';
    const gatewayPart = gatewayId
      ? getGatewayById(gateways, gatewayId).name
      : 'All gateway';

    return `${projectPart} | ${gatewayPart}`;
  };

  return (
    <>
      <TableStatus> {getTableStatusText()}</TableStatus>

      {projectId && !gatewayId && (
        <>
          {groupedReportsByGateway &&
            Object.keys(groupedReportsByGateway).map(
              (currentGatewayId, gatewayIndex) => {
                return groupedReportsByGateway[`${currentGatewayId}`].map(
                  (report: IReport, index: number) => {
                    if (index === 0) {
                      return (
                        <div key={`${report.paymentId}}`}>
                          {!(projectId && gatewayId) && (
                            <ProjectNameContainer>
                              <ProjectName>
                                {
                                  getGatewayById(gateways, currentGatewayId)
                                    ?.name
                                }
                              </ProjectName>
                              <ProjectTotal>
                                TOTAL:{' '}
                                {new Intl.NumberFormat().format(
                                  getGatewayTotalAmountById(
                                    groupedReportsByGateway,
                                    currentGatewayId
                                  )
                                )}{' '}
                                USD
                              </ProjectTotal>
                            </ProjectNameContainer>
                          )}

                          {currentGatewayId === gatewayId ||
                          (gatewayIndex === 0 && !gatewayId) ? (
                            <>
                              <TableHeader>
                                <TableColumn style={{ textAlign: 'left' }}>
                                  Date
                                </TableColumn>
                                <TableColumn>Transaction ID</TableColumn>
                                <TableColumn style={{ textAlign: 'right' }}>
                                  Amount
                                </TableColumn>
                              </TableHeader>

                              <TableRow index={index}>
                                <TableColumn style={{ textAlign: 'left' }}>
                                  {new Date(
                                    report.created
                                  ).toLocaleDateString()}
                                </TableColumn>
                                <TableColumn>{report.paymentId}</TableColumn>
                                <TableColumn style={{ textAlign: 'right' }}>
                                  {new Intl.NumberFormat().format(
                                    report.amount
                                  )}{' '}
                                  USD
                                </TableColumn>
                              </TableRow>
                            </>
                          ) : null}
                        </div>
                      );
                    } else if (
                      currentGatewayId === gatewayId ||
                      (gatewayIndex === 0 && !gatewayId)
                    ) {
                      return (
                        <TableRow key={`${report.paymentId}`} index={index}>
                          <TableColumn style={{ textAlign: 'left' }}>
                            {new Date(report.created).toLocaleDateString()}
                          </TableColumn>
                          <TableColumn>{report.paymentId}</TableColumn>
                          <TableColumn style={{ textAlign: 'right' }}>
                            {new Intl.NumberFormat().format(report.amount)} USD
                          </TableColumn>
                        </TableRow>
                      );
                    }
                  }
                );
              }
            )}
        </>
      )}

      {!(projectId && !gatewayId) &&
        groupedReportsByProject &&
        Object.keys(groupedReportsByProject).map(
          (currentProjectId, projectIndex) => {
            return groupedReportsByProject[`${currentProjectId}`].map(
              (report: IReport, index: number) => {
                if (index === 0) {
                  return (
                    <div key={`${report.paymentId}}`}>
                      {!(projectId && gatewayId) && (
                        <ProjectNameContainer>
                          <ProjectName>
                            {getProjectById(projects, currentProjectId)?.name}
                          </ProjectName>
                          <ProjectTotal>
                            TOTAL:{' '}
                            {new Intl.NumberFormat().format(
                              getProjectTotalAmountById(
                                groupedReportsByProject,
                                currentProjectId
                              )
                            )}{' '}
                            USD
                          </ProjectTotal>
                        </ProjectNameContainer>
                      )}

                      {currentProjectId === projectId ||
                      (projectIndex === 0 && !projectId) ? (
                        <>
                          <TableHeader>
                            <TableColumn style={{ textAlign: 'left' }}>
                              Date
                            </TableColumn>
                            {!gatewayId && <TableColumn>Gateway</TableColumn>}
                            <TableColumn>Transaction ID</TableColumn>
                            <TableColumn style={{ textAlign: 'right' }}>
                              Amount
                            </TableColumn>
                          </TableHeader>

                          <TableRow index={index}>
                            <TableColumn style={{ textAlign: 'left' }}>
                              {new Date(report.created).toLocaleDateString()}
                            </TableColumn>
                            {!gatewayId && (
                              <TableColumn>
                                {
                                  getGatewayById(gateways, report.gatewayId)
                                    ?.name
                                }
                              </TableColumn>
                            )}
                            <TableColumn>{report.paymentId}</TableColumn>
                            <TableColumn style={{ textAlign: 'right' }}>
                              {new Intl.NumberFormat().format(report.amount)}{' '}
                              USD
                            </TableColumn>
                          </TableRow>
                        </>
                      ) : null}
                    </div>
                  );
                } else if (
                  currentProjectId === projectId ||
                  (projectIndex === 0 && !projectId)
                ) {
                  return (
                    <TableRow key={`${report.paymentId}`} index={index}>
                      <TableColumn style={{ textAlign: 'left' }}>
                        {new Date(report.created).toLocaleDateString()}
                      </TableColumn>
                      {!gatewayId && (
                        <TableColumn>
                          {getGatewayById(gateways, report.gatewayId)?.name}
                        </TableColumn>
                      )}
                      <TableColumn>{report.paymentId}</TableColumn>
                      <TableColumn style={{ textAlign: 'right' }}>
                        {new Intl.NumberFormat().format(report.amount)} USD
                      </TableColumn>
                    </TableRow>
                  );
                }
              }
            );
          }
        )}
    </>
  );
};

export default Table;
