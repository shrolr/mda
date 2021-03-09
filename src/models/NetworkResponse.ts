
interface INetworkResponse {
    status?: number;
    data?: {};
}

export class NetworkResponse implements INetworkResponse {
    status: number;
    data: any;
    constructor() {
        this.status = 4;;
        this.data = null;
    }
}