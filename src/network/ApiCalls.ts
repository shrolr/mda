import axios from 'axios';
import Endpoints from '../constants/Endpoints';
import { IUserResponse } from '../interfaces';
import { AccountListNetworkResponse, AccountTypesNetworkResponse, LoginNetworkResponse, NetworkResponse, NetworkResponseFail, NotificationNetworkResponse, TransferListNetworkResponse } from '../models';
import { GetCustomerNotificationInfoResponseModel, } from '../models/ApiModels/Notifications/NotificationApiModel';
import { LoginRequest } from '../types/post/LoginRequest';
import { NewAccountRequest } from '../types/post/NewAccountRequest';
import { TransferAccountToAccountRequest } from '../types/post/TransferAccountToAccountRequest';
import { Authenticated_Server_Link, ServerLink, SERVER_REQUEST_FAILED, SERVER_REGISTER_FAILED } from '../constants/constants';
import { TransferAccountToWalletRequest } from '../types/post/TransferAccountToWalletRequest';
import { TransferWalletToAccountRequest } from '../types/post/TransferWalletToAccountRequest';
const httpClient = axios.create({
  httpsAgent: {
    rejectUnauthorized: false
  },
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
httpClient.defaults.timeout = 15000;


interface IApiCalls { }


class ApiCalls implements IApiCalls {
  private server_link: string;
  private authenticated_server_link: string;

  private AXIOS_ERROR: number;
  private AXIOS_OK: number;
  private AXIOS_NO_DATA: number;
  constructor() {
    this.server_link = ServerLink;
    this.authenticated_server_link = Authenticated_Server_Link
    this.AXIOS_ERROR = 0;
    this.AXIOS_OK = 1;
    this.AXIOS_NO_DATA = 2;
  }

  setToken = async (token: string) => {
    httpClient.interceptors.request.use(function (config) {
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    });
  }

  login = (LoginRequest: LoginRequest) => {

    return httpClient.post(this.server_link + Endpoints.auth, LoginRequest).then((result) => {
      let user: IUserResponse = result.data
      let status = result.status
      let NetworkResponse = new LoginNetworkResponse(status, user)

      return NetworkResponse;
    }).catch(() => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })

  }

  getNotificationInfo = (customerId: number,) => {
    let urlSuffix = `/${customerId}`
    return httpClient.get(this.authenticated_server_link + Endpoints.notification.info + urlSuffix).then((result) => {
      let data: GetCustomerNotificationInfoResponseModel = result.data
      let status = result.status
      let _networkResponse = new NotificationNetworkResponse(status, data);

      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      console.log("fail", err)
      return networkResponse;
    })
  }
  getWalletInfo = (customerId: number,) => {
    let urlSuffix = `/${customerId}`
    return httpClient.get(this.authenticated_server_link + Endpoints.wallet.customer + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      console.log(_networkResponse)
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      console.log("fail", err)
      return networkResponse;
    })
  }
  getCustomerAccounts = (customerId: number) => {
    let urlSuffix = `/${customerId}`

    return httpClient.get(this.authenticated_server_link + Endpoints.account.customer + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new AccountListNetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      console.log("fail", err)
      return networkResponse;
    })
  }
  postAccount = (payload: NewAccountRequest) => {
    return httpClient.post(this.authenticated_server_link + Endpoints.account.main, payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      console.log("fail", err)
      return networkResponse;
    })
  }
  postTransfer = (payload: TransferAccountToAccountRequest | TransferAccountToWalletRequest | TransferWalletToAccountRequest) => {
    return httpClient.post(this.authenticated_server_link + Endpoints.transfer.main, payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  getTransferList = (customerId: number) => {
    let urlSuffix = `/${customerId}?page=${0}&limit=${15}`
    return httpClient.get(this.authenticated_server_link + Endpoints.transfer.customer + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new TransferListNetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  getAccountTypes = () => {

    return httpClient.get(this.authenticated_server_link + Endpoints.account.types).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new AccountTypesNetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }

}



export default new ApiCalls();