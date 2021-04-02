import { CustomerDepositAccountTypeEnum } from "../../../types/post";

 
export interface DepositAccountsApiModel {
    status: number;
    data:   DepositAccount[];
}

export interface  DepositAccount {
    id:            number;
    customerId:    number;
    type:          CustomerDepositAccountTypeEnum;
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
