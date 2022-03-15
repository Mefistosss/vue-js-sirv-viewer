const isYoutube = (src) => {
    return /^(https?:)?\/\/((www\.)?youtube\.com|youtu\.be)\//.test(src);
};

export default isYoutube;
