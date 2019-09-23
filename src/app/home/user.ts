export class User {
    name: string;
    _id: string;
    idUser: string;
    login: string;
    password: string;
    followed: boolean;
    followers: User[];
    following: User[];

    constructor(name, login, password) {
        this.name = name;
        this.login = login;
        this.password = password;
    }
}
