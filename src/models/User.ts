interface Iuser {

    username: string;
    email: string;

}

export class User implements Iuser {
    readonly username: string;
    readonly email: string;

    constructor(username: string,  email: string,) {
        this.username = username;
        this.email = email;
    }

}

