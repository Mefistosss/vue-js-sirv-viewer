Sirv.define('qualitySelector', ['bHelpers'], bHelpers => {
  /* eslint-env es6 */

  /* global videojs */
  const MenuItem = videojs.getComponent('MenuItem');

  class QualitySelectorMenuItem extends MenuItem {
    constructor(player, options) {
      options.selectable = true;
      options.multiSelectable = false;
      super(player, options);
      this._label = options.label;
      this._value = options.value;
    }

    get isSelected() {
      return this.isSelected_;
    }

    get label() {
      return this._label;
    }

    get value() {
      return this._value;
    }

    handleClick(event) {
      if (!this.isSelected_) {
        const plugin = this.player().hlsQualitySelectorAutoMode;
        const selectedItem = plugin.currentSelection();
        super.handleClick(event);

        if (selectedItem && selectedItem !== this) {
          selectedItem.selected(false);
        }

        plugin.setQualityAndButtonLabel(this._value, true);
      }
    }

    dispose() {
      this._label = '';
      this._value = 0;
      this.isSelected_ = false;
      super.dispose();
    }

  } // QualitySelectorMenuItem.prototype.contentElType = 'button'; // TODO I do not know why the 'contentElType' prop is necessary, because the prop does not use in videojs


  MenuItem.registerComponent('QualitySelectorMenuItem', QualitySelectorMenuItem);
  /* eslint-env es6 */

  /* global videojs */

  /* global QualitySelectorMenuItem */

  const MenuButton = videojs.getComponent('MenuButton');
  const Menu = videojs.getComponent('Menu');

  class QualitySelectorMenuButton extends MenuButton {
    constructor(player, options) {
      options.title = player.localize('Quality');
      options.name = player.localize('QualityButton');
      super(player, options);
      this.levelItems = [];

      if (this.canShow()) {
        this.show();
      } else {
        this.hide();
      }
    }

    createEl() {
      const el = super.createEl();
      this.labelEl_ = videojs.dom.createEl('div', {
        className: 'vjs-quality-button-auto-mode-label',
        innerHTML: 'auto'
      });
      el.appendChild(this.labelEl_);
      return el;
    }

    buildCSSClass() {
      return super.buildCSSClass() + ' vjs-quality-button-auto-mode-button';
    }

    buildWrapperCSSClass() {
      return super.buildWrapperCSSClass() + ' vjs-quality-button-auto-mode';
    }

    createMenu() {
      const menu = new Menu(this.player());
      (this.levelItems || []).forEach(item => {
        menu.addItem(new QualitySelectorMenuItem(this.player(), {
          label: item.label,
          value: item.value,
          selected: item.selected
        }));
      }); // this.setDysplayedQuality();

      return menu;
    }

    currentSelection() {
      if (this.menu) {
        return this.menu.children().find(item => item.isSelected) || null;
      }

      return null;
    }

    setDysplayedQuality() {
      const currentSelection = this.currentSelection();

      if (currentSelection) {
        this.labelEl_.innerHTML = currentSelection.label;
      }
    }

    set newItems(levelItems) {
      this.levelItems = levelItems;
    }
    /**
     * @param {any} height
     */


    set quality(height) {
      this.menu.children().find(item => item.value === height).handleClick();
    }

    canShow() {
      const l = this.levelItems?.length ?? 0;

      if (this.options_.visibility && this.levelItems && (this.levelItems.length > 1 && this.levelItems[l - 1].value !== 'auto' || this.levelItems.length > 2)) {
        return true;
      }

      return false;
    }

    show() {
      if (this.canShow()) {
        super.show();
      }
    }

    update() {
      super.update();
      this.setDysplayedQuality();
    }

    dispose() {
      this.levelItems = [];
      super.dispose();
    }

  }

  MenuButton.registerComponent('QualitySelectorMenuButton', QualitySelectorMenuButton);
  /* eslint-env es6 */

  /* global videojs */

  /* global QualitySelectorMenuButton */

  const Plugin = videojs.getPlugin('plugin'); // Default options for the plugin.

  const defaults = {
    visibility: true
  }; // Cross-compatibility for Video.js 5 and 6.

  const registerPlugin = videojs.registerPlugin || videojs.plugin;
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

  const getNearestValue = (value, arr) => {
    let result = arr[0].value;
    const l = arr.length - 1;
    let last = l - 1;

    if (last > -1) {
      result = arr[last].value;

      if (arr[last].value === 'auto') {
        last -= 1;
      }
    }

    if (l > 2) {
      for (let i = last - 1; i >= 0; i--) {
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

  class QualitySelectorPlugin extends Plugin {
    constructor(player, options) {
      super(player);
      this.options = options;
      this.menuButton = null;
      this.isAuto = true;
      this.minHeight = Number.MAX_SAFE_INTEGER;
      this.minDiffBitrate = Number.MAX_SAFE_INTEGER;
      this.hlsSources = options.hls || [];
      this.onAddQualityLevelHandler = this.onAddQualityLevel.bind(this);
      this.onQualityLevelChangeHandler = this.onQualityLevelChange.bind(this); // this.onTimeupdateHandler = this.onTimeupdate.bind(this);

      this.vhs = this.player.tech({
        IWillNotUseThisInPlugins: true
      }).vhs;
      this.isVHS = this.player.qualityLevels && this.vhs;
      this.currentStreamHeight = 0;
      this.levelItems = null;
      this.playPromise = null;
      this.firstPlay = true;
      this.lastHLSHeight = null;
      this.min = this.options.min;
      this.max = this.options.max; // If there is quality levels plugin and the VHS tech exists then continue.

      if (this.isVHS) {
        this.createQualityButton();
        this.bindPlayerEvents();
      } else if (this.hlsSources.length) {
        this.isAuto = false;
        this.createQualityButton();
        this.createHLSLevels();
      }
    }
    /**
     * Binds listener for quality level changes.
     */


    bindPlayerEvents() {
      const qualityLevels = this.player.qualityLevels();
      qualityLevels.on('addqualitylevel', this.onAddQualityLevelHandler);
      qualityLevels.on('change', this.onQualityLevelChangeHandler); // this.player.on('timeupdate', this.onTimeupdateHandler);
    }

    onQualityLevelChange() {
      this.menuButton.setDysplayedQuality();
    } // onTimeupdate() {
    //     if (this.isAuto) {
    //         this.checkCurrentQuality();
    //     }
    // }


    getCurrentStreamHeight() {
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


    createQualityButton() {
      this.menuButton = new QualitySelectorMenuButton(this.player, {
        visibility: this.options.visibility
      }); // const fst = this.player.controlBar.getChild('fullscreenToggle');
      // this.player.controlBar.addChild(this.menuButton, { componentClass: 'qualitySelector' }, this.player.controlBar.options_.children.length - (fst ? 2 : 1));

      const position = this.player.controlBar.options_.children.length - 2;
      this.player.controlBar.addChild(this.menuButton, {
        componentClass: 'qualitySelector'
      }, position);
    }

    createLevelItems(levels) {
      const heights = levels.map(l => l.height); // Set min/max quality

      this.min = Math.min(Math.max(...heights), this.options.min);
      this.max = Math.max(Math.min(...heights), this.min, this.options.max);
      this.minHeight = this.min; // Quality levels

      const levels_ = heights.sort((a, b) => b - a).map(h => ({
        label: h + 'p',
        value: h,
        selected: false
      }));

      if (levels_.length > 1) {
        levels_.push({
          label: 'auto',
          value: 'auto',
          selected: false
        });
      }

      return levels_;
    }

    setAndGetSelectedItem(levelItems) {
      this.getCurrentStreamHeight();
      const selectedItem = levelItems[levelItems.length - 1];
      selectedItem.selected = true;
      this.isAuto = selectedItem.value === 'auto';
      return selectedItem;
    }

    createHLSLevels() {
      this.levelItems = this.createLevelItems(this.hlsSources);
      const selectedItem = this.setAndGetSelectedItem(this.levelItems);
      this.setQualityHLS(selectedItem.value);
      this.menuButton.newItems = this.levelItems;
      this.menuButton.update();
    }
    /**
     * Executed when a quality level is added from HLS playlist.
     */


    onAddQualityLevel() {
      const levels = this.player.qualityLevels().levels_ || [];
      this.levelItems = this.createLevelItems(levels); // if (bitrateExist(levels)) {
      //     this.minDiffBitrate = getMinBitrateDifference(levels, this.minDiffBitrate);
      //     this.lastBandwidth = this.vhs.systemBandwidth;
      // }

      this.setAndGetSelectedItem(this.levelItems); // this.checkCurrentQuality(true);

      this.setQuality(null, true);
      this.menuButton.newItems = this.levelItems;
      this.menuButton.update();
    }

    setQualityHLS(height) {
      const player = this.player;
      let value = null;

      if (height === 'auto') {
        height = this.currentStreamHeight;
      }

      if (height === this.lastHLSHeight) {
        return;
      }

      for (let i = 0, l = this.hlsSources.length; i < l; i++) {
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

        const currentTime = player.currentTime();
        const isPaused = player.paused();
        player.src({
          src: this.options.host + value.index,
          type: 'application/x-mpegURL'
        });
        this.lastHLSHeight = height;

        if (!this.firstPlay) {
          this.playPromise = this.player.play(); // eslint-disable-next-line

          this.playPromise.catch(e => {
            this.playPromise = null;
          });
        }

        player.one('loadedmetadata', () => {
          if (currentTime) {
            this.player.currentTime(currentTime);
            this.player.handleTechSeeked_();
          }

          if (isPaused) {
            // if (!this.firstPlay) {
            //     player.pause();
            // }
            this.firstPlay = false;

            if (this.playPromise) {
              this.playPromise.then(() => {
                this.player.pause();
                this.playPromise = null; // eslint-disable-next-line
              }).catch(error => {
                this.playPromise = null; // Auto-play was prevented
                // Show paused UI.
              });
            }
          }
        });
      }
    }

    setQuality(height, smoothly) {
      const qualityList = this.player.qualityLevels(); // Force VHS module to re-select quality levels.
      // Don't force reselection upon level is added (height == null).

      if (smoothly && height !== null) {
        for (let i = qualityList.length - 1; i >= 0; i--) {
          if (i !== qualityList.selectedIndex) {
            qualityList[i].enabled = false;
          }
        }
      }

      for (let i = 0, l = qualityList.length; i < l; i++) {
        const quality = qualityList[i];

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


    setQualityAndButtonLabel(height, setIsAuto) {
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
    }

    currentSelection() {
      return this.menuButton.currentSelection();
    }

    recalc() {
      this.getCurrentStreamHeight();

      if (this.isAuto) {
        this.setQualityAndButtonLabel(this.currentStreamHeight);
      }
    }

    dispose() {
      // this.player.off('timeupdate', this.onTimeupdateHandler);
      if (this.isVHS) {
        const qualityLevels = this.player.qualityLevels();
        qualityLevels.off('addqualitylevel', this.onAddQualityLevelHandler);
        qualityLevels.off('change', this.onQualityLevelChangeHandler);
      }

      try {
        super.dispose();
      } catch (e) {// empty
      }
    }

  }
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


  const onPlayerReady = (player, options) => {
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


  const hlsQualitySelectorAutoMode = function (options) {
    this.ready(() => {
      onPlayerReady(this, videojs.mergeOptions(defaults, options));
    });
  }; // Register the plugin with video.js.


  registerPlugin('hlsQualitySelectorAutoMode', hlsQualitySelectorAutoMode);
  return hlsQualitySelectorAutoMode;
});
//# sourceMappingURL=qualityselector.js.map
