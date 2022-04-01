# Vue.js Sirv Media Viewer

[![Test](https://github.com/Mefistosss/vue-js-sirv-viewer/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/Mefistosss/vue-js-sirv-viewer/actions/workflows/test.yml)

Easy to use, highly customizable Vue.js Sirv Media Viewer library.

Copy and paste this script anywhere in your HTML, usually before ```</head>```
```
<script src="https://scripts.sirv.com/sirvjs/v3/sirv.js"></script>
```
or you can use [npm module](https://www.npmjs.com/package/sirv-media-viewer-script)

## install
```
npm install --save vue-js-sirv-viewer
```
## register as plugin
```
import SirvViewer from 'vue-js-sirv-viewer';

Vue.use(SirvViewer);
```
## basic usage
```
<sirv-media-viewer
    :id='...'
    :data-src='...'
    data-options="fullscreen.enable:false;"
    :slides="[
        'https://demo.sirv.com/demo/snug/teal-b-throw.jpg',
        'https://demo.sirv.com/demo/snug/teal.spin',
        {
            src: 'https://demo.sirv.com/demo/snug/unpacked.jpg',
            type: 'image'
        }
    ]"
></sirv-media-viewer>
```
- `:id` - viewer id
- `:data-src` - using for `*.view` files, overrides `:slides`
- `data-options` - [viewer options](https://sirv.com/help/articles/sirv-media-viewer/)
- `:slides` - Array with slide sources. Sources can be String or Object.
String can be just url link
Object has additional props:
  * `id` - Slide id [String]
  * `src` - Source [String]
  * `dataOptions` - Local slide options [Object]
  * `type` - Type of slide [String]. The available props are: `spin`, `zoom`, `image`, `youtube`, `vimeo`, `video`, `html`
  * `dataThumbnailImage` - Custom thumbnail image [String]
  * `dataThumbnailHtml` - Custom thumbnail html [String]
  * `dataDisabled` - Disable slide [Boolean]
  * `dataSwipeDisabled` - Disable slide swipe [Boolean]
  * `dataHiddenSelector` - Hide selector [Boolean]
  * `dataPinned` - Pinned selector [String]. The available props are: `left`, `right`
  * `staticImage` - Static image [Boolean].

[Examples](https://test1.sirv.com/sergey/vue/index.html)

[Sirv Media Viewer documentation](https://sirv.com/help/articles/sirv-media-viewer/)