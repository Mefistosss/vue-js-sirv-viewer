Sirv.define('defaultsVideoOptions',
/* eslint-env es6 */
{
  autoplay: {
    type: 'boolean',
    defaults: false
  },
  // sirvvideo, video, youtube, vimeo
  loop: {
    type: 'boolean',
    defaults: false
  },
  // sirvvideo, video, youtube, vimeo
  volume: {
    type: 'number',
    minimum: 0,
    maximum: 100,
    defaults: 100
  },
  // sirvvideo, video, youtube
  // youtube does not have preload option
  // https://developers.google.com/youtube/iframe_api_reference
  // vimeo does not have preload option
  // https://developer.vimeo.com/player/sdk/embed
  preload: {
    type: 'boolean',
    defaults: true
  },
  // sirvvideo, video
  thumbnail: {
    oneOf: [{
      type: 'url'
    }, {
      type: 'boolean',
      'enum': [false]
    }, {
      type: 'number',
      minimum: 0
    }],
    defaults: false
  },
  // 1 = little motion
  // 2 = moderate motion
  // 3 = more motion
  // 4 = high motion
  motionFactor: {
    type: 'number',
    minimum: 1,
    maximum: 4,
    defaults: 3
  },
  dynamicAdaptiveStreaming: {
    type: 'boolean',
    defaults: true
  },
  // just for videojs
  quality: {
    // quality.min
    min: {
      type: 'number',
      'enum': [360, 480, 720, 1080],
      defaults: 360
    },
    // quality.max
    max: {
      type: 'number',
      'enum': [360, 480, 720, 1080],
      defaults: 1080
    }
  },
  controls: {
    enable: {
      type: 'boolean',
      defaults: true
    },
    // sirvvideo, video, youtube
    // Volume control
    volume: {
      type: 'boolean',
      defaults: true
    },
    // sirvvideo
    // Playback rate control
    speed: {
      type: 'boolean',
      defaults: false
    },
    // sirvvideo
    // Quality (resolutions) control
    quality: {
      type: 'boolean',
      defaults: false
    },
    // sirvvideo
    // controls.fullscreen. hidden option
    fullscreen: {
      type: 'boolean',
      defaults: true
    } // sirvvideo

  }
});
//# sourceMappingURL=defaultsVideoOptions.js.map
