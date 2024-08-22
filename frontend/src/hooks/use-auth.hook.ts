import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const accessToken: string | null = localStorage.getItem('accessToken'); // Assuming the token is stored in localStorage

    useEffect(() => {
        if (accessToken && location.pathname === '/') {
            navigate('/store')
        } else {
            if (!accessToken) {
                navigate('/');
            }
        }
    }, [accessToken, navigate]);

    return accessToken;
};

export default useAuth;