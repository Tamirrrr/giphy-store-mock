import {observer} from "mobx-react-lite";
import {AuthFormType} from "../../enums/auth/AuthFormType.enum";
import {FC, useState} from "react";
import {LoginForm} from "@/components/forms/LoginForm.tsx";
import {AuthLayout} from "@/layouts/AuthLayout.tsx";
import {RegisterForm} from "@/components/forms/RegisterForm.tsx";
import {LoginResponse, RegisterResponse} from "@/interfaces/api/auth.interface.ts";
import {User} from "@/interfaces/user.interface.ts";
import {useStore} from "@/providers/RootStoreProvider.tsx";
import {useNavigate} from "react-router-dom";

export interface AuthProps {
    formType?: AuthFormType;
}

const Auth: FC<AuthProps> = observer((props: AuthProps) => {
    const [formType, setFormType] = useState<AuthFormType>(props.formType || AuthFormType.LOGIN);
    const {user} = useStore();
    const navigate = useNavigate();

    const onSignUpClick = () => {
        setFormType(AuthFormType.REGISTER);
    }

    const onSignInClick = () => {
        setFormType(AuthFormType.LOGIN);
    }

    const onSuccess = (response: LoginResponse | RegisterResponse) => {
        user.setUser(response.user as User);
        localStorage.setItem('accessToken', response.accessToken);
        navigate('/store');
    }

    return (
        <AuthLayout>
            {formType === AuthFormType.LOGIN ?
                <LoginForm onSignUpClick={onSignUpClick} onSuccess={onSuccess}></LoginForm> :
                <RegisterForm onSignInClick={onSignInClick} onSuccess={onSuccess}></RegisterForm>}
        </AuthLayout>
    );
});

export default Auth;