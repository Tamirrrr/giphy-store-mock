import {GifCard} from "@/components/shared/gif/GifCard.tsx";
import {Gif} from "@/interfaces/gif.interface.ts";

export interface GifCardListProps {
    gifs: Gif[];
    onGifClick?: (gif: Gif) => void;
}

export const GifCardList = ({gifs, onGifClick}: GifCardListProps) => {
    return (
        <div className="flex flex-wrap">
            {gifs.map((gif) => (
                <GifCard key={gif.id} gif={gif} onGifClick={onGifClick} size={'small'}/>
            ))}
        </div>
    );
}