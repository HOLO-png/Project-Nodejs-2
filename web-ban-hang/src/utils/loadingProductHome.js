export const loadingProductHome = (products) => {
    const count = Math.ceil(products.length / 5);
    return count * 380;
};
