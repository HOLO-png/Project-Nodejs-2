export const isEmptyObjectAll = (v) => {
    const data = Object.values(v);
    const isCheck = data.some((item) => {
        return item.length === 0;
    });

    return isCheck;
};
