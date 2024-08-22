import {StoreLayout} from "@/layouts/StoreLayout";
import {Gif} from "@/interfaces/gif.interface.ts";
import {GifCardList} from "@/components/shared/gif/GifCardList.tsx";
import {useEffect, useState} from "react";
import GifClient from "@/api/gif.client.ts";
import {GifTrendingResponse} from "@/interfaces/api/gif.interface.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {observer} from "mobx-react-lite";

const HomePage = observer(() => {
    const [gifs, setGifs] = useState<Gif[]>([]);

    useEffect(() => {
        GifClient.trending().then((response: GifTrendingResponse) => {
            setGifs(response.gifs);
        }).catch((error) => {
            toast({
                title: 'Oops!',
                description: error.message || 'Something went wrong. Please try again later.',
                variant: 'destructive'
            });
        });
    }, []);


    return (
        <StoreLayout>
            <GifCardList gifs={gifs} onGifClick={(gif: Gif) => {
                console.log(gif);
            }}/>
        </StoreLayout>
    );
});

export default HomePage;