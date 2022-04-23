export const findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
        if (product._id === id) {
            result = index;
        }
    });
    return result;
};
