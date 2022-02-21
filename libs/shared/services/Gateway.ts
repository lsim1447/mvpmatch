import { IGateway } from '../utils/models/Gateway';
import { DEFAULT_GATEWAY_VALUE } from '../utils/constants';
import { GroupedReportsByTarget, IReport } from '../utils/models/Report';

export const getGatewayById = (
  gateways: IGateway[],
  gatewayId: string
): IGateway => {
  const similarGateways: IGateway[] = gateways.filter(
    (gateway: IGateway) => gateway.gatewayId === gatewayId
  );

  if (similarGateways.length > 0) {
    return similarGateways[0];
  }

  return DEFAULT_GATEWAY_VALUE;
};

export const getGatewayTotalAmountById = (
  groupedReportsByGateway: GroupedReportsByTarget,
  gatewayId: string
): number => {
  return groupedReportsByGateway[`${gatewayId}`].reduce(function (
    acc: number,
    report: IReport
  ) {
    return acc + report.amount;
  },
  0);
};
