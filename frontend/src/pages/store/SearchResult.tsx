import {StoreLayout} from "@/layouts/StoreLayout.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {Gif} from "@/interfaces/gif.interface.ts";
import {Label} from "@/components/ui/label.tsx";
import GifClient from "@/api/gif.client.ts";
import {GifTrendingResponse} from "@/interfaces/api/gif.interface.ts";
import {GifCardList} from "@/components/shared/gif/GifCardList.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {observer} from "mobx-react-lite";

const SearchResultPage =  observer(() => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const query: string = useMemo(() => searchParams.get('q') || '', [searchParams]);
    const [gifs, setGifs] = useState<Gif[]>([]);


    const gifList = useMemo(() => (
        <GifCardList gifs={gifs} onGifClick={(gif: Gif) => console.log(gif)}/>
    ), [gifs]);

    useEffect(() => {
        if (!query) {
            navigate('/store');
        }
    }, []);

    useEffect(() => {
        setGifs([]);
        setLoading(true);
        GifClient.search(query).then((response: GifTrendingResponse) => {
            setGifs(response.gifs);
            setLoading(false);
        }).catch((error) => {
            toast({
                title: 'Oops!',
                description: error.message || 'Something went wrong. Please try again later.',
                variant: 'destructive'
            });
            setLoading(false);
        });
    }, [query]);

    return (
        <StoreLayout>
            {
                query &&
                <div className="flex flex-col gap-4">
                    <Label className="h1">
                        Search Resultss for <Badge>{query}</Badge>
                    </Label>
                    {!loading ?
                        gifs.length > 0 ?
                            gifList :
                            <Label>No results found</Label> :
                        <Label>Loading...</Label>
                    }
                </div>
            }
        </StoreLayout>
    );
});

export default SearchResultPage;