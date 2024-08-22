import { makeAutoObservable } from "mobx";
import { User } from "@/interfaces/user.interface.ts";
import { Transaction } from "@/interfaces/transaction.interface.ts";
import { UserGif } from "@/interfaces/user-gif.interface.ts";

export class UserStore implements User {
    id: number | null = null;
    email: string | null = null;
    createdAtInternal: string | null = null;
    updatedAtInternal: string | null = null;
    gifs: UserGif[] = [];
    transactions: Transaction[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true, deep: true });
    }

    setUser(user: Partial<User>): void {
        Object.assign(this, user);
    }

    clearUser(): void {
        this.id = null;
        this.email = null;
        this.createdAtInternal = null;
        this.updatedAtInternal = null;
        this.gifs = [];
        this.transactions = [];
    }
}
