import React, { useState, useEffect, FC } from 'react';
import { IProject } from '../models/Project';
import { API_BASE_PATH } from '../constants';

type ProjectContextProps = {
  projects: IProject[];
};

export const ProjectContext = React.createContext<ProjectContextProps>({
  projects: []
});

export const ProjectProvider: FC = ({ children }) => {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    fetch(API_BASE_PATH + '/projects', {
      method: 'get'
    })
      .then((response: any) => {
        return response.json();
      })
      .then((projects) => {
        setProjects(projects.data);
      });
  }, []);

  return (
    <ProjectContext.Provider value={{ projects }}>
      {children}
    </ProjectContext.Provider>
  );
};
