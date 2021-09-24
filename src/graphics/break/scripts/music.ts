import { musicShown, nowPlaying } from '../../helpers/replicants';
import { textOpacitySwap, textSlideSwap } from '../../helpers/anim';
import { NowPlaying } from 'schemas';
import isEmpty from 'lodash/isEmpty';
import { elementById } from '../../helpers/elem';
import { gsap } from 'gsap';
import { toggleMainRow } from './mainSlides';

const infoBarMusicTl = gsap.timeline();
const mainMusicTl = gsap.timeline();

function getSongName(nowPlaying: NowPlaying): string {
    if (isEmpty(nowPlaying.song)) {
        return nowPlaying.artist;
    }
    if (isEmpty(nowPlaying.artist)) {
        return nowPlaying.song;
    }
    return `${nowPlaying.artist} - ${nowPlaying.song}`;
}

nowPlaying.on('change', newValue => {
    const songName = getSongName(newValue);
    infoBarMusicTl.add(
        textOpacitySwap(
            songName,
            elementById<FittedText>('info-bar-music'),
            [elementById('info-bar-music-icon')]));

    mainMusicTl.addLabel('song-change');
    mainMusicTl.add(textSlideSwap(isEmpty(newValue.song) ? 'Unknown Track' : newValue.song, elementById('main-music-text-song')), 'song-change')
        .add(textSlideSwap(isEmpty(newValue.artist) ? 'Unknown Artist' : newValue.artist, elementById('main-music-text-artist')), 'song-change');
});

musicShown.on('change', newValue => {
    toggleMainRow('.main-row.music', newValue, 'main', 90);
});
