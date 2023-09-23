import { isBlank } from './string';

export async function loadImage(imageUrl: string): Promise<void> {
    return new Promise((resolve) => {
        const imageLoaderElem = document.createElement('img');
        imageLoaderElem.src = imageUrl;

        imageLoaderElem.addEventListener('load', () => {
            resolve();
        });
    });
}

export async function loadAndCheckIfImageExists(src: string): Promise<boolean> {
    return new Promise(resolve => {
        if (isBlank(src)) {
            return resolve(false);
        }

        const img = new Image();
        img.src = src;

        img.onload = () => {
            resolve(true);
        };
        img.onerror = () => {
            resolve(false);
        };
    });
}
