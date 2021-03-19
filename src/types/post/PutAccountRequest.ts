import { AccountRequestStatusEnum } from "../../enums";

export type PutAccountRequest = {
    customerId: number;
    statusId: AccountRequestStatusEnum;
}
