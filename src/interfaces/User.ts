// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"



export interface IUserResponse {
    isAuthenticated:             boolean;
    message:                     null;
    token:                       string;
    customerInfo:                CustomerInfo;
    customerAccountInfo:         CustomerAccountInfo;
    customerAccountSettingsInfo: CustomerAccountSettingsInfo;
}

export interface CustomerAccountInfo {
    id:              number;
    customerId:      number;
    displayName:     string;
    email:           string;
    mobilePhone:     string;
    password:        null;
    typeId:          number;
    isVerified:      boolean;
    isEmailVerified: boolean;
    createdDate:     string;
    updatedDate:     string;
    isActive:        boolean;
}

export interface CustomerAccountSettingsInfo {
    id:                number;
    customerAccountId: number;
    language:          string;
    shortcuts:         null;
    createdDate:       string;
    updatedDate:       null;
}

export interface CustomerInfo {
    id:           number;
    crmId:        number;
    firstName:    string;
    lastName:     string;
    picture:      null;
    mobilePhone:  string;
    mobilePhone2: null;
    mobilePhone3: null;
    email:        string;
    email2:       null;
    email3:       null;
    birthDate:    null;
    birthPlace:   null;
    address:      null;
    state:        null;
    city:         null;
    zipCode:      null;
    country:      null;
    statusId:     number;
    status:       string;
    createdDate:  string;
    updatedDate:  string;
    isActive:     boolean;
}
