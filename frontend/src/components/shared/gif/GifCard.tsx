import {Gif} from "@/interfaces/gif.interface.ts";
import {Card, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {useEffect, useMemo, useState} from "react";
import {formatCurrency} from "@/utils/currency.utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {useStore} from "@/providers/RootStoreProvider.tsx";
import {
    PaymentProvider,
    TransactionCreateRequest,
    TransactionCreateResponse,
    TransactionType
} from "@/interfaces/api/transaction.interface.ts";
import TransactionClient from "@/api/transaction.client.ts";
import {isAuthenticationError} from "@/utils/auth.utils.ts";
import useLogout from "@/hooks/use-logout.hook.ts";
import useFetchUserInformation from "@/hooks/use-fetch-user-information.hook.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {hasPurchasedGif} from "@/utils/user.utils.ts";

export interface GifCardProps {
    gif: Gif;
    size: 'small' | 'medium' | 'large';
    onGifClick?: (gif: Gif) => void;
}

export const GifCard = ({gif, size, onGifClick}: GifCardProps) => {
    const {user} = useStore();
    const [purchasedGif, setPurchasedGif] = useState<boolean>(false);
    const logout = useLogout(user);
    const fetchInformation = useFetchUserInformation(user);

    useEffect(() => {
        setTimeout(() => {
            setPurchasedGif(hasPurchasedGif(user, gif.id));
        }, 100);
    }, []);

    const cardWidth: string = useMemo(() => {
        switch (size) {
            case 'small':
                return 'w-1/4';
            case 'medium':
                return 'w-1/2';
            case 'large':
                return 'w-full';
        }
    }, [size]);

    const gifPrice: string = useMemo(() => {
        return formatCurrency(+gif.price);
    }, [gif.price]);

    const onImageClick = (): void => {
        if (onGifClick) {
            onGifClick(gif);
        }
    }

    const onPurchaseClick = async (): Promise<void> => {
        const request: TransactionCreateRequest = {
            provider: PaymentProvider.MOCK,
            type: TransactionType.GIF,
            data: {
                gifId: +gif.id
            }
        }
        try {
            const response: TransactionCreateResponse = await TransactionClient.create(request);
            if (!response.transaction) {
                throw new Error('Transaction not created');
            }
            switch (response.transaction.status) {
                case 'completed':
                    setPurchasedGif(true);
                    toast({
                        title: 'Thank you!',
                        description: 'You have successfully purchased the gif',
                    });
                    break;
            }
            await fetchInformation();
        } catch (error) {
            if (isAuthenticationError(+(error as any)?.status)) {
                logout();
                return;
            }
        }
    }

    return (
        <Card className={cardWidth}>
            <CardHeader>
                <img onClick={onImageClick} src={gif.url} loading="lazy" className="w-full h-48 object-cover relative"/>
            </CardHeader>
            <CardFooter>
                <Button disabled={purchasedGif} variant={purchasedGif ? 'destructive' : 'default'} className="w-full" onClick={onPurchaseClick}>
                    {purchasedGif ? 'Purchased' : `Buy for ${gifPrice}`}
                </Button>
            </CardFooter>
        </Card>
    );
}