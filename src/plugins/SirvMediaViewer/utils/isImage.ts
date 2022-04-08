const isImage = (src = ''): boolean => {
    return /\.(jpg|jpeg|png|webp|gif|svg)$/.test(src);
};

export default isImage;
