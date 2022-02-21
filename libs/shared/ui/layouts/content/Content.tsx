import type { NextComponentType } from 'next';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { FiltersContext } from '../../../utils/context/FiltersContext';
import { getTotal } from '../../../services/Report';
import { IReport, GroupedReportsByTarget } from '../../../utils/models/Report';

import { compareByDate } from '../../../utils/helper-functions';
import { API_BASE_PATH } from '../../../utils/constants';

import NoReport from '../../templates/no-report-view/NoReport';
import Report from '../../templates/report-view/Report';
import Table from '../../templates/table-view/Table';
import NavigationFilters from '../../organisms/navigation-filters/NavFilters';

const ContentContainer = styled.div``;

const DataContainer = styled.div`
  width: 100%;
  height: auto;
  background: #f1fafe;
  border-radius: 10px;
  margin-top: 27px;
  padding: 18px 24px;
`;

const TotalContainer = styled(DataContainer)`
  color: #011f4b;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
`;

const Content: NextComponentType = () => {
  const { selectedProject, selectedGateway, fromDate, toDate } =
    useContext(FiltersContext);
  const [reports, setReports] = useState<IReport[]>([]);
  const [groupedReportsByProject, setGroupedReportsByProject] =
    useState<GroupedReportsByTarget>({});
  const [groupedReportsByGateway, setGroupedReportsByGateway] =
    useState<GroupedReportsByTarget>({});

  useEffect(() => {
    fetch(API_BASE_PATH + '/report', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        from: fromDate,
        to: toDate,
        projectId: selectedProject.value,
        gatewayId: selectedGateway?.value
      })
    })
      .then((response) => {
        return response?.json();
      })
      .then((reportsData) => {
        setReports(reportsData.data);
      });
  }, [selectedProject, selectedGateway, fromDate, toDate]);

  useEffect(() => {
    const groupedByProject: GroupedReportsByTarget = reports.reduce(
      (acc: any, report: IReport) => (
        (acc[report['projectId']] = [
          ...(acc[report['projectId']] || []),
          report
        ]),
        acc
      ),
      {}
    );
    Object.keys(groupedByProject).map((currentId: string, index: number) => {
      return groupedByProject[`${currentId}`].sort(compareByDate);
    });

    const groupedByGateway: GroupedReportsByTarget = reports.reduce(
      (acc: any, report: IReport) => (
        (acc[report['gatewayId']] = [
          ...(acc[report['gatewayId']] || []),
          report
        ]),
        acc
      ),
      {}
    );
    Object.keys(groupedByGateway).map((currentId: string, index: number) => {
      return groupedByGateway[`${currentId}`].sort(compareByDate);
    });

    setGroupedReportsByProject(groupedByProject);
    setGroupedReportsByGateway(groupedByGateway);
  }, [reports]);

  return (
    <ContentContainer>
      <NavigationFilters />

      {reports?.length ? (
        <>
          {(selectedProject.value || selectedGateway.value) &&
          !(selectedProject.value && selectedGateway.value) ? (
            <DataGrid>
              <div>
                <DataContainer>
                  <Table
                    projectId={
                      selectedProject?.value ? selectedProject.value : ''
                    }
                    gatewayId={
                      selectedGateway?.value ? selectedGateway.value : ''
                    }
                    groupedReportsByProject={groupedReportsByProject}
                    groupedReportsByGateway={groupedReportsByGateway}
                  />
                </DataContainer>
              </div>
              <div>
                <Report
                  projectId={
                    selectedProject?.value ? selectedProject.value : ''
                  }
                  gatewayId={
                    selectedGateway?.value ? selectedGateway.value : ''
                  }
                  reports={reports}
                  groupedReportsByProject={groupedReportsByProject}
                  groupedReportsByGateway={groupedReportsByGateway}
                />
              </div>
            </DataGrid>
          ) : (
            <>
              <DataContainer>
                <Table
                  projectId={
                    selectedProject?.value ? selectedProject.value : ''
                  }
                  gatewayId={
                    selectedGateway?.value ? selectedGateway.value : ''
                  }
                  groupedReportsByProject={groupedReportsByProject}
                  groupedReportsByGateway={groupedReportsByGateway}
                />
              </DataContainer>
            </>
          )}
          {!(selectedProject.value || selectedGateway.value) ||
            (selectedProject.value && selectedGateway.value && (
              <TotalContainer>
                TOTAL | {new Intl.NumberFormat().format(getTotal(reports))} USD
              </TotalContainer>
            ))}
        </>
      ) : (
        <NoReport />
      )}
    </ContentContainer>
  );
};

export default Content;
