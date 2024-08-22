import {UserGif} from "@/interfaces/user-gif.interface.ts";
import {Transaction} from "@/interfaces/transaction.interface.ts";

export interface User {
    id: number | null;
    email: string | null;
    createdAtInternal: string | null;
    updatedAtInternal: string | null;
    gifs: UserGif[] | null;
    transactions: Transaction[] | null;
}