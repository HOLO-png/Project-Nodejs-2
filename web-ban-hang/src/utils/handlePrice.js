export const handleChangeProductPrice = (priceOld, priceNew) => {
    if (+priceOld < priceNew) {
        return 0;
    } else {
        return Math.round(((+priceOld - priceNew) / +priceOld) * 100);
    }
};
