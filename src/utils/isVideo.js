const isVideo = (src) => {
    return /([^#?]+)\/?([^#?]+\.(mp4|mov|avi|m4v|mkv|webm|wmv|ogv|ogg))(\?([^#]*))?(#(.*))?$/i.test(src);
};

export default isVideo;
