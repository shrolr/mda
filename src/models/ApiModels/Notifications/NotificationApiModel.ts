 
export interface CustomerNotificationInfoModel {
    count: number;
    notifications: NotificationApiModel[];
}
export interface NotificationApiModel {
    id: number;
    customerId: number;
    type: string;
    status: string;
    messageType: string;
    note: string;
    createdDate: Date | string;
    updatedDate: Date | string | null;
    readDate: Date | string | null;
}
