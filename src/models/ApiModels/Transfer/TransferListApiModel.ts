export interface TransferListAPIModel {
    status: number;
    data:   TransferListData;
}

export interface TransferListData {
    page:    number;
    count:   number;
    payload: TransferList[];
}

export interface TransferList {
    id:              number;
    customerId:      number;
    walletId:        number | null;
    sourceAccountId: number;
    targetAccountId: number | null;
    type:            string;
    status:          string;
    currency:        string;
    amount:          number;
    createdDate:     string;
    updatedDate:     null;
}
