import useAuth from "@/hooks/use-auth.hook.ts";
import AuthWrap from "@/components/AuthWrap.tsx";

const ProtectedRoute = () => {
    useAuth();
    return <AuthWrap/>;
}

export default ProtectedRoute;