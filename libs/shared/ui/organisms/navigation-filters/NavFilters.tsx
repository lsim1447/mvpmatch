import { useContext } from 'react';
import Dropdown from 'react-dropdown';
import styled from 'styled-components';
import { FiltersContext } from '../../../utils/context/FiltersContext';
import { GatewayContext } from '../../../utils/context/GatewayContext';
import { ProjectContext } from '../../../utils/context/ProjectContext';
import { IGateway } from '../../../utils/models/Gateway';
import { IProject } from '../../../utils/models/Project';
import RegularButton from '../../atoms/buttons/libs/RegularButton';
import DatePicker from '../../atoms/date-picker/DatePicker';

const SelectGrid = styled.div`
  display: grid;
  grid-template-columns: 2.9fr 1fr 1fr 1fr 1fr 0.8fr;
`;

const Title = styled.div`
  color: #011f4b;
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 4px;
`;

const Description = styled.div`
  color: #7e8299;
  font-size: 16px;
  font-weight: 700;
`;

interface INavFiltersProps {}

const NavigationFilters = ({}: INavFiltersProps) => {
  const { projects } = useContext(ProjectContext);
  const { gateways } = useContext(GatewayContext);
  const {
    selectedProject,
    setSelectedProject,
    selectedGateway,
    setSelectedGateway,
    fromDate,
    setFromDate,
    toDate,
    setToDate
  } = useContext(FiltersContext);

  const handleProjectChange = (newProject: any): void => {
    setSelectedProject(newProject);
  };

  const handleGatewayChange = (newGateway: any): void => {
    setSelectedGateway(newGateway);
  };

  const handleFromDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setToDate(event.target.value);
  };

  return (
    <>
      <SelectGrid>
        <div>
          <Title>Reports</Title>
          <Description>Easily generate report of your transactions</Description>
        </div>
        <Dropdown
          className="customDropdown"
          options={[
            {
              value: '',
              label: 'All projects'
            },
            ...projects.map((project: IProject) => {
              return {
                value: project.projectId,
                label: project.name
              };
            })
          ]}
          onChange={handleProjectChange}
          value={selectedProject}
          placeholder="Select an option"
        />
        <Dropdown
          className="customDropdown"
          options={[
            {
              value: '',
              label: 'All gateways'
            },
            ...gateways.map((gateway: IGateway) => {
              return {
                value: gateway.gatewayId,
                label: gateway.name
              };
            })
          ]}
          onChange={handleGatewayChange}
          value={selectedGateway}
          placeholder="Select an option"
        />
        <div>
          <DatePicker value={fromDate} onChange={handleFromDateChange} />
        </div>
        <div>
          <DatePicker value={toDate} onChange={handleToDateChange} />
        </div>
        <div style={{ float: 'right' }}>
          <RegularButton background={'#005b96'} color={'#ffffff'}>
            Generate report
          </RegularButton>
        </div>
      </SelectGrid>
    </>
  );
};

export default NavigationFilters;
