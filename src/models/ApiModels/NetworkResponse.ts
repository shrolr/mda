import { AccountTypes, AccountTypesApiModel, DepositHistoryNetworkResponseApi, DepositHistoryNetworkResponseData, TransferListAPIModel } from "..";
import { IUserResponse } from "../../interfaces";
import { AccountListApiModel, Accounts } from "./Account/AccountListApiModel";
import { AccountRequestList, AccountRequestListAPIModel } from "./Account/AccountRequestListApiModel";
import { DepositAccount, DepositAccountsApiModel } from "./Deposit/DepositAccountList";
import { SystemDepositAccounts, SystemDepositAccountsApiModel } from "./Deposit/SystemDepositAccounts";
import { CustomerNotificationInfoModel, NotificationApiModel } from "./Notifications/NotificationApiModel";
import { TransferListData } from "./Transfer/TransferListApiModel";
import { WalletInfoAPIModel, WalletInfoData } from "./Wallet/WalletInfoApiModel";
import { WithdrawAccount, WithdrawAccountsApiModel } from "./Withdraw/WithdrawAccountList";
import { WithdrawHistoryNetworkResponseApi, WithdrawHistoryNetworkResponseData } from "./Withdraw/WithdrawHistory";

interface INetworkResponse {
    status?: number;
    data?: unknown;
}

export class NetworkResponse implements INetworkResponse {
    status: number;
    data: any;
    constructor(status: number, data: unknown) {
        this.status = status;
        this.data = data;
    }
}

interface INetworkResponseFail {
    status?: number;
}

export class NetworkResponseFail implements INetworkResponseFail {
    status: number;
    result?: any;
    constructor(status: number) {
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
    constructor(status: number, data: IUserResponse) {
        this.status = status;
        this.data = data;
    }
}


interface INotificationNetworkResponse {
    status?: number;
    data?: CustomerNotificationInfoModel;
}
export class NotificationNetworkResponse implements INotificationNetworkResponse {
    status: number;
    data: CustomerNotificationInfoModel;
    constructor(status: number, data: CustomerNotificationInfoModel) {
        this.status = status;
        this.data = data;
    }
}


export class AccountListNetworkResponse implements AccountListApiModel {
    status: number;
    data: Accounts[];
    constructor(status: number, data: Accounts[]) {
        this.status = status;
        this.data = data;
    }
}

export class AccountTypesNetworkResponse implements AccountTypesApiModel {
    status: number;
    data: AccountTypes[];
    constructor(status: number, data: AccountTypes[]) {
        this.status = status;
        this.data = data;
    }
}
export class TransferListNetworkResponse implements TransferListAPIModel {
    status: number;
    data: TransferListData;
    constructor(status: number, data: TransferListData) {
        this.status = status;
        this.data = data;
    }
}
export class WalletInfoNetworkResponse implements WalletInfoAPIModel {
    status: number;
    data: WalletInfoData[];
    constructor(status: number, data: WalletInfoData[]) {
        this.status = status;
        this.data = data;
    }
}

export class WithdrawAccountsNetworkResponsel implements WithdrawAccountsApiModel {
    status: number;
    data: WithdrawAccount[];
    constructor(status: number, data: WithdrawAccount[]) {
        this.status = status;
        this.data = data;
    }
}


export class DepositAccountsNetworkResponsel implements DepositAccountsApiModel {
    status: number;
    data: DepositAccount[];
    constructor(status: number, data: DepositAccount[]) {
        this.status = status;
        this.data = data;
    }
}

export class SystemDepositAccountsNetworkResponsel implements SystemDepositAccountsApiModel {
    status: number;
    data: SystemDepositAccounts[];
    constructor(status: number, data: SystemDepositAccounts[]) {
        this.status = status;
        this.data = data;
    }
}



export class WithdrawHistoryNetworkResponse implements WithdrawHistoryNetworkResponseApi {
    status: number;
    data: WithdrawHistoryNetworkResponseData;
    constructor(status: number, data: WithdrawHistoryNetworkResponseData) {
        this.status = status;
        this.data = data;
    }
}

export class DepositHistoryNetworkResponse implements DepositHistoryNetworkResponseApi {
    status: number;
    data: DepositHistoryNetworkResponseData;
    constructor(status: number, data: DepositHistoryNetworkResponseData) {
        this.status = status;
        this.data = data;
    }
}
export class AccountRequestListResponse implements AccountRequestListAPIModel {
    status: number;
    data: AccountRequestList[];
    constructor(status: number, data: AccountRequestList[]) {
        this.status = status;
        this.data = data;
    }
}
