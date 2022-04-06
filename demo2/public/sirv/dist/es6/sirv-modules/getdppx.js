Sirv.define(
    'getDPPX',
    ['bHelpers','magicJS','helper','ResponsiveImage'],
    (bHelpers,magicJS,helper,ResponsiveImage) => {
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* global ResponsiveImage, helper */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "getDPPX" }] */

const getDPPX = (currentWidth, currentHeight, originWidth, originHeight, round, upscale) => {
    let result = 1;

    if ($J.DPPX > 1) {
        if (currentHeight > currentWidth) {
            const height = round ? ResponsiveImage.roundImageSize({ height: currentHeight }).height : currentHeight;
            result = helper.getDPPX(height, originHeight, upscale);
        } else {
            const width = round ? ResponsiveImage.roundImageSize({ width: currentWidth }).width : currentWidth;
            result = helper.getDPPX(width, originWidth, upscale);
        }
    }

    return result;
};

return getDPPX;

    }
);
