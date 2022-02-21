import React, { useState, useEffect, FC } from 'react';
import { IGateway } from '../models/Gateway';
import { API_BASE_PATH } from '../constants';

type GatewayContextProps = {
  gateways: IGateway[];
};

export const GatewayContext = React.createContext<GatewayContextProps>({
  gateways: []
});

export const GatewayProvider: FC = ({ children }) => {
  const [gateways, setGateways] = useState<IGateway[]>([]);

  useEffect(() => {
    fetch(API_BASE_PATH + '/gateways', {
      method: 'get'
    })
      .then((response: any) => {
        return response.json();
      })
      .then((gateways) => {
        setGateways(gateways.data);
      });
  }, []);

  return (
    <GatewayContext.Provider value={{ gateways }}>
      {children}
    </GatewayContext.Provider>
  );
};
