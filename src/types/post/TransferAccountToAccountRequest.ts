export type TransferAccountToAccountRequest = {
    sourceAccountId: number;
    walletId:        null;
    targetAccountId: number;
    currency:        string;
    typeId:          number;
    amount:          number;
    customerId:      number;
}
