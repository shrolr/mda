export type PostCustomerWithdrawAccountRequestModel = {
    CustomerId: number;
    TypeId: CustomerWithdrawAccountTypeEnum;
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
    BankAccount = 1,
    CreditCard = 2
}