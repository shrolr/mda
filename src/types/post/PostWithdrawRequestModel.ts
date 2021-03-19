
export type PostWithdrawRequestModel = {
    CustomerId: number;
    AccountId: number | null;
    IsWalletWithdraw: boolean;
    TypeId: number;
    Amount: number;
    Currency: string;
    Comment: string;
    CustomerWithdrawAccountId: number | null;
}
