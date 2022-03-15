const isImage = (src) => {
    return /\.(jpg|jpeg|png|webp|gif|svg)$/.test(src);
};

export default isImage;
