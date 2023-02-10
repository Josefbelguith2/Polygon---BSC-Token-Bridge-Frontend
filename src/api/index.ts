import network from './network';
import { TransferHashSubmitRequest, DepositSubmitRequest, StatusRequest } from '../types/api';

const transfer = (url: string, body: TransferHashSubmitRequest) => {
  return network.request.post({ url: `${url}/transfer`, body });
};

const deposit = (url: string, body: DepositSubmitRequest) => {
  return network.request.post({ url: `${url}/deposit`, body });
};

const status = (url: string, body: StatusRequest) => {
  return network.request.post({ url: `${url}/status`, body });
};

const api = { transfer, deposit, status };

export default api;
