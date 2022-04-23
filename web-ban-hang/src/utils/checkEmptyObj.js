export const isEmptyObject = (v) => {
    const data = Object.values(v);
    const isCheck = data.every((item) => {
        return item.length === 0;
    });

    return isCheck;
};
