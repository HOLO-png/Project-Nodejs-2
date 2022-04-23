export const getProducts = (count, products) => {
    if (products) {
        let products_api = products.slice();
        products_api.sort(() => Math.random() - 0.5).slice();
        const max = products_api.length - count;
        const min = 0;
        const start = Math.floor(Math.random() * (max - min) + min);
        return products_api.slice(0, count);
    } else {
        return [];
    }
};
