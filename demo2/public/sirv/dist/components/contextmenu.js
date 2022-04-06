Sirv.define('ContextMenu', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions'], function (bHelpers, magicJS, globalVariables, globalFunctions) {
  var moduleName = 'ContextMenu';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.sirv-contextmenu{background-color:#fff;position:fixed;margin:0;padding:5px 0;border:1px solid #f2f2f2;border-radius:3px;color:#393939;font:normal 10pt/1.3em \'Helvetica Neue\',Arial,Helvetica,sans-serif;list-style:none!important;box-shadow:0 5px 10px rgba(0,0,0,.2);cursor:default;z-index:2147483647;box-sizing:border-box}.sirv-contextmenu li{padding:4px 14px}.sirv-contextmenu li:hover{background-color:#4599fe;color:#fbfdfe}.sirv-contextmenu li[disabled]{color:#b8b8b8;background-color:transparent}.sirv-contextmenu li.menu-separator{height:1px;margin:5px 0;padding:0;background:#dedede}.sirv-contextmenu-overlay{display:block!important;position:fixed!important;top:0;right:0;bottom:0;left:0;width:auto;height:auto;overflow:hidden!important;z-index:2147483647!important}.lt-ie10-magic .sirv-contextmenu-overlay{background-image:url(data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=)}';
  });
  /* end-removable-module-css */

  /* eslint-env es6 */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  var getViewPort = function (pad) {
    var size = $J.W.getSize();
    var scroll = $J.W.getScroll();
    pad = pad || 0;
    return {
      left: pad,
      right: size.width - pad,
      top: pad,
      bottom: size.height - pad,
      x: scroll.x,
      y: scroll.y
    };
  }; // eslint-disable-next-line no-unused-vars


  var ContextmenuInstance = /*#__PURE__*/function () {
    "use strict";

    function ContextmenuInstance(target, data, cssPrefix) {
      if (undefined === cssPrefix) {
        cssPrefix = 'magic';
      }

      this.CSS_CLASS = cssPrefix + '-contextmenu';
      this.target = target; // Menu container

      this.conext = null;
      this.overlay = null;
      this.items = {}; // this.data = data;

      this.active = false;
      this.showBind = null;
      this.hideBind = null;
      this.hideOnScrollBind = null;
      this.canShow = true;
      this.position = {
        top: null,
        left: null
      };
      this.fullScreenBox = null;
      this.setup(data || []);
    }

    var _proto = ContextmenuInstance.prototype;

    _proto.isExist = function isExist(idOfItem) {
      return !!this.items[idOfItem];
    };

    _proto.setup = function setup(data) {
      var _this = this;

      this.context = $J.$new('ul').addClass(this.CSS_CLASS).addEvent('contextmenu dragstart selectstart', function (e) {
        e.stop();
      });
      data.forEach(function (item) {
        _this.addItem(item);
      });
      this.hideFX = new $J.FX(this.context, {
        duration: 200,
        onComplete: function () {
          _this.context.remove();
        }
      });
      this.target.addEvent('contextmenu', this.showBind = this.show.bind(this)); // this.overlay = $J.$new('div').setCss({
      //     'background-image': 'url(\'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=\')',
      //     display: 'block',
      //     overflow: 'hidden',
      //     'z-index': '2147483647',
      //     position: 'fixed',
      //     top: 0, bottom: 0, left: 0, right: 0,
      //     width: 'auto', height: 'auto'
      // })

      this.overlay = $J.$new('div').addClass(this.CSS_CLASS + '-overlay').addEvent('click contextmenu', this.hide.bind(this)) // .addEvent('', this.hideBind = this.hide.bind(this))
      .addEvent('mousescroll', function (e) {
        e.stop(); // this.hide();

        $(e).events[0].stop().stopQueue();
      });
      this.hideBind = $(function (e) {
        if (!_this.active) {
          return;
        }

        e.stop();

        if (e.getOriginEvent().keyCode === 27) {
          // Esc
          _this.hide();
        }
      }).bind(this);
      $J.W.addEvent('keydown', this.hideBind, 1); // eslint-disable-next-line no-unused-vars

      this.hideOnScrollBind = $(function (e) {
        if (!_this.active) {
          return;
        }

        _this.hide();
      }).bind(this);
      $J.W.addEvent('scroll', this.hideOnScrollBind);
    };

    _proto.addItem = function addItem(data) {
      var _ = this;

      var item = $J.$new('li').appendTo(this.context);

      if ($J.defined(data.separator)) {
        item.addClass('menu-separator');
      } else if ($J.defined(data.label)) {
        item.append($J.D.node.createTextNode(data.label));

        if ($J.defined(data.disabled) && data.disabled === true) {
          item.attr('disabled', true);
        }

        if ($J.typeOf(data.action) === 'function') {
          // item.addEvent('click', (e) {
          item.addEvent('btnclick', function (e) {
            e.stop();

            if (!item.attr('disabled')) {
              _.hide();

              data.action.call(data.action, _.position);
            }
          });
        }
      }

      if ($J.defined(data.hidden) && data.hidden === true) {
        item.setCss({
          display: 'none'
        });
      }

      var id = data.id || 'item-' + Math.floor(Math.random() * $J.now());
      this.items[id] = item;
      return id;
    };

    _proto.hideItem = function hideItem(id) {
      if (this.items[id]) {
        $(this.items[id]).setCss({
          display: 'none'
        });
      }
    };

    _proto.showItem = function showItem(id) {
      if (this.items[id]) {
        $(this.items[id]).setCss({
          display: ''
        });
      }
    };

    _proto.disableItem = function disableItem(id) {
      if (this.items[id]) {
        $(this.items[id]).attr('disabled', true);
      }
    };

    _proto.enableItem = function enableItem(id) {
      if (this.items[id]) {
        $(this.items[id]).removeAttr('disabled');
      }
    };

    _proto.show = function show(e) {
      var _parent = $J.D.node.body;

      if (!this.canShow) {
        return;
      }

      this.hideFX.stop();

      if ($J.browser.fullScreen.enabled()) {
        if (this.fullScreenBox || $J.D.msFullscreenElement) {
          _parent = this.fullScreenBox || $J.D.msFullscreenElement;
        }
      }

      this.overlay.appendTo(_parent);
      this.context.setCss({
        top: -10000
      }).appendTo(_parent); // this.context.setCss({ top: -10000 }).appendTo(this.overlay);

      var pos = e.getClientXY();
      var left = pos.x;
      var top = pos.y;
      var page = e.getPageXY();
      this.position.top = page.y;
      this.position.left = page.x;
      var viewport = getViewPort(5);
      var size = this.context.getSize();

      if (viewport.right < left + size.width) {
        left -= size.width;
      }

      if (viewport.bottom < top + size.height) {
        top = viewport.bottom - size.height;
      }

      this.context.setCss({
        top: top,
        left: left,
        display: 'block',
        opacity: 1
      }); // if (8 !== $J.browser.ieMode) {
      //     $($J.browser.getDoc()).setCss({ 'overflow': 'hidden' });
      // }

      this.active = true;
    };

    _proto.hide = function hide(e) {
      if (!this.active) {
        return;
      }

      this.overlay.remove(); // if (8 !== $J.browser.ieMode) {
      //     $($J.browser.getDoc()).setCss({ 'overflow': '' });
      // }

      this.hideFX.start({
        'opacity': [1, 0]
      });
      this.active = false;

      if (e) {
        e.stopDefaults();

        if (e.type === 'contextmenu') {
          var p = e.getPageXY();
          var r = this.target.getRect();

          if (r.left <= p.x && r.right >= p.x && r.top <= p.y && r.bottom >= p.y) {
            this.show(e);
          }
        }
      }
    };

    _proto.setCanShow = function setCanShow(canShow) {
      this.canShow = canShow;
    };

    _proto.setFullScreenBox = function setFullScreenBox(fullScreenBox) {
      this.setFullScreenBox = fullScreenBox;
    };

    _proto.destroy = function destroy() {
      this.target.removeEvent('contextmenu', this.showBind);
      $J.W.removeEvent('keydown', this.hideBind).removeEvent('scroll', this.hideOnScrollBind);

      try {
        this.context.kill();
      } catch (ex) {// empty
      }

      try {
        this.overlay.kill();
      } catch (ex) {// empty
      }
    };

    return ContextmenuInstance;
  }();

  return ContextmenuInstance;
});
//# sourceMappingURL=contextmenu.js.map
