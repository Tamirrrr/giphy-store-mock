import {UserStore} from "@/stores/UserStore.ts";
import {UserInformationResponse} from "@/interfaces/api/auth.interface.ts";
import authClient from "@/api/auth.client.ts";

const useFetchUserInformation = (userState: UserStore) => {
    return async () => {
        const userInformation: UserInformationResponse = await authClient.information();
        if (!userInformation.user) {
            throw new Error('User not found');
        }
        userState.setUser(userInformation.user);
    }
}

export default useFetchUserInformation;