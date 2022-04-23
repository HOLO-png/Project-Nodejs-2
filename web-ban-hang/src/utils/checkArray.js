function isObject(obj) {
    return obj && typeof obj === 'object';
}

export function isArray(obj) {
    return isObject(obj) && obj instanceof Array;
}
