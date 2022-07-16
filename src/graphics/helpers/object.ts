export function addToObjectOfArrays<T>(obj: { [key: (string | number)]: T[] }, key: (string | number), newItem: T): void {
    if (!obj[key]) {
        obj[key] = [ newItem ];
    } else {
        obj[key].push(newItem);
    }
}
