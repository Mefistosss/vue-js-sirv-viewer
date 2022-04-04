/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 744:
/***/ (function(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.Z = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject = require("vue");
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/ts-loader/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SirvViewer.vue?vue&type=template&id=0f332bd4&ts=true

var _hoisted_1 = ["data-options", "id", "data-src", "data-bg-src"];
var _hoisted_2 = ["id", "data-src", "data-options"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
    var _component_sirv_component = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.resolveComponent)("sirv-component");
    return (!_ctx.isImage(_ctx.dataSrc))
        ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", {
            key: 0,
            class: "Sirv",
            "data-options": _ctx.stringOptions,
            id: _ctx.id,
            "data-src": _ctx.dataSrc,
            "data-bg-src": _ctx.dataBgSrc,
            style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeStyle)(_ctx.$attrs.style)
        }, [
            ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderList)(_ctx.parsedComponents, function (slide) {
                return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createBlock)(_component_sirv_component, {
                    key: slide.src,
                    src: slide.src,
                    type: slide.type,
                    componentOptions: slide.dataOptions,
                    id: slide.id,
                    thumbnailImage: slide.dataThumbnailImage,
                    thumbnailHtml: slide.dataThumbnailHtml,
                    slideDisabled: slide.dataDisabled,
                    swipeDisabled: slide.dataSwipeDisabled,
                    hiddenSelector: slide.dataHiddenSelector,
                    pinned: slide.dataPinned,
                    staticImage: slide.staticImage
                }, null, 8, ["src", "type", "componentOptions", "id", "thumbnailImage", "thumbnailHtml", "slideDisabled", "swipeDisabled", "hiddenSelector", "pinned", "staticImage"]));
            }), 128)),
            (_ctx.parsedComponents.length == 0)
                ? (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.renderSlot)(_ctx.$slots, "default", { key: 0 })
                : (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createCommentVNode)("", true)
        ], 12, _hoisted_1))
        : ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("img", {
            key: 1,
            class: "Sirv",
            id: _ctx.id,
            "data-src": _ctx.dataSrc,
            "data-options": _ctx.stringOptions
        }, null, 8, _hoisted_2));
}

;// CONCATENATED MODULE: ./src/components/SirvViewer.vue?vue&type=template&id=0f332bd4&ts=true

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/ts-loader/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SirvComponent.vue?vue&type=template&id=6356b242&ts=true

var SirvComponentvue_type_template_id_6356b242_ts_true_hoisted_1 = ["data-src", "data-options", "id", "data-thumbnail-image", "data-thumbnail-html", "data-disabled", "data-swipe-disabled", "data-hidden-selector"];
var SirvComponentvue_type_template_id_6356b242_ts_true_hoisted_2 = ["innerHTML", "data-type", "data-src", "data-options", "id", "data-thumbnail-image", "data-thumbnail-html", "data-disabled", "data-swipe-disabled", "data-hidden-selector"];
function SirvComponentvue_type_template_id_6356b242_ts_true_render(_ctx, _cache, $props, $setup, $data, $options) {
    return (_ctx.type == 'image')
        ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("img", {
            key: 0,
            "data-src": _ctx.src,
            "data-options": _ctx.optionsToString,
            id: _ctx.id,
            "data-thumbnail-image": _ctx.thumbnailImage,
            "data-thumbnail-html": _ctx.thumbnailHtml,
            "data-disabled": _ctx.slideDisabled,
            "data-swipe-disabled": _ctx.swipeDisabled,
            "data-hidden-selector": _ctx.hiddenSelector
        }, null, 8, SirvComponentvue_type_template_id_6356b242_ts_true_hoisted_1))
        : ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("div", {
            key: 1,
            innerHTML: _ctx.type == 'html' ? _ctx.src : null,
            "data-type": _ctx.type == 'zoom' ? 'zoom' : (_ctx.staticImage || null),
            "data-src": _ctx.type == 'html' ? null : _ctx.src,
            "data-options": _ctx.optionsToString,
            id: _ctx.id,
            "data-thumbnail-image": _ctx.thumbnailImage,
            "data-thumbnail-html": _ctx.thumbnailHtml,
            "data-disabled": _ctx.slideDisabled,
            "data-swipe-disabled": _ctx.swipeDisabled,
            "data-hidden-selector": _ctx.hiddenSelector
        }, null, 8, SirvComponentvue_type_template_id_6356b242_ts_true_hoisted_2));
}

