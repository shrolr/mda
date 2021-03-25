export interface WalletInfoAPIModel {
    status: number;
    data:   WalletInfoData[];
}

export interface WalletInfoData {
    wallet:               Wallet;
    transactionGraphInfo: TransactionGraphInfo;
    transactions:         WalletTransactionApiModel[];
}

export interface TransactionGraphInfo {
    balance:  number;
    currency: string;
    data:     number[];
    labels:   string[];
}

export interface Wallet {
    id:          number;
    customerId:  number;
    balance:     number;
    currency:    string;
    createdDate: string;
    updatedDate: null;
}

export interface WalletTransactionApiModel {
    id: number;
    walletId: number;
    type: string;
    status: string;
    fromId: number | null;
    toId: number | null;
    description: string;
    amount: number;
    currency: string;
    createdDate: Date | string;
    updatedDate: Date | string | null;
}