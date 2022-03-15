const isVimeo = (src) => {
    return /^(https?:)?\/\/((www|player)\.)?vimeo\.com\//.test(src);
};

export default isVimeo;
