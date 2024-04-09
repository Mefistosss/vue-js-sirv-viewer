const isVimeo = (src = ''): boolean => {
    return /^(https?:)?\/\/((www|player)\.)?vimeo\.com\//.test(src);
};

export default isVimeo;