;// CONCATENATED MODULE: ./src/components/SirvComponent.vue?vue&type=template&id=6356b242&ts=true

;// CONCATENATED MODULE: ./src/utils/optionsToString.ts
var optionsToString = function (opt, subStr) {
    if (typeof opt === 'object' && opt !== null) {
        var arr_1 = [];
        Object.entries(opt).forEach(function (values) {
            var str = subStr ? subStr + '.' + values[0] : values[0];
            arr_1.push(optionsToString(values[1], str));
        });
        return arr_1.join(';');
    }
    else {
        return subStr + ':' + opt;
    }
};
/* harmony default export */ var utils_optionsToString = (optionsToString);

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/ts-loader/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SirvComponent.vue?vue&type=script&lang=ts
// v-if="['spin', 'zoom', 'youtube', 'vimeo', 'video', 'html'].includes(type)"


/* harmony default export */ var SirvComponentvue_type_script_lang_ts = ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.defineComponent)({
    name: 'SirvComponent',
    props: {
        src: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: null
        },
        id: {
            type: String,
            default: null
        },
        thumbnailImage: {
            type: String,
            default: null
        },
        thumbnailHtml: {
            type: String,
            default: null
        },
        slideDisabled: {
            type: [String, Boolean],
            default: null,
            valdatator: function (value) {
                return value === false || value === '';
            }
        },
        swipeDisabled: {
            type: [String, Boolean],
            default: null,
            valdatator: function (value) {
                return value === false || value === '';
            }
        },
        hiddenSelector: {
            type: [String, Boolean],
            default: null,
            valdatator: function (value) {
                return value === false || value === '';
            }
        },
        pinned: {
            type: String,
            default: null,
            valdatator: function (value) {
                return ['start', 'end'].indexOf(value) !== -1;
            }
        },
        staticImage: {
            type: String,
            default: null,
            valdatator: function (value) {
                return ['static'].indexOf(value) !== -1;
            }
        },
        componentOptions: {
            type: Object,
            default: null
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    created: function () { },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mounted: function () { },
    computed: {
        optionsToString: function () {
            var o = this.componentOptions;
            if (o && Object.keys(o).length > 0) {
                return utils_optionsToString(o);
            }
            else {
                return null;
            }
        }
    },
    methods: {
        div: function () {
            return ['spin'].includes(this.type);
        }
    }
}));

;// CONCATENATED MODULE: ./src/components/SirvComponent.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(744);
;// CONCATENATED MODULE: ./src/components/SirvComponent.vue




;
const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(SirvComponentvue_type_script_lang_ts, [['render',SirvComponentvue_type_template_id_6356b242_ts_true_render]])

/* harmony default export */ var SirvComponent = (__exports__);
;// CONCATENATED MODULE: ./src/utils/isSpin.ts
var isSpin = function (src) {
    if (src === void 0) { src = ''; }
    return /\.spin$/.test(src);
};
/* harmony default export */ var utils_isSpin = (isSpin);

;// CONCATENATED MODULE: ./src/utils/isImage.ts
var isImage = function (src) {
    if (src === void 0) { src = ''; }
    return /\.(jpg|jpeg|png|webp|gif|svg)$/.test(src);
};
/* harmony default export */ var utils_isImage = (isImage);

;// CONCATENATED MODULE: ./src/utils/isYoutube.ts
var isYoutube = function (src) {
    if (src === void 0) { src = ''; }
    return /^(https?:)?\/\/((www\.)?youtube\.com|youtu\.be)\//.test(src);
};
/* harmony default export */ var utils_isYoutube = (isYoutube);

;// CONCATENATED MODULE: ./src/utils/isVimeo.ts
var isVimeo = function (src) {
    if (src === void 0) { src = ''; }
    return /^(https?:)?\/\/((www|player)\.)?vimeo\.com\//.test(src);
};
/* harmony default export */ var utils_isVimeo = (isVimeo);

