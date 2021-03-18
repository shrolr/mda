import { AccountTypes, AccountTypesApiModel, TransferListAPIModel } from "..";
import { IUserResponse } from "../../interfaces";
import { AccountListApiModel, Accounts } from "./Account/AccountListApiModel";
import { GetCustomerNotificationInfoResponseModel, NotificationApiModel } from "./Notifications/NotificationApiModel";
import { TransferListData } from "./Transfer/TransferListApiModel";
import { WalletInfoAPIModel, WalletInfoData } from "./Wallet/WalletInfoApiModel";

interface INetworkResponse {
    status?: number;
    data?: unknown;
}

export class NetworkResponse implements INetworkResponse {
    status: number;
    data: unknown;
    constructor(status:number,data:unknown) {
        this.status = status;
        this.data = data;
    }
}

interface INetworkResponseFail {
    status?: number;
}

export class NetworkResponseFail implements INetworkResponseFail {
    status: number;
    constructor(status:number) {
        this.status = status;
    }
}


interface ILoginNetworkResponse {
    status?: number;
    data?: IUserResponse;
}
export class LoginNetworkResponse implements ILoginNetworkResponse {
    status: number;
    data: IUserResponse;
    constructor(status:number,data:IUserResponse) {
        this.status = status;
        this.data = data;
    }
}


interface INotificationNetworkResponse {
    status?: number;
    data?: GetCustomerNotificationInfoResponseModel;
}
export class NotificationNetworkResponse implements INotificationNetworkResponse {
    status: number;
    data: GetCustomerNotificationInfoResponseModel;
    constructor(status:number,data:GetCustomerNotificationInfoResponseModel) {
        this.status = status;
        this.data = data;
    }
}


export class AccountListNetworkResponse implements AccountListApiModel {
    status: number;
    data: Accounts[];
    constructor(status:number,data:Accounts[]) {
        this.status = status;
        this.data = data;
    }
}

export class AccountTypesNetworkResponse implements AccountTypesApiModel {
    status: number;
    data: AccountTypes[];
    constructor(status:number,data:AccountTypes[]) {
        this.status = status;
        this.data = data;
    }
}
export class TransferListNetworkResponse implements TransferListAPIModel {
    status: number;
    data: TransferListData;
    constructor(status:number,data:TransferListData) {
        this.status = status;
        this.data = data;
    }
}
export class WalletInfoNetworkResponse implements WalletInfoAPIModel {
    status: number;
    data: WalletInfoData[];
    constructor(status:number,data:WalletInfoData[]) {
        this.status = status;
        this.data = data;
    }
}