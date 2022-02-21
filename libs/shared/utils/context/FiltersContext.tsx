import React, { useState, FC } from 'react';

type FiltersContextProps = {
  selectedProject: IDropdown;
  setSelectedProject: React.Dispatch<React.SetStateAction<IDropdown>>;
  selectedGateway: IDropdown;
  setSelectedGateway: React.Dispatch<React.SetStateAction<IDropdown>>;
  fromDate: string;
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  toDate: string;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
};

interface IDropdown {
  value: string;
  label: string;
}

export const FiltersContext = React.createContext<FiltersContextProps>({
  selectedProject: {
    value: '',
    label: 'All projects'
  },
  setSelectedProject: () => {},
  selectedGateway: {
    value: '',
    label: 'All gateways'
  },
  setSelectedGateway: () => {},
  fromDate: '',
  setFromDate: () => {},
  toDate: '',
  setToDate: () => {}
});

export const FiltersProvider: FC = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState<IDropdown>({
    value: '',
    label: 'All projects'
  });
  const [selectedGateway, setSelectedGateway] = useState<IDropdown>({
    value: '',
    label: 'All gateways'
  });
  const [fromDate, setFromDate] = useState<string>('2021-01-01');
  const [toDate, setToDate] = useState<string>('2021-04-31');

  return (
    <FiltersContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
        selectedGateway,
        setSelectedGateway,
        fromDate,
        setFromDate,
        toDate,
        setToDate
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
