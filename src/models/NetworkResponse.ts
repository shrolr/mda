import { IUserResponse } from "../interfaces";

interface INetworkResponse {
    status?: number;
    data?: unknown;
}

export class NetworkResponse implements INetworkResponse {
    status: number;
    data: unknown;
    constructor(status:number,data:unknown) {
        this.status = status;
        this.data = data;
    }
}

interface INetworkResponseFail {
    status?: number;
}

export class NetworkResponseFail implements INetworkResponseFail {
    status: number;
    constructor(status:number) {
        this.status = status;
    }
}


interface ILoginNetworkResponse {
    status?: number;
    data?: IUserResponse;
}
export class LoginNetworkResponse implements ILoginNetworkResponse {
    status: number;
    data: IUserResponse;
    constructor(status:number,data:IUserResponse) {
        this.status = status;
        this.data = data;
    }
}