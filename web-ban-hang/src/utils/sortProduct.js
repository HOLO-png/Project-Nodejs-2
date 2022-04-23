export const sortLowToHight = (products) => {
    return products
        .slice()
        .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
};

export const sortHightToLow = (products) => {
    return products
        .slice()
        .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
};
