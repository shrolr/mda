import { Coin } from "./Coin";

interface IAlarm {
    coin: Coin;
    threshold:number
}

export class Alarm implements IAlarm {
    readonly coin: Coin;
    readonly threshold: number;

    constructor(coin: Coin,threshold:number) {
        this.coin = coin;
        this.threshold = threshold;

    }

}

