import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast.ts";
import AuthClient from "@/api/auth.client.ts";
import {LoginResponse} from "@/interfaces/api/auth.interface.ts";

export interface LoginFormProps {
    onSignUpClick: () => void;
    onSuccess: (response: LoginResponse) => void;
}

export function LoginForm(props: LoginFormProps) {
    const {toast} = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignInClick = async () => {
        try {
            const response: LoginResponse = await AuthClient.login({
                email,
                password
            });
            props.onSuccess(response);
            toast({
                title: 'Success',
                description: 'Welcome back!',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: (error as any).message || 'An error occurred',
                variant: 'destructive'
            });
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)}
                           placeholder="m@example.com" required/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required/>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
                <Button className="w-full" onClick={onSignInClick}>Sign in</Button>
                <Label>Don't have an account? <Button variant="link" className="pl-0" onClick={props.onSignUpClick}>Sign
                    up!</Button></Label>
            </CardFooter>
        </Card>
    )
}
