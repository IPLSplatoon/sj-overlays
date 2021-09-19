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
    mainMusicTl.add(textSlideSwap(songName, elementById('main-music-text')));
});

musicShown.on('change', newValue => {
    toggleMainRow('.main-row.music', newValue, 'main');
});
