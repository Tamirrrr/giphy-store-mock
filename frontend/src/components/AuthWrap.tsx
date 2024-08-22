import useAccessToken from "@/hooks/access-token.hook.ts";
import {Outlet} from "react-router-dom";

const AuthWrap = () => {
    useAccessToken();
    return <Outlet/>;
}

export default AuthWrap;