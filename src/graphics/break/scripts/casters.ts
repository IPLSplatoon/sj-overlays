import { casters } from '../../helpers/replicants';
import { gsap } from 'gsap';
import { textOpacitySwap } from '../../helpers/anim';
import { elementById } from '../../helpers/elem';

const infoBarCastersTl = gsap.timeline();

casters.on('change', (newValue, oldValue) => {
    let castersText = '';
    let twittersText = '';

    let updateTwitters = (oldValue === undefined);
    let updateNames = (oldValue === undefined);

    Object.keys(newValue).forEach((item, index, arr) => {
        const element = newValue[item];

        if (oldValue && (!updateTwitters || !updateNames)) {
            const oldElement = oldValue[item];

            Object.keys(oldValue).forEach(item => {
                if (!newValue[item]) {
                    updateTwitters = true;
                    updateNames = true;
                }
            });

            if (!oldElement || element.pronouns !== oldElement.pronouns) {
                updateNames = true;
                updateTwitters = true;
            } else {
                if (element.twitter !== oldElement.twitter) {
                    updateTwitters = true;
                }
                if (element.name !== oldElement.name) {
                    updateNames = true;
                }
            }
        }

        castersText += `${element.name} <span class="pronoun">${element.pronouns}</span>`;
        twittersText += `${element.twitter} <span class="pronoun">${element.pronouns}</span>`;

        if (arr[index + 2]) {
            castersText += ', ';
            twittersText += ', ';
        } else if (arr[index + 1]) {
            castersText += ' & ';
            twittersText += ' & ';
        }
    });

    if (updateNames) {
        infoBarCastersTl.add(textOpacitySwap(
            castersText,
            elementById('info-row-casters-text'),
            [elementById('info-row-casters-icon')]));
    }

    if (updateTwitters) {
        infoBarCastersTl.add(textOpacitySwap(
            twittersText,
            elementById('info-row-casters-twitter-text'),
            [elementById('info-row-casters-twitter-icon')]));
    }
});
