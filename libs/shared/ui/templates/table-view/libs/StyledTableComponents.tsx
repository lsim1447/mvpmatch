import { GroupedReportsByTarget } from '../../../../utils/models/Report';
import styled from 'styled-components';

export interface ITableProps {
  projectId: string | undefined;
  gatewayId: string | undefined;
  groupedReportsByProject: GroupedReportsByTarget;
  groupedReportsByGateway: GroupedReportsByTarget;
}

export const ProjectNameContainer = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 26px 24px;
  margin-top: 5px;
  width: 100%;
`;

export const ProjectName = styled.span`
  color: #011f4b;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
`;

export const ProjectTotal = styled.span`
  float: right;
  color: #011f4b;
  font-weight: 700;
  font-size: 16px;
  line-height: 164.4%;
`;

export const TableHeader = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  margin-top: 19px;
  padding: 5px 20px;
  font-size: 16px;
  line-height: 164.4%;
  text-align: center;
`;

type ITableRowProps = {
  index: number;
};

export const TableRow = styled.div<ITableRowProps>`
  background-color: ${(p) => (p.index % 2 === 0 ? 'inherit' : '#ffffff')};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  padding: 10px 20px;
  text-align: center;
`;

export const TableColumn = styled.div``;

export const TableStatus = styled.div`
  color: #011f4b;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  padding-bottom: 34px;
`;
