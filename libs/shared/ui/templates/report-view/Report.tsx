import { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from 'styled-components';

import { GatewayContext } from '../../../utils/context/GatewayContext';
import { ProjectContext } from '../../../utils/context/ProjectContext';
import { IReport, GroupedReportsByTarget } from '../../../utils/models/Report';
import { getTotal } from '../../../services/Report';
import {
  getProjectById,
  getProjectTotalAmountById
} from '../../../services/Project';
import {
  getGatewayById,
  getGatewayTotalAmountById
} from '../../../services/Gateway';
import { DEFAULT_COLORS } from '../../../utils/constants';
import { getSumTotal } from '../../../utils/helper-functions';
import { ColorSquare } from '../../atoms/icons';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportContainer = styled.div`
  margin-top: 28px;
  margin-left: 31px;
`;

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12%;
  margin-bottom: 12%;
`;

const ChartContainer = styled.div`
  width: 300px;
  height: 300px;
`;

const ChartHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  background: #f1fafe;
  border-radius: 10px;
  padding: 19px 23px 19px 23px;
`;

const ChartFooter = styled.div`
  background: #f1fafe;
  border-radius: 10px;
  color: #011f4b;
  padding: 19px 23px 19px 23px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
`;

const OptionName = styled.span`
  color: #011f4b;
  font-size: 14px;
  line-height: 16px;
  padding-left: 12px;
  position: relative;
  top: -2px;
`;
interface IReportProps {
  projectId: string;
  gatewayId: string;
  reports: IReport[];
  groupedReportsByProject: GroupedReportsByTarget;
  groupedReportsByGateway: GroupedReportsByTarget;
}

const Report = ({
  projectId,
  gatewayId,
  reports,
  groupedReportsByProject,
  groupedReportsByGateway
}: IReportProps) => {
  const { projects } = useContext(ProjectContext);
  const { gateways } = useContext(GatewayContext);

  const getFooterText = (totalAmount: number): string => {
    let totalType = '';

    if (projectId) {
      totalType = 'PROJECT';
    } else if (gatewayId) {
      totalType = 'GATEWAY';
    }

    return `${totalType} TOTAL | ${new Intl.NumberFormat().format(
      totalAmount
    )} USD`;
  };

  const getChartData = (isGatewayOptionRequired: boolean) => {
    const groupedReports = isGatewayOptionRequired
      ? groupedReportsByGateway
      : groupedReportsByProject;
    const getFuncById = isGatewayOptionRequired
      ? getGatewayTotalAmountById
      : getProjectTotalAmountById;

    return {
      datasets: [
        {
          data: Object.keys(groupedReports).map(
            (currentId: string, index: number) => {
              return getFuncById(groupedReports, currentId);
            }
          ),
          backgroundColor: DEFAULT_COLORS
        }
      ]
    };
  };

  const renderChartHeader = (
    isGatewayOptionRequired: boolean
  ): React.ReactNode => {
    const groupedReports = isGatewayOptionRequired
      ? groupedReportsByGateway
      : groupedReportsByProject;

    return (
      <>
        {groupedReports &&
          Object.keys(groupedReports).map((currentId, index) => {
            return (
              <div key={`${currentId}-${Math.random()}`}>
                <ColorSquare color={DEFAULT_COLORS[index]} />
                <OptionName>
                  {isGatewayOptionRequired
                    ? getGatewayById(gateways, currentId).name
                    : getProjectById(projects, currentId).name}
                </OptionName>
              </div>
            );
          })}
      </>
    );
  };

  const chartData = getChartData(Boolean(projectId && !gatewayId));

  const chartOptions = {
    plugins: {
      datalabels: {
        color: '#ffffff',
        display: (ctx: any) => {
          return true;
        },
        formatter: (ctx: any, data: any) => {
          const currentItem = data.dataset.data[data.dataIndex];
          const totalSum = getSumTotal(data.dataset.data);
          const percentage = Math.round((currentItem / totalSum) * 100);

          return `${percentage}%`;
        }
      }
    }
  };

  return (
    <ReportContainer>
      <ChartHeader>
        {renderChartHeader(Boolean(projectId && !gatewayId))}
      </ChartHeader>

      <ChartWrapper>
        <ChartContainer>
          <Doughnut
            data={chartData}
            plugins={[ChartDataLabels]}
            options={chartOptions}
          />
        </ChartContainer>
      </ChartWrapper>

      <ChartFooter>{getFooterText(getTotal(reports))}</ChartFooter>
    </ReportContainer>
  );
};

export default Report;
