interface ICoin {
    name: string;
    code:string;

}

export class Coin implements ICoin {
    readonly code: string;
    readonly name: string;
    constructor(name: string,code:string) {
        this.code = code;
        this.name = name;
    }
   
}

