import { NoReports as NoReportsIcon } from '../../atoms/icons';
import styled from 'styled-components';

const NoReports = styled.div`
  padding-top: 12%;
  text-align: center;
  width: 100%;
`;

const NoReportsTitle = styled.p`
  color: #011f4b;
  font-size: 24px;
  font-weight: 700;
  margin: 12px 4px 4px 12px;
`;

const NoReportsMessage = styled.div`
  color: #7e8299;
  font-size: 16px;
  font-weight: 700;
  padding-left: 37%;
  padding-right: 37%;
  padding-bottom: 50px;
  text-align: center;
`;

export const NoReport = () => (
  <NoReports>
    <NoReportsTitle>No reports</NoReportsTitle>
    <NoReportsMessage>
      <p style={{ margin: 0 }}>
        Currently you have no data for the reports to be generated.
      </p>
      <p style={{ margin: 0 }}>
        Once you start generating traffic through the Balance application the
        reports will be shown
      </p>
    </NoReportsMessage>
    <NoReportsIcon />
  </NoReports>
);

export default NoReport;
