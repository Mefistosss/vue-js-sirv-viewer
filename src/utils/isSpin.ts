const isSpin = (src = ''): boolean => {
    return /\.spin$/.test(src);
};

export default isSpin;
