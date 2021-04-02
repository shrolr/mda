
export type PostCustomerWithdrawAccountRequestModel = {
    CustomerId: number;
    TypeId: number;
    Label: string;
    AccountName: string;
    AccountNumber: string;
    BankName: string;
    Address: string | null;
    Details: string | null;
    Iban: string | null;
    Swift: string | null;
    Currency: string;
}
export enum CustomerWithdrawAccountTypeEnum {
    BankAccount = "BankAccount",
    CreditCard = "CreditCard"
}