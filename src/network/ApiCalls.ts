import axios from 'axios';
import Endpoints from '../constants/Endpoints';
import { IUserResponse } from '../interfaces';
import { AccountListNetworkResponse, AccountTypesNetworkResponse, LoginNetworkResponse, NetworkResponse, NetworkResponseFail, NotificationNetworkResponse, TransferListNetworkResponse, WalletInfoNetworkResponse, WithdrawAccountsNetworkResponsel, WithdrawHistoryNetworkResponse } from '../models';
import { GetCustomerNotificationInfoResponseModel, } from '../models/ApiModels/Notifications/NotificationApiModel';
import { LoginRequest } from '../types/post/LoginRequest';
import { NewAccountRequest } from '../types/post/NewAccountRequest';
import { TransferAccountToAccountRequest } from '../types/post/TransferAccountToAccountRequest';
import { Authenticated_Server_Link, ServerLink, SERVER_REQUEST_FAILED } from '../constants/constants';
import { TransferAccountToWalletRequest } from '../types/post/TransferAccountToWalletRequest';
import { TransferWalletToAccountRequest } from '../types/post/TransferWalletToAccountRequest';
import { MetatraderAccountChangePassword } from '../types/post/MetatraderAccountChangePassword';
import { UpdateAccountInformation } from '../types/post/UpdateAccountInformation';
import { PostCustomerWithdrawAccountRequestModel } from '../types/post/PostCustomerWithdrawAccountRequestModel';
import { PostWithdrawRequestModel } from '../types/post/PostWithdrawRequestModel';
import { PersonalInfoUpdateRequest } from '../types/post/PersonalInfoUpdateRequest';
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
  constructor() {
    this.server_link = ServerLink;
    this.authenticated_server_link = Authenticated_Server_Link
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
      let _networkResponse = new WalletInfoNetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }

  getUserWithdrawList = (customerId: number,) => {
    let urlSuffix = `/${customerId}?page=${0}&limit=${15}`
    return httpClient.get(this.authenticated_server_link + Endpoints.withdraw['withdraw-list'] + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new WithdrawHistoryNetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  getUserWithdrawAccounts = (customerId: number,) => {
    let urlSuffix = `/${customerId}`
    return httpClient.get(this.authenticated_server_link + Endpoints.withdraw['customer-withdraw-account-customer'] + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new WithdrawAccountsNetworkResponsel(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  
  updateUserProfile = (payload: PersonalInfoUpdateRequest, customerId: number) => {
    let urlSuffix = `/${customerId}`
    return httpClient.put(this.authenticated_server_link + Endpoints.customer.profile + urlSuffix, payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  updateUserIdentifiers = (payload: UpdateAccountInformation, customerId: number) => {
    let urlSuffix = `/${customerId}`
    return httpClient.put(this.authenticated_server_link + Endpoints.customer.identifiers + urlSuffix, payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  postUserWithdrawAccount = (payload:PostCustomerWithdrawAccountRequestModel) => {
    return httpClient.post(this.authenticated_server_link + Endpoints.withdraw['customer-withdraw-account'], payload).then((result) => {
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

  updateAccountPassword = (payload: MetatraderAccountChangePassword) => {
    return httpClient.put(this.authenticated_server_link + Endpoints.account['change-password'], payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  getWalletTransactionsInfo = (customerId: number,) => {
    let urlSuffix = `/${customerId}`
    return httpClient.get(this.authenticated_server_link + Endpoints.wallet['customer-transactions'] + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
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
   
  postWithdraw = (payload: PostWithdrawRequestModel) => {
    return httpClient.post(this.authenticated_server_link + Endpoints.withdraw.main, payload).then((result) => {
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