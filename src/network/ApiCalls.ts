import axios from 'axios';
import Endpoints from '../constants/Endpoints';
import { IUserResponse } from '../interfaces';
import { AccountListNetworkResponse, AccountRequestListResponse, AccountTypesNetworkResponse, DepositAccountsNetworkResponsel, DepositHistoryNetworkResponse, LoginNetworkResponse, NetworkResponse, NetworkResponseFail, NotificationNetworkResponse, SystemDepositAccountsNetworkResponsel, TransferListNetworkResponse, WalletInfoNetworkResponse, WithdrawAccountsNetworkResponsel, WithdrawHistoryNetworkResponse } from '../models';
import { LoginRequest } from '../types/post/LoginRequest';
import { NewAccountRequest } from '../types/post/NewAccountRequest';
import { TransferAccountToAccountRequest } from '../types/post/TransferAccountToAccountRequest';
import { Authenticated_Server_Link, ServerLink, SERVER_REQUEST_FAILED } from '../constants/constants';
import { TransferAccountToWalletRequest } from '../types/post/TransferAccountToWalletRequest';
import { TransferWalletToAccountRequest } from '../types/post/TransferWalletToAccountRequest';
import { MetatraderAccountChangePassword } from '../types/post/MetatraderAccountChangePassword';
import { UpdateAccountInformation } from '../types/post/UpdateAccountInformation';
import { PostCustomerWithdrawAccountRequestModel } from '../types/post/PostCustomerDepositAccountRequestModel';
import { PostWithdrawRequestModel } from '../types/post/PostWithdrawRequestModel';
import { PersonalInfoUpdateRequest } from '../types/post/PersonalInfoUpdateRequest';
import { PutAccountRequest } from '../types/post/PutAccountRequest';
import { PostAccountRequest, PostDepositRequestModel, RegisterRequest, VerificationRequest, VerifyRequest } from '../types/post';
import { PostCustomerDepositAccountRequestModel } from '../types/post/PostCustomerWithdrawAccountRequestModel';
var httpClient = axios.create({
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
    const newHttpClient = axios.create({
      httpsAgent: {
        rejectUnauthorized: false
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      },
    });
    newHttpClient.defaults.timeout = 15000;

    newHttpClient.interceptors.request.use(function (config) {
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    });
    httpClient = newHttpClient
  }

  getUserInfoWithToken = (token: string) => {
    console.log("get user info with token", token)
    return httpClient.get(this.server_link + Endpoints['auth-with-token'], { headers: { 'Authorization': `Bearer ${token}` } }).then((result) => {
      let user: IUserResponse = result.data
      let status = result.status
      let NetworkResponse = new LoginNetworkResponse(status, user)

      return NetworkResponse;
    }).catch(() => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })

  }
  register = (registerRequest: RegisterRequest) => {
    return httpClient.post(this.server_link + Endpoints.register, registerRequest).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch(({ response }) => {
      try {
        if (response.data.code) {
          let networkResponse = new NetworkResponseFail(response.data.code)
          return networkResponse;

        }
      } catch (error) {

      }
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })

  }
  requestVerification = (verificationRequest: VerificationRequest) => {
    return httpClient.post(this.server_link + Endpoints['request-verification-with-email'], verificationRequest).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch(() => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })

  }

  verifyUser = (verifyRequest: VerifyRequest) => {
    return httpClient.post(this.server_link + Endpoints['verify-user'], verifyRequest).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch(() => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })

  }


  login = (LoginRequest: LoginRequest) => {
    return httpClient.post(this.server_link + Endpoints.auth, LoginRequest).then((result) => {
      let user: IUserResponse = result.data
      let status = result.status
      let NetworkResponse = new LoginNetworkResponse(status, user)
      return NetworkResponse;
    }).catch(({ response }) => {
      try {
        if (response.data.code) {
          let networkResponse = new NetworkResponseFail(response.data.code)
          return networkResponse;

        }
      } catch (error) {

      }
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })

  }

  resetPassword = (domain: string, identifier: string) => {
    return httpClient.post(this.server_link + Endpoints['forgot-password'], { domain, identifier }).then((result) => {

      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch(() => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  updateUserPicture = (customerId: number, payload: any) => {
    let urlSuffix = `/${customerId}`
    return httpClient.put(this.authenticated_server_link + Endpoints.customer['upload-picture'] + urlSuffix, payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })


  }

  getNotificationInfo = (customerId: number,) => {
    let urlSuffix = `/${customerId}`
    return httpClient.get(this.authenticated_server_link + Endpoints.notification.info + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NotificationNetworkResponse(status, data);

      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  getNotificationList = (customerId: number,) => {
    let urlSuffix = `/${customerId}?page=${0}&limit=${15}`
    return httpClient.get(this.authenticated_server_link + Endpoints.notification.customer + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);

      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  updateNotificationListStatus = (customerId: number, payload: { ids: number[], statusId: number }) => {
    // statusId 2 
    let urlSuffix = `/${customerId}`
    return httpClient.put(this.authenticated_server_link + Endpoints.notification['update-list-status'] + urlSuffix, payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
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

  getUserAccountGraphData = (customerId: number) => {
    let urlSuffix = `/${customerId}`
    return httpClient.get(this.authenticated_server_link + Endpoints.account.graph + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  getUserWithdrawGraphData = (customerId: number,) => {
    let urlSuffix = `/${customerId}`
    return httpClient.get(this.authenticated_server_link + Endpoints.withdraw.graph + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  getUserDepositGraphData = (customerId: number,) => {
    let urlSuffix = `/${customerId}`
    return httpClient.get(this.authenticated_server_link + Endpoints.deposit.graph + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }

  getUserDepositList = (customerId: number,) => {
    let urlSuffix = `/${customerId}?page=${0}&limit=${15}`
    return httpClient.get(this.authenticated_server_link + Endpoints.deposit['deposit-list'] + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new DepositHistoryNetworkResponse(status, data);
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
  getDepositAccounts = () => {
    return httpClient.get(this.authenticated_server_link + Endpoints.deposit['deposit-account']).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new SystemDepositAccountsNetworkResponsel(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  getUserDepositAccounts = (customerId: number,) => {
    let urlSuffix = `/${customerId}`
    return httpClient.get(this.authenticated_server_link + Endpoints.deposit['customer-deposit-account-customer'] + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new DepositAccountsNetworkResponsel(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }

  getCustomerAccountRequests = (customerId: number) => {
    let urlSuffix = `/${customerId}`
    return httpClient.get(this.authenticated_server_link + Endpoints.account['request-customer'] + urlSuffix).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new AccountRequestListResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }

  postAccountRequest = (payload: PostAccountRequest) => {
    return httpClient.post(this.authenticated_server_link + Endpoints.account.request, payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  putAccountRequest = (payload: PutAccountRequest, accountId: number) => {
    let urlSuffix = `/${accountId}`
    return httpClient.put(this.authenticated_server_link + Endpoints.account.request + urlSuffix, payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
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
  postUserWithdrawAccount = (payload: PostCustomerWithdrawAccountRequestModel) => {
    return httpClient.post(this.authenticated_server_link + Endpoints.withdraw['customer-withdraw-account'], payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  postUserDepositAccount = (payload: PostCustomerDepositAccountRequestModel) => {
    return httpClient.post(this.authenticated_server_link + Endpoints.deposit['customer-deposit-account'], payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
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
      return networkResponse;
    })
  }

  postWithdraw = (payload: PostWithdrawRequestModel) => {
    return httpClient.post(this.authenticated_server_link + Endpoints.withdraw.main, payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)

      return networkResponse;
    })
  }

  postDeposit = (payload: PostDepositRequestModel) => {
    return httpClient.post(this.authenticated_server_link + Endpoints.deposit.main, payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)

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
  putTransfer = (payload: { StatusId: number }, TransferId: number) => {
    let urlSuffix = `/${TransferId}`
    return httpClient.put(this.authenticated_server_link + Endpoints.transfer.main + urlSuffix, payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  putDeposit = (payload: { StatusId: number }, DepositId: number) => {
    let urlSuffix = `/${DepositId}`
    return httpClient.put(this.authenticated_server_link + Endpoints.deposit.main + urlSuffix, payload).then((result) => {
      let data = result.data
      let status = result.status
      let _networkResponse = new NetworkResponse(status, data);
      return _networkResponse;
    }).catch((err) => {
      let networkResponse = new NetworkResponseFail(SERVER_REQUEST_FAILED)
      return networkResponse;
    })
  }
  putWithdraw = (payload: { StatusId: number }, DepositId: number) => {
    let urlSuffix = `/${DepositId}`
    return httpClient.put(this.authenticated_server_link + Endpoints.withdraw.main + urlSuffix, payload).then((result) => {
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