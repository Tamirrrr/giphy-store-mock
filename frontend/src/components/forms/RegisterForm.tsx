import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useState} from "react";
import AuthClient from "@/api/auth.client.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {RegisterResponse} from "@/interfaces/api/auth.interface.ts";

export interface RegisterFormProps {
    onSignInClick: () => void;
    onSuccess: (response: RegisterResponse) => void;
}

export function RegisterForm(props: RegisterFormProps) {
    const {toast} = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignUpClick = async () => {
        try {
            const response: RegisterResponse = await AuthClient.register({
                email,
                password
            });
            props.onSuccess(response);
            toast({
                title: 'Success',
                description: 'Welcome!',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: (error as any).message || 'An error occurred',
                variant: 'destructive'
            })
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
                <CardDescription>
                    The store of gifs around the world.
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
                <Button className="w-full" onClick={onSignUpClick}>Sign up</Button>
                <Label>Already have an account? <Button variant="link" className="pl-0" onClick={props.onSignInClick}>Sign
                    in!</Button></Label>
            </CardFooter>
        </Card>
    )
}
