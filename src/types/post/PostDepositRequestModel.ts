
export type PostDepositRequestModel = {
    CustomerId: number;
    AccountId: number | null;
    IsWalletDeposit: boolean;
    TypeId: number;
    statusId: number;
    Amount: number;
    Currency: string;
    Comment: string;
    CustomerDepositAccountId: number | null;
    DepositAccountId: number;
};

export enum CustomerDepositAccountTypeEnum {
    BankAccount = "BankAccount",
    CreditCard = "CreditCard"
}