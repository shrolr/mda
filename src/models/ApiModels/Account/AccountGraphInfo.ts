export interface AccountGraphInfo {
    metaTrader4: MetaTrader;
    metaTrader5: MetaTrader;
}

export interface MetaTrader {
    balanceData:    number[];
    freeMarginData: number[];
    labels:         string[];
}
