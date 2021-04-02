import { CustomerWithdrawAccountTypeEnum } from "../../../types/post/PostCustomerDepositAccountRequestModel";

export interface WithdrawAccountsApiModel {
    status: number;
    data:   WithdrawAccount[];
}

export interface  WithdrawAccount {
    id:            number;
    customerId:    number;
    type:          CustomerWithdrawAccountTypeEnum;
    label:         string;
    accountName:   string;
    accountNumber: string;
    bankName:      string;
    address:       string;
    details:       string;
    iban:          string;
    swift:         string;
    currency:      string;
    createdDate:   string;
    updatedDate:   null;
}
