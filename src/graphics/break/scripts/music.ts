import { nowPlaying } from '../../helpers/replicants';
import { textOpacitySwap } from '../../helpers/anim';
import { NowPlaying } from 'schemas';
import isEmpty from 'lodash/isEmpty';
import { elementById } from '../../helpers/elem';
import { gsap } from 'gsap';

const infoBarMusicTl = gsap.timeline();

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
    infoBarMusicTl.add(
        textOpacitySwap(
            getSongName(newValue),
            elementById<FittedText>('info-bar-music'),
            [elementById('info-bar-music-icon')]));
});
