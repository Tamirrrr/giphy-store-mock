import {User} from "@/interfaces/user.interface.ts";
import {UserGif} from "@/interfaces/user-gif.interface.ts";

export function hasPurchasedGif(user: User, gifId: number): boolean {
    const userGifs: UserGif[] = user.gifs || [];

    if (userGifs.length === 0) {
        return false;
    }

    return userGifs.some((userGif: UserGif): boolean => userGif.gif.id === gifId);
}