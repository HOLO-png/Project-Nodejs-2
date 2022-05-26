const numberWithCommas = (num) =>
    num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0;

export default numberWithCommas;
