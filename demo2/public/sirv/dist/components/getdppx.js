Sirv.define('getDPPX', ['bHelpers', 'magicJS', 'helper', 'ResponsiveImage'], function (bHelpers, magicJS, helper, ResponsiveImage) {
  var moduleName = 'getDPPX';
  var $J = magicJS;
  var $ = $J.$;
  /* eslint-env es6 */

  /* global ResponsiveImage, helper */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "getDPPX" }] */

  var getDPPX = function (currentWidth, currentHeight, originWidth, originHeight, round, upscale) {
    var result = 1;
    var tmp;

    if ($J.DPPX > 1) {
      if (currentHeight > currentWidth) {
        tmp = currentHeight;

        if (round) {
          tmp = ResponsiveImage.roundImageSize({
            height: currentHeight
          }).height;
        }

        result = helper.getDPPX(tmp, originHeight, upscale);
      } else {
        tmp = currentWidth;

        if (round) {
          tmp = ResponsiveImage.roundImageSize({
            width: currentWidth
          }).width;
        }

        result = helper.getDPPX(tmp, originWidth, upscale);
      }
    }

    return result;
  };

  return getDPPX;
});
//# sourceMappingURL=getdppx.js.map
