export interface  DepositHistoryNetworkResponseApi {
    status: number;
    data:   DepositHistoryNetworkResponseData;
}

export interface DepositHistoryNetworkResponseData {
    page:    number;
    count:   number;
    payload: DepositHistory[];
}

export interface DepositHistory {
    id:                         number;
    accountId:                  null;
    isWalletDeposit:            boolean;
    status:                     string;
    type:                       string;
    depositAccountName:         string;
    customerDepositAccountName: string;
    amount:                     number;
    currency:                   string;
    comment:                    string;
    responseComment:            null | string;
    createdDate:                string;
    updatedDate:                null;
}
