
export interface AccountRequestListAPIModel {
    status: number;
    data:   AccountRequestList[];
}

export interface AccountRequestList {
    id:          number;
    customerId:  number;
    status:      string;
    createdDate: string;
    updatedDate: null | string;
}
