
export interface AccountListApiModel {
    status: number;
    data: Accounts[];
}
export interface Accounts {
    id: number;
    customerId: number;
    user: number;
    password: string;
    accountName: string | null;
    investor: string;
    serverName: string;
    currency: string;
    balance: number;
    credit: number;
    equity: number;
    freeMargin: number;
    margin: number;
    profit: number;
    type: string;
    status: string;
    leverage: string;
    tradingPlatform: string;
    isDemo: boolean;
    isArchived: boolean;
    isPasswordUpdateRequired: boolean;
    createdDate: string;
    updatedDate: null;
    isActive: boolean;
}
