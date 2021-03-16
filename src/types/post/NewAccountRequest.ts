 export type NewAccountRequest = {
    tradingPlatformId: number;
    typeId:            number | undefined;
    currency:          string | undefined;
    leverageId:        number | undefined;
    initialDeposit:    number | undefined;
    statusId:          number;
    isDemo:            boolean;
    username:          null;
    password:          null;
    customerId:        number;
}
 