Sirv.define('qualitySelector', ['bHelpers', 'VideoLib'], function (bHelpers, VideoLib) {
  var moduleName = 'qualitySelector';
  /* eslint-env es6 */

  /* global videojs */

  var MenuItem = videojs.getComponent('MenuItem');

  var QualitySelectorMenuItem = /*#__PURE__*/function (_MenuItem) {
    "use strict";

    bHelpers.inheritsLoose(QualitySelectorMenuItem, _MenuItem);

    function QualitySelectorMenuItem(player, options) {
      var _this;

      options.selectable = true;
      options.multiSelectable = false;
      _this = _MenuItem.call(this, player, options) || this;
      _this.label = options.label;
      _this.value = options.value;
      return _this;
    }

    var _proto = QualitySelectorMenuItem.prototype;

    _proto.isSelected = function isSelected() {
      return this.isSelected_;
    };

    _proto.getLabel = function getLabel() {
      return this.label;
    };

    _proto.getValue = function getValue() {
      return this.value;
    };

    _proto.handleClick = function handleClick(event) {
      if (!this.isSelected()) {
        var plugin = this.player().hlsQualitySelectorAutoMode;
        var selectedItem = plugin.currentSelection();

        _MenuItem.prototype.handleClick.call(this, event);

        if (selectedItem && selectedItem !== this) {
          selectedItem.selected(false);
        }

        plugin.setQualityAndButtonLabel(this.value, true);
      }
    };

    _proto.dispose = function dispose() {
      this.label = '';
      this.value = 0;
      this.isSelected_ = false;

      _MenuItem.prototype.dispose.call(this);
    };

    return QualitySelectorMenuItem;
  }(MenuItem); // QualitySelectorMenuItem.prototype.contentElType = 'button'; // TODO I do not know why the 'contentElType' prop is necessary, because the prop does not use in videojs


  MenuItem.registerComponent('QualitySelectorMenuItem', QualitySelectorMenuItem);
  /* eslint-env es6 */

  /* global videojs */

  /* global QualitySelectorMenuItem */

  var MenuButton = videojs.getComponent('MenuButton');
  var Menu = videojs.getComponent('Menu');

  var QualitySelectorMenuButton = /*#__PURE__*/function (_MenuButton) {
    "use strict";

    bHelpers.inheritsLoose(QualitySelectorMenuButton, _MenuButton);

    function QualitySelectorMenuButton(player, options) {
      var _this2;

      options.title = player.localize('Quality');
      options.name = player.localize('QualityButton');
      _this2 = _MenuButton.call(this, player, options) || this;
      _this2.levelItems = [];

      if (_this2.canShow()) {
        _this2.show();
      } else {
        _this2.hide();
      }

      return _this2;
    }

    var _proto2 = QualitySelectorMenuButton.prototype;

    _proto2.createEl = function createEl() {
      var el = _MenuButton.prototype.createEl.call(this);

      this.labelEl_ = videojs.dom.createEl('div', {
        className: 'vjs-quality-button-auto-mode-label',
        innerHTML: 'auto'
      });
      el.appendChild(this.labelEl_);
      return el;
    };

    _proto2.buildCSSClass = function buildCSSClass() {
      return _MenuButton.prototype.buildCSSClass.call(this) + ' vjs-quality-button-auto-mode-button';
    };

    _proto2.buildWrapperCSSClass = function buildWrapperCSSClass() {
      return _MenuButton.prototype.buildWrapperCSSClass.call(this) + ' vjs-quality-button-auto-mode';
    };

    _proto2.createMenu = function createMenu() {
      var _this3 = this;

      var menu = new Menu(this.player());
      (this.levelItems || []).forEach(function (item) {
        menu.addItem(new QualitySelectorMenuItem(_this3.player(), {
          label: item.label,
          value: item.value,
          selected: item.selected
        }));
      }); // this.setDysplayedQuality();

      return menu;
    };

    _proto2.currentSelection = function currentSelection() {
      if (this.menu) {
        var menuItems = this.menu.children();

        for (var i = 0; i < menuItems.length; i++) {
          if (menuItems[i].isSelected()) {
            return menuItems[i];
          }
        }
      }

      return null;
    };

    _proto2.setDysplayedQuality = function setDysplayedQuality() {
      var currentSelection = this.currentSelection();

      if (currentSelection) {
        this.labelEl_.innerHTML = currentSelection.getLabel();
      }
    };

    _proto2.setNewItems = function setNewItems(levelItems) {
      this.levelItems = levelItems;
    };

    _proto2.setQuality = function setQuality(height) {
      var menuItems = this.menu.children();

      for (var i = 0; i < menuItems.length; i++) {
        if (menuItems[i].getValue() === height) {
          menuItems[i].handleClick();
          break;
        }
      }
    };

    _proto2.canShow = function canShow() {
      var l = this.levelItems ? this.levelItems.length : 0;

      if (this.options_.visibility && this.levelItems && (this.levelItems.length > 1 && this.levelItems[l - 1].value !== 'auto' || this.levelItems.length > 2)) {
        return true;
      }

      return false;
    };

    _proto2.show = function show() {
      if (this.canShow()) {
        _MenuButton.prototype.show.call(this);
      }
    };

    _proto2.update = function update() {
      _MenuButton.prototype.update.call(this);

      this.setDysplayedQuality();
    };

    _proto2.dispose = function dispose() {
      this.levelItems = [];

      _MenuButton.prototype.dispose.call(this);
    };

    return QualitySelectorMenuButton;
  }(MenuButton);

  MenuButton.registerComponent('QualitySelectorMenuButton', QualitySelectorMenuButton);
  /* eslint-env es6 */

  /* global videojs */

  /* global QualitySelectorMenuButton */

  var Plugin = videojs.getPlugin('plugin'); // Default options for the plugin.

  var defaults = {
    visibility: true
  }; // Cross-compatibility for Video.js 5 and 6.

  var registerPlugin = videojs.registerPlugin || videojs.plugin;
  /**
   * Check if the level list has bitrate properties
   *
   */
  // const bitrateExist = (levels) => {
  //     return levels.filter((level) => { return !!level.bitrate; }).length === levels.length;
  // };

  /**
   * Calc min difference between bitrates
   *
   */
  // const getMinBitrateDifference = (levels, defDiff) => {
  //     let result = defDiff;
  //     for (let i = 1, l = levels.length; i < l; i++) {
  //         const diff = Math.abs(levels[i].bitrate - levels[i - 1].bitrate);
  //         if (diff < result) {
  //             result = diff;
  //         }
  //     }
  //     return result;
  // };

  var getNearestValue = function (value, arr) {
    var result = arr[0].value;
    var l = arr.length - 1;
    var last = l - 1;

    if (last > -1) {
      result = arr[last].value;

      if (arr[last].value === 'auto') {
        last -= 1;
      }
    }

    if (l > 2) {
      for (var i = last - 1; i >= 0; i--) {
        if (value > arr[i + 1].value) {
          if (value <= arr[i].value) {
            if (Math.abs(arr[i + 1].value - value) < Math.abs(arr[i].value - value)) {
              result = arr[i + 1].value;
            } else {
              result = arr[i].value;
            }

            break;
          } else {
            result = arr[i].value;
          }
        } else {
          break;
        }
      }
    }

    return result;
  };

  var QualitySelectorPlugin = /*#__PURE__*/function (_Plugin) {
    "use strict";

    bHelpers.inheritsLoose(QualitySelectorPlugin, _Plugin);

    function QualitySelectorPlugin(player, options) {
      var _this4;

      _this4 = _Plugin.call(this, player) || this;
      _this4.options = options;
      _this4.menuButton = null;
      _this4.isAuto = true;
      _this4.minHeight = Number.MAX_SAFE_INTEGER;
      _this4.minDiffBitrate = Number.MAX_SAFE_INTEGER;
      _this4.hlsSources = options.hls || [];
      _this4.onAddQualityLevelHandler = _this4.onAddQualityLevel.bind(bHelpers.assertThisInitialized(_this4));
      _this4.onQualityLevelChangeHandler = _this4.onQualityLevelChange.bind(bHelpers.assertThisInitialized(_this4)); // this.onTimeupdateHandler = this.onTimeupdate.bind(this);

      _this4.vhs = _this4.player.tech({
        IWillNotUseThisInPlugins: true
      }).vhs;
      _this4.isVHS = _this4.player.qualityLevels && _this4.vhs;
      _this4.currentStreamHeight = 0;
      _this4.levelItems = null;
      _this4.playPromise = null;
      _this4.firstPlay = true;
      _this4.lastHLSHeight = null;
      _this4.min = _this4.options.min;
      _this4.max = _this4.options.max; // If there is quality levels plugin and the VHS tech exists then continue.

      if (_this4.isVHS) {
        _this4.createQualityButton();

        _this4.bindPlayerEvents();
      } else if (_this4.hlsSources.length) {
        _this4.isAuto = false;

        _this4.createQualityButton();

        _this4.createHLSLevels();
      }

      return _this4;
    }
    /**
     * Binds listener for quality level changes.
     */


    var _proto3 = QualitySelectorPlugin.prototype;

    _proto3.bindPlayerEvents = function bindPlayerEvents() {
      var qualityLevels = this.player.qualityLevels();
      qualityLevels.on('addqualitylevel', this.onAddQualityLevelHandler);
      qualityLevels.on('change', this.onQualityLevelChangeHandler); // this.player.on('timeupdate', this.onTimeupdateHandler);
    };

    _proto3.onQualityLevelChange = function onQualityLevelChange() {
      this.menuButton.setDysplayedQuality();
    } // onTimeupdate() {
    //     if (this.isAuto) {
    //         this.checkCurrentQuality();
    //     }
    // }
    ;

    _proto3.getCurrentStreamHeight = function getCurrentStreamHeight() {
      if (this.levelItems) {
        this.currentStreamHeight = getNearestValue(this.player.currentHeight(), this.levelItems);

        if (this.currentStreamHeight < this.min) {
          this.currentStreamHeight = this.min;
        }

        if (this.currentStreamHeight > this.max) {
          this.currentStreamHeight = this.max;
        }
      }
    }
    /*
    checkCurrentQuality(force) {
        const currentBandwidth = this.vhs.systemBandwidth;
         if (Math.abs(this.lastBandwidth - currentBandwidth) >= this.minDiffBitrate || force) {
            let nextHeight = this.minHeight;
             (this.player.qualityLevels().levels_ || []).forEach((level) => {
                if (level.bitrate <= currentBandwidth && level.height > nextHeight) {
                    nextHeight = level.height;
                     if (this.currentStreamHeight && nextHeight > this.currentStreamHeight) {
                        nextHeight = this.currentStreamHeight;
                    }
                }
            });
             if (nextHeight < this.min) {
                nextHeight = this.min;
            }
             if (nextHeight > this.max) {
                nextHeight = this.max;
            }
             this.setQuality(nextHeight, !force);
             this.lastBandwidth = currentBandwidth;
        }
    }
    */

    /**
     * Adds the quality menu button to the player control bar.
     */
    ;

    _proto3.createQualityButton = function createQualityButton() {
      this.menuButton = new QualitySelectorMenuButton(this.player, {
        visibility: this.options.visibility
      }); // const fst = this.player.controlBar.getChild('fullscreenToggle');
      // this.player.controlBar.addChild(this.menuButton, { componentClass: 'qualitySelector' }, this.player.controlBar.options_.children.length - (fst ? 2 : 1));

      var position = this.player.controlBar.options_.children.length - 2;
      this.player.controlBar.addChild(this.menuButton, {
        componentClass: 'qualitySelector'
      }, position);
    };

    _proto3.createLevelItems = function createLevelItems(levels) {
      var heights = levels.map(function (l) {
        return l.height;
      }); // Set min/max quality

      this.min = Math.min(Math.max.apply(Math, heights), this.options.min);
      this.max = Math.max(Math.min.apply(Math, heights), this.min, this.options.max);
      this.minHeight = this.min; // Quality levels

      var levels_ = heights.sort(function (a, b) {
        return b - a;
      }).map(function (h) {
        return {
          label: h + 'p',
          value: h,
          selected: false
        };
      });

      if (levels_.length > 1) {
        levels_.push({
          label: 'auto',
          value: 'auto',
          selected: false
        });
      }

      return levels_;
    };

    _proto3.setAndGetSelectedItem = function setAndGetSelectedItem(levelItems) {
      this.getCurrentStreamHeight();
      var selectedItem = levelItems[levelItems.length - 1];
      selectedItem.selected = true;
      this.isAuto = selectedItem.value === 'auto';
      return selectedItem;
    };

    _proto3.createHLSLevels = function createHLSLevels() {
      this.levelItems = this.createLevelItems(this.hlsSources);
      var selectedItem = this.setAndGetSelectedItem(this.levelItems);
      this.setQualityHLS(selectedItem.value);
      this.menuButton.setNewItems(this.levelItems);
      this.menuButton.update();
    }
    /**
     * Executed when a quality level is added from HLS playlist.
     */
    ;

    _proto3.onAddQualityLevel = function onAddQualityLevel() {
      var levels = this.player.qualityLevels().levels_ || [];
      this.levelItems = this.createLevelItems(levels); // if (bitrateExist(levels)) {
      //     this.minDiffBitrate = getMinBitrateDifference(levels, this.minDiffBitrate);
      //     this.lastBandwidth = this.vhs.systemBandwidth;
      // }

      this.setAndGetSelectedItem(this.levelItems); // this.checkCurrentQuality(true);

      this.setQuality(null, true);
      this.menuButton.setNewItems(this.levelItems);
      this.menuButton.update();
    };

    _proto3.setQualityHLS = function setQualityHLS(height) {
      var _this5 = this;

      var player = this.player;
      var value = null;

      if (height === 'auto') {
        height = this.currentStreamHeight;
      }

      if (height === this.lastHLSHeight) {
        return;
      }

      for (var i = 0, l = this.hlsSources.length; i < l; i++) {
        if (height === this.hlsSources[i].height) {
          value = this.hlsSources[i];
          break;
        }
      }

      if (value) {
        if (this.playPromise) {
          try {
            this.playPromise.reject();
          } catch (e) {// empty
          }

          this.playPromise = null;
        }

        var currentTime = player.currentTime();
        var isPaused = player.paused();
        player.src({
          src: this.options.host + value.index,
          type: 'application/x-mpegURL'
        });
        this.lastHLSHeight = height;

        if (!this.firstPlay) {
          this.playPromise = this.player.play(); // eslint-disable-next-line

          this.playPromise.catch(function (e) {
            _this5.playPromise = null;
          });
        }

        player.one('loadedmetadata', function () {
          if (currentTime) {
            _this5.player.currentTime(currentTime);

            _this5.player.handleTechSeeked_();
          }

          if (isPaused) {
            // if (!this.firstPlay) {
            //     player.pause();
            // }
            _this5.firstPlay = false;

            if (_this5.playPromise) {
              _this5.playPromise.then(function () {
                _this5.player.pause();

                _this5.playPromise = null; // eslint-disable-next-line
              }).catch(function (error) {
                _this5.playPromise = null; // Auto-play was prevented
                // Show paused UI.
              });
            }
          }
        });
      }
    };

    _proto3.setQuality = function setQuality(height, smoothly) {
      var qualityList = this.player.qualityLevels(); // Force VHS module to re-select quality levels.
      // Don't force reselection upon level is added (height == null).

      if (smoothly && height !== null) {
        for (var i = qualityList.length - 1; i >= 0; i--) {
          if (i !== qualityList.selectedIndex) {
            qualityList[i].enabled = false;
          }
        }
      }

      for (var _i = 0, l = qualityList.length; _i < l; _i++) {
        var quality = qualityList[_i];

        if (smoothly) {
          // quality.enabled = quality.height >= height && quality.height >= this.min && quality.height <= this.max;
          quality.enabled = quality.height >= this.min && quality.height <= this.max;
        } else {
          quality.enabled = quality.height === height;
        }
      }
    }
    /**
     * Sets quality (based on media height)
     *
     * @param {number} height - A number representing HLS playlist.
     */
    ;

    _proto3.setQualityAndButtonLabel = function setQualityAndButtonLabel(height, setIsAuto) {
      if (setIsAuto) {
        // by control
        this.isAuto = height === 'auto';
      }

      if (this.isVHS) {
        if (this.isAuto) {
          // this.checkCurrentQuality();
          this.setQuality(height, true);
        } else {
          this.setQuality(height);
        }
      } else {
        this.setQualityHLS(height);
      }

      this.menuButton.setDysplayedQuality();
      this.menuButton.unpressButton();
    };

    _proto3.currentSelection = function currentSelection() {
      return this.menuButton.currentSelection();
    };

    _proto3.recalc = function recalc() {
      this.getCurrentStreamHeight();

      if (this.isAuto) {
        this.setQualityAndButtonLabel(this.currentStreamHeight);
      }
    };

    _proto3.dispose = function dispose() {
      // this.player.off('timeupdate', this.onTimeupdateHandler);
      if (this.isVHS) {
        var qualityLevels = this.player.qualityLevels();
        qualityLevels.off('addqualitylevel', this.onAddQualityLevelHandler);
        qualityLevels.off('change', this.onQualityLevelChangeHandler);
      }

      try {
        _Plugin.prototype.dispose.call(this);
      } catch (e) {// empty
      }
    };

    return QualitySelectorPlugin;
  }(Plugin);
  /**
   * Function to invoke when the player is ready.
   *
   * This is a great place for your plugin to initialize itself. When this
   * function is called, the player will have its DOM and child components
   * in place.
   *
   * @function onPlayerReady
   * @param    {Player} player
   *           A Video.js player object.
   *
   * @param    {Object} [options={}]
   *           A plain object containing options for the plugin.
   */


  var onPlayerReady = function (player, options) {
    player.hlsQualitySelectorAutoMode = new QualitySelectorPlugin(player, options);
  };
  /**
   * A video.js plugin.
   *
   * In the plugin function, the value of `this` is a video.js `Player`
   * instance. You cannot rely on the player being in a "ready" state here,
   * depending on how the plugin is invoked. This may or may not be important
   * to you; if not, remove the wait for "ready"!
   *
   * @function hlsQualitySelector
   * @param    {Object} [options={}]
   *           An object of options left to the plugin author to define.
   */


  var hlsQualitySelectorAutoMode = function (options) {
    var _this6 = this;

    this.ready(function () {
      onPlayerReady(_this6, videojs.mergeOptions(defaults, options));
    });
  }; // Register the plugin with video.js.


  registerPlugin('hlsQualitySelectorAutoMode', hlsQualitySelectorAutoMode);
  return hlsQualitySelectorAutoMode;
});
//# sourceMappingURL=qualityselector.js.map
