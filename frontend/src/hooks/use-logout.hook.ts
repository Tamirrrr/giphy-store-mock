import {useNavigate} from "react-router-dom";
import {UserStore} from "@/stores/UserStore.ts";

const useLogout = (userState: UserStore) => {
    const navigate = useNavigate();

    return (): void => {
        localStorage.removeItem('accessToken');
        userState.clearUser();
        navigate('/');
    };
}

export default useLogout;