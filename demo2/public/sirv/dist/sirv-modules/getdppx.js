Sirv.define(
    'getDPPX',
    ['bHelpers','magicJS','helper','ResponsiveImage'],
    (bHelpers,magicJS,helper,ResponsiveImage) => {
        const moduleName = 'getDPPX';
        
        const $J = magicJS;
        const $ = $J.$;
        
        
        /* eslint-env es6 */
/* global ResponsiveImage, helper */
/* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "getDPPX" }] */

const getDPPX = (currentWidth, currentHeight, originWidth, originHeight, round, upscale) => {
    let result = 1;
    let tmp;

    if ($J.DPPX > 1) {
        if (currentHeight > currentWidth) {
            tmp = currentHeight;
            if (round) {
                tmp = ResponsiveImage.roundImageSize({ height: currentHeight }).height;
            }
            result = helper.getDPPX(tmp, originHeight, upscale);
        } else {
            tmp = currentWidth;
            if (round) {
                tmp = ResponsiveImage.roundImageSize({ width: currentWidth }).width;
            }
            result = helper.getDPPX(tmp, originWidth, upscale);
        }
    }

    return result;
};

return getDPPX;

    }
);
