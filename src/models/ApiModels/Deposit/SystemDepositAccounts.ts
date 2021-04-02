 
export interface SystemDepositAccountsApiModel {
    data:    SystemDepositAccounts[];
    status:  number;
}

export interface SystemDepositAccounts {
    id:            number;
    label:         null;
    type:          string;
    accountNumber: string;
    accountName:   string;
    bankName:      null;
    details:       null;
    address:       null;
    iban:          null;
    swift:         string;
    currency:      string;
    qrCode:        null;
}
