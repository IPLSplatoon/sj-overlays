import get from 'lodash/get';
import at from 'lodash/at';
import isEqual from 'lodash/isEqual';

export function doOnDifference<T>(
    newValue: T,
    oldValue: T,
    path: string,
    callback: (newObject: unknown, oldObject: unknown
) => void): void {
    const newObject = get(newValue, path);
    const oldObject = get(oldValue, path);

    if (newObject != null && (oldObject == null || !isEqual(newObject, oldObject))) {
        callback(newObject, oldObject);
    }
}

export function doOnOneOrMoreDifference<T extends Record<string, unknown>>(
    newValue: T,
    oldValue: T,
    paths: string[],
    callback: (newPaths: unknown) => void
): void {
    const newPaths = at(newValue, paths);
    const oldPaths = at(oldValue, paths);

    const doesNotExist = (value: unknown) => value == null;

    if (!newPaths.every(doesNotExist) && (oldPaths.every(doesNotExist) || !isEqual(newPaths, oldPaths))) {
        callback(newPaths);
    }
}

export function doOnNoDifference<T extends Record<string, unknown>>(
    newValue: T,
    oldValue: T,
    path: string,
    callback: (newObject: unknown) => void
): void {
    const newObject = get(newValue, path);
    const oldObject = get(oldValue, path);

    if (newObject != null && (oldObject == null || isEqual(newObject, oldObject))) {
        callback(newObject);
    }
}
