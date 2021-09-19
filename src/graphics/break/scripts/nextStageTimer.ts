import { nextRoundTime } from '../../helpers/replicants';
import { DateTime } from 'luxon';
import { elementById } from '../../helpers/elem';
import { toggleMainRow } from './mainSlides';

const nextRoundTimeElem = elementById<FittedText>('next-round-time-text');
let nextStageDate: DateTime;
let lastDiff: number;

nextRoundTime.on('change', newValue => {
    toggleMainRow('.main-row.timer', newValue.isVisible, 'main');

    nextStageDate = DateTime.fromISO(newValue.startTime);
});

setInterval(() => {
    const diff = Math.ceil(nextStageDate.diffNow(['minutes']).toObject().minutes);
    if (lastDiff !== diff) {
        lastDiff = diff;
        let newText;

        if (diff < 1) {
            newText = 'Next round starts <span class="bold">soon!</span>';
        } else if (diff === 1) {
            newText = `Next round starts <span class="bold">~${diff}</span> minute...`;
        } else {
            newText = `Next round starts <span class="bold">~${diff}</span> minutes...`;
        }

        nextRoundTimeElem.text = newText;
    }
}, 1000);
