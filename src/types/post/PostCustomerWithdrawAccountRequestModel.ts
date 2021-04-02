export type PostCustomerDepositAccountRequestModel = {
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
export enum CustomerDepositAccountTypeEnum {
    BankAccount = "BankAccount",
    CreditCard = "CreditCard"
}