;// CONCATENATED MODULE: ./src/utils/isVideo.ts
var isVideo = function (src) {
    if (src === void 0) { src = ''; }
    return /([^#?]+)\/?([^#?]+\.(mp4|mov|avi|m4v|mkv|webm|wmv|ogv|ogg))(\?([^#]*))?(#(.*))?$/i.test(src);
};
/* harmony default export */ var utils_isVideo = (isVideo);

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/ts-loader/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SirvViewer.vue?vue&type=script&lang=ts








var getComponentType = function (src) {
    var result = 'html';
    if (utils_isSpin(src)) {
        result = 'spin';
    }
    else if (utils_isImage(src)) {
        // result = 'image';
        result = 'zoom';
    }
    else if (utils_isYoutube(src)) {
        result = 'youtube';
    }
    else if (utils_isVimeo(src)) {
        result = 'vimeo';
    }
    else if (utils_isVideo(src)) {
        result = 'video';
    }
    return result;
};
var setNullByDefault = function (value) {
    if (!value) {
        value = null;
    }
    return value;
};
/* harmony default export */ var SirvViewervue_type_script_lang_ts = ((0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.defineComponent)({
    name: 'SirvMediaViewer',
    inheritAttrs: true,
    components: { SirvComponent: SirvComponent },
    props: {
        options: {
            type: Object,
            default: function () { return { autostart: 'off' }; }
        },
        dataBgSrc: {
            type: String,
            default: null
        },
        dataSrc: {
            type: String,
            default: function () {
                return null;
            }
        },
        slides: {
            type: Array,
            default: function () { return []; }
        },
        id: {
            type: String,
            default: function () { return 'vue-viewer-' + (+new Date()); }
        }
    },
    created: function () {
        // this.lazyImage = this.dataSrc && isImage(this.dataSrc) || this.dataBgSrc;
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setup: function () { },
    computed: {
        parsedComponents: function () {
            // let c = this.slides;
            if (this.dataSrc || this.dataBgSrc) {
                return [];
            }
            else {
                var c = this.slides;
                if (!Array.isArray(c)) {
                    c = [c];
                }
                c = c.map(function (v) {
                    if (typeof v === 'string') {
                        v = { src: v };
                    }
                    if (!v.type) {
                        v.type = getComponentType(v.src);
                    }
                    v.dataOptions = setNullByDefault(v.dataOptions);
                    v.id = setNullByDefault(v.id);
                    v.dataPinned = setNullByDefault(v.dataPinned);
                    v.dataThumbnailImage = setNullByDefault(v.dataThumbnailImage);
                    v.dataThumbnailHtml = setNullByDefault(v.dataThumbnailHtml);
                    if (v.dataDisabled) {
                        v.dataDisabled = '';
                    }
                    else {
                        v.dataDisabled = null;
                    }
                    if (v.dataSwipeDisabled) {
                        v.dataSwipeDisabled = '';
                    }
                    else {
                        v.dataSwipeDisabled = null;
                    }
                    if (v.dataHiddenSelector) {
                        v.dataHiddenSelector = '';
                    }
                    else {
                        v.dataHiddenSelector = null;
                    }
                    v.staticImage = v.staticImage === true ? 'static' : null;
                    return v;
                });
                return c;
            }
        },
        stringOptions: function () {
            var opt = this.options;
            if (!opt.autostart) {
                opt.autostart = 'off';
            }
            return utils_optionsToString(opt);
        }
    },
    methods: {
        isImage: utils_isImage,
        start: function () {
            window.Sirv.start('#' + this.id);
        },
        stop: function () {
            window.Sirv.stop('#' + this.id);
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        on: function () { },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        off: function () { }
    },
    mounted: function () {
        this.start();
    },
    beforeUnmount: function () {
        this.stop();
    }
}));

;// CONCATENATED MODULE: ./src/components/SirvViewer.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./src/components/SirvViewer.vue




;
const SirvViewer_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(SirvViewervue_type_script_lang_ts, [['render',render]])

/* harmony default export */ var SirvViewer = (SirvViewer_exports_);
;// CONCATENATED MODULE: ./src/index.ts

var VueJsSirvViewer = {
    install: function (Vue) {
        // Let's register our component globally
        // https://vuejs.org/v2/guide/components-registration.html
        Vue.component("sirv-media-viewer", SirvViewer);
        Vue.config.globalProperties.$smv = window.Sirv;
    }
};
// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueJsSirvViewer);
}
/* harmony default export */ var src_0 = (VueJsSirvViewer);

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (src_0);


}();
module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.common.js.map