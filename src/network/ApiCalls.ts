import axios from 'axios';
import { IUserResponse } from '../interfaces';
import { LoginNetworkResponse, NetworkResponse, NetworkResponseFail } from '../models';
import { LoginRequest } from '../types/post/LoginRequest';
import { ServerLink, SERVER_AUTH_FAILED, SERVER_REGISTER_FAILED } from '../utilities/constants';
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
  private AXIOS_ERROR: number;
  private AXIOS_OK: number;
  private AXIOS_NO_DATA: number;
  constructor() {
    this.server_link = ServerLink;
    this.AXIOS_ERROR = 0;
    this.AXIOS_OK = 1;
    this.AXIOS_NO_DATA = 2;
  }




  login = (LoginRequest: LoginRequest) => {
    return httpClient.post(this.server_link + "login", LoginRequest).then((result) => {
      let user: IUserResponse = result.data
      let status = result.status
      let NetworkResponse = new LoginNetworkResponse(status,user)

      return NetworkResponse;
    }).catch(() => {
      let networkResponse = new NetworkResponseFail(SERVER_AUTH_FAILED)
      return networkResponse;
    })

  }



}

export default new ApiCalls();