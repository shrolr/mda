export interface AccountTypesApiModel {
    status: number;
    data:   AccountTypes[];
}

export interface AccountTypes {
    id:       number;
    name:     string;
    isActive: boolean;
}
