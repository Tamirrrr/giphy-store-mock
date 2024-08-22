import {GiphyRendition} from "./rendition.interface";

export interface GiphyImages {
    fixed_height: GiphyRendition;
    fixed_height_still: GiphyRendition;
    fixed_height_downsampled: GiphyRendition;
    fixed_width: GiphyRendition;
    fixed_width_still: GiphyRendition;
    fixed_width_downsampled: GiphyRendition;
    fixed_height_small: GiphyRendition;
    fixed_height_small_still: GiphyRendition;
    fixed_width_small: GiphyRendition;
    fixed_width_small_still: GiphyRendition;
    downsized: GiphyRendition;
    downsized_still: GiphyRendition;
    downsized_large: GiphyRendition;
    downsized_medium: GiphyRendition;
    downsized_small: GiphyRendition;
    original: GiphyRendition;
    original_still: GiphyRendition;
    looping: GiphyRendition;
    preview: GiphyRendition;
    preview_gif: GiphyRendition;
}