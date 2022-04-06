Sirv.define('Slider', ['require', 'module', 'bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'ResponsiveImage', 'helper', 'Promise!', 'EventEmitter', 'ContextMenu', 'ComponentLoader', 'defaultsVideoOptions', 'ViewerImage', 'SliderBuilder'], function (sirvRequire, sirvModule, bHelpers, magicJS, globalVariables, globalFunctions, ResponsiveImage, helper, Promise, EventEmitter, ContextMenu, ComponentLoader, defaultsVideoOptions, ViewerImage, SliderBuilder) {
  var moduleName = 'Slider';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.Sirv{line-height:0}.Sirv>img{max-width:100%}.Sirv>:nth-child(n+2){display:none}.Sirv>smv-thumbnail{display:none}.smv,div.Sirv{-webkit-touch-callout:none;touch-callout:none;-webkit-tap-highlight-color:transparent;tap-highlight-color:transparent;position:relative;width:100%;height:100%;z-index:1;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.smv{flex-wrap:nowrap!important;align-content:stretch!important}.smv-message{display:block;position:absolute;top:50%;left:33%;width:33%;padding:6px;border-width:1px;border-color:#aaa;border-collapse:separate;border-style:solid;border-radius:15px;background-color:#fff;background-image:none;color:#000;font-size:10px;text-align:center;box-shadow:0 0 10px #000;overflow:hidden;z-index:100}.smv-fullscreen-box{background-color:#fff;touch-action:none}.smv-fullscreen-box .smv{overflow:hidden}.smv-fullscreen-box .smv-message{top:15px;border-color:#ccc;background-color:#000;color:#fff;font-size:18px}.smv-fullscreen-box .smv-controls{width:0;height:0}@media not screen and (max-device-width:767px){.smv-pseudo-fullscreen,.smv-pseudo-fullscreen body{overflow:hidden!important}.smv-pseudo-fullscreen body{height:auto!important}}@media screen and (max-device-width:767px){:root.smv-pseudo-fullscreen:not(.ios-magic):not([data-magic-ua=safari]),:root.smv-pseudo-fullscreen:not(.ios-magic):not([data-magic-ua=safari]) body{overflow:hidden!important}:root.smv-pseudo-fullscreen:not(.ios-magic):not([data-magic-ua=safari]) body{height:auto!important}}.smv-slides-box,.smv-slides-box .smv-slides{display:inline-block!important}.smv-slides-box,.smv-slides-box .smv-slides{top:0!important;left:0!important}.smv-slides-box,.smv-slides-box .smv-slides,.smv-slides-box .smv-slides .smv-slide,.smv-slides-box .smv-slides .smv-slide .smv-content{line-height:100%!important;text-align:center!important}.smv-slides-box{position:relative!important;z-index:43}.smv-slides-box .smv-slides{position:absolute!important;width:100%!important;height:100%!important;overflow:hidden!important;vertical-align:top;touch-action:pan-y}.smv-slides-box .smv-slides .smv-slide{display:inline-block;position:absolute!important}.smv-slides-box .smv-slides .smv-slide .smv-fullscreen-always{position:absolute!important;top:0;left:0;width:100%;height:100%;z-index:9999999999999999}.smv-slides-box .smv-slides .smv-slide.smv-shown{opacity:1;visibility:visible;z-index:7}.smv-slides-box .smv-slides .smv-slide.smv-hidden{opacity:0;visibility:hidden;z-index:5;pointer-events:none!important}.smv-slides-box .smv-slides .smv-slide .smv-content{overflow:hidden}.smv-slides-box .smv-slides .smv-slide .smv-content::after{display:inline-block;height:100%;content:\'\';vertical-align:middle}.smv-slides-box .smv-slides .smv-slide .smv-content>img{width:auto;max-width:100%;height:auto;max-height:100%;vertical-align:middle}.smv-slides-box .smv-slides .smv-slide .smv-content>*{display:inline-block!important;position:relative!important}.smv-slides-box .sirv-zoom{z-index:40!important}.smv-autohide .smv-slides-box{width:100%;height:100%;z-index:41}.smv-content>img.smv-component.preloading{visibility:hidden!important}.smv-cursor-zoom-in{cursor:zoom-in}.smv-cursor-zoom-out{cursor:zoom-out}.smv-cursor-dragging{cursor:move}.smv-cursor-fullscreen-always{cursor:pointer}.smv-cursor-fullscreen-always .smv-cursor-dragging,.smv-cursor-fullscreen-always .smv-cursor-zoom-in,.smv-cursor-fullscreen-always .smv-cursor-zoom-out{cursor:pointer}.smv-fullscreen-box .smv-selectors-bottom .smv-slides-box,.smv-fullscreen-box .smv-selectors-top .smv-slides-box{display:flex!important;flex-direction:column}.smv-fullscreen-box .smv-selectors-bottom .smv-slides-box .smv-slides,.smv-fullscreen-box .smv-selectors-top .smv-slides-box .smv-slides{flex:1 1 100%}.smv-selectors-box{position:relative!important;flex-grow:0;flex-shrink:0;z-index:42}.smv-selectors-box *{box-sizing:border-box}.smv-selectors-box .smv-selectors{display:flex!important;flex-wrap:nowrap;align-content:stretch;width:100%!important;height:100%!important;box-sizing:border-box}.smv-selectors-box.smv-h .smv-selectors{flex-direction:row}.smv-selectors-box.smv-v .smv-selectors{flex-direction:column}.smv-selectors-box.smv-external{position:relative!important}.fake-container{position:absolute;top:0;left:0;width:100%;height:100%;transition:opacity .2s linear;opacity:0}.fake-container.shown{opacity:1}.fake-container>div{display:inline-block;position:relative;top:0;left:0}.fake-container>div::before{position:absolute;top:50%;left:50%;width:85%;height:85%;transform:translate(-50%,-50%);transition:none;border:1px solid #ccc;background-color:#eaeaea;content:\'\'}.smv-fullscreen-box .smv-selectors-box.smv-thumbnails.smv-h{padding-top:4px;padding-bottom:4px}.smv-fullscreen-box .smv-selectors-box.smv-thumbnails.smv-h .smv-selectors{justify-content:center}.smv-fullscreen-box .smv-selectors-box.smv-thumbnails.smv-v{padding-right:4px;padding-left:4px}.smv-fullscreen-box .smv-selectors-box.smv-thumbnails.smv-v .smv-selectors{justify-content:center}.mobile-magic .smv-fullscreen-box .smv-selectors-bottom .smv-selectors-box.smv-thumbnails{padding-bottom:20px}.smv.smv-autohide .smv-selectors-box{position:absolute!important;transform:translate3d(0,0,0);transition:transform .3s linear}.smv.smv-autohide.smv-selectors-top .smv-selectors-box{top:0}.smv.smv-autohide.smv-selectors-left .smv-selectors-box{left:0}.smv.smv-autohide.smv-selectors-right .smv-selectors-box{right:0}.smv.smv-autohide.smv-selectors-bottom .smv-selectors-box{bottom:0}.smv.smv-autohide.smv-selectors-closed.smv-selectors-top .smv-selectors-box{transform:translate3d(0,-100%,0)}.smv.smv-autohide.smv-selectors-closed.smv-selectors-left .smv-selectors-box{transform:translate3d(-100%,0,0)}.smv.smv-autohide.smv-selectors-closed.smv-selectors-right .smv-selectors-box{transform:translate3d(100%,0,0)}.smv.smv-autohide.smv-selectors-closed.smv-selectors-bottom .smv-selectors-box{transform:translate3d(0,100%,0)}.smv-selectors-box.smv-h{width:100%}.smv-selectors-box.smv-v{height:100%}.smv-selectors-box .smv-selectors .smv-ss,.smv-selectors-box .smv-selectors .smv-ss .smv-scroll .smv-item,.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item .smv-selector{position:relative!important}.smv-selectors-box .smv-selectors .smv-selectors-scroll-container{display:flex!important;flex-wrap:nowrap;align-content:stretch;order:0;width:100%;height:100%;box-sizing:border-box}.smv-selectors-box .smv-selectors .smv-selectors-pinned-start{order:-1}.smv-selectors-box .smv-selectors .smv-selectors-pinned-end{order:1}.smv-selectors-box.smv-thumbnails.smv-v .smv-selectors{justify-content:center}.smv-selectors-box.smv-thumbnails.smv-v .smv-selectors-scroll-container{flex-direction:column}.smv-selectors-box.smv-thumbnails.smv-h .smv-selectors{justify-content:center}.smv-selectors-box.smv-thumbnails.smv-h .smv-selectors-scroll-container{flex-direction:row}.smv-selectors-box.smv-thumbnails.smv-h .smv-selectors .smv-selectors-pinned-start,.smv-selectors-box.smv-thumbnails.smv-v .smv-selectors .smv-selectors-pinned-start{display:flex!important;flex-wrap:nowrap;align-content:stretch;box-sizing:border-box}.smv-selectors-box.smv-thumbnails.smv-h .smv-selectors .smv-selectors-pinned-end,.smv-selectors-box.smv-thumbnails.smv-v .smv-selectors .smv-selectors-pinned-end{display:flex!important;flex-wrap:nowrap;align-content:stretch;box-sizing:border-box}.smv-selectors-box .smv-selectors .smv-ss{display:inline-block!important;flex-grow:1;flex-shrink:1;text-align:left;overflow:hidden;perspective:1000px}.smv-selectors-box .smv-selectors .smv-ss .smv-scroll{display:inline-flex!important;position:relative!important;top:0!important;left:0!important;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;transform-style:preserve-3d!important;-webkit-backface-visibility:hidden!important;backface-visibility:hidden!important}.smv-selectors-box.smv-grid .smv-selectors .smv-ss .smv-scroll{flex-wrap:wrap;align-content:center}.smv-selectors-box.smv-v .smv-selectors .smv-ss .smv-scroll{flex-direction:column}.smv-selectors-box.smv-grid .smv-selectors .smv-ss .smv-scroll,.smv-selectors-box.smv-h .smv-selectors .smv-ss .smv-scroll{flex-direction:row}.smv-selectors-box .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail{display:inline-block;position:relative}.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail{text-align:center}.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail:not([data-type]),.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail[data-type=image],.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail[data-type=spin],.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail[data-type=video],.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail[data-type=vimeo],.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail[data-type=youtube],.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail[data-type=zoom]{font-size:0}.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail:not([data-type]),.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail[data-type=html]{line-height:normal}.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item[data-selector-type=square] smv-thumbnail[data-type=image],.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item[data-selector-type=square] smv-thumbnail[data-type=spin],.smv-selectors-box.smv-thumbnails .smv-selectors .smv-ss .smv-scroll .smv-item[data-selector-type=square] smv-thumbnail[data-type=zoom]{text-align:left}.smv-selectors-box.smv-thumbnails.smv-h .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail img{width:auto;max-width:none!important;margin:0;padding:0}.smv-selectors-box.smv-v .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail{display:inline-block!important}.smv-selectors-box.smv-v .smv-selectors .smv-ss .smv-scroll .smv-item smv-thumbnail:not([data-type=html]){white-space:nowrap}.smv-selectors-box.smv-grid .smv-selectors .smv-ss .smv-scroll .smv-item{width:auto;height:auto}.smv-selectors-box.smv-h .smv-selectors .smv-ss .smv-scroll{height:100%}.smv-selectors-box.smv-v .smv-selectors .smv-ss .smv-scroll{width:100%}.smv-selectors-box.smv-thumbnails .smv-item smv-thumbnail .smv-thumbnail-placeholder{background-color:#e8e8e8}.smv-selectors-box.smv-thumbnails .smv-item smv-thumbnail>img{display:inline-block!important;position:relative!important}.smv-selectors-box.smv-thumbnails .smv-item[data-selector-type=crop] smv-thumbnail img[data-image-orientation=horizontal],.smv-selectors-box.smv-thumbnails .smv-item[data-selector-type=crop] smv-thumbnail img[data-image-orientation=vertical],.smv-selectors-box.smv-thumbnails .smv-item[data-selector-type=square] smv-thumbnail img[data-image-orientation=horizontal],.smv-selectors-box.smv-thumbnails .smv-item[data-selector-type=square] smv-thumbnail img[data-image-orientation=vertical]{position:absolute;top:50%;left:50%;transform:translate3d(-50%,-50%,0)}.smv-selectors-box.smv-thumbnails .smv-item[data-selector-type=square] smv-thumbnail img[data-image-orientation=horizontal]{height:auto}.smv-selectors-box.smv-thumbnails .smv-item[data-selector-type=crop] smv-thumbnail img[data-image-orientation=horizontal]{width:auto}.smv-selectors-box.smv-thumbnails .smv-item[data-selector-type=square] smv-thumbnail img[data-image-orientation=vertical]{width:auto}.smv-selectors-box.smv-thumbnails .smv-item[data-selector-type=crop] smv-thumbnail img[data-image-orientation=vertical]{height:auto}.smv-selectors-box.smv-v.smv-thumbnails .smv-item{line-height:1}.smv-selectors-box.smv-thumbnails .smv-item{box-sizing:border-box}.smv-selectors-box.smv-thumbnails.smv-h .smv-item{padding:2px 4px 2px 0}.smv-selectors-box.smv-thumbnails.smv-v .smv-item{padding:0 1px 4px}.smv-selectors-box.smv-thumbnails.smv-h .smv-item:first-child{padding-left:0}.smv-selectors-box.smv-thumbnails.smv-v .smv-item:first-child{padding-top:0}.smv-selectors-box.smv-thumbnails.smv-h .smv-item:last-child{padding-right:0}.smv-selectors-box.smv-thumbnails.smv-v .smv-item:last-child{padding-bottom:0}.smv-selectors-box smv-thumbnail{cursor:pointer}.smv-selectors-box smv-thumbnail smv-thumbnail{display:inline-block}.smv-thumbnails .smv-item smv-thumbnail{padding:2px;border:1px solid transparent;box-sizing:border-box}.smv-thumbnails .smv-item.smv-active smv-thumbnail{border-color:#373a3c}.smv-bullets .smv-selectors{align-items:center}.smv-bullets.smv-v .smv-selectors{justify-content:center}.smv-bullets.smv-v .smv-selectors-scroll-container{flex-direction:column}.smv-bullets.smv-h .smv-selectors{justify-content:center}.smv-bullets.smv-h .smv-selectors-scroll-container{flex-direction:row}.smv-bullets .smv-item{width:20px;height:20px}.smv-bullets .smv-item smv-thumbnail{display:inline-block!important;position:absolute!important;top:0!important;right:0!important;bottom:0!important;left:0!important;width:8px;height:8px;margin:auto!important;transition:transform .2s cubic-bezier(.17,.67,.41,1.87);border-radius:50%!important;background-color:#999;box-shadow:0 0 0 1px #999}.smv-bullets .smv-item smv-thumbnail::after{position:absolute;top:50%;left:50%;width:100%;height:100%;transform:translate3d(-50%,-50%,0);transition:background-color .2s linear;border-radius:50%;content:\'\'}.smv-bullets .smv-item.smv-active smv-thumbnail::after{background-color:#fff}.smv .smv-selectors-toggle-switch{display:none;position:absolute;margin:0;padding:0;transition:opacity .2s linear;outline:0;background-color:transparent;cursor:pointer;opacity:.9999;z-index:42}.smv-fullscreen-box .smv.smv-autohide .smv-selectors-toggle-switch{display:inline-block}.smv-autohide .smv-selectors-toggle-switch::after,.smv-autohide .smv-selectors-toggle-switch::before{display:inline-block;position:absolute;background-color:#999;content:\'\'}.smv-autohide .smv-h .smv-selectors-toggle-switch::after,.smv-autohide .smv-h .smv-selectors-toggle-switch::before{top:50%;width:40%;height:4px;transition:transform .2s linear,top .2s linear}.smv-autohide .smv-v .smv-selectors-toggle-switch::after,.smv-autohide .smv-v .smv-selectors-toggle-switch::before{left:50%;width:4px;height:40%;transition:transform .2s linear,left .2s linear}.smv-autohide .smv-h .smv-selectors-toggle-switch{left:50%;width:100px;height:40px;transform:translateX(-50%)}.smv-autohide .smv-v .smv-selectors-toggle-switch{top:50%;width:40px;height:100px;transform:translateY(-50%)}.smv-autohide.smv-selectors-top .smv-selectors-toggle-switch{top:100%}.smv-autohide.smv-selectors-left .smv-selectors-toggle-switch{left:100%}.smv-autohide.smv-selectors-right .smv-selectors-toggle-switch{right:100%}.smv-autohide.smv-selectors-bottom .smv-selectors-toggle-switch{bottom:100%}.smv-autohide .smv-h .smv-selectors-toggle-switch:before{left:50%;transform:translateY(-100%) rotateZ(0);transform-origin:left;border-top-left-radius:2px;border-bottom-left-radius:2px}.smv-autohide .smv-h .smv-selectors-toggle-switch:after{right:50%;transform:translateY(100%) rotateZ(0);transform-origin:right;border-top-right-radius:2px;border-bottom-right-radius:2px}.smv-autohide .smv-v .smv-selectors-toggle-switch:before{top:50%;transform:translateY(-100%) rotateZ(0);transform-origin:top;border-top-left-radius:2px;border-top-right-radius:2px}.smv-autohide .smv-v .smv-selectors-toggle-switch:after{bottom:50%;transform:translateY(100%) rotateZ(0);transform-origin:bottom;border-bottom-left-radius:2px;border-bottom-right-radius:2px}.smv-autohide.smv-selectors-bottom .smv-selectors-toggle-switch::before,.smv-autohide.smv-selectors-top.smv-selectors-closed .smv-selectors-toggle-switch::before{transform:translateX(-90%) rotateZ(20deg);border-radius:2px}.smv-autohide.smv-selectors-bottom .smv-selectors-toggle-switch::after,.smv-autohide.smv-selectors-top.smv-selectors-closed .smv-selectors-toggle-switch::after{transform:translateX(90%) rotateZ(-20deg);border-radius:2px}.smv-autohide.smv-selectors-bottom.smv-selectors-closed .smv-selectors-toggle-switch::before,.smv-autohide.smv-selectors-top .smv-selectors-toggle-switch::before{transform:translateX(-90%) rotateZ(-20deg);border-radius:2px}.smv-autohide.smv-selectors-bottom.smv-selectors-closed .smv-selectors-toggle-switch::after,.smv-autohide.smv-selectors-top .smv-selectors-toggle-switch::after{transform:translateX(90%) rotateZ(20deg);border-radius:2px}.smv-autohide.smv-selectors-left .smv-selectors-toggle-switch::before,.smv-autohide.smv-selectors-right.smv-selectors-closed .smv-selectors-toggle-switch::before{transform:translateY(-90%) rotateZ(20deg);border-radius:2px}.smv-autohide.smv-selectors-left .smv-selectors-toggle-switch::after,.smv-autohide.smv-selectors-right.smv-selectors-closed .smv-selectors-toggle-switch::after{transform:translateY(90%) rotateZ(-20deg);border-radius:2px}.smv-autohide.smv-selectors-left.smv-selectors-closed .smv-selectors-toggle-switch::before,.smv-autohide.smv-selectors-right .smv-selectors-toggle-switch::before{transform:translateY(-90%) rotateZ(-20deg);border-radius:2px}.smv-autohide.smv-selectors-left.smv-selectors-closed .smv-selectors-toggle-switch::after,.smv-autohide.smv-selectors-right .smv-selectors-toggle-switch::after{transform:translateY(90%) rotateZ(20deg);border-radius:2px}.smv-thumbnails .smv-item .smv-selector.smv-thumbnail-placeholder::after,.smv-thumbnails .smv-item .smv-selector.smv-thumbnail-placeholder::before{display:none}.smv-thumbnails smv-thumbnail[data-type=spin]::before,.smv-thumbnails smv-thumbnail[data-type=video]::before,.smv-thumbnails smv-thumbnail[data-type=vimeo]::before,.smv-thumbnails smv-thumbnail[data-type=youtube]::before{position:absolute;top:2px;right:2px;bottom:2px;left:2px;margin:auto;border-radius:0;background:no-repeat center/auto 85% rgba(55,58,60,.7);content:\'\';z-index:1}.smv-thumbnails smv-thumbnail[data-type=spin]::before{background-image:url("data:image/svg+xml,%3Csvg viewBox=\'0 0 48 48\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M35.8149 18.5697c.1631.3545.3111.7175.4424 1.0883 1.3982.2431 2.6883.5262 3.8482.8425 2.0478.5585 3.6328 1.2057 4.6821 1.8824 1.0942.7056 1.3611 1.2749 1.3611 1.617 0 .3421-.2669.9114-1.3611 1.6169-1.0493.6768-2.6343 1.324-4.6821 1.8825-1.1599.3163-2.45.5993-3.8482.8425-.1313.3707-.279.7336-.4421 1.0881 6.7861-1.1006 11.3335-3.1205 11.3335-5.43 0-2.3096-4.5476-4.3296-11.3338-5.4302zm-6.3847 17.2452c-.3545.1632-.7173.311-1.0882.4423-.2431 1.3981-.5261 2.6881-.8425 3.848-.5583 2.0479-1.2056 3.6327-1.8823 4.6822-.7056 1.0942-1.2749 1.361-1.617 1.361-.342 0-.9113-.2668-1.6169-1.361-.6768-1.0495-1.324-2.6343-1.8823-4.6822-.3164-1.1598-.5994-2.4498-.8426-3.8478-.3708-.1313-.7338-.279-1.0883-.4422 1.1006 6.786 3.1203 11.3332 5.4301 11.3332 2.3096 0 4.3294-4.5473 5.43-11.3335zM31.6505 28.4122l-7.5169 4.6786-7.8897-5.4306v-7.7678l7.9045-4.7363 7.6204 4.7418-.1183 8.5143zm-.751-.3813l.1008-7.255-6.4777 4.2992V32l6.3769-3.9691zm-7.1331 3.9298v-6.8816l-6.7663-4.3242v6.5485l6.7663 4.6573zm-6.4601-11.8659l6.8341 4.3676 6.5808-4.3677-6.5806-4.0948-6.8343 4.0949z\' fill=\'%23fff\'/%3E%3Cpath d=\'M25.6172 3.21252c-.7056-1.09423-1.2749-1.36108-1.617-1.36108-.342 0-.9113.26685-1.6169 1.36108-.6768 1.04944-1.324 2.63428-1.8823 4.68201-.3164 1.15991-.5994 2.45007-.8426 3.84817a12.9205 12.9205 0 00-1.0883.4421C19.6707 5.3988 21.6904.85144 24.0002.85144c2.0519 0 3.8751 3.58915 5.0283 9.14856H30a.50008.50008 0 01.4253.2371.49995.49995 0 01.0219.4865l-1.5 3a.49916.49916 0 01-.1843.2017A.4993.4993 0 0128.5 14a.49896.49896 0 01-.2628-.0747.4994.4994 0 01-.1844-.2017l-1.5-3a.50039.50039 0 01-.0523-.2461.50103.50103 0 01.0742-.2404A.49998.49998 0 0127 10h1.0066c-.1574-.74137-.3268-1.44458-.5071-2.10547-.5583-2.04773-1.2056-3.63257-1.8823-4.68201zM12.1848 29.4299c-.1638-.3559-.3113-.719-.4421-1.0882-1.398-.2431-2.68801-.5261-3.84792-.8424-2.04761-.5585-3.63257-1.2057-4.68213-1.8825-1.09424-.7055-1.36109-1.2748-1.36109-1.6169 0-.3421.26685-.9114 1.36109-1.617 1.04956-.6767 2.63452-1.3239 4.68213-1.8824.5105-.1392 1.0462-.272 1.60522-.3977v1.0003c0 .0852.02179.1691.06329.2435a.5002.5002 0 00.41423.256.50036.50036 0 00.24608-.0523l3-1.5a.49916.49916 0 00.2017-.1843.4993.4993 0 00.0747-.2629.49896.49896 0 00-.0747-.2628.4994.4994 0 00-.2017-.1844l-3-1.5a.50036.50036 0 00-.24608-.0523.5002.5002 0 00-.41423.256.50035.50035 0 00-.06329.2435v.9753C4.22636 20.2356.85156 22.0102.85156 23.9999c0 2.3095 4.54712 4.3294 11.33324 5.43z\' fill=\'%23fff\'/%3E%3C/svg%3E")}.smv-thumbnails smv-thumbnail.spin-thumbnail-gif[data-type=spin]::before{display:none}.smv-thumbnails smv-thumbnail[data-type=video]::before,.smv-thumbnails smv-thumbnail[data-type=vimeo]::before,.smv-thumbnails smv-thumbnail[data-type=youtube]::before{background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 48 48\'%3E%3Cpath fill=\'%23fff\' d=\'M37.25 23.57a.5.5 0 010 .86l-21 12.13a.5.5 0 01-.75-.44V11.88a.5.5 0 01.75-.44z\'/%3E%3C/svg%3E");background-size:auto 65%}.smv-thumbnails smv-thumbnail.smv-custom-thumbnail[data-type=spin]::before,.smv-thumbnails smv-thumbnail.smv-custom-thumbnail[data-type=video]::before{display:none}.smv-selectors-box .smv-selectors .smv-ss .smv-scroll .smv-item[disabled]{display:none!important}.smv-selectors-box.smv-hide-selectors{display:none!important}.smv div.smv-button{box-shadow:none}.smv-arrow-control{display:inline-block!important;position:absolute;z-index:42!important;pointer-events:none}.smv-arrow-control.smv-hidden{display:none!important;visibility:hidden!important}.smv-h .smv-arrow-control-prev,.smv-v .smv-arrow-control-prev{order:-1}.smv-h .smv-arrow-control-next,.smv-v .smv-arrow-control-next{order:1}.smv-h .smv-arrow-control{top:0;width:60px;height:100%}.smv-h .smv-arrow-control-prev{left:0}.smv-h .smv-arrow-control-next{right:0}.smv-v .smv-arrow-control{left:0;width:100%;height:60px}.smv-v .smv-arrow-control-prev{top:0}.smv-v .smv-arrow-control-next{bottom:0}.smv-arrow{display:flex!important;position:absolute!important;top:0!important;right:0!important;bottom:0!important;left:0!important;align-items:center!important;justify-content:center!important;width:100%;height:100%;margin:auto!important;padding:0!important;border:0!important;outline:0!important;background-color:transparent!important;cursor:pointer!important;pointer-events:auto}.smv-arrow::-moz-focus-inner{border:0}.smv-arrow .smv-icon{display:inline-block!important;position:relative!important;top:0!important;left:0!important;width:100%!important;height:100%!important;transition:opacity .2s linear!important;background-position:center;background-image:url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xOC43NTkzIDkuMzQ5MjFDMTguMzk5OCA4LjkyOTg4IDE3Ljc2ODUgOC44ODEzMiAxNy4zNDkyIDkuMjQwNzRDMTYuOTI5OSA5LjYwMDE3IDE2Ljg4MTMgMTAuMjMxNSAxNy4yNDA3IDEwLjY1MDhMMTguNzU5MyA5LjM0OTIxWk0zMCAyNEwzMC43NTkzIDI0LjY1MDhDMzEuMDgwMiAyNC4yNzYzIDMxLjA4MDIgMjMuNzIzNyAzMC43NTkzIDIzLjM0OTJMMzAgMjRaTTE3LjI0MDcgMzcuMzQ5MkMxNi44ODEzIDM3Ljc2ODUgMTYuOTI5OSAzOC4zOTk4IDE3LjM0OTIgMzguNzU5M0MxNy43Njg1IDM5LjExODcgMTguMzk5OCAzOS4wNzAxIDE4Ljc1OTMgMzguNjUwOEwxNy4yNDA3IDM3LjM0OTJaTTE3LjI0MDcgMTAuNjUwOEwyOS4yNDA3IDI0LjY1MDhMMzAuNzU5MyAyMy4zNDkyTDE4Ljc1OTMgOS4zNDkyMUwxNy4yNDA3IDEwLjY1MDhaTTI5LjI0MDcgMjMuMzQ5MkwxNy4yNDA3IDM3LjM0OTJMMTguNzU5MyAzOC42NTA4TDMwLjc1OTMgMjQuNjUwOEwyOS4yNDA3IDIzLjM0OTJaIiBmaWxsPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo=);background-repeat:no-repeat;background-size:cover;opacity:.000001}@supports ((-webkit-mask-image:url()) or (mask-image:url())) and ((-webkit-mask-repeat:no-repeat) or (mask-repeat:no-repeat)) and ((-webkit-mask-position:center) or (mask-position:center)) and ((-webkit-mask-size:cover) or (mask-size:cover)){.smv-arrow-control .smv-arrow .smv-icon{-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xOC43NTkzIDkuMzQ5MjFDMTguMzk5OCA4LjkyOTg4IDE3Ljc2ODUgOC44ODEzMiAxNy4zNDkyIDkuMjQwNzRDMTYuOTI5OSA5LjYwMDE3IDE2Ljg4MTMgMTAuMjMxNSAxNy4yNDA3IDEwLjY1MDhMMTguNzU5MyA5LjM0OTIxWk0zMCAyNEwzMC43NTkzIDI0LjY1MDhDMzEuMDgwMiAyNC4yNzYzIDMxLjA4MDIgMjMuNzIzNyAzMC43NTkzIDIzLjM0OTJMMzAgMjRaTTE3LjI0MDcgMzcuMzQ5MkMxNi44ODEzIDM3Ljc2ODUgMTYuOTI5OSAzOC4zOTk4IDE3LjM0OTIgMzguNzU5M0MxNy43Njg1IDM5LjExODcgMTguMzk5OCAzOS4wNzAxIDE4Ljc1OTMgMzguNjUwOEwxNy4yNDA3IDM3LjM0OTJaTTE3LjI0MDcgMTAuNjUwOEwyOS4yNDA3IDI0LjY1MDhMMzAuNzU5MyAyMy4zNDkyTDE4Ljc1OTMgOS4zNDkyMUwxNy4yNDA3IDEwLjY1MDhaTTI5LjI0MDcgMjMuMzQ5MkwxNy4yNDA3IDM3LjM0OTJMMTguNzU5MyAzOC42NTA4TDMwLjc1OTMgMjQuNjUwOEwyOS4yNDA3IDIzLjM0OTJaIiBmaWxsPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo=);mask-image:url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xOC43NTkzIDkuMzQ5MjFDMTguMzk5OCA4LjkyOTg4IDE3Ljc2ODUgOC44ODEzMiAxNy4zNDkyIDkuMjQwNzRDMTYuOTI5OSA5LjYwMDE3IDE2Ljg4MTMgMTAuMjMxNSAxNy4yNDA3IDEwLjY1MDhMMTguNzU5MyA5LjM0OTIxWk0zMCAyNEwzMC43NTkzIDI0LjY1MDhDMzEuMDgwMiAyNC4yNzYzIDMxLjA4MDIgMjMuNzIzNyAzMC43NTkzIDIzLjM0OTJMMzAgMjRaTTE3LjI0MDcgMzcuMzQ5MkMxNi44ODEzIDM3Ljc2ODUgMTYuOTI5OSAzOC4zOTk4IDE3LjM0OTIgMzguNzU5M0MxNy43Njg1IDM5LjExODcgMTguMzk5OCAzOS4wNzAxIDE4Ljc1OTMgMzguNjUwOEwxNy4yNDA3IDM3LjM0OTJaTTE3LjI0MDcgMTAuNjUwOEwyOS4yNDA3IDI0LjY1MDhMMzAuNzU5MyAyMy4zNDkyTDE4Ljc1OTMgOS4zNDkyMUwxNy4yNDA3IDEwLjY1MDhaTTI5LjI0MDcgMjMuMzQ5MkwxNy4yNDA3IDM3LjM0OTJMMTguNzU5MyAzOC42NTA4TDMwLjc1OTMgMjQuNjUwOEwyOS4yNDA3IDIzLjM0OTJaIiBmaWxsPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo=);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:cover;mask-size:cover;background-color:#999;background-image:none}}.smv-fullscreen-box .smv-slides-box .smv-arrow .smv-icon,.smv-slides-box:hover .smv-arrow .smv-icon{opacity:.4}.smv.smv-mobile .smv-arrow .smv-icon{opacity:.999999!important}.smv-h .smv-arrow .smv-icon{max-width:100%;max-height:70%}.smv-v .smv-arrow .smv-icon{max-width:70%;max-height:100%}.smv-selectors-box:hover .smv-arrow:hover .smv-icon,.smv-slides-box:hover .smv-arrow:hover .smv-icon{opacity:.999999}.mobile-magic .smv-slides-box .smv-arrow[disabled] .smv-icon{opacity:.2!important}.smv-selectors-box .smv-arrow[disabled] .smv-icon,.smv-selectors-box .smv-arrow[disabled]:hover .smv-icon,.smv-slides-box:hover .smv-arrow[disabled] .smv-icon,.smv-slides-box:hover .smv-arrow[disabled]:hover .smv-icon{opacity:.2!important}.smv-h .smv-arrow-prev .smv-icon{transform:rotateZ(180deg)!important}.smv-v .smv-arrow-prev .smv-icon{transform:rotateZ(-90deg)!important}.smv-v .smv-arrow-next .smv-icon{transform:rotateZ(90deg)!important}.smv-h .smv-arrow{width:44px;height:91px}.smv-v .smv-arrow{width:91px;height:44px}.smv-h .smv-selectors .smv-arrow{width:22px;height:45px}.smv-v .smv-selectors .smv-arrow{width:45px;height:22px}.smv-selectors-box .smv-arrow .smv-icon{opacity:.999999}.smv-selectors-box .smv-selectors .smv-arrow-control{position:relative;flex-grow:0;flex-shrink:0}.smv-h .smv-selectors .smv-arrow-control{align-self:stretch;width:35px;height:auto}.smv-v .smv-selectors .smv-arrow-control{align-self:stretch;width:auto;height:35px}.smv-fullscreen-box .smv.smv-autohide.smv-selectors-left .smv-h .smv-arrow-control-prev{left:110px;transition:left .3s linear}.smv-fullscreen-box .smv.smv-autohide.smv-selectors-left.smv-selectors-closed .smv-h .smv-arrow-control-prev{left:40px}.smv-fullscreen-box .smv.smv-autohide.smv-selectors-right .smv-h .smv-arrow-control-next{right:110px;transition:right .3s linear}.smv-fullscreen-box .smv.smv-autohide.smv-selectors-right.smv-selectors-closed .smv-h .smv-arrow-control-next{right:40px}.smv-fullscreen-box .smv.smv-autohide.smv-selectors-top .smv-v .smv-arrow-control-prev{top:110px;transition:top .3s linear}.smv-fullscreen-box .smv.smv-autohide.smv-selectors-top.smv-selectors-closed .smv-v .smv-arrow-control-prev{top:40px}.smv-fullscreen-box .smv.smv-autohide.smv-selectors-bottom .smv-v .smv-arrow-control-next{bottom:110px;transition:bottom .3s linear}.smv-fullscreen-box .smv.smv-autohide.smv-selectors-bottom.smv-selectors-closed .smv-v .smv-arrow-control-next{bottom:40px}.smv .smv-button-fullscreen{position:absolute;top:0;right:0;width:60px;height:60px;margin:0;padding:12px;transition:opacity .2s linear;border:0;outline:0;background-color:transparent;font-size:0;line-height:100%;cursor:pointer;opacity:.999999;z-index:84;box-sizing:border-box}.smv .smv-button-fullscreen::-moz-focus-inner{border:0}.smv:hover .smv-button-fullscreen:hover{opacity:.999999}.smv.smv-mobile .smv-button-fullscreen{opacity:.999999!important}.smv .smv-button-fullscreen.smv-button-hidden{opacity:0!important;pointer-events:none}.smv .smv-button-fullscreen .smv-icon{position:relative;top:0;left:0;width:100%;height:100%;background-position:center;background-repeat:no-repeat;background-size:cover}.smv .smv-button-fullscreen-close{padding:8px;opacity:.999999}.smv-button-fullscreen-open .smv-icon{background-image:url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xNC4zOTMyIDQ2QzExLjgwNjkgNDQuODY5MSA5LjQ1ODUyIDQzLjI5NTUgNy40NDM2OSA0MS4zNzVMMTUuOTM0IDMyLjg4NUMxNS40Mzk4IDMyLjQzNiAxNC45ODMyIDMxLjk0NjQgMTQuNTY5NSAzMS40MjE1TDYuMDU0MzggMzkuOTM2NEM0LjM5MTQ5IDM4LjA2NTIgMy4wMTY4MiAzNS45MzIxIDIgMzMuNjA2OFY0NUMyIDQ1LjU1MjMgMi40NDc3MiA0NiAzIDQ2SDE0LjM5MzJaIiBmaWxsPSIjOTk5OTk5Ii8+CjxwYXRoIGQ9Ik0xNC42NSAxNi40Nzc2TDYuMTM5OTcgNy45Njc4NkM0LjQzODYzIDkuODYxOTIgMy4wMzQyMiAxMi4wMjgxIDIgMTQuMzkzMlYzQzIgMi40NDc3MiAyLjQ0NzcyIDIgMyAySDE0LjM5MzJDMTEuODQ2NyAzLjExMzU1IDkuNTMwNzQgNC42NTYyOCA3LjUzNjggNi41MzY3MkwxNi4wMjk2IDE1LjAyOTJDMTUuNTMwNyAxNS40NzI4IDE1LjA2OTEgMTUuOTU3MyAxNC42NSAxNi40Nzc2WiIgZmlsbD0iIzk5OTk5OSIvPgo8cGF0aCBkPSJNMzEuNDIxOCAxNC41Njk4QzMxLjk0NjggMTQuOTgzNSAzMi40MzYzIDE1LjQ0MDEgMzIuODg1MiAxNS45MzQzTDQxLjM3NTYgNy40NDQyOUM0My4yOTU4IDkuNDU4OTkgNDQuODY5MiAxMS44MDcyIDQ2IDE0LjM5MzJWM0M0NiAyLjQ0NzcyIDQ1LjU1MjMgMiA0NSAySDMzLjYwNjhDMzUuOTMyNCAzLjAxNjk0IDM4LjA2NTYgNC4zOTE3OSAzOS45MzcgNi4wNTQ5M0wzMS40MjE4IDE0LjU2OThaIiBmaWxsPSIjOTk5OTk5Ii8+CjxwYXRoIGQ9Ik0zMi45NzExIDMxLjk3MDFDMzIuNTI3NSAzMi40NjkgMzIuMDQzIDMyLjkzMDcgMzEuNTIyOCAzMy4zNDk4TDQwLjAzMjggNDEuODU5NUMzOC4xMzg1IDQzLjU2MTEgMzUuOTcyMSA0NC45NjU3IDMzLjYwNjggNDZINDVDNDUuNTUyMyA0NiA0NiA0NS41NTIzIDQ2IDQ1VjMzLjYwNjhDNDQuODg2NiAzNi4xNTMxIDQzLjM0NCAzOC40Njg4IDQxLjQ2MzggNDAuNDYyNkwzMi45NzExIDMxLjk3MDFaIiBmaWxsPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo=)}.smv-button-fullscreen-close .smv-icon{background-image:url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNS4zODQxIDI0LjcyNDFDMjQuOTkzNyAyNC4zMzM0IDI0Ljk5MzkgMjMuNzAwMiAyNS4zODQ3IDIzLjMwOThMMzcgMTEuNzA1MUwzNi4yOTQzIDExTDI0LjY3OTMgMjIuNjA0NEMyNC4yODg2IDIyLjk5NDcgMjMuNjU1NiAyMi45OTQ0IDIzLjI2NTIgMjIuNjAzOEwxMS43MDUyIDExLjAzNjZMMTEgMTEuNzQyMkwyMi41NTkzIDIzLjMwODdDMjIuOTQ5NyAyMy42OTk0IDIyLjk0OTUgMjQuMzMyNiAyMi41NTg4IDI0LjcyM0wxMS4wMzcgMzYuMjM0MkwxMS43NDI3IDM2LjkzOTNMMjMuMjY0MSAyNS40Mjg0QzIzLjY1NDggMjUuMDM4MSAyNC4yODc5IDI1LjAzODMgMjQuNjc4MiAyNS40Mjg5TDM2LjI0MjEgMzdMMzYuOTQ3MiAzNi4yOTQ0TDI1LjM4NDEgMjQuNzI0MVoiIGZpbGw9IiM5OTk5OTkiLz4KPHBhdGggZD0iTTI1LjM4NDEgMjQuNzI0MUMyNC45OTM3IDI0LjMzMzQgMjQuOTkzOSAyMy43MDAyIDI1LjM4NDcgMjMuMzA5OEwzNyAxMS43MDUxTDM2LjI5NDMgMTFMMjQuNjc5MyAyMi42MDQ0QzI0LjI4ODYgMjIuOTk0NyAyMy42NTU2IDIyLjk5NDQgMjMuMjY1MiAyMi42MDM4TDExLjcwNTIgMTEuMDM2NkwxMSAxMS43NDIyTDIyLjU1OTMgMjMuMzA4N0MyMi45NDk3IDIzLjY5OTQgMjIuOTQ5NSAyNC4zMzI2IDIyLjU1ODggMjQuNzIzTDExLjAzNyAzNi4yMzQyTDExLjc0MjcgMzYuOTM5M0wyMy4yNjQxIDI1LjQyODRDMjMuNjU0OCAyNS4wMzgxIDI0LjI4NzkgMjUuMDM4MyAyNC42NzgyIDI1LjQyODlMMzYuMjQyMSAzN0wzNi45NDcyIDM2LjI5NDRMMjUuMzg0MSAyNC43MjQxWiIgc3Ryb2tlPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo=)}@supports ((-webkit-mask-image:url()) or (mask-image:url())) and ((-webkit-mask-repeat:no-repeat) or (mask-repeat:no-repeat)) and ((-webkit-mask-position:center) or (mask-position:center)) and ((-webkit-mask-size:cover) or (mask-size:cover)){.smv-button-fullscreen-open .smv-icon{background-color:#999;background-image:none;-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xNC4zOTMyIDQ2QzExLjgwNjkgNDQuODY5MSA5LjQ1ODUyIDQzLjI5NTUgNy40NDM2OSA0MS4zNzVMMTUuOTM0IDMyLjg4NUMxNS40Mzk4IDMyLjQzNiAxNC45ODMyIDMxLjk0NjQgMTQuNTY5NSAzMS40MjE1TDYuMDU0MzggMzkuOTM2NEM0LjM5MTQ5IDM4LjA2NTIgMy4wMTY4MiAzNS45MzIxIDIgMzMuNjA2OFY0NUMyIDQ1LjU1MjMgMi40NDc3MiA0NiAzIDQ2SDE0LjM5MzJaIiBmaWxsPSIjOTk5OTk5Ii8+CjxwYXRoIGQ9Ik0xNC42NSAxNi40Nzc2TDYuMTM5OTcgNy45Njc4NkM0LjQzODYzIDkuODYxOTIgMy4wMzQyMiAxMi4wMjgxIDIgMTQuMzkzMlYzQzIgMi40NDc3MiAyLjQ0NzcyIDIgMyAySDE0LjM5MzJDMTEuODQ2NyAzLjExMzU1IDkuNTMwNzQgNC42NTYyOCA3LjUzNjggNi41MzY3MkwxNi4wMjk2IDE1LjAyOTJDMTUuNTMwNyAxNS40NzI4IDE1LjA2OTEgMTUuOTU3MyAxNC42NSAxNi40Nzc2WiIgZmlsbD0iIzk5OTk5OSIvPgo8cGF0aCBkPSJNMzEuNDIxOCAxNC41Njk4QzMxLjk0NjggMTQuOTgzNSAzMi40MzYzIDE1LjQ0MDEgMzIuODg1MiAxNS45MzQzTDQxLjM3NTYgNy40NDQyOUM0My4yOTU4IDkuNDU4OTkgNDQuODY5MiAxMS44MDcyIDQ2IDE0LjM5MzJWM0M0NiAyLjQ0NzcyIDQ1LjU1MjMgMiA0NSAySDMzLjYwNjhDMzUuOTMyNCAzLjAxNjk0IDM4LjA2NTYgNC4zOTE3OSAzOS45MzcgNi4wNTQ5M0wzMS40MjE4IDE0LjU2OThaIiBmaWxsPSIjOTk5OTk5Ii8+CjxwYXRoIGQ9Ik0zMi45NzExIDMxLjk3MDFDMzIuNTI3NSAzMi40NjkgMzIuMDQzIDMyLjkzMDcgMzEuNTIyOCAzMy4zNDk4TDQwLjAzMjggNDEuODU5NUMzOC4xMzg1IDQzLjU2MTEgMzUuOTcyMSA0NC45NjU3IDMzLjYwNjggNDZINDVDNDUuNTUyMyA0NiA0NiA0NS41NTIzIDQ2IDQ1VjMzLjYwNjhDNDQuODg2NiAzNi4xNTMxIDQzLjM0NCAzOC40Njg4IDQxLjQ2MzggNDAuNDYyNkwzMi45NzExIDMxLjk3MDFaIiBmaWxsPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo=);mask-image:url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xNC4zOTMyIDQ2QzExLjgwNjkgNDQuODY5MSA5LjQ1ODUyIDQzLjI5NTUgNy40NDM2OSA0MS4zNzVMMTUuOTM0IDMyLjg4NUMxNS40Mzk4IDMyLjQzNiAxNC45ODMyIDMxLjk0NjQgMTQuNTY5NSAzMS40MjE1TDYuMDU0MzggMzkuOTM2NEM0LjM5MTQ5IDM4LjA2NTIgMy4wMTY4MiAzNS45MzIxIDIgMzMuNjA2OFY0NUMyIDQ1LjU1MjMgMi40NDc3MiA0NiAzIDQ2SDE0LjM5MzJaIiBmaWxsPSIjOTk5OTk5Ii8+CjxwYXRoIGQ9Ik0xNC42NSAxNi40Nzc2TDYuMTM5OTcgNy45Njc4NkM0LjQzODYzIDkuODYxOTIgMy4wMzQyMiAxMi4wMjgxIDIgMTQuMzkzMlYzQzIgMi40NDc3MiAyLjQ0NzcyIDIgMyAySDE0LjM5MzJDMTEuODQ2NyAzLjExMzU1IDkuNTMwNzQgNC42NTYyOCA3LjUzNjggNi41MzY3MkwxNi4wMjk2IDE1LjAyOTJDMTUuNTMwNyAxNS40NzI4IDE1LjA2OTEgMTUuOTU3MyAxNC42NSAxNi40Nzc2WiIgZmlsbD0iIzk5OTk5OSIvPgo8cGF0aCBkPSJNMzEuNDIxOCAxNC41Njk4QzMxLjk0NjggMTQuOTgzNSAzMi40MzYzIDE1LjQ0MDEgMzIuODg1MiAxNS45MzQzTDQxLjM3NTYgNy40NDQyOUM0My4yOTU4IDkuNDU4OTkgNDQuODY5MiAxMS44MDcyIDQ2IDE0LjM5MzJWM0M0NiAyLjQ0NzcyIDQ1LjU1MjMgMiA0NSAySDMzLjYwNjhDMzUuOTMyNCAzLjAxNjk0IDM4LjA2NTYgNC4zOTE3OSAzOS45MzcgNi4wNTQ5M0wzMS40MjE4IDE0LjU2OThaIiBmaWxsPSIjOTk5OTk5Ii8+CjxwYXRoIGQ9Ik0zMi45NzExIDMxLjk3MDFDMzIuNTI3NSAzMi40NjkgMzIuMDQzIDMyLjkzMDcgMzEuNTIyOCAzMy4zNDk4TDQwLjAzMjggNDEuODU5NUMzOC4xMzg1IDQzLjU2MTEgMzUuOTcyMSA0NC45NjU3IDMzLjYwNjggNDZINDVDNDUuNTUyMyA0NiA0NiA0NS41NTIzIDQ2IDQ1VjMzLjYwNjhDNDQuODg2NiAzNi4xNTMxIDQzLjM0NCAzOC40Njg4IDQxLjQ2MzggNDAuNDYyNkwzMi45NzExIDMxLjk3MDFaIiBmaWxsPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo=);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:cover;mask-size:cover}.smv-button-fullscreen-close .smv-icon{background-color:#999;background-image:none;-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNS4zODQxIDI0LjcyNDFDMjQuOTkzNyAyNC4zMzM0IDI0Ljk5MzkgMjMuNzAwMiAyNS4zODQ3IDIzLjMwOThMMzcgMTEuNzA1MUwzNi4yOTQzIDExTDI0LjY3OTMgMjIuNjA0NEMyNC4yODg2IDIyLjk5NDcgMjMuNjU1NiAyMi45OTQ0IDIzLjI2NTIgMjIuNjAzOEwxMS43MDUyIDExLjAzNjZMMTEgMTEuNzQyMkwyMi41NTkzIDIzLjMwODdDMjIuOTQ5NyAyMy42OTk0IDIyLjk0OTUgMjQuMzMyNiAyMi41NTg4IDI0LjcyM0wxMS4wMzcgMzYuMjM0MkwxMS43NDI3IDM2LjkzOTNMMjMuMjY0MSAyNS40Mjg0QzIzLjY1NDggMjUuMDM4MSAyNC4yODc5IDI1LjAzODMgMjQuNjc4MiAyNS40Mjg5TDM2LjI0MjEgMzdMMzYuOTQ3MiAzNi4yOTQ0TDI1LjM4NDEgMjQuNzI0MVoiIGZpbGw9IiM5OTk5OTkiLz4KPHBhdGggZD0iTTI1LjM4NDEgMjQuNzI0MUMyNC45OTM3IDI0LjMzMzQgMjQuOTkzOSAyMy43MDAyIDI1LjM4NDcgMjMuMzA5OEwzNyAxMS43MDUxTDM2LjI5NDMgMTFMMjQuNjc5MyAyMi42MDQ0QzI0LjI4ODYgMjIuOTk0NyAyMy42NTU2IDIyLjk5NDQgMjMuMjY1MiAyMi42MDM4TDExLjcwNTIgMTEuMDM2NkwxMSAxMS43NDIyTDIyLjU1OTMgMjMuMzA4N0MyMi45NDk3IDIzLjY5OTQgMjIuOTQ5NSAyNC4zMzI2IDIyLjU1ODggMjQuNzIzTDExLjAzNyAzNi4yMzQyTDExLjc0MjcgMzYuOTM5M0wyMy4yNjQxIDI1LjQyODRDMjMuNjU0OCAyNS4wMzgxIDI0LjI4NzkgMjUuMDM4MyAyNC42NzgyIDI1LjQyODlMMzYuMjQyMSAzN0wzNi45NDcyIDM2LjI5NDRMMjUuMzg0MSAyNC43MjQxWiIgc3Ryb2tlPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo=);mask-image:url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNS4zODQxIDI0LjcyNDFDMjQuOTkzNyAyNC4zMzM0IDI0Ljk5MzkgMjMuNzAwMiAyNS4zODQ3IDIzLjMwOThMMzcgMTEuNzA1MUwzNi4yOTQzIDExTDI0LjY3OTMgMjIuNjA0NEMyNC4yODg2IDIyLjk5NDcgMjMuNjU1NiAyMi45OTQ0IDIzLjI2NTIgMjIuNjAzOEwxMS43MDUyIDExLjAzNjZMMTEgMTEuNzQyMkwyMi41NTkzIDIzLjMwODdDMjIuOTQ5NyAyMy42OTk0IDIyLjk0OTUgMjQuMzMyNiAyMi41NTg4IDI0LjcyM0wxMS4wMzcgMzYuMjM0MkwxMS43NDI3IDM2LjkzOTNMMjMuMjY0MSAyNS40Mjg0QzIzLjY1NDggMjUuMDM4MSAyNC4yODc5IDI1LjAzODMgMjQuNjc4MiAyNS40Mjg5TDM2LjI0MjEgMzdMMzYuOTQ3MiAzNi4yOTQ0TDI1LjM4NDEgMjQuNzI0MVoiIGZpbGw9IiM5OTk5OTkiLz4KPHBhdGggZD0iTTI1LjM4NDEgMjQuNzI0MUMyNC45OTM3IDI0LjMzMzQgMjQuOTkzOSAyMy43MDAyIDI1LjM4NDcgMjMuMzA5OEwzNyAxMS43MDUxTDM2LjI5NDMgMTFMMjQuNjc5MyAyMi42MDQ0QzI0LjI4ODYgMjIuOTk0NyAyMy42NTU2IDIyLjk5NDQgMjMuMjY1MiAyMi42MDM4TDExLjcwNTIgMTEuMDM2NkwxMSAxMS43NDIyTDIyLjU1OTMgMjMuMzA4N0MyMi45NDk3IDIzLjY5OTQgMjIuOTQ5NSAyNC4zMzI2IDIyLjU1ODggMjQuNzIzTDExLjAzNyAzNi4yMzQyTDExLjc0MjcgMzYuOTM5M0wyMy4yNjQxIDI1LjQyODRDMjMuNjU0OCAyNS4wMzgxIDI0LjI4NzkgMjUuMDM4MyAyNC42NzgyIDI1LjQyODlMMzYuMjQyMSAzN0wzNi45NDcyIDM2LjI5NDRMMjUuMzg0MSAyNC43MjQxWiIgc3Ryb2tlPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo=);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:cover;mask-size:cover}}.smv-fullscreen-box .smv.smv-autohide.smv-selectors-right .smv-button-fullscreen{right:70px;transition:right .3s linear,opacity .2s linear}.smv-fullscreen-box .smv.smv-autohide.smv-selectors-right.smv-selectors-closed .smv-button-fullscreen{right:0}.smv-fullscreen-box .smv.smv-autohide.smv-selectors-top .smv-button-fullscreen{top:70px;transition:top .3s linear,opacity .2s linear}.smv-fullscreen-box .smv.smv-autohide.smv-selectors-top.smv-selectors-closed .smv-button-fullscreen{top:0}.smv-fullsreen-always .smv-button-fullscreen-open{display:none}.smv-video,.smv-video iframe,.smv-video>*{top:0;left:0;width:100%;height:100%}.smv-video>*{display:inline-block;position:relative}';
  });
  /* end-removable-module-css */

  /* eslint-disable no-unused-vars */

  var CSS_MAIN_CLASS = globalVariables.smv;
  var SELECTOR_TAG = CSS_MAIN_CLASS + '-thumbnail';
  var SELECTOR_CLASS = CSS_MAIN_CLASS + '-selector';
  var DPPX = $J.W.node.devicePixelRatio >= 2 ? 2 : 1; // Dots per px. 2 - is equal to Retina.;

  /* eslint-env es6 */

  /* eslint-disable no-extra-semi */

  /* eslint-disable no-unused-vars */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  var defaultOptions = {
    orientation: {
      type: 'string',
      'enum': ['horizontal', 'vertical'],
      defaults: 'horizontal'
    },
    arrows: {
      type: 'boolean',
      defaults: true
    },
    loop: {
      type: 'boolean',
      defaults: true
    },
    // Quality applied to images (1x - 1.49x).
    quality: {
      type: 'number',
      minimum: 0,
      maximum: 100,
      defaults: 80
    },
    // Quality applied to hi-res images (1.5x - 2x).
    hdQuality: {
      type: 'number',
      minimum: 0,
      maximum: 100,
      defaults: 60
    },
    itemsOrder: {
      type: 'array',
      defaults: []
    },
    autostart: {
      oneOf: [
      /*
          created - init and load
          visible - init and load in view
          off - not init
      */
      {
        type: 'string',
        'enum': ['created', 'visible', 'off']
      }, {
        type: 'boolean',
        'enum': [false]
      }],
      defaults: 'visible'
    },
    // A distance from the viewport within which the in-view state should be triggered.
    threshold: {
      type: 'number',
      minimum: 0,
      defaults: 0
    },
    slide: {
      // slide.first
      first: {
        type: 'number',
        minimum: 0,
        defaults: 0
      },
      // slide.delay
      delay: {
        type: 'number',
        minimum: 9,
        defaults: 3000
      },
      // slide.preload
      preload: {
        type: 'boolean',
        defaults: true
      },
      // slide.autoplay
      autoplay: {
        type: 'boolean',
        defaults: false
      },
      animation: {
        // slide.animation.type
        type: {
          oneOf: [{
            type: 'string',
            'enum': ['off', 'slide', 'fade']
          }, {
            type: 'boolean',
            'enum': [false]
          }],
          defaults: 'fade'
        },
        // slide.animation.type
        duration: {
          type: 'number',
          minimum: 9,
          defaults: 200
        }
      },
      socialbuttons: {
        enable: {
          type: 'boolean',
          defaults: false
        },
        types: {
          facebook: {
            type: 'boolean',
            defaults: true
          },
          twitter: {
            type: 'boolean',
            defaults: true
          },
          linkedin: {
            type: 'boolean',
            defaults: true
          },
          reddit: {
            type: 'boolean',
            defaults: true
          },
          tumblr: {
            type: 'boolean',
            defaults: true
          },
          pinterest: {
            type: 'boolean',
            defaults: true
          },
          telegram: {
            type: 'boolean',
            defaults: true
          }
        }
      }
    },
    thumbnails: {
      // thumbnails.enable
      enable: {
        type: 'boolean',
        defaults: true
      },
      // thumbnails.size
      size: {
        type: 'number',
        minimum: 5,
        defaults: 70
      },
      // thumbnails.position
      position: {
        type: 'string',
        'enum': ['top', 'left', 'right', 'bottom'],
        defaults: 'bottom'
      },
      // thumbnails.type
      type: {
        type: 'string',
        'enum': ['square', 'auto', 'bullets', 'grid', 'crop'],
        defaults: 'square'
      },
      // thumbnails.always
      always: {
        type: 'boolean',
        defaults: false
      },
      // thumbnails.target
      target: {
        oneOf: [{
          type: 'string'
        }, {
          type: 'boolean',
          'enum': [false]
        }],
        defaults: false
      },
      // thumbnails.watermark
      watermark: {
        type: 'boolean',
        defaults: true
      }
    },
    fullscreen: {
      // fullscreen.enable
      enable: {
        type: 'boolean',
        defaults: true
      },
      // fullscreen.always
      always: {
        type: 'boolean',
        defaults: false
      },
      // fullscreen.native
      'native': {
        type: 'boolean',
        defaults: false
      },
      // TODO
      // +background: <color>,
      thumbnails: {
        // fullscreen.thumbnails.enable
        enable: {
          type: 'boolean',
          defaults: true
        },
        // fullscreen.thumbnails.size
        size: {
          oneOf: [{
            type: 'string',
            'enum': ['auto']
          }, {
            type: 'number',
            minimum: 5
          }],
          defaults: 'auto'
        },
        // fullscreen.thumbnails.position
        position: {
          type: 'string',
          'enum': ['top', 'left', 'right', 'bottom'],
          defaults: 'bottom'
        },
        // fullscreen.thumbnails.type
        type: {
          type: 'string',
          'enum': ['square', 'auto', 'bullets', 'grid', 'crop'],
          defaults: 'square'
        },
        // thumbnails.always
        always: {
          type: 'boolean',
          defaults: false
        },
        // fullscreen.thumbnails.autohide
        autohide: {
          type: 'boolean',
          defaults: false
        },
        // fullscreen.thumbnails.watermark
        watermark: {
          type: 'boolean',
          defaults: true
        }
      }
    },
    contextmenu: {
      // contextmenu.enable
      enable: {
        type: 'boolean',
        defaults: false
      },
      text: {
        zoom: {
          // contextmenu.text.zoom.in
          'in': {
            oneOf: [{
              type: 'string'
            }, {
              type: 'boolean',
              'enum': [false]
            }],
            defaults: 'Zoom In'
          },
          // contextmenu.text.zoom.out
          out: {
            oneOf: [{
              type: 'string'
            }, {
              type: 'boolean',
              'enum': [false]
            }],
            defaults: 'Zoom Out'
          }
        },
        fullscreen: {
          // contextmenu.fullscreen.enter
          enter: {
            oneOf: [{
              type: 'string'
            }, {
              type: 'boolean',
              'enum': [false]
            }],
            defaults: 'Enter Full Screen'
          },
          // contextmenu.fullscreen.exit
          exit: {
            oneOf: [{
              type: 'string'
            }, {
              type: 'boolean',
              'enum': [false]
            }],
            defaults: 'Exit Full Screen'
          }
        },
        // contextmenu.text.download
        download: {
          oneOf: [{
            type: 'string'
          }, {
            type: 'boolean',
            'enum': [false]
          }],
          defaults: 'Download Image'
        }
      }
    },
    productdetail: {
      enable: {
        type: 'boolean',
        defaults: false
      },
      position: {
        type: 'string',
        'enum': ['top', 'right', 'bottom', 'left'],
        defaults: 'top'
      }
    }
    /*
        TODO
        contextmenu: {
            items: [
                { action: zoomIn, text: 'Збільшити' }
                { action: zoomOut }
            ]
        }
     */
    // ready: { type: 'function', defaults: () => {} },
    // beforeSlideIn: { type: 'function', defaults: () => {} },
    // beforeSlideOut: { type: 'function', defaults: () => {} },
    // afterSlideIn: { type: 'function', defaults: () => {} },
    // afterSlideOut: { type: 'function', defaults: () => {} },
    // fullscreenIn: { type: 'function', defaults: () => {} },
    // fullscreenOut: { type: 'function', defaults: () => {} }
    // sendStats: { type: 'function', defaults: () => {} }

  };
  /* eslint-env es6 */

  /* global sirvRequire */

  /* global sirvModule */

  /* global helper */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Spin|Zoom|Video|Description|ProductDetail|SocialButtons|HotSpot|remoteModules" }] */

  var Spin = null;
  var Zoom = null;
  var Video = null; // let Description = null;

  var ProductDetail = null;
  var SocialButtons = null; // let HotSpots = null;

  var remoteModules = function () {
    var sliderConfig = sirvModule.config();
    var promises = {};
    helper.objEach(sliderConfig, function (key, value) {
      if (key !== 'description') {
        promises[key] = new Promise(function (resolve) {
          sirvRequire([value], function (sliderModule) {
            switch (key) {
              case 'spin':
                Spin = sliderModule;
                break;

              case 'zoom':
                Zoom = sliderModule;
                break;

              case 'video':
                Video = sliderModule;
                break;
              // 'description' is not used
              // case 'description':
              //     Description = sliderModule;
              //     break;

              case 'productDetail':
                ProductDetail = sliderModule;
                break;

              case 'socialButtons':
                SocialButtons = sliderModule;
                break;
              //no default
            }

            resolve();
          });
        });
      }
    });
    return {
      load: function (arr) {
        var result;
        var mods = [];

        if (!arr) {
          arr = [];
        }

        arr.forEach(function (mod) {
          if (promises[mod]) {
            mods.push(promises[mod]);
          }
        });

        if (!mods.length) {
          result = Promise.resolve();
        } else {
          result = Promise.all(mods);
        }

        return result;
      }
    };
  }();
  /* eslint-env es6 */

  /* global $ */

  /* global $J */

  /* global EventEmitter */

  /* global helper */

  /* global ViewerImage */

  /* global Zoom */

  /* global Spin */

  /* global Video */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint-disable no-lonely-if */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvService" }] */


  var SirvService = /*#__PURE__*/function (_EventEmitter) {
    "use strict";

    bHelpers.inheritsLoose(SirvService, _EventEmitter);

    function SirvService(node, options, additionalOptions) {
      var _this;

      _this = _EventEmitter.call(this) || this;
      _this.node = $(node);
      _this.options = options;
      _this.type = globalVariables.SLIDE.TYPES.NONE;
      _this.imgSrc = null;
      _this.effect = null;
      _this.additionalEffects = [];
      _this.isStarted = false;
      _this.isPrepared = false;
      _this.toolOptions = {};
      _this.api = {};
      _this.isActive = false;
      _this.additionalOptions = additionalOptions;

      _this.parse();

      _this.setEvents();

      return _this;
    }

    SirvService.isExist = function isExist(node) {
      var result = false;
      var resultOfParse = helper.getSirvType(node);
      var deps = {
        Image: ViewerImage,
        Spin: Spin,
        Zoom: Zoom,
        Video: Video
      };

      if (resultOfParse && !!deps[$J.camelize('-' + globalVariables.SLIDE.NAMES[resultOfParse.type])]) {
        result = true;
      }

      return result;
    };

    var _proto = SirvService.prototype;

    _proto.createAPI = function createAPI() {
      var _this2 = this;

      if (this.effect) {
        this.api = this.effect.api;
        var methods = [];
        var t = globalVariables.SLIDE.TYPES;

        switch (this.type) {
          case t.SPIN:
            methods = ['play', 'rotate', 'rotateX', 'rotateY', 'zoomIn', 'zoomOut'];
            break;

          case t.ZOOM:
            if (this.api.zoomIn) {
              methods = ['zoomIn', 'zoomOut'];
            }

            break;
          // no default
        }

        methods.forEach(function (method) {
          var _oldMethod = _this2.api[method];

          _this2.api[method] = function () {
            var result = false;
            var om = _oldMethod;

            if (_this2.isActive) {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              result = om.apply(_this2, args);
            }

            return result;
          };
        });
      }
    };

    _proto.setEvents = function setEvents() {
      var _this3 = this;

      this.on('stats', function (e) {
        e.stopEmptyEvent();
        e.data.component = globalVariables.SLIDE.NAMES[_this3.type];
      }); // init, ready, zoomIn, zoomOut

      this.on('componentEvent', function (e) {
        e.stopEmptyEvent();
        e.data.component = globalVariables.SLIDE.NAMES[_this3.type];

        if (e.data.type === 'ready') {
          if (_this3.type === globalVariables.SLIDE.TYPES.IMAGE && e.data.data.imageIndex !== null) {
            e.stopAll();
          }

          _this3.toolOptions = _this3.effect.getOptions();
        }
      });
    };

    _proto.parse = function parse() {
      var resultOfParse = helper.getSirvType(this.node.node);

      if (resultOfParse) {
        this.type = resultOfParse.type;
        this.imgSrc = resultOfParse.imgSrc;
      }
    };

    _proto.push = function push(imgNode) {
      if (ViewerImage) {
        var effect = new ViewerImage(imgNode, {
          options: this.options.image,
          isFullscreen: this.additionalOptions.isFullscreen,
          imageIndex: this.additionalEffects.length
        });
        effect.setParent(this);
        this.additionalEffects.push({
          node: imgNode,
          src: $(imgNode).attr('src'),
          datasrc: $(imgNode).attr('data-src'),
          effect: effect
        });
      }
    };

    _proto.sendEvent = function sendEvent(nameOfEvent) {
      if (this.effect && this.effect.sendEvent) {
        this.effect.sendEvent(nameOfEvent);
      }
    };

    _proto.resize = function resize() {
      this.broadcast('resize');
    };

    _proto.startFullInit = function startFullInit(options) {
      var _this4 = this;

      if (this.effect) {
        this.effect.startFullInit(options ? options[this.type] : null);

        if (this.additionalEffects.length) {
          this.additionalEffects.forEach(function (effect) {
            if (effect.effect) {
              effect.effect.startFullInit(options ? options[_this4.type] : null);
            }
          });
        }
      }
    };

    _proto.getSelectorImgUrl = function getSelectorImgUrl(data) {
      return this.effect.getSelectorImgUrl(data);
    };

    _proto.getInfoSize = function getInfoSize() {
      var _this5 = this;

      var result = null;

      if (this.type === globalVariables.SLIDE.TYPES.IMAGE) {
        result = new Promise(function (resolve, reject) {
          Promise.all([_this5.effect.getInfoSize()].concat(_this5.additionalEffects.map(function (value) {
            return value.effect.getInfoSize();
          }))).then(function (values) {
            resolve(values[0]);
          }).catch(reject);
        });
      } else {
        result = this.effect.getInfoSize();
      }

      return result;
    };

    _proto.start = function start() {
      if (this.isPrepared) {
        return;
      }

      this.isPrepared = true;
      var options = {
        isFullscreen: this.additionalOptions.isFullscreen,
        quality: this.additionalOptions.quality,
        hdQuality: this.additionalOptions.hdQuality,
        isHDQualitySet: this.additionalOptions.isHDQualitySet,
        always: this.additionalOptions.always,
        nativeFullscreen: this.additionalOptions.nativeFullscreen
      };
      var t = globalVariables.SLIDE.TYPES;

      switch (this.type) {
        case t.IMAGE:
          if (ViewerImage) {
            this.effect = new ViewerImage(this.node.node, $J.extend(options, {
              options: this.options.image,
              imageIndex: null
            }));
            this.effect.setParent(this);
          }

          break;

        case t.PANZOOM:
        case t.ZOOM:
          if (Zoom) {
            this.effect = new Zoom(this.node.node, $J.extend(options, {
              options: this.options.zoom
            }));
            this.effect.setParent(this);
          }

          break;

        case t.SPIN:
          if (Spin) {
            this.node.setCss({
              // fix for shadow DOM
              width: '100%',
              height: '100%'
            });
            this.effect = new Spin(this.node.node, $J.extend(options, {
              options: this.options.spin
            }));
            this.effect.setParent(this);
          }

          break;

        case t.VIDEO:
          if (Video) {
            this.effect = new Video(this.node.node, $J.extend(options, {
              options: this.options.video,
              nativeFullscreen: this.additionalOptions.nativeFullscreen
            }));
            this.effect.setParent(this);
          }

          break;

        default:
      }

      this.createAPI();
    };

    _proto.isThumbnailGif = function isThumbnailGif() {
      if (this.effect && this.type === globalVariables.SLIDE.TYPES.SPIN) {
        return this.effect.isThumbnailGif();
      }

      return false;
    };

    _proto.isZoomSizeExist = function isZoomSizeExist() {
      var t = globalVariables.SLIDE.TYPES;

      if (this.effect && $J.contains([t.SPIN, t.PANZOOM, t.ZOOM], this.type)) {
        return this.effect.isZoomSizeExist();
      }

      return false;
    };

    _proto.startGettingInfo = function startGettingInfo() {
      if (this.effect) {
        this.effect.startGettingInfo();
      }
    };

    _proto.startTool = function startTool(isShown, preload, firstSlideAhead) {
      if (!this.isStarted && this.effect) {
        this.isStarted = true;
        this.effect.run(isShown, preload, firstSlideAhead);

        if (this.additionalEffects.length) {
          this.additionalEffects.forEach(function (effect) {
            if (effect.effect) {
              effect.effect.run(isShown, preload, firstSlideAhead);
            }
          });
        }
      }
    };

    _proto.loadContent = function loadContent() {
      if (this.isStarted) {
        this.effect.loadContent();
      }
    };

    _proto.loadThumbnail = function loadThumbnail() {
      if (this.isStarted) {
        this.effect.loadThumbnail();
      }
    };

    _proto.getType = function getType() {
      return this.type;
    };

    _proto.getData = function getData() {
      var result = {};

      if (this.effect) {
        result = $J.extend(result, this.api);
        delete result.start;
        delete result.stop;
        delete result.refresh;
      }

      return result;
    };

    _proto.getOriginImageUrl = function getOriginImageUrl() {
      if (this.effect) {
        return this.effect.getOriginImageUrl();
      }

      return null;
    };

    _proto.getZoomData = function getZoomData() {
      if ($J.contains([globalVariables.SLIDE.TYPES.SPIN, globalVariables.SLIDE.TYPES.ZOOM], this.type)) {
        return {
          isZoomed: this.effect.isZoomed(),
          zoom: this.effect.getZoomData()
        };
      }

      return null;
    };

    _proto.getSpinOrientation = function getSpinOrientation() {
      if (this.type === globalVariables.SLIDE.TYPES.SPIN) {
        return this.effect.getOrientation();
      }

      return null;
    };

    _proto.getSocialButtonData = function getSocialButtonData(data, isSpin) {
      var result = null;

      if (this.isStarted) {
        if (this.type === globalVariables.SLIDE.TYPES.SPIN) {
          result = this.effect.getSocialButtonData(data, isSpin);
        } else {
          result = this.effect.getSocialButtonData(data);
        }
      }

      return result;
    };

    _proto.loadVideoSources = function loadVideoSources() {
      if (this.effect) {
        this.effect.addSources();
      }
    }
    /**
     * Viewer has touchdrag event for slideing slides and if we have touchdrag event in the effect (spin) it can make conflict
     * The method fixes conflict
     */
    ;

    _proto.isEffectActive = function isEffectActive() {
      if (this.effect && this.type === 'spin') {
        return this.effect.isActive();
      }

      return false;
    };

    _proto.activate = function activate() {
      if (!this.isActive) {
        this.isActive = true;
      }
    };

    _proto.deactivate = function deactivate() {
      this.isActive = false;
    };

    _proto.getToolOptions = function getToolOptions() {
      return this.toolOptions;
    };

    _proto.destroy = function destroy() {
      if (this.effect) {
        this.effect.destroy();

        if (this.additionalEffects.length) {
          this.additionalEffects.forEach(function (effect) {
            if (effect.effect) {
              effect.effect.destroy();
            } else {
              if (!effect.src && effect.datasrc) {
                effect.node.removeAttribute('src');
              }
            }
          });
        }
      }

      this.toolOptions = {};
      this.api = {};
      this.isActive = false;
      this.isStarted = false;
      this.isPrepared = false;
      this.off('stats');
      this.off('componentEvent');

      _EventEmitter.prototype.destroy.call(this);
    };

    return SirvService;
  }(EventEmitter);
  /* eslint-env es6 */

  /* global EventEmitter */

  /* eslint class-methods-use-this: ["error", {"exceptMethods": ["getNamesOfEffects"]}] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Effect" }] */


  var Effects = {};

  var Effect = function () {
    var getClassName = function (str) {
      return $J.camelize('-' + str);
    };

    var getDirection = function (direction, orientation) {
      var result;

      if (orientation === 'horizontal') {
        result = direction === 'next' ? 'right' : 'left';
      } else {
        result = direction === 'next' ? 'bottom' : 'top';
      }

      return result;
    };

    var Effect_ = /*#__PURE__*/function (_EventEmitter2) {
      "use strict";

      bHelpers.inheritsLoose(Effect_, _EventEmitter2);

      function Effect_(options) {
        var _this6;

        _this6 = _EventEmitter2.call(this) || this;
        _this6.options = $J.extend({
          effect: 'blank',
          orientation: 'horizontal',
          time: 600,
          easing: 'ease-in-out'
        }, options);
        _this6.isMove = false;
        _this6.callbackData = null;
        _this6.effectName = 'blank';
        _this6.effect = null;

        _this6.setEvents();

        return _this6;
      }

      var _proto2 = Effect_.prototype;

      _proto2.setEvents = function setEvents() {
        var _this7 = this;

        this.on('effectStart', function (e) {
          e.data = {
            callbackData: _this7.callbackData
          };
          _this7.isMove = true;
        });
        this.on('effectEnd', function (e) {
          e.data = {
            callbackData: _this7.callbackData
          };
          _this7.isMove = false;

          _this7.effect.destroy();

          _this7.effect = null;
        });
      };

      _proto2.getNamesOfEffects = function getNamesOfEffects() {
        return $J.hashKeys(Effects);
      };

      _proto2.make = function make(element1, element2, options, callbackData) {
        var o = $J.extend(this.options, options || {});
        this.stop();
        var name = getClassName(o.effect);

        if (!Object.prototype.hasOwnProperty.call(Effects, name)) {
          name = 'Blank';
        }

        this.effect = new Effects[name](element1, element2, {
          time: o.time,
          easing: o.easing,
          direction: getDirection(o.direction, o.orientation)
        });
        this.effect.setParent(this);
        this.callbackData = callbackData;
        this.effect.make();
      };

      _proto2.stop = function stop() {
        if (this.effect) {
          this.effect.destroy();
          this.effect = null;
        }

        this.callbackData = null;
      };

      _proto2.destroy = function destroy() {
        this.stop();
        this.off('effectStart');
        this.off('effectEnd');
        this.isMove = false;

        _EventEmitter2.prototype.destroy.call(this);
      };

      return Effect_;
    }(EventEmitter);

    return Effect_;
  }();
  /* eslint-env es6 */

  /* global Effects */

  /* global EventEmitter */

  /* eslint class-methods-use-this: ["error", {"exceptMethods": ["_move"]}] */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


  var Blank_ = /*#__PURE__*/function (_EventEmitter3) {
    "use strict";

    bHelpers.inheritsLoose(Blank_, _EventEmitter3);

    function Blank_(element1, element2, options) {
      var _this8;

      _this8 = _EventEmitter3.call(this) || this;
      _this8.name = 'blank';
      _this8.elements = [element1, element2];
      _this8.elements[0].node = $(_this8.elements[0].node);
      _this8.elements[1].node = $(_this8.elements[1].node);
      _this8.options = $J.extend({}, options || {});
      _this8.states = {
        NOT_STARTED: 0,
        MOVING: 1,
        ENDED: 2
      };
      _this8.state = _this8.states.NOT_STARTED;
      _this8.isDestroyed = false;
      return _this8;
    }

    var _proto3 = Blank_.prototype;

    _proto3._show = function _show(index) {
      this.elements[index].node.setCss({
        opacity: 1,
        visibility: 'visible'
      });
    };

    _proto3._hide = function _hide(index) {
      this.elements[index].node.setCss({
        opacity: 0,
        visibility: 'hidden'
      });
    };

    _proto3._start = function _start() {
      this.emit('effectStart', {
        name: this.name,
        indexes: [this.elements[0].index, this.elements[1].index]
      });

      this._show(0);

      this.elements[0].node.setCssProp('z-index', 9);

      this._show(1);

      this.elements[1].node.setCssProp('z-index', 7);
    };

    _proto3._move = function _move(callback) {
      callback();
    };

    _proto3._end = function _end() {
      if (this.state !== this.states.ENDED) {
        this.state = this.states.ENDED;

        this._hide(0);

        this.emit('effectEnd', {
          name: this.name,
          indexes: [this.elements[0].index, this.elements[1].index]
        });
      }
    };

    _proto3._clear = function _clear() {
      this.elements.forEach(function (element) {
        element.node.setCss({
          zIndex: '',
          opacity: '',
          visibility: ''
        });
      });
    };

    _proto3.make = function make() {
      var _this9 = this;

      if (this.state === this.states.NOT_STARTED) {
        this.state = this.states.MOVING;

        this._start();

        this._move(function () {
          _this9._end();

          _this9._clear();
        });
      }
    };

    _proto3.destroy = function destroy() {
      if (!this.isDestroyed) {
        this.isDestroyed = true;

        this._end();

        this._clear();

        this.state = this.states.ENDED;

        _EventEmitter3.prototype.destroy.call(this, this);
      }
    };

    return Blank_;
  }(EventEmitter);

  Effects.Blank = Blank_;
  /* global Effects, Blank_ */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  Effects.Slide = function () {
    var toPercentString = function (value) {
      return value + '%';
    };

    var getNormalizeArray = function (arr) {
      return arr.map(function (value) {
        return toPercentString(value);
      });
    };

    var Slide_ = /*#__PURE__*/function (_Blank_) {
      "use strict";

      bHelpers.inheritsLoose(Slide_, _Blank_);

      function Slide_(element1, element2, options) {
        var _this10;

        _this10 = _Blank_.call(this, element1, element2, options) || this;
        _this10.options = $J.extend(_this10.options, $J.extend({
          direction: 'left',
          // top / left / right / bottom
          time: 600,
          easing: 'ease-in-out'
        }, options || {}));
        _this10.name = 'slide';
        _this10.from = $([0, -100]);
        _this10.to = $([100, 0]);

        if ($J.contains(['right', 'bottom'], _this10.options.direction)) {
          _this10.from[1] *= -1;
          _this10.to[0] *= -1;
        }

        _this10.from = getNormalizeArray(_this10.from);
        _this10.to = getNormalizeArray(_this10.to);
        return _this10;
      }

      var _proto4 = Slide_.prototype;

      _proto4._show = function _show(index) {
        var el = this.elements[index].node;

        if ($J.contains(['left', 'right'], this.options.direction)) {
          this.from[index] = this.from[index] + ', 0%';
          this.to[index] = this.to[index] + ', 0%';
        } else {
          this.from[index] = '0%, ' + this.from[index];
          this.to[index] = '0%, ' + this.to[index];
        }

        el.setCssProp('transform', 'translate3d(' + this.from[index] + ', 0px)');

        _Blank_.prototype._show.call(this, index);
      };

      _proto4._move = function _move(callback) {
        var _this11 = this;

        var options = this.options;
        this.elements[1].node.addEvent('transitionend', function (e) {
          if (_this11.elements[1].node.node !== e.getTarget()) {
            return;
          }

          e.stop();

          _Blank_.prototype._move.call(_this11, callback);
        });
        this.elements.forEach(function (element, index) {
          element.node.getSize();
          element.node.setCssProp('transition', 'transform ' + options.time + 'ms ' + options.easing);
          element.node.setCssProp('transform', 'translate3d(' + _this11.to[index] + ', 0px)');
        });
      };

      _proto4._clear = function _clear() {
        this.elements.forEach(function (element) {
          element.node.removeEvent('transitionend');
          element.node.setCss({
            transform: '',
            transition: ''
          });
        });

        _Blank_.prototype._clear.call(this, this);
      };

      return Slide_;
    }(Blank_);

    return Slide_;
  }();
  /* eslint-env es6 */

  /* global Effects, Blank_ */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


  var Fade_ = /*#__PURE__*/function (_Blank_2) {
    "use strict";

    bHelpers.inheritsLoose(Fade_, _Blank_2);

    function Fade_(element1, element2, options) {
      var _this12;

      _this12 = _Blank_2.call(this, element1, element2, options) || this;
      _this12.options = $J.extend(_this12.options, $J.extend({
        time: 600,
        easing: 'linear'
      }, options || {}));
      _this12.name = 'fade';
      _this12.from = $([1, 0]);
      _this12.to = $([0, 1]);
      return _this12;
    }

    var _proto5 = Fade_.prototype;

    _proto5._show = function _show(index) {
      _Blank_2.prototype._show.call(this, index);

      var el = this.elements[index].node;
      el.setCssProp('opacity', this.from[index]);
    };

    _proto5._move = function _move(callback) {
      var _this13 = this;

      var options = this.options;
      this.elements[1].node.addEvent('transitionend', function (e) {
        if (_this13.elements[1].node.node !== e.getTarget()) {
          return;
        }

        e.stop();

        _Blank_2.prototype._move.call(_this13, callback);
      });
      this.elements.forEach(function (element, index) {
        element.node.getSize();
        element.node.setCssProp('transition', 'opacity ' + options.time + 'ms ' + options.easing);
        element.node.setCssProp('opacity', _this13.to[index]);
      });
    };

    _proto5._clear = function _clear() {
      this.elements.forEach(function (element) {
        element.node.removeEvent('transitionend');
        element.node.setCss({
          opacity: '',
          transition: ''
        });
      });

      _Blank_2.prototype._clear.call(this);
    };

    return Fade_;
  }(Blank_);

  Effects.Fade = Fade_;
  /* eslint-env es6 */

  /* global CSS_MAIN_CLASS */

  /* global EventEmitter */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Arrows" }] */

  var Arrows = function () {
    var createArrows = function (orientation, customClass) {
      return $(['prev', 'next']).map(function (value) {
        var container = $J.$new('div').addClass(CSS_MAIN_CLASS + '-arrow-control ' + CSS_MAIN_CLASS + '-arrow-control-' + value);
        var arrow = $J.$new('div').addClass(CSS_MAIN_CLASS + '-button').addClass(CSS_MAIN_CLASS + '-arrow').addClass(CSS_MAIN_CLASS + '-arrow-' + value);

        if (customClass && customClass !== '') {
          arrow.addClass(CSS_MAIN_CLASS + '-arrow-' + customClass);
        }

        container.append(arrow);
        return container;
      });
    };

    var Arrows_ = /*#__PURE__*/function (_EventEmitter4) {
      "use strict";

      bHelpers.inheritsLoose(Arrows_, _EventEmitter4);

      function Arrows_(options) {
        var _this14;

        _this14 = _EventEmitter4.call(this) || this;
        _this14.options = $J.extend({
          orientation: 'horizontal',
          customClass: ''
        }, options || {});
        _this14.arrows = createArrows(_this14.options.orientation, _this14.options.customClass);

        _this14.arrows.forEach(function (arrow, index) {
          var _arrowType = !index ? 'prev' : 'next';

          var button = $(arrow.node.firstChild);
          arrow.store('arrowType', _arrowType);
          button.append($J.$new('div').addClass(CSS_MAIN_CLASS + '-icon'));
          button.addEvent('btnclick tap', $(function (typeOfArrow, e) {
            e.stop();

            if (!arrow.fetch('disabled')) {
              _this14.emit('arrowAction', {
                data: {
                  type: typeOfArrow
                }
              });
            }
          }).bind(bHelpers.assertThisInitialized(_this14), _arrowType));
        });

        _this14.isShow = true;
        return _this14;
      }

      var _proto6 = Arrows_.prototype;

      _proto6.getNodes = function getNodes() {
        return $([this.arrows[0], this.arrows[1]]);
      };

      _proto6.show = function show() {
        if (!this.isShow) {
          this.arrows.forEach(function (arrow) {
            arrow.removeClass(CSS_MAIN_CLASS + '-hidden');
          });
          this.isShow = true;
        }
      };

      _proto6.hide = function hide() {
        if (this.isShow) {
          this.isShow = false;
          this.arrows.forEach(function (arrow) {
            arrow.addClass(CSS_MAIN_CLASS + '-hidden');
          });
        }
      };

      _proto6.disable = function disable(arrow) {
        if (arrow && this.isShow) {
          var indexArrow = arrow === 'forward' ? 1 : 0;
          this.arrows[indexArrow].store('disabled', true);
          $(this.arrows[indexArrow].node.firstChild).attr('disabled', '');
        } else {
          this.arrows.forEach(function (element) {
            $(element.node.firstChild).removeAttr('disabled');
            element.store('disabled', false);
          });
        }
      };

      _proto6.destroy = function destroy() {
        this.arrows.forEach(function (arrow) {
          $(arrow.node.firstChild).removeEvent('btnclick tap');
          arrow.del('arrowType');
          arrow.del('disabled');
          arrow.remove();
        });
        this.arrows = $([]);
        this.isShow = false;

        _EventEmitter4.prototype.destroy.call(this);
      };

      return Arrows_;
    }(EventEmitter);

    return Arrows_;
  }();

  var Selectors = function () {
    /* global helper */

    /* eslint-disable no-unused-vars */
    var getOrientation = function (position) {
      var result = 'horizontal';

      if ($J.contains(['left', 'right'], position)) {
        result = 'vertical';
      }

      return result;
    };

    var equalOptions = function (opt1, opt2) {
      var result = true;
      helper.objEach(opt1, function (key, value) {
        if (result && value !== opt2[key]) {
          result = false;
        }
      });
      return result;
    };

    var DEFAULT_SIZE = {
      width: 560,
      height: 315
    };
    var SELECTORS_STATE = {
      NONE: 0,
      STANDARD: 1,
      FULLSCREEN: 2
    };
    /* eslint-env es6 */

    /* global EventEmitter, globalFunctions, DEFAULT_SIZE, SELECTOR_TAG */

    /* eslint-disable indent */

    /* eslint-disable no-lonely-if */

    /* eslint-disable class-methods-use-this */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

    /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SelectorContent" }] */

    var SelectorContent = /*#__PURE__*/function (_EventEmitter5) {
      "use strict";

      bHelpers.inheritsLoose(SelectorContent, _EventEmitter5);

      function SelectorContent(node, type, size, orientation) {
        var _this15;

        _this15 = _EventEmitter5.call(this) || this;
        _this15.node = $(node);
        _this15.type = type;
        _this15.size = size; // 70

        _this15.orientation = orientation; // selectors orientation 'horizontal' | 'vertical'

        _this15.getPlaceholderSizePromise = null;
        _this15.destroyed = false;
        _this15.loaded = false;
        _this15.content = null;

        if (_this15.node.getTagName() === SELECTOR_TAG) {
          _this15.content = $J.$A(_this15.node.node.childNodes);
        }

        return _this15;
      }

      var _proto7 = SelectorContent.prototype;

      _proto7.isLoaded = function isLoaded() {
        return this.loaded;
      };

      _proto7.setCssSize = function setCssSize() {
        var css = this.getSelectorSize();
        this.node.setCss(css);
      };

      _proto7.getSelectorSize = function getSelectorSize() {
        var selectorSize = {};

        if ($J.contains(['square', 'crop'], this.type)) {
          selectorSize.width = this.size;
          selectorSize.height = this.size;
        } else {
          if (this.orientation === 'horizontal') {
            selectorSize.height = this.size;
          } else {
            selectorSize.width = this.size;
          }
        }

        return selectorSize;
      };

      _proto7.getPlaceholderSize = function getPlaceholderSize() {
        var _this16 = this;

        if (!this.getPlaceholderSizePromise) {
          this.getPlaceholderSizePromise = new Promise(function (resolve) {
            var size = _this16.getSelectorSize();

            if (size.width && size.height) {
              resolve(size);
            } else {
              if (_this16.destroyed) {
                resolve({
                  width: 0,
                  height: 0
                });
              } else {
                var s;

                _this16.getProportion().then(function (_size) {
                  s = _size;
                }).finally(function () {
                  if (!size.width) {
                    size.width = s.width / s.height * size.height;
                  } else {
                    size.height = s.height / s.width * size.width;
                  }

                  resolve(size);
                });
              }
            }
          });
        }

        return this.getPlaceholderSizePromise;
      };

      _proto7.getProportion = function getProportion() {
        return Promise.resolve(DEFAULT_SIZE);
      };

      _proto7.complete = function complete() {
        this.node.setCss({
          width: '',
          height: ''
        });
        this.setCssSize();
        return Promise.resolve();
      };

      _proto7.getNode = function getNode() {
        return this.node;
      };

      _proto7.appendTo = function appendTo(container) {
        if (this.content) {
          this.content.forEach(function (node) {
            container.append(node);
          });
        } else {
          container.append(this.getNode());
        }
      };

      _proto7.destroy = function destroy() {
        this.destroyed = true;
        this.node = null;
        this.getPlaceholderSizePromise = null;

        _EventEmitter5.prototype.destroy.call(this);
      };

      return SelectorContent;
    }(EventEmitter);
    /* eslint-env es6 */

    /* global SelectorContent, globalFunctions, DEFAULT_SIZE, helper */

    /* eslint-disable indent */

    /* eslint-disable no-lonely-if */

    /* eslint-disable class-methods-use-this */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

    /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "ImageSelectorContent" }] */


    var ImageSelectorContent = /*#__PURE__*/function (_SelectorContent) {
      "use strict";

      bHelpers.inheritsLoose(ImageSelectorContent, _SelectorContent);

      function ImageSelectorContent(node, type, size, orientation, watermark) {
        var _this17;

        _this17 = _SelectorContent.call(this, node, type, size, orientation) || this;
        _this17.imageOrientation = 'horizontal'; // 'horizontal' | 'vertical'

        _this17.isSirv = false;
        _this17.watermark = watermark;
        _this17.src = null;
        _this17.srcset = null;
        _this17.imageSize = {
          width: 0,
          height: 0
        };
        _this17.getProportionPromise = null;
        _this17.getUrlPromise = null;
        _this17.loadImagePromise = null;
        return _this17;
      }

      var _proto8 = ImageSelectorContent.prototype;

      _proto8.setCssSize = function setCssSize() {
        if ($J.contains(['square', 'crop'], this.type)) {
          this.customSquare();
        } else {
          this.removeCustomSquare();
        }

        _SelectorContent.prototype.setCssSize.call(this);
      };

      _proto8.getProportion = function getProportion() {
        var _this18 = this;

        if (!this.getProportionPromise) {
          this.getProportionPromise = new Promise(function (resolve, reject) {
            if (_this18.destroyed) {
              resolve({
                width: 0,
                height: 0
              });
            } else {
              _this18.emit('getSelectorProportion', {
                data: {
                  resultingCallback: function (data) {
                    var size = data.size;
                    _this18.isSirv = data.isSirv;

                    if (size) {
                      if (!size.width) {
                        size = DEFAULT_SIZE;
                      }

                      resolve(size);
                    } else {
                      resolve(DEFAULT_SIZE);
                    }
                  }
                }
              });
            }
          });
        }

        return this.getProportionPromise;
      };

      _proto8.setImageUrl = function setImageUrl(src, srcset, alt, referrerpolicy) {
        this.src = src;
        this.srcset = srcset;

        if (this.node) {
          if (this.src || this.srcset) {
            if (referrerpolicy) {
              this.node.attr('referrerpolicy', referrerpolicy);
            }

            if (this.srcset) {
              this.node.attr('srcset', this.srcset + ' 2x');
            }

            this.node.attr('src', this.src);

            if (!$J.browser.mobile) {
              // fix for firefox
              // glueing images to cursor
              this.node.addEvent('mousedown', function (e) {
                e.stopDefaults();
              });
            }
          }

          if (alt) {
            this.node.attr('alt', alt);
          }
        }
      };

      _proto8.getUrl = function getUrl() {
        var _this19 = this;

        if (!this.getUrlPromise) {
          this.getUrlPromise = new Promise(function (resolve, reject) {
            if (_this19.destroyed) {
              resolve(_this19);
            } else {
              var selectorSize = _this19.getSelectorSize();

              _this19.emit('getSelectorImgUrl', {
                data: {
                  crop: _this19.type === 'crop',
                  type: _this19.type,
                  watermark: _this19.watermark,
                  size: selectorSize,
                  resultingCallback: function (result) {
                    if (result) {
                      _this19.setImageUrl(result.src, result.srcset, result.alt, result.referrerpolicy);

                      resolve(_this19);
                    } else {
                      reject(_this19);
                    }
                  }
                }
              });
            }
          });
        }

        return this.getUrlPromise;
      };

      _proto8.setImageData = function setImageData(size) {
        this.imageSize = size;
        this.imageOrientation = this.imageSize.width >= this.imageSize.height ? 'horizontal' : 'vertical';
      };

      _proto8.loadImage = function loadImage() {
        var _this20 = this;

        if (!this.loadImagePromise) {
          this.loadImagePromise = new Promise(function (resolve, reject) {
            if (_this20.node) {
              helper.loadImage(_this20.isSirv ? _this20.node.node : _this20.node.node.src).then(function (imageData) {
                _this20.loaded = true;

                _this20.setImageData(imageData.size);

                _this20.setCssSize();

                resolve(_this20);
              }).catch(function (error) {
                if (_this20.destroyed) {
                  resolve(_this20);
                } else {
                  reject(_this20);
                }
              });
            } else {
              resolve(_this20);
            }
          });
        }

        return this.loadImagePromise;
      };

      _proto8.customSquare = function customSquare() {
        if (Math.abs(this.imageSize.width - this.imageSize.height) > 2 && this.node.getTagName() !== 'div') {
          var div = $J.$new('div').setCss({
            overflow: 'hidden',
            position: 'relative'
          });
          this.node.attr('data-image-orientation', this.imageOrientation);
          div.append(this.node);
          this.node.setCss({
            width: '',
            height: '',
            'max-width': 'none'
          });

          if (this.type === 'crop') {
            if (this.imageOrientation === 'horizontal') {
              this.node.setCssProp('height', this.size);
            } else {
              this.node.setCssProp('width', this.size);
            }
          } else {
            if (this.imageOrientation === 'vertical') {
              this.node.setCssProp('height', this.size);
            } else {
              this.node.setCssProp('width', this.size);
            }
          }

          this.node = div;
        }
      };

      _proto8.removeCustomSquare = function removeCustomSquare() {
        if (this.node && this.node.getTagName() === 'div') {
          this.node.removeEvent('touchstart selectstart contextmenu'); // TODO review it

          this.node.remove();
          this.node = $(this.node.node.firstChild);
          this.node.setCss({
            width: '',
            height: '',
            maxWidth: ''
          });
          this.node.removeAttr('data-image-orientation');
        }
      };

      _proto8.complete = function complete() {
        var _this21 = this;

        return this.getUrl().then(function () {
          return _this21.loadImage();
        });
      };

      _proto8.destroy = function destroy() {
        if (this.node) {
          this.node.removeEvent('mousedown');
        }

        this.getProportionPromise = null;
        this.getUrlPromise = null;
        this.loadImagePromise = null;

        _SelectorContent.prototype.destroy.call(this);
      };

      return ImageSelectorContent;
    }(SelectorContent);
    /* eslint-env es6 */

    /* global ImageSelectorContent, globalFunctions, helper, EventEmitter, CSS_MAIN_CLASS, SELECTOR_TAG, SELECTORS_STATE, equalOptions, SelectorContent */

    /* eslint-disable indent */

    /* eslint-disable no-lonely-if */

    /* eslint-disable class-methods-use-this */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

    /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Selector" }] */


    var Selector = /*#__PURE__*/function (_EventEmitter6) {
      "use strict";

      bHelpers.inheritsLoose(Selector, _EventEmitter6);

      function Selector(parentNode, index, selector, uuid, options, infoPromise) {
        var _this22;

        _this22 = _EventEmitter6.call(this) || this;
        _this22.UUID = uuid;
        _this22.options = helper.deepExtend({
          standard: {
            type: 'square',
            // 'square' | 'crop' | 'auto' | 'bullets'
            size: 70,
            orientation: 'horizontal',
            // 'horizontal' | 'vertical'
            watermark: true // true | false

          },
          fullscreen: {
            type: 'square',
            // 'square' | 'crop' | 'auto' | 'bullets'
            size: 70,
            orientation: 'horizontal',
            // 'horizontal' | 'vertical'
            watermark: true // true | false

          },
          activeClass: CSS_MAIN_CLASS + '-active',
          placeholderClass: CSS_MAIN_CLASS + '-thumbnail-placeholder',
          selectorContent: null,
          disabled: false
        }, options || {});
        _this22.parentContainer = $(parentNode);
        _this22.index = index;
        _this22.selector = $(selector) || $J.$new('div');
        _this22.container = $J.$new('div').addClass(CSS_MAIN_CLASS + '-item').setCss({
          display: 'inline-block'
        }); // itemContainer

        _this22.placeholder = $J.$new('div').addClass(_this22.options.placeholderClass);
        _this22.size = {
          width: 0,
          height: 0
        };
        _this22.currentObject = null;
        _this22.isActive = false;
        _this22.disabled = false;
        _this22.destroyed = false;

        _this22.container.append(_this22.selector);

        _this22.parentContainer.append(_this22.container);

        if (_this22.options.disabled) {
          _this22.disable();
        }

        _this22.infoPromise = infoPromise || Promise.resolve(false);
        _this22.state = SELECTORS_STATE.NONE;
        _this22.initPromise = null;

        _this22.init();

        return _this22;
      }

      var _proto9 = Selector.prototype;

      _proto9.init = function init() {
        var _this23 = this;

        if (!this.initPromise) {
          this.initPromise = new Promise(function (resolve) {
            _this23.infoPromise.then(function () {
              _this23.standard = _this23.createContent(_this23.options.standard);

              if (_this23.standard && _this23.standard instanceof ImageSelectorContent && equalOptions(_this23.options.standard, _this23.options.fullscreen)) {
                _this23.fullscreen = _this23.standard;
              } else {
                _this23.fullscreen = _this23.createContent(_this23.options.fullscreen, true);
              }

              _this23.selector.append(_this23.placeholder);

              var dataType = _this23.selector.attr('data-type');

              if (!dataType) {
                _this23.selector.setCssProp('font-size', 0);
              }

              _this23.setEvents();

              _this23.setCustomEvent();

              resolve();
            });
          });
        }

        return this.initPromise;
      };

      _proto9.createContent = function createContent(options, fullscreen) {
        var result;

        if (options.type !== 'bullets') {
          if (this.options.selectorContent) {
            result = new SelectorContent(this.options.selectorContent, options.type, options.size, options.orientation);
          } else {
            var img = $(new Image());
            result = new ImageSelectorContent(img, options.type, options.size, options.orientation, options.watermark);
          }

          result.setParent(this);
        }

        return result;
      };

      _proto9.getProportion = function getProportion() {
        var _this24 = this;

        var result = Promise.resolve();

        if (!this.disabled) {
          if (this.state === SELECTORS_STATE.FULLSCREEN && this.fullscreen) {
            result = this.fullscreen.getProportion();
          } else if (this.standard) {
            result = this.standard.getProportion();
          }
        }

        return new Promise(function (resolve, reject) {
          _this24.init().then(function () {
            result.then(resolve).catch(reject);
          });
        });
      };

      _proto9.activatedSelector = function activatedSelector() {
        return this.options.activated;
      };

      _proto9.setEvents = function setEvents() {
        var _this25 = this;

        this.on('getSelectorProportion', function (e) {
          e.data.UUID = _this25.UUID;
        });
        this.on('getSelectorImgUrl', function (e) {
          e.data.UUID = _this25.UUID;
        });
      };

      _proto9.addPlaceholder = function addPlaceholder(selectorType, size) {
        this.container.attr('data-selector-type', selectorType);
        this.selector.append(this.placeholder);
        this.placeholder.setCss(size);
      }
      /*
          1 - SELECTORS_STATE.STANDARD,
          2 - SELECTORS_STATE.FULLSCREEN
      */
      ;

      _proto9.toggle = function toggle(state
      /* 1 or 2 only */
      ) {
        var _this26 = this;

        return new Promise(function (res, rej) {
          _this26.init().then(function () {
            var result;

            var _resolve = Promise.resolve();

            if (_this26.state !== state) {
              _this26.state = state;

              if (_this26.disabled) {
                result = _resolve;
              } else {
                var selector = _this26.standard;
                var selectorType = _this26.options.standard.type;

                if (state === 2) {
                  selector = _this26.fullscreen;
                  selectorType = _this26.options.fullscreen.type;
                }

                if (selectorType === 'bullets') {
                  _this26.selector.node.innerHTML = '';
                  _this26.currentObject = selectorType;

                  _this26.container.attr('data-selector-type', selectorType);

                  _this26.emit('resize');

                  result = _resolve;
                } else {
                  if (!(selector instanceof ImageSelectorContent)) {
                    _this26.container.attr('data-selector-type', selectorType);
                  }

                  result = new Promise(function (resolve, reject) {
                    if (selector) {
                      selector.getPlaceholderSize().then(function (size) {
                        if (_this26.state === state && !_this26.destroyed) {
                          if (!selector.isLoaded() && !_this26.options.selectorContent) {
                            // NOTE: this.selector.node.innerHTML = ''; doesn't work properly in IE 11
                            while (_this26.selector.node.firstChild) {
                              _this26.selector.node.removeChild(_this26.selector.node.firstChild);
                            }

                            _this26.addPlaceholder(selectorType, size);
                          }

                          resolve();
                          selector.complete().then(function () {
                            if (_this26.state === state && !_this26.destroyed) {
                              _this26.container.attr('data-selector-type', selectorType);

                              _this26.placeholder.remove(); // NOTE: this.selector.node.innerHTML = ''; doesn't work properly in IE 11


                              while (_this26.selector.node.firstChild) {
                                _this26.selector.node.removeChild(_this26.selector.node.firstChild);
                              }

                              selector.appendTo(_this26.selector);
                              _this26.currentObject = selector;

                              _this26.emit('resize');
                            }
                          }).catch(function () {// empty
                          });
                        } else {
                          resolve();
                        }
                      });
                    } else {
                      resolve();
                    }
                  });
                }
              }
            } else {
              result = _resolve;
            }

            result.then(res).catch(rej);
          });
        });
      };

      _proto9.setEvent = function setEvent() {
        var _this27 = this;

        this.container.addEvent('btnclick tap', function (e) {
          e.stop();

          _this27.emit('selectorAction', {
            data: _this27.UUID
          });
        });
      };

      _proto9.setCustomEvent = function setCustomEvent() {
        if (this.options.selectorContent && $J.$(this.options.selectorContent).getTagName() === SELECTOR_TAG) {
          var nodesList = $(this.options.selectorContent).node.querySelectorAll('a');
          $J.$A(nodesList).forEach(function (item) {
            $J.$(item).addEvent('btnclick tap', function (e) {
              e.stop();

              if ($J.$(item).attr('href')[0] === '#') {
                $J.W.node.location.hash = '';
                $J.W.node.location.hash = $J.$(item).attr('href');
              } else {
                $J.W.node.open($J.$(item).attr('href'));
              }
            });
          });
        }
      };

      _proto9.activate = function activate() {
        if (!this.isActive) {
          this.isActive = true;
          this.container.addClass(this.options.activeClass);
        }
      };

      _proto9.isActivate = function isActivate() {
        return this.isActive;
      };

      _proto9.deactivate = function deactivate() {
        if (this.isActive) {
          this.isActive = false;
          this.container.removeClass(this.options.activeClass);
        }
      };

      _proto9.getSize = function getSize() {
        this.size = this.container.getSize();
        return this.size;
      };

      _proto9.disable = function disable() {
        if (!this.disabled) {
          this.disabled = true;
          this.container.attr('disabled', 'true');
          this.container.setCssProp('display', 'none');
          this.deactivate();
          this.emit('resize');
        }
      };

      _proto9._toggleForEnable = function _toggleForEnable() {
        var neededType;

        if (this.state !== SELECTORS_STATE.NONE) {
          if (this.state === SELECTORS_STATE.STANDARD) {
            neededType = this.standard || 'bullets';
          } else {
            neededType = this.fullscreen || 'bullets';
          }
        }

        var result;

        if (neededType !== this.currentObject) {
          var last = this.state;
          this.state = SELECTORS_STATE.NONE;
          result = this.toggle(last);
        } else {
          result = Promise.resolve();
        }

        return result;
      };

      _proto9.enable = function enable() {
        var _this28 = this;

        if (this.disabled) {
          this.disabled = false;

          this._toggleForEnable().then(function () {
            if (!_this28.disabled) {
              _this28.container.removeAttr('disabled');

              _this28.container.setCssProp('display', '');

              _this28.emit('resize');
            }
          });
        }
      };

      _proto9.setIndex = function setIndex(index) {
        this.index = index;
      };

      _proto9.getContainer = function getContainer() {
        return this.container;
      };

      _proto9.getOptions = function getOptions() {
        return this.options;
      };

      _proto9.isDestroyed = function isDestroyed() {
        return this.destroyed;
      };

      _proto9.isDisabled = function isDisabled() {
        return this.disabled;
      };

      _proto9.destroy = function destroy() {
        this.destroyed = true;
        this.placeholder.remove();
        this.off('getSelectorProportion');
        this.off('getSelectorImgUrl');

        if (this.standard) {
          this.standard.destroy();
          this.standard = null;
        }

        if (this.fullscreen) {
          this.fullscreen.destroy();
          this.fullscreen = null;
        }

        this.container.removeEvent('btnclick tap');
        this.container.remove();
        this.container = null;
        this.parentContainer = null;
        this.selector = null;

        _EventEmitter6.prototype.destroy.call(this);
      };

      return Selector;
    }(EventEmitter);
    /* eslint-env es6 */

    /* global globalFunctions, helper, EventEmitter, CSS_MAIN_CLASS, SELECTORS_STATE, Selector, getOrientation, Arrows */

    /* eslint-disable indent */

    /* eslint-disable no-lonely-if */

    /* eslint-disable class-methods-use-this */

    /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

    /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Selectors_" }] */


    var SELECTORS = 'selectors';

    var getTime = function (maxTime, width, step) {
      var result = maxTime;
      var minTime = parseInt(maxTime / 3, 10);
      result = parseInt(Math.abs(step) / width * maxTime, 10);

      if (result < minTime) {
        result = minTime;
      } else if (result > maxTime) {
        result = maxTime;
      }

      return result;
    };

    var convertToTranslateString = function (value, isHorizontal) {
      if (isHorizontal) {
        value += 'px, 0';
      } else {
        value = '0, ' + value + 'px';
      }

      return value;
    };

    var normalizeIndex = function (index, length) {
      if (index < 0) {
        index = 0;
      } else if (index > length - 1) {
        index = length - 1;
      }

      return index;
    };

    var isPinned = function (value) {
      return value === 'start' || value === 'end';
    };

    var Selectors_ = /*#__PURE__*/function (_EventEmitter7) {
      "use strict";

      bHelpers.inheritsLoose(Selectors_, _EventEmitter7);

      function Selectors_(selectors, options) {
        var _this29;

        _this29 = _EventEmitter7.call(this) || this;
        _this29.options = $J.extend({
          isStandardGrid: false,
          standardStyle: 'square',
          // square | crop | auto | bullets
          standardSize: 70,
          standardPosition: 'bottom',
          // top, left, right, bottom, false
          standardWatermark: true,
          isFullscreenGrid: false,
          fullscreenStyle: 'square',
          // square | crop | auto | bullets
          fullscreenSize: 70,
          fullscreenPosition: 'bottom',
          // top, left, right, bottom, false
          fullscreenAutohide: false,
          fullscreenWatermark: true,
          arrows: true,
          activeClass: CSS_MAIN_CLASS + '-active'
        }, options || {});
        _this29.instanceNode = $J.$new('div').addClass(CSS_MAIN_CLASS + '-' + SELECTORS).setCss({
          opacity: 0,
          visibility: 'hidden',
          transition: ''
        });
        _this29.selectorsContainer = $J.$new('div').addClass(CSS_MAIN_CLASS + '-ss');
        _this29.selectorsScroll = $J.$new('div').addClass(CSS_MAIN_CLASS + '-scroll').setCss({
          transform: 'translate3d(0, 0, 0)'
        });
        _this29.controlButton = $J.$new('div').addClass(CSS_MAIN_CLASS + '-' + SELECTORS + '-toggle-switch');
        _this29.selectorsScrollContainer = $J.$new('div').addClass(CSS_MAIN_CLASS + '-selectors-scroll-container');
        _this29.pinnedNodeAtStart = null;
        _this29.pinnedNodeAtEnd = null;
        _this29.hasPinnedSelector = false;
        _this29.baseSelectorsList = null;
        _this29.blocksPinnedInited = false;
        _this29.pinnedStartList = [];
        _this29.pinnedEndList = [];
        _this29.isMove = false;
        _this29.currentPosition = 0;
        _this29.containerSize = {
          width: 0,
          height: 0
        };
        _this29.halfContainerSize = 0;
        _this29.scrollSize = {
          width: 0,
          height: 0
        };
        _this29.halfScrollSize = 0;
        _this29.currentActiveItem = null;
        _this29.isShown = false;
        _this29.isControlShown = true;
        _this29.isControlInDoc = false;
        _this29.controlDebounce = null;
        _this29.isReady = false;
        _this29.resizeTimeout = null;
        _this29.isActionsEnabled = true;
        _this29.isDone = false;
        _this29.isInView = false;
        _this29.state = SELECTORS_STATE.STANDARD;
        _this29.arrows = null;
        _this29.currentStylePosition = _this29.options.standardPosition;
        _this29.longSide = null;
        _this29.shortSide = null;
        _this29.currentAxis = 'x';
        _this29.isStarted = false;
        _this29.isDestroyed = false;

        _this29.setHasPinnedSelector(selectors);

        _this29.initPinnedBlocks();

        _this29.selectors = [];
        selectors.forEach(function (_selector, index) {
          _this29.selectors.push(_this29.createSelector(_selector, index));
        });

        _this29.sortByBaseSelectors(_this29.selectors);

        _this29.orderPinnedSelectorByType(_this29.selectors);

        _this29.identifyVariables();

        _this29.setContainerCss();

        return _this29;
      }

      var _proto10 = Selectors_.prototype;

      _proto10.getSelectorsIndexByUUID = function getSelectorsIndexByUUID(uuid) {
        var result = null;

        for (var i = 0, l = this.selectors.length; i < l; i++) {
          if (this.selectors[i].UUID === uuid) {
            result = i;
            break;
          }
        }

        return result;
      };

      _proto10.getSelectorByUUID = function getSelectorByUUID(uuid) {
        var result = this.getSelectorsIndexByUUID(uuid);

        if (result !== null) {
          result = this.selectors[result];
        }

        return result;
      };

      _proto10.insertSelectorBefore = function insertSelectorBefore(index, selector) {
        var selectors = this.selectors;
        var selectorsScroll = this.selectorsScroll;

        if (this.hasPinnedSelector) {
          if (!selector.getOptions().pinned) {
            selectors = this.baseSelectorsList;
            index = this.updateIndex(selectors, selector);
          } else if (selector.getOptions().pinned === 'start') {
            selectors = this.pinnedStartList;
            selectorsScroll = $J.$(this.getPinnedScrollContainer(this.pinnedNodeAtStart));
            index = this.updateIndex(selectors, selector);
          } else if (selector.getOptions().pinned === 'end') {
            selectors = this.pinnedEndList;
            selectorsScroll = $J.$(this.getPinnedScrollContainer(this.pinnedNodeAtEnd));
            index = this.updateIndex(selectors, selector);
          }
        }

        var referenceElement = null;

        if (index + 1 < selectors.length) {
          referenceElement = selectors[index + 1].container;
        }

        this.hide();
        selectorsScroll.node.insertBefore(selector.getContainer().node, referenceElement ? referenceElement.node : referenceElement);
      };

      _proto10.insertSelector = function insertSelector(selectorIndex, selectorObj) {
        if (!this.blocksPinnedInited) {
          this.setHasPinnedSelector(selectorObj);
          this.initPinnedBlocks();
          this.addPinnedBlocks();
        }

        var selector = this.createSelector(selectorObj, selectorIndex);

        if (this.isDone) {
          selector.setEvent();
        }

        this.hide();
        this.selectors.splice(selectorIndex, 0, selector);
        this.selectors.forEach(function (_selector, index) {
          _selector.setIndex(index);
        });

        if (selector.getOptions().pinned) {
          this.orderPinnedSelectorByType(selector);

          if (!this.baseSelectorsList || !this.baseSelectorsList.length) {
            this.sortByBaseSelectors(this.selectors);
          }
        } else {
          this.sortByBaseSelectors(this.selectors);
        }

        this.insertSelectorBefore(selectorIndex, selector);
        selector.toggle(this.state);
      };

      _proto10.getScrollContainer = function getScrollContainer(targetSelector) {
        if (targetSelector.pinned === 'start') {
          return this.getPinnedScrollContainer(this.pinnedNodeAtStart);
        } else if (targetSelector.pinned === 'end') {
          return this.getPinnedScrollContainer(this.pinnedNodeAtEnd);
        }

        return this.selectorsScroll;
      };

      _proto10.disableSelector = function disableSelector(selectorUUID) {
        var selector = this.getSelectorByUUID(selectorUUID);

        if (selector) {
          if (this.currentActiveItem && this.currentActiveItem === selector) {
            this.currentActiveItem = null;
          }

          this.hide();
          selector.disable();
        }
      };

      _proto10.enableSelector = function enableSelector(selectorUUID) {
        var selector = this.getSelectorByUUID(selectorUUID);

        if (selector) {
          this.hide();
          selector.enable();
        }
      };

      _proto10.pickOut = function pickOut(selectorUUID) {
        var selector = null;
        var index = this.getSelectorsIndexByUUID(selectorUUID);

        if (index !== null) {
          selector = this.selectors[index];
        }

        if (selector) {
          var pinned = selector.getOptions().pinned;
          selector.destroy();
          this.selectors.splice(index, 1);
          this.selectors.forEach(function (_selector, _index) {
            _selector.setIndex(_index);
          });
          this.reorderDataSelectors(pinned);
        }
      };

      _proto10.reorderDataSelectors = function reorderDataSelectors(statusSelector) {
        if (statusSelector) {
          this.setHasPinnedSelector(this.selectors);
        }

        if (this.hasPinnedSelector && !statusSelector) {
          this.sortByBaseSelectors(this.selectors);
        } else if (this.hasPinnedSelector && statusSelector) {
          this.orderPinnedSelectorByType(this.selectors);
        } else if (!this.hasPinnedSelector) {
          this.baseSelectorsList = [];
          this.pinnedStartList = [];
          this.pinnedEndList = [];
        }
      };

      _proto10.createSelector = function createSelector(selectorData, index) {
        var selector = new Selector(this.getScrollContainer(selectorData), index, selectorData.node, selectorData.UUID, {
          standard: {
            type: this.options.standardStyle,
            size: this.options.standardSize,
            orientation: getOrientation(this.options.standardPosition),
            watermark: this.options.standardWatermark
          },
          fullscreen: {
            type: this.options.fullscreenStyle,
            size: this.options.fullscreenSize,
            orientation: getOrientation(this.options.fullscreenPosition),
            watermark: this.options.fullscreenWatermark
          },
          activeClass: this.options.activeClass,
          selectorContent: selectorData.selectorContent,
          disabled: selectorData.disabled,
          pinned: selectorData.pinned,
          activated: selectorData.activated
        }, selectorData.infoPromise);
        selector.setParent(this);
        return selector;
      };

      _proto10.setEventsFromSelectors = function setEventsFromSelectors() {
        var _this30 = this;

        this.on('selectorAction', function (e) {
          e.stopAll();

          _this30.emit('changeSlide', {
            data: {
              UUID: e.data
            }
          });

          var index = _this30.getSelectorsIndexByUUID(e.data);

          if (index !== null) {
            _this30.setActiveItem(index);
          }
        });
        var timer;
        this.on('resize', function (e) {
          e.stopAll();
          clearTimeout(timer);
          timer = setTimeout(function () {
            _this30.onResize();
          }, 16);
        });
      };

      _proto10.initPinnedBlocks = function initPinnedBlocks() {
        var getContainers = function () {
          return {
            containerNode: $J.$new('div').addClass(CSS_MAIN_CLASS + '-ss'),
            scrollNode: $J.$new('div').addClass(CSS_MAIN_CLASS + '-scroll').setCss({
              transform: 'translate3d(0, 0, 0)'
            })
          };
        };

        if (!this.blocksPinnedInited && this.hasPinnedSelector) {
          this.pinnedNodeAtStart = $J.$new('div').addClass(CSS_MAIN_CLASS + '-selectors-pinned-start');
          this.pinnedNodeAtEnd = $J.$new('div').addClass(CSS_MAIN_CLASS + '-selectors-pinned-end');
          var containerNodes = getContainers();
          var startContainer = containerNodes.containerNode;
          startContainer.append(containerNodes.scrollNode);
          this.pinnedNodeAtStart.append(startContainer);
          containerNodes = getContainers();
          var endContainer = containerNodes.containerNode;
          endContainer.append(containerNodes.scrollNode);
          this.pinnedNodeAtEnd.append(endContainer);
          this.blocksPinnedInited = true;
        }
      };

      _proto10.addPinnedBlocks = function addPinnedBlocks() {
        if (this.blocksPinnedInited && this.hasPinnedSelector) {
          this.instanceNode.append(this.pinnedNodeAtStart);
          this.instanceNode.append(this.pinnedNodeAtEnd);
        }
      };

      _proto10.setHasPinnedSelector = function setHasPinnedSelector(dataSelectors) {
        if (Array.isArray(dataSelectors)) {
          if (dataSelectors.length < 1) {
            this.hasPinnedSelector = false;
            return;
          }

          var selectorClass = dataSelectors[0] instanceof Selector;
          this.hasPinnedSelector = dataSelectors.some(function (selector) {
            return isPinned(selectorClass ? selector.getOptions().pinned : selector.pinned);
          });
          return;
        } else if (isPinned(dataSelectors.pinned)) {
          this.hasPinnedSelector = true;
          return;
        }

        this.hasPinnedSelector = false;
      };

      _proto10.orderPinnedSelectorByType = function orderPinnedSelectorByType(dataSelectors) {
        var _this31 = this;

        if (this.hasPinnedSelector) {
          if (Array.isArray(dataSelectors)) {
            this.pinnedStartList = [];
            this.pinnedEndList = [];
            dataSelectors.forEach(function (dataSelector) {
              var selectorType = dataSelector.options.pinned;

              if (selectorType === 'start') {
                _this31.pinnedStartList.push(dataSelector);
              } else if (selectorType === 'end') {
                _this31.pinnedEndList.push(dataSelector);
              }
            });
          } else {
            if (dataSelectors.getOptions().pinned === 'start') {
              this.pinnedStartList = this.selectors.filter(function (selector) {
                return selector.getOptions().pinned === 'start';
              });
            } else if (dataSelectors.getOptions().pinned === 'end') {
              this.pinnedEndList = this.selectors.filter(function (selector) {
                return selector.getOptions().pinned === 'end';
              });
            }
          }
        }
      };

      _proto10.updateIndex = function updateIndex(selectors, selector) {
        return selectors.indexOf(selector);
      };

      _proto10.init = function init() {
        var _this32 = this;

        this.createArrows();
        this.selectorsScrollContainer.append(this.selectorsContainer).appendTo(this.instanceNode);
        this.addPinnedBlocks();

        if (this.arrows) {
          this.arrows.hide();
          var arrowsNodes = this.arrows.getNodes();
          this.selectorsScrollContainer.append(arrowsNodes[0]);
          this.selectorsScrollContainer.append(arrowsNodes[1]);
        }

        this.selectorsContainer.append(this.selectorsScroll);
        this.isShown = true;
        this.hide();
        this.identifyVariables();
        this.setEventsFromSelectors();

        if (!this.currentStylePosition) {
          this.instanceNode.setCssProp('display', 'none');
        }

        Promise.all(this.selectors.map(function (selector) {
          return selector.getProportion();
        })).finally(function () {
          _this32.isReady = true;

          _this32.emit('selectorsReady');
        });
      };

      _proto10.identifyVariables = function identifyVariables() {
        if (this.currentStylePosition) {
          var isHorizontal = getOrientation(this.currentStylePosition) === 'horizontal';
          this.longSide = isHorizontal ? 'width' : 'height';
          this.shortSide = this.longSide === 'width' ? 'height' : 'width';
          this.currentAxis = isHorizontal ? 'x' : 'y';
        } else {
          this.longSide = null;
          this.shortSide = null;
        }
      };

      _proto10.changeSelectors = function changeSelectors(direction) {
        return Promise.all(this.selectors.map(function (selector) {
          return selector.toggle(direction);
        }));
      };

      _proto10.getSelectorsSize = function getSelectorsSize() {
        this.selectors.forEach(function (selector) {
          if (!selector.isDestroyed()) {
            selector.getSize();
          }
        });
      };

      _proto10.enableActions = function enableActions() {
        if (!this.isActionsEnabled) {
          this.isActionsEnabled = true;
          this.show();

          if (this.options.fullscreenAutohide) {
            this.setSelectorsState(true);
          }
        }
      };

      _proto10.disableActions = function disableActions() {
        if (this.isActionsEnabled) {
          this.isActionsEnabled = false;
          this.hide();

          if (this.controlDebounce) {
            this.controlDebounce.cancel();
          }
        }
      };

      _proto10.show = function show(force) {
        if (!this.isShown && this.isActionsEnabled && !this.isDestroyed) {
          var _transition = force ? '' : 'opacity 400ms linear';

          this.isShown = true;
          this.selectorsScroll.setCss({
            display: 'inline-flex'
          }); // for rendering

          this.getSizes();
          this.jump(this.getActiveItem(), true);
          this.instanceNode.setCss({
            opacity: 1,
            visibility: 'visible',
            transition: _transition
          });
        }
      };

      _proto10.getActiveItem = function getActiveItem() {
        return this.currentActiveItem ? this.currentActiveItem.index : 0;
      };

      _proto10.setCurrentActiveItemByUUID = function setCurrentActiveItemByUUID(selectorUUID) {
        var selector = this.getSelectorByUUID(selectorUUID);

        if (selector && !this.currentActiveItem) {
          this.currentActiveItem = selector;
        }
      };

      _proto10.hide = function hide() {
        if (this.isShown) {
          this.isShown = false;
          this.instanceNode.setCss({
            opacity: 0,
            visibility: 'hidden',
            transition: ''
          });
        }
      };

      _proto10.start = function start(parentSlider) {
        var _this33 = this;

        if (!this.isStarted && this.isInView) {
          this.isStarted = true;

          if (this.currentStylePosition) {
            this.changeSelectors(1).then(function () {
              return globalFunctions.rootDOM.addMainStyle(parentSlider);
            }).then(function () {
              if (!_this33.isDestroyed) {
                _this33.getSelectorsSize();

                _this33.done();

                _this33.show();
              }
            });
          } else {
            this.done();
          }
        }
      };

      _proto10.addControl = function addControl() {
        var _this34 = this;

        if (!this.isControlInDoc) {
          this.instanceNode.addEvent('mouseover mouseout', function (e) {
            var relatedTarget = e.getRelated();

            if (relatedTarget) {
              relatedTarget = $(relatedTarget);
            }

            while (relatedTarget && relatedTarget.node !== _this34.instanceNode.node && relatedTarget.node !== $J.D.node.body) {
              relatedTarget = relatedTarget.node.parentNode;

              if (relatedTarget) {
                relatedTarget = $(relatedTarget);
              }
            }

            if (!relatedTarget || relatedTarget.node !== _this34.instanceNode.node) {
              _this34.setControlTimeout(e.type === 'mouseover');
            }
          });
          this.controlButton.addEvent('btnclick tap', function (e) {
            _this34.setControlTimeout(true);

            _this34.setSelectorsState(!_this34.isControlShown);
          });
          $(this.instanceNode.node.parentNode).append(this.controlButton);
          this.controlDebounce = helper.debounce(function () {
            _this34.setSelectorsState(false);
          }, 3000);
          this.isControlInDoc = true;
        }
      };

      _proto10.removeControl = function removeControl() {
        if (this.isControlInDoc) {
          this.instanceNode.removeEvent('mouseover mouseout');
          this.controlDebounce.cancel();
          this.isControlShown = true;
          this.controlButton.removeEvent('btnclick tap');
          this.controlButton.remove();
          this.isControlInDoc = false;
        }
      };

      _proto10.setSelectorsState = function setSelectorsState(open) {
        this.isControlShown = open;
        this.setControlTimeout();
        this.emit('visibility', {
          action: this.isControlShown ? 'show' : 'hide'
        });
      };

      _proto10.setControlTimeout = function setControlTimeout(justClear) {
        if (this.isControlInDoc) {
          this.controlDebounce.cancel();

          if (this.isControlShown && !justClear) {
            this.controlDebounce();
          }
        }
      };

      _proto10.getNode = function getNode() {
        return this.instanceNode;
      };

      _proto10.isHorizontal = function isHorizontal() {
        return getOrientation(this.currentStylePosition) === 'horizontal';
      };

      _proto10.inView = function inView(value, parentSlider) {
        this.isInView = value; // sometimes selectors can be inside external container and we do not know which container with 'Sirv' class name inicialide it
        // so we need pass it for right adding css in shadow dom

        this.start(parentSlider);
      };

      _proto10.done = function done() {
        if (!this.isDone && !this.isDestroyed) {
          this.isDone = true;
          this.getSizes();
          this.selectors.forEach(function (selector) {
            selector.setEvent();
          });
          this.onResize();
          this.setDrag();
          this.emit('selectorsDone');
        }
      };

      _proto10.setActiveItem = function setActiveItem(index) {
        var selector = this.selectors[index];

        if (this.currentActiveItem) {
          this.currentActiveItem.deactivate();
        }

        if (selector && !selector.isDisabled() && selector.activatedSelector()) {
          selector.activate();
          this.currentActiveItem = selector;
        }

        if (!selector.isActivate() && this.currentActiveItem) {
          this.currentActiveItem.activate();
        }
      };

      _proto10.createArrows = function createArrows() {
        var _this35 = this;

        if (!this.options.arrows || this.options.standardStyle === 'grid' && this.options.standardStyle === 'grid') {
          return;
        }

        this.arrows = new Arrows({
          orientation: getOrientation(this.currentPosition || this.options.fullscreenPosition),
          customClass: 'thumbnails'
        });
        this.arrows.setParent(this);
        this.on('arrowAction', function (e) {
          e.stopAll();

          _this35.jump(e.data.type);
        });
      };

      _proto10.isGrid = function isGrid() {
        if (this.state === SELECTORS_STATE.FULLSCREEN) {
          return this.options.isFullscreenGrid;
        }

        return this.options.isStandardGrid;
      };

      _proto10.calculateContainerScroll = function calculateContainerScroll() {
        if (this.hasPinnedSelector || this.blocksPinnedInited) {
          var instanceSize = this.instanceNode.getSize();

          if (this.arrows) {
            this.arrows.hide();
          }

          var maxWidth = instanceSize[this.longSide] - (this.pinnedNodeAtStart.getSize()[this.longSide] + this.pinnedNodeAtEnd.getSize()[this.longSide]);

          if (maxWidth < 0) {
            maxWidth = 0;
          }

          if (this.scrollSize[this.longSide] < maxWidth) {
            maxWidth = this.scrollSize[this.longSide];
          }

          this.selectorsScrollContainer.setCssProp('max-' + this.longSide, maxWidth);
          this.getSizes();
        }
      };

      _proto10.sortByBaseSelectors = function sortByBaseSelectors(selectors) {
        if (this.hasPinnedSelector) {
          this.baseSelectorsList = selectors.filter(function (selector) {
            return !selector.getOptions().pinned;
          });
        }
      };

      _proto10.getIndexBaseSelectors = function getIndexBaseSelectors(index) {
        var result = this.baseSelectorsList.indexOf(this.selectors[index]);

        if (result < 0) {
          result = index;
        }

        return result;
      };

      _proto10.normalizePositionValue = function normalizePositionValue(value) {
        var max = this.containerSize[this.longSide] - this.scrollSize[this.longSide];

        if (this.arrows) {
          this.arrows.disable();

          if (max >= 0 || this.isGrid()) {
            this.arrows.hide();
            this.getSizes();
          } else {
            if (!this.arrows.isShow) {
              this.arrows.show();
              this.getSizes();
            }
          }
        }

        if (max === 0) {
          return 0;
        }

        if (this.halfScrollSize <= this.halfContainerSize) {
          value = this.halfContainerSize - this.halfScrollSize;
        } else {
          if (value >= 0) {
            value = 0;

            if (this.arrows) {
              this.arrows.disable('backward');
            }
          }

          if (value <= max) {
            value = max;

            if (this.arrows) {
              this.arrows.disable('forward');
            }
          }
        }

        return value;
      };

      _proto10.findItemPosition = function findItemPosition(index) {
        if (!this.selectors[index] || this.selectors[index].options.pinned) {
          return null;
        }

        index = normalizeIndex(index, this.selectors.length);

        if (this.hasPinnedSelector) {
          index = this.getIndexBaseSelectors(index);
        }

        var halfSelectorSize = this.selectors[index].size[this.longSide] / 2;
        var position = 0;
        var currentIndex = 0;

        while (currentIndex < index) {
          if (this.selectors[currentIndex]) {
            position += this.selectors[currentIndex].size[this.longSide];
          }

          currentIndex += 1;
        }

        var transitionPosition = this.halfContainerSize - (position + halfSelectorSize);
        return this.normalizePositionValue(transitionPosition);
      };

      _proto10.stopMoving = function stopMoving() {
        if (this.isMove) {
          var position = helper.getMatrix(this.selectorsScroll);

          if (position) {
            position = position.transform[this.currentAxis];
            this.currentPosition = position;
          }

          this.clearAnimation();
          this.selectorsScroll.setCssProp('transform', 'translate3d(' + convertToTranslateString(this.currentPosition, this.isHorizontal()) + ', 0)');
        }
      };

      _proto10.clearAnimation = function clearAnimation() {
        if (this.selectorsScroll) {
          this.selectorsScroll.removeEvent('transitionend');
          this.selectorsScroll.setCssProp('transition', '');
        }

        this.isMove = false;
      };

      _proto10.jump = function jump(direction, withoutAnimation) {
        var value = this.currentPosition;
        this.stopMoving();

        if ($J.typeOf(direction) === 'string' || $J.typeOf(direction) === 'number') {
          if ($J.typeOf(direction) === 'string') {
            if (direction === 'next') {
              value -= this.containerSize[this.longSide];
            } else {
              value += this.containerSize[this.longSide];
            }

            value = this.normalizePositionValue(value);
          } else {
            value = this.findItemPosition(direction);
          }
        } else {
          return;
        }

        if (value !== null) {
          this.move(value, null, withoutAnimation);
        }
      };

      _proto10.move = function move(value, speed, withoutAnimation) {
        var _this36 = this;

        if (!speed) {
          speed = 400;
        }

        if (this.currentPosition === value) {
          return;
        }

        this.selectorsScroll.removeEvent('transitionend');
        var css = {};

        if (!withoutAnimation) {
          this.isMove = true;
          this.selectorsScroll.addEvent('transitionend', function (e) {
            e.stop();

            _this36.clearAnimation();
          });
          css.transition = 'transform ' + getTime(speed, this.containerSize[this.longSide], Math.abs(value) - Math.abs(this.currentPosition)) + 'ms ease';
        }

        css.transform = 'translate3d(' + convertToTranslateString(value, this.isHorizontal()) + ', 0)';
        this.selectorsScroll.setCss(css);
        this.currentPosition = value;
      };

      _proto10.getSizes = function getSizes() {
        this.containerSize = this.selectorsContainer.getSize();
        this.halfContainerSize = this.containerSize[this.longSide] / 2;
        this.scrollSize = this.selectorsScroll.getSize();
        this.halfScrollSize = this.scrollSize[this.longSide] / 2;
      };

      _proto10.setDrag = function setDrag() {
        var _this37 = this;

        var fns = {};
        var lastXY = {
          x: null,
          y: null
        };
        var move = false;
        var containerPosition;
        var last;
        var diffSize;
        var distance;
        var axis;
        var otherAxis;
        var side;
        var direction;
        var startTimeStamp;
        var dragState = 0; // 0 - nothing, 1 - drag, 2 - sroll page

        var getXY = function (x, y) {
          return {
            x: x - containerPosition.left,
            y: y - containerPosition.top
          };
        };

        var getDirection = function (oldValue, newValue) {
          return oldValue > newValue ? 'next' : 'prev';
        };

        var culcDistance = function (dist, speed) {
          var min = dist / 2; // const max = dist * 2;

          return dist + min;
        };

        var onDrag = function (e) {
          fns[e.state](e);
        };

        fns.dragstart = function (e) {
          axis = _this37.currentAxis;
          otherAxis = axis === 'x' ? 'y' : 'x';
          side = _this37.longSide;
          lastXY = {
            x: e.x,
            y: e.y
          };

          if (_this37.containerSize[side] < _this37.scrollSize[side]) {
            move = true;
          }

          containerPosition = _this37.selectorsContainer.getPosition();

          _this37.stopMoving();

          last = getXY(e.x, e.y)[axis];
          diffSize = _this37.containerSize[side] - _this37.scrollSize[side];
          distance = 0;
          startTimeStamp = e.timeStamp;
        };

        fns.dragend = function (e) {
          var value;
          var speed;

          if (move) {
            move = false;
            e.stop();
            speed = e.timeStamp - startTimeStamp;
            value = _this37.currentPosition - culcDistance(distance, speed);

            if (value > 0 || value < diffSize) {
              if (value > 0) {
                value = 0;
              } else {
                value = diffSize;
              }
            }

            value = _this37.normalizePositionValue(value);

            _this37.move(value);

            direction = null;
          }

          dragState = 0;
        };

        fns.dragmove = function (e) {
          var point;
          var diff;
          var dir;

          if (!dragState) {
            if (Math.abs(lastXY[axis] - e[axis]) > Math.abs(lastXY[otherAxis] - e[otherAxis])) {
              dragState = 1;
            } else {
              dragState = 2;
            }
          }

          if (move && dragState === 1) {
            point = getXY(e.x, e.y);

            if (point[axis] > point[otherAxis]) {
              e.stop();
              diff = last - point[axis];
              _this37.currentPosition -= diff;
              dir = getDirection(last, point[axis]);

              if (!direction || dir !== direction) {
                distance = 0;
              }

              distance += diff;
              last = point[axis];
              direction = dir;
            }

            _this37.selectorsScroll.setCssProp('transform', 'translate3d(' + convertToTranslateString(_this37.currentPosition, _this37.isHorizontal()) + ', 0)');
          }

          lastXY = {
            x: e.x,
            y: e.y
          };
        };

        this.selectorsContainer.addEvent('mousedrag touchdrag', onDrag);
      };

      _proto10.setContainerCss = function setContainerCss() {
        var css = {};
        var size = this.options.standardSize;

        if (this.state === SELECTORS_STATE.FULLSCREEN) {
          size = this.options.fullscreenSize;
        }

        css['min-' + this.shortSide] = size + 'px';
        css[this.shortSide] = '100%';
        this.instanceNode.setCss(css);
      };

      _proto10.beforeEnterFullscreen = function beforeEnterFullscreen() {
        this.hide();
        this.state = SELECTORS_STATE.FULLSCREEN;
        this.currentStylePosition = this.options.fullscreenPosition;

        if (!this.currentStylePosition) {
          this.instanceNode.setCssProp('display', 'none');
          $(this.instanceNode.node.parentNode).setCssProp('display', 'none');
        }

        this.identifyVariables();
      };

      _proto10.afterEnterFullscreen = function afterEnterFullscreen() {
        var _this38 = this;

        if (this.currentStylePosition) {
          this.instanceNode.setCssProp('display', '');
          $(this.instanceNode.node.parentNode).setCssProp('display', '');
          this.setContainerCss();

          if (this.options.fullscreenAutohide) {
            this.addControl();

            if (this.isActionsEnabled) {
              this.setSelectorsState(true);
            }
          }

          this.removeStyleForIE();
          this.changeSelectors(2).then(function () {
            _this38.getSelectorsSize();

            setTimeout(function () {
              _this38.show();
            }, 150); // must be more than resize timeout

            if (_this38.currentStylePosition && _this38.isActionsEnabled) {
              setTimeout(function () {
                _this38.setSelectorsState(true);
              }, 1000);
            }
          });
        }
      };

      _proto10.beforeExitFullscreen = function beforeExitFullscreen() {
        this.hide();
        this.state = SELECTORS_STATE.STANDARD;
        this.currentStylePosition = this.options.standardPosition;

        if (this.options.fullscreenAutohide) {
          this.removeControl();
        }

        if (!this.currentStylePosition) {
          this.instanceNode.setCssProp('display', 'none');
          $(this.instanceNode.node.parentNode).setCssProp('display', 'none');
        }

        this.identifyVariables();
      };

      _proto10.afterExitFullscreen = function afterExitFullscreen() {
        var _this39 = this;

        if (this.currentStylePosition) {
          this.instanceNode.setCssProp('display', '');
          $(this.instanceNode.node.parentNode).setCssProp('display', '');
          this.setContainerCss();
          this.removeStyleForIE();
          this.changeSelectors(1).then(function () {
            _this39.getSelectorsSize();

            _this39.show();
          });
        }
      };

      _proto10.getPinnedScrollContainer = function getPinnedScrollContainer(pinnedNode) {
        return pinnedNode ? pinnedNode.node.firstChild.firstChild : null;
      };

      _proto10.getCurrentStylePosition = function getCurrentStylePosition() {
        return this.getCurrentStylePosition;
      };

      _proto10.removeStyleForIE = function removeStyleForIE() {
        if ($J.browser.uaName === 'ie') {
          this.selectorsScroll.setCssProp(this.shortSide, '');
        }
      };

      _proto10.isSelectorsActionEnabled = function isSelectorsActionEnabled() {
        return this.isActionsEnabled;
      };

      _proto10.getShortSide = function getShortSide() {
        return this.shortSide;
      };

      _proto10.sortSelectorsByUUID = function sortSelectorsByUUID(uuidList) {
        var _this40 = this;

        var sortredSelectors = [];
        uuidList.forEach(function (uuid) {
          for (var i = 0, l = _this40.selectors.length; i < l; i++) {
            if (uuid === _this40.selectors[i].UUID) {
              sortredSelectors.push(_this40.selectors[i]);
              break;
            }
          }
        });
        this.selectors = sortredSelectors;
      };

      _proto10.sortNodesSelectors = function sortNodesSelectors(lengthOrder) {
        for (var i = lengthOrder - 1; i >= 0; i--) {
          this.selectorsScroll.node.insertBefore(this.selectors[i].getContainer().node, this.selectorsScroll.node.firstChild);
        }
      };

      _proto10.rewriteSelectorsIndexes = function rewriteSelectorsIndexes() {
        this.selectors.forEach(function (selector, index) {
          selector.setIndex(index);
        });
      };

      _proto10.sortSelectors = function sortSelectors(uuidList, orderLength) {
        this.sortSelectorsByUUID(uuidList);
        this.rewriteSelectorsIndexes();
        this.sortNodesSelectors(orderLength);
      };

      _proto10.onResize = function onResize() {
        var _this41 = this;

        if (this.isDone && this.currentStylePosition && !this.isDestroyed) {
          clearTimeout(this.resizeTimeout);
          this.resizeTimeout = setTimeout(function () {
            // the timer helps calc new size of selectors after changing size of images
            var itemIndex = _this41.getActiveItem();

            _this41.clearAnimation();

            var selectorSize = 0;

            _this41.selectors.forEach(function (selector) {
              if (!selector.isDestroyed()) {
                var size = selector.getSize();
                selectorSize += size[_this41.longSide];
              }
            });

            if ($J.browser.uaName === 'ie') {
              if (_this41.isGrid()) {
                selectorSize = '';
              }

              _this41.selectorsScroll.setCssProp(_this41.longSide, selectorSize);
            }

            _this41.getSizes();

            _this41.calculateContainerScroll();

            _this41.setActiveItem(itemIndex);

            _this41.normalizePositionValue();

            _this41.jump(itemIndex, true);

            _this41.show();
          }, 100);
        }
      };

      _proto10.destroy = function destroy() {
        this.isDestroyed = true;
        clearTimeout(this.resizeTimeout);
        this.instanceNode.removeEvent('transitionend');
        this.removeControl();
        this.controlButton = null;
        this.off('selectorAction');
        this.off('resize');
        this.clearAnimation();

        if (this.arrows) {
          this.arrows.destroy();
          this.arrows = null;
          this.off('arrowAction');
        }

        this.selectors.forEach(function (selector) {
          selector.destroy();
        });
        this.selectorsScroll.remove();
        this.selectorsScroll = null;
        this.selectorsContainer.remove();
        this.selectorsContainer = null;
        this.instanceNode.remove();
        this.instanceNode = null;
        this.currentActiveItem = null;

        if (this.blocksPinnedInited) {
          this.hasPinnedSelector = null;
          this.baseSelectorsList = null;
          this.pinnedStartList = null;
          this.pinnedEndList = null;
          this.blocksPinnedInited = false;
          this.pinnedNodeAtEnd = null;
          this.pinnedNodeAtStart = null;
          this.selectorsScrollContainer = null;
          this.pinnedStartList = null;
          this.pinnedEndList = null;
        }

        _EventEmitter7.prototype.destroy.call(this);
      };

      return Selectors_;
    }(EventEmitter);

    return Selectors_;
  }();
  /* eslint-env es6 */

  /* global defaultsVideoOptions */

  /* global EventEmitter */

  /* global helper */

  /* global CSS_MAIN_CLASS */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "slideVideo" }] */


  var slideVideo = function () {
    var correctVideoSrc = function (node) {
      node = $(node);

      var _src = node.attr('data-src');

      if (_src) {
        node.attr('data-src', _src.split('?')[0]);
        node.removeAttr('src');
      } else {
        node.node.src = node.node.src.split('?')[0];
      }

      return node;
    };

    var getOptions = function (node, opts) {
      var options = new $J.Options(defaultsVideoOptions);
      options.fromJSON(opts.common.common);
      options.fromString(opts.local.common);
      options.fromString(node.attr('data-options') || '');

      if ($J.browser.touchScreen && $J.browser.mobile) {
        // options.parseSchema(mobileDefaults, true);
        options.fromJSON(opts.common.mobile);
        options.fromString(opts.local.mobile);
        options.fromString(node.attr('data-mobile-options') || '');
      }

      return options;
    };

    var HTMLVideo = /*#__PURE__*/function (_EventEmitter8) {
      "use strict";

      bHelpers.inheritsLoose(HTMLVideo, _EventEmitter8);

      function HTMLVideo(node, options) {
        var _this42;

        _this42 = _EventEmitter8.call(this) || this;
        _this42.node = $(node);
        _this42.instanceOptions = getOptions(_this42.node, options);

        _this42.option = function () {
          if (arguments.length > 1) {
            return _this42.instanceOptions.set(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
          }

          return _this42.instanceOptions.get(arguments.length <= 0 ? undefined : arguments[0]);
        };

        _this42.type = 'video';
        _this42.player = null;
        _this42.state = globalVariables.VIDEO.NONE;
        _this42.isReady = false;
        _this42.isShown = false;
        _this42.id = null;
        _this42.playDebounce = null;
        _this42.currentTime = 0;
        _this42.videoNode = $J.$new('div');
        _this42.videoWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-video').setCss({
          transition: 'opacity .3 linear'
        });

        _this42.videoWrapper.attr('data-video-type', _this42.type);

        _this42.fullscreen = _this42.option('controls.fullscreen');

        _this42.hide();

        return _this42;
      }

      var _proto11 = HTMLVideo.prototype;

      _proto11.isAutoplay = function isAutoplay() {
        return this.option('autoplay');
      };

      _proto11.onBeforeFullscreenIn = function onBeforeFullscreenIn() {
        this.getCurrentTime();
        this.fullscreen = false;
      };

      _proto11.onAfterFullscreenIn = function onAfterFullscreenIn() {};

      _proto11.onBeforeFullscreenOut = function onBeforeFullscreenOut() {
        this.getCurrentTime();
        this.fullscreen = this.option('controls.fullscreen');
      };

      _proto11.onAfterFullscreenOut = function onAfterFullscreenOut() {};

      _proto11.getSize = function getSize() {
        var _this43 = this;

        return new Promise(function (resolve) {
          var size = _this43.videoWrapper.getSize();

          if (size.width && size.height) {
            resolve(size);
          } else {
            helper.videoModule.getAspectRatio(_this43.node).then(function (aspectratio) {
              if (size.width) {
                size.height = size.width * aspectratio;
              } else {
                size.width = size.height / aspectratio;
              }

              resolve(size);
            }).catch(function () {
              resolve(null);
            });
          }
        });
      };

      _proto11.createPlayer = function createPlayer(player) {
        var _this44 = this;

        this.player = {
          ready: true,
          play: function () {
            _this44.playDebounce();
          },
          pause: function () {
            _this44.player.player.node.pause();
          },
          player: this.node
        };
        this.playDebounce = helper.debounce(function () {
          _this44.player.player.node.play();
        }, 100);

        if (this.option('loop')) {
          this.player.player.attr('loop', 'loop');
        } else {
          this.player.player.removeAttr('loop');
        }

        this.player.player.attr('playsinline', 'playsinline');

        if (this.option('controls.enable')) {
          this.player.player.attr('controls', 'controls');
        } else {
          this.player.player.removeAttr('controls');
        }

        if (this.isAutoplay()) {
          this.player.player.volume = 0;
          this.player.player.attr('muted', 'muted');
        } else {
          this.player.player.volume = this.option('volume') / 100;
        }

        this.player.player.attr('preload', this.option('preload') ? 'auto' : 'none');
        this.setEvents();
        this.emit('slideVideoReady', {
          data: {
            type: this.type,
            error: null
          }
        });
        return Promise.resolve();
      };

      _proto11.getVideoNode = function getVideoNode() {
        return this.videoWrapper;
      };

      _proto11.init = function init() {
        var _this45 = this;

        if (this.type === 'video') {
          var _src = this.node.attr('data-src');

          if (_src) {
            this.node.attr('src', _src);
          }

          $J.$A(this.node.node.children).forEach(function (child) {
            child = $(child);

            if (child && child.getTagName() === 'source') {
              _src = child.attr('data-src');

              if (_src) {
                child.attr('src', _src);

                if ($J.browser.engine === 'gecko') {
                  child.node.parentNode.load();
                }
              }
            }
          });
          this.videoNode = this.node;
        }

        this.id = this.type + '-' + helper.generateUUID();
        this.videoNode.attr('id', this.id);
        this.videoWrapper.append(this.videoNode);
        var data = {
          type: this.type,
          error: null
        };
        helper.videoModule.getAPI(this.node).then(function (player) {
          _this45.createPlayer(player).then(function () {
            data.error = false;
          }).catch(function (_err) {
            data.error = !!_err;
          }).finally(function () {
            _this45.isReady = true; // this.emit('slideVideoReady', { data: data });
          });
        }).catch(function (err) {
          data.error = true;

          _this45.emit('slideVideoReady', {
            data: data
          });
        });
      };

      _proto11.setEvents = function setEvents() {
        var _this46 = this;

        this.player.player.addEvent('play', function (e) {
          e.stop();
          _this46.state = globalVariables.VIDEO.PLAY;

          _this46.emit('slideVideoPlay', {
            data: {
              type: _this46.type
            }
          });
        });
        this.player.player.addEvent('pause', function (e) {
          e.stop();
          _this46.state = globalVariables.VIDEO.PAUSE;

          _this46.emit('slideVideoPause', {
            data: {
              type: _this46.type
            }
          });
        });
        this.player.player.addEvent('ended', function (e) {
          e.stop();
          _this46.state = globalVariables.VIDEO.PAUSE;

          _this46.emit('slideVideoEnd', {
            data: {
              type: _this46.type
            }
          });
        });
      };

      _proto11.play = function play() {
        if (this.player && this.player.ready) {
          this.setCurrentTime();
          this.player.play();
        }
      };

      _proto11.pause = function pause() {
        if (this.player && this.player.ready) {
          this.player.pause();
        }
      };

      _proto11.getCurrentTime = function getCurrentTime() {
        if (this.player && this.player.player) {
          this.currentTime = this.player.player.currentTime;
        }
      };

      _proto11.setCurrentTime = function setCurrentTime() {
        if (this.player && this.player.ready) {
          this.player.player.currentTime = this.currentTime;
        }
      };

      _proto11.isPreStart = function isPreStart() {
        return this.state === globalVariables.VIDEO.NONE;
      };

      _proto11.isPaused = function isPaused() {
        return this.state === globalVariables.VIDEO.PAUSE;
      };

      _proto11.show = function show() {
        this.isShown = true;
        this.videoWrapper.setCssProp('opacity', 1);
      };

      _proto11.hide = function hide() {
        this.isShown = false;
        this.videoWrapper.setCssProp('opacity', 0);
      };

      _proto11.destroy = function destroy() {
        if (this.playDebounce) {
          this.playDebounce.cancel();
          this.playDebounce = null;
        }

        this.pause();
        this.videoWrapper.remove();
        this.node = correctVideoSrc(this.node);

        if (this.type === 'video') {
          $J.$A(this.node.node.children).forEach(function (child) {
            if ($(child).getTagName() === 'source') {
              correctVideoSrc(child);
            }
          });
        }

        _EventEmitter8.prototype.destroy.call(this);
      };

      return HTMLVideo;
    }(EventEmitter);

    var YouTubeVideo = /*#__PURE__*/function (_HTMLVideo) {
      "use strict";

      bHelpers.inheritsLoose(YouTubeVideo, _HTMLVideo);

      function YouTubeVideo(node, options) {
        var _this47;

        _this47 = _HTMLVideo.call(this, node, options) || this;
        _this47.type = 'youtube';
        _this47.playerState = -1;

        _this47.videoWrapper.attr('data-video-type', _this47.type);

        _this47.apiPlayer = null;
        return _this47;
      }

      var _proto12 = YouTubeVideo.prototype;

      _proto12.setCurrentTime = function setCurrentTime() {
        if (this.player && this.player.ready) {
          this.player.player.seekTo(this.currentTime);
        }
      };

      _proto12.getCurrentTime = function getCurrentTime() {
        if (this.player && this.player.player) {
          if (this.player.player.getCurrentTime) {
            this.currentTime = this.player.player.getCurrentTime();
          } else {
            this.currentTime = 0;
          }
        }
      };

      _proto12.destroyVideoPlayer = function destroyVideoPlayer() {
        this.getCurrentTime();

        if (this.player && this.player.player) {
          this.player.ready = false;
          this.player.player.destroy();
        }

        this.playerState = -1;
      };

      _proto12.onBeforeFullscreenIn = function onBeforeFullscreenIn() {
        this.fullscreen = false; // we must destroy and create player because the 'onStateChange' won't work after change DOM

        this.destroyVideoPlayer();
      };

      _proto12.onAfterFullscreenIn = function onAfterFullscreenIn() {
        this.createPlayer(this.apiPlayer);
      };

      _proto12.onBeforeFullscreenOut = function onBeforeFullscreenOut() {
        this.fullscreen = this.option('controls.fullscreen'); // we must destroy and create player because the 'onStateChange' won't work after change DOM

        this.destroyVideoPlayer();
      };

      _proto12.onAfterFullscreenOut = function onAfterFullscreenOut() {
        this.createPlayer(this.apiPlayer);
      };

      _proto12.createPlayer = function createPlayer(player) {
        var _this48 = this;

        this.apiPlayer = player;
        return new Promise(function (resolve, reject) {
          var videoID = helper.videoModule.getId(_this48.node);
          _this48.player = {
            ready: false,
            play: function () {
              _this48.player.player.playVideo();
            },
            pause: function () {
              _this48.player.player.pauseVideo();
            },
            player: new player.Player(_this48.id, {
              videoId: videoID,
              playerVars: {
                playlist: videoID,
                // it is just for loop parameter
                fs: _this48.fullscreen ? 1 : 0,
                rel: 0,
                loop: _this48.option('loop') ? 1 : 0,
                autoplay: 0,
                playsinline: 1,
                controls: _this48.option('controls.enable') ? 1 : 0
              },
              events: {
                'onReady': function () {
                  _this48.playerState = -1;
                  _this48.player.ready = true;

                  _this48.player.player.setVolume(_this48.option('volume'));

                  _this48.emit('slideVideoReady', {
                    data: {
                      type: _this48.type,
                      error: null
                    }
                  });

                  resolve();
                },
                'onError': function (err) {
                  if (err.data === 100) {
                    // 'Video is not found'
                    _this48.player = null;
                  }

                  _this48.emit('slideVideoReady', {
                    data: {
                      type: _this48.type,
                      error: true
                    }
                  });

                  reject(true);
                },
                'onStateChange': _this48.setEvents.bind(_this48)
              }
            })
          };
        });
      };

      _proto12.setEvents = function setEvents(e) {
        var state = (e.target || e.getTarget()).getPlayerState();
        this.playerState = state;

        if (this.state === globalVariables.VIDEO.PLAY) {
          this.state = globalVariables.VIDEO.PAUSE;
        }

        switch (state) {
          case -1:
            break;

          case 0:
            // console.log('finish');
            if (!this.option('loop')) {
              this.player.pause();
            }

            this.emit('slideVideoEnd', {
              data: {
                type: this.type
              }
            });
            break;

          case 1:
            // console.log('play');
            this.state = globalVariables.VIDEO.PLAY;
            this.emit('slideVideoPlay', {
              data: {
                type: this.type
              }
            });
            break;

          case 2:
            // console.log('pause');
            this.state = globalVariables.VIDEO.PAUSE;
            this.emit('slideVideoPause', {
              data: {
                type: this.type
              }
            });
            break;

          case 3:
            // console.log('buffering');
            break;

          case 5:
            // console.log('video cued');
            break;
          // no default
        }
      };

      _proto12.destroy = function destroy() {
        _HTMLVideo.prototype.destroy.call(this);

        if (this.player && this.player.player) {
          this.player.player.destroy();
          this.player.player = null;
        }
      };

      return YouTubeVideo;
    }(HTMLVideo); // urls
    // http://vimeo.com/6701902
    // http://vimeo.com/670190233
    // https://vimeo.com/11111111
    // https://www.vimeo.com/11111111
    // http://player.vimeo.com/video/67019023
    // http://player.vimeo.com/video/67019022?title=0&byline=0&portrait=0
    // https://vimeo.com/channels/11111111
    // http://vimeo.com/channels/vimeogirls/6701902
    // http://vimeo.com/channels/staffpicks/6701902
    // https://vimeo.com/album/2222222/video/11111111
    // https://vimeo.com/groups/name/videos/11111111
    // https://vimeo.com/11111111?param=test
    // wrong
    // http://vimeo.com/videoschool
    // http://vimeo.com/videoschool/archive/behind_the_scenes
    // http://vimeo.com/forums/screening_room
    // http://vimeo.com/forums/screening_room/topic:42708


    var VimeoVideo = /*#__PURE__*/function (_HTMLVideo2) {
      "use strict";

      bHelpers.inheritsLoose(VimeoVideo, _HTMLVideo2);

      function VimeoVideo(node, options) {
        var _this49;

        _this49 = _HTMLVideo2.call(this, node, options) || this;
        _this49.type = 'vimeo';
        _this49.apiPlayer = null;

        _this49.videoWrapper.attr('data-video-type', _this49.type);

        return _this49;
      }

      var _proto13 = VimeoVideo.prototype;

      _proto13.createPlayer = function createPlayer(player) {
        var _this50 = this;

        this.apiPlayer = player;
        return new Promise(function (resolve, reject) {
          _this50.videoNode.attr('data-vimeo-id', helper.videoModule.getId(_this50.node));

          if (player.Player) {
            var tmp = _this50.videoNode.attr('data-src');

            if (tmp) {
              _this50.videoNode.attr('src', tmp);
            }

            var opt = {
              id: helper.videoModule.getId(_this50.node),
              loop: _this50.option('loop'),
              controls: _this50.option('controls.enable'),
              speed: _this50.option('controls.speed')
            };
            _this50.player = {
              ready: false,
              play: function () {
                _this50.player.player.setVolume(0);

                _this50.player.player.play();
              },
              pause: function () {
                _this50.player.player.pause();
              },
              player: new player.Player(_this50.videoNode.node, opt)
            };

            _this50.setEvents(resolve);
          } else {
            reject(true);
          }
        });
      };

      _proto13.destroyVideoPlayer = function destroyVideoPlayer() {
        if (this.player && this.player.player) {
          this.player.ready = false;
          this.player.player.destroy();
        }
      };

      _proto13.play = function play() {
        if (this.player && this.player.ready) {
          this.setCurrentTime();
          this.player.play();
        }
      };

      _proto13.onBeforeFullscreenIn = function onBeforeFullscreenIn() {
        this.destroyVideoPlayer();
      };

      _proto13.onAfterFullscreenIn = function onAfterFullscreenIn() {
        this.createPlayer(this.apiPlayer);
      };

      _proto13.onBeforeFullscreenOut = function onBeforeFullscreenOut() {
        this.destroyVideoPlayer();
      };

      _proto13.onAfterFullscreenOut = function onAfterFullscreenOut() {
        this.createPlayer(this.apiPlayer);
      };

      _proto13.getCurrentTime = function getCurrentTime() {};

      _proto13.setCurrentTime = function setCurrentTime() {
        if (this.player && this.player.ready) {
          this.player.player.setCurrentTime(this.currentTime);
        }
      };

      _proto13.setEvents = function setEvents(callback) {
        var _this51 = this;

        this.player.player.on('play', function () {
          _this51.state = globalVariables.VIDEO.PLAY;

          _this51.emit('slideVideoPlay', {
            data: {
              type: _this51.type
            }
          });
        });
        this.player.player.on('pause', function () {
          _this51.state = globalVariables.VIDEO.PAUSE;

          _this51.emit('slideVideoPause', {
            data: {
              type: _this51.type
            }
          });
        });
        this.player.player.on('ended', function () {
          _this51.state = globalVariables.VIDEO.PAUSE;

          _this51.emit('slideVideoEnd', {
            data: {
              type: _this51.type
            }
          });
        });
        this.player.player.on('loaded', function () {// empty
        });
        this.player.player.on('timeupdate', function (data) {
          _this51.currentTime = data.seconds;
        }); // vimeo api bug
        // If we use the ready event before then we add listerners of vimeo events then events do not work

        if (this.player.player) {
          this.player.player.ready().then(function () {
            _this51.player.ready = true;

            if (_this51.state === globalVariables.VIDEO.PLAY) {
              _this51.state = globalVariables.VIDEO.PAUSE;
            }

            _this51.player.player.setVolume(0); // this.player.player.setVolume(this.option('volume') / 100);


            _this51.emit('slideVideoReady', {
              data: {
                type: _this51.type,
                error: null
              }
            });

            callback();
          });
        } else {
          this.emit('slideVideoReady', {
            data: {
              type: this.type,
              error: new Error('Player does not exist.')
            }
          });
        }
      };

      _proto13.destroy = function destroy() {
        _HTMLVideo2.prototype.destroy.call(this);

        this.videoNode.remove();
        this.videoNode = null;
        this.videoWrapper.remove();
        this.videoWrapper = null;

        if (this.player && this.player.player) {
          this.player.player.destroy();
          this.player.player = null;
        }

        this.node = null;
      };

      return VimeoVideo;
    }(HTMLVideo);

    return {
      HTMLVideo: HTMLVideo,
      YouTubeVideo: YouTubeVideo,
      VimeoVideo: VimeoVideo
    };
  }();
  /* eslint-env es6 */

  /* global helper */

  /* global $, $J, EventEmitter, SocialButtons */

  /* global ComponentLoader, ResponsiveImage */

  /* eslint-disable no-lonely-if */

  /* global SirvService, CSS_MAIN_CLASS, SELECTOR_TAG, SELECTOR_CLASS, slideVideo */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Slide" }] */


  var Slide = function () {
    var CAN_ZOOM_CLASS = CSS_MAIN_CLASS + '-can-zoom';
    /**
     * because that css can take much time for loading
     * and we can get wrong sizes
     */

    var NECESSARY_CSS = {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    };

    var getContentSize = function (node, count) {
      return new Promise(function (resolve) {
        node = $(node);

        if (count === undefined) {
          count = 10;
        }

        if (count > 0) {
          var size = node.getSize();

          if (!size.width || !size.height) {
            setTimeout(function () {
              count -= 1;
              getContentSize(node, count).then(resolve);
            }, 32);
          } else {
            resolve(size);
          }
        } else {
          resolve(null);
        }
      });
    };

    var findSomethingForSelector = function (node) {
      var result = {
        type: 'node',
        data: null
      };

      if (helper.videoModule.isVideo(node)) {
        result.type = helper.videoModule.getType(node);

        if (!result.type) {
          result.data = $J.$new('div');
        }
      } else {
        var tmp;
        var src;

        if ($(node).getTagName() === 'img') {
          tmp = node;
        } else {
          try {
            tmp = node.getElementsByTagName('img')[0];
          } catch (e) {// empty
          }
        }

        if (tmp) {
          src = helper.sliderLib.getSrc($(tmp).attr('src')) || helper.sliderLib.getSrc($(tmp).attr('data-src'));
        }

        if (src) {
          result.type = 'img';
          result.data = src;
        } else {
          if (node.cloneNode) {
            tmp = node.cloneNode(true);
          } else {
            tmp = $J.$new('div');
          }

          result.data = tmp;
        }
      }

      return result;
    };

    var getCustomSelectorNode = function (node) {
      var result = $(node.node.querySelector(SELECTOR_TAG));

      if (!result) {
        if (node.getTagName() === SELECTOR_TAG) {
          result = node;
        } else {
          result = null;
        }
      }

      return result;
    };

    var Slide_ = /*#__PURE__*/function (_EventEmitter9) {
      "use strict";

      bHelpers.inheritsLoose(Slide_, _EventEmitter9);

      function Slide_(node, index, options, isCustomAdded) {
        var _this52;

        _this52 = _EventEmitter9.call(this) || this;
        _this52.$J_UUID = $J.$uuid(bHelpers.assertThisInitialized(_this52));
        _this52.groups = ($(node).attr('data-group') || '').split(/\s*(?:,|$)\s*/);
        var slideData = Slide.parse(node);
        _this52.id = slideData.id; // data-id attr

        _this52.enabled = slideData.enabled;
        _this52.type = slideData.type;
        _this52.url = slideData.url;
        _this52.slideContent = $(node);
        _this52.index = index;
        _this52.isCustomAdded = isCustomAdded || false;
        _this52.options = {};

        _this52.setOptions(options);

        _this52.instanceNode = $J.$new('div').addClass(CSS_MAIN_CLASS + '-slide').setCss({
          position: 'absolute'
        });

        _this52.instanceNode.setCss(NECESSARY_CSS);

        _this52.contentWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-content');

        _this52.contentWrapper.setCss(NECESSARY_CSS);

        _this52.fullscreenOnlyNode = null;
        _this52.selector = {
          UUID: _this52.$J_UUID,
          isCustom: false,
          node: getCustomSelectorNode(_this52.slideContent),
          isSirv: false,
          isVideo: false,
          selectorContent: null,
          size: {
            width: 0,
            height: 0
          },
          src: null,
          srcset: null,
          pinned: null,
          activated: true,
          infoPromise: null,
          isStatic: false
        };
        _this52.selector.isStatic = Slide_.checkNonSirv(_this52.selector.node);
        _this52.selector.pinned = Slide_.findPinnedSelectorSide(_this52.slideContent.node.querySelector(SELECTOR_TAG) || _this52.slideContent.node);
        _this52.selector.isCustom = !!_this52.selector.node;
        _this52.thumbnailReferrerPolicy = _this52.getSelectorReferrerPolicy();
        _this52.availableSlide = true;
        _this52.isStartedFullInit = false;
        _this52.fullscreenState = globalVariables.FULLSCREEN.CLOSED;
        _this52.isStarted = false;
        _this52.sirvService = null;
        _this52.componentSize = null;
        _this52.inView = false;
        _this52.isActive = false;
        _this52.isReady = false;
        _this52.video = null;
        _this52.isVideoPaused = false;
        _this52.isVideoReady = false;
        _this52.slideShownBy = globalVariables.SLIDE_SHOWN_BY.NONE;
        _this52.componentLoader = null;
        _this52.infoSize = null;
        _this52.sizePromise = null;
        _this52.isInDom = 0; // 0 / 1

        _this52.multiImages = [];
        _this52.lastOriginNode = null;
        _this52.dataThumbnailImage = _this52.getThumbnailImage();
        _this52.dataThumbnailHtml = _this52.slideContent.attr('data-thumbnail-html');
        _this52.dataHiddenSelector = _this52.slideContent.hasAttribute('data-hidden-selector'); // Disables switching slides by swipe on touchscreen.

        _this52.swipeDisabled = _this52.slideContent.hasAttribute('data-swipe-disabled');
        _this52.spinWasInited = false;
        _this52.socialbuttons = null;
        _this52.getVideoThumbnailPromise = null;
        _this52.isPlaceholder = false;
        _this52.customThumbnailImageClassPromise = null;
        var this_ = bHelpers.assertThisInitialized(_this52);
        _this52.api = {
          get index() {
            return this_.index;
          },

          get component() {
            if (this_.sirvService) {
              return globalVariables.SLIDE.NAMES[this_.sirvService.getType()];
            }

            return 'unknown';
          },

          get groups() {
            return this_.groups;
          },

          get thumbnail() {
            return this_.selector.node.node;
          },

          isDisabled: function () {
            return !this_.enabled;
          },
          isActive: function () {
            return this_.isActive;
          },
          getSelector: function () {
            return this.thumbnail;
          } // for backward compatibility

        };

        _this52.sendEventCloseFullscreenByClick = function (e) {
          e.stop();

          _this52.emit('goToFullscreenOut');
        };

        _this52.beforeParseSlide();

        _this52.parseSlide();

        return _this52;
      }

      Slide_.findPinnedSelectorSide = function findPinnedSelectorSide(node) {
        if (node.hasAttribute('data-pinned')) {
          var attrValue = $J.$(node).attr('data-pinned');
          return attrValue !== 'start' ? 'end' : attrValue;
        }

        return null;
      };

      Slide_.parse = function parse(node) {
        node = $(node); // const result = { node: node.node };

        var result = {};
        result.node = node.node;
        result.id = node.attr('data-id');
        var url = null;
        var type = globalVariables.SLIDE.TYPES.HTML;
        var enabled = true;
        /*
            spin, zoom, image, video, html
        */

        if (Slide.isSirvComponent(node)) {
          var tmp = helper.getSirvType(node);
          type = tmp.type;
          url = tmp.imgSrc;
        } else if (helper.videoModule.isVideo(node)) {
          type = globalVariables.SLIDE.TYPES.VIDEO;
          url = helper.videoModule.getSrc(node);
        } else if (node.getTagName() === 'img' || node.getTagName() === 'div' && node.attr('data-src')) {
          type = globalVariables.SLIDE.TYPES.IMAGE;
          url = node.attr('data-src') || node.attr('src');
        }

        result.type = type;
        result.url = url;
        var slideIsDisabled = node.node.getAttribute('data-disabled'); // don't use .attr() method

        if (slideIsDisabled && slideIsDisabled !== 'false' || slideIsDisabled === '') {
          enabled = false;
        }

        result.enabled = enabled;
        return result;
      };

      Slide_.checkNonSirv = function checkNonSirv(node) {
        if (node && $(node).attr('data-type') === 'static') {
          return true;
        }

        return false;
      };

      Slide_.isSirvComponent = function isSirvComponent(node) {
        node = $(node); // const dataEffect = node.attr('data-type') || node.attr('data-effect');

        var dataSrc = node.attr('data-src');
        var src = node.attr('src');
        var nonSirv = Slide.checkNonSirv(node);
        var tagName = node.getTagName();
        var viewContent = node.fetch('view-content');

        if (!nonSirv && ( // (tagName === 'div' && !$J.contains(['youtube', 'vimeo'], helper.videoModule.getType(dataSrc)) && (dataEffect === 'zoom' || helper.isSpin(dataSrc) || helper.isVideo(dataSrc))) ||
        viewContent || tagName === 'div' && !$J.contains(['youtube', 'vimeo'], helper.videoModule.getType(dataSrc)) && dataSrc || tagName === 'img' && (dataSrc || src))) {
          return true;
        }

        return false;
      };

      Slide_.hasComponent = function hasComponent(node) {
        return SirvService.isExist(node);
      };

      var _proto14 = Slide_.prototype;

      _proto14.isSwipeDisabled = function isSwipeDisabled() {
        return this.swipeDisabled;
      };

      _proto14.getThumbnailImage = function getThumbnailImage() {
        var result = this.slideContent.attr('data-thumbnail-image');

        if (!result && this.selector.isCustom) {
          result = this.selector.node.attr('data-src');

          if (!result) {
            var children = this.selector.node.node.children;

            if (children.length === 1 && $(children[0]).getTagName() === 'img') {
              result = $(children[0]).attr('data-src') || $(children[0]).attr('src');
            }
          }
        }

        return result;
      };

      _proto14.startGettingInfo = function startGettingInfo() {
        if (this.isSirv()) {
          this.sirvService.startGettingInfo();
        }
      };

      _proto14.loadContent = function loadContent() {
        var _this53 = this;

        if (this.isSirv()) {
          this.getSlideSize().then(function (infoSize) {
            if (_this53.isInDom) {
              _this53.sirvService.loadContent();
            }
          }).catch(function (err) {});
        }
      };

      _proto14.loadThumbnail = function loadThumbnail() {
        var _this54 = this;

        if (this.isSirv()) {
          this.getSlideSize().then(function (infoSize) {
            if (_this54.isInDom) {
              _this54.sirvService.loadThumbnail();
            }
          }).catch(function (err) {});
        }
      };

      _proto14.isVideoSlide = function isVideoSlide() {
        var result = false;

        if (this.isSirv()) {
          result = this.sirvService.getType() === globalVariables.SLIDE.TYPES.VIDEO;
        } else if (this.video) {
          result = true;
        }

        return result;
      };

      _proto14.belongsTo = function belongsTo(group) {
        var _this55 = this;

        var result = false;

        if (group) {
          if ($J.typeOf(group) === 'string') {
            group = [group];
          }

          result = group.some(function (g) {
            return $J.contains(_this55.groups, g);
          });
        }

        return result;
      };

      _proto14.addGroup = function addGroup(newGroup) {
        var result = false;

        if (newGroup && $J.typeOf(newGroup) === 'string' && !$J.contains(this.groups, newGroup)) {
          result = true;
          this.groups.push(newGroup);
        }

        return result;
      };

      _proto14.removeGroup = function removeGroup(group) {
        var result = false;

        if (group && $J.typeOf(group) === 'string') {
          var index = this.groups.indexOf(group);

          if (index > -1) {
            result = true;
            this.groups.splice(index, 1);
          }
        }

        return result;
      };

      _proto14.isCustomSelector = function isCustomSelector() {
        return this.selector.isCustom;
      };

      _proto14.single = function single(isSingle) {
        if (this.isSirv()) {
          this.broadcast('isSingleSlide', {
            data: {
              isSingle: isSingle
            }
          });
        }
      };

      _proto14.setNewIndex = function setNewIndex(index) {
        this.index = index;
      };

      _proto14.getIndex = function getIndex() {
        return this.index;
      };

      _proto14.checkReadiness = function checkReadiness(eventName, component) {
        var result = false;

        if (this.isSirv() && globalVariables.SLIDE.NAMES[this.sirvService.getType()] === component) {
          if (eventName === 'init') {
            result = this.spinWasInited;
          } else {
            result = this.isReady;
          }
        }

        return result;
      };

      _proto14.sendReadyEvent = function sendReadyEvent(eventName, component) {
        if (this.isSirv() && globalVariables.SLIDE.NAMES[this.sirvService.getType()] === component) {
          this.sirvService.sendEvent(eventName);
        }
      };

      _proto14.createFullscreenOnlyScreen = function createFullscreenOnlyScreen() {
        var _this56 = this;

        if (this.options.fullscreenOnly) {
          this.fullscreenOnlyNode = $J.$new('div').addClass(CSS_MAIN_CLASS + '-fullscreen-always'); // this.fullscreenOnlyNode.addEvent('mousedown touchstart', (e) => {

          this.fullscreenOnlyNode.addEvent('btnclick tap', function (e) {
            e.stop();

            _this56.emit('goToFullscreen');
          });
          this.createPinchEvent(this.fullscreenOnlyNode);
          this.instanceNode.append(this.fullscreenOnlyNode, 'top');
        }
      };

      _proto14.createPinchEvent = function createPinchEvent(node) {
        var _this57 = this;

        if ($J.browser.touchScreen) {
          // difference between scale
          var FS_IN = 2;
          node.addEvent('pinch', function (e) {
            e.stop();

            switch (e.state) {
              case 'pinchend':
                if (_this57.fullscreenState === 0 && e.scale >= FS_IN) {
                  _this57.emit('goToFullscreen');
                }

                break;

              default:
            }
          });
        }
      };

      _proto14.isEnabled = function isEnabled() {
        return this.enabled;
      };

      _proto14.disable = function disable() {
        this.enabled = false;

        if (this.video) {
          this.video.pause();
        }

        if (this.componentLoader) {
          this.componentLoader.hide(true);
        }
      };

      _proto14.enable = function enable() {
        this.enabled = true;
      };

      _proto14.isBlokedTouchdrag = function isBlokedTouchdrag() {
        var result = false;

        if (this.isSirv()) {
          if (this.sirvService.getType() === globalVariables.SLIDE.TYPES.SPIN) {
            result = true;
          } else {
            result = this.sirvService.isEffectActive();
          }
        }

        return result;
      };

      _proto14.setOptions = function setOptions(options) {
        this.options = $J.extend({
          spin: {},
          zoom: {},
          image: {},
          video: {},
          fullscreenOnly: false
        }, options || {});
      };

      _proto14.dragEvent = function dragEvent(type) {
        if (this.sirvService) {
          this.broadcast('dragEvent', {
            data: {
              type: type
            }
          });
        }
      };

      _proto14.startFullInit = function startFullInit(options) {
        if (this.isStartedFullInit) {
          return;
        }

        this.isStartedFullInit = true;

        if (options) {
          this.setOptions(options);
        }

        if (this.sirvService) {
          this.sirvService.startFullInit(options ? this.options : null);
        }

        this.hide();
        this.instanceNode.append(this.contentWrapper);

        if (!this.isSirv()) {
          this.appendToDOM();
        }
      };

      _proto14.createComponentLoader = function createComponentLoader() {
        if (!this.componentLoader) {
          this.componentLoader = new ComponentLoader(this.instanceNode);
          this.componentLoader.show();
        }
      };

      _proto14.isSlideAvailable = function isSlideAvailable() {
        return this.availableSlide;
      };

      _proto14.isSelectorPinned = function isSelectorPinned() {
        return $J.contains(['start', 'end'], this.selector.pinned);
      };

      _proto14.getPinnedSelectorSide = function getPinnedSelectorSide() {
        return this.selector.pinned;
      };

      _proto14.setFullscreenEvents = function setFullscreenEvents() {
        var _this58 = this;

        this.on('beforeFullscreenIn', function (e) {
          if (_this58.fullscreenState === globalVariables.FULLSCREEN.OPENING) {
            e.stopPropagation();
          } else {
            _this58.fullscreenState = globalVariables.FULLSCREEN.OPENING;

            if (_this58.video) {
              _this58.isVideoPaused = _this58.video.isPaused();

              _this58.video.onBeforeFullscreenIn();
            }
          }

          if (_this58.fullscreenOnlyNode) {
            _this58.fullscreenOnlyNode.setCssProp('display', 'none');
          }

          _this58.addEventCloseFullscreenByClick();
        });
        this.on('afterFullscreenIn', function (e) {
          if (_this58.socialbuttons) {
            _this58.socialbuttons.closeButtons();
          }

          if (_this58.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
            e.stopPropagation();
          } else {
            _this58.fullscreenState = globalVariables.FULLSCREEN.OPENED;

            if (_this58.isSirv() && _this58.componentLoader.isHiding()) {
              _this58.componentLoader.hide(true);
            }

            if (_this58.video) {
              _this58.video.onAfterFullscreenIn();

              if (_this58.video.isAutoplay() || !_this58.video.isPreStart()) {
                _this58.playVideo();
              }
            }
          }
        });
        this.on('beforeFullscreenOut', function (e) {
          if (_this58.socialbuttons) {
            _this58.socialbuttons.closeButtons();
          }

          if (_this58.fullscreenState === globalVariables.FULLSCREEN.CLOSING) {
            e.stopPropagation();
          } else {
            _this58.fullscreenState = globalVariables.FULLSCREEN.CLOSING;

            if (_this58.video) {
              _this58.isVideoPaused = _this58.video.isPaused();

              _this58.video.onBeforeFullscreenOut();
            }
          }

          if (_this58.fullscreenOnlyNode) {
            _this58.fullscreenOnlyNode.setCssProp('display', '');
          }
        });
        this.on('afterFullscreenOut', function (e) {
          if (_this58.fullscreenState === globalVariables.FULLSCREEN.CLOSED) {
            e.stopPropagation();
          } else {
            _this58.fullscreenState = globalVariables.FULLSCREEN.CLOSED;

            if (_this58.video) {
              _this58.video.onAfterFullscreenOut();

              if (_this58.video.isAutoplay() || !_this58.video.isPreStart()) {
                _this58.playVideo();
              }
            }
          }

          _this58.removeEventCloseFullscreeByClick();
        });
        this.on('inView', function (e) {
          _this58.inView = e.data;

          if (_this58.video) {
            if (_this58.inView) {
              if (!_this58.isVideoPaused && !_this58.video.isPreStart() || _this58.video.isAutoplay()) {
                _this58.playVideo();
              }
            } else {
              _this58.isVideoPaused = _this58.video.isPaused();

              _this58.video.getCurrentTime();

              _this58.video.pause();
            }
          }
        });
      };

      _proto14.addEventCloseFullscreenByClick = function addEventCloseFullscreenByClick() {
        if (this.options.fullscreenOnly && this.type === globalVariables.SLIDE.TYPES.IMAGE) {
          this.contentWrapper.addEvent('btnclick tap', this.sendEventCloseFullscreenByClick);
          this.slideContent.addEvent('btnclick tap', this.sendEventCloseFullscreenByClick);
        }
      };

      _proto14.removeEventCloseFullscreeByClick = function removeEventCloseFullscreeByClick() {
        if (this.options.fullscreenOnly && this.type === globalVariables.SLIDE.TYPES.IMAGE) {
          this.contentWrapper.removeEvent('btnclick tap', this.sendEventCloseFullscreenByClick);
          this.slideContent.removeEvent('btnclick tap', this.sendEventCloseFullscreenByClick);
        }
      };

      _proto14.isSirv = function isSirv() {
        return !!this.sirvService;
      };

      _proto14.getNode = function getNode() {
        return this.instanceNode;
      };

      _proto14.getOriginNode = function getOriginNode() {
        return this.lastOriginNode || this.slideContent;
      };

      _proto14.getOriginImageUrl = function getOriginImageUrl() {
        if (this.isSirv()) {
          return this.sirvService.getOriginImageUrl();
        }

        return null;
      };

      _proto14.zoomIn = function zoomIn(x, y) {
        this.broadcast('zoomUp', {
          data: {
            x: x,
            y: y
          }
        });
      };

      _proto14.zoomOut = function zoomOut(x, y) {
        this.broadcast('zoomDown', {
          data: {
            x: x,
            y: y
          }
        });
      };

      _proto14.mouseAction = function mouseAction(type, originEvent) {
        if (this.isSirv()) {
          this.broadcast('mouseAction', {
            data: {
              type: type,
              originEvent: originEvent
            }
          });
        }
      };

      _proto14.getZoomData = function getZoomData() {
        if (this.isSirv()) {
          return this.sirvService.getZoomData();
        }

        return null;
      };

      _proto14.getTypeOfSlide = function getTypeOfSlide() {
        var result = null;

        if (this.isSirv()) {
          result = this.sirvService.getType();
        }

        return result;
      };

      _proto14.getOptions = function getOptions() {
        return this.isSirv() ? this.sirvService.getToolOptions() : {};
      };

      _proto14.createSlideApi = function createSlideApi() {
        if (this.isSirv() && !this.isStarted) {
          this.isStarted = true;
          this.api[globalVariables.SLIDE.NAMES[this.sirvService.getType()]] = this.sirvService.getData();
        }
      };

      _proto14.beforeShow = function beforeShow() {
        this.isActive = true;
        this.show();

        if (this.isSirv()) {
          this.sirvService.activate();
        }

        this.createSlideApi();
      };

      _proto14.afterShow = function afterShow(whoUse) {
        this.slideShownBy = whoUse || globalVariables.SLIDE_SHOWN_BY.NONE;
        this.broadcast('startActions', {
          who: this.slideShownBy
        });

        if (this.video && this.video.isAutoplay()) {
          this.playVideo();
        }
      };

      _proto14.beforeHide = function beforeHide() {
        if (this.video) {
          this.video.pause();
        } else {
          this.broadcast('stopActions');
        }
      };

      _proto14.afterHide = function afterHide() {
        this.slideShownBy = globalVariables.SLIDE_SHOWN_BY.NONE;
        this.isActive = false;
        this.hide();

        if (this.isSirv()) {
          this.sirvService.deactivate();
        }

        if (this.socialbuttons) {
          this.socialbuttons.closeButtons();
        }
      };

      _proto14.show = function show() {
        this.instanceNode.removeClass(CSS_MAIN_CLASS + '-hidden');
        this.instanceNode.addClass(CSS_MAIN_CLASS + '-shown');
      };

      _proto14.hide = function hide() {
        this.instanceNode.removeClass(CSS_MAIN_CLASS + '-shown');
        this.instanceNode.addClass(CSS_MAIN_CLASS + '-hidden');
      };

      _proto14.isZoomSizeExist = function isZoomSizeExist() {
        if (this.isSirv()) {
          return this.sirvService.isZoomSizeExist();
        }

        return false;
      };

      _proto14.startTool = function startTool(isShown, preload, firstSlideAhead) {
        var _this59 = this;

        if (this.isSirv()) {
          this.getSlideSize().then(function (infoSize) {
            if (_this59.isInDom) {
              _this59.sirvService.startTool(isShown || _this59.isActive, preload, firstSlideAhead);

              _this59.addSocialButtons();
            }
          }).catch(function (err) {});
        } else {
          this.getSlideSize().then(function () {
            _this59.emit('contentLoaded', {
              data: {
                slide: {
                  index: _this59.index
                }
              }
            });
          });
        }
      };

      _proto14.getSlideSize = function getSlideSize() {
        var _this60 = this;

        if (!this.sizePromise) {
          this.sizePromise = new Promise(function (resolve, reject) {
            if (_this60.isSirv()) {
              var result = {
                UUID: _this60.$J_UUID
              };

              _this60.sirvService.getInfoSize().then(function (infoSize) {
                if (!_this60.infoSize && infoSize.size) {
                  _this60.infoSize = infoSize.size;
                }

                result.size = _this60.infoSize;
                resolve(result);
              }).catch(function (err) {
                result.error = true;

                if (_this60.sirvService) {
                  var typeOfSirvService = _this60.sirvService.getType();

                  _this60.removeSirvService();

                  if (err && err.error && err.error.status && err.error.status === 404) {
                    result.error = err.error;
                    reject(result);
                  } else if (err && (err.error === 'changeSpinToImage' || typeOfSirvService === globalVariables.SLIDE.TYPES.IMAGE || err.isPlaceholder)) {
                    _this60.isPlaceholder = err.isPlaceholder;

                    if (typeOfSirvService === globalVariables.SLIDE.TYPES.IMAGE) {
                      _this60.isInDom = 0;

                      _this60.appendToDOM();

                      var data = findSomethingForSelector(_this60.slideContent.node);

                      if (!_this60.selector.isCustom) {
                        _this60.selector.src = data ? data.data : null;
                        _this60.selector.isSirv = false;
                      }
                    } else {
                      _this60.changeSpinToImage();
                    } // финт ушами


                    var oldPromise = _this60.sizePromise;
                    _this60.sizePromise = null;

                    var newPromise = _this60.getSlideSize();

                    _this60.sizePromise = oldPromise;
                    newPromise.then(resolve).catch(reject);
                  } else {
                    result.error = {
                      status: 404
                    };
                    reject(result);
                  }
                } else {
                  result.error = {
                    status: 404
                  };
                  reject(result);
                }
              }).finally(function () {
                if (_this60.isCustomAdded) {
                  _this60.emit('infoReady', {
                    data: {
                      index: _this60.index
                    }
                  });
                }
              });
            } else {
              var img;
              var src;

              if (_this60.slideContent.getTagName() === 'img') {
                img = _this60.slideContent.node;
              } else {
                try {
                  img = _this60.slideContent.node.getElementsByTagName('img')[0];
                } catch (e) {// empty
                }
              }

              if (img) {
                src = helper.sliderLib.getSrc($(img).attr('src'));

                if (!src) {
                  src = helper.sliderLib.getSrc($(img).attr('data-src'));
                } // } else {
                //     src = helper.sliderLib.getSrc($(img).attr('data-src'));

              }

              if (src) {
                helper.loadImage(src).then(function (imageData) {
                  _this60.infoSize = imageData.size;
                  resolve({
                    size: _this60.infoSize,
                    UUID: _this60.$J_UUID
                  });
                }).catch(function (error) {
                  resolve({
                    size: _this60.infoSize,
                    UUID: _this60.$J_UUID,
                    error: {
                      status: 404
                    }
                  });
                });
              } else {
                if (_this60.video) {
                  _this60.video.getSize().then(function (size) {
                    _this60.infoSize = size || {
                      width: 0,
                      height: 0
                    };
                    resolve({
                      size: _this60.infoSize,
                      UUID: _this60.$J_UUID
                    });
                  }).catch(function (err) {
                    reject({
                      size: _this60.infoSize,
                      UUID: _this60.$J_UUID,
                      error: err
                    });
                  });
                } else {
                  getContentSize(_this60.slideContent.node).then(function (size) {
                    _this60.infoSize = size || {
                      width: 0,
                      height: 0
                    };
                    resolve({
                      size: _this60.infoSize,
                      UUID: _this60.$J_UUID
                    });
                  }).catch(function (err) {
                    reject({
                      size: _this60.infoSize,
                      UUID: _this60.$J_UUID,
                      error: err
                    });
                  });
                }
              }
            }
          });
        }

        return this.sizePromise;
      };

      _proto14.getData = function getData() {
        return this.api;
      };

      _proto14.removeSirvService = function removeSirvService() {
        this.infoSize = null;

        if (this.slideContent) {
          this.slideContent.remove();
        }

        if (this.selector.node) {
          this.selector.node.removeAttr('data-type');
        }

        if (this.sirvService) {
          this.sirvService.destroy();
          this.sirvService = null;
        }

        this.selector.isSirv = false;
        this.off('stats');
        this.off('componentEvent');
        this.off('beforeFullscreenIn');
        this.off('afterFullscreenIn');
        this.off('beforeFullscreenOut');
        this.off('afterFullscreenOut');

        if (this.componentLoader) {
          this.componentLoader.hide(true);
          this.componentLoader.destroy();
          this.componentLoader = null;
        }

        if (this.fullscreenOnlyNode) {
          this.fullscreenOnlyNode.kill();
          this.fullscreenOnlyNode = null;
        }
      };

      _proto14.changeSpinToImage = function changeSpinToImage() {
        this.slideContent.removeClass(CSS_MAIN_CLASS + '-component');
        this.contentWrapper.removeClass(CSS_MAIN_CLASS + '-content-' + globalVariables.SLIDE.NAMES[this.getTypeOfSlide()]);
        this.lastOriginNode = this.slideContent;
        this.slideContent = $J.$new('img', {
          'data-src': this.slideContent.attr('data-src')
        });
        this.slideContent.addClass(CSS_MAIN_CLASS + '-component');
        this.parseSlide();
        this.isInDom = 0;
        this.appendToDOM();

        if (this.isPlaceholder) {
          var data = findSomethingForSelector(this.slideContent);

          if (!this.selector.isCustom) {
            this.selector.src = data ? data.data : null;
          }
        }

        if (this.selector.node && !this.selector.isCustom) {
          this.selector.node.attr('data-type', globalVariables.SLIDE.NAMES[this.getTypeOfSlide()]);
        }

        if (this.isStartedFullInit) {
          this.isStartedFullInit = false;
          this.startFullInit();
        }
      };

      _proto14.setSirvEvents = function setSirvEvents() {
        var _this61 = this;

        this.on('stats', function (e) {
          e.stopEmptyEvent();
          e.data.index = _this61.index;
        }); // init, ready, zoomIn, zoomOut

        this.on('componentEvent', function (e) {
          e.stopEmptyEvent();
          var eventData = e.data.data;
          eventData.type = e.data.type;
          eventData.node = _this61.slideContent;

          if (e.data.type === 'ready') {
            _this61.isReady = true;
          }

          e.data.slide = _this61.getData();
          e.data.componentEventData = eventData;

          if (e.data.component === globalVariables.SLIDE.NAMES[globalVariables.SLIDE.TYPES.SPIN]) {
            if (e.data.type === 'init') {
              _this61.componentLoader.hide();

              _this61.spinWasInited = true;
              var spinTypeClassMap = {
                row: 'spin-x',
                col: 'spin-y',
                'multi-row': 'spin-xy'
              };

              if (_this61.selector.node) {
                _this61.selector.node.addClass(spinTypeClassMap[_this61.sirvService.getSpinOrientation()] || '');
              }
            }
          } else {
            if (e.data.type === 'ready') {
              _this61.componentLoader.hide();
            }
          }

          if (e.data.type === 'ready' && $J.contains(['spin', 'zoom'], e.data.component)) {
            if (_this61.sirvService.isZoomSizeExist()) {
              _this61.contentWrapper.addClass(CAN_ZOOM_CLASS);
            }
          }
        });
      };

      _proto14.addSocialButtons = function addSocialButtons() {
        var _this62 = this;

        if (this.validateComponentSocialButton()) {
          var arr = ['facebook', 'twitter', 'linkedin', 'reddit', 'tumblr', 'pinterest', 'telegram'];
          var sTypes = {};
          arr.forEach(function (value) {
            sTypes[value] = _this62.options['sb' + $J.camelize('-' + value)];
          });
          var dataImageSB = SocialButtons.getDataImage();
          var link = {};
          arr.forEach(function (value) {
            link[value] = _this62.getLinkSocialButton(dataImageSB[value], sTypes[value]);
          });
          this.socialbuttons = new SocialButtons({
            'text': this.slideContent.attr('alt'),
            'link': link,
            'title': this.slideContent.attr('title')
          }, sTypes, this.instanceNode);
        }
      };

      _proto14.validateComponentSocialButton = function validateComponentSocialButton() {
        if (this.options.sbEnable && SocialButtons && !this.socialbuttons) {
          if (this.isSirv() && this.sirvService.getType() !== globalVariables.SLIDE.TYPES.VIDEO || this.video && this.video.type !== 'video' || this.slideContent.getTagName() === 'img') {
            return true;
          }
        }

        return false;
      };

      _proto14.getLinkSocialButton = function getLinkSocialButton(data, isSpin, enable) {
        var result = null;

        if (enable) {
          if (this.isSirv()) {
            result = this.sirvService.getSocialButtonData(data, this.api.component === globalVariables.SLIDE.NAMES[globalVariables.SLIDE.TYPES.SPIN]);
          } else if (this.slideContent.getTagName() === 'iframe') {
            result = this.video.node.attr('data-src');
          } else {
            result = this.slideContent.attr('data-src');
          }
        }

        return result;
      };

      _proto14.searchImagesInHtmlContent = function searchImagesInHtmlContent() {
        var _this63 = this;

        var result = false;
        var images = $J.$A(this.slideContent.node.querySelectorAll('img'));

        if (images.length) {
          result = true;
          this.multiImages = images;
          images.forEach(function (img, index) {
            var isSirvImage = !Slide.checkNonSirv(img);

            if (isSirvImage) {
              if (!_this63.sirvService) {
                _this63.setSirvEvents();

                _this63.selector.isSirv = true;
                _this63.sirvService = new SirvService(img, _this63.options, {
                  quality: _this63.options.quality,
                  hdQuality: _this63.options.hdQuality,
                  isHDQualitySet: _this63.options.isHDQualitySet,
                  always: _this63.options.fullscreenOnly,
                  isFullscreen: _this63.options.isFullscreen,
                  nativeFullscreen: _this63.options.nativeFullscreen
                });

                _this63.sirvService.setParent(_this63);

                _this63.sirvService.start();

                _this63.createSlideApi();
              } else {
                _this63.sirvService.push(img);
              }
            }

            _this63.multiImages.push({
              isSirv: isSirvImage,
              node: img,
              src: $(img).attr('src'),
              datasrc: $(img).attr('data-src')
            });
          });
        }

        return result;
      };

      _proto14.isCustomSlideEmpty = function isCustomSlideEmpty() {
        if (this.isCustomSelector()) {
          var smvSelector = this.slideContent.node.querySelector(SELECTOR_TAG);

          if (smvSelector) {
            $J.$(smvSelector).remove();
            var length = $J.$A(this.slideContent.node.children).length;
            this.slideContent.append(smvSelector);

            if (Slide.isSirvComponent(this.slideContent) && Slide.hasComponent(this.slideContent) && !this.isPlaceholder || length || helper.videoModule.isVideo(this.slideContent)) {
              return false;
            }
          }
        }

        return true;
      };

      _proto14.beforeParseSlide = function beforeParseSlide() {
        if (this.isCustomSelector()) {
          if (this.isCustomSlideEmpty()) {
            this.availableSlide = false;
            this.selector.activated = false;
          }

          this.selector.node.remove();
        }
      };

      _proto14.createImgFromDiv = function createImgFromDiv() {
        if (this.slideContent.getTagName() === 'div' && this.type === globalVariables.SLIDE.TYPES.IMAGE) {
          var old = this.slideContent;
          this.slideContent = $J.$new('img');
          this.slideContent.attr('data-src', this.url);
          var tmp = old.attr('alt');

          if (tmp) {
            this.slideContent.attr('alt', tmp);
          }

          tmp = old.attr('title');

          if (tmp) {
            this.slideContent.attr('title', tmp);
          }

          tmp = old.attr('data-alt');

          if (tmp) {
            this.slideContent.attr('data-alt', tmp);
          }

          tmp = old.attr('data-referrerpolicy');

          if (tmp) {
            this.slideContent.attr('data-referrerpolicy', tmp);
          }
        }
      };

      _proto14.parseSlide = function parseSlide() {
        if (Slide.isSirvComponent(this.slideContent) && Slide.hasComponent(this.slideContent) && !this.isPlaceholder) {
          this.setSirvEvents();
          this.createImgFromDiv();
          this.sirvService = new SirvService(this.slideContent.node, this.options, {
            quality: this.options.quality,
            hdQuality: this.options.hdQuality,
            isHDQualitySet: this.options.isHDQualitySet,
            always: this.options.fullscreenOnly,
            isFullscreen: this.options.isFullscreen,
            nativeFullscreen: this.options.nativeFullscreen
          });
          this.sirvService.setParent(this);
          this.selector.isSirv = true;
          this.sirvService.start();
          this.createSlideApi();
          this.selector.isVideo = this.sirvService.getType() === globalVariables.SLIDE.TYPES.VIDEO;
          this.contentWrapper.addClass(CSS_MAIN_CLASS + '-content-' + globalVariables.SLIDE.NAMES[this.getTypeOfSlide()]);
        } else {
          this.createImgFromDiv();
          this.searchImagesInHtmlContent();

          if (helper.videoModule.isVideo(this.slideContent)) {
            this.selector.isVideo = true;
            this.initVideo();
            this.contentWrapper.addClass(CSS_MAIN_CLASS + '-content-video');
          }
        }

        if (this.dataThumbnailImage || this.dataThumbnailHtml) {
          this.selector.isSirv = false;
        }
      };

      _proto14.appendToDOM = function appendToDOM() {
        if (!this.isInDom) {
          this.isInDom = 1;
          this.createFullscreenOnlyScreen();

          if (this.isSirv() || this.video) {
            this.createComponentLoader();

            if (this.video) {
              this.contentWrapper.append(this.video.getVideoNode());
            } else {
              this.contentWrapper.append(this.slideContent);
            }
          } else {
            if (this.slideContent.getTagName() === 'img') {
              this.contentWrapper.addClass(CSS_MAIN_CLASS + '-slide-img');

              if (!helper.sliderLib.getSrc(this.slideContent.attr('src'))) {
                this.slideContent.attr('src', this.slideContent.attr('data-src'));
              }
            }

            if (this.multiImages.length) {
              this.multiImages.forEach(function (img) {
                if (!img.src && img.datasrc) {
                  $(img.node).attr('src', img.datasrc);
                }
              });
            }

            this.contentWrapper.append(this.slideContent);
          }

          this.setFullscreenEvents();
        }
      };

      _proto14.initVideoPlayer = function initVideoPlayer() {
        if (this.video) {
          this.video.init();
        } else if (this.isSirv() && this.sirvService.getType() === globalVariables.SLIDE.TYPES.VIDEO) {
          this.sirvService.loadVideoSources();
        }
      };

      _proto14.secondSelectorClick = function secondSelectorClick() {
        if (this.isSirv()) {
          this.broadcast('secondSelectorClick', {
            data: {
              slideIndex: this.index
            }
          });
        } else {
          if (this.video) {
            this.video.pause();
          }
        }
      };

      _proto14.isSirvSelector = function isSirvSelector() {
        if (!this.selector.isCustom) {
          return this.isSirv() && this.sirvService.getType() !== globalVariables.SLIDE.TYPES.VIDEO;
        }

        return false;
      };

      _proto14.getSelectorProportion = function getSelectorProportion() {
        var _this64 = this;

        var result;

        if (this.dataThumbnailImage) {
          result = new Promise(function (resolve, reject) {
            _this64.getResponsiveImage().then(function () {
              return resolve($J.extend({}, _this64.selector));
            }).catch(function (error) {
              helper.loadImage(_this64.dataThumbnailImage).then(function (imageData) {
                _this64.selector.size = imageData.size;
                resolve($J.extend({}, _this64.selector));
              }).catch(function (error) {
                reject(error);
              });
            });
          });
        } else if (this.video) {
          // because proportions of video is not the same as video thumbnail proportions
          result = this.getNonSirvVideoThumbnail();
        } else {
          result = this.getSlideSize();
        }

        return result;
      };

      _proto14.getSelectorReferrerPolicy = function getSelectorReferrerPolicy() {
        var baseReferrerPolicy = 'no-referrer-when-downgrade';

        if (this.selector.isCustom) {
          if (this.selector.node.hasAttribute('data-referrerpolicy')) {
            return this.selector.node.attr('data-referrerpolicy');
          }

          var listImg = $J.$A(this.selector.node.node.children).filter(function (item) {
            return $(item).getTagName() === 'img';
          });

          if (listImg.length === 1) {
            return $(listImg[0]).attr('referrerpolicy') || baseReferrerPolicy;
          }
        }

        return this.slideContent.attr('data-referrerpolicy') || this.slideContent.attr('referrerpolicy') || baseReferrerPolicy;
      };

      _proto14.getResponsiveImage = function getResponsiveImage() {
        var _this65 = this;

        if (!this.customThumbnailImageClassPromise) {
          this.customThumbnailImageClassPromise = new Promise(function (resolve, reject) {
            var image = new ResponsiveImage(_this65.dataThumbnailImage);
            image.getImageInfo().then(function (info) {
              _this65.selector.isSirv = true;
              _this65.selector.size = image.getOriginSize();
              resolve(image);
            }).catch(reject);
          });
        }

        return this.customThumbnailImageClassPromise;
      };

      _proto14.getSirvThumbnailForCustomSelector = function getSirvThumbnailForCustomSelector(data_) {
        var _this66 = this;

        return new Promise(function (resolve, reject) {
          _this66.getResponsiveImage().then(function (rImageInstance) {
            var data = rImageInstance.getThumbnail(data_);
            data.referrerpolicy = _this66.thumbnailReferrerPolicy;
            resolve(data);
          }).catch(reject);
        });
      };

      _proto14.getSelectorImgUrl = function getSelectorImgUrl(type, size, crop, watermark) {
        var _this67 = this;

        var data = {
          crop: crop,
          watermark: watermark
        };

        if (size.width) {
          data.width = size.width;
        }

        if (size.height) {
          data.height = size.height;
        }

        var extend = function (_data) {
          if (_data.src) {
            _this67.selector.src = _data.src;
          }

          if (_data.srcset) {
            _this67.selector.srcset = _data.srcset;
          }

          var selectorData = $J.extend({}, _data);
          selectorData = $J.extend(selectorData, _this67.selector);
          return selectorData;
        };

        return new Promise(function (resolve, reject) {
          if (_this67.isSirv()) {
            _this67.sirvService.getInfoSize().then(function (infoSize) {
              if (_this67.selector.isCustom) {
                if (_this67.selector.isStatic) {
                  resolve($J.extend({}, _this67.selector));
                } else {
                  _this67.getSirvThumbnailForCustomSelector(data).then(function (result) {
                    return resolve(extend(result));
                  }).catch(function () {
                    return resolve($J.extend({}, _this67.selector));
                  });
                }
              } else {
                _this67.sirvService.getSelectorImgUrl(data).then(function (result) {
                  result.referrerpolicy = _this67.thumbnailReferrerPolicy;
                  resolve(extend(result));
                }).catch(reject);
              }
            }).catch(reject);
          } else {
            if (_this67.selector.isCustom && _this67.dataThumbnailImage) {
              if (_this67.selector.isStatic) {
                resolve($J.extend({}, _this67.selector));
              } else {
                _this67.getSirvThumbnailForCustomSelector(data).then(function (_result) {
                  return resolve(extend(_result));
                }).catch(function () {
                  return resolve($J.extend({}, _this67.selector));
                });
              }
            } else if (_this67.slideContent.getTagName() === 'img' || _this67.multiImages.length) {
              resolve($J.extend({}, _this67.selector));
            } else if (_this67.video) {
              _this67.getNonSirvVideoThumbnail().then(resolve).catch(reject);
            } // if (this.slideContent.getTagName() === 'img' || this.multiImages.length || this.dataThumbnailImage) {
            //     resolve($J.extend({}, this.selector));
            // } else if (this.video) {
            //     this.getNonSirvVideoThumbnail().then(resolve).catch(reject);
            // }

          }
        });
      };

      _proto14.getNonSirvVideoThumbnail = function getNonSirvVideoThumbnail() {
        var _this68 = this;

        if (!this.getVideoThumbnailPromise) {
          this.getVideoThumbnailPromise = new Promise(function (resolve, reject) {
            helper.videoModule.getImageSrc(_this68.slideContent, true).then(function (data) {
              if (!_this68.selector.isCustom) {
                _this68.selector.src = data.thumbnail.url;
                _this68.selector.size = {
                  width: data.thumbnail.width,
                  height: data.thumbnail.height
                };
              }

              resolve($J.extend({}, _this68.selector));
            }).catch(function (err) {
              if (!err || err === true) {
                err = {
                  UUID: _this68.$J_UUID
                };
              } else {
                err.UUID = _this68.$J_UUID;
              }

              reject(err);
            });
          });
        }

        return this.getVideoThumbnailPromise;
      };

      _proto14.isSpinInited = function isSpinInited() {
        return this.spinWasInited;
      };

      _proto14.isSlideReady = function isSlideReady() {
        return this.isReady;
      };

      _proto14.getSelector = function getSelector() {
        var _this69 = this;

        if (this.dataHiddenSelector) {
          return null;
        }

        if (!this.selector.node) {
          this.selector.node = $J.$new(SELECTOR_TAG);
          this.selector.node.addClass(SELECTOR_CLASS);
        }

        if (this.dataThumbnailImage) {
          var typeOfSlide = this.getTypeOfSlide();

          if (typeOfSlide !== null) {
            this.selector.node.attr('data-type', globalVariables.SLIDE.NAMES[typeOfSlide]);
          }

          this.selector.src = this.dataThumbnailImage;

          if (!this.selector.isStatic) {
            this.selector.infoPromise = new Promise(function (resolve) {
              _this69.getResponsiveImage().catch(function (err) {}).finally(function () {
                resolve(_this69.selector.isSirv, _this69.selector.size);
              });
            });
          }
        } else if (this.dataThumbnailHtml) {
          var tmp = $J.$new('div');
          tmp.node.innerHTML = this.dataThumbnailHtml;
          this.selector.selectorContent = tmp.node.firstChild;
          this.selector.node.attr('data-type', 'html');
        } else if (this.selector.isCustom) {
          this.selector.node.attr('data-type', 'html');
          this.selector.selectorContent = this.selector.node;
        } else {
          if (this.isSirv()) {
            var t = this.getTypeOfSlide();
            this.selector.node.attr('data-type', globalVariables.SLIDE.NAMES[t]);

            if (t === globalVariables.SLIDE.TYPES.SPIN && this.sirvService.isThumbnailGif()) {
              this.selector.node.addClass('spin-thumbnail-gif');
            }
          } else {
            var data = findSomethingForSelector(this.slideContent.node);

            if ($J.contains(['youtube', 'vimeo', 'video'], data.type)) {
              this.selector.node.attr('data-type', data.type);
            } else if (data.type === 'img') {
              this.selector.src = data.data;
            } else {
              this.selector.selectorContent = data.data;
              this.selector.node.attr('data-type', 'html');
            }
          }
        }

        if (this.selector.isCustom) {
          this.selector.node.addClass(CSS_MAIN_CLASS + '-custom-thumbnail');
        }

        this.selector.disabled = !this.enabled;
        return this.selector;
      };

      _proto14.getUUID = function getUUID() {
        return this.$J_UUID;
      };

      _proto14.isSlideActive = function isSlideActive() {
        return this.isActive;
      };

      _proto14.playVideo = function playVideo() {
        if (this.isActive && this.inView && this.video && (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || $J.contains([globalVariables.SLIDE_SHOWN_BY.AUTOPLAY, globalVariables.SLIDE_SHOWN_BY.USER, globalVariables.SLIDE_SHOWN_BY.INIT], this.slideShownBy))) {
          this.video.play();
        }
      };

      _proto14.initVideo = function initVideo() {
        var _this70 = this;

        this.on('slideVideoReady', function (e) {
          e.stop();

          if (!_this70.isVideoReady) {
            _this70.isVideoReady = true;
            _this70.isReady = true;

            _this70.video.show();

            _this70.componentLoader.hide();
          }

          if (_this70.video.isAutoplay() || !_this70.video.isPreStart()) {
            _this70.playVideo();
          }
        });
        this.on('slideVideoPlay', function (e) {
          // e.stop();
          e.data.slide = _this70.getData();

          if (_this70.isVideoPaused && !_this70.video.isAutoplay()) {
            _this70.video.pause();
          }

          _this70.isVideoPaused = false;
        });
        this.on('slideVideoPause', function (e) {
          // e.stop();
          e.data.slide = _this70.getData();
        });
        this.on('slideVideoEnd', function (e) {
          // e.stop();
          e.data.slide = _this70.getData();
        });
        var videoOptions = this.options.video;

        switch (helper.videoModule.getType(this.slideContent)) {
          case 'youtube':
            this.video = new slideVideo.YouTubeVideo(this.slideContent, videoOptions);
            break;

          case 'vimeo':
            this.video = new slideVideo.VimeoVideo(this.slideContent, videoOptions);
            break;

          case 'video':
            this.video = new slideVideo.HTMLVideo(this.slideContent, videoOptions);
            break;

          default: // empty

        }

        this.video.setParent(this);
      };

      _proto14.resize = function resize() {
        if (!this.enabled) {
          return;
        }

        if (this.sirvService) {
          this.sirvService.resize();
          var t = globalVariables.SLIDE.TYPES;

          if (this.isReady && $J.contains([t.SPIN, t.ZOOM], this.getTypeOfSlide())) {
            if (this.sirvService.isZoomSizeExist()) {
              this.contentWrapper.addClass(CAN_ZOOM_CLASS);
            } else {
              this.contentWrapper.removeClass(CAN_ZOOM_CLASS);
            }
          }
        } else {// when video leaves viewport and then appears the browser generates resize event on android
          // if (this.video) {
          //     this.video.pause();
          // }
        }
      };

      _proto14.destroy = function destroy() {
        if (this.sirvService) {
          this.sirvService.destroy();
          this.sirvService = null;
          this.off('stats');
          this.off('componentEvent');
        } else if (this.multiImages.length) {
          this.multiImages.forEach(function (img) {
            if (!img.src && img.datasrc) {
              img.node.removeAttribute('src');
            }
          });
        }

        this.slideContent.del('view-content');
        this.removeEventCloseFullscreeByClick();
        this.sendEventCloseFullscreenByClick = null;

        if (this.lastOriginNode) {
          this.slideContent.remove();
          this.slideContent = this.lastOriginNode;
          this.lastOriginNode = null;
        }

        if (this.fullscreenOnlyNode) {
          this.fullscreenOnlyNode.kill();
          this.fullscreenOnlyNode = null;
        }

        this.off('beforeFullscreenIn');
        this.off('afterFullscreenIn');
        this.off('beforeFullscreenOut');
        this.off('afterFullscreenOut');
        this.off('inView');

        if (this.video) {
          this.off('slideVideoReady');
          this.off('slideVideoPlay');
          this.off('slideVideoPause');
          this.off('slideVideoEnd');
          this.video.destroy();
        }

        this.video = null;

        if (this.componentLoader) {
          this.componentLoader.destroy();
          this.componentLoader = null;
        }

        if (this.socialbuttons) {
          this.socialbuttons.destroy();
        }

        this.sizePromise = null;
        this.componentSize = null;
        this.contentWrapper.remove();
        this.contentWrapper = null;
        this.instanceNode.remove();
        this.instanceNode = null;
        this.slideContent = null;
        this.isReady = false;
        this.availableSlide = null;

        _EventEmitter9.prototype.destroy.call(this);
      };

      return Slide_;
    }(EventEmitter);

    return Slide_;
  }();
  /* eslint-env es6 */

  /* global $, $J, Slide, Selectors, Arrows, Effect, CSS_MAIN_CLASS, SELECTOR_TAG, EventEmitter, ContextMenu, helper, globalVariables, remoteModules, ProductDetail*/

  /* eslint-disable indent */

  /* eslint-disable no-lonely-if */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */


  var isHandset = null; // DIV used to correctly measure viewport height in Safari > 10 on iPhone

  var iPhoneSafariViewportRuler = null;

  var SirvSlider = function () {
    var FULLSCREEN = 'fullscreen';

    var _FULLSCREEN = $J.camelize('-' + FULLSCREEN);

    var STANDARD_BUTTON_CLASS = CSS_MAIN_CLASS + '-button-' + FULLSCREEN + '-open';
    var FULLSCREEN_BUTTON_CLASS = CSS_MAIN_CLASS + '-button-' + FULLSCREEN + '-close';
    var FULLSCREEN_BUTTON_HIDE_CLASS = CSS_MAIN_CLASS + '-button-hidden'; // const SIZE_MESSAGE = 'can\'t get size';

    var PSEUDO_FULLSCREEN_CLASS = CSS_MAIN_CLASS + '-pseudo-' + FULLSCREEN;
    var STANDARD_CSS = {
      width: '100%',
      height: '100%'
    };
    var MIN_AUTOPLAY = 1000;
    var MAX_SLIDES_TO_CHANGE_PRELOAD_BEHAVIOR = 8;

    var isCustomId = function (id) {
      var result = false;
      id = id.split('-');
      id.splice(id.length - 1, 1);
      id = id.join('-');

      if (id === CSS_MAIN_CLASS) {
        result = true;
      }

      return result;
    };

    var getThumbnailsType = function (type) {
      var result = 'thumbnails';

      if (type === 'bullets') {
        result = type;
      }

      return result;
    }; // const getSelectorsSide = (position) => {
    //     let result = null;
    //     switch (position) {
    //         case 'left':
    //         case 'right':
    //             result = 'width';
    //             break;
    //         case 'top':
    //         case 'bottom':
    //             result = 'height';
    //             break;
    //         // no default
    //     }


    var getExistComponents = function (arr, productDetailsText, socialbuttons) {
      var result = [];
      var t = globalVariables.SLIDE.TYPES;
      arr.forEach(function (slide) {
        if (slide.type && !$J.contains([t.IMAGE, t.HTML], slide.type) && !$J.contains(result, slide.type)) {
          result.push(globalVariables.SLIDE.NAMES[slide.type]);
        }
      });

      if (productDetailsText) {
        result.push('productDetail');
      }

      if (socialbuttons) {
        result.push('socialButtons');
      }

      return result;
    };

    var slidePinnedFilter = function (rawSlides) {
      var slides = [];
      var pinnedAtTheEnd = 0;
      var pinnedAtTheStart = 0;
      var dataPinned;
      var currentNode;

      for (var indexSlide = 0, l = rawSlides.length; indexSlide < l; indexSlide++) {
        currentNode = rawSlides[indexSlide];

        if (currentNode.querySelector(SELECTOR_TAG)) {
          currentNode = currentNode.querySelector(SELECTOR_TAG);
        }

        dataPinned = $J.$(currentNode).attr('data-pinned');
        var pinnedAttr = currentNode.hasAttribute('data-pinned');

        if (pinnedAtTheStart >= 3 && dataPinned === 'start' || pinnedAtTheEnd >= 3 && (pinnedAttr && dataPinned && (dataPinned === 'end' || dataPinned !== 'end' && dataPinned !== 'start') || pinnedAttr && !dataPinned)) {
          // eslint-disable-next-line
          continue;
        }

        if (pinnedAtTheStart < 3 && dataPinned === 'start') {
          pinnedAtTheStart++;
        }

        if (pinnedAtTheEnd < 3 && pinnedAttr && dataPinned && (dataPinned === 'end' || dataPinned !== 'end' && dataPinned !== 'start') || pinnedAttr && !dataPinned) {
          pinnedAtTheEnd++;
        }

        slides.push(rawSlides[indexSlide]);
      }

      return slides;
    };

    var Slider = /*#__PURE__*/function (_EventEmitter10) {
      "use strict";

      bHelpers.inheritsLoose(Slider, _EventEmitter10);

      function Slider(node, options) {
        var _this71;

        _this71 = _EventEmitter10.call(this) || this;
        _this71.instanceNode = $(node);
        _this71.instanceOptions = options.options;
        _this71.viewerFileContent = options.viewerFileContent;

        _this71.option = function () {
          if (arguments.length > 1) {
            return _this71.instanceOptions.set(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
          }

          return _this71.instanceOptions.get(arguments.length <= 0 ? undefined : arguments[0]);
        };

        _this71.slideOptions = $J.extend(options.slideOptions, {
          quality: _this71.instanceOptions.isset('quality') ? _this71.option('quality') : null,
          hdQuality: _this71.option('hdQuality'),
          isHDQualitySet: _this71.instanceOptions.isset('hdQuality'),
          fullscreenOnly: _this71.option(FULLSCREEN + '.always'),
          isFullscreen: _this71.option(FULLSCREEN + '.enable'),
          nativeFullscreen: _this71.option(FULLSCREEN + '.native'),
          sbEnable: _this71.option('slide.socialbuttons.enable'),
          sbFacebook: _this71.option('slide.socialbuttons.types.facebook'),
          sbTwitter: _this71.option('slide.socialbuttons.types.twitter'),
          sbLinkedin: _this71.option('slide.socialbuttons.types.linkedin'),
          sbReddit: _this71.option('slide.socialbuttons.types.reddit'),
          sbTumblr: _this71.option('slide.socialbuttons.types.tumblr'),
          sbPinterest: _this71.option('slide.socialbuttons.types.pinterest'),
          sbTelegram: _this71.option('slide.socialbuttons.types.telegram')
        });
        _this71.id = _this71.instanceNode.attr('id');

        if (!_this71.id) {
          _this71.id = CSS_MAIN_CLASS + '-' + helper.generateUUID();

          _this71.instanceNode.attr('id', _this71.id);
        }

        _this71.lazyInit = options.lazyInit;
        _this71.movingContainer = $J.$new('div').addClass(CSS_MAIN_CLASS);
        _this71.slideWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-slides-box');
        _this71.slidesContainer = $J.$new('div').addClass(CSS_MAIN_CLASS + '-slides');
        _this71.selectorsWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-selectors-box');
        _this71.fullScreenBox = $J.$new('div').addClass(CSS_MAIN_CLASS + '-' + FULLSCREEN + '-box');
        _this71.controlsWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-controls');
        _this71.producDetailsText = _this71.instanceNode.attr('data-product-detail');
        _this71.productDetail = null;

        _this71.fullScreenBox.addEvent('mousescroll touchstart', function (e) {
          e.stopDistribution();
        });

        _this71.isReady = false;
        _this71.isMoving = false;
        _this71.isSelectorsReady = false;
        _this71.isToolStarted = false;
        _this71.isInitialized = false;
        _this71.isStartedFullInit = false;
        _this71.inViewModule = null;
        _this71.isInView = false;
        _this71.firstSlideAhead = false;
        _this71.rootMargin = 0;
        _this71.fullscreenButton = null;
        _this71.doSetSize = false;
        _this71.heightProportion = null;
        _this71.slides = [];
        _this71.enabledIndexesOfSlides = [];
        _this71.selectors = null;
        _this71.arrows = null;
        _this71.contextMenu = null;
        _this71.countOfSizes = $([]);
        _this71.isFullscreen = globalVariables.FULLSCREEN.CLOSED;
        _this71.fullscreenStartTime = null;
        _this71.index = 0;
        _this71.movingContainerId = CSS_MAIN_CLASS + '-' + helper.generateUUID();
        _this71.cssRulesId = 'sirv_css_rules-' + helper.generateUUID();
        _this71.isComponentPinching = false;
        _this71.isZoomIn = false;
        _this71.hasSize = false;
        _this71.isPseudo = false;
        _this71.doHistory = true;
        _this71.isAutoplay = _this71.option('slide.autoplay');
        _this71.autoplayDelay = _this71.option('slide.delay');
        _this71.residualAutoplayTime = _this71.autoplayDelay;
        _this71.sliderNodes = [];
        _this71.destroyed = false;
        _this71.autoplayTimer = null;
        _this71.timerRemove = null;
        _this71.onResizeDebounce = helper.debounce(function () {
          _this71.onResizeWithoutSelectors();
        }, 16);
        _this71.selectorsDebounce = null;

        if (_this71.doHistory) {
          _this71.fullscreenViewId = Math.floor(Math.random() * $J.now());
          globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.push(_this71.fullscreenViewId);
        }

        _this71.controlsWrapperWasAppended = false;
        _this71.isStandardGrid = false;
        _this71.isFullscreenGrid = false; // conflict with pinch event make us to inject the timer
        // this.touchDragTimer = null;

        _this71.clearingTouchdragFunction = null;
        _this71.classes = {
          standard: {
            movingContainerClasses: $([]),
            selectorsWrapperClasses: $([])
          },
          fullscreen: {
            movingContainerClasses: $([]),
            selectorsWrapperClasses: $([])
          }
        };
        _this71.externalContainer = null;

        if ($J.browser.mobile) {
          _this71.movingContainer.addClass(CSS_MAIN_CLASS + '-mobile');
        }

        _this71.onResizeHandler = _this71.onResize.bind(bHelpers.assertThisInitialized(_this71));

        _this71.pseudoFSEvent = function (e) {
          if (e.oe.keyCode === 27) {
            // Esc
            $($J.D).removeEvent('keydown', _this71.pseudoFSEvent);

            _this71.exitFullScreen();
          }
        };

        _this71.keyBoardArrowsCallback = function (e) {
          var d;
          var kc = e.oe.keyCode;

          if (_this71.isReady) {
            if ($J.contains([37, 39], kc)) {
              e.stop();
              d = kc === 37 ? 'prev' : 'next';

              _this71.jump(d, 2);
            }
          }
        };

        _this71.onHistoryStateChange = function (e) {
          try {
            if (e.oe.state && e.oe.state.name === 'Sirv.viewer') {
              if (globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.indexOf(e.oe.state.hash) < 0) {
                globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.splice(globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.indexOf(_this71.fullscreenViewId), 1);
                _this71.fullscreenViewId = e.oe.state.hash;
                globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.push(_this71.fullscreenViewId);
              }

              if (e.oe.state.hash === _this71.fullscreenViewId) {
                _this71.enterFullScreen();
              }
            } else {
              if (_this71.isFullscreenState()) {
                _this71.exitFullScreen();
              }
            }
          } catch (ex) {// empty
          }
        };

        var parsedSlides = _this71.getSlides();

        _this71.addComponentsCSS = helper.debounce(function () {
          globalFunctions.rootDOM.addCSSStringToHtml();
        }, 100);
        remoteModules.load(getExistComponents(parsedSlides, _this71.producDetailsText, _this71.option('slide.socialbuttons.enable'))).then(function () {
          if (!_this71.destroyed) {
            globalFunctions.rootDOM.addCSSStringToHtml();
            globalFunctions.rootDOM.addCSSString(_this71.instanceNode.node);

            _this71.setComponentsEvents();

            _this71.createSlides(parsedSlides);

            if ($J.browser.ready || $J.D.node.readyState !== 'loading') {
              _this71.startFullInit();
            }

            if (ProductDetail && _this71.option('productdetail.enable') && _this71.producDetailsText) {
              _this71.createProductDetails();
            }
          }
        });
        return _this71;
      }

      var _proto15 = Slider.prototype;

      _proto15.isFullscreenState = function isFullscreenState() {
        return $J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.OPENED], this.isFullscreen);
      };

      _proto15.createProductDetails = function createProductDetails() {
        this.productDetail = new ProductDetail({
          text: this.producDetailsText,
          position: this.option('productdetail.position')
        }, this.movingContainer, this.fullScreenBox);
      };

      _proto15.setRootMargin = function setRootMargin() {
        var value = parseInt(this.option('threshold'), 10);

        if ($J.typeOf(this.option('threshold')) === 'string') {
          var v = ($J.W.node.innerHeight || $J.D.node.documentElement.clientHeight) / 100 * value;
          value = v;
        }

        this.rootMargin = value;
      };

      _proto15.startFullInit = function startFullInit(options) {
        var _this72 = this;

        // the method must be launched after 'this.createSlides' method
        if (this.isStartedFullInit || !this.slides.length) {
          return;
        }

        this.isStartedFullInit = true;

        if (this.isHiddenSlides()) {
          return;
        }

        if (options) {
          this.instanceOptions = options.options;

          this.option = function () {
            if (arguments.length > 1) {
              return _this72.instanceOptions.set(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
            }

            return _this72.instanceOptions.get(arguments.length <= 0 ? undefined : arguments[0]);
          };

          this.slideOptions = $J.extend(options.slideOptions, {
            fullscreenOnly: this.option(FULLSCREEN + '.always'),
            autoplay: this.option('video.autoplay')
          });
          this.lazyInit = options.lazyInit;
          this.isAutoplay = this.option('slide.autoplay');
          this.autoplayDelay = this.option('slide.delay');
          this.residualAutoplayTime = this.autoplayDelay;
        }

        if (this.option(FULLSCREEN + '.always')) {
          this.movingContainer.addClass(CSS_MAIN_CLASS + '-fullsreen-always');
        }

        if (isHandset === null) {
          isHandset = $J.browser.mobile && window.matchMedia && window.matchMedia('(max-device-width: 767px), (max-device-height: 767px)').matches;
        } // Create a ruler div to properly handle viewport height in Safari (>10) on iPhone with and without address bar, bookmark bar and status bar.
        // if (isHandset && $J.browser.platform === 'ios' && $J.browser.uaName === 'safari' && parseInt($J.browser.uaVersion, 10) > 10) {


        if (isHandset && $J.browser.platform === 'ios') {
          iPhoneSafariViewportRuler = $J.$new('div').setCss({
            position: 'fixed',
            top: 0,
            width: 0,
            height: '100vh'
          });
        }

        this.normalizeOptions();
        this.setRootMargin();
        this.slideWrapper.addClass(CSS_MAIN_CLASS + '-' + (this.option('orientation') === 'horizontal' ? 'h' : 'v'));
        this.index = this.option('slide.first');
        var l = this.slides.length;

        if (this.index > l - 1) {
          this.index = 0;
        }

        if (l > 0 && (!this.slides[this.index].isEnabled() || !this.slides[this.index].isSlideAvailable())) {
          var index = null;

          for (var i = 0; i < l; i++) {
            var tmpIndex = helper.sliderLib.findIndex('next', this.index + i, l, true);

            if (this.slides[tmpIndex].isEnabled() && this.slides[tmpIndex].isSlideAvailable()) {
              index = tmpIndex;
              break;
            }
          }

          if (index === null) {
            // eslint-disable-next-line no-console
            console.warn('Sirv Media Viewer: All items are disabled.', this.instanceNode.node);
            this.emit('destroy', {
              data: {
                id: this.id,
                node: this.instanceNode.node
              }
            });
            return;
          }

          this.index = index;
        }

        this.createContextMenu();
        this.setInViewAction();

        if (this.option('thumbnails.enable') && this.option('thumbnails.target')) {
          this.externalContainer = $($J.D.node.querySelector(this.option('thumbnails.target')));

          if (!this.externalContainer) {
            this.externalContainer = null;
          }
        }

        var fragment = $J.D.node.createDocumentFragment();
        fragment.appendChild(this.movingContainer.node);
        this.movingContainer.setCss(STANDARD_CSS);
        this.movingContainer.setCssProp('font-size', 0);
        this.movingContainer.append(this.slideWrapper); // this.slideWrapper.setCss(STANDARD_CSS);

        this.slides.forEach(function (slide) {
          slide.startFullInit(options ? _this72.slideOptions : null);
        });
        this.appendSelectors(true);
        this.createClasses();
        this.setClasses(); // css takes too long time to loading
        // and we have size because display = block by default
        // if selectors wrapper is vertical orientation
        // this.selectorsWrapper.setCssProp('display', 'inline-block');

        this.instanceNode.append(fragment);
        this.instanceNode.setCssProp('font-size', 0);
        this.slideWrapper.append(this.slidesContainer);
        this.slidesContainer.setCss(STANDARD_CSS);
        this.instanceNode.getSize();
        this.movingContainer.getSize();
        this.selectorsWrapper.getSize();
        this.slideWrapper.getSize();
        var containerHasHeight = this.instanceNode.getSize().height > 0;
        this.createSelectors();

        if (this.selectors && this.isStandardGrid) {
          this.selectorsWrapper.setCss({
            flexBasis: this.option('thumbnails.size') + 'px'
          });
        }

        var steps = 10;

        var getSize = function () {
          if (_this72.destroyed) {
            return;
          }

          var size = _this72.slidesContainer.node.getBoundingClientRect();

          if (!size.height) {
            size = _this72.slideWrapper.node.getBoundingClientRect();
          }

          steps -= 1;

          if (steps > 0 && (!size.width && !size.height || containerHasHeight && !size.height)) {
            setTimeout(getSize, 16);
          } else {
            _this72.instanceNode.setCssProp('font-size', '');

            if (size.width) {
              // size.height / size.width < 0.25 - fix for ie and firefox
              // if (!size.height || size.height / size.width < 0.25) {
              if (!size.height) {
                _this72.doSetSize = true;
              }
            } else {
              // Fix for display none
              _this72.doSetSize = true;
            }

            _this72.slides.forEach(function (slide) {
              if (slide.isSlideAvailable()) {
                _this72.slidesContainer.append(slide.getNode());
              }

              slide.appendToDOM(); // all elements must be in dom

              slide.initVideoPlayer();
            });

            _this72.setClasses();

            _this72.searchingOfProportions();

            if (_this72.selectors) {
              _this72.selectors.init();
            }

            _this72.postInitialization();
          }
        };

        if (this.firstSlideAhead) {
          // if autostart is false
          this.broadcast('inView', {
            data: this.isInView
          });
        }

        setTimeout(getSize, 16);
      };

      _proto15.visibleSlides = function visibleSlides() {
        return this.slides.filter(function (slide) {
          return slide.isSlideAvailable() && slide.isEnabled();
        }).length;
      };

      _proto15.searchingOfProportions = function searchingOfProportions() {
        var _this73 = this;

        var l = this.slides.length;

        var initOtherComponents = function () {
          var i = _this73.index;
          var p = _this73.firstSlideAhead ? false : _this73.option('slide.preload');
          _this73.hasSize = _this73.setContainerSize();

          if (_this73.inViewModule && helper.isIe()) {
            _this73.inViewModule.takeRecords();
          }

          _this73.slides.forEach(function (_slide, index) {
            _slide.startTool(i === index, p, _this73.firstSlideAhead);
          });

          _this73.createEffect();

          _this73.isToolStarted = true;

          _this73.checkSingleSlide();

          _this73.slides[_this73.index].beforeShow();

          _this73.slides[_this73.index].afterShow(globalVariables.SLIDE_SHOWN_BY.INIT);

          _this73.postInitialization();
        };

        var getSlideSize = function (index, indexes) {
          return new Promise(function (resolve, reject) {
            var slide = _this73.slides[index];
            var slidesCount = _this73.slides.length;
            indexes.push(index);

            if (slide) {
              var nextSearching = function () {
                var nextIndex = helper.getArrayIndex(index + 1, l);

                if (slidesCount !== _this73.slides.length && nextIndex > index) {
                  nextIndex = index;
                }

                if ($J.contains(indexes, nextIndex)) {
                  var tmp = _this73.slidesContainer.getSize();

                  if (!tmp.width) {
                    tmp.width = 500; // we don'n have any size
                  }

                  if (!tmp.height) {
                    // it can be video without sizes or html, but we have width
                    tmp.height = tmp.width * 0.5625; // (9/16)
                  }

                  _this73.heightProportion = tmp;
                  resolve();
                } else {
                  getSlideSize(nextIndex, indexes).then(resolve);
                }
              };

              slide.getSlideSize().then(function (data) {
                var size = data.size;

                if (size && size.width && size.height) {
                  _this73.heightProportion = size;
                  resolve();
                } else {
                  nextSearching();
                }
              }).catch(function (err) {
                var _l = _this73.slides.length;

                if (err && err.error && err.error.status === 404) {
                  _l -= 1;

                  _this73.pickOut(err.UUID);
                }

                if (_l > 0) {
                  nextSearching();
                } else {
                  reject();
                }
              });
            }
          });
        };

        if (this.doSetSize) {
          getSlideSize(this.index, []).then(function () {
            initOtherComponents();
          }).catch(function () {});
        } else {
          initOtherComponents();
        }
      };

      _proto15.initTouchDrag = function initTouchDrag() {
        var _this74 = this;

        var axises = ['x', 'left', 'width'];
        var otherAxise = 'y';
        var containerPosition;
        var isMoving = false;
        var startPosition;
        var lastPercent;
        var size;
        var firstSlide = null;
        var middleSlide = null;
        var lastSlide = null;
        var loop = this.option('loop');
        var lastDirection = null;
        var lastPosition = null;
        var makeAnimation = true;
        var isChanging = true;
        var nextSlide = null;
        var useless = null;
        var stateOfScroll = 0; // 0 - nothing, 1 - drag slide, 2 - scroll page

        var lastXY = {
          x: null,
          y: null
        };
        var lastAnimation = false;

        var getSlidePercent = function (value) {
          return value / size * 100;
        };

        var getStyleValue = function (value) {
          var pos = {
            x: 0,
            y: 0
          };
          pos[axises[0]] = value;
          return 'translate3d(' + pos.x + '%, ' + pos.y + '%, 0px)';
        };

        var setCss = function (node, value) {
          if (node) {
            node.getNode().setCssProp('transform', getStyleValue(value));
          }
        };

        var setSlidesCss = function (value) {
          setCss(firstSlide, value - 100);
          setCss(middleSlide, value);
          setCss(lastSlide, value + 100);
        };

        var endOfEffect = function (direction) {
          return new Promise(function (resolve, reject) {
            var tmp;
            var currentSlidePosition = 100;
            var nextSlidePosition = 0;
            var abs = Math.abs(lastPercent);

            if (abs < 25 || stateOfScroll === 2 || direction === 'next' && lastPercent < 0 || direction === 'prev' && lastPercent > 0) {
              isChanging = false;
            }

            if (!isChanging) {
              if (lastPercent < 0) {
                direction = 'prev';
              } else {
                direction = 'next';
              }
            }

            nextSlide = direction === 'next' ? firstSlide : lastSlide;
            useless = direction === 'next' ? lastSlide : firstSlide;

            if (direction !== 'next') {
              currentSlidePosition *= -1;
            }

            if (useless) {
              useless.getNode().setCssProp('transform', '');
              useless.afterHide();
            }

            if (isChanging) {
              middleSlide.beforeHide();

              _this74.sendEvent('beforeSlideIn', {
                slide: nextSlide.getData()
              });

              _this74.sendEvent('beforeSlideOut', {
                slide: middleSlide.getData()
              });

              _this74.index = nextSlide.getIndex();
            } else {
              tmp = currentSlidePosition;
              currentSlidePosition = nextSlidePosition;
              nextSlidePosition = tmp;
              nextSlidePosition *= -1;

              if (abs < 2) {
                makeAnimation = false;
              }
            }

            if (makeAnimation) {
              middleSlide.getNode().addEvent('transitionend', function (e) {
                e.stop();
                resolve();
              });

              if (nextSlide) {
                nextSlide.getNode().setCssProp('transition', 'transform, .3s');
              }

              middleSlide.getNode().setCssProp('transition', 'transform, .3s');

              if (nextSlide) {
                nextSlide.getNode().getSize();
              }

              middleSlide.getNode().getSize();

              if (_this74.selectors) {
                _this74.selectors.setActiveItem(_this74.index);

                _this74.selectors.jump(_this74.index);
              }
            }

            if (nextSlide) {
              setCss(nextSlide, nextSlidePosition);
            }

            setCss(middleSlide, currentSlidePosition);

            if (!makeAnimation) {
              resolve();
            }
          });
        };

        var fullClear = function () {
          if (isMoving) {
            var css = {
              'transform': '',
              'transition': ''
            };
            middleSlide.getNode().removeEvent('transitionend');

            if (nextSlide) {
              if (isChanging) {
                _this74.checkLoop(_this74.index);

                nextSlide.afterShow(globalVariables.SLIDE_SHOWN_BY.USER);
                middleSlide.afterHide();

                _this74.sendEvent('afterSlideIn', {
                  slide: nextSlide.getData()
                });

                _this74.sendEvent('afterSlideOut', {
                  slide: middleSlide.getData()
                });
              } else {
                if (nextSlide) {
                  nextSlide.afterHide();
                }
              }

              if (nextSlide) {
                nextSlide.getNode().setCss(css);
              }
            }

            middleSlide.getNode().setCss(css);
            makeAnimation = true;
            isChanging = true;
            nextSlide = null;
            useless = null;

            _this74.enableFullscreenButton();

            _this74.autoplay();

            isMoving = false;
            _this74.isMoving = false;
            lastDirection = null;
            lastPosition = null;
            firstSlide = null;
            middleSlide = null;
            lastSlide = null;
            lastAnimation = false;
          }
        };

        var getNextSlide = function (direction, fromIndex) {
          var result = null;
          var currentIndex = fromIndex;

          if (currentIndex === $J.U) {
            currentIndex = _this74.index;
          }

          var index = _this74.getNextIndex(direction, currentIndex, _this74.slides.length, loop);

          if (index !== null) {
            var slide = _this74.slides[index];

            if (slide.getIndex() !== _this74.index) {
              if (!slide.isEnabled()) {
                result = getNextSlide(direction, slide.getIndex());
              } else {
                result = slide;
              }
            }
          }

          return result;
        };

        var start = function (e) {
          if (lastAnimation) {
            return;
          }

          fullClear();

          _this74.effect.stop();

          if (_this74.index === null) {
            return;
          }

          middleSlide = _this74.slides[_this74.index];

          if (middleSlide.isSwipeDisabled()) {
            return;
          }

          isMoving = true;
          _this74.isMoving = true;
          containerPosition = _this74.slidesContainer.getPosition()[axises[1]];
          size = _this74.slidesContainer.getSize()[axises[2]];
          lastPosition = e[axises[0]] - containerPosition;
          startPosition = getSlidePercent(lastPosition);
          lastPercent = startPosition; // const l = this.slides.length;
          // firstSlide = this.slides[helper.sliderLib.getIndexFromDirection(this.index, 'prev', l, loop)];
          // lastSlide = this.slides[helper.sliderLib.getIndexFromDirection(this.index, 'next', l, loop)];

          firstSlide = getNextSlide('prev');
          lastSlide = getNextSlide('next');

          if (firstSlide && lastSlide) {
            if (firstSlide.getIndex() === lastSlide.getIndex()) {
              if (firstSlide.getIndex() < middleSlide.getIndex()) {
                lastSlide = null;
              } else {
                firstSlide = null;
              }
            } else if (firstSlide.getIndex() === middleSlide.getIndex() || middleSlide.getIndex() === lastSlide.getIndex()) {
              if (firstSlide.getIndex() === middleSlide.getIndex()) {
                firstSlide = null;
              } else {
                lastSlide = null;
              }
            }
          }

          if (firstSlide) {
            setCss(firstSlide, -100);
            firstSlide.beforeShow();
          }

          if (lastSlide) {
            setCss(lastSlide, 100);
            lastSlide.beforeShow();
          }

          _this74.disableFullscreenButton();
        };

        var move = function (e) {
          var direction;
          var current;

          if (isMoving && !lastAnimation) {
            isMoving = true;
            e.stop();
            current = e[axises[0]] - containerPosition;

            if (current < lastPosition) {
              direction = 'prev';
            } else if (current > lastPosition) {
              direction = 'next';
            } else {
              if (!direction) {
                direction = lastPercent > 0 ? 'next' : 'prev';
              }
            }

            lastPosition = current;
            lastDirection = direction;
            lastPercent = getSlidePercent(lastPosition) - startPosition;

            if (!lastSlide && lastPercent < -10) {
              lastPercent = -10;
            }

            if (!firstSlide && lastPercent > 10) {
              lastPercent = 10;
            }

            setSlidesCss(lastPercent);
          }
        };

        var end = function (e) {
          if (isMoving && !lastAnimation) {
            if (stateOfScroll === 1) {
              e.stop();
            }

            middleSlide.dragEvent(e.state);
            lastAnimation = true;
            endOfEffect(lastDirection).finally(function () {
              lastAnimation = false;
              fullClear();
            });
          }
        };

        var onDrag = function (e) {
          if (_this74.isComponentPinching || _this74.isZoomIn || _this74.slides[_this74.index].isBlokedTouchdrag() || _this74.option(FULLSCREEN + '.always') && _this74.isFullscreen !== globalVariables.FULLSCREEN.OPENED) {
            return;
          }

          if (e.state === 'dragstart') {
            // clearTimeout(this.touchDragTimer);
            lastXY = {
              x: e.x,
              y: e.y
            }; // this.touchDragTimer = setTimeout(() => {

            start(e);
            middleSlide.dragEvent(e.state); // }, 16);
          } else if (e.state === 'dragmove') {
            if (!stateOfScroll) {
              if (Math.abs(lastXY[axises[0]] - e[axises[0]]) > Math.abs(lastXY[otherAxise] - e[otherAxise])) {
                stateOfScroll = 1;
              } else {
                stateOfScroll = 2;
              }
            }

            if (stateOfScroll === 1) {
              move(e);
            }

            lastXY = {
              x: e.x,
              y: e.y
            };
          } else if (e.state === 'dragend') {
            // clearTimeout(this.touchDragTimer);
            // this.touchDragTimer = null;
            end(e);
            stateOfScroll = 0;
            lastXY = {
              x: null,
              y: null
            };
          }
        };

        if (this.option('orientation') === 'vertical') {
          axises = ['y', 'top', 'height'];
          otherAxise = 'x';
        }

        this.clearingTouchdragFunction = fullClear;
        this.slidesContainer.addEvent('touchdrag', onDrag); // this.slidesContainer.addEvent('mousedrag touchdrag', onDrag);
      };

      _proto15.appendSelectors = function appendSelectors(start) {
        var container = this.movingContainer;

        if (this.externalContainer) {
          if (!this.isFullscreenState()) {
            container = this.externalContainer;
            this.selectorsWrapper.addClass(CSS_MAIN_CLASS + '-external');
          } else {
            this.selectorsWrapper.removeClass(CSS_MAIN_CLASS + '-external');
          }
        }

        if (start || this.externalContainer) {
          container.append(this.selectorsWrapper);
        }
      };

      _proto15.createClasses = function createClasses() {
        var _this75 = this;

        var option = this.option;

        var getOrientation = function (value) {
          if ($J.contains(['left', 'right'], value)) {
            return 'v';
          }

          return 'h';
        };

        ['standard', 'fullscreen'].forEach(function (_type) {
          var isStandard = _type === 'standard';
          var en = isStandard ? option('thumbnails.enable') : option('fullscreen.thumbnails.enable');
          var s = isStandard ? option('thumbnails.position') : option('fullscreen.thumbnails.position');
          var ss = getThumbnailsType(isStandard ? option('thumbnails.type') : option('fullscreen.thumbnails.type'));
          var grid = isStandard ? _this75.isStandardGrid : _this75.isFullscreenGrid;

          if (en) {
            if (!isStandard || !_this75.externalContainer) {
              _this75.classes[_type].movingContainerClasses.push(CSS_MAIN_CLASS + '-selectors-' + s);
            }

            _this75.classes[_type].selectorsWrapperClasses.push(CSS_MAIN_CLASS + '-' + ss);

            _this75.classes[_type].selectorsWrapperClasses.push(CSS_MAIN_CLASS + '-' + getOrientation(s));

            if (grid) {
              _this75.classes[_type].selectorsWrapperClasses.push(CSS_MAIN_CLASS + '-grid');
            }

            if (option('fullscreen.thumbnails.autohide') && !isStandard) {
              _this75.classes[_type].movingContainerClasses.push(CSS_MAIN_CLASS + '-autohide');

              _this75.classes[_type].movingContainerClasses.push(CSS_MAIN_CLASS + '-selectors-closed');
            }
          }
        });
      };

      _proto15.changeClasses = function changeClasses(obj, remove) {
        var _this76 = this;

        var action = remove ? 'removeClass' : 'addClass';
        obj.movingContainerClasses.forEach(function (className) {
          _this76.movingContainer[action](className);
        });
        obj.selectorsWrapperClasses.forEach(function (className) {
          _this76.selectorsWrapper[action](className);
        });
      };

      _proto15.setClasses = function setClasses() {
        if (this.isFullscreenState()) {
          this.changeClasses(this.classes.standard, true);
          this.changeClasses(this.classes.fullscreen);
        } else {
          this.changeClasses(this.classes.fullscreen, true);
          this.changeClasses(this.classes.standard);
        }
      };

      _proto15.setInViewAction = function setInViewAction() {
        var _this77 = this;

        if (this.option('autostart') === 'visible') {
          this.inViewModule = new helper.InViewModule(function (entries) {
            entries.forEach(function (entry) {
              var last = _this77.isInView; // https://github.com/verlok/vanilla-lazyload/issues/293#issuecomment-469100338
              // Sometimes 'intersectionRatio' can be 0 but 'isIntersecting' is true

              var iv = entry.isIntersecting || entry.intersectionRatio > 0;

              if (_this77.isFullscreenState() && !iv) {
                iv = true;
              }

              if (last !== iv) {
                _this77.isInView = iv;

                _this77.postInitialization();

                _this77.broadcast('inView', {
                  data: iv
                });

                if (_this77.isInView) {
                  _this77.autoplay();
                } else {
                  _this77.pauseAutoplay();
                }
              }
            });
          }, {
            rootMargin: this.rootMargin + 'px 0px'
          });
          this.inViewModule.observe(this.instanceNode.node);
        } else {
          this.isInView = true;
        }
      };

      _proto15.sendEvent = function sendEvent(nameOfEvent, data) {
        /*
            slider events: [
                'ready',
                'beforeSlideIn',
                'beforeSlideOut',
                'afterSlideIn',
                'afterSlideOut',
                'fullscreenIn',
                'fullscreenOut',
                'enableItem',
                'disableItem'
            ]
        */
        if (!data) {
          data = {};
        }

        data.node = this.instanceNode;

        if (!data.slider) {
          data.slider = {
            type: nameOfEvent
          };
        }

        this.emit('viewerPublicEvent', {
          data: data
        });
      };

      _proto15.checkReadiness = function checkReadiness(eventName, component) {
        var result = false;

        if ($J.contains(['init', 'ready'], eventName)) {
          if (component === 'viewer') {
            if (eventName === 'ready') {
              result = this.isReady;
            }
          } else {
            for (var i = 0, l = this.slides.length; i < l; i++) {
              if (this.slides[i].checkReadiness(eventName, component)) {
                result = true;
                break;
              }
            }
          }
        }

        return result;
      };

      _proto15.sendReadyEvent = function sendReadyEvent(eventName, component) {
        if (component === 'viewer') {
          this.sendEvent('ready');
        } else {
          this.slides.forEach(function (slide) {
            slide.sendReadyEvent(eventName, component);
          });
        }
      };

      _proto15.sendStats = function sendStats(typeOfEvent, data) {
        if (!data) {
          data = {};
        }

        data.slider = this.id;

        if (typeOfEvent) {
          data.data = {};
          data.data.event = typeOfEvent;
        }

        var stats;
        var serverStats;

        switch (data.component) {
          case 'spin':
            stats = {
              account: data.account,
              event: {
                type: data.component,
                name: data.event,
                data: data.data || {},
                sessionId: data.sessionId,
                origin: data.origin
              }
            };
            stats.event[data.event === 'sessionStart' ? 'ts' : 'time'] = data.eventTime;
            serverStats = JSON.parse(JSON.stringify(stats));
            serverStats.event = JSON.stringify(serverStats.event);
            break;
          // no default
        }

        if (stats) {
          if (data.useBeacon === true) {
            helper.sendRawStats(serverStats, true);
          } else {
            setTimeout(function () {
              helper.sendRawStats(serverStats);
            }, 1);
          }

          this.sendEvent('sendStats', $J.detach(stats));
        }
      };

      _proto15.setComponentsEvents = function setComponentsEvents() {
        var _this78 = this;

        // const size = this.slidesContainer.getSize();
        // const getProportionSize = (proportions) => {
        //     let i;
        //     let result = null;
        //     for (i = 0; i < proportions.length; i++) {
        //         if (proportions[i].size) {
        //             result = proportions[i].size;
        //             break;
        //         }
        //     }
        //     return result;
        // };
        var loadContent = function (index) {
          if (_this78.firstSlideAhead && index === _this78.index) {
            var p = _this78.option('slide.preload');

            _this78.enabledIndexesOfSlides.forEach(function (slideIndex) {
              _this78.slides[slideIndex].startGettingInfo();

              if (p) {
                _this78.slides[slideIndex].loadContent();
              } else {
                _this78.slides[slideIndex].loadThumbnail();
              }
            });
          }
        };

        var play = function (index) {
          if (_this78.index === index) {
            _this78.autoplay();
          }
        };

        var pause = function (index) {
          if (_this78.index === index) {
            _this78.pauseAutoplay();
          }
        };

        this.on('stats', function (e) {
          /*
              e.data = {
                  event: 'rotate',  // name of event
                  data: {},         // event data
                  index: 0          // slide Index
                  component: 'spin' // type of component
              }
          */
          e.stopAll();
          var doc = $J.D.node;
          var win = $J.W.node;
          var scrn = win.screen;

          if (e.data.event === 'sessionStart') {
            if (!e.data.data) {
              e.data.data = {};
            }

            e.data.data.screen = {
              width: scrn.width,
              height: scrn.height,
              availWidth: scrn.availWidth,
              availHeight: scrn.availHeight,
              colorDepth: scrn.colorDepth,
              pixelDepth: scrn.pixelDepth
            };
            e.data.data.browser = {
              width: win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth || 0,
              height: win.innerHeight || doc.documentElement.clientWidth || doc.body.clientWidth || 0
            };
          }

          _this78.sendStats(null, e.data);
        });
        this.on('slideVideoPlay', function (e) {
          e.stopAll();
          pause(e.data.slide.index);
        });
        this.on('slideVideoPause', function (e) {
          e.stopAll(); // pause(e.data.slide.index);
        });
        this.on('slideVideoEnd', function (e) {
          e.stopAll();
          play(e.data.slide.index);
        }); // if slide is not sirv component

        this.on('contentLoaded', function (e) {
          e.stopAll();
          loadContent(e.data.slide.index);
        }); // init,ready,zoomIn,zoomOut
        // fullscreenIn, fullscreenOut
        // pinchStart, pinchEnd

        this.on('componentEvent', function (e) {
          var event = e.data.type;
          e.stopAll();

          switch (event) {
            case 'init':
              if (_this78.index === e.data.slide.index || _this78.slides[_this78.index] && _this78.slides[_this78.index].isSpinInited()) {
                _this78.addControllWrapper();

                _this78.enableFullscreenButton();

                _this78.visibleFullscreenButton();
              }

              _this78.sendEvent('componentEvent', e.data);

              break;

            case 'ready':
              if (_this78.index === e.data.slide.index && e.data.component !== 'spin' && (!_this78.slides[e.data.slide.index].isVideoSlide() || _this78.isFullscreenState())) {
                _this78.addControllWrapper();

                _this78.enableFullscreenButton();

                _this78.visibleFullscreenButton();
              }

              _this78.sendEvent('componentEvent', e.data);

              break;

            case 'rotate':
              _this78.sendEvent('componentEvent', e.data);

              break;

            case 'fullscreenIn':
              if (e.data.component === 'video') {
                _this78.sendEvent('componentEvent', e.data);
              } else if (_this78.option(FULLSCREEN + '.enable') && _this78.isFullscreen === globalVariables.FULLSCREEN.CLOSED) {
                _this78.enterFullScreen();
              }

              break;

            case 'fullscreenOut':
              if (e.data.component === 'video') {
                _this78.sendEvent('componentEvent', e.data);
              } else {
                _this78.exitFullScreen();
              }

              break;

            case 'pinchStart':
              // clearTimeout(this.touchDragTimer);
              // this.touchDragTimer = null;
              _this78.isComponentPinching = true;
              break;

            case 'pinchEnd':
              _this78.isComponentPinching = false;
              break;

            case 'zoomIn':
              _this78.isZoomIn = true;
              pause(e.data.slide.index);

              _this78.sendEvent('componentEvent', e.data);

              break;

            case 'zoomOut':
              _this78.isZoomIn = false;
              play(e.data.slide.index);

              _this78.sendEvent('componentEvent', e.data);

              break;

            case 'hotspotOpened':
              pause(e.data.slide.index);
              break;

            case 'hotspotClosed':
              play(e.data.slide.index);
              break;

            case 'spinStart':
              pause(e.data.slide.index);
              break;

            case 'spinEnd':
              play(e.data.slide.index);
              break;

            case 'play':
              if (e.data.component === 'video') {
                pause(e.data.slide.index);

                _this78.sendEvent('componentEvent', e.data);
              }

              break;

            case 'resume':
              if (e.data.component === 'video') {
                pause(e.data.slide.index);

                _this78.sendEvent('componentEvent', e.data);
              }

              break;

            case 'pause':
              if (e.data.component === 'video') {
                _this78.sendEvent('componentEvent', e.data);
              }

              break;

            case 'end':
              if (e.data.component === 'video') {
                play(e.data.slide.index);

                _this78.sendEvent('componentEvent', e.data);
              }

              break;

            case 'seek':
              // video component event
              _this78.sendEvent('componentEvent', e.data);

              break;

            case 'contentLoaded':
              loadContent(e.data.slide.index);
              break;

            default: // no default

          }
        });
        this.on('goTo' + _FULLSCREEN, function (e) {
          e.stopAll();

          if (_this78.option(FULLSCREEN + '.enable') && _this78.isFullscreen === globalVariables.FULLSCREEN.CLOSED) {
            _this78.enterFullScreen();
          }
        });
        this.on('goTo' + _FULLSCREEN + 'Out', function (e) {
          e.stopAll();

          _this78.exitFullScreen();
        });
        this.on('infoReady', function (e) {
          // if slide was added by api
          e.stop();

          if (_this78.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
            var slide = _this78.slides[e.data.index];
            slide.broadcast('before' + _FULLSCREEN + 'In', {
              data: {
                pseudo: _this78.isPseudo
              }
            });
            slide.broadcast('after' + _FULLSCREEN + 'In', {
              data: {
                pseudo: _this78.isPseudo
              }
            });
          }
        });
        this.on(function (e) {
          e.stopAll();
        });
      };

      _proto15.normalizeOptions = function normalizeOptions() {
        var _this79 = this;

        var opts = $(['contextmenu.text.zoom.in', 'contextmenu.text.zoom.out', 'contextmenu.' + FULLSCREEN + '.enter', 'contextmenu.' + FULLSCREEN + '.exit', 'contextmenu.text.download']);

        var isEmpty = function (str) {
          return $J.typeOf(str) === 'string' && str.trim() === '';
        };

        if (this.option('fullscreen.thumbnails.size') === 'auto') {
          this.option('fullscreen.thumbnails.size', this.option('thumbnails.size'));
        }

        if (this.option('slide.animation.type') === 'off') {
          this.option('slide.animation.type', false);
        }

        if (this.option('thumbnails.type') === 'grid') {
          this.isStandardGrid = true;
          this.option('thumbnails.type', 'square');
        }

        if (this.option('fullscreen.thumbnails.type') === 'grid') {
          this.isFullscreenGrid = false;
          this.option('fullscreen.thumbnails.type', 'square');
        }

        opts.forEach(function (opt) {
          if (isEmpty(_this79.option(opt))) {
            _this79.option(opt, false);
          }
        });

        if (this.option('thumbnails.enable') && this.option('thumbnails.target') && this.option('thumbnails.target').trim() === '') {
          this.option('thumbnails.target', false);
        }

        if (this.option('slide.socialbuttons.enable') && !this.option('slide.socialbuttons.types.facebook') && !this.option('slide.socialbuttons.types.twitter') && !this.option('slide.socialbuttons.types.linkedin') && !this.option('slide.socialbuttons.types.reddit') && !this.option('slide.socialbuttons.types.tumblr') && !this.option('slide.socialbuttons.types.pinterest') && !this.option('slide.socialbuttons.types.telegram')) {
          this.option('slide.socialbuttons.enable', false);
        }

        this.slideOptions.sbEnable = this.option('slide.socialbuttons.enable');
      };

      _proto15.addControllWrapper = function addControllWrapper() {
        if (!this.controlsWrapperWasAppended && this.controlsWrapper.node.childNodes.length) {
          this.controlsWrapperWasAppended = true;
          this.slideWrapper.append(this.controlsWrapper);
        }
      };

      _proto15.postInitialization = function postInitialization() {
        var _this80 = this;

        if (!this.isInitialized && this.isInView && this.isSelectorsReady && this.isToolStarted && this.isStartedFullInit) {
          this.isInitialized = true;

          if (!this.hasSize) {
            this.setContainerSize();
          }

          this.broadcast('inView', {
            data: this.isInView
          });
          this.createArrows();

          if (this.selectors) {
            this.selectors.inView(this.isInView, this.instanceNode);
            this.selectors.setActiveItem(this.index);
          }

          if (!$J.browser.mobile) {
            var eventName = 'mouseout';

            if (helper.isIe()) {
              eventName = 'pointerout';
            }

            this.movingContainer.addEvent(eventName, function (e) {
              if (e.pointerType && e.pointerType !== 'mouse') {
                return;
              }

              var toElement = e.getRelated();

              while (toElement && toElement !== _this80.movingContainer.node) {
                toElement = toElement.parentNode;
              }

              if (_this80.movingContainer.node !== toElement && _this80.index !== null) {
                _this80.slides[_this80.index].mouseAction('mouseout', e);
              }
            });
          }

          if (this.slides.length > 1) {
            this.initTouchDrag();
          }

          $($J.W).addEvent('resize', this.onResizeHandler);
          this.showHideArrows();
          this.showHideSelectors();

          if (this.option(FULLSCREEN + '.always')) {
            this.slideWrapper.addClass(globalVariables.CSS_CURSOR_FULSCREEN_ALWAYS);
          }

          this.movingContainer.attr('id', this.movingContainerId);
          this.createFullscreenButton();
          this.addControllWrapper();

          if (this.slides[this.index] && !this.slides[this.index].isSirv() && (!this.slides[this.index].isVideoSlide() || this.isFullscreenState())) {
            this.enableFullscreenButton();
            this.visibleFullscreenButton();
          }

          this.checkLoop(this.index); // we can't reset this style earlier, because youtube and vimeo can't get size if it is first slide

          this.movingContainer.setCssProp('font-size', '');

          if (this.doHistory) {
            $($J.W).addEvent('popstate', this.onHistoryStateChange);
          }

          this.autoplay();
          this.isReady = true;
          this.sendEvent('ready');
        }
      };

      _proto15.addHistory = function addHistory() {
        if (this.doHistory) {
          // Modify browser history so that expanded view can be closed by browser's Back button
          var urlHash = '#sirv-viewer-' + this.fullscreenViewId;

          if ($J.W.node.location.hash !== urlHash) {
            var state = {
              name: 'Sirv.viewer',
              hash: this.fullscreenViewId
            };
            var title = $J.D.node.body.title || 'Sirv viewer';

            try {
              if ($J.W.node.history.state && $J.W.node.history.state.name === 'Sirv.viewer') {
                $J.W.node.history.replaceState(null, title, '');
              }

              $J.W.node.history.pushState(state, title, urlHash);
            } catch (e) {// empty
            }
          }
        }
      };

      _proto15.setContainerSize = function setContainerSize() {
        var result = false;
        var ss = 0;

        if (this.selectors) {
          ss = this.selectorsWrapper.getSize()[this.selectors.getShortSide()];
        }

        var size = this.movingContainer.getSize();
        var selectors = this.option('thumbnails.position');
        var isSelectorsContainer = this.option('thumbnails.enable') && this.canShowSelectors(this.slides.length) && ss > 0 && !this.externalContainer;

        if (size.width || size.height) {
          result = true;

          if (this.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
            this.movingContainer.setCssProp('height', '');
            this.slideWrapper.setCssProp('height', '');
          } else {
            if (this.doSetSize && this.heightProportion) {
              if (isSelectorsContainer && $J.contains(['left', 'right'], selectors)) {
                size.width -= ss;
              }

              var height = size.width * (this.heightProportion.height / this.heightProportion.width);

              if (height > this.heightProportion.height) {
                height = this.heightProportion.height;
              } // if (isSelectorsContainer && $J.contains(['top', 'bottom'], selectors)) { height += ss; }
              // this.movingContainer.setCssProp('height', height + 'px');


              if (!isSelectorsContainer || $J.contains(['left', 'right'], selectors) && !this.isStandardGrid) {
                this.movingContainer.setCssProp('height', height + 'px');
              } else {
                this.slideWrapper.setCssProp('height', height + 'px');
              }
            }
          }
        }

        return result;
      };

      _proto15.findSlideIndex = function findSlideIndex(id) {
        var result = -1;

        for (var i = 0, l = this.slides.length; i < l; i++) {
          if (this.slides[i].id && this.slides[i].id === id) {
            result = this.slides[i].index;
            break;
          }
        }

        return result;
      };

      _proto15.getCountOfEnabledSlides = function getCountOfEnabledSlides(isDisabled) {
        var result = this.enabledIndexesOfSlides.length;

        if (isDisabled) {
          result = this.slides.length - result;
        }

        return result;
      };

      _proto15.getItems = function getItems(settings) {
        /*
            settings = undefined
            settings = {
                enabled: true|false,
                group: 'group'|['group', ...]
            }
        */
        var isEnabled = null;
        var slides = this.slides;

        if (settings) {
          if ($J.defined(settings.enabled)) {
            isEnabled = settings.enabled;
          }

          if (settings.group) {
            slides = this.getSlidesByGroup(settings.group);
          }
        }

        var result = [];
        slides.forEach(function (slide) {
          if (isEnabled === true) {
            if (slide.isEnabled()) {
              result.push(slide.getData());
            }
          } else if (isEnabled === false) {
            if (!slide.isEnabled()) {
              result.push(slide.getData());
            }
          } else {
            result.push(slide.getData());
          }
        });
        return result;
      };

      _proto15.controlEnabledSlides = function controlEnabledSlides(indexOfSlide, remove) {
        if (remove) {
          this.enabledIndexesOfSlides.splice(this.enabledIndexesOfSlides.indexOf(indexOfSlide), 1);
        } else {
          this.enabledIndexesOfSlides.push(indexOfSlide);
          this.enabledIndexesOfSlides = this.enabledIndexesOfSlides.sort(function (a, b) {
            var result = 0;

            if (a < b) {
              result = -1;
            } else if (a > b) {
              result = 1;
            }

            return result;
          });
        }
      };

      _proto15.disableSlide = function disableSlide(indexOfSlide, withoutEvent) {
        var result = false;
        var nextSlide = 'next';
        var l = this.slides.length;

        if ($J.typeOf(indexOfSlide) === 'string') {
          indexOfSlide = this.findSlideIndex(indexOfSlide);
        }

        if ($J.typeOf(indexOfSlide) === 'number' && indexOfSlide >= 0 && indexOfSlide < this.slides.length && this.slides[indexOfSlide].isEnabled()) {
          var slideUUID = this.slides[indexOfSlide].$J_UUID;

          if (this.effect) {
            this.effect.stop();
          }

          if (this.slides[indexOfSlide].isActive) {
            if (this.index === l - 1 && this.option('loop')) {
              nextSlide = 0;
            }

            if (!this.jump(nextSlide, 4, true)) {
              this.slides[indexOfSlide].beforeHide();
              this.slides[indexOfSlide].afterHide();
            }
          }

          if (this.slides[indexOfSlide].isEnabled()) {
            this.controlEnabledSlides(indexOfSlide, true);
          }

          this.slides[indexOfSlide].disable();
          this.checkLoop(this.index);

          if (!this.enabledIndexesOfSlides.length) {
            this.index = null;
          }

          if (this.selectors) {
            this.selectors.disableSelector(slideUUID);
          }

          if (!withoutEvent) {
            this.sendEvent('disableItem', {
              slide: this.slides[indexOfSlide].getData()
            });
          }

          this.checkSingleSlide();
          this.showHideArrows();
          this.showHideSelectors();
          result = true;
        }

        return result;
      };

      _proto15.enableSlide = function enableSlide(slideIndex) {
        var _this81 = this;

        var result = false;

        if ($J.typeOf(slideIndex) === 'string') {
          slideIndex = this.findSlideIndex(slideIndex);
        }

        if ($J.typeOf(slideIndex) === 'number' && slideIndex >= 0 && slideIndex < this.slides.length && !this.slides[slideIndex].isEnabled()) {
          this.slides[slideIndex].startGettingInfo();
          this.slides[slideIndex].loadThumbnail();
          this.slides[slideIndex].enable();
          this.slides[slideIndex].resize();
          var lenghtAvailableSlides = this.enabledIndexesOfSlides.filter(function (index) {
            return _this81.slides[index].isSlideAvailable();
          });

          if (!this.enabledIndexesOfSlides.length) {
            this.index = slideIndex;
          }

          if (this.slides[slideIndex].isSlideAvailable() && !lenghtAvailableSlides.length) {
            this.index = slideIndex;
            this.slides[slideIndex].loadContent();
            this.slides[slideIndex].beforeShow();
            this.slides[slideIndex].afterShow(globalVariables.SLIDE_SHOWN_BY.ENABLE);
          }

          this.controlEnabledSlides(slideIndex);
          this.checkLoop(this.index);

          if (this.selectors) {
            this.selectors.enableSelector(this.slides[slideIndex].getUUID());

            if (this.slides[slideIndex].isSlideAvailable()) {
              this.selectors.setCurrentActiveItemByUUID(this.slides[slideIndex].getUUID());
            }
          }

          this.sendEvent('enableItem', {
            slide: this.slides[slideIndex].getData()
          });
          this.checkSingleSlide();
          this.showHideArrows();
          this.showHideSelectors();
          result = true;
        }

        return result;
      };

      _proto15.getSlidesByGroup = function getSlidesByGroup(group) {
        var result = null;

        if (group) {
          result = [];
          this.slides.forEach(function (slide) {
            if (slide.belongsTo(group)) {
              result.push(slide);
            }
          });
        }

        return result;
      };

      _proto15.enableGroupOfSlides = function enableGroupOfSlides(group) {
        var _this82 = this;

        var result = false;
        var slides = this.getSlidesByGroup(group);

        if (slides && slides.length) {
          result = true;
          slides.forEach(function (slide) {
            _this82.enableSlide(slide.getIndex());
          });
        }

        return result;
      };

      _proto15.disableGroupOfSlides = function disableGroupOfSlides(group) {
        var _this83 = this;

        var result = false;
        var slides = this.getSlidesByGroup(group);

        if (slides && slides.length) {
          result = true;
          slides.forEach(function (slide) {
            _this83.disableSlide(slide.getIndex());
          });
        }

        return result;
      };

      _proto15.switchGroupOfSlides = function switchGroupOfSlides(group) {
        var _this84 = this;

        var result = false;

        if (group) {
          var slides = this.getItems({
            enabled: true
          });
          slides.forEach(function (slide) {
            if (!_this84.slides[slide.index].belongsTo(group)) {
              _this84.disableSlide(slide.index);
            }
          });
          result = this.enableGroupOfSlides(group);
        }

        return result;
      };

      _proto15.jump = function jump(direction, whoUse, fast, cIndex) {
        var result = false;
        var effect = this.option('slide.animation.type');
        var currentIndex = cIndex;
        var isContains = $J.contains(['next', 'prev'], direction);
        var l = this.slides.length;

        if (!this.effect || !this.enabledIndexesOfSlides.length || this.index === null) {
          return result;
        }

        if (currentIndex === $J.U) {
          currentIndex = this.index;
        }

        if (!isContains) {
          var res = this.findSlideIndex(direction);

          if (res >= 0) {
            direction = res;
          }
        }

        var index = helper.sliderLib.findIndex(direction, currentIndex, l, this.option('loop'));

        if (index === null) {
          return result;
        }

        if (this.index !== index) {
          if (!this.slides[index].isEnabled() || !this.slides[index].isSlideAvailable()) {
            if (isContains) {
              result = this.jump(direction, whoUse, fast, index);
            }

            return result;
          }

          clearTimeout(this.autoplayTimer);

          if (!isContains) {
            if (index > this.index) {
              direction = 'next';
            } else {
              direction = 'prev';
            }
          }

          this.checkLoop(index);

          if (!effect || fast) {
            effect = 'blank';
          }

          if (this.selectors) {
            this.selectors.setActiveItem(index);
            this.selectors.jump(index);
          }

          this.effect.make({
            index: this.index,
            node: this.slides[this.index].getNode()
          }, {
            index: index,
            node: this.slides[index].getNode()
          }, {
            effect: effect,
            direction: direction
          }, {
            whoUse: whoUse
          });
          result = true;
        } else {
          this.slides[index].secondSelectorClick();
        }

        this.index = index;
        return result;
      };

      _proto15.checkLoop = function checkLoop(index) {
        var _this85 = this;

        if (this.arrows) {
          var l = this.enabledIndexesOfSlides.filter(function (indexSlide) {
            return !_this85.slides[indexSlide].isSelectorPinned() && _this85.slides[indexSlide].isSlideAvailable();
          }).length;

          if (l < 2) {
            this.arrows.disable('backward');
            this.arrows.disable('forward');
          } else if (!this.option('loop')) {
            var newIndex = this.enabledIndexesOfSlides.indexOf(index);
            this.arrows.disable();

            if (newIndex === 0 || l === 1) {
              this.arrows.disable('backward');
            }

            if (newIndex === l - 1 || l === 1) {
              this.arrows.disable('forward');
            }
          } else {
            this.arrows.disable();
          }
        }
      };

      _proto15.createFullscreenButton = function createFullscreenButton() {
        var _this86 = this;

        if (!this.option(FULLSCREEN + '.enable') || this.fullscreenButton) {
          return;
        }

        this.fullscreenButton = $J.$new('div').addClass(CSS_MAIN_CLASS + '-button').addClass(CSS_MAIN_CLASS + '-button-' + FULLSCREEN).addClass(STANDARD_BUTTON_CLASS);
        this.fullscreenButton.append($J.$new('div').addClass(CSS_MAIN_CLASS + '-icon'));
        this.disableFullscreenButton();
        this.hideFullscreenButton();
        this.fullscreenButton.addEvent('btnclick tap', function (e) {
          e.stop();

          if (_this86.isFullscreen === globalVariables.FULLSCREEN.CLOSED || _this86.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
            _this86.disableFullscreenButton();

            _this86.hideFullscreenButton();

            if (_this86.isFullscreen === globalVariables.FULLSCREEN.CLOSED) {
              _this86.enterFullScreen();
            } else {
              _this86.exitFullScreen();
            }
          }
        });
        this.controlsWrapper.append(this.fullscreenButton);

        if (this.slides[this.index].isSlideReady()) {
          setTimeout(function () {
            if (!_this86.slides[_this86.index].isVideoSlide() || _this86.isFullscreenState()) {
              _this86.enableFullscreenButton();

              _this86.visibleFullscreenButton();
            }
          }, 0);
        }
      };

      _proto15.visibleFullscreenButton = function visibleFullscreenButton() {
        if (this.fullscreenButton) {
          this.fullscreenButton.removeClass(FULLSCREEN_BUTTON_HIDE_CLASS);
        }
      };

      _proto15.hideFullscreenButton = function hideFullscreenButton() {
        if (this.fullscreenButton) {
          this.fullscreenButton.addClass(FULLSCREEN_BUTTON_HIDE_CLASS);
        }
      };

      _proto15.enableFullscreenButton = function enableFullscreenButton() {
        if (this.fullscreenButton) {
          this.fullscreenButton.removeAttr('disabled');
        }
      };

      _proto15.disableFullscreenButton = function disableFullscreenButton() {
        if (this.fullscreenButton) {
          this.fullscreenButton.attr('disabled', 'disabled');
        }
      };

      _proto15.createEffect = function createEffect() {
        var _this87 = this;

        this.effect = new Effect({
          time: this.option('slide.animation.duration'),
          orientation: this.option('orientation')
        });
        this.effect.setParent(this);
        this.on('effectStart', function (e) {
          e.stopAll();
          _this87.isMoving = true;

          _this87.disableFullscreenButton();

          if (_this87.slides[e.indexes[1]].isVideoSlide() && _this87.isFullscreen !== globalVariables.FULLSCREEN.OPENED) {
            _this87.hideFullscreenButton();
          }

          _this87.slides[e.indexes[0]].beforeHide();

          _this87.slides[e.indexes[1]].beforeShow();

          if (e.data.callbackData.whoUse !== 4) {
            _this87.sendEvent('beforeSlideIn', {
              slide: _this87.slides[e.indexes[1]].getData()
            });

            _this87.sendEvent('beforeSlideOut', {
              slide: _this87.slides[e.indexes[0]].getData()
            });
          }
        });
        this.on('effectEnd', function (e) {
          e.stopAll();

          if (!_this87.slides[e.indexes[1]].isVideoSlide() || _this87.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
            _this87.enableFullscreenButton();

            _this87.visibleFullscreenButton();
          }

          _this87.slides[e.indexes[0]].afterHide();

          _this87.slides[e.indexes[1]].afterShow(e.data.callbackData.whoUse);

          if (e.data.callbackData.whoUse !== 4) {
            _this87.sendEvent('afterSlideIn', {
              slide: _this87.slides[e.indexes[1]].getData()
            });

            _this87.sendEvent('afterSlideOut', {
              slide: _this87.slides[e.indexes[0]].getData()
            });
          }

          _this87.autoplay();

          _this87.isMoving = false;
          _this87.residualAutoplayTime = _this87.autoplayDelay;
        });
      };

      _proto15.createArrows = function createArrows() {
        var _this88 = this;

        var option = this.option;

        if (!option('arrows')) {
          return;
        }

        this.arrows = new Arrows({
          orientation: option('orientation')
        });
        this.arrows.hide();
        this.arrows.setParent(this);
        this.on('arrowAction', function (e) {
          e.stopAll(); // e.data.type === 'next' || 'prev'

          var index = _this88.getNextIndex(e.data.type, _this88.index, _this88.slides.length, _this88.option('loop'));

          _this88.jump(index, 2);
        });
        this.arrows.getNodes().forEach(function (node) {
          _this88.controlsWrapper.append(node);
        });
      };

      _proto15.getNextIndex = function getNextIndex(direction, index, length, loop) {
        var resultIndex = helper.sliderLib.findIndex(direction, index, length, loop);
        var result = resultIndex;

        if (resultIndex !== null && resultIndex !== this.index && (this.slides[resultIndex].isSelectorPinned() || !this.slides[resultIndex].isSlideAvailable() || !this.slides[resultIndex].isEnabled())) {
          result = this.getNextIndex(direction, resultIndex, length, loop);
        }

        return result;
      };

      _proto15.isHiddenSlides = function isHiddenSlides() {
        return !this.slides.some(function (slide) {
          return !slide.isCustomSelector() || slide.isCustomSelector() && slide.isSlideAvailable();
        });
      };

      _proto15.createSelectors = function createSelectors() {
        var _this89 = this;

        var option = this.option;

        if (!option('thumbnails.enable') && !option('fullscreen.thumbnails.enable')) {
          this.isSelectorsReady = true;
          return;
        }

        this.selectors = new Selectors(this.slides.map(function (slide) {
          return slide.getSelector();
        }), {
          isStandardGrid: this.isStandardGrid,
          standardStyle: option('thumbnails.type'),
          standardSize: option('thumbnails.size'),
          standardPosition: option('thumbnails.enable') ? option('thumbnails.position') : false,
          standardWatermark: option('thumbnails.watermark'),
          isFullscreenGrid: this.isFullscreenGrid,
          fullscreenStyle: option('fullscreen.thumbnails.type'),
          fullscreenSize: option('fullscreen.thumbnails.size'),
          fullscreenPosition: option('fullscreen.thumbnails.enable') ? option('fullscreen.thumbnails.position') : false,
          fullscreenAutohide: option('fullscreen.thumbnails.autohide'),
          fullscreenWatermark: option('fullscreen.thumbnails.watermark'),
          arrows: option('arrows')
        });
        this.selectors.setParent(this);
        this.on('selectorsReady', function (e) {
          e.stopAll();
          _this89.isSelectorsReady = true;

          _this89.postInitialization();
        });
        this.on('getSelectorProportion', function (e) {
          e.stopAll();

          var index = _this89.getSlideByUUID(e.data.UUID);

          if (index !== null) {
            var slide = _this89.slides[index];

            if (slide) {
              var result = {
                size: null,
                isSirv: true
              };
              slide.getSelectorProportion().then(function (data) {
                result.isSirv = slide.isSirvSelector();
                result.size = data.size;
                e.data.resultingCallback(result);
              }).catch(function (err) {
                result.isSirv = slide.isSirvSelector();

                _this89.pickOut(err.UUID);

                e.data.resultingCallback(result);
              });
            } else {
              e.data.resultingCallback(null);
            }
          } else {
            e.data.resultingCallback(null);
          }
        });
        this.on('getSelectorImgUrl', function (e) {
          e.stopAll();

          var index = _this89.getSlideByUUID(e.data.UUID);

          if (index !== null) {
            var slide = _this89.slides[index];

            if (slide) {
              slide.getSelectorImgUrl(e.data.type, e.data.size, e.data.crop, e.data.watermark).then(function (result) {
                e.data.resultingCallback({
                  src: result.src,
                  srcset: result.srcset,
                  size: result.size,
                  alt: result.alt,
                  referrerpolicy: result.referrerpolicy
                });
              }).catch(function (err) {
                e.data.resultingCallback(null);
              });
            } else {
              e.data.resultingCallback(null);
            }
          } else {
            e.data.resultingCallback(null);
          }
        });
        this.on('changeSlide', function (e) {
          e.stopAll();

          var index = _this89.getSlideByUUID(e.data.UUID);

          if (index !== null) {
            var _tmp = _this89.option(FULLSCREEN + '.enable') && _this89.option(FULLSCREEN + '.always');

            if (_this89.slides[index].isCustomSelector()) {
              _this89.sendEvent('thumbnailClick', {
                slide: _this89.slides[index].getData()
              });
            }

            _this89.jump(index, 2, _tmp);

            if (_tmp) {
              _this89.enterFullScreen();
            }
          }
        });
        this.on('visibility', function (e) {
          e.stop();

          switch (e.action) {
            case 'show':
              _this89.movingContainer.removeClass(CSS_MAIN_CLASS + '-selectors-closed');

              break;

            case 'hide':
              _this89.movingContainer.addClass(CSS_MAIN_CLASS + '-selectors-closed');

              break;
            // no default
          }
        });
        this.on('selectorsDone', function (e) {
          e.stopAll();

          if ($J.contains(['left', 'right'], _this89.selectors.getCurrentStylePosition())) {
            _this89.onResize();
          }
        });
        this.selectorsWrapper.append(this.selectors.getNode());
        this.slides.forEach(function (slide, index) {
          if (!slide.isEnabled()) {
            _this89.selectors.disableSelector(slide.getUUID());
          }
        });
        this.showHideSelectors(true);
      };

      _proto15.findSlide = function findSlide() {
        var dataSrc = this.instanceNode.attr('data-src');

        if (dataSrc) {
          var tmp;

          try {
            if (this.viewerFileContent) {
              tmp = this.viewerFileContent;
            } else {
              tmp = dataSrc.split('?')[0];
              tmp = tmp.split('.');
              tmp = tmp[tmp.length - 1];
            }
          } catch (e) {// empty
          }

          var node;

          if (tmp === 'spin' || helper.isVideo(dataSrc)) {
            node = $J.$new('div', {
              'data-src': dataSrc
            });
            tmp = globalVariables.SLIDE.TYPES.SPIN;
          } else {
            if ($J.contains([this.instanceNode.attr('data-type'), this.instanceNode.attr('data-effect')], 'zoom')) {
              tmp = globalVariables.SLIDE.TYPES.ZOOM;
              node = $J.$new('div', {
                'data-type': 'zoom',
                'data-src': dataSrc
              });
            } else {
              tmp = globalVariables.SLIDE.TYPES.IMAGE;
              node = $J.$new('img', {
                'data-src': dataSrc
              });
            }
          }

          if (this.viewerFileContent) {
            node.store('view-content', tmp);
          }

          this.instanceNode.append(node);
        } else {
          dataSrc = this.instanceNode.attr('data-bg-src');

          if (dataSrc) {
            this.instanceNode.append($J.$new('img', {
              'data-src': dataSrc
            }));
          }
        }

        return this.getSlides(true);
      };

      _proto15.canPinSlide = function canPinSlide(node) {
        var side = Slide.findPinnedSelectorSide(node);
        var pinnedSlides = this.slides.filter(function (slide) {
          return slide.getPinnedSelectorSide() === side;
        });

        if (pinnedSlides.length < 3) {
          return true;
        }

        return false;
      };

      _proto15.getSlideByUUID = function getSlideByUUID(uuid) {
        var result = null;

        for (var i = 0, l = this.slides.length; i < l; i++) {
          var slide = this.slides[i];

          if (slide.getUUID() === uuid) {
            result = i;
            break;
          }
        }

        return result;
      };

      _proto15.pickOut = function pickOut(uuid) {
        var index = this.getSlideByUUID(uuid);

        if (index === null) {
          return;
        }

        this.removeSlide(index);

        if (!this.slides.length) {
          this.emit('destroy', {
            data: {
              id: this.id,
              node: this.instanceNode.node
            }
          });
          return;
        }

        if (this.slides.length < 2) {
          // clear selectors class and additional things
          if (this.option('thumbnails.enable') || this.option('fullscreen.thumbnails.enable')) {
            this.changeClasses(this.classes.standard, true);
            this.setContainerSize();
          }
        }

        if (!this.isToolStarted) {
          this.searchingOfProportions();
        }

        this.postInitialization();
      };

      _proto15.getSlides = function getSlides(fromFindSlide) {
        var _this90 = this;

        var slides;

        if (fromFindSlide) {
          slides = $J.$A(this.instanceNode.node.childNodes);
        } else {
          slides = $J.$A(this.instanceNode.node.childNodes).filter(function (slide) {
            var result = false;

            _this90.sliderNodes.push(slide.cloneNode(true));

            if (slide.tagName && $J.contains(['div', 'img', 'iframe', 'figure', 'video', 'picture', SELECTOR_TAG], $(slide).getTagName())) {
              result = true;
            }

            slide.parentNode.removeChild(slide);
            return result;
          });
          slides = slidePinnedFilter(slides);
        }

        var filteredSlides = slides.map(function (slide) {
          return Slide.parse(slide);
        });
        globalFunctions.viewerFilters.forEach(function (callback) {
          var fs = [].concat(filteredSlides);
          fs = fs.map(function (s) {
            var r = {};
            helper.objEach(s, function (key, value) {
              if (key === 'type') {
                value = globalVariables.SLIDE.NAMES[value];
              }

              helper.createReadOnlyProp(r, key, value);
            });
            return r;
          });
          var result = callback(_this90.id, fs);

          if (Array.isArray(result)) {
            filteredSlides = result.map(function (s) {
              var r = s;

              for (var i = 0, l = filteredSlides.length; i < l; i++) {
                if (s.node === filteredSlides[i].node) {
                  r = filteredSlides.splice(i, 1)[0];
                  break;
                }
              }

              return r;
            });
          }
        });
        slides = filteredSlides;

        if (!fromFindSlide && !slides.length) {
          slides = this.findSlide();
        }

        slides = helper.sortSlidesByOrder(this.option('itemsOrder'), slides);
        return slides;
      };

      _proto15.createSlides = function createSlides(slides) {
        var _this91 = this;

        var index = 0;
        slides.forEach(function (slide) {
          if (!Slide.isSirvComponent(slide.node) || Slide.hasComponent(slide.node)) {
            slide = $(slide.node);

            if (slide.getTagName() === SELECTOR_TAG) {
              var div = $J.$new('div');

              if (slide.attr('data-id')) {
                div.attr('data-id', slide.attr('data-id'));
              }

              if (slide.attr('data-group')) {
                div.attr('data-group', slide.attr('data-group'));
              }

              div.append(slide);
              slide = div;
            }

            slide.addClass(CSS_MAIN_CLASS + '-component');

            var _slide = new Slide(slide.node, index, _this91.slideOptions);

            _slide.setParent(_this91);

            _this91.slides.push(_slide);

            if (_slide.isEnabled() && _slide.isSlideAvailable()) {
              _this91.enabledIndexesOfSlides.push(index);
            }

            index += 1;
          }
        });
        this.firstSlideAhead = this.enabledIndexesOfSlides.length > MAX_SLIDES_TO_CHANGE_PRELOAD_BEHAVIOR;
        this.enabledIndexesOfSlides.forEach(function (slideindex, i) {
          if (!_this91.firstSlideAhead || i < MAX_SLIDES_TO_CHANGE_PRELOAD_BEHAVIOR) {
            _this91.slides[slideindex].startGettingInfo();
          }
        });

        if (this.index > this.slides.length - 1) {
          this.index = 0;
        }

        this.postInitialization();
      };

      _proto15.checkSingleSlide = function checkSingleSlide() {
        var _this92 = this;

        var isSingle = this.enabledIndexesOfSlides.length === 1;
        this.enabledIndexesOfSlides.forEach(function (index) {
          _this92.slides[index].single(isSingle);
        });
      };

      _proto15.showHideArrows = function showHideArrows() {
        if (this.arrows) {
          var visibleSlides = this.visibleSlides();

          if (visibleSlides < 2 || this.option(FULLSCREEN + '.always') && !this.isFullscreenState()) {
            this.arrows.hide();
          } else if (visibleSlides > 1 && (!this.option(FULLSCREEN + '.always') || this.isFullscreenState())) {
            this.arrows.show();
          }
        }
      };

      _proto15.canShowSelectors = function canShowSelectors(selectorCount) {
        var property = this.isFullscreen === globalVariables.FULLSCREEN.OPENED ? 'fullscreen.thumbnails.always' : 'thumbnails.always';
        return this.option(property) || selectorCount > 1;
      };

      _proto15.showHideSelectors = function showHideSelectors(force
      /* container size can be set faster than we can detect selector's visibility */
      ) {
        var _this93 = this;

        if (this.selectors) {
          if (!this.selectorsDebounce) {
            this.selectorsDebounce = helper.debounce(function () {
              if (_this93.selectors) {
                var canShow = _this93.canShowSelectors(_this93.enabledIndexesOfSlides.length);

                if (canShow) {
                  if (!_this93.selectors.isSelectorsActionEnabled()) {
                    _this93.movingContainer.setCssProp('height', '100%');

                    _this93.selectorsWrapper.removeClass(CSS_MAIN_CLASS + '-hide-selectors');

                    _this93.selectors.enableActions();

                    _this93.onResize();
                  }
                } else {
                  if (_this93.selectors.isSelectorsActionEnabled()) {
                    _this93.selectorsWrapper.addClass(CSS_MAIN_CLASS + '-hide-selectors');

                    _this93.selectors.disableActions();

                    _this93.onResize();
                  }
                }
              }
            }, force ? 0 : 32);
          }

          this.selectorsDebounce();
        }
      };

      _proto15.getAvailableSlideIndex = function getAvailableSlideIndex(startIndex) {
        if (startIndex === this.slides.length - 1 && !this.slides[startIndex].isSlideAvailable()) {
          return -1;
        }

        if (this.slides[startIndex + 1].isSlideAvailable()) {
          return startIndex + 1;
        }

        return this.getAvailableSlideIndex(startIndex + 1);
      };

      _proto15.addAvailableSlideNode = function addAvailableSlideNode(slide, index) {
        var slideNode = slide.getNode();
        var l = this.slides.length;

        if (slide.isSlideAvailable()) {
          if (l > 1 && index !== l - 1) {
            if (this.slides[index + 1].isSlideAvailable()) {
              this.slidesContainer.node.insertBefore(slideNode.node, this.slides[index + 1].getNode().node);
            } else {
              var indexAvailableSlide = this.getAvailableSlideIndex(index);

              if (indexAvailableSlide < 0) {
                this.slidesContainer.append(slideNode);
              } else {
                this.slidesContainer.node.insertBefore(slideNode.node, this.slides[indexAvailableSlide].getNode().node);
              }
            }
          } else {
            this.slidesContainer.append(slideNode);
          }
        }
      };

      _proto15.sortItems = function sortItems(order) {
        if (!Array.isArray(order)) {
          order = this.option('itemsOrder');
        }

        if (!order.length) {
          return;
        }

        this.slides = helper.sortSlidesByOrder(order, this.slides);

        if (this.selectors) {
          this.selectors.sortSelectors(this.slides.map(function (slide) {
            return slide.getUUID();
          }), order.length);
        }

        this.slides.forEach(function (slide, index) {
          slide.setNewIndex(index);
        });

        for (var indexSlide = 0, l = this.slides.length; indexSlide < l; indexSlide++) {
          if (this.slides[indexSlide].isSlideActive()) {
            this.index = this.slides[indexSlide].getIndex();
            break;
          }
        }
      };

      _proto15.insertSlide = function insertSlide(indexOfSlide, htmlNodeSlide) {
        var _this94 = this;

        var pinnedNode = htmlNodeSlide.querySelector(SELECTOR_TAG) || htmlNodeSlide;

        if (Slide.findPinnedSelectorSide(pinnedNode) && !this.canPinSlide(pinnedNode)) {
          return false;
        }

        if (!$J.defined(indexOfSlide)) {
          indexOfSlide = this.slides.length + 1;
        }

        if ($J.typeOf(indexOfSlide) === 'number' && indexOfSlide >= 0 && htmlNodeSlide && (!Slide.isSirvComponent(htmlNodeSlide) || Slide.hasComponent(htmlNodeSlide))) {
          $(htmlNodeSlide).addClass(CSS_MAIN_CLASS + '-component');

          if (indexOfSlide > this.slides.length) {
            indexOfSlide = this.slides.length;
          }

          clearTimeout(this.timerRemove);
          var slide = new Slide(htmlNodeSlide, indexOfSlide, this.slideOptions, true);
          slide.setParent(this);
          this.slides.splice(indexOfSlide, 0, slide);
          var nonIndex = this.index === null;

          if (this.index === null) {
            if (slide.isEnabled() && slide.isSlideAvailable()) {
              // this.index = 0; // TODO check it
              this.index = indexOfSlide;
            } else {
              nonIndex = false;
            }
          } else if (indexOfSlide <= this.index) {
            this.index += 1;
          }

          this.enabledIndexesOfSlides = [];
          this.slides.forEach(function (_slide, index) {
            _slide.setNewIndex(index);

            if (_slide.isEnabled()) {
              _this94.controlEnabledSlides(index);
            }
          });
          this.addAvailableSlideNode(slide, indexOfSlide);
          /*
              new component for slider is needed css
          */

          this.addComponentsCSS();
          slide.appendToDOM(); // all elements need to be in dom

          slide.initVideoPlayer();
          slide.startGettingInfo();
          slide.loadThumbnail();
          slide.startFullInit(null);
          slide.startTool(this.index === indexOfSlide, this.firstSlideAhead ? false : this.option('slide.preload'), this.firstSlideAhead);
          slide.broadcast('inView', {
            data: this.isInView
          });

          if (this.index === indexOfSlide) {
            slide.loadContent();
            slide.beforeShow();
            slide.afterShow(globalVariables.SLIDE_SHOWN_BY.INIT);
          }

          if (this.isFullscreen === globalVariables.FULLSCREEN.OPENED && !slide.isSirv()) {
            slide.broadcast('before' + _FULLSCREEN + 'In', {
              data: {
                pseudo: this.isPseudo
              }
            });
            slide.broadcast('after' + _FULLSCREEN + 'In', {
              data: {
                pseudo: this.isPseudo
              }
            });
          }

          this.checkLoop(this.index);

          if (this.selectors) {
            this.selectors.insertSelector(indexOfSlide, slide.getSelector());

            if (nonIndex) {
              this.selectors.setActiveItem(this.index);
            }
          }

          this.checkSingleSlide();
          this.showHideSelectors();
          this.showHideArrows();
          return true;
        }

        return false;
      };

      _proto15.removeSlide = function removeSlide(indexOfSlide) {
        var _this95 = this;

        var flag = false;

        if ($J.typeOf(indexOfSlide) === 'string') {
          indexOfSlide = this.findSlideIndex(indexOfSlide);
        }

        if ($J.typeOf(indexOfSlide) === 'number' && indexOfSlide >= 0 && indexOfSlide < this.slides.length) {
          var slideUUID = this.slides[indexOfSlide].$J_UUID;

          if (this.slides[indexOfSlide].isEnabled()) {
            this.disableSlide(indexOfSlide, true);
          } else {
            flag = true;
          }

          this.slides[indexOfSlide].destroy();
          this.slides.splice(indexOfSlide, 1);
          this.enabledIndexesOfSlides = [];
          this.slides.forEach(function (slide, index) {
            slide.setNewIndex(index);

            if (slide.isEnabled()) {
              _this95.controlEnabledSlides(index);
            }
          });

          if (this.selectors) {
            this.selectors.pickOut(slideUUID);
          }

          if (this.index !== null && indexOfSlide <= this.index && this.index !== 0) {
            this.index -= 1;
          }

          if (flag) {
            this.checkSingleSlide();
          }

          if (this.isHiddenSlides()) {
            this.timerRemove = setTimeout(function () {
              if (_this95.instanceNode) {
                _this95.emit('destroy', {
                  data: {
                    id: _this95.id,
                    node: _this95.instanceNode.node
                  }
                });
              }
            }, 100);
          }

          return true;
        }

        return false;
      };

      _proto15.createContextMenu = function createContextMenu() {
        var _this96 = this;

        var option = this.option;
        var contextmenuData = $([]);

        if (option('contextmenu.enable')) {
          if (option('contextmenu.text.zoom.in') || option('contextmenu.text.zoom.out')) {
            if (option('contextmenu.text.zoom.in')) {
              contextmenuData.push({
                id: 'zoomin',
                label: option('contextmenu.text.zoom.in'),
                hidden: false,
                action: function (e) {
                  _this96.slides[_this96.index].zoomIn(e.left, e.top);
                }
              });
            }

            if (option('contextmenu.text.zoom.out')) {
              contextmenuData.push({
                id: 'zoomout',
                label: option('contextmenu.text.zoom.out'),
                disabled: true,
                hidden: false,
                action: function (e) {
                  _this96.slides[_this96.index].zoomOut(e.left, e.top);
                }
              });
            }
          }

          if (option(FULLSCREEN + '.enable') && (option('contextmenu.text.' + FULLSCREEN + '.enter') || option('contextmenu.text.' + FULLSCREEN + '.exit'))) {
            if (option('contextmenu.text.' + FULLSCREEN + '.enter')) {
              // isExist
              contextmenuData.push({
                id: 'enter' + FULLSCREEN,
                label: option('contextmenu.text.' + FULLSCREEN + '.enter'),
                hidden: !option(FULLSCREEN + '.enable'),
                action: function () {
                  _this96.enterFullScreen();
                }
              });
            }

            if (option('contextmenu.text.' + FULLSCREEN + '.exit')) {
              contextmenuData.push({
                id: 'exit' + FULLSCREEN,
                label: option('contextmenu.text.' + FULLSCREEN + '.exit'),
                hidden: true,
                action: function () {
                  _this96.exitFullScreen();
                }
              });
            }
          }

          if (option('contextmenu.text.download')) {
            if (contextmenuData.length) {
              contextmenuData.push({
                id: 'sirv-separator',
                hidden: false,
                separator: true
              });
            }

            contextmenuData.push({
              id: 'download',
              label: option('contextmenu.text.download'),
              action: function () {
                var dlw;

                var url = _this96.slides[_this96.index].getOriginImageUrl();

                if (url) {
                  dlw = $J.$new('iframe').setCss({
                    width: 0,
                    height: 0,
                    display: 'none'
                  }).appendTo($J.D.node.body);
                  dlw.node.src = url + '?format=original&dl';
                }
              }
            });
          }

          this.movingContainer.addEvent('contextmenu', function (e) {
            var magnify;
            var canShow = false;
            var zoomData;
            var dl = true;
            var zoomMenu = false;
            var fullscreenMenu = false;
            var downloadMenu = false;
            var zoomin = 'zoomin';
            var zoomout = 'zoomout';
            var enterfullscreen = 'enter' + FULLSCREEN;
            var exitfullscreen = 'exit' + FULLSCREEN;
            e.stopDefaults();

            if (_this96.contextMenu && !_this96.isMoving && _this96.enabledIndexesOfSlides.length) {
              var item = _this96.slides[_this96.index];
              var typeOfSlide = item.getTypeOfSlide();
              var t = globalVariables.SLIDE.TYPES;

              if (_this96.isReady && item.isReady && item.isSirv() && typeOfSlide) {
                var opts = item.getOptions();

                switch (typeOfSlide) {
                  case t.SPIN:
                    magnify = true;
                    break;

                  case t.ZOOM:
                    magnify = opts.mode === 'deep';
                    break;

                  case t.IMAGE:
                    break;

                  case t.VIDEO:
                    dl = false;
                    break;
                  // no default
                }

                if (magnify && _this96.slides[_this96.index].isZoomSizeExist() && (option('contextmenu.text.zoom.in') || option('contextmenu.text.zoom.out'))) {
                  zoomData = _this96.slides[_this96.index].getZoomData();

                  _this96.contextMenu.showItem(zoomin);

                  if (zoomData.isZoomed && zoomData.zoom === 1) {
                    _this96.contextMenu.disableItem(zoomin);
                  } else {
                    _this96.contextMenu.enableItem(zoomin);
                  }

                  _this96.contextMenu.showItem(zoomout); // if (!zoomData.isZoomed || zoomData.zoom === 0) {


                  if (!zoomData.isZoomed) {
                    _this96.contextMenu.disableItem(zoomout);
                  } else {
                    _this96.contextMenu.enableItem(zoomout);
                  }

                  zoomMenu = true;
                } else {
                  _this96.contextMenu.hideItem(zoomin);

                  _this96.contextMenu.hideItem(zoomout);
                }

                if (option(FULLSCREEN + '.enable')) {
                  if (_this96.isFullscreenState()) {
                    _this96.contextMenu.hideItem(enterfullscreen);

                    if (_this96.contextMenu.isExist(exitfullscreen)) {
                      _this96.contextMenu.showItem(exitfullscreen);

                      if (zoomData && zoomData.isZoomed) {
                        _this96.contextMenu.disableItem(exitfullscreen);
                      } else {
                        _this96.contextMenu.enableItem(exitfullscreen);
                      }

                      fullscreenMenu = true;
                    }
                  } else {
                    if (_this96.contextMenu.isExist(enterfullscreen)) {
                      _this96.contextMenu.showItem(enterfullscreen);

                      if (zoomData && zoomData.isZoomed) {
                        _this96.contextMenu.disableItem(enterfullscreen);
                      } else {
                        _this96.contextMenu.enableItem(enterfullscreen);
                      }

                      fullscreenMenu = true;
                    }

                    _this96.contextMenu.hideItem(exitfullscreen);
                  }
                }

                if (_this96.contextMenu.isExist('download') && dl) {
                  _this96.contextMenu.showItem('download');

                  downloadMenu = true;
                } else {
                  _this96.contextMenu.hideItem('download');
                }

                if (zoomMenu || fullscreenMenu || downloadMenu) {
                  if ((zoomMenu || fullscreenMenu) && downloadMenu && typeOfSlide !== t.VIDEO) {
                    _this96.contextMenu.showItem('sirv-separator');
                  } else {
                    _this96.contextMenu.hideItem('sirv-separator');
                  }

                  canShow = true;

                  _this96.broadcast('stopContext');
                }
              }

              _this96.contextMenu.setCanShow(canShow);
            }
          });

          if (contextmenuData.length && !$J.browser.mobile) {
            this.contextMenu = new ContextMenu(this.movingContainer, contextmenuData, 'sirv');

            if (option('fullscreen.enable')) {
              this.contextMenu.setFullScreenBox(this.fullScreenBox);
            }
          }
        } else {
          this.movingContainer.addEvent('contextmenu', function (e) {
            e.stop();
          });
        }
      };

      _proto15.enterFullScreen = function enterFullScreen() {
        var _this97 = this;

        if (this.isFullscreen !== globalVariables.FULLSCREEN.CLOSED) {
          return false;
        }

        this.addHistory();
        this.isFullscreen = globalVariables.FULLSCREEN.OPENING;
        this.fullscreenStartTime = +new Date();
        var isPseudo = !this.option('fullscreen.native') || !$J.browser.fullScreen.capable || !$J.browser.fullScreen.enabled();

        if (iPhoneSafariViewportRuler) {
          iPhoneSafariViewportRuler.appendTo($J.D.node.body);
        }

        this.disableFullscreenButton();
        this.hideFullscreenButton();

        if (this.selectors) {
          this.setClasses();

          if (this.option('fullscreen.thumbnails.enable')) {
            this.appendSelectors();
          }

          this.selectors.beforeEnterFullscreen();
        }

        this.slideWrapper.removeClass(globalVariables.CSS_CURSOR_FULSCREEN_ALWAYS);
        this.fullScreenBox.setCss({
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 99999999999
        });
        this.boxSize = this.instanceNode.getSize();
        this.boxBoundaries = this.instanceNode.getRect();
        this.fullScreenBox.append(this.movingContainer);
        $($J.D.node.body).append(this.fullScreenBox);
        this.movingContainer.setCssProp('height', '100%');
        this.broadcast('before' + _FULLSCREEN + 'In', {
          data: {
            pseudo: isPseudo
          }
        });
        this.slideWrapper.setCssProp('height', '');

        if (ProductDetail && this.productDetail) {
          this.productDetail.open();
        }

        $J.browser.fullScreen.request(this.fullScreenBox, {
          windowFullscreen: !this.option('fullscreen.native'),
          onEnter: this.onEnteredFullScreen.bind(this),
          // onExit: this.onExitFullScreen.bind(this),
          onExit: function () {
            if ($J.contains([globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.OPENING], _this97.isFullscreen)) {
              return;
            }

            _this97.isFullscreen = globalVariables.FULLSCREEN.CLOSING;

            _this97._beforeExitFullscreen();

            _this97.broadcast('before' + _FULLSCREEN + 'Out', {
              data: {
                pseudo: false
              }
            });

            _this97.onExitFullScreen();
          },
          fallback: function () {
            var rootTag = $J.D.node.getElementsByTagName('html')[0];
            $(rootTag).addClass(PSEUDO_FULLSCREEN_CLASS);
            $(document.body).getSize();
            setTimeout(function () {
              return _this97.onEnteredFullScreen(true);
            }, 64); // const fullSize = $J.D.getSize();
            // const scrolls = $J.W.getScroll();
            // // const docFullSize = $($J.D).getFullSize();
            // const rootTag = $J.D.node.getElementsByTagName('html')[0];
            // $(rootTag).addClass(PSEUDO_FULLSCREEN_CLASS);
            // let top = 0 + scrolls.y;
            // // Properly handle iPhone Safari (>10) address bar, bookmark bar and status bar
            // // if (isHandset && $J.browser.platform === 'ios' && $J.browser.uaName === 'safari' && parseInt($J.browser.uaVersion, 10) > 10) {
            // if (iPhoneSafariViewportRuler) {
            //     top = Math.abs(iPhoneSafariViewportRuler.node.getBoundingClientRect().top);
            //     // this.expandBox.setCss({ height: window.innerHeight, maxHeight: '100vh', top: Math.abs(iPhoneSafariViewportRuler,node.getBoundingClientRect().top) });
            // }
            // if (!this.fullScreenFX) {
            //     this.fullScreenFX = new $J.FX(this.fullScreenBox, {
            //         duration: 1,
            //         transition: $J.FX.getTransition().expoOut,
            //         onStart: () => {
            //             this.fullScreenBox.setCss({
            //                 width: this.boxSize.width,
            //                 height: this.boxSize.height,
            //                 top: this.boxBoundaries.top,
            //                 left: this.boxBoundaries.left
            //             }).appendTo($J.D.node.body);
            //         },
            //         onAfterRender: () => {},
            //         onComplete: () => {
            //             this.onEnteredFullScreen(true);
            //             this.fullScreenFX = null;
            //         }
            //     });
            // }
            // this.fullScreenFX.start({
            //     width:  [this.boxSize.width, fullSize.width],
            //     height: [this.boxSize.height, fullSize.height],
            //     // top:    [this.boxBoundaries.top, 0 + scrolls.y],
            //     top:    [this.boxBoundaries.top, top],
            //     left:   [this.boxBoundaries.left, 0 + scrolls.x],
            //     opacity: [0, 1]
            // });
          }
        });
        return true;
      };

      _proto15.onEnteredFullScreen = function onEnteredFullScreen(pseudo) {
        var _this98 = this;

        if (this.isFullscreen !== globalVariables.FULLSCREEN.OPENING) {
          return;
        }

        this.isPseudo = pseudo; // the variable is necessary for custom inserting slide

        if (pseudo && this.isFullscreen === globalVariables.FULLSCREEN.OPENING) {
          this.fullScreenBox.setCss({
            top: iPhoneSafariViewportRuler ? Math.abs(iPhoneSafariViewportRuler.node.getBoundingClientRect().top) : 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: 'auto',
            height: iPhoneSafariViewportRuler ? $J.W.node.innerHeight : 'auto',
            display: this.productDetail ? 'flex' : 'block',
            position: 'fixed'
          }); // if (iPhoneSafariViewportRuler) {
          //     this.fullScreenBox.setCss({ height: $J.W.node.innerHeight, top: Math.abs(iPhoneSafariViewportRuler.node.getBoundingClientRect().top) });
          // }

          $J.D.addEvent('keydown', this.pseudoFSEvent);
        }

        this.isFullscreen = globalVariables.FULLSCREEN.OPENED;

        if (this.fullscreenButton) {
          this.fullscreenButton.removeClass(STANDARD_BUTTON_CLASS);
          this.fullscreenButton.addClass(FULLSCREEN_BUTTON_CLASS);

          if (!this.slides[this.index] || !this.slides[this.index].isVideoSlide() || this.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
            setTimeout(function () {
              _this98.enableFullscreenButton();

              _this98.visibleFullscreenButton();
            }, 1);
          }
        }

        if (this.selectors) {
          this.selectors.afterEnterFullscreen();
        }

        if (this.slides.length > 1) {
          $J.D.addEvent('keyup', this.keyBoardArrowsCallback);
        }

        this.showHideArrows();
        this.showHideSelectors();
        this.broadcast('after' + _FULLSCREEN + 'In', {
          data: {
            pseudo: pseudo
          }
        });
        this.onResize();
        var eventData = {};

        if (this.enabledIndexesOfSlides.length) {
          eventData = {
            slide: this.slides[this.index].getData()
          };
        }

        this.sendEvent(FULLSCREEN + 'In', eventData);
      };

      _proto15._beforeExitFullscreen = function _beforeExitFullscreen() {
        this.disableFullscreenButton();
        this.hideFullscreenButton();

        if (this.option(FULLSCREEN + '.always')) {
          this.slideWrapper.addClass(globalVariables.CSS_CURSOR_FULSCREEN_ALWAYS);
        }

        if (this.selectors) {
          if (this.option('fullscreen.thumbnails.enable')) {
            this.appendSelectors();
          }

          this.setClasses();
          this.selectors.beforeExitFullscreen();
        }

        if (ProductDetail && this.productDetail) {
          this.productDetail.close();
        }
      };

      _proto15.exitFullScreen = function exitFullScreen() {
        if (this.isFullscreen !== globalVariables.FULLSCREEN.OPENED) {
          return false;
        }

        this.isFullscreen = globalVariables.FULLSCREEN.CLOSING;

        this._beforeExitFullscreen();

        if (iPhoneSafariViewportRuler) {
          iPhoneSafariViewportRuler.remove();
        }

        if ($J.browser.fullScreen.capable && $J.browser.fullScreen.enabled() && this.option('fullscreen.native')) {
          this.broadcast('before' + _FULLSCREEN + 'Out', {
            data: {
              pseudo: false
            }
          });
          $J.browser.fullScreen.cancel.call(document);
        } else {
          var rootTag = $J.D.node.getElementsByTagName('html')[0];
          $(rootTag).removeClass(PSEUDO_FULLSCREEN_CLASS);
          this.broadcast('before' + _FULLSCREEN + 'Out', {
            data: {
              pseudo: true
            }
          });
          this.onExitFullScreen(true); // const fullSize = this.fullScreenBox.getSize();
          // const fsBoxBoundaries = this.fullScreenBox.getRect();
          // const rootTag = $J.D.node.getElementsByTagName('html')[0];
          // $(rootTag).removeClass(PSEUDO_FULLSCREEN_CLASS);
          // this.broadcast('before' + _FULLSCREEN + 'Out', { data: { pseudo: true } });
          // if (!this.fullScreenExitFX) {
          //     this.fullScreenExitFX = new $J.FX(this.fullScreenBox, {
          //         duration: 1,
          //         transition: $J.FX.getTransition().expoOut,
          //         onStart: () => {
          //             $($J.D).removeEvent('keydown', this.pseudoFSEvent);
          //             this.fullScreenBox.setCss({ position: 'absolute' });
          //         },
          //         onAfterRender: () => {},
          //         onComplete: () => {
          //             this.onExitFullScreen(true);
          //             this.fullScreenExitFX = null;
          //         }
          //     });
          // }
          // this.fullScreenExitFX.start({
          //     width:  [fullSize.width, this.boxSize.width],
          //     height: [fullSize.height, this.boxSize.height],
          //     top:    [0 + fsBoxBoundaries.top, this.boxBoundaries.top],
          //     left:   [0 + fsBoxBoundaries.left, this.boxBoundaries.left],
          //     opacity: [1, 0.5]
          // });
        }

        return true;
      };

      _proto15.onExitFullScreen = function onExitFullScreen(pseudo) {
        var _this99 = this;

        if ($J.contains([globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.OPENING], this.isFullscreen)) {
          return;
        }

        $J.D.removeEvent('keyup', this.keyBoardArrowsCallback);
        this.showHideArrows();
        this.showHideSelectors();
        this.instanceNode.append(this.movingContainer);
        this.fullScreenBox.remove();

        if (this.fullscreenButton) {
          this.fullscreenButton.removeClass(FULLSCREEN_BUTTON_CLASS);
          this.fullscreenButton.addClass(STANDARD_BUTTON_CLASS);

          if (!this.slides[this.index] || !this.slides[this.index].isVideoSlide() || this.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
            setTimeout(function () {
              _this99.enableFullscreenButton();

              _this99.visibleFullscreenButton();
            }, 1);
          }
        }

        if (this.doHistory) {
          // If close initiated not by the Back button
          var urlHash = '#sirv-viewer-' + this.fullscreenViewId;

          try {
            if ($J.W.node.location.hash === urlHash) {
              $J.W.node.history.back();
            }
          } catch (e) {// empty
          }
        }

        this.isFullscreen = globalVariables.FULLSCREEN.CLOSED;
        this.isPseudo = false;

        if (this.selectors) {
          this.selectors.afterExitFullscreen();
        }
        /*
            this.setContainerSize(); - it must be under this.isFullscreen = globalVariables.FULLSCREEN.CLOSED; and this.selectors.afterExitFullscreen();
            because after exit from fullscreen with this options:
            {
                thumbnails: {
                    enable: true,
                    position: 'bottom'
                },
                 fullscreen: {
                    thumbnails: {
                        enable: false
                    },
                }
            }
            slider container is got wrong size
        */


        this.setContainerSize(); // this.sendStats(FULLSCREEN + 'Close', { duration: +new Date() - this.fullscreenStartTime });

        this.fullscreenStartTime = null;
        this.broadcast('after' + _FULLSCREEN + 'Out', {
          data: {
            pseudo: pseudo
          }
        });
        var eventData = {};

        if (this.enabledIndexesOfSlides.length) {
          eventData = {
            slide: this.slides[this.index].getData()
          };
        }

        this.sendEvent(FULLSCREEN + 'Out', eventData);
        this.onResize();
      };

      _proto15.getSlide = function getSlide(index) {
        var _this$slides$index;

        if (index === null || $J.typeOf(index) === 'number' && index >= this.slides.length) {
          index = this.index;
        }

        if ($J.typeOf(index) === 'string') {
          index = this.findSlideIndex(index);
        }

        return (_this$slides$index = this.slides[index]) == null ? void 0 : _this$slides$index.getData();
      };

      _proto15.onResizeWithoutSelectors = function onResizeWithoutSelectors() {
        if (!this.destroyed) {
          // Properly handle address bar and status bar on iPhone
          // if (isHandset && $J.browser.platform === 'ios' && $J.browser.uaName === 'safari' && parseInt($J.browser.uaVersion, 10) > 10) {
          if (iPhoneSafariViewportRuler && this.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
            // this.fullScreenBox.setCss({ top: Math.abs(iPhoneSafariViewportRuler.node.getBoundingClientRect().top) });
            this.fullScreenBox.setCss({
              height: $J.W.node.innerHeight,
              top: Math.abs(iPhoneSafariViewportRuler.node.getBoundingClientRect().top)
            });
          }

          this.setRootMargin();
          this.setContainerSize();
          this.slides.forEach(function (slide) {
            slide.resize();
          });
        }
      };

      _proto15.onResize = function onResize() {
        if (this.destroyed) {
          return;
        } // this.setContainerSize();


        if (this.selectors) {
          this.selectors.onResize();
        }

        this.onResizeDebounce();
      };

      _proto15.play = function play(delay) {
        var result = false;
        var currentDelay = this.option('slide.delay');

        if ($J.defined(delay) && $J.typeOf(delay) === 'number' && delay > 9
        /* 9 is min delay */
        ) {
            currentDelay = delay;
          }

        if (this.autoplayTimer === null && !this.isAutoplay || currentDelay !== this.autoplayDelay) {
          this.autoplayDelay = currentDelay;
          this.isAutoplay = true;
          this.residualAutoplayTime = this.autoplayDelay;
          this.autoplay();
          result = true;
        }

        return result;
      };

      _proto15.pause = function pause() {
        var result = this.autoplayTimer;
        this.isAutoplay = false;
        clearTimeout(this.autoplayTimer);
        this.autoplayTimer = null;
        this.residualAutoplayTime = this.autoplayDelay;
        return result === null;
      };

      _proto15.pauseAutoplay = function pauseAutoplay() {
        clearTimeout(this.autoplayTimer);
        this.autoplayTimer = null;
        this.residualAutoplayTime -= $J.now() - this.currentAutoplayTime;
      };

      _proto15.autoplay = function autoplay() {
        var _this100 = this;

        if (this.isAutoplay) {
          this.currentAutoplayTime = $J.now();
          var delay = this.autoplayDelay;

          if (this.residualAutoplayTime !== delay) {
            if (this.residualAutoplayTime < MIN_AUTOPLAY) {
              delay = MIN_AUTOPLAY;
            } else {
              delay = this.residualAutoplayTime;
            }
          }

          clearTimeout(this.autoplayTimer);
          this.autoplayTimer = setTimeout(function () {
            if (!_this100.destroyed) {
              _this100.jump('next', globalVariables.SLIDE_SHOWN_BY.AUTOPLAY);
            }
          }, delay);
        }
      };

      _proto15.destroy = function destroy() {
        var _this101 = this;

        this.destroyed = true;
        this.onResizeDebounce.cancel();
        this.onResizeDebounce = null;
        clearTimeout(this.autoplayTimer);
        this.autoplayTimer = null;

        if (this.selectorsDebounce) {
          this.selectorsDebounce.cancel();
          this.selectorsDebounce = null;
        }

        $($J.W).removeEvent('resize', this.onResizeHandler);
        this.onResizeHandler = null;
        $($J.D).removeEvent('keyup', this.keyBoardArrowsCallback);

        if (this.inViewModule) {
          this.inViewModule.disconnect();
          this.inViewModule = null;
        }

        if (this.doHistory) {
          $($J.W).removeEvent('popstate', this.onHistoryStateChange);
          globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.splice(globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.indexOf(this.fullscreenViewId), 1);
        }

        this.movingContainer.removeEvent('mouseout');
        this.slideWrapper.removeClass(globalVariables.CSS_CURSOR_FULSCREEN_ALWAYS);

        if (this.clearingTouchdragFunction) {
          this.clearingTouchdragFunction();
        }

        this.slidesContainer.removeEvent('touchdrag');

        if (isCustomId(this.id)) {
          this.instanceNode.removeAttr('id');
        }

        if (this.contextMenu) {
          this.movingContainer.removeEvent('contextmenu');
          this.contextMenu.destroy();
          this.contextMenu = null;
        }

        if (this.productDetail) {
          this.productDetail.destroy();
          this.productDetail = null;
        }

        if (this.fullscreenButton) {
          this.fullscreenButton.removeEvent('btnclick tap');
          this.fullscreenButton.remove();
        }

        this.fullscreenButton = null;

        if (this.effect) {
          this.effect.destroy();
          this.effect = null;
          this.on('effectStart');
          this.on('effectEnd');
        }

        if (this.arrows) {
          this.arrows.destroy();
          this.arrows = null;
          this.off('arrowAction');
        }

        if (this.selectors) {
          this.selectors.destroy();
          this.selectors = null;
          this.off('visibility');
          this.off('changeSlide');
          this.off('selectorsReady');
          this.off('getSelectorImgUrl');
          this.off('selectorsDone');
          this.off('getSelectorProportion');
        }

        this.off('componentEvent');
        this.off('goTo' + _FULLSCREEN);
        this.off('goTo' + _FULLSCREEN + 'Out');
        this.off('infoReady');
        this.off('slideVideoPlay');
        this.off('slideVideoPause');
        this.off('slideVideoEnd');
        this.slides.forEach(function (slide) {
          var node = slide.getOriginNode();
          $(node).removeClass(CSS_MAIN_CLASS + '-component');
          slide.destroy();
        });
        this.slides = [];
        this.off('stats');
        this.sliderNodes.forEach(function (node) {
          return _this101.instanceNode.append(node);
        });
        this.sliderNodes = [];
        $($J.D).removeEvent('keydown', this.pseudoFSEvent);
        this.pseudoFSEvent = null;
        $($J.D).removeEvent('keyup', this.keyBoardArrowsCallback);
        this.keyBoardArrowsCallback = null;
        this.fullScreenBox.remove();
        this.fullScreenBox = null;
        this.controlsWrapper.remove();
        this.controlsWrapper = null;
        this.slidesContainer.remove();
        this.slidesContainer = null;
        this.selectorsWrapper.remove();
        this.selectorsWrapper = null;
        this.slideWrapper.remove();
        this.slideWrapper = null;
        this.movingContainer.remove();
        this.movingContainer = null;
        this.isReady = false;
        this.doSetSize = false;
        this.instanceNode = null;
        this.externalContainer = null;

        _EventEmitter10.prototype.destroy.call(this);
      };

      return Slider;
    }(EventEmitter);

    return Slider;
  }();
  /* eslint-env es6 */

  /* global defaultOptions, SirvSlider, helper, EventEmitter, $, $J, globalFunctions, SliderBuilder, Promise, SELECTOR_TAG */

  /* eslint-disable dot-notation */

  /* eslint-disable no-use-before-define */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Slider" }] */


  var Slider = function () {
    var checkArgument = function (value) {
      if ($J.typeOf(value) !== 'number' && $J.typeOf(value) !== 'string') {
        value = null;
      }

      return value;
    };

    var clearPrivateOptions = function (obj) {
      helper.objEach(obj, function (key, value) {
        value = $(value.split(';'));

        if (value.length) {
          if (value[value.length - 1] === '') {
            value.splice(value.length - 1, 1);
          }

          value = value.map(function (_value) {
            return _value.replace(new RegExp('^' + key + '\\.'), '');
          });
          obj[key] = value.join(';');
        }
      });
      return obj;
    };

    var getOptions = function (source, opt) {
      var optType = $J.typeOf(opt);
      var value;
      var result = null;

      if (optType === 'string') {
        result = source[opt];
      } else if (optType === 'array') {
        value = opt.shift();

        if (source[value]) {
          if (opt.length) {
            result = getOptions(source[value], opt);
          } else {
            result = source[value];
          }
        }
      }

      return result;
    };

    var getOptionsByType = function (options, oType, def) {
      return {
        common: getOptions(options.common, oType) || def,
        mobile: getOptions(options.mobile, oType) || def
      };
    };

    var removeProperties = function (obj) {
      var rm = function (_obj) {
        ['spin', 'zoom', 'image', 'video'].forEach(function (v) {
          if (_obj[v]) {
            delete _obj[v];
          }
        });
      };

      rm(obj.common);
      rm(obj.mobile);
    };

    var Slider_ = /*#__PURE__*/function (_EventEmitter11) {
      "use strict";

      bHelpers.inheritsLoose(Slider_, _EventEmitter11);

      function Slider_(node, options, force, lazyInit) {
        var _this102;

        _this102 = _EventEmitter11.call(this) || this;
        _this102.node = node;
        _this102.slider = null;
        _this102.lazyInit = lazyInit;
        _this102.options = {};
        _this102.spinOptions = {};
        _this102.zoomOptions = {};
        _this102.imageOptions = {};
        _this102.videoOptions = {};
        _this102.sliderBuilder = new SliderBuilder(options, _this102.node);

        _this102.parseOptions(options);

        _this102.privateOptions = {
          common: {},
          mobile: {}
        };
        _this102.toolOptions = null;
        _this102.inViewTimer = null;
        _this102.isRun = false;
        _this102.api = {
          isReady: _this102.isReady.bind(bHelpers.assertThisInitialized(_this102)),
          // start: this.start.bind(this),
          // stop: this.stop.bind(this),
          items: _this102.items.bind(bHelpers.assertThisInitialized(_this102)),
          disableItem: _this102.disableItem.bind(bHelpers.assertThisInitialized(_this102)),
          enableItem: _this102.enableItem.bind(bHelpers.assertThisInitialized(_this102)),
          enableGroup: _this102.enableGroup.bind(bHelpers.assertThisInitialized(_this102)),
          disableGroup: _this102.disableGroup.bind(bHelpers.assertThisInitialized(_this102)),
          switchGroup: _this102.switchGroup.bind(bHelpers.assertThisInitialized(_this102)),
          insertItem: _this102.insertItem.bind(bHelpers.assertThisInitialized(_this102)),
          removeItem: _this102.removeItem.bind(bHelpers.assertThisInitialized(_this102)),
          removeAllItems: _this102.removeAllItems.bind(bHelpers.assertThisInitialized(_this102)),
          jump: _this102.jump.bind(bHelpers.assertThisInitialized(_this102)),
          itemsCount: _this102.itemsCount.bind(bHelpers.assertThisInitialized(_this102)),
          next: _this102.next.bind(bHelpers.assertThisInitialized(_this102)),
          prev: _this102.prev.bind(bHelpers.assertThisInitialized(_this102)),
          isFullscreen: _this102.isFullscreen.bind(bHelpers.assertThisInitialized(_this102)),
          fullscreen: _this102.fullscreen.bind(bHelpers.assertThisInitialized(_this102)),
          child: _this102.child.bind(bHelpers.assertThisInitialized(_this102)),
          play: _this102.play.bind(bHelpers.assertThisInitialized(_this102)),
          pause: _this102.pause.bind(bHelpers.assertThisInitialized(_this102)),
          sortItems: _this102.sortItems.bind(bHelpers.assertThisInitialized(_this102))
        };

        _this102.on('viewerPublicEvent', function (e) {
          $J.extend(e.data.slider, _this102.api);

          if (e.data.slide) {
            e.data.slide.parent = function () {
              return _this102.api;
            };

            if (e.data.slide[e.data.slide.component]) {
              e.data.slide[e.data.slide.component].parent = function () {
                return e.data.slide;
              };
            }
          }
        });

        _this102.makeOptions();

        var as = _this102.toolOptions.get('autostart');

        if (as && as !== 'off' || force) {
          _this102.run();
        }

        return _this102;
      }

      var _proto16 = Slider_.prototype;

      _proto16.parseOptions = function parseOptions(options) {
        var viewer = 'viewer';
        var spin = 'spin';
        var zoom = 'zoom';
        var image = 'image';
        var video = 'video';
        var common = options.common;
        var mobile = options.mobile;
        this.options = getOptionsByType(options, viewer, {});
        this.spinOptions = {
          common: getOptions(common, [viewer, spin]) || getOptions(common, spin) || {},
          mobile: getOptions(mobile, [viewer, spin]) || getOptions(mobile, spin) || {}
        };
        this.zoomOptions = {
          common: getOptions(common, [viewer, zoom]) || getOptions(common, zoom) || {},
          mobile: getOptions(mobile, [viewer, zoom]) || getOptions(mobile, zoom) || {}
        };
        this.imageOptions = {
          common: getOptions(common, [viewer, image]) || getOptions(common, image) || {},
          mobile: getOptions(mobile, [viewer, image]) || getOptions(mobile, image) || {}
        };
        this.videoOptions = {
          common: getOptions(common, [viewer, video]) || getOptions(common, video) || {},
          mobile: getOptions(mobile, [viewer, video]) || getOptions(mobile, video) || {}
        };
        removeProperties(this.options);
      };

      _proto16.getSlideOptions = function getSlideOptions() {
        var spin = getOptionsByType(this.privateOptions, 'spin', '');
        var zoom = getOptionsByType(this.privateOptions, 'zoom', '');
        var image = getOptionsByType(this.privateOptions, 'image', '');
        var video = getOptionsByType(this.privateOptions, 'video', '');
        return {
          spin: {
            common: this.spinOptions,
            local: spin
          },
          zoom: {
            common: this.zoomOptions,
            local: zoom
          },
          image: {
            common: this.imageOptions,
            local: image
          },
          video: {
            common: this.videoOptions,
            local: video
          }
        };
      };

      _proto16.makeOptions = function makeOptions() {
        var exclude = {
          spin: /^spin/,
          zoom: /^zoom/,
          image: /^image/,
          video: /^video/
        };
        this.toolOptions = new $J.Options(defaultOptions);
        this.toolOptions.fromJSON(this.options.common);
        this.privateOptions.common = this.toolOptions.fromString(this.node.attr('data-options') || '', exclude);
        this.privateOptions.common = clearPrivateOptions(this.privateOptions.common);

        if ($J.browser.touchScreen && $J.browser.mobile) {
          this.toolOptions.fromJSON(this.options.mobile);
          this.privateOptions.mobile = this.toolOptions.fromString(this.node.attr('data-mobile-options') || '', exclude);
          this.privateOptions.mobile = clearPrivateOptions(this.privateOptions.mobile);
        }
      };

      _proto16.createSlider = function createSlider(content) {
        this.slider = new SirvSlider(this.node, {
          options: this.toolOptions,
          slideOptions: this.getSlideOptions(),
          lazyInit: this.lazyInit,
          viewerFileContent: content
        });
        this.slider.setParent(this);
        this.api.id = this.slider.id;
      };

      _proto16.run = function run(force) {
        var _this103 = this;

        this.isRun = true;
        this.sliderBuilder.getOptions().then(function (data) {
          _this103.parseOptions(data.dataOptions);

          if (force) {
            _this103.makeOptions();
          }

          if (data.content) {
            _this103.createSlider(data.content);
          } else {
            _this103.sliderBuilder.buildViewer().then(function (data2) {
              _this103.node = data2.mainNode;

              _this103.createSlider();
            });
          }
        }).catch(function (error) {
          // eslint-disable-next-line no-console
          console.log('Sirv: cannot get view from ' + error.error);
        });
        return true;
      };

      _proto16.isReady = function isReady() {
        var result = false;

        if (this.slider) {
          result = this.slider.isReady;
        }

        return result;
      };

      _proto16.isFullscreen = function isFullscreen() {
        var result = false;

        if (this.isReady()) {
          result = this.slider.isFullscreen === 2;
        }

        return result;
      };

      _proto16.startFullInit = function startFullInit(options, force, lazyInit) {
        var as;

        if (this.slider) {
          this.lazyInit = lazyInit;
          this.parseOptions(options);
          this.makeOptions();
          as = this.toolOptions.get('autostart');

          if (as && as !== 'off' || force) {
            this.slider.startFullInit({
              options: this.toolOptions,
              slideOptions: this.getSlideOptions(),
              lazyInit: this.lazyInit
            });
          }
        }
      };

      _proto16.start = function start() {
        var result = false;

        if (!this.slider) {
          result = this.run(true);
        }

        return result;
      };

      _proto16.stop = function stop() {
        var result = false;

        if (this.slider) {
          result = true;
          this.slider.destroy();
          this.slider = null;
          this.off('viewerPublicEvent');
          this.isRun = false;
          this.sliderBuilder.destroy();
          this.sliderBuilder = null;
          this.destroy();
        }

        return result;
      };

      _proto16.insertItem = function insertItem(htmlSlide, indexOfSlide) {
        var result = false;

        if (this.isReady()) {
          if ($J.typeOf(htmlSlide) === 'string') {
            var div = $J.$new('div');
            div.node.innerHTML = htmlSlide.trim();
            htmlSlide = div.node.firstChild;

            if (htmlSlide && (htmlSlide.nodeType === 3 || htmlSlide.nodeType === 8 || !$J.contains(['div', 'img', SELECTOR_TAG], $(htmlSlide).getTagName()))) {
              htmlSlide = null;
            }
          } else if ($(htmlSlide).getTagName() === SELECTOR_TAG) {
            var _div = $J.$new('div');

            _div.append(htmlSlide);

            htmlSlide = _div.node;
          }

          result = this.slider.insertSlide(indexOfSlide, htmlSlide);
        }

        return result;
      };

      _proto16.removeItem = function removeItem(indexOfSlide) {
        var result = false;

        if (this.isReady()) {
          result = this.slider.removeSlide(indexOfSlide);
        }

        return result;
      };

      _proto16.removeAllItems = function removeAllItems() {
        var result = true;

        if (this.isReady()) {
          for (var i = this.itemsCount() - 1; i >= 0; i--) {
            var r = this.removeItem(i);

            if (result) {
              result = r;
            }
          }
        } else {
          result = false;
        }

        return result;
      };

      _proto16.itemsCount = function itemsCount(settings) {
        var result = 0;

        if (this.isReady()) {
          var items = this.items(settings);

          if (items !== null) {
            result = items.length;
          }
        }

        return result;
      };

      _proto16.items = function items(settings) {
        var _this104 = this;

        var result = null;

        if (this.isReady()) {
          result = this.slider.getItems(settings);
          result.forEach(function (item) {
            item.parent = function () {
              return _this104.api;
            };
          });
        }

        return result;
      };

      _proto16.disableItem = function disableItem(indexOfSlide) {
        var result = false;

        if (this.isReady()) {
          result = this.slider.disableSlide(indexOfSlide);
        }

        return result;
      };

      _proto16.enableItem = function enableItem(indexOfSlide) {
        var result = false;

        if (this.isReady()) {
          result = this.slider.enableSlide(indexOfSlide);
        }

        return result;
      };

      _proto16.enableGroup = function enableGroup(group) {
        var result = false;

        if (this.isReady()) {
          result = this.slider.enableGroupOfSlides(group);
        }

        return result;
      };

      _proto16.disableGroup = function disableGroup(group) {
        var result = false;

        if (this.isReady()) {
          result = this.slider.disableGroupOfSlides(group);
        }

        return result;
      };

      _proto16.switchGroup = function switchGroup(group) {
        var result = false;

        if (this.isReady()) {
          result = this.slider.switchGroupOfSlides(group);
        }

        return result;
      };

      _proto16.jump = function jump(indexOfSlide) {
        var result = false;

        if (this.isReady()) {
          result = this.slider.jump(indexOfSlide);
        }

        return result;
      };

      _proto16.next = function next() {
        var result = false;

        if (this.isReady()) {
          result = this.slider.jump('next');
        }

        return result;
      };

      _proto16.prev = function prev() {
        var result = false;

        if (this.isReady()) {
          result = this.slider.jump('prev');
        }

        return result;
      };

      _proto16.fullscreen = function fullscreen() {
        var result = false;

        if (this.isReady()) {
          if (this.isFullscreen()) {
            result = this.slider.exitFullScreen();
          } else {
            result = this.slider.enterFullScreen();
          }
        }

        return result;
      };

      _proto16.child = function child(numberOfSlide) {
        var _this105 = this;

        var result = null;

        if (this.isReady()) {
          numberOfSlide = checkArgument(numberOfSlide);
          result = this.slider.getSlide(numberOfSlide);

          if (result) {
            result.parent = function () {
              return _this105.api;
            };
          }
        }

        return result;
      };

      _proto16.play = function play(delay) {
        var result = false;

        if (this.isReady()) {
          result = this.slider.play(delay);
        }

        return result;
      };

      _proto16.pause = function pause() {
        var result = false;

        if (this.isReady()) {
          result = this.slider.pause();
        }

        return result;
      };

      _proto16.sortItems = function sortItems(order) {
        if (this.isReady()) {
          this.slider.sortItems(order);
        }
      };

      _proto16.isEqual = function isEqual(node) {
        return node === this.node;
      };

      _proto16.checkReadiness = function checkReadiness(eventname, component) {
        var result = false;

        if (this.isReady()) {
          result = this.slider.checkReadiness(eventname, component);
        }

        return result;
      };

      _proto16.sendEvent = function sendEvent(eventname, component) {
        if (this.isReady()) {
          this.slider.sendReadyEvent(eventname, component);
        }
      };

      return Slider_;
    }(EventEmitter);

    return Slider_;
  }();

  return Slider;
});
//# sourceMappingURL=slider.js.map
