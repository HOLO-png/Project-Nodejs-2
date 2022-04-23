export const isEmptyObject = (v) => {
    return !!v && v.constructor === Object && Object.keys(v).length === 0;
};
