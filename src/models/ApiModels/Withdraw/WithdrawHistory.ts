export interface WithdrawHistoryNetworkResponseApi {
    status: number;
    data:   WithdrawHistoryNetworkResponseData;
}

export interface  WithdrawHistoryNetworkResponseData {
    page:    number;
    count:   number;
    payload: WithdrawHistory[];
}

export interface WithdrawHistory {
    id:                          number;
    accountId:                   number;
    type:                        string;
    status:                      string;
    amount:                      number;
    currency:                    string;
    comment:                     string;
    isWalletWithdraw:            boolean;
    responseComment:             null;
    customerWithdrawAccountName: string;
    createdDate:                 string;
    updatedDate:                 null;
}
