if (!window.Sirv) {
  (function () {
    var _this5 = this;

    window.Sirv = {}; // sirvRequire === require

    var sirvRequirejs = function (window) {
      /** vim: et:ts=4:sw=4:sts=4
      * @license RequireJS 2.3.6 Copyright jQuery Foundation and other contributors.
      * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
      */
      //Not using strict: uneven strict support in browsers, #392, and causes
      //problems with requirejs.exec()/transpiler plugins that may not be strict.

      /*jslint regexp: true, nomen: true, sloppy: true */

      /*global window, navigator, document, importScripts, setTimeout, opera */
      var requirejs, require, define;

      (function (global, setTimeout) {
        var req,
            s,
            head,
            baseElement,
            dataMain,
            src,
            interactiveScript,
            currentlyAddingScript,
            mainScript,
            subPath,
            version = '2.3.6',
            commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
            cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
            jsSuffixRegExp = /\.js$/,
            currDirRegExp = /^\.\//,
            op = Object.prototype,
            ostring = op.toString,
            hasOwn = op.hasOwnProperty,
            isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
            isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
            //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ? /^complete$/ : /^(complete|loaded)$/,
            defContextName = '_',
            //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
            contexts = {},
            cfg = {},
            globalDefQueue = [],
            useInteractive = false; //Could match something like ')//comment', do not lose the prefix to comment.

        function commentReplace(match, singlePrefix) {
          return singlePrefix || '';
        }

        function isFunction(it) {
          return ostring.call(it) === '[object Function]';
        }

        function isArray(it) {
          return ostring.call(it) === '[object Array]';
        }
        /**
         * Helper function for iterating over an array. If the func returns
         * a true value, it will break out of the loop.
         */


        function each(ary, func) {
          if (ary) {
            var i;

            for (i = 0; i < ary.length; i += 1) {
              if (ary[i] && func(ary[i], i, ary)) {
                break;
              }
            }
          }
        }
        /**
         * Helper function for iterating over an array backwards. If the func
         * returns a true value, it will break out of the loop.
         */


        function eachReverse(ary, func) {
          if (ary) {
            var i;

            for (i = ary.length - 1; i > -1; i -= 1) {
              if (ary[i] && func(ary[i], i, ary)) {
                break;
              }
            }
          }
        }

        function hasProp(obj, prop) {
          return hasOwn.call(obj, prop);
        }

        function getOwn(obj, prop) {
          return hasProp(obj, prop) && obj[prop];
        }
        /**
         * Cycles over properties in an object and calls a function for each
         * property value. If the function returns a truthy value, then the
         * iteration is stopped.
         */


        function eachProp(obj, func) {
          var prop;

          for (prop in obj) {
            if (hasProp(obj, prop)) {
              if (func(obj[prop], prop)) {
                break;
              }
            }
          }
        }
        /**
         * Simple function to mix in properties from source into target,
         * but only if target does not already have a property of the same name.
         */


        function mixin(target, source, force, deepStringMixin) {
          if (source) {
            eachProp(source, function (value, prop) {
              if (force || !hasProp(target, prop)) {
                if (deepStringMixin && typeof value === 'object' && value && !isArray(value) && !isFunction(value) && !(value instanceof RegExp)) {
                  if (!target[prop]) {
                    target[prop] = {};
                  }

                  mixin(target[prop], value, force, deepStringMixin);
                } else {
                  target[prop] = value;
                }
              }
            });
          }

          return target;
        } //Similar to Function.prototype.bind, but the 'this' object is specified
        //first, since it is easier to read/figure out what 'this' will be.


        function bind(obj, fn) {
          return function () {
            return fn.apply(obj, arguments);
          };
        }

        function scripts() {
          return document.getElementsByTagName('script');
        }

        function defaultOnError(err) {
          throw err;
        } //Allow getting a global that is expressed in
        //dot notation, like 'a.b.c'.


        function getGlobal(value) {
          if (!value) {
            return value;
          }

          var g = global;
          each(value.split('.'), function (part) {
            g = g[part];
          });
          return g;
        }
        /**
         * Constructs an error with a pointer to an URL with more information.
         * @param {String} id the error ID that maps to an ID on a web page.
         * @param {String} message human readable error.
         * @param {Error} [err] the original error, if there is one.
         *
         * @returns {Error}
         */


        function makeError(id, msg, err, requireModules) {
          var e = new Error(msg + '\nhttps://requirejs.org/docs/errors.html#' + id);
          e.requireType = id;
          e.requireModules = requireModules;

          if (err) {
            e.originalError = err;
          }

          return e;
        }

        if (typeof define !== 'undefined') {
          //If a define is already in play via another AMD loader,
          //do not overwrite.
          return;
        }

        if (typeof requirejs !== 'undefined') {
          if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
          }

          cfg = requirejs;
          requirejs = undefined;
        } //Allow for a require config object


        if (typeof require !== 'undefined' && !isFunction(require)) {
          //assume it is a config object.
          cfg = require;
          require = undefined;
        }

        function newContext(contextName) {
          var inCheckLoaded,
              Module,
              context,
              handlers,
              checkLoadedTimeoutId,
              config = {
            //Defaults. Do not set a default for map
            //config to speed up normalize(), which
            //will run faster if there is no default.
            waitSeconds: 7,
            baseUrl: './',
            paths: {},
            bundles: {},
            pkgs: {},
            shim: {},
            config: {}
          },
              registry = {},
              //registry of just enabled modules, to speed
          //cycle breaking code when lots of modules
          //are registered, but not activated.
          enabledRegistry = {},
              undefEvents = {},
              defQueue = [],
              defined = {},
              urlFetched = {},
              bundlesMap = {},
              requireCounter = 1,
              unnormalizedCounter = 1;
          /**
           * Trims the . and .. from an array of path segments.
           * It will keep a leading path segment if a .. will become
           * the first path segment, to help with module name lookups,
           * which act like paths, but can be remapped. But the end result,
           * all paths that use this function should look normalized.
           * NOTE: this method MODIFIES the input array.
           * @param {Array} ary the array of path segments.
           */

          function trimDots(ary) {
            var i, part;

            for (i = 0; i < ary.length; i++) {
              part = ary[i];

              if (part === '.') {
                ary.splice(i, 1);
                i -= 1;
              } else if (part === '..') {
                // If at the start, or previous value is still ..,
                // keep them so that when converted to a path it may
                // still work when converted to a path, even though
                // as an ID it is less than ideal. In larger point
                // releases, may be better to just kick out an error.
                if (i === 0 || i === 1 && ary[2] === '..' || ary[i - 1] === '..') {
                  continue;
                } else if (i > 0) {
                  ary.splice(i - 1, 2);
                  i -= 2;
                }
              }
            }
          }
          /**
           * Given a relative module name, like ./something, normalize it to
           * a real name that can be mapped to a path.
           * @param {String} name the relative name
           * @param {String} baseName a real name that the name arg is relative
           * to.
           * @param {Boolean} applyMap apply the map config to the value. Should
           * only be done if this normalization is for a dependency ID.
           * @returns {String} normalized name
           */


          function normalize(name, baseName, applyMap) {
            var pkgMain,
                mapValue,
                nameParts,
                i,
                j,
                nameSegment,
                lastIndex,
                foundMap,
                foundI,
                foundStarMap,
                starI,
                normalizedBaseParts,
                baseParts = baseName && baseName.split('/'),
                map = config.map,
                starMap = map && map['*']; //Adjust any relative paths.

            if (name) {
              name = name.split('/');
              lastIndex = name.length - 1; // If wanting node ID compatibility, strip .js from end
              // of IDs. Have to do this here, and not in nameToUrl
              // because node allows either .js or non .js to map
              // to same file.

              if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
              } // Starts with a '.' so need the baseName


              if (name[0].charAt(0) === '.' && baseParts) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that 'directory' and not name of the baseName's
                //module. For instance, baseName of 'one/two/three', maps to
                //'one/two/three.js', but we want the directory, 'one/two' for
                //this normalization.
                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                name = normalizedBaseParts.concat(name);
              }

              trimDots(name);
              name = name.join('/');
            } //Apply map config if available.


            if (applyMap && map && (baseParts || starMap)) {
              nameParts = name.split('/');

              outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join('/');

                if (baseParts) {
                  //Find the longest baseName segment match in the config.
                  //So, do joins on the biggest to smallest lengths of baseParts.
                  for (j = baseParts.length; j > 0; j -= 1) {
                    mapValue = getOwn(map, baseParts.slice(0, j).join('/')); //baseName segment has config, find if it has one for
                    //this name.

                    if (mapValue) {
                      mapValue = getOwn(mapValue, nameSegment);

                      if (mapValue) {
                        //Match, update name to the new value.
                        foundMap = mapValue;
                        foundI = i;
                        break outerLoop;
                      }
                    }
                  }
                } //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.


                if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                  foundStarMap = getOwn(starMap, nameSegment);
                  starI = i;
                }
              }

              if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
              }

              if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
              }
            } // If the name points to a package's name, use
            // the package main instead.


            pkgMain = getOwn(config.pkgs, name);
            return pkgMain ? pkgMain : name;
          }

          function removeScript(name) {
            if (isBrowser) {
              each(scripts(), function (scriptNode) {
                if (scriptNode.getAttribute('data-requiremodule') === name && scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                  scriptNode.parentNode.removeChild(scriptNode);
                  return true;
                }
              });
            }
          }

          function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);

            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
              //Pop off the first array value, since it failed, and
              //retry
              pathConfig.shift();

              context.require.undef(id); //Custom require that does not do map translation, since
              //ID is "absolute", already mapped/resolved.


              context.makeRequire(null, {
                skipMap: true
              })([id]);
              return true;
            }
          } //Turns a plugin!resource to [plugin, resource]
          //with the plugin being undefined if the name
          //did not have a plugin prefix.


          function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;

            if (index > -1) {
              prefix = name.substring(0, index);
              name = name.substring(index + 1, name.length);
            }

            return [prefix, name];
          }
          /**
           * Creates a module mapping that includes plugin prefix, module
           * name, and path. If parentModuleMap is provided it will
           * also normalize the name via require.normalize()
           *
           * @param {String} name the module name
           * @param {String} [parentModuleMap] parent module map
           * for the module name, used to resolve relative names.
           * @param {Boolean} isNormalized: is the ID already normalized.
           * This is true if this call is done for a define() module ID.
           * @param {Boolean} applyMap: apply the map config to the ID.
           * Should only be true if this map is for a dependency.
           *
           * @returns {Object}
           */


          function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url,
                pluginModule,
                suffix,
                nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = ''; //If no name, then it means it is a require call, generate an
            //internal name.

            if (!name) {
              isDefine = false;
              name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
              prefix = normalize(prefix, parentName, applyMap);
              pluginModule = getOwn(defined, prefix);
            } //Account for relative paths if there is a base name.


            if (name) {
              if (prefix) {
                if (isNormalized) {
                  normalizedName = name;
                } else if (pluginModule && pluginModule.normalize) {
                  //Plugin is loaded, use its normalize method.
                  normalizedName = pluginModule.normalize(name, function (name) {
                    return normalize(name, parentName, applyMap);
                  });
                } else {
                  // If nested plugin references, then do not try to
                  // normalize, as it will not normalize correctly. This
                  // places a restriction on resourceIds, and the longer
                  // term solution is not to normalize until plugins are
                  // loaded and all normalizations to allow for async
                  // loading of a loader plugin. But for now, fixes the
                  // common uses. Details in #1131
                  normalizedName = name.indexOf('!') === -1 ? normalize(name, parentName, applyMap) : name;
                }
              } else {
                //A regular module.
                normalizedName = normalize(name, parentName, applyMap); //Normalized name may be a plugin ID due to map config
                //application in normalize. The map config values must
                //already be normalized, so do not need to redo that part.

                nameParts = splitPrefix(normalizedName);
                prefix = nameParts[0];
                normalizedName = nameParts[1];
                isNormalized = true;
                url = context.nameToUrl(normalizedName);
              }
            } //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.


            suffix = prefix && !pluginModule && !isNormalized ? '_unnormalized' + (unnormalizedCounter += 1) : '';
            return {
              prefix: prefix,
              name: normalizedName,
              parentMap: parentModuleMap,
              unnormalized: !!suffix,
              url: url,
              originalName: originalName,
              isDefine: isDefine,
              id: (prefix ? prefix + '!' + normalizedName : normalizedName) + suffix
            };
          }

          function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
              mod = registry[id] = new context.Module(depMap);
            }

            return mod;
          }

          function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) && (!mod || mod.defineEmitComplete)) {
              if (name === 'defined') {
                fn(defined[id]);
              }
            } else {
              mod = getModule(depMap);

              if (mod.error && name === 'error') {
                fn(mod.error);
              } else {
                mod.on(name, fn);
              }
            }
          }

          function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
              errback(err);
            } else {
              each(ids, function (id) {
                var mod = getOwn(registry, id);

                if (mod) {
                  //Set error on module, so it skips timeout checks.
                  mod.error = err;

                  if (mod.events.error) {
                    notified = true;
                    mod.emit('error', err);
                  }
                }
              });

              if (!notified) {
                req.onError(err);
              }
            }
          }
          /**
           * Internal method to transfer globalQueue items to this context's
           * defQueue.
           */


          function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
              each(globalDefQueue, function (queueItem) {
                var id = queueItem[0];

                if (typeof id === 'string') {
                  context.defQueueMap[id] = true;
                }

                defQueue.push(queueItem);
              });
              globalDefQueue = [];
            }
          }

          handlers = {
            'require': function (mod) {
              if (mod.require) {
                return mod.require;
              } else {
                return mod.require = context.makeRequire(mod.map);
              }
            },
            'exports': function (mod) {
              mod.usingExports = true;

              if (mod.map.isDefine) {
                if (mod.exports) {
                  return defined[mod.map.id] = mod.exports;
                } else {
                  return mod.exports = defined[mod.map.id] = {};
                }
              }
            },
            'module': function (mod) {
              if (mod.module) {
                return mod.module;
              } else {
                return mod.module = {
                  id: mod.map.id,
                  uri: mod.map.url,
                  config: function () {
                    return getOwn(config.config, mod.map.id) || {};
                  },
                  exports: mod.exports || (mod.exports = {})
                };
              }
            }
          };

          function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
          }

          function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
              mod.emit('error', mod.error);
            } else {
              traced[id] = true;
              each(mod.depMaps, function (depMap, i) {
                var depId = depMap.id,
                    dep = getOwn(registry, depId); //Only force things that have not completed
                //being defined, so still in the registry,
                //and only if it has not been matched up
                //in the module already.

                if (dep && !mod.depMatched[i] && !processed[depId]) {
                  if (getOwn(traced, depId)) {
                    mod.defineDep(i, defined[depId]);
                    mod.check(); //pass false?
                  } else {
                    breakCycle(dep, traced, processed);
                  }
                }
              });
              processed[id] = true;
            }
          }

          function checkLoaded() {
            var err,
                usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
            expired = waitInterval && context.startTime + waitInterval < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true; //Do not bother if this call was a result of a cycle break.

            if (inCheckLoaded) {
              return;
            }

            inCheckLoaded = true; //Figure out the state of all the modules.

            eachProp(enabledRegistry, function (mod) {
              var map = mod.map,
                  modId = map.id; //Skip things that are not enabled or in error state.

              if (!mod.enabled) {
                return;
              }

              if (!map.isDefine) {
                reqCalls.push(mod);
              }

              if (!mod.error) {
                //If the module should be executed, and it has not
                //been inited and time is up, remember it.
                if (!mod.inited && expired) {
                  if (hasPathFallback(modId)) {
                    usingPathFallback = true;
                    stillLoading = true;
                  } else {
                    noLoads.push(modId);
                    removeScript(modId);
                  }
                } else if (!mod.inited && mod.fetched && map.isDefine) {
                  stillLoading = true;

                  if (!map.prefix) {
                    //No reason to keep looking for unfinished
                    //loading. If the only stillLoading is a
                    //plugin resource though, keep going,
                    //because it may be that a plugin resource
                    //is waiting on a non-plugin cycle.
                    return needCycleCheck = false;
                  }
                }
              }
            });

            if (expired && noLoads.length) {
              //If wait time expired, throw error of unloaded modules.
              err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
              err.contextName = context.contextName;
              return onError(err);
            } //Not expired, check for a cycle.


            if (needCycleCheck) {
              each(reqCalls, function (mod) {
                breakCycle(mod, {}, {});
              });
            } //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.


            if ((!expired || usingPathFallback) && stillLoading) {
              //Something is still waiting to load. Wait for it, but only
              //if a timeout is not already in effect.
              if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                checkLoadedTimeoutId = setTimeout(function () {
                  checkLoadedTimeoutId = 0;
                  checkLoaded();
                }, 50);
              }
            }

            inCheckLoaded = false;
          }

          Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;
            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
          };

          Module.prototype = {
            init: function (depMaps, factory, errback, options) {
              options = options || {}; //Do not do more inits if already done. Can happen if there
              //are multiple define calls for the same module. That is not
              //a normal, common case, but it is also not unexpected.

              if (this.inited) {
                return;
              }

              this.factory = factory;

              if (errback) {
                //Register for errors on this module.
                this.on('error', errback);
              } else if (this.events.error) {
                //If no errback already, but there are error listeners
                //on this module, set up an errback to pass to the deps.
                errback = bind(this, function (err) {
                  this.emit('error', err);
                });
              } //Do a copy of the dependency array, so that
              //source inputs are not modified. For example
              //"shim" deps are passed in here directly, and
              //doing a direct modification of the depMaps array
              //would affect that config.


              this.depMaps = depMaps && depMaps.slice(0);
              this.errback = errback; //Indicate this module has be initialized

              this.inited = true;
              this.ignore = options.ignore; //Could have option to init this module in enabled mode,
              //or could have been previously marked as enabled. However,
              //the dependencies are not known until init is called. So
              //if enabled previously, now trigger dependencies as enabled.

              if (options.enabled || this.enabled) {
                //Enable this module and dependencies.
                //Will call this.check()
                this.enable();
              } else {
                this.check();
              }
            },
            defineDep: function (i, depExports) {
              //Because of cycles, defined callback for a given
              //export can be called more than once.
              if (!this.depMatched[i]) {
                this.depMatched[i] = true;
                this.depCount -= 1;
                this.depExports[i] = depExports;
              }
            },
            fetch: function () {
              if (this.fetched) {
                return;
              }

              this.fetched = true;
              context.startTime = new Date().getTime();
              var map = this.map; //If the manager is for a plugin managed resource,
              //ask the plugin to load it now.

              if (this.shim) {
                context.makeRequire(this.map, {
                  enableBuildCallback: true
                })(this.shim.deps || [], bind(this, function () {
                  return map.prefix ? this.callPlugin() : this.load();
                }));
              } else {
                //Regular dependency.
                return map.prefix ? this.callPlugin() : this.load();
              }
            },
            load: function () {
              var url = this.map.url; //Regular dependency.

              if (!urlFetched[url]) {
                urlFetched[url] = true;
                context.load(this.map.id, url);
              }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
              if (!this.enabled || this.enabling) {
                return;
              }

              var err,
                  cjsModule,
                  id = this.map.id,
                  depExports = this.depExports,
                  exports = this.exports,
                  factory = this.factory;

              if (!this.inited) {
                // Only fetch if not already in the defQueue.
                if (!hasProp(context.defQueueMap, id)) {
                  this.fetch();
                }
              } else if (this.error) {
                this.emit('error', this.error);
              } else if (!this.defining) {
                //The factory could trigger another require call
                //that would result in checking this module to
                //define itself again. If already in the process
                //of doing that, skip this work.
                this.defining = true;

                if (this.depCount < 1 && !this.defined) {
                  if (isFunction(factory)) {
                    //If there is an error listener, favor passing
                    //to that instead of throwing an error. However,
                    //only do it for define()'d  modules. require
                    //errbacks should not be called for failures in
                    //their callbacks (#699). However if a global
                    //onError is set, use that.
                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) {
                      try {
                        exports = context.execCb(id, factory, depExports, exports);
                      } catch (e) {
                        err = e;
                      }
                    } else {
                      exports = context.execCb(id, factory, depExports, exports);
                    } // Favor return value over exports. If node/cjs in play,
                    // then will not have a return value anyway. Favor
                    // module.exports assignment over exports object.


                    if (this.map.isDefine && exports === undefined) {
                      cjsModule = this.module;

                      if (cjsModule) {
                        exports = cjsModule.exports;
                      } else if (this.usingExports) {
                        //exports already set the defined value.
                        exports = this.exports;
                      }
                    }

                    if (err) {
                      err.requireMap = this.map;
                      err.requireModules = this.map.isDefine ? [this.map.id] : null;
                      err.requireType = this.map.isDefine ? 'define' : 'require';
                      return onError(this.error = err);
                    }
                  } else {
                    //Just a literal value
                    exports = factory;
                  }

                  this.exports = exports;

                  if (this.map.isDefine && !this.ignore) {
                    defined[id] = exports;

                    if (req.onResourceLoad) {
                      var resLoadMaps = [];
                      each(this.depMaps, function (depMap) {
                        resLoadMaps.push(depMap.normalizedMap || depMap);
                      });
                      req.onResourceLoad(context, this.map, resLoadMaps);
                    }
                  } //Clean up


                  cleanRegistry(id);
                  this.defined = true;
                } //Finished the define stage. Allow calling check again
                //to allow define notifications below in the case of a
                //cycle.


                this.defining = false;

                if (this.defined && !this.defineEmitted) {
                  this.defineEmitted = true;
                  this.emit('defined', this.exports);
                  this.defineEmitComplete = true;
                }
              }
            },
            callPlugin: function () {
              var map = this.map,
                  id = map.id,
                  //Map already normalized the prefix.
              pluginMap = makeModuleMap(map.prefix); //Mark this as a dependency for this plugin, so it
              //can be traced for cycles.

              this.depMaps.push(pluginMap);
              on(pluginMap, 'defined', bind(this, function (plugin) {
                var load,
                    normalizedMap,
                    normalizedMod,
                    bundleId = getOwn(bundlesMap, this.map.id),
                    name = this.map.name,
                    parentName = this.map.parentMap ? this.map.parentMap.name : null,
                    localRequire = context.makeRequire(map.parentMap, {
                  enableBuildCallback: true
                }); //If current map is not normalized, wait for that
                //normalized name to load instead of continuing.

                if (this.map.unnormalized) {
                  //Normalize the ID if the plugin allows it.
                  if (plugin.normalize) {
                    name = plugin.normalize(name, function (name) {
                      return normalize(name, parentName, true);
                    }) || '';
                  } //prefix and name should already be normalized, no need
                  //for applying map config again either.


                  normalizedMap = makeModuleMap(map.prefix + '!' + name, this.map.parentMap, true);
                  on(normalizedMap, 'defined', bind(this, function (value) {
                    this.map.normalizedMap = normalizedMap;
                    this.init([], function () {
                      return value;
                    }, null, {
                      enabled: true,
                      ignore: true
                    });
                  }));
                  normalizedMod = getOwn(registry, normalizedMap.id);

                  if (normalizedMod) {
                    //Mark this as a dependency for this plugin, so it
                    //can be traced for cycles.
                    this.depMaps.push(normalizedMap);

                    if (this.events.error) {
                      normalizedMod.on('error', bind(this, function (err) {
                        this.emit('error', err);
                      }));
                    }

                    normalizedMod.enable();
                  }

                  return;
                } //If a paths config, then just load that file instead to
                //resolve the plugin, as it is built into that paths layer.


                if (bundleId) {
                  this.map.url = context.nameToUrl(bundleId);
                  this.load();
                  return;
                }

                load = bind(this, function (value) {
                  this.init([], function () {
                    return value;
                  }, null, {
                    enabled: true
                  });
                });
                load.error = bind(this, function (err) {
                  this.inited = true;
                  this.error = err;
                  err.requireModules = [id]; //Remove temp unnormalized modules for this module,
                  //since they will never be resolved otherwise now.

                  eachProp(registry, function (mod) {
                    if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                      cleanRegistry(mod.map.id);
                    }
                  });
                  onError(err);
                }); //Allow plugins to load other code without having to know the
                //context or how to 'complete' the load.

                load.fromText = bind(this, function (text, textAlt) {
                  /*jslint evil: true */
                  var moduleName = map.name,
                      moduleMap = makeModuleMap(moduleName),
                      hasInteractive = useInteractive; //As of 2.1.0, support just passing the text, to reinforce
                  //fromText only being called once per resource. Still
                  //support old style of passing moduleName but discard
                  //that moduleName in favor of the internal ref.

                  if (textAlt) {
                    text = textAlt;
                  } //Turn off interactive script matching for IE for any define
                  //calls in the text, then turn it back on at the end.


                  if (hasInteractive) {
                    useInteractive = false;
                  } //Prime the system by creating a module instance for
                  //it.


                  getModule(moduleMap); //Transfer any config to this other module.

                  if (hasProp(config.config, id)) {
                    config.config[moduleName] = config.config[id];
                  }

                  try {
                    req.exec(text);
                  } catch (e) {
                    return onError(makeError('fromtexteval', 'fromText eval for ' + id + ' failed: ' + e, e, [id]));
                  }

                  if (hasInteractive) {
                    useInteractive = true;
                  } //Mark this as a dependency for the plugin
                  //resource


                  this.depMaps.push(moduleMap); //Support anonymous modules.

                  context.completeLoad(moduleName); //Bind the value of that module to the value for this
                  //resource ID.

                  localRequire([moduleName], load);
                }); //Use parentName here since the plugin's name is not reliable,
                //could be some weird string with no path that actually wants to
                //reference the parentName's path.

                plugin.load(map.name, localRequire, load, config);
              }));
              context.enable(pluginMap, this);
              this.pluginMaps[pluginMap.id] = pluginMap;
            },
            enable: function () {
              enabledRegistry[this.map.id] = this;
              this.enabled = true; //Set flag mentioning that the module is enabling,
              //so that immediate calls to the defined callbacks
              //for dependencies do not trigger inadvertent load
              //with the depCount still being zero.

              this.enabling = true; //Enable each dependency

              each(this.depMaps, bind(this, function (depMap, i) {
                var id, mod, handler;

                if (typeof depMap === 'string') {
                  //Dependency needs to be converted to a depMap
                  //and wired up to this module.
                  depMap = makeModuleMap(depMap, this.map.isDefine ? this.map : this.map.parentMap, false, !this.skipMap);
                  this.depMaps[i] = depMap;
                  handler = getOwn(handlers, depMap.id);

                  if (handler) {
                    this.depExports[i] = handler(this);
                    return;
                  }

                  this.depCount += 1;
                  on(depMap, 'defined', bind(this, function (depExports) {
                    if (this.undefed) {
                      return;
                    }

                    this.defineDep(i, depExports);
                    this.check();
                  }));

                  if (this.errback) {
                    on(depMap, 'error', bind(this, this.errback));
                  } else if (this.events.error) {
                    // No direct errback on this module, but something
                    // else is listening for errors, so be sure to
                    // propagate the error correctly.
                    on(depMap, 'error', bind(this, function (err) {
                      this.emit('error', err);
                    }));
                  }
                }

                id = depMap.id;
                mod = registry[id]; //Skip special modules like 'require', 'exports', 'module'
                //Also, don't call enable if it is already enabled,
                //important in circular dependency cases.

                if (!hasProp(handlers, id) && mod && !mod.enabled) {
                  context.enable(depMap, this);
                }
              })); //Enable each plugin that is used in
              //a dependency

              eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                var mod = getOwn(registry, pluginMap.id);

                if (mod && !mod.enabled) {
                  context.enable(pluginMap, this);
                }
              }));
              this.enabling = false;
              this.check();
            },
            on: function (name, cb) {
              var cbs = this.events[name];

              if (!cbs) {
                cbs = this.events[name] = [];
              }

              cbs.push(cb);
            },
            emit: function (name, evt) {
              each(this.events[name], function (cb) {
                cb(evt);
              });

              if (name === 'error') {
                //Now that the error handler was triggered, remove
                //the listeners, since this broken Module instance
                //can stay around for a while in the registry.
                delete this.events[name];
              }
            }
          };

          function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
              getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
          }

          function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
              //Probably IE. If not it will throw an error, which will be
              //useful to know.
              if (ieName) {
                node.detachEvent(ieName, func);
              }
            } else {
              node.removeEventListener(name, func, false);
            }
          }
          /**
           * Given an event from a script node, get the requirejs info from it,
           * and then removes the event listeners on the node.
           * @param {Event} evt
           * @returns {Object}
           */


          function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement; //Remove the listeners once here.

            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');
            return {
              node: node,
              id: node && node.getAttribute('data-requiremodule')
            };
          }

          function intakeDefines() {
            var args; //Any defined modules in the global queue, intake them now.

            takeGlobalQueue(); //Make sure any remaining defQueue items get properly processed.

            while (defQueue.length) {
              args = defQueue.shift();

              if (args[0] === null) {
                return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' + args[args.length - 1]));
              } else {
                //args are id, deps, factory. Should be normalized by the
                //define() function.
                callGetModule(args);
              }
            }

            context.defQueueMap = {};
          }

          context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            defQueueMap: {},
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
              //Make sure the baseUrl ends in a slash.
              if (cfg.baseUrl) {
                if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                  cfg.baseUrl += '/';
                }
              } // Convert old style urlArgs string to a function.


              if (typeof cfg.urlArgs === 'string') {
                var urlArgs = cfg.urlArgs;

                cfg.urlArgs = function (id, url) {
                  return (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
                };
              } //Save off the paths since they require special processing,
              //they are additive.


              var shim = config.shim,
                  objs = {
                paths: true,
                bundles: true,
                config: true,
                map: true
              };
              eachProp(cfg, function (value, prop) {
                if (objs[prop]) {
                  if (!config[prop]) {
                    config[prop] = {};
                  }

                  mixin(config[prop], value, true, true);
                } else {
                  config[prop] = value;
                }
              }); //Reverse map the bundles

              if (cfg.bundles) {
                eachProp(cfg.bundles, function (value, prop) {
                  each(value, function (v) {
                    if (v !== prop) {
                      bundlesMap[v] = prop;
                    }
                  });
                });
              } //Merge shim


              if (cfg.shim) {
                eachProp(cfg.shim, function (value, id) {
                  //Normalize the structure
                  if (isArray(value)) {
                    value = {
                      deps: value
                    };
                  }

                  if ((value.exports || value.init) && !value.exportsFn) {
                    value.exportsFn = context.makeShimExports(value);
                  }

                  shim[id] = value;
                });
                config.shim = shim;
              } //Adjust packages if necessary.


              if (cfg.packages) {
                each(cfg.packages, function (pkgObj) {
                  var location, name;
                  pkgObj = typeof pkgObj === 'string' ? {
                    name: pkgObj
                  } : pkgObj;
                  name = pkgObj.name;
                  location = pkgObj.location;

                  if (location) {
                    config.paths[name] = pkgObj.location;
                  } //Save pointer to main module ID for pkg name.
                  //Remove leading dot in main, so main paths are normalized,
                  //and remove any trailing .js, since different package
                  //envs have different conventions: some use a module name,
                  //some use a file name.


                  config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main').replace(currDirRegExp, '').replace(jsSuffixRegExp, '');
                });
              } //If there are any "waiting to execute" modules in the registry,
              //update the maps for them, since their info, like URLs to load,
              //may have changed.


              eachProp(registry, function (mod, id) {
                //If module already has init called, since it is too
                //late to modify them, and ignore unnormalized ones
                //since they are transient.
                if (!mod.inited && !mod.map.unnormalized) {
                  mod.map = makeModuleMap(id, null, true);
                }
              }); //If a deps array or a config callback is specified, then call
              //require with those args. This is useful when require is defined as a
              //config object before require.js is loaded.

              if (cfg.deps || cfg.callback) {
                context.require(cfg.deps || [], cfg.callback);
              }
            },
            makeShimExports: function (value) {
              function fn() {
                var ret;

                if (value.init) {
                  ret = value.init.apply(global, arguments);
                }

                return ret || value.exports && getGlobal(value.exports);
              }

              return fn;
            },
            makeRequire: function (relMap, options) {
              options = options || {};

              function localRequire(deps, callback, errback) {
                var id, map, requireMod;

                if (options.enableBuildCallback && callback && isFunction(callback)) {
                  callback.__requireJsBuild = true;
                }

                if (typeof deps === 'string') {
                  if (isFunction(callback)) {
                    //Invalid call
                    return onError(makeError('requireargs', 'Invalid require call'), errback);
                  } //If require|exports|module are requested, get the
                  //value for them from the special handlers. Caveat:
                  //this only works while module is being defined.


                  if (relMap && hasProp(handlers, deps)) {
                    return handlers[deps](registry[relMap.id]);
                  } //Synchronous access to one module. If require.get is
                  //available (as in the Node adapter), prefer that.


                  if (req.get) {
                    return req.get(context, deps, relMap, localRequire);
                  } //Normalize module name, if it contains . or ..


                  map = makeModuleMap(deps, relMap, false, true);
                  id = map.id;

                  if (!hasProp(defined, id)) {
                    return onError(makeError('notloaded', 'Module name "' + id + '" has not been loaded yet for context: ' + contextName + (relMap ? '' : '. Use require([])')));
                  }

                  return defined[id];
                } //Grab defines waiting in the global queue.


                intakeDefines(); //Mark all the dependencies as needing to be loaded.

                context.nextTick(function () {
                  //Some defines could have been added since the
                  //require call, collect them.
                  intakeDefines();
                  requireMod = getModule(makeModuleMap(null, relMap)); //Store if map config should be applied to this require
                  //call for dependencies.

                  requireMod.skipMap = options.skipMap;
                  requireMod.init(deps, callback, errback, {
                    enabled: true
                  });
                  checkLoaded();
                });
                return localRequire;
              }

              mixin(localRequire, {
                isBrowser: isBrowser,

                /**
                 * Converts a module name + .extension into an URL path.
                 * *Requires* the use of a module name. It does not support using
                 * plain URLs like nameToUrl.
                 */
                toUrl: function (moduleNamePlusExt) {
                  var ext,
                      index = moduleNamePlusExt.lastIndexOf('.'),
                      segment = moduleNamePlusExt.split('/')[0],
                      isRelative = segment === '.' || segment === '..'; //Have a file extension alias, and it is not the
                  //dots from a relative path.

                  if (index !== -1 && (!isRelative || index > 1)) {
                    ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                    moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                  }

                  return context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, true), ext, true);
                },
                defined: function (id) {
                  return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                },
                specified: function (id) {
                  id = makeModuleMap(id, relMap, false, true).id;
                  return hasProp(defined, id) || hasProp(registry, id);
                }
              }); //Only allow undef on top level require calls

              if (!relMap) {
                localRequire.undef = function (id) {
                  //Bind any waiting define() calls to this context,
                  //fix for #408
                  takeGlobalQueue();
                  var map = makeModuleMap(id, relMap, true),
                      mod = getOwn(registry, id);
                  mod.undefed = true;
                  removeScript(id);
                  delete defined[id];
                  delete urlFetched[map.url];
                  delete undefEvents[id]; //Clean queued defines too. Go backwards
                  //in array so that the splices do not
                  //mess up the iteration.

                  eachReverse(defQueue, function (args, i) {
                    if (args[0] === id) {
                      defQueue.splice(i, 1);
                    }
                  });
                  delete context.defQueueMap[id];

                  if (mod) {
                    //Hold on to listeners in case the
                    //module will be attempted to be reloaded
                    //using a different config.
                    if (mod.events.defined) {
                      undefEvents[id] = mod.events;
                    }

                    cleanRegistry(id);
                  }
                };
              }

              return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
              var mod = getOwn(registry, depMap.id);

              if (mod) {
                getModule(depMap).enable();
              }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
              var found,
                  args,
                  mod,
                  shim = getOwn(config.shim, moduleName) || {},
                  shExports = shim.exports;
              takeGlobalQueue();

              while (defQueue.length) {
                args = defQueue.shift();

                if (args[0] === null) {
                  args[0] = moduleName; //If already found an anonymous module and bound it
                  //to this name, then this is some other anon module
                  //waiting for its completeLoad to fire.

                  if (found) {
                    break;
                  }

                  found = true;
                } else if (args[0] === moduleName) {
                  //Found matching define call for this script!
                  found = true;
                }

                callGetModule(args);
              }

              context.defQueueMap = {}; //Do this after the cycle of callGetModule in case the result
              //of those calls/init calls changes the registry.

              mod = getOwn(registry, moduleName);

              if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                  if (hasPathFallback(moduleName)) {
                    return;
                  } else {
                    return onError(makeError('nodefine', 'No define call for ' + moduleName, null, [moduleName]));
                  }
                } else {
                  //A script that does not call define(), so just simulate
                  //the call for it.
                  callGetModule([moduleName, shim.deps || [], shim.exportsFn]);
                }
              }

              checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
              var paths,
                  syms,
                  i,
                  parentModule,
                  url,
                  parentPath,
                  bundleId,
                  pkgMain = getOwn(config.pkgs, moduleName);

              if (pkgMain) {
                moduleName = pkgMain;
              }

              bundleId = getOwn(bundlesMap, moduleName);

              if (bundleId) {
                return context.nameToUrl(bundleId, ext, skipExt);
              } //If a colon is in the URL, it indicates a protocol is used and it is just
              //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
              //or ends with .js, then assume the user meant to use an url and not a module id.
              //The slash is important for protocol-less URLs as well as full paths.


              if (req.jsExtRegExp.test(moduleName)) {
                //Just a plain path, not module name lookup, so just return it.
                //Add extension if it is included. This is a bit wonky, only non-.js things pass
                //an extension, this method probably needs to be reworked.
                url = moduleName + (ext || '');
              } else {
                //A module that needs to be converted to a path.
                paths = config.paths;
                syms = moduleName.split('/'); //For each module name segment, see if there is a path
                //registered for it. Start with most specific name
                //and work up from it.

                for (i = syms.length; i > 0; i -= 1) {
                  parentModule = syms.slice(0, i).join('/');
                  parentPath = getOwn(paths, parentModule);

                  if (parentPath) {
                    //If an array, it means there are a few choices,
                    //Choose the one that is desired
                    if (isArray(parentPath)) {
                      parentPath = parentPath[0];
                    }

                    syms.splice(0, i, parentPath);
                    break;
                  }
                } //Join the path parts together, then figure out if baseUrl is needed.


                url = syms.join('/');
                url += ext || (/^data\:|^blob\:|\?/.test(url) || skipExt ? '' : '.js');
                url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
              }

              return config.urlArgs && !/^blob\:/.test(url) ? url + config.urlArgs(moduleName, url) : url;
            },
            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
              req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
              return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
              //Using currentTarget instead of target for Firefox 2.0's sake. Not
              //all old browsers will be supported, but this one was easy enough
              //to support and still makes sense.
              if (evt.type === 'load' || readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)) {
                //Reset interactive script so a script node is not held onto for
                //to long.
                interactiveScript = null; //Pull out the name of the module and the context.

                var data = getScriptData(evt);
                context.completeLoad(data.id);
              }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
              var data = getScriptData(evt);

              if (!hasPathFallback(data.id)) {
                var parents = [];
                eachProp(registry, function (value, key) {
                  if (key.indexOf('_@r') !== 0) {
                    each(value.depMaps, function (depMap) {
                      if (depMap.id === data.id) {
                        parents.push(key);
                        return true;
                      }
                    });
                  }
                });
                return onError(makeError('scripterror', 'Script error for "' + data.id + (parents.length ? '", needed by: ' + parents.join(', ') : '"'), evt, [data.id]));
              }
            }
          };
          context.require = context.makeRequire();
          return context;
        }
        /**
         * Main entry point.
         *
         * If the only argument to require is a string, then the module that
         * is represented by that string is fetched for the appropriate context.
         *
         * If the first argument is an array, then it will be treated as an array
         * of dependency string names to fetch. An optional function callback can
         * be specified to execute when all of those dependencies are available.
         *
         * Make a local req variable to help Caja compliance (it assumes things
         * on a require that are not standardized), and to give a short
         * name for minification/local scope use.
         */


        req = requirejs = function (deps, callback, errback, optional) {
          //Find the right context, use default
          var context,
              config,
              contextName = defContextName; // Determine if have config object in the call.

          if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;

            if (isArray(callback)) {
              // Adjust args if there are dependencies
              deps = callback;
              callback = errback;
              errback = optional;
            } else {
              deps = [];
            }
          }

          if (config && config.context) {
            contextName = config.context;
          }

          context = getOwn(contexts, contextName);

          if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
          }

          if (config) {
            context.configure(config);
          }

          return context.require(deps, callback, errback);
        };
        /**
         * Support require.config() to make it easier to cooperate with other
         * AMD loaders on globally agreed names.
         */


        req.config = function (config) {
          return req(config);
        };
        /**
         * Execute something after the current tick
         * of the event loop. Override for other envs
         * that have a better solution than setTimeout.
         * @param  {Function} fn function to execute later.
         */


        req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
          setTimeout(fn, 4);
        } : function (fn) {
          fn();
        };
        /**
         * Export require as a global, but only if it does not already exist.
         */

        if (!require) {
          require = req;
        }

        req.version = version; //Used to filter out dependencies that are already paths.

        req.jsExtRegExp = /^\/|:|\?|\.js$/;
        req.isBrowser = isBrowser;
        s = req.s = {
          contexts: contexts,
          newContext: newContext
        }; //Create default context.

        req({}); //Exports some context-sensitive methods on global require.

        each(['toUrl', 'undef', 'defined', 'specified'], function (prop) {
          //Reference from contexts instead of early binding to default context,
          //so that during builds, the latest instance of the default context
          //with its config gets used.
          req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
          };
        });

        if (isBrowser) {
          head = s.head = document.getElementsByTagName('head')[0]; //If BASE tag is in play, using appendChild is a problem for IE6.
          //When that browser dies, this can be removed. Details in this jQuery bug:
          //http://dev.jquery.com/ticket/2709

          baseElement = document.getElementsByTagName('base')[0];

          if (baseElement) {
            head = s.head = baseElement.parentNode;
          }
        }
        /**
         * Any errors that require explicitly generates will be passed to this
         * function. Intercept/override it if you want custom error handling.
         * @param {Error} err the error object.
         */


        req.onError = defaultOnError;
        /**
         * Creates the node for the load command. Only used in browser envs.
         */

        req.createNode = function (config, moduleName, url) {
          var node = config.xhtml ? document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') : document.createElement('script');
          node.type = config.scriptType || 'text/javascript';
          node.charset = 'utf-8';
          node.async = true;
          return node;
        };
        /**
         * Does the request to load a module for the browser case.
         * Make this a separate function to allow other environments
         * to override it.
         *
         * @param {Object} context the require context to find state.
         * @param {String} moduleName the name of the module.
         * @param {Object} url the URL to the module.
         */


        req.load = function (context, moduleName, url) {
          var config = context && context.config || {},
              node;

          if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);
            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName); //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.

            if (node.attachEvent && //Check if node.attachEvent is artificially added by custom script or
            //natively supported by browser
            //read https://github.com/requirejs/requirejs/issues/187
            //if we can NOT find [native code] then it must NOT natively supported.
            //in IE8, node.attachEvent does not have toString()
            //Note the test for "[native code" with no closing brace, see:
            //https://github.com/requirejs/requirejs/issues/273
            !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) && !isOpera) {
              //Probably IE. IE (at least 6-8) do not fire
              //script onload right after executing the script, so
              //we cannot tie the anonymous define call to a name.
              //However, IE reports the script as being in 'interactive'
              //readyState at the time of the define call.
              useInteractive = true;
              node.attachEvent('onreadystatechange', context.onScriptLoad); //It would be great to add an error handler here to catch
              //404s in IE9+. However, onreadystatechange will fire before
              //the error handler, so that does not help. If addEventListener
              //is used, then IE will fire error before load, but we cannot
              //use that pathway given the connect.microsoft.com issue
              //mentioned above about not doing the 'script execute,
              //then fire the script load event listener before execute
              //next script' that other browsers do.
              //Best hope: IE10 fixes the issues,
              //and then destroys all installs of IE 6-9.
              //node.attachEvent('onerror', context.onScriptError);
            } else {
              node.addEventListener('load', context.onScriptLoad, false);
              node.addEventListener('error', context.onScriptError, false);
            }

            node.src = url; //Calling onNodeCreated after all properties on the node have been
            //set, but before it is placed in the DOM.

            if (config.onNodeCreated) {
              config.onNodeCreated(node, config, moduleName, url);
            } //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.


            currentlyAddingScript = node;

            if (baseElement) {
              head.insertBefore(node, baseElement);
            } else {
              head.appendChild(node);
            }

            currentlyAddingScript = null;
            return node;
          } else if (isWebWorker) {
            try {
              //In a web worker, use importScripts. This is not a very
              //efficient use of importScripts, importScripts will block until
              //its script is downloaded and evaluated. However, if web workers
              //are in play, the expectation is that a build has been done so
              //that only one script needs to be loaded anyway. This may need
              //to be reevaluated if other use cases become common.
              // Post a task to the event loop to work around a bug in WebKit
              // where the worker gets garbage-collected after calling
              // importScripts(): https://webkit.org/b/153317
              setTimeout(function () {}, 0);
              importScripts(url); //Account for anonymous modules

              context.completeLoad(moduleName);
            } catch (e) {
              context.onError(makeError('importscripts', 'importScripts failed for ' + moduleName + ' at ' + url, e, [moduleName]));
            }
          }
        };

        function getInteractiveScript() {
          if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
          }

          eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
              return interactiveScript = script;
            }
          });
          return interactiveScript;
        } //Look for a data-main script attribute, which could also adjust the baseUrl.


        if (isBrowser && !cfg.skipDataMain) {
          //Figure out baseUrl. Get it from the script tag with require.js in it.
          eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
              head = script.parentNode;
            } //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.


            dataMain = script.getAttribute('data-main');

            if (dataMain) {
              //Preserve dataMain in case it is a path (i.e. contains '?')
              mainScript = dataMain; //Set final baseUrl if there is not already an explicit one,
              //but only do so if the data-main value is not a loader plugin
              //module ID.

              if (!cfg.baseUrl && mainScript.indexOf('!') === -1) {
                //Pull off the directory of data-main for use as the
                //baseUrl.
                src = mainScript.split('/');
                mainScript = src.pop();
                subPath = src.length ? src.join('/') + '/' : './';
                cfg.baseUrl = subPath;
              } //Strip off any trailing .js since mainScript is now
              //like a module name.


              mainScript = mainScript.replace(jsSuffixRegExp, ''); //If mainScript is still a path, fall back to dataMain

              if (req.jsExtRegExp.test(mainScript)) {
                mainScript = dataMain;
              } //Put the data-main script in the files to load.


              cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];
              return true;
            }
          });
        }
        /**
         * The function that handles definitions of modules. Differs from
         * require() in that a string for the module should be the first argument,
         * and the function to execute after dependencies are loaded should
         * return a value to define the module corresponding to the first argument's
         * name.
         */


        define = function (name, deps, callback) {
          var node, context; //Allow for anonymous modules

          if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
          } //This module may not have dependencies


          if (!isArray(deps)) {
            callback = deps;
            deps = null;
          } //If no name, and callback is a function, then figure out if it a
          //CommonJS thing with dependencies.


          if (!deps && isFunction(callback)) {
            deps = []; //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.

            if (callback.length) {
              callback.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, function (match, dep) {
                deps.push(dep);
              }); //May be a CommonJS thing even without require calls, but still
              //could use exports, and module. Avoid doing exports and module
              //work though if it just needs require.
              //REQUIRES the function to expect the CommonJS variables in the
              //order listed below.

              deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
          } //If in IE 6-8 and hit an anonymous define() call, do the interactive
          //work.


          if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();

            if (node) {
              if (!name) {
                name = node.getAttribute('data-requiremodule');
              }

              context = contexts[node.getAttribute('data-requirecontext')];
            }
          } //Always save off evaluating the def call until the script onload handler.
          //This allows multiple modules to be in a file without prematurely
          //tracing dependencies, and allows for anonymous module support,
          //where the module name is not known until the script onload event
          //occurs. If no context, use the global queue, and get it processed
          //in the onscript load callback.


          if (context) {
            context.defQueue.push([name, deps, callback]);
            context.defQueueMap[name] = true;
          } else {
            globalDefQueue.push([name, deps, callback]);
          }
        };

        define.amd = {
          jQuery: true
        };
        /**
         * Executes the text. Normally just uses eval, but can be modified
         * to use a better, environment-specific call. Only used for transpiling
         * loader plugins, not for plain JS modules.
         * @param {String} text the text to execute/evaluate.
         */

        req.exec = function (text) {
          /*jslint evil: true */
          return eval(text);
        }; //Set up with config info.


        req(cfg);
      })(_this5, typeof setTimeout === 'undefined' ? undefined : setTimeout);

      return {
        requirejs: requirejs,
        require: require,
        define: define
      };
    }({
      document: true
    });

    Sirv.define = sirvRequirejs.define;
    /* eslint-env es6 */

    /* global sirvRequirejs */

    /* eslint-disable no-lonely-if */

    /* eslint-disable quote-props */

    /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "sirvRequire|isLazyImage|SIRV_BASE_URL|SIRV_HTTP_PROTOCOL" }] */

    /*
        WE DON'T HAVE 'magicjs' MODULE AT THIS STAGE!
    */

    var sirvRequire = null;
    var isLazyImage = false;
    var SIRV_ASSETS_URL = '';
    var SIRV_BASE_URL = '';
    var SIRV_HTTP_PROTOCOL = 'https:'; // base modules

    var sirvDeps = ['bHelpers', // all modules
    'magicJS', // all modules
    'globalVariables', // all modules
    'globalFunctions', // all modules
    'EventEmitter', // most modules
    'helper', // most modules
    'EventManager', // start module
    'Loader', // RoundLoader
    'RoundLoader', // ComponentLoader, ProgressLoader, Zoom
    'ComponentLoader', // slider
    'ResponsiveImage', // BaseImage, Spin, Zoom
    'ViewerImage', // Slider
    'defaultsVideoOptions', // Slider, Video
    'ContextMenu', // Slider
    'Slider', // start module
    'SliderBuilder', // slider bilder module
    'BaseInstance', 'Instance', 'HotspotInstance', 'Hotspot', 'Hotspots', 'SpinHotspots', 'getDPPX'];

    (function () {
      var customDependencies = null;
      var scripts = document.getElementsByTagName('script');

      var fltuc = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

      var getLowerString = function (string) {
        return string.toLowerCase();
      };

      var getAbsoluteURL = function () {
        var a;
        return function (url) {
          if (!a) a = document.createElement('a');
          a.setAttribute('href', url);
          return ('!!' + a.href).replace('!!', '');
        };
      }();

      var spinModule = null;
      var zoomModule = null;
      var videoModule = null;
      var descriptionModule = null;
      var productDetailModule = null;
      var socialButtonsModule = null;
      var remoteDeps = {
        // Hint: [
        //     'bHelpers',
        //     'magicJS',
        //     'globalVariables',
        //     'globalFunctions',
        //     'helper'
        // ],
        // 'ImageZoom': [
        //     'bHelpers',
        //     'magicjs',
        //     'globalVariables',
        //     'globalFunctions',
        //     'helper',
        //     'EventEmitter'
        // ],
        // 'ProgressLoader': [
        //     'bHelpers',
        //     'magicJS',
        //     'globalVariables',
        //     'globalFunctions',
        //     'helper',
        //     'RoundLoader'
        // ],
        // 'Componentzoomapi': [
        //     'bHelpers',
        //     'magicJS',
        //     'Componentapi'
        // ],
        // 'Componentzoominstance': [
        //     'bHelpers',
        //     'magicJS',
        //     'Componentinstance'
        // ],
        'Spin': ['bHelpers', // it is in base deps
        'magicJS', // it is in base deps
        'globalVariables', // it is in base deps
        'globalFunctions', // it is in base deps
        'helper', // it is in base deps
        'EventEmitter', // it is in base deps
        'ResponsiveImage', // it is in base deps
        'HotspotInstance', 'Zoominstance', 'Hint', // 'ImageZoom',
        'ProgressLoader'],
        'Zoom': ['bHelpers', // it is in base deps
        'magicJS', // it is in base deps
        'globalVariables', // it is in base deps
        'globalFunctions', // it is in base deps
        'helper', // it is in base deps
        'EventEmitter', // it is in base deps
        'ResponsiveImage', // it is in base deps
        'RoundLoader', // it is in base deps
        'HotspotInstance', 'Zoominstance', 'Hint' // 'ImageZoom'
        ],
        'Video': ['bHelpers', // it is in base deps
        'magicJS', // it is in base deps
        'globalVariables', // it is in base deps
        'globalFunctions', // it is in base deps
        'helper', // it is in base deps
        'EventEmitter', // it is in base deps
        'defaultsVideoOptions', // it is in base deps
        'Instance' // it is in base deps
        ],
        'LazyImage': ['bHelpers', // it is in base deps
        'magicJS', // it is in base deps
        'globalVariables', // it is in base deps
        'globalFunctions', // it is in base deps
        'helper', // it is in base deps
        'EventEmitter', // it is in base deps
        'ResponsiveImage', // it is in base deps
        'BaseInstance', // it is in base deps
        'getDPPX' // it is in base deps
        ],
        'Description': ['bHelpers', // it is in base deps
        'magicJS', // it is in base deps
        'EventEmitter', // it is in base deps
        'helper' // it is in base deps
        ],
        'ProductDetail': ['bHelpers', // it is in base deps
        'magicJS', // it is in base deps
        'helper', // it is in base deps
        'Description'],
        'SocialButtons': ['bHelpers', // it is in base deps
        'magicJS', // it is in base deps
        'EventEmitter', // it is in base deps
        'helper' // it is in base deps
        ]
      };
      var aliases = {
        Spin: 'Spin',
        Zoom: 'Zoom',
        Video: 'Video',
        Image: 'LazyImage',
        Description: 'Description',
        Productdetail: 'ProductDetail',
        Socialbuttons: 'SocialButtons'
      };
      var BASE_MODULES = ['Image', 'Spin', 'Video', 'Zoom'];

      for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].getAttribute('src') || '';
        var isTestJs = scripts[i].getAttribute('data-sirvjs-test') !== null;

        if (isTestJs) {
          SIRV_ASSETS_URL = getAbsoluteURL(src).replace(/([^#?]+)\/.*$/, '$1/');
        } else {
          if (/sirv\.(com|localhost(:\d+)?)\/(([^#?]+)\/)?sirv\.js([?#].*)?$/i.test(src) || /sirv\.(com|localhost(:\d+)?)\/(([^#?]+)\/)?sirv\.full\.js([?#].*)?$/i.test(src)) {
            SIRV_BASE_URL = getAbsoluteURL(src).replace(/(^https?:\/\/[^/]*).*/, '$1/');
            SIRV_ASSETS_URL = getAbsoluteURL(src).replace(/([^#?]+)\/.*$/, '$1/');

            if (/sirv\.localhost(:\d+)?\/(([^#?]+)\/)?sirv\.js([?#].*)?$/i.test(src) || /sirv\.localhost(:\d+)?\/(([^#?]+)\/)?sirv\.full\.js([?#].*)?$/i.test(src)) {
              // dev env on localhost
              SIRV_HTTP_PROTOCOL = 'http:';
            }
          }
        }

        var dComponents = scripts[i].getAttribute('data-components');

        if (dComponents) {
          dComponents = dComponents.trim();
          dComponents = dComponents.replace(/\s+/g, ' ');
        }

        if (!customDependencies && dComponents && dComponents !== '') {
          customDependencies = dComponents.split(/,/.test(dComponents) ? ',' : ' ');
          break;
        }
      }

      if (!customDependencies && window.SirvComponents) {
        try {
          customDependencies = JSON.parse(JSON.stringify(window.SirvComponents));
        } catch (e) {// empty
        }
      }

      if (!customDependencies) {
        customDependencies = BASE_MODULES;
      }

      customDependencies.forEach(function (rawDep) {
        var value = rawDep.trim();

        if (value !== '') {
          value = getLowerString(value);
          value = fltuc(value);

          if (aliases[value]) {
            remoteDeps[aliases[value]].forEach(function (dep) {
              if (sirvDeps.indexOf(dep) === -1) {
                sirvDeps.push(dep);
              }
            });

            if (sirvDeps.indexOf(aliases[value]) === -1) {
              sirvDeps.push(aliases[value]);
            }

            if (value === 'Image') {
              isLazyImage = true;
            } else {
              switch (value) {
                case 'Spin':
                  spinModule = aliases[value];
                  break;

                case 'Zoom':
                  zoomModule = aliases[value];
                  break;

                case 'Video':
                  videoModule = aliases[value];
                  break;

                case 'Description':
                  descriptionModule = aliases[value];
                  break;

                case 'Productdetail':
                  productDetailModule = aliases[value];
                  break;

                case 'Socialbuttons':
                  socialButtonsModule = aliases[value];
                  break;

                default: // no default

              }
            }
          }
        }
      });
      sirvRequire = sirvRequirejs.require.config({
        waitSeconds: 0,
        baseUrl: SIRV_ASSETS_URL,
        deps: sirvDeps,
        paths: {
          polyfill: 'components/polyfill',
          EventEmitter: 'components/emitter',
          bHelpers: 'components/bHelpers',
          magicJS: 'components/magicjs',
          BaseInstance: 'components/baseinstance',
          Instance: 'components/instance',
          HotspotInstance: 'components/hotspotinstance',
          Zoominstance: 'components/zoominstance',
          globalVariables: 'components/globalVariables',
          globalFunctions: 'components/globalFunctions',
          helper: 'components/helper-module',
          EventManager: 'components/eventmanager',
          ContextMenu: 'components/contextmenu',
          Hint: 'components/hint',
          ResponsiveImage: 'components/imageclass',
          Loader: 'components/loader',
          RoundLoader: 'components/roundloader',
          ComponentLoader: 'components/componentloader',
          ProgressLoader: 'components/progressloader',
          LazyImage: 'components/lazyimage',
          ViewerImage: 'components/image',
          Spin: 'components/spin',
          defaultsVideoOptions: 'components/defaultsVideoOptions',
          Description: 'components/description',
          ProductDetail: 'components/productDetail',
          SocialButtons: 'components/socialButtons',
          SliderBuilder: 'components/sliderBuilder',
          VideoLib: 'vjs/sirv.videojs',
          Video: 'components/video',
          Zoom: 'components/zoom',
          Slider: 'components/slider',
          Hotspot: 'components/hotspot',
          Hotspots: 'components/hotspots',
          SpinHotspots: 'components/spinHotspots',
          Vimeo: 'components/vimeo',
          ImageZoom: 'components/imagezoom',
          qualitySelector: 'vjs/qualityselector',
          getDPPX: 'components/getdppx'
        },
        urlArgs: 'v=develop-1646752161768',
        config: {
          'Slider': {
            spin: spinModule,
            zoom: zoomModule,
            video: videoModule,
            description: descriptionModule,
            productDetail: productDetailModule,
            socialButtons: socialButtonsModule
          },
          'Video': {
            libcss: SIRV_ASSETS_URL + 'vjs/sirv.videojs.css',
            libjs: 'VideoLib',
            qualitySelectorcss: SIRV_ASSETS_URL + 'vjs/qualityselector.css',
            qualitySelectorjs: 'qualitySelector'
          }
        }
      });
    })();
    /* global Sirv */


    Sirv.define('Promise', {
      // eslint-disable-next-line
      load: function (name, req, onload, config) {
        if (window.Promise) {
          onload(window.Promise);
        } else {
          req(['polyfill'], function (value) {
            onload(value.Promise);
          });
        }
      }
    });
    Sirv.define('bHelpers', function () {
      var moduleName = 'bHelpers';
      var bHelpers = {};

      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
      }

      bHelpers.inheritsLoose = _inheritsLoose;

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      bHelpers.assertThisInitialized = _assertThisInitialized;

      function _readOnlyError(name) {
        throw new Error("\"" + name + "\" is read-only");
      }

      bHelpers.readOnlyError = _readOnlyError;

      function _classPrivateFieldGet(receiver, privateMap) {
        var descriptor = privateMap.get(receiver);

        if (!descriptor) {
          throw new TypeError("attempted to get private field on non-instance");
        }

        if (descriptor.get) {
          return descriptor.get.call(receiver);
        }

        return descriptor.value;
      }

      bHelpers.classPrivateFieldGet = _classPrivateFieldGet;

      function _classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = privateMap.get(receiver);

        if (!descriptor) {
          throw new TypeError("attempted to set private field on non-instance");
        }

        if (descriptor.set) {
          descriptor.set.call(receiver, value);
        } else {
          if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
          }

          descriptor.value = value;
        }

        return value;
      }

      bHelpers.classPrivateFieldSet = _classPrivateFieldSet;
      bHelpers;
      return bHelpers;
    });
    Sirv.define('magicJS', ['bHelpers'], function (bHelpers) {
      var moduleName = 'magicJS';
      /**
      * @version ${MagicJS_version}
      * @package MagicJS
      * @access public
      *
      * @copyright   ${build_year} MagicToolbox.com, To use this code on your own site, visit http://www.magictoolbox.com
      * @license     http://www.magictoolbox.com/license/
      * @author      MagicToolbox.com <support@magictoolbox.com>
      *
      */
      // var magicJS;
      // var $J;
      // magicJS = $J = (function() {
      //     var WIN = window;
      //     var UND = WIN.undefined;
      //     var DOC = document;

      var magicJS;
      var $J;

      magicJS = $J = function () {
        var WIN = window;
        var UND = WIN.undefined;
        var DOC = document;
        /* eslint-env es6 */

        /* global UND, WIN, DOC, Doc */

        /* eslint-disable no-use-before-define */

        /* eslint no-return-assign: "error" */

        /* eslint no-extra-boolean-cast: "off" */

        /* eslint no-continue: "off" */

        /* eslint no-restricted-syntax: ["error", "WithStatement", "BinaryExpression[operator='in']"] */

        /* eslint-disable dot-notation */

        /* eslint-disable eqeqeq */

        var STORAGE = new WeakMap();
        /*
         * Script: base.js
         * Contains core methods.
         */

        /**
         * Contains core methods.
         * @class
         * @static
         */

        var magicJS =
        /** @lends magicJS# */
        {
          /**
           * Start UUID for objects
           */
          UUID: 0,

          /**
           * Storage for object properties
           */
          storage: {},

          /**
           * Assign unique id for an object
           */
          $uuid: function (o) {
            return o.$J_UUID || (o.$J_UUID = ++$J.UUID);
          },

          /**
           * Retreive storage of an object by uuid
           */
          getStorage: function (uuid) {
            return $J.storage[uuid] || ($J.storage[uuid] = {});
          },

          /**
           * Empty function that returns false
           */
          $false: function () {
            return false;
          },

          /**
           * Empty function that returns true
           */
          $true: function () {
            return true;
          },

          /**
           * Id of the magicJS <style></style>
           */
          stylesId: 'mjs-' + Math.floor(Math.random() * new Date().getTime()),

          /**
           * Check if the object defined
           *
           * @param {Object}   object to check
           *
           * @returns {bool}  - true or false
           */
          defined: function (o) {
            return o != UND;
          },

          /**
           * Check if the object defined and return itself of default value
           *
           * @param {Object}   object to check
           * @param {Mixed}    default value
           *
           * @returns {Mixed} - Returns object if it is defined, otherwise default value
           */
          // ifndef: (o, defaultValue) => {
          //     return (o !== UND) ? o : defaultValue;
          // },
          // exists: (o) => {
          //     return !!(o);
          // },

          /**
           * Checks for element within array
           *
           * @param   {Array} source      Source
           * @param   {Mixed} needle      Element that is checked
           * @param   {Integer} [from=0]      The start index to search
           *
           * @returns {Boolean}   true if element found, otherwise false
           */
          contains: function (source, needle, from) {
            return source.indexOf(needle, from) !== -1;
          },

          /**
           * Get type of the object
           *
           * @param {Object}  object to check
           *
           * @returns {String}    - object type
           */
          typeOf: function (o) {
            if (!$J.defined(o)) {
              return false;
            }

            if (o.$J_TYPE) {
              return o.$J_TYPE;
            }

            if (!!o.nodeType) {
              if (o.nodeType === 1) {
                return 'element';
              }

              if (o.nodeType === 3) {
                return 'textnode';
              }
            }

            if (o === WIN) {
              return 'window';
            }

            if (o === DOC) {
              return 'document';
            } // if ((o instanceof WIN.Object || o instanceof WIN.Function) && o.constructor === $J.Class) {
            //     return 'class';
            // }


            if (o instanceof WIN.Array) {
              return 'array';
            }

            if (o instanceof WIN.Function) {
              return 'function';
            }

            if (o instanceof WIN.String) {
              return 'string';
            }

            if ($J.browser.trident) {
              if ($J.defined(o.cancelBubble)) {
                return 'event';
              }
            } else {
              //if ( o instanceof WIN.Event || o === WIN.event || o.constructor == WIN.MouseEvent ) { return 'event'; }
              // eslint-disable-next-line
              if (o === WIN.event || o.constructor == WIN.Event || o.constructor == WIN.MouseEvent || o.constructor == WIN.UIEvent || o.constructor == WIN.KeyboardEvent || o.constructor == WIN.KeyEvent) {
                return 'event';
              }
            }

            if (o instanceof WIN.Date) {
              return 'date';
            }

            if (o instanceof WIN.RegExp) {
              return 'regexp';
            }

            if (o.length && o.item) {
              return 'collection';
            }

            if (o.length && o.callee) {
              return 'arguments';
            }

            return typeof o;
          },

          /**
           * Extend objects
           *
           * @param {mixed}   objects to extend
           * @param {Hash}    properties
           *
           * @returns first extended object
           * @type   {Object}
           */
          extend: function (o, p) {
            if (!(o instanceof WIN.Array)) {
              o = [o];
            }

            if (!p) {
              return o[0];
            }

            for (var i = 0, l = o.length; i < l; i++) {
              if (!$J.defined(o)) {
                continue;
              } // for ( const k in (p || {}) ) {


              for (var k in p) {
                if (!Object.prototype.hasOwnProperty.call(p, k)) {
                  continue;
                }

                try {
                  o[i][k] = p[k];
                } catch (x) {// empty
                }
              }
            }

            return o[0];
          },

          /**
           * Extend an objects' prototype
           *
           * @param {mixed} object to extend
           * @param {Hash}  properties
           *
           * @returns first extended object
           * @type   {Object}
           */
          implement: function (o, p) {
            if (!(o instanceof WIN.Array)) {
              o = [o];
            }

            for (var i = 0, l = o.length; i < l; i++) {
              if (!$J.defined(o[i])) {
                continue;
              }

              if (!o[i].prototype) {
                continue;
              }

              for (var k in p || {}) {
                if (!o[i].prototype[k]) {
                  o[i].prototype[k] = p[k];
                }
              }
            }

            return o[0];
          },

          /**
           * Extend a native Javascript object (e.g. Array)
           *
           * @param {Object}   object to extend
           * @param {Hash}     properties
           */
          nativize: function (o, p) {
            if (!$J.defined(o)) {
              return o;
            }

            for (var k in p || {}) {
              if (!o[k]) {
                o[k] = p[k];
              }
            }

            return o;
          },

          /**
           * Run first succeeded functions
           *
           * @param {Function}     function to be executed
           *
           * @returns {Mixed}     - result of function call or null
           */
          $try: function () {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            for (var i = 0, l = args.length; i < l; i++) {
              try {
                return args[i]();
              } catch (e) {// empty
              }
            }

            return null;
          },

          /**
           * Convert iterable object to an array
           *
           * @param {Mixed}    iterable object
           *
           * @returns {Array} - result array
           */
          $A: function (o) {
            if (!$J.defined(o)) {
              return $J.$([]);
            }

            if (o.toArray) {
              return $J.$(o.toArray());
            }

            if (o.item) {
              var l = o.length || 0;
              var a = new Array(l);

              while (l--) {
                a[l] = o[l];
              }

              return $J.$(a);
            }

            return $J.$(Array.prototype.slice.call(o));
          },

          /**
           * Get current time in milliseconds
           *
           * @returns {Number}    - number of milliseconds since 1 January 1970 00:00:00
           */
          now: function () {
            return new Date().getTime();
          },
          detach: function (o) {
            var r;

            switch ($J.typeOf(o)) {
              case 'object':
                r = {};

                for (var p in o) {
                  if (Object.prototype.hasOwnProperty.call(o, p)) {
                    r[p] = $J.detach(o[p]);
                  }
                }

                break;

              case 'array':
                r = [];

                for (var i = 0, l = o.length; i < l; i++) {
                  r[i] = $J.detach(o[i]);
                }

                break;

              default:
                return o;
            }

            return $J.$(r);
          },
          $: function (o) {
            var result = o;

            switch ($J.typeOf(o)) {
              case 'string':
                {
                  var el = DOC.getElementById(o);

                  if ($J.defined(el)) {
                    result = $J.$(el);
                  } else {
                    result = null;
                  }

                  break;
                }

              case 'window':
              case 'document':
                if (STORAGE.has(o)) {
                  result = STORAGE.get(o);
                } else {
                  result = new Doc(o);
                }

                break;

              case 'element':
                if (STORAGE.has(o)) {
                  result = STORAGE.get(o);
                } else {
                  result = new Element(o);
                }

                break;

              case 'event':
                result = new $J.Events.MagicEvent(o);
                break;
              // no default
            }

            return result;
          },

          /**
           * Creates new dom element
           *
           * @param   {String}
           *
           * @returns
           */
          $new: function (tag, props, css) {
            return $J.$(DOC.createElement(tag)).setProps(props || {}).setCss(css || {});
          },

          /**
           * Adds new CSS style definition to the document
           *
           * @param {String} selector CSS selector
           * @param {String|Object} css CSS rules
           * @param {String} [id] Identifier of the style sheet. Optional.
           * @param {dom object} [root] Context of searching element by id
           *
           * @return {Number} position of the added CSS within the style sheet
           */
          addCSS: function (selector, css, id, root) {
            var style;
            var sheet;
            var idx = -1;
            var rules = [];
            var rootNode = DOC.head || DOC.body;

            if (root) {
              rootNode = $(root).node || root;
            }

            if (!id) {
              id = $J.stylesId;
            }

            style = $(rootNode.querySelector('#' + id));

            if (!style) {
              style = $J.$new('style', {
                id: id,
                type: 'text/css'
              });
              rootNode.insertBefore(style.node, rootNode.firstChild);
            } // sheet = style.sheet;


            sheet = style.node.sheet;

            if (!sheet) {
              // sheet = style.styleSheet;
              sheet = style.node.styleSheet;
            }

            if ($J.typeOf(css) !== 'string') {
              for (var p in css) {
                if (Object.prototype.hasOwnProperty.call(css, p)) {
                  rules.push(p + ':' + css[p]);
                }
              }

              css = rules.join(';');
            }

            if (sheet.insertRule) {
              idx = sheet.insertRule(selector + ' {' + css + '}', sheet.cssRules.length);
            } else {
              idx = sheet.addRule(selector, css);
            }

            return idx;
          },

          /**
           * Remove CSS rule by index from a particular stylesheet
           *
           * @param {String} id Identifier of the style sheet
           * @param {Number} index Position of the CSS to be removed within the style sheet
           */
          removeCSS: function (id, index) {
            var style = $J.$(id);

            if ($J.typeOf(style) !== 'element') {
              return;
            }

            var sheet = style.sheet || style.styleSheet;

            if (sheet.deleteRule) {
              sheet.deleteRule(index);
            } else if (sheet.removeRule) {
              sheet.removeRule(index);
            }
          },

          /**
           * Create UUID
           * @return {String}
           */
          generateUUID: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
              var r = Math.random() * 16 | 0;
              var v = c === 'x' ? r : r & 0x3 | 0x8;
              return v.toString(16);
            }).toUpperCase();
          },

          /**
           * Retrieve absolute URL of a given link
           * @param {String} url link
           * @return {String}
           */
          getAbsoluteURL: function () {
            var a;
            return function (url) {
              if (!a) a = DOC.createElement('a');
              a.setAttribute('href', url);
              return ('!!' + a.href).replace('!!', '');
            };
          }(),

          /**
           * String hash function similar to java.lang.String.hashCode().
           *
           * @param {String} s A string.
           * @return {Number} Hash value for {@code s}, between 0 (inclusive) and 2^32
           *  (exclusive). The empty string returns 0.
           */
          getHashCode: function (s) {
            var r = 0;
            var l = s.length;

            for (var i = 0; i < l; ++i) {
              r = 31 * r + s.charCodeAt(i);
              r %= 0x100000000;
            }

            return r;
          },

          /**
           * Return camel-case string
           *
           * @param {String}
           *
           * @returns {String}    - string in camel-case
           */
          camelize: function (str) {
            return str.replace(/-\D/g, function (m) {
              return m.charAt(1).toUpperCase();
            });
          },

          /**
           * Return hyphenated string
           *
           * @param {String}
           *
           * @returns {String} - hyphenated string
           */
          dashize: function (str) {
            return str.replace(/[A-Z]/g, function (m) {
              return '-' + m.charAt(0).toLowerCase();
            });
          },

          /**
           * Check if string contains substring
           *
           * @param {string}      - source
           * @param {string}      - needle to find
           * @param {string}      - Optional. Separator
           *
           * @returns {bool}      - True if the needle found, False otherwise
           */
          stringHas: function (source, str, sep) {
            sep = sep || '';
            return (sep + source + sep).indexOf(sep + str + sep) > -1;
          }
        };
        var $J = magicJS;
        var $j = magicJS.$; //eslint-disable-line no-unused-vars

        var $ = $J.$;
        /* eslint-env es6 */

        /* global $J, WIN, DOC, UND, DocumentTouch */

        /* eslint-disable dot-notation */

        /* eslint new-parens: "off" */

        /* eslint no-extra-boolean-cast: "off" */

        /* eslint no-unused-vars: ["error", { "args": "none" }] */

        /**
          *     Browser engines
          *         Gecko:
          *             1.81 - Firefox 2
          *             1.90 - Firefox 3
          *             1.91 - Firefox 3.5
          *             1.92 - Firefox 3.6
          *             2.0  - Firefox 4.0
          *             5    - Firefox 5.0
          *             ...
          *             25    - Firefox 25
          *
          *         Presto:
          *             2.0 - Opera 9
          *             2.1 - Opera 9.5
          *             2.1 - Opera 9.6
          *             2.2 - Opera 10.00-10.10
          *             2.5 - Opera 10.50
          *             2.6 - Opera 10.6
          *             2.7 - Opera 11
          *
          *         Trident:
          *             7 - IE 11
          *             6 - IE 10
          *             5 - IE 9
          *             4 - IE 8
          *             3 - IE 7
          *             2 - IE 6
          */
        // Normalized event names

        var EVENTS_MAP = {}; // Shortcut for userAgent

        var _UA = navigator.userAgent.toLowerCase();

        var _engine = _UA.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i);

        var _version = _UA.match(/(edge|opr)\/(\d+\.?\d*)/i) || _UA.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i);

        var _safariVer = _UA.match(/version\/(\d+\.?\d*)/i); // Shortcut for document style property for further references


        var docStyles = DOC.documentElement.style;

        var isSupported = function (p) {
          var pp = p.charAt(0).toUpperCase() + p.slice(1);
          return p in docStyles || 'Webkit' + pp in docStyles || 'Moz' + pp in docStyles || 'ms' + pp in docStyles || 'O' + pp in docStyles;
        };
        /** @lends browser# */

        /**
            * @constructs
            * @class Contains information about the client browser
        */


        $J.browser = {
          /**
          * Browser supported features
          */
          features: {
            xpath: !!DOC.evaluate,
            air: !!WIN.runtime,
            query: !!DOC.querySelector,
            fullScreen: !!(DOC.fullscreenEnabled || DOC.msFullscreenEnabled || DOC.exitFullscreen || DOC.cancelFullScreen || DOC.webkitexitFullscreen || DOC.webkitCancelFullScreen || DOC.mozCancelFullScreen || DOC.oCancelFullScreen || DOC.msCancelFullScreen),
            xhr2: !!WIN.ProgressEvent && !!WIN.FormData && WIN.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest(),
            transition: isSupported('transition'),
            transform: isSupported('transform'),
            perspective: isSupported('perspective'),
            animation: isSupported('animation'),
            requestAnimationFrame: false,
            multibackground: false,
            cssFilters: false,
            canvas: false,
            svg: function () {
              return DOC.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
            }()
          },

          /**
           * Touch screen support
           */
          touchScreen: function () {
            return 'ontouchstart' in WIN || WIN.DocumentTouch && DOC instanceof DocumentTouch || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
          }(),

          /**
           * Mobile device?
           */
          mobile: !!_UA.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/),

          /**
           * Browser engine
           */
          engine: function () {
            var result = 'unknown';

            if (_engine && _engine[1]) {
              result = _engine[1].toLowerCase();
            } else if (WIN.opera) {
              result = 'presto';
            } else if (!!WIN.ActiveXObject) {
              result = 'trident';
            } else if (DOC.getBoxObjectFor !== UND || WIN.mozInnerScreenY !== null) {
              result = 'gecko';
            } else if (WIN.WebKitPoint !== null || !navigator.taintEnabled) {
              result = 'webkit';
            }

            return result;
          }(),

          /**
           * Browser engine version
           */
          version: _engine && _engine[2] ? parseFloat(_engine[2]) : 0,

          /**
           * Browser name & version
           */
          uaName: _version && _version[1] ? _version[1].toLowerCase() : '',
          uaVersion: _version && _version[2] ? parseFloat(_version[2]) : 0,
          // prefix for css properties like -webkit-box-shadow
          cssPrefix: '',
          // prefix for style properties like element.style.WebkitBoxShadow
          cssDomPrefix: '',
          // DOM prefix
          domPrefix: '',

          /**
           * IE document mode
           */
          ieMode: 0,

          /**
           * Platform
           *
           * mac      - Mac OS
           * win      - Windows
           * linux    - Linux
           * ios      - Apple iPod/iPhone/iPad
           *
           */
          platform: function () {
            var result;

            if (_UA.match(/ip(?:ad|od|hone)/)) {
              result = 'ios';
            } else {
              result = _UA.match(/(?:webos|android)/);

              if (!result) {
                result = navigator.platform.match(/mac|win|linux/i);

                if (!result) {
                  result = ['other'];
                }
              }

              result = result[0].toLowerCase();
            }

            return result;
          }(),

          /**
           * Browser box model
           *
           * Basically used to determine how IE renders in quirks mode
           */
          backCompat: DOC.compatMode && DOC.compatMode.toLowerCase() === 'backcompat',

          /**
           * Width of the browser's scrollbars
           */
          scrollbarsWidth: 0,

          /**
           * Reference to the real document element
           *
           * Used to correct work with page dimension
           */
          getDoc: function () {
            return DOC.compatMode && DOC.compatMode.toLowerCase() === 'backcompat' ? DOC.body : DOC.documentElement;
          },

          /**
           * Reference to the requestAnimationFrame method (if any)
           */
          requestAnimationFrame: WIN.requestAnimationFrame || WIN.mozRequestAnimationFrame || WIN.webkitRequestAnimationFrame || WIN.oRequestAnimationFrame || WIN.msRequestAnimationFrame || UND,

          /**
           * Reference to the cancelAnimationFrame method (if any)
           */
          cancelAnimationFrame: WIN.cancelAnimationFrame || WIN.mozCancelAnimationFrame || WIN.mozCancelAnimationFrame || WIN.oCancelAnimationFrame || WIN.msCancelAnimationFrame || WIN.webkitCancelRequestAnimationFrame || UND,

          /**
           * Indicates that DOM content is ready for manipulation
           *
           * @see domready
           */
          ready: false,

          /**
           * Fires when DOM content is ready for manipulation
           *
           * @see domready
           */
          onready: function () {
            if ($J.browser.ready) {
              return;
            }

            var node;
            var style;
            $J.browser.ready = true;

            try {
              // Calculate width of browser's scrollbars
              var tmp = $J.$new('div').setCss({
                width: 100,
                height: 100,
                overflow: 'scroll',
                position: 'absolute',
                top: -9999
              }).appendTo(DOC.body);
              $J.browser.scrollbarsWidth = tmp.offsetWidth - tmp.clientWidth;
              tmp.remove();
            } catch (ex) {// empty
            }

            try {
              // Test multiple background support
              node = $J.$new('div');
              style = node.style;
              style.cssText = 'background:url(https://),url(https://),red url(https://)';
              $J.browser.features.multibackground = /(url\s*\(.*?){3}/.test(style.background);
              style = null;
              node = null;
            } catch (ex) {// empty
            }

            if (!$J.browser.cssTransformProp) {
              $J.browser.cssTransformProp = $J.dashize($J.normalizeCSS('transform'));
            }

            try {
              // Test CSS filters support
              node = $J.$new('div');
              node.style.cssText = $J.dashize($J.normalizeCSS('filter')) + ':blur(2px);';
              $J.browser.features.cssFilters = !!node.style.length && (!$J.browser.ieMode || $J.browser.ieMode > 9);
              node = null;
            } catch (ex) {// empty
            }

            if (!$J.browser.features.cssFilters) {
              $J.$(DOC.documentElement).addClass('no-cssfilters-magic');
            }

            try {
              // Test Canvas support
              $J.browser.features.canvas = function () {
                var tmp = $J.$new('canvas');
                return !!(tmp.getContext && tmp.getContext('2d'));
              }();
            } catch (ex) {// empty
            }

            if (WIN.TransitionEvent === UND && WIN.WebKitTransitionEvent !== UND) {
              EVENTS_MAP['transitionend'] = 'webkitTransitionEnd';
            }

            $J.$(DOC).callEvent('domready');
          }
        };

        (function () {
          var i;
          var magicClasses = []; // Extra CSS classes applied to <html> (e.g. lt-ie9-magic, mobile-magic)

          switch ($J.browser.engine) {
            case 'trident':
              if (!$J.browser.version) {
                $J.browser.version = !!WIN.XMLHttpRequest ? 3 : 2;
              }

              break;

            case 'gecko':
              $J.browser.version = _version && _version[2] ? parseFloat(_version[2]) : 0;
              break;
            // no default
          }

          $J.browser[$J.browser.engine] = true;

          if (_version && _version[1] === 'crios') {
            $J.browser.uaName = 'chrome';
          }

          if (!!WIN.chrome) {
            $J.browser.chrome = true;
          }

          if (_version && _version[1] === 'opr') {
            $J.browser.uaName = 'opera';
            $J.browser.opera = true;
          }

          if ($J.browser.uaName === 'safari' && _safariVer && _safariVer[1]) {
            $J.browser.uaVersion = parseFloat(_safariVer[1]);
          }

          if ($J.browser.platform === 'android' && $J.browser.webkit && _safariVer && _safariVer[1]) {
            $J.browser.androidBrowser = true;
          } // browser prefixes


          var prefixes = {
            gecko: ['-moz-', 'Moz', 'moz'],
            webkit: ['-webkit-', 'Webkit', 'webkit'],
            trident: ['-ms-', 'ms', 'ms'],
            presto: ['-o-', 'O', 'o']
          }[$J.browser.engine] || ['', '', ''];
          $J.browser.cssPrefix = prefixes[0];
          $J.browser.cssDomPrefix = prefixes[1];
          $J.browser.domPrefix = prefixes[2];

          $J.browser.ieMode = function () {
            var result;

            if (!$J.browser.trident) {
              result = UND;
            } else if (DOC.documentMode) {
              result = DOC.documentMode;
            } else if ($J.browser.backCompat) {
              result = 5;
            } else {
              var v = 0;

              switch ($J.browser.version) {
                case 2:
                  v = 6;
                  break;

                case 3:
                  v = 7;
                  break;
                // no default
              }

              result = v;
            }

            return result;
          }(); // Mobile Safari engine in the “request desktop site” mode on iOS/iPadOS.
          // Since iPadOS 13, Safari's “request desktop site” setting is turned on by default for all websites


          if (!$J.browser.mobile && $J.browser.platform === 'mac' && $J.browser.touchScreen) {
            $J.browser.mobile = true;
            $J.browser.platform = 'ios';
          }

          magicClasses.push($J.browser.platform + '-magic');

          if ($J.browser.mobile) {
            magicClasses.push('mobile-magic');
          }

          if ($J.browser.androidBrowser) {
            magicClasses.push('android-browser-magic');
          }

          if ($J.browser.ieMode) {
            // Add CSS class of the IE version to <html> for possible tricks
            $J.browser.uaName = 'ie';
            $J.browser.uaVersion = $J.browser.ieMode;
            magicClasses.push('ie' + $J.browser.ieMode + '-magic');

            for (i = 11; i > $J.browser.ieMode; i--) {
              magicClasses.push('lt-ie' + i + '-magic');
            }
          }

          if ($J.browser.webkit && $J.browser.version < 536) {
            // Disable fullscreen in old Safari
            $J.browser.features.fullScreen = false;
          }

          if ($J.browser.requestAnimationFrame) {
            // Enable native requestAnimationFrame if it works (issue in Safari 6.1.x)
            $J.browser.requestAnimationFrame.call(WIN, function () {
              $J.browser.features.requestAnimationFrame = true;
            });
          }

          if ($J.browser.features.svg) {
            magicClasses.push('svg-magic');
          } else {
            magicClasses.push('no-svg-magic');
          }

          var exClasses = (DOC.documentElement.className || '').match(/\S+/g) || [];
          DOC.documentElement.className = $J.$(exClasses).concat(magicClasses).join(' ');

          try {
            DOC.documentElement.setAttribute('data-magic-ua', $J.browser.uaName);
            DOC.documentElement.setAttribute('data-magic-ua-ver', $J.browser.uaVersion);
            DOC.documentElement.setAttribute('data-magic-engine', $J.browser.engine);
            DOC.documentElement.setAttribute('data-magic-engine-ver', $J.browser.version); // DOC.documentElement.setAttribute('data-magic-features', magicClasses.join(' '));
          } catch (ex) {// empty
          }

          if ($J.browser.ieMode && $J.browser.ieMode < 9) {
            // Workaround for IE<9 to support <figure> & <figcaption> elements
            DOC.createElement('figure');
            DOC.createElement('figcaption');
          } // Map pointer events for IE 10.


          if (!WIN.navigator.pointerEnabled) {
            ['Down', 'Up', 'Move', 'Over', 'Out'].forEach(function (type) {
              // EVENTS_MAP['pointer' + type.toLowerCase()] = WIN.navigator.msPointerEnabled ? 'MSPointer' + type : -1;
              var evt = 'pointer' + type.toLowerCase();

              if ($J.browser.uaName === 'edge') {
                EVENTS_MAP[evt] = evt;
              } else if (WIN.navigator.msPointerEnabled) {
                EVENTS_MAP[evt] = 'MSPointer' + type;
              } else {
                EVENTS_MAP[evt] = -1;
              }
            });
          }
        })();

        (function () {
          var getCancel = function () {
            var result = DOC.exitFullscreen || DOC.cancelFullScreen || document[$J.browser.domPrefix + 'ExitFullscreen'] || document[$J.browser.domPrefix + 'CancelFullScreen'];

            if (!result) {
              result = function () {};
            }

            return result;
          };

          var getChangeEventName = function () {
            var result;

            if (DOC.msExitFullscreen) {
              result = 'MSFullscreenChange';
            } else {
              if (DOC.exitFullscreen) {
                result = '';
              } else {
                result = $J.browser.domPrefix;
              }

              result += 'fullscreenchange';
            }

            return result;
          };

          var getErrorEventName = function () {
            var result;

            if (DOC.msExitFullscreen) {
              result = 'MSFullscreenError';
            } else {
              if (DOC.exitFullscreen) {
                result = '';
              } else {
                result = $J.browser.domPrefix;
              }

              result += 'fullscreenerror';
            }

            return result;
          };

          var callRequestFullscreen = function (el) {
            var f = el.requestFullscreen || el[$J.browser.domPrefix + 'RequestFullscreen'] || el[$J.browser.domPrefix + 'RequestFullScreen'];

            if (!f) {
              f = function () {};
            }

            f.call(el);
          };

          var fullScreen = {
            capable: $J.browser.features.fullScreen,
            enabled: function () {
              return !!(DOC.fullscreenElement || DOC[$J.browser.domPrefix + 'FullscreenElement'] || DOC.fullScreen || DOC.webkitIsFullScreen || DOC[$J.browser.domPrefix + 'FullScreen']);
            },
            request: function (el, opts) {
              if (!opts) {
                opts = {};
              }

              if (fullScreen.capable && !opts.windowFullscreen) {
                fullScreen.onchange = function (e) {
                  // onfullscreenchange event
                  if (fullScreen.enabled()) {
                    // we entered full-screen mode
                    if (opts.onEnter) {
                      opts.onEnter();
                    }
                  } else {
                    // left fullscreen mode
                    $J.$(DOC).removeEvent(fullScreen.changeEventName, fullScreen.onchange);

                    if (opts.onExit) {
                      opts.onExit();
                    }
                  }
                };

                $J.$(DOC).addEvent(fullScreen.changeEventName, fullScreen.onchange);

                fullScreen.onerror = function (e) {
                  // onfullscreenchange event
                  if (opts.fallback) {
                    opts.fallback();
                  }

                  $J.$(DOC).removeEvent(fullScreen.errorEventName, fullScreen.onerror);
                }; // if native fullscreen failed, enter pseudo mode


                $J.$(DOC).addEvent(fullScreen.errorEventName, fullScreen.onerror);
                callRequestFullscreen($(el).node);
              } else if (opts.fallback) {
                opts.fallback();
              }
            },
            cancel: getCancel(),
            changeEventName: getChangeEventName(),
            errorEventName: getErrorEventName(),
            prefix: $J.browser.domPrefix,
            activeElement: null
          };
          $J.browser.fullScreen = fullScreen;
        })();
        /* eslint-env es6 */

        /* global WIN, DOC, UND, docStyles, STORAGE, EVENTS_MAP */

        /* eslint-disable quote-props */

        /* eslint no-restricted-syntax: ["error", "WithStatement"] */

        /* eslint-disable camelcase */
        // Not whitespace regexp
        // const r_nwp = /\S+/g;


        var r_cssToNum = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/; // normalize CSS names

        var cssMap = {
          'float': typeof docStyles.styleFloat === 'undefined' ? 'cssFloat' : 'styleFloat'
        }; // Unitless CSS properties (w/o 'px')

        var nopxCSS = {
          'fontWeight': true,
          'lineHeight': true,
          'opacity': true,
          'zIndex': true,
          'zoom': true
        };
        var getCssValue;

        if (WIN.getComputedStyle) {
          getCssValue = function (e, name) {
            var css = WIN.getComputedStyle(e, null);
            return css ? css.getPropertyValue(name) || css[name] : null;
          };
        } else {
          getCssValue = function (e, name) {
            var css = e.currentStyle;
            var v = null;
            v = css ? css[name] : null;

            if (v === null && e.style && e.style[name]) {
              v = e.style[name];
            }

            return v;
          };
        } // Returns normalize CSS name (probably with a vendor prefix)


        var normalizeCSS = function (name) {
          var pName; // Webkit reports the existence of the filter property, but it can be used only with -webkit- prefix.

          var standard = $J.browser.webkit && name === 'filter' ? false : name in docStyles; // if ( !(name in docStyles) ) {

          if (!standard) {
            pName = $J.browser.cssDomPrefix + name.charAt(0).toUpperCase() + name.slice(1);

            if (pName in docStyles) {
              return pName;
            }
          }

          return name;
        };

        $J.normalizeCSS = normalizeCSS;

        var Base = /*#__PURE__*/function () {
          "use strict";

          function Base(node) {
            this.node = node;
            this.$J_UUID = ++$J.UUID;
            this.$J_TYPE = null;

            this.$J_EXT = function () {};

            STORAGE.set(this.node, this);
          }
          /**
           * Retreive object's property from the global storage
           *
           * @param  {string}    - property name
           * @param  {mixed}     - default value
           *
           * @returns {mixed}     - property value
           */


          var _proto5 = Base.prototype;

          _proto5.fetch = function fetch(prop, def) {
            var s = $J.getStorage(this.$J_UUID);
            var p = s[prop];
            var result = null;

            if (def !== UND && p === UND) {
              s[prop] = def;
              p = s[prop];
            }

            if ($J.defined(p)) {
              result = p;
            }

            return result;
          }
          /**
           * Store object's property in the global storage
           *
           * @param  {string}    - property name
           * @param  {mixed}     - value
           *
           * @returns {element}   - HTML element
           */
          ;

          _proto5.store = function store(prop, val) {
            var s = $J.getStorage(this.$J_UUID);
            s[prop] = val;
            return this;
          }
          /**
           * Delete object's property from the global storage
           *
           * @param  {string}    - property name
           *
           * @returns {element}   - HTML element
           */
          ;

          _proto5.del = function del(prop) {
            var s = $J.getStorage(this.$J_UUID);
            delete s[prop];
            return this;
          }
          /**
           * Add event listener
           *
           * @param  type  {Mixed}     event type
           * @param  fn  {Function}    listener
           * @param  [priority=10] {Integer} order in which the listener will be called
           */
          ;

          _proto5.addEvent = function addEvent(type, fn, priority, options) {
            var _this6 = this;

            var handlers; // let _self;

            var _type;

            if ($J.typeOf(type) === 'string') {
              _type = type.split(' ');

              if (_type.length > 1) {
                type = _type;
              }
            }

            if ($J.typeOf(type) === 'array') {
              type.forEach(function (__type) {
                // this.addEvent.call(this, __type, fn, priority, options);
                _this6.addEvent(__type, fn, priority, options);
              });
              return this;
            } // Normalize event name


            type = EVENTS_MAP[type] || type;

            if (!type || !fn || $J.typeOf(type) !== 'string' || $J.typeOf(fn) !== 'function') {
              return this;
            }

            if (type === 'domready' && $J.browser.ready) {
              // fn.call(this);
              fn();
              return this;
            }

            priority = parseInt(priority || 50, 10);

            if (!fn.$J_EUID) {
              fn.$J_EUID = Math.floor(Math.random() * $J.now());
            } // const events = $J.Doc.fetch.call(this, '_EVENTS_', {});


            var events = this.fetch('_EVENTS_', {});
            handlers = events[type];

            if (!handlers) {
              // Initialize event handlers queue
              handlers = [];
              events[type] = handlers; // _self = this;

              if ($J.Events.handlers[type]) {
                $J.Events.handlers[type].add.call(this, options); // $J.Events.handlers[type].add(this, options);
              } else {
                // handlers['handle'] = function (e) {
                handlers['handle'] = function (e) {
                  e = $J.extend(e || WIN.e, {
                    $J_TYPE: 'event'
                  }); // $J.Doc.callEvent.call(_self, type, $J.$(e));

                  _this6.callEvent(type, $J.$(e));
                };

                this.node[$J._event_add_]($J._event_prefix_ + type, handlers['handle'], false);
              }
            }

            var fnObj = {
              type: type,
              fn: fn,
              priority: priority,
              euid: fn.$J_EUID
            };
            handlers.push(fnObj);
            handlers.sort(function (a, b) {
              return a.priority - b.priority;
            });
            return this;
          } // removeEvent(type/*, fn */) {
          ;

          _proto5.removeEvent = function removeEvent() {
            var _this7 = this;

            // const events = $J.Doc.fetch.call(this, '_EVENTS_', {});
            var events = this.fetch('_EVENTS_', {});
            var fnObj;
            var k;

            var _type; // let del;


            var type = arguments.length <= 0 ? undefined : arguments[0]; // const fn = arguments.length > 1 ? arguments[1] : -100;

            var fn = arguments.length > 1 ? arguments.length <= 1 ? undefined : arguments[1] : -100;

            if ($J.typeOf(type) === 'string') {
              _type = type.split(' ');

              if (_type.length > 1) {
                type = _type;
              }
            }

            if ($J.typeOf(type) === 'array') {
              // $J.$(type).each(this.removeEvent.bindAsEvent(this, fn));
              type.forEach(function (__type) {
                _this7.removeEvent(__type, fn);
              });
              return this;
            } // Normalize event name


            type = EVENTS_MAP[type] || type;

            if (!type || $J.typeOf(type) !== 'string' || !events || !events[type]) {
              return this;
            }

            var handlers = events[type] || [];

            for (k = 0; k < handlers.length; k++) {
              fnObj = handlers[k];

              if (fn === -100 || !!fn && fn.$J_EUID === fnObj.euid) {
                // del = handlers.splice(k--, 1);
                handlers.splice(k--, 1);
              }
            }

            if (handlers.length === 0) {
              if ($J.Events.handlers[type]) {
                $J.Events.handlers[type].remove.call(this);
              } else {
                this.node[$J._event_del_]($J._event_prefix_ + type, handlers['handle'], false);
              }

              delete events[type];
            }

            return this;
          };

          _proto5.callEvent = function callEvent(type, e) {
            var events = this.fetch('_EVENTS_', {});
            var k; // Normalize event name

            type = EVENTS_MAP[type] || type;

            if (!type || $J.typeOf(type) !== 'string' || !events || !events[type]) {// return this;
            } else {
              try {
                if (!e || !e.type) {
                  e = $J.extend(e || {}, {
                    type: type
                  });
                }
              } catch (ev) {// empty
              }

              if (e.timeStamp === UND) {
                e.timeStamp = $J.now();
              }

              var handlers = events[type] || [];

              for (k = 0; k < handlers.length && !(e.isQueueStopped && e.isQueueStopped()); k++) {
                handlers[k].fn.call(this, e);
              }
            }
          };

          _proto5.raiseEvent = function raiseEvent(type, name) {
            var _native = type !== 'domready';

            var o = this;
            var e; // Normalize event name

            type = EVENTS_MAP[type] || type;

            if (!_native) {
              this.callEvent(type);
              return this;
            }

            if (o === DOC && DOC.createEvent && !o.dispatchEvent) {
              o = DOC.documentElement;
            }

            if (DOC.createEvent) {
              e = DOC.createEvent(type);
              e.initEvent(name, true, true);
            } else {
              e = DOC.createEventObject();
              e.eventType = type;
            }

            if (DOC.createEvent) {
              o.dispatchEvent(e);
            } else {
              o.fireEvent('on' + name, e);
            }

            return e;
          };

          _proto5.clearEvents = function clearEvents() {
            // const events = $J.Doc.fetch.call(this, '_EVENTS_');
            var events = this.fetch('_EVENTS_');

            if (!events) {
              return this;
            }

            for (var _type in events) {
              if (Object.prototype.hasOwnProperty.call(events, _type)) {
                // $J.Doc.removeEvent.call(this, _type);
                this.removeEvent(_type);
              }
            } // $J.Doc.del.call(this, '_EVENTS_');


            this.del('_EVENTS_');
            return this;
          };

          return Base;
        }();

        var Element = /*#__PURE__*/function (_Base) {
          "use strict";

          bHelpers.inheritsLoose(Element, _Base);

          function Element(node) {
            var _this8;

            _this8 = _Base.call(this, node) || this;
            _this8.$J_TYPE = 'magicjs-element';
            return _this8;
          } // Full screen


          var _proto6 = Element.prototype;

          _proto6.requestFullScreen = function requestFullScreen() {
            if ($J.browser.fullScreen.capable && !DOC.requestFullScreen) {
              $J.browser.fullScreen.request(this.node);
            } else {
              this.node.requestFullScreen(this.node);
            }
          }
          /**
           * Adds class(es) to element
           *
           * @param {String}   val   One or more space-separated classes to be added
           *
           * @returns {Element}    Reference to the element itself
           */
          ;

          _proto6.addClass = function addClass(val) {
            var _this9 = this;

            val = val ? val.split(' ') : [''];
            val.forEach(function (v) {
              v = v.trim();

              if (v) {
                _this9.node.classList.add(v);
              }
            });
            return this;
          }
          /**
           * Removes class(es) from element.
           *
           * @param {String}  [val] One or more space-separated classes to be removed. If omitted, remove all classes.
           *
           * @returns {Element}    Reference to the element itself
           */
          ;

          _proto6.removeClass = function removeClass(val) {
            this.node.classList.remove(val);
            return this;
          }
          /**
           * Toogles a class on element
           *
           * @param {String}   val  A class name to be toggled
           *
           * @returns {Element}    Reference to the element itself
           */
          ;

          _proto6.toggleClass = function toggleClass(val) {
            this.node.classList.toggle(val);
            return this;
          }
          /**
           * Retrieves element's css style
           *
           * @param {String}   property CSS property to retrieve
           *
           * @returns {Mixed}     Value of CSS property
           */
          ;

          _proto6.getCss = function getCss(p) {
            var cssName = $J.camelize(p);
            var v = null;

            if (!cssMap[cssName]) {
              cssMap[cssName] = normalizeCSS(cssName);
            }

            p = cssMap[cssName]; // p = cssMap[cssName] || (cssMap[cssName] = normalizeCSS(cssName));

            v = getCssValue(this.node, p);

            if (v === 'auto') {
              v = null;
            }

            if (v !== null) {
              if (p === 'opacity') return $J.defined(v) ? parseFloat(v) : 1.0;

              if (r_cssToNum.test(p)) {
                v = parseInt(v, 10) ? v : '0px';
              }
            }

            return v;
          }
          /**
           * Applies a single CSS style to element
           *
           * @param {String}      key        CSS property name
           * @param {Mixed}      value    Value to be set up
           *
           * @returns {Element}   Reference to the element itself
           */
          ;

          _proto6.setCssProp = function setCssProp(k, v) {
            var cssName = $J.camelize(k);

            try {
              if (!cssMap[cssName]) {
                cssMap[cssName] = normalizeCSS(cssName);
              }

              k = cssMap[cssName]; // k = cssMap[cssName] || (cssMap[cssName] = normalizeCSS(cssName));

              this.node.style[k] = v + ($J.typeOf(v) === 'number' && !nopxCSS[cssName] ? 'px' : '');
            } catch (e) {// empty
            }

            return this;
          }
          /**
           * Applies css styles to element
           *
           * @param {Hash}    styles  Set of the CSS styles to apply
           *
           * @returns {Element}    Reference to the element itself
           */
          ;

          _proto6.setCss = function setCss(styles) {
            for (var s in styles) {
              if (Object.prototype.hasOwnProperty.call(styles, s)) {
                this.setCssProp(s, styles[s]);
              }
            }

            return this;
          }
          /**
           * Retrieves set of element's css style
           *
           * @param {String[]}   styles   CSS styles to retrieve
           *
           * @returns {Hash}      Set of CSS styles
           */
          ;

          _proto6.getStyles = function getStyles() {
            var _this10 = this;

            var r = {};

            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            args.forEach(function (k) {
              r[k] = _this10.getCss(k);
            });
            return r;
          }
          /**
           * Applies properties to element
           *
           * @param {Hash}    properties  Set of properties to apply
           *
           * @returns {Element}    Reference to the element itself
           */
          ;

          _proto6.setProps = function setProps(props) {
            for (var p in props) {
              if (p === 'class') {
                this.addClass('' + props[p]);
              } else {
                this.node.setAttribute(p, '' + props[p]);
              }
            }

            return this;
          };

          _proto6.getTransitionDuration = function getTransitionDuration() {
            var duration = 0;
            var delay = 0;
            duration = this.getCss('transition-duration');
            delay = this.getCss('transition-delay');

            if (duration.indexOf('ms') > -1) {
              duration = parseFloat(duration);
            } else if (duration.indexOf('s') > -1) {
              duration = parseFloat(duration) * 1000;
            }

            if (delay.indexOf('ms') > -1) {
              delay = parseFloat(delay);
            } else if (delay.indexOf('s') > -1) {
              delay = parseFloat(delay) * 1000;
            }

            return duration + delay;
          }
          /**
           * Gets size of element
           *
           * @returns {Hash} Size of the element  {width: x, height: x}
           */
          ;

          _proto6.getSize = function getSize() {
            return {
              'width': this.node.offsetWidth,
              'height': this.node.offsetHeight
            };
          }
          /**
           * Gets inner size of element
           *
           * @param  [withPadding=false] {Boolean} include padding in returning size
           *
           * @returns {Hash} Size of the element  {width: x, height: x}
           */
          ;

          _proto6.getInnerSize = function getInnerSize(withPadding) {
            var size = this.getSize();
            size.width -= parseFloat(this.getCss('border-left-width') || 0) + parseFloat(this.getCss('border-right-width') || 0);
            size.height -= parseFloat(this.getCss('border-top-width') || 0) + parseFloat(this.getCss('border-bottom-width') || 0);

            if (!withPadding) {
              size.width -= parseFloat(this.getCss('padding-left') || 0) + parseFloat(this.getCss('padding-right') || 0);
              size.height -= parseFloat(this.getCss('padding-top') || 0) + parseFloat(this.getCss('padding-bottom') || 0);
            }

            return size;
          }
          /**
           * Gets scroll offsets
           *
           * @returns {Hash} Number of pixels that element has been scrolled upward and to the left
           */
          ;

          _proto6.getScroll = function getScroll() {
            return {
              'top': this.node.scrollTop,
              'left': this.node.scrollLeft
            };
          }
          /**
           * Gets scroll offsets from the window top left corner
           *
           * @returns {Hash}
           */
          ;

          _proto6.getFullScroll = function getFullScroll() {
            var el = this.node;
            var p = {
              'top': 0,
              'left': 0
            };

            do {
              p.left += el.scrollLeft || 0;
              p.top += el.scrollTop || 0;
              el = el.parentNode;
            } while (el);

            return p;
          }
          /**
           * Gets absolue position of element
           *
           * @returns {Hash} Coordinates of element's top left corner
           */
          ;

          _proto6.getPosition = function getPosition() {
            var el = this.node;
            var l = 0;
            var t = 0;

            if ($J.defined(DOC.documentElement.getBoundingClientRect)) {
              var b = this.node.getBoundingClientRect();
              var docScroll = $J.$(DOC).getScroll();
              var doc = $J.browser.getDoc();
              return {
                'top': b.top + docScroll.y - doc.clientTop,
                'left': b.left + docScroll.x - doc.clientLeft
              };
            }

            do {
              l += el.offsetLeft || 0;
              t += el.offsetTop || 0;
              el = el.offsetParent;
            } while (el && !/^(?:body|html)$/i.test(el.tagName));

            return {
              'top': t,
              'left': l
            };
          }
          /**
           * Gets element's absolute coordinates on a page
           *
           * @returns {Hash}  top/left/bottom/right coordinates
           */
          ;

          _proto6.getRect = function getRect() {
            var p = this.getPosition();
            var s = this.getSize();
            return {
              'top': p.top,
              'bottom': p.top + s.height,
              'left': p.left,
              'right': p.left + s.width
            };
          }
          /**
           * Sets element content
           *
           * @param {String} content New content
           *
           * @returns {Element}   Reference to the element itself
           */
          ;

          _proto6.changeContent = function changeContent(c) {
            try {
              this.node.innerHTML = c;
            } catch (e) {
              this.node.innerText = c;
            }

            return this;
          }
          /**
           * Removes element from the DOM tree
           *
           * @returns {Element} Reference to the removed element
           */
          ;

          _proto6.remove = function remove() {
            var result = this;

            if (this.node.parentNode) {
              result = $J.$(this.node.parentNode.removeChild(this.node));
            } // TODO remove from storage


            return result;
          }
          /**
           * Kills element by removes it DOM tree and clear all events.
           * All child elements will be killed too.
           *
           * @returns Null
           */
          ;

          _proto6.kill = function kill() {
            $J.$A(this.node.childNodes).forEach(function (o) {
              if (o.nodeType === 3 || o.nodeType === 8) {
                return;
              }

              $J.$(o).kill();
            });
            this.remove();
            this.clearEvents();

            if (this.$J_UUID) {
              $J.storage[this.$J_UUID] = null;
              delete $J.storage[this.$J_UUID];
            }

            return null;
          }
          /**
           * Appends child element
           *
           * @param  {Element}   element  Element to append
           * @param  {String}    [position='bottom']  Where to append: top/bottom.
           *
           * @returns {Element}    Reference to the element itself
           */
          ;

          _proto6.append = function append(o, p) {
            if (p === void 0) {
              p = 'bottom';
            }

            var f = this.node.firstChild;
            o = $J.$(o);

            if (p === 'top' && f) {
              this.node.insertBefore(o.node, f);
            } else {
              this.node.appendChild(o.node || o);
            }

            return this;
          }
          /**
           * Appends element to parent
           *
           * @param  {Element}   parent   Parent element
           * @param  {String}    [position='bottom']  Where to append: top/bottom.
           *
           * @returns {Element}    Reference to the element itself
           */
          ;

          _proto6.appendTo = function appendTo(o, p) {
            // return $J.$(o).append(this, p);
            $J.$(o).append(this, p);
            return this;
          };

          _proto6.getTagName = function getTagName() {
            return this.node.tagName.toLowerCase();
          };

          _proto6.attr = function attr(attrName, attrValue) {
            var result = this;

            if ($J.defined(attrValue)) {
              this.node.setAttribute(attrName, attrValue);
            } else {
              result = this.node.getAttribute(attrName);

              if (!result || $J.typeOf(result) !== 'string' || result.trim() === '') {
                result = null;
              }
            }

            return result;
          };

          _proto6.removeAttr = function removeAttr(attrName) {
            this.node.removeAttribute(attrName);
            return this;
          }
          /**
           * Checks if the specified class applied to the element
           * @param  {String}  cName Class to check
           * @return {Boolean}
           */
          ;

          _proto6.hasClass = function hasClass(cName) {
            // Use `classList` if browser supports it.
            if (this.node.classList) {
              return this.node.classList.contains(cName);
            }

            var className = this.node.className;

            if (this.node.className instanceof SVGAnimatedString) {
              className = this.node.className.baseVal;
            }

            return !$J.stringHas(cName || '', ' ') && $J.stringHas(className || '', ' ');
          };

          _proto6.hasAttribute = function hasAttribute(attrName) {
            return this.node.hasAttribute(attrName);
          };

          return Element;
        }(Base);
        /* eslint-disable class-methods-use-this */


        var Doc = /*#__PURE__*/function (_Base2) {
          "use strict";

          bHelpers.inheritsLoose(Doc, _Base2);

          function Doc(node) {
            var _this11;

            _this11 = _Base2.call(this, node) || this;
            var type = 'magicjs-document';

            if (node === WIN) {
              type = 'magicjs-window';
            }

            _this11.$J_TYPE = type;
            return _this11;
          }
          /**
           * Gets size of browser window
           */


          var _proto7 = Doc.prototype;

          _proto7.getSize = function getSize() {
            if ($J.browser.touchScreen || $J.browser.presto925 || $J.browser.webkit419) {
              return {
                'width': WIN.innerWidth,
                'height': WIN.innerHeight
              };
            }

            return {
              'width': $J.browser.getDoc().clientWidth,
              'height': $J.browser.getDoc().clientHeight
            };
          }
          /**
           * Gets window scroll offsets
           */
          ;

          _proto7.getScroll = function getScroll() {
            return {
              'x': WIN.pageXOffset || $J.browser.getDoc().scrollLeft,
              'y': WIN.pageYOffset || $J.browser.getDoc().scrollTop
            };
          }
          /**
           * Get full page size including scroll
           */
          ;

          _proto7.getFullSize = function getFullSize() {
            var s = this.getSize();
            return {
              'width': Math.max($J.browser.getDoc().scrollWidth, s.width),
              'height': Math.max($J.browser.getDoc().scrollHeight, s.height)
            };
          };

          return Doc;
        }(Base);
        /* eslint-env es6 */

        /* global magicJS, $J */

        /* global WIN, DOC, UND */

        /* global EVENTS_MAP */

        /* eslint-disable dot-notation */

        /* eslint-disable no-unused-vars */

        /* eslint no-restricted-syntax: ["error", "WithStatement", "BinaryExpression[operator='in']"] */

        /* eslint no-unused-vars: ["error", { "args": "none" }] */


        $J.Events = {};
        /**
         * Contains Event methods, custom Events and Element methods to dealing with events.
         * @class Contains Event methods, custom Events and Element methods to dealing with events.
         */

        var MagicEvent = /*#__PURE__*/function () {
          "use strict";

          function MagicEvent(originEvent) {
            this.oe = originEvent;
            this.$J_TYPE = 'event';
            this.isQueueStopped = $J.$false;
            this.type = this.oe.type;
            this.timeStamp = this.oe.timeStamp;
            this.propertyName = this.oe.propertyName;
            this.pointerType = this.oe.pointerType;
          }

          var _proto8 = MagicEvent.prototype;

          _proto8.getOriginEvent = function getOriginEvent() {
            return this.oe;
          }
          /**
           * Stop event propagation and default actions.
           * @return {Event}
           */
          ;

          _proto8.stop = function stop() {
            return this.stopDistribution().stopDefaults();
          }
          /**
           * Stop event propagation.
           * @return {Event}
           */
          ;

          _proto8.stopDistribution = function stopDistribution() {
            if (this.oe.stopPropagation) {
              // if (this.oe.cancelable) {
              this.oe.stopPropagation(); // }
            } else {
              this.oe.cancelBubble = true;
            }

            return this;
          }
          /**
           * Stop default action.
           * @return {Event}
           */
          ;

          _proto8.stopDefaults = function stopDefaults() {
            if (this.oe.preventDefault) {
              this.oe.preventDefault();
            } else {
              this.oe.returnValue = false;
            }

            return this;
          }
          /**
           * Prevent other listeners to handle the event.
           * @return {Event}
           */
          ;

          _proto8.stopQueue = function stopQueue() {
            this.isQueueStopped = $J.$true;
            return this;
          }
          /**
           * Return mouse/pointer coordinates relative to the viewport.
           * @return {Object}
           */
          ;

          _proto8.getClientXY = function getClientXY() {
            var src;
            var result = {
              x: 0,
              y: 0
            };

            if (/touch/i.test(this.type)) {
              src = this.oe.changedTouches[0];
            } else {
              src = this.oe;
            }

            if ($J.defined(src)) {
              result = {
                x: src.clientX,
                y: src.clientY
              };
            }

            return result;
          }
          /**
           * Return mouse/pointer coordinates relative to the viewport, including scroll offset.
           * @return {Object}
           */
          ;

          _proto8.getPageXY = function getPageXY() {
            var src;
            var result = {
              x: 0,
              y: 0
            };

            if (/touch/i.test(this.type)) {
              src = this.oe.changedTouches[0];
            } else {
              src = this.oe;
            }

            if ($J.defined(src)) {
              result = {
                x: src.pageX || src.clientX + $J.browser.getDoc().scrollLeft,
                y: src.pageY || src.clientY + $J.browser.getDoc().scrollTop
              };
            }

            return result;
          }
          /**
           * Return target element.
           * @return {Element}
           */
          ;

          _proto8.getTarget = function getTarget() {
            var t = this.oe.target;

            if (!t) {
              t = this.oe.srcElement;
            }

            while (t && t.nodeType === 3) {
              t = t.parentNode;
            }

            return t;
          }
          /**
           * Return related element.
           * @return {Element}
           */
          ;

          _proto8.getRelated = function getRelated() {
            var r = null;

            switch (this.type) {
              case 'mouseover':
              case 'pointerover':
              case 'MSPointerOver':
                r = this.oe.relatedTarget;

                if (!r) {
                  r = this.oe.fromElement;
                }

                break;

              case 'mouseout':
              case 'pointerout':
              case 'MSPointerOut':
                r = this.oe.relatedTarget;

                if (!r) {
                  r = this.oe.toElement;
                }

                break;

              default:
                return r;
            }

            try {
              while (r && r.nodeType === 3) {
                r = r.parentNode;
              }
            } catch (ex) {
              r = null;
            }

            return r;
          }
          /**
           * Return clicked button
           *  1 - left, 2 - middle, 3 - right
           *
           * @returns  {integer}   button index
           */
          ;

          _proto8.getButton = function getButton() {
            var result = this.oe.which;

            if (!this.oe.which && this.oe.button !== UND) {
              if (this.oe.button & 1) {
                result = 1;
              } else if (this.oe.button & 2) {
                result = 3;
              } else if (this.oe.button & 4) {
                result = 2;
              } else {
                result = 0;
              }
            }

            return result;
          }
          /**
           * Return true if it's a Touch/Pointer event.
           * @return {Boolean}
           */
          ;

          _proto8.isTouchEvent = function isTouchEvent() {
            return this.oe.pointerType && (this.oe.pointerType === 'touch' || this.oe.pointerType === this.oe.MSPOINTER_TYPE_TOUCH) || /touch/i.test(this.type);
          }
          /**
           * Return true if it's a primary Touch/Pointer event.
           * @return {Boolean}
           */
          ;

          _proto8.isPrimaryTouch = function isPrimaryTouch() {
            if (this.oe.pointerType) {
              return (this.oe.pointerType === 'touch' || this.oe.MSPOINTER_TYPE_TOUCH === this.oe.pointerType) && this.oe.isPrimary;
            } else if (this.oe instanceof WIN.TouchEvent) {
              return this.oe.changedTouches.length === 1 && (this.oe.targetTouches.length ? this.oe.targetTouches[0].identifier === this.oe.changedTouches[0].identifier : true);
            }

            return false;
          }
          /**
           * Return reference to the primary Touch/Pointer event.
           * @return {Object}
           */
          ;

          _proto8.getPrimaryTouch = function getPrimaryTouch() {
            var result = null;

            if (this.oe.pointerType) {
              if (this.oe.isPrimary && (this.oe.pointerType === 'touch' || this.oe.MSPOINTER_TYPE_TOUCH === this.oe.pointerType)) {
                result = this.oe;
              }
            } else if (this.oe instanceof WIN.TouchEvent) {
              result = this.oe.changedTouches[0];
            }

            return result;
          }
          /**
           * Return identifier of the primary Touch/Pointer event.
           * @return {Int}
           */
          ;

          _proto8.getPrimaryTouchId = function getPrimaryTouchId() {
            var result = null;

            if (this.oe.pointerType) {
              if (this.oe.isPrimary && (this.oe.pointerType === 'touch' || this.oe.MSPOINTER_TYPE_TOUCH === this.oe.pointerType)) {
                result = this.oe.pointerId;
              }
            } else if (this.oe instanceof WIN.TouchEvent) {
              result = this.oe.changedTouches[0].identifier;
            }

            return result;
          };

          return MagicEvent;
        }();

        $J.Events.MagicEvent = MagicEvent;
        /* Extend Element and Document prototypes */

        $J._event_add_ = 'addEventListener';
        $J._event_del_ = 'removeEventListener';
        $J._event_prefix_ = '';

        if (!DOC.addEventListener) {
          $J._event_add_ = 'attachEvent';
          $J._event_del_ = 'detachEvent';
          $J._event_prefix_ = 'on';
        }

        var Custom = /*#__PURE__*/function () {
          "use strict";

          function Custom(e) {
            this.$J_TYPE = 'event.custom';
            this.magicEvent = e.$J_TYPE === 'event' ? e : e.magicEvent;
            this.type = this.magicEvent.type; // this.target = this.magicEvent.oe.target;

            this.x = this.magicEvent.oe.x;
            this.y = this.magicEvent.oe.y;
            this.button = this.magicEvent.getButton();
            this.timeStamp = this.magicEvent.oe.timeStamp;
            this.relatedTarget = this.magicEvent.getRelated();
            this.isQueueStopped = this.magicEvent.isQueueStopped; // TODO $J.$false

            this.events = [];
          }

          var _proto9 = Custom.prototype;

          _proto9.getOriginEvent = function getOriginEvent() {
            return this.magicEvent.getOriginEvent();
          };

          _proto9.pushToEvents = function pushToEvents(e) {
            var eventCopy = e;
            this.events.push(eventCopy);
          };

          _proto9.stop = function stop() {
            return this.stopDistribution().stopDefaults();
          };

          _proto9.stopDistribution = function stopDistribution() {
            this.events.forEach(function (e) {
              try {
                e.stopDistribution();
              } catch (ex) {// empty
              }
            });
            return this;
          };

          _proto9.stopDefaults = function stopDefaults() {
            this.events.forEach(function (e) {
              try {
                e.stopDefaults();
              } catch (ex) {// empty
              }
            });
            return this;
          };

          _proto9.stopQueue = function stopQueue() {
            this.isQueueStopped = $J.$true;
            this.magicEvent.stopQueue();
            return this;
          }
          /**
           * Return mouse/pointer coordinates relative to the viewport.
           * @return {Object}
           */
          ;

          _proto9.getClientXY = function getClientXY() {
            return {
              x: this.clientX || this.magicEvent.oe.clientX,
              y: this.clientY || this.magicEvent.oe.clientY
            };
          }
          /**
           * Return mouse/pointer coordinates relative to the viewport, including scroll offset.
           * @return {Object}
           */
          ;

          _proto9.getPageXY = function getPageXY() {
            return {
              x: this.x,
              y: this.y
            };
          };

          _proto9.getTarget = function getTarget() {
            return this.target || this.magicEvent.oe.target;
          };

          _proto9.getRelated = function getRelated() {
            return this.relatedTarget;
          };

          _proto9.getButton = function getButton() {
            return this.button;
          };

          _proto9.getOriginalTarget = function getOriginalTarget() {
            var result = UND;

            if (this.events.length > 0) {
              result = this.events[0].getTarget();
            }

            return result;
          }
          /**
           * Return true if it's a Touch/Pointer event.
           * @return {Boolean}
           */
          ;

          _proto9.isTouchEvent = function isTouchEvent() {
            return this.magicEvent.isTouchEvent();
          }
          /**
           * Return true if it's a primary Touch/Pointer event.
           * @return {Boolean}
           */
          ;

          _proto9.isPrimaryTouch = function isPrimaryTouch() {
            return this.magicEvent.isPrimaryTouch();
          }
          /**
           * Return reference to the primary Touch/Pointer event.
           * @return {Object}
           */
          ;

          _proto9.getPrimaryTouch = function getPrimaryTouch() {
            return this.magicEvent.getPrimaryTouch();
          }
          /**
           * Return identifier of the primary Touch/Pointer event.
           * @return {Int}
           */
          ;

          _proto9.getPrimaryTouchId = function getPrimaryTouchId() {
            return this.magicEvent.getPrimaryTouchId();
          };

          return Custom;
        }();

        $J.Events.Custom = Custom;
        $J.Events.handlers = {};
        /**
         * Dom ready custom event implementation
         */

        (function ($J) {
          if (DOC.readyState === 'interactive' || DOC.readyState === 'complete') {
            setTimeout(function () {
              return $J.browser.onready();
            }, 0);
          } else {
            $J.$(DOC).addEvent('readystatechange', function (event) {
              if (event.getTarget().readyState === 'interactive' || event.getTarget().readyState === 'complete') {
                $J.browser.onready();
              }
            });
            $J.$(DOC).addEvent('DOMContentLoaded', $J.browser.onready);
            $J.$(WIN).addEvent('load', $J.browser.onready);
          }
        })(magicJS);
        /* eslint-env es6 */

        /* eslint no-restricted-properties: [2, {"object": "Math.pow"}] */

        /* global magicJS, DOC */


        (function ($J) {
          var RADIUS_THRESHOLD = 5; // Click radius  // Click speed threshold

          var TIME_THRESHOLD = 300; // Click speed threshold

          var BtnClick = /*#__PURE__*/function (_$J$Events$Custom) {
            "use strict";

            bHelpers.inheritsLoose(BtnClick, _$J$Events$Custom);

            function BtnClick(e, target) {
              var _this12;

              _this12 = _$J$Events$Custom.call(this, e) || this;
              var r = e.getPageXY();
              _this12.type = 'btnclick';
              _this12.x = r.x;
              _this12.y = r.y;
              _this12.clientX = e.oe.clientX;
              _this12.clientY = e.oe.clientY;
              _this12.target = target.node;

              _this12.pushToEvents(e);

              return _this12;
            }

            return BtnClick;
          }($J.Events.Custom);

          var _options = {
            threshold: TIME_THRESHOLD,
            // Click speed threshold
            button: 1 // left button

          };

          var onclick = function (e) {
            e.stopDefaults();
          };

          var handle = function (e) {
            var btnclickEvent;
            var r;
            var options = this.fetch('event:btnclick:options');

            if (e.type !== 'dblclick' && e.getButton() !== options.button) {
              return;
            }

            if (this.fetch('event:btnclick:ignore')) {
              this.del('event:btnclick:ignore');
              return;
            }

            if (e.type === 'mousedown') {
              // e.stop(); // will it cause problems? but if we need to stop mousedown user wont be able to do this, as we don't pass it
              btnclickEvent = new BtnClick(e, this);
              this.store('event:btnclick:btnclickEvent', btnclickEvent);
            } else if (e.type === 'mouseup') {
              btnclickEvent = this.fetch('event:btnclick:btnclickEvent');

              if (!btnclickEvent) {
                return;
              }

              r = e.getPageXY();
              this.del('event:btnclick:btnclickEvent');
              btnclickEvent.pushToEvents(e); // if (e.timeStamp - btnclickEvent.timeStamp <= options.threshold && btnclickEvent.x == r.x && btnclickEvent.y == r.y) {

              if (e.timeStamp - btnclickEvent.timeStamp <= options.threshold && Math.sqrt(Math.pow(r.x - btnclickEvent.x, 2) + Math.pow(r.y - btnclickEvent.y, 2)) <= RADIUS_THRESHOLD) {
                this.callEvent('btnclick', btnclickEvent);
              } // Release mousedrag event


              $(DOC).callEvent('mouseup', e);
            } else if (e.type === 'dblclick') {
              // fire another btnclick because IE doesn't fire second mousedown on double click (and second click too)
              btnclickEvent = new BtnClick(e, this);
              this.callEvent('btnclick', btnclickEvent);
            }
          };

          var handler = {
            add: function (options) {
              this.store('event:btnclick:options', $J.extend($J.detach(_options), options || {}));
              this.addEvent('mousedown', handle, 1);
              this.addEvent('mouseup', handle, 1);
              this.addEvent('click', onclick, 1);
            },
            remove: function () {
              this.removeEvent('mousedown', handle);
              this.removeEvent('mouseup', handle);
              this.removeEvent('click', onclick);
            }
          };
          $J.Events.handlers.btnclick = handler;
        })(magicJS);
        /* eslint-env es6 */

        /* global magicJS, DOC */


        (function ($J) {
          var Mousedrag = /*#__PURE__*/function (_$J$Events$Custom2) {
            "use strict";

            bHelpers.inheritsLoose(Mousedrag, _$J$Events$Custom2);

            function Mousedrag(e, target, state) {
              var _this13;

              _this13 = _$J$Events$Custom2.call(this, e) || this;
              var r = e.getPageXY();
              _this13.x = r.x;
              _this13.y = r.y;
              _this13.type = 'mousedrag';
              _this13.clientX = e.clientX;
              _this13.clientY = e.clientY;
              _this13.target = target.node;
              _this13.state = state; // dragmove / dragend

              _this13.dragged = false;

              _this13.pushToEvents(e);

              return _this13;
            }

            return Mousedrag;
          }($J.Events.Custom);

          var handleMouseDown = function (e) {
            if (e.getButton() !== 1) {
              return;
            } // e.stopDefaults();


            var dragEvent = new Mousedrag(e, this, 'dragstart');
            this.store('event:mousedrag:dragstart', dragEvent); // this.callEvent('mousedrag', dragEvent);
          };

          var handleMouseUp = function (e) {
            var dragEvent;
            dragEvent = this.fetch('event:mousedrag:dragstart');

            if (!dragEvent) {
              return;
            }

            e.stopDefaults();
            dragEvent = new Mousedrag(e, this, 'dragend');
            this.del('event:mousedrag:dragstart');
            this.callEvent('mousedrag', dragEvent);
          };

          var handleMouseMove = function (e) {
            var dragEvent;
            dragEvent = this.fetch('event:mousedrag:dragstart');

            if (!dragEvent) {
              return;
            }

            e.stopDefaults();

            if (!dragEvent.dragged) {
              dragEvent.dragged = true;
              this.callEvent('mousedrag', dragEvent); // send dragstart
            }

            dragEvent = new Mousedrag(e, this, 'dragmove');
            this.callEvent('mousedrag', dragEvent);
          };

          var handler = {
            add: function () {
              var move = handleMouseMove.bind(this);
              var end = handleMouseUp.bind(this);
              this.addEvent('mousedown', handleMouseDown, 1);
              this.addEvent('mouseup', handleMouseUp, 1);
              $(DOC).addEvent('mousemove', move, 1);
              $(DOC).addEvent('mouseup', end, 1);
              this.store('event:mousedrag:listeners:document:move', move);
              this.store('event:mousedrag:listeners:document:end', end);
            },
            remove: function () {
              var f = function () {};

              this.removeEvent('mousedown', handleMouseDown);
              this.removeEvent('mouseup', handleMouseUp);
              $(DOC).removeEvent('mousemove', this.fetch('event:mousedrag:listeners:document:move') || f);
              $(DOC).removeEvent('mouseup', this.fetch('event:mousedrag:listeners:document:end') || f);
              this.del('event:mousedrag:listeners:document:move');
              this.del('event:mousedrag:listeners:document:end');
            }
          };
          $J.Events.handlers.mousedrag = handler;
        })(magicJS);
        /* eslint-env es6 */

        /* global magicJS */


        (function ($J) {
          var Dblbtnclick = /*#__PURE__*/function (_$J$Events$Custom3) {
            "use strict";

            bHelpers.inheritsLoose(Dblbtnclick, _$J$Events$Custom3);

            function Dblbtnclick(e, target) {
              var _this14;

              _this14 = _$J$Events$Custom3.call(this, e) || this;
              var r = e.getPageXY();
              _this14.x = r.x;
              _this14.y = r.y;
              _this14.type = 'dblbtnclick';
              _this14.clientX = e.clientX;
              _this14.clientY = e.clientY;
              _this14.target = target.node;
              _this14.timedout = false;
              _this14.tm = null;

              _this14.pushToEvents(e);

              return _this14;
            }

            return Dblbtnclick;
          }($J.Events.Custom);

          var _options = {
            threshold: 200
          };

          var handle = function (e) {
            var _this15 = this;

            var event = this.fetch('event:dblbtnclick:event');
            var options = this.fetch('event:dblbtnclick:options');

            if (!event) {
              // first click
              event = new Dblbtnclick(e, this);
              event.tm = setTimeout(function () {
                event.timedout = true;
                e.isQueueStopped = $J.$false;

                _this15.callEvent('btnclick', e);

                _this15.del('event:dblbtnclick:event');
              }, options.threshold + 10);
              this.store('event:dblbtnclick:event', event);
              e.stopQueue();
            } else {
              clearTimeout(event.tm);
              this.del('event:dblbtnclick:event');

              if (!event.timedout) {
                // double click detected within threshold timeout
                event.pushToEvents(e);
                e.stopQueue().stop();
                this.callEvent('dblbtnclick', event);
              } else {// double click timed out
              }
            }
          };

          var handler = {
            add: function (options) {
              this.store('event:dblbtnclick:options', $J.extend($J.detach(_options), options || {}));
              this.addEvent('btnclick', handle, 1); // we should be first handler in queue or this wont work
            },
            remove: function () {
              this.removeEvent('btnclick', handle);
            }
          };
          $J.Events.handlers.dblbtnclick = handler;
        })(magicJS);
        /* eslint-env es6 */

        /* global magicJS */

        /* eslint no-restricted-properties: [2, {"object": "Math.pow"}] */

        /* eslint no-unused-vars: ["error", { "args": "none" }] */


        (function ($J) {
          // Tap thresholds
          var RADIUS_THRESHOLD = 10;
          var TIME_THRESHOLD = 200;

          var Tap = /*#__PURE__*/function (_$J$Events$Custom4) {
            "use strict";

            bHelpers.inheritsLoose(Tap, _$J$Events$Custom4);

            function Tap(e, target) {
              var _this16;

              _this16 = _$J$Events$Custom4.call(this, e) || this;
              var touch = e.getPrimaryTouch();
              _this16.type = 'tap';
              _this16.id = touch.pointerId || touch.identifier;
              _this16.x = touch.pageX;
              _this16.y = touch.pageY;
              _this16.pageX = touch.pageX;
              _this16.pageY = touch.pageY;
              _this16.clientX = touch.clientX;
              _this16.clientY = touch.clientY;
              _this16.button = 0;
              _this16.target = target.node;

              _this16.pushToEvents(e);

              return _this16;
            }

            return Tap;
          }($J.Events.Custom);

          var onClick = function (e) {
            e.stopDefaults();
          };

          var onTouchStart = function (e) {
            if (!e.isPrimaryTouch()) {
              this.del('event:tap:event');
              return;
            }

            this.store('event:tap:event', new Tap(e, this)); // Prevent btnclick event

            this.store('event:btnclick:ignore', true);
          };

          var onTouchEnd = function (e) {
            // let now = $J.now();
            var event = this.fetch('event:tap:event'); // let options = this.fetch('event:tap:options');

            if (!event || !e.isPrimaryTouch()) {
              return;
            }

            this.del('event:tap:event');

            if (event.id === e.getPrimaryTouchId() && e.timeStamp - event.timeStamp <= TIME_THRESHOLD && Math.sqrt(Math.pow(e.getPrimaryTouch().pageX - event.x, 2) + Math.pow(e.getPrimaryTouch().pageY - event.y, 2)) <= RADIUS_THRESHOLD) {
              this.del('event:btnclick:btnclickEvent');
              e.stop();
              event.pushToEvents(e);
              this.callEvent('tap', event);
            }
          };

          var handler = {
            add: function (options) {
              this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1);
              this.addEvent(['touchend', 'pointerup'], onTouchEnd, 1);
              this.addEvent('click', onClick, 1);
            },
            remove: function () {
              this.removeEvent(['touchstart', 'pointerdown'], onTouchStart);
              this.removeEvent(['touchend', 'pointerup'], onTouchEnd);
              this.removeEvent('click', onClick);
            }
          };
          $J.Events.handlers.tap = handler;
        })(magicJS);
        /* eslint-env es6 */

        /* global magicJS */


        (function ($J) {
          var Dbltap = /*#__PURE__*/function (_$J$Events$Custom5) {
            "use strict";

            bHelpers.inheritsLoose(Dbltap, _$J$Events$Custom5);

            function Dbltap(e, target) {
              var _this17;

              _this17 = _$J$Events$Custom5.call(this, e) || this;
              _this17.type = 'dbltap';
              _this17.x = e.x;
              _this17.y = e.y;
              _this17.clientX = e.clientX;
              _this17.clientY = e.clientY;
              _this17.target = target.node;
              _this17.timedout = false;
              _this17.tm = null;

              _this17.pushToEvents(e);

              return _this17;
            }

            return Dbltap;
          }($J.Events.Custom);

          var _options = {
            threshold: 300
          };

          var handle = function (e) {
            var _this18 = this;

            var event = this.fetch('event:dbltap:event');
            var options = this.fetch('event:dbltap:options');

            if (!event) {
              // first tap
              event = new Dbltap(e, this);
              event.tm = setTimeout(function () {
                event.timedout = true;
                e.isQueueStopped = $J.$false;

                _this18.callEvent('tap', e);
              }, options.threshold + 10);
              this.store('event:dbltap:event', event);
              e.stopQueue();
            } else {
              clearTimeout(event.tm);
              this.del('event:dbltap:event');

              if (!event.timedout) {
                // double tap detected within threshold timeout
                event.pushToEvents(e);
                e.stopQueue().stop();
                this.callEvent('dbltap', event);
              } else {// double tap timed out
              }
            }
          };

          var handler = {
            add: function (options) {
              this.store('event:dbltap:options', $J.extend($J.detach(_options), options || {}));
              this.addEvent('tap', handle, 1); // we should be first handler in queue or this wont work
            },
            remove: function () {
              this.removeEvent('tap', handle);
            }
          };
          $J.Events.handlers.dbltap = handler;
        })(magicJS);
        /* eslint-env es6 */

        /* eslint no-restricted-properties: [2, {"object": "Math.pow"}] */

        /* global magicJS, DOC */


        (function ($J) {
          var RADIUS_THRESHOLD = 10;

          var Touchdrag = /*#__PURE__*/function (_$J$Events$Custom6) {
            "use strict";

            bHelpers.inheritsLoose(Touchdrag, _$J$Events$Custom6);

            function Touchdrag(e, target, state) {
              var _this19;

              _this19 = _$J$Events$Custom6.call(this, e) || this;
              var touch = e.getPrimaryTouch();
              _this19.type = 'touchdrag';
              _this19.id = touch.pointerId || touch.identifier;
              _this19.clientX = touch.clientX;
              _this19.clientY = touch.clientY;
              _this19.pageX = touch.pageX;
              _this19.pageY = touch.pageY;
              _this19.x = touch.pageX;
              _this19.y = touch.pageY;
              _this19.button = 0;
              _this19.target = target.node;
              _this19.state = state; // dragmove / dragend

              _this19.dragged = false;

              _this19.pushToEvents(e);

              return _this19;
            }

            return Touchdrag;
          }($J.Events.Custom);

          var onTouchStart = function (e) {
            // if ( !isPrimaryTouch(e) ) {
            if (!e.isPrimaryTouch()) {
              return;
            }

            var dragEvent = new Touchdrag(e, this, 'dragstart');
            this.store('event:touchdrag:dragstart', dragEvent);
          };

          var onTouchEnd = function (e) {
            var dragEvent;
            dragEvent = this.fetch('event:touchdrag:dragstart');

            if (!dragEvent || !dragEvent.dragged || dragEvent.id !== e.getPrimaryTouchId()) {
              return;
            }

            dragEvent = new Touchdrag(e, this, 'dragend');
            this.del('event:touchdrag:dragstart');
            this.callEvent('touchdrag', dragEvent);
          };

          var onTouchMove = function (e) {
            var dragEvent;
            dragEvent = this.fetch('event:touchdrag:dragstart');

            if (!dragEvent || !e.isPrimaryTouch()) {
              return;
            }

            if (dragEvent.id !== e.getPrimaryTouchId()) {
              this.del('event:touchdrag:dragstart');
              return;
            }

            if (!dragEvent.dragged && Math.sqrt(Math.pow(e.getPrimaryTouch().pageX - dragEvent.x, 2) + Math.pow(e.getPrimaryTouch().pageY - dragEvent.y, 2)) > RADIUS_THRESHOLD) {
              dragEvent.dragged = true;
              this.callEvent('touchdrag', dragEvent); // send dragstart
            }

            if (!dragEvent.dragged) {
              return;
            }

            dragEvent = new Touchdrag(e, this, 'dragmove');
            this.callEvent('touchdrag', dragEvent);
          };

          var handler = {
            add: function () {
              var move = onTouchMove.bind(this);
              var end = onTouchEnd.bind(this);
              this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1);
              this.addEvent(['touchend', 'pointerup'], onTouchEnd, 1);
              this.addEvent(['touchmove', 'pointermove'], onTouchMove, 1);
              this.store('event:touchdrag:listeners:document:move', move);
              this.store('event:touchdrag:listeners:document:end', end);
              $(DOC).addEvent('pointermove', move, 1);
              $(DOC).addEvent('pointerup', end, 1);
            },
            remove: function () {
              var f = function () {};

              this.removeEvent(['touchstart', 'pointerdown'], onTouchStart);
              this.removeEvent(['touchend', 'pointerup'], onTouchEnd);
              this.removeEvent(['touchmove', 'pointermove'], onTouchMove);
              $(DOC).removeEvent('pointermove', this.fetch('event:touchdrag:listeners:document:move') || f, 1);
              $(DOC).removeEvent('pointerup', this.fetch('event:touchdrag:listeners:document:end') || f, 1);
              this.del('event:touchdrag:listeners:document:move');
              this.del('event:touchdrag:listeners:document:end');
            }
          };
          $J.Events.handlers.touchdrag = handler;
        })(magicJS);
        /* global DOC, magicJS */

        /* eslint-disable indent */

        /* eslint-disable dot-notation */

        /* eslint no-unused-vars: ["error", { "args": "none" }] */

        /* eslint no-restricted-properties: [2, {"object": "Math.pow"}] */

        /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


        (function ($J) {
          var baseSpace = null;
          var $ = $J.$;

          var distance = function (point1, point2) {
            var x = point2.x - point1.x;
            var y = point2.y - point1.y;
            return Math.sqrt(x * x + y * y);
          };

          var getSpace = function (targetTouches, variables) {
            var ts = Array.prototype.slice.call(targetTouches);
            var diffX = Math.abs(ts[1].pageX - ts[0].pageX);
            var diffY = Math.abs(ts[1].pageY - ts[0].pageY);

            var _x = Math.min(ts[1].pageX, ts[0].pageX) + diffX / 2;

            var _y = Math.min(ts[1].pageY, ts[0].pageY) + diffY / 2;

            var result = 0;
            variables.points = [ts[0], ts[1]]; // result = Math.PI * Math.pow(distance({ x: ts[0].pageX, y: ts[1].pageX }, { x: ts[0].pageY, y: ts[1].pageY }) / 2, 2);
            // result = Math.pow(Math.max(diffX, diffY), 2);

            result = Math.pow(distance({
              x: ts[0].pageX,
              y: ts[0].pageY
            }, {
              x: ts[1].pageX,
              y: ts[1].pageY
            }), 2); // result = (Math.abs(ts[0].pageX - ts[1].pageX) || 1) * (Math.abs(ts[0].pageY - ts[1].pageY) || 1);

            variables.centerPoint = {
              x: _x,
              y: _y
            };
            variables.x = variables.centerPoint.x;
            variables.y = variables.centerPoint.y;
            return result;
          };

          var getScale = function (space) {
            return space / baseSpace;
          };

          var getTouches = function (e, cache) {
            var result;
            var originEvent = e.getOriginEvent();

            if (originEvent.targetTouches && originEvent.changedTouches) {
              if (originEvent.targetTouches) {
                result = originEvent.targetTouches;
              } else {
                result = originEvent.changedTouches;
              }

              result = Array.prototype.slice.call(result);
            } else {
              // fucking ie 11 does not support Array.from()
              result = [];

              if (cache) {
                cache.forEach(function (v) {
                  result.push(v);
                });
              }
            }

            return result;
          };

          var cacheEvent = function (e, cache, justSame) {
            var result = false;

            if (e.pointerId && e.pointerType === 'touch' && (!justSame || cache.has(e.pointerId))) {
              cache.set(e.pointerId, e);
              result = true;
            }

            return result;
          };

          var removeCache = function (e, cache) {
            if (e.pointerId && e.pointerType === 'touch' && cache && cache.has(e.pointerId)) {
              // compressor does not want to compress
              cache['delete'](e.pointerId);
            }
          };

          var getEventId = function (e) {
            var result;

            if (e.pointerId && e.pointerType === 'touch') {
              result = e.pointerId;
            } else {
              result = e.identifier;
            }

            return result;
          };

          var addActivePoints = function (targetTouches, container) {
            var i;
            var id;
            var result = false;

            for (i = 0; i < targetTouches.length; i++) {
              if (container.length === 2) {
                break;
              } else {
                id = getEventId(targetTouches[i]);

                if (!$J.contains(container, id)) {
                  container.push(id);
                  result = true;
                }
              }
            }

            return result;
          };

          var getIds = function (targetTouches) {
            var result = [];
            targetTouches.forEach(function (value) {
              result.push(getEventId(value));
            });
            return result;
          };

          var removeActivePoint = function (targetTouches, container) {
            var i;
            var ids;
            var result = false;

            if (container) {
              ids = getIds(targetTouches);

              for (i = 0; i < container.length; i++) {
                if (!$J.contains(ids, container[i])) {
                  container.splice(i, 1);
                  result = true;
                  break;
                }
              }
            }

            return result;
          };

          var getActivePoints = function (targetTouches, container) {
            var i;
            var result = [];

            for (i = 0; i < targetTouches.length; i++) {
              if ($J.contains(container, getEventId(targetTouches[i]))) {
                result.push(targetTouches[i]);

                if (result.length === 2) {
                  break;
                }
              }
            }

            return result;
          };

          var removePinchEnd = function (el) {
            var target = el.fetch('event:pinch:target');

            if (target) {
              target.removeEvent(['touchend'], el.fetch('event:pinch:listeners:document:end'));
            }

            el.del('event:pinch:target');
          };

          var clearCache = function (el) {
            var cache = el.fetch('event:pinch:cache');

            if (cache) {
              cache.clear();
            }

            el.del('event:pinch:cache');
          };

          var Pinch = /*#__PURE__*/function (_$J$Events$Custom7) {
            "use strict";

            bHelpers.inheritsLoose(Pinch, _$J$Events$Custom7);

            function Pinch(e, target, state, variables) {
              var _this20;

              _this20 = _$J$Events$Custom7.call(this, e) || this;
              _this20.type = 'pinch';
              _this20.target = target.node;
              _this20.state = state; // pinchmove / pinchend / pinchresize

              _this20.x = variables.x;
              _this20.y = variables.y;
              _this20.scale = variables.scale;
              _this20.space = variables.space;
              _this20.zoom = variables.zoom;
              _this20.state = state;
              _this20.centerPoint = variables.centerPoint;
              _this20.points = variables.points;

              _this20.pushToEvents(e);

              return _this20;
            }

            return Pinch;
          }($J.Events.Custom);

          var _variables = {
            x: 0,
            y: 0,
            space: 0,
            scale: 1,
            zoom: 0,
            startSpace: 0,
            startScale: 1,
            started: false,
            dragged: false,
            points: [],
            centerPoint: {
              x: 0,
              y: 0
            }
          };

          var setVariables = function (targetTouches, variables) {
            var lastSpace = variables.space;

            if (targetTouches.length > 1) {
              variables.space = getSpace(targetTouches, variables);

              if (!variables.startSpace) {
                variables.startSpace = variables.space;
              }

              if (lastSpace > variables.space) {
                variables.zoom = -1;
              } else if (lastSpace < variables.space) {
                variables.zoom = 1;
              } else {
                variables.zoom = 0;
              }

              variables.scale = getScale(variables.space);
            } else {
              variables.points = [];
            }
          }; // const onClick = function (e) { e.stop(); };


          var onTouchMove = function (e) {
            var pinchEvent;
            var variables = this.fetch('event:pinch:variables');
            var cache = this.fetch('event:pinch:cache');
            var currentActivePoints = this.fetch('event:pinch:activepoints');

            if (!variables) {
              variables = $J.extend({}, $J.detach(_variables));
            }

            if (variables.started) {
              if (e.pointerId && !cacheEvent(e, cache, true)) {
                return;
              }

              e.stop();
              setVariables(getActivePoints(getTouches(e, cache), currentActivePoints), variables);
              pinchEvent = new Pinch(e, this, 'pinchmove', variables);
              this.callEvent('pinch', pinchEvent);
            }
          };

          var onTouchStart = function (e) {
            var pinchEventStart;
            var variables;
            var cache = this.fetch('event:pinch:cache');
            var currentActivePoints = this.fetch('event:pinch:activepoints');

            if (e.pointerType === 'mouse') {
              return;
            }

            if (!currentActivePoints) {
              currentActivePoints = [];
              this.store('event:pinch:activepoints', currentActivePoints);
            }

            if (!cache) {
              cache = new Map();
              this.store('event:pinch:cache', cache);
            }

            if (!this.fetch('event:pinch:target')) {
              this.store('event:pinch:target', $(e.getTarget()));
              $(e.getTarget()).addEvent(['touchend'], this.fetch('event:pinch:listeners:document:end'), 1);
            }

            cacheEvent(e, cache);
            var targetTouches = getTouches(e, cache);
            addActivePoints(targetTouches, currentActivePoints);

            if (targetTouches.length === 2) {
              pinchEventStart = this.fetch('event:pinch:pinchstart');
              variables = this.fetch('event:pinch:variables');

              if (!variables) {
                variables = $J.extend({}, $J.detach(_variables));
              }

              setVariables(getActivePoints(targetTouches, currentActivePoints), variables);

              if (!pinchEventStart) {
                pinchEventStart = new Pinch(e, this, 'pinchstart', variables);
                this.store('event:pinch:pinchstart', pinchEventStart);
                this.store('event:pinch:variables', variables);
                baseSpace = variables.space;
                this.callEvent('pinch', pinchEventStart);
                variables.started = true;
              }
            }
          };

          var onTouchEnd = function (e) {
            var pinchEvent;

            var _event;

            var cache = this.fetch('event:pinch:cache');

            if (e.pointerType === 'mouse' || e.pointerId && (!cache || !cache.has(e.pointerId))) {
              return;
            }

            pinchEvent = this.fetch('event:pinch:pinchstart');
            var variables = this.fetch('event:pinch:variables');
            var currentActivePoints = this.fetch('event:pinch:activepoints');
            var targetTouches = getTouches(e, cache);
            removeCache(e, cache);
            var removingResult = removeActivePoint(targetTouches, currentActivePoints);

            if (!pinchEvent || !variables || !variables.started || !removingResult || !currentActivePoints) {
              return;
            }

            if (removingResult) {
              addActivePoints(targetTouches, currentActivePoints);
            }

            _event = 'pinchend';

            if (targetTouches.length > 1) {
              _event = 'pinchresize';
            } else {
              this.del('event:pinch:pinchstart');
              this.del('event:pinch:variables');
              this.del('event:pinch:activepoints');
              clearCache(this);
              removePinchEnd(this);
            }

            setVariables(getActivePoints(targetTouches, currentActivePoints), variables);
            pinchEvent = new Pinch(e, this, _event, variables);
            this.callEvent('pinch', pinchEvent);
          };

          var handler = {
            add: function (options) {
              if (!baseSpace) {
                baseSpace = function () {
                  var s = $J.W.getSize();
                  s.width = Math.min(s.width, s.height);
                  s.height = s.width; // var s = { width: 375, height: 812 };

                  return Math.pow(distance({
                    x: 0,
                    y: 0
                  }, {
                    x: s.width,
                    y: s.height
                  }), 2);
                }();
              }

              var move = onTouchMove.bind(this);
              var end = onTouchEnd.bind(this); // this.addEvent(['click', 'tap'], onClick, 1);

              this.addEvent(['touchstart', 'pointerdown'], onTouchStart, 1); // this.addEvent(['touchend', 'pointerup'], onTouchEnd, 1);

              this.addEvent(['pointerup'], onTouchEnd, 1);
              this.addEvent(['touchmove', 'pointermove'], onTouchMove, 1);
              this.store('event:pinch:listeners:document:move', move);
              this.store('event:pinch:listeners:document:end', end);
              $(DOC).addEvent('pointermove', move, 1);
              $(DOC).addEvent('pointerup', end, 1);
            },
            remove: function () {
              var f = function () {}; // this.removeEvent(['click', 'tap'], onClick);


              this.removeEvent(['touchstart', 'pointerdown'], onTouchStart); // this.removeEvent(['touchend', 'pointerup'], onTouchEnd);

              this.removeEvent(['pointerup'], onTouchEnd);
              this.removeEvent(['touchmove', 'pointermove'], onTouchMove);
              $(DOC).removeEvent('pointermove', this.fetch('event:pinch:listeners:document:move') || f, 1);
              $(DOC).removeEvent('pointerup', this.fetch('event:pinch:listeners:document:end') || f, 1);
              this.del('event:pinch:listeners:document:move');
              this.del('event:pinch:listeners:document:end');
              removePinchEnd(this);
              clearCache(this);
              this.del('event:pinch:variables');
              this.del('event:pinch:activepoints');
              this.del('event:pinch:pinchstart');
            }
          };
          $J.Events.handlers.pinch = handler;
        })(magicJS);
        /* eslint-env es6 */

        /* global magicJS, DOC, UND */


        (function ($J) {
          var eventType = 'wheel';

          if (!('onwheel' in DOC || $J.browser.ieMode > 8)) {
            eventType = 'mousewheel';
          }

          var Mousescroll = /*#__PURE__*/function (_$J$Events$Custom8) {
            "use strict";

            bHelpers.inheritsLoose(Mousescroll, _$J$Events$Custom8);

            function Mousescroll(e, target, delta, deltaX, deltaY, deltaZ, deltaFactor) {
              var _this21;

              _this21 = _$J$Events$Custom8.call(this, e) || this;
              var r = e.getPageXY();
              _this21.x = r.x;
              _this21.y = r.y;
              _this21.type = 'mousescroll'; // this.timeStamp = e.timeStamp;

              _this21.target = target.node;
              _this21.delta = delta || 0;
              _this21.deltaX = deltaX || 0;
              _this21.deltaY = deltaY || 0;
              _this21.deltaZ = deltaZ || 0;
              _this21.deltaFactor = deltaFactor || 0;
              _this21.deltaMode = e.deltaMode || 0;
              _this21.isMouse = false;

              _this21.pushToEvents(e);

              return _this21;
            }

            return Mousescroll;
          }($J.Events.Custom);

          var lowestDelta;
          var resetDeltaTimer;

          var resetDelta = function () {
            lowestDelta = null;
          };

          var isMouse = function (deltaFactor, deltaMode) {
            return deltaFactor > 50 || deltaMode === 1 && !($J.browser.platform === 'win' && deltaFactor < 1) // Firefox
            || deltaFactor % 12 === 0 // Safari
            || deltaFactor % 4.000244140625 === 0; // Chrome on OS X
          };

          var handle = function (e) {
            var delta = 0;
            var deltaX = 0;
            var deltaY = 0;
            var absDelta = 0;
            var originEvent = e.getOriginEvent(); // DomMouseScroll event

            if (originEvent.detail) {
              deltaY = e.detail * -1;
            } // mousewheel event


            if (originEvent.wheelDelta !== UND) {
              deltaY = originEvent.wheelDelta;
            }

            if (originEvent.wheelDeltaY !== UND) {
              deltaY = originEvent.wheelDeltaY;
            }

            if (originEvent.wheelDeltaX !== UND) {
              deltaX = originEvent.wheelDeltaX * -1;
            } // wheel event


            if (originEvent.deltaY) {
              deltaY = -1 * originEvent.deltaY;
            }

            if (originEvent.deltaX) {
              deltaX = originEvent.deltaX;
            }

            if (deltaY === 0 && deltaX === 0) {
              return;
            }

            delta = deltaY === 0 ? deltaX : deltaY;
            absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

            if (!lowestDelta || absDelta < lowestDelta) {
              lowestDelta = absDelta;
            }

            var calc = delta > 0 ? 'floor' : 'ceil';
            delta = Math[calc](delta / lowestDelta);
            deltaX = Math[calc](deltaX / lowestDelta);
            deltaY = Math[calc](deltaY / lowestDelta);

            if (resetDeltaTimer) {
              clearTimeout(resetDeltaTimer);
            }

            resetDeltaTimer = setTimeout(resetDelta, 200);

            var _event = new Mousescroll(e, this, delta, deltaX, deltaY, 0, lowestDelta);

            _event.isMouse = isMouse(lowestDelta, originEvent.deltaMode || 0);
            this.callEvent('mousescroll', _event);
          };

          var handler = {
            add: function () {
              this.addEvent(eventType, handle, 1);
            },
            remove: function () {
              this.removeEvent(eventType, handle, 1);
            }
          };
          $J.Events.handlers.mousescroll = handler;
        })(magicJS);
        /**
         * Do the last things. Extend window, document, etc.
         */


        $J.W = $J.$(WIN);
        $J.D = $J.$(DOC);
        $J.U = UND;
        $J.DPPX = window.devicePixelRatio >= 2 ? 2 : 1; // Dots per px. 2 - is equal to Retina.;

        return magicJS;
      }();
      /* eslint no-throw-literal: "off"*/

      /* eslint no-restricted-properties: "off" */

      /* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */

      /* eslint consistent-return: "off"*/

      /* eslint class-methods-use-this: "off"*/

      /* eslint no-unused-expressions: "off"*/

      /* eslint no-undef: "off"*/

      /* eslint no-shadow: ["error", { "allow": ["t", duration] }]*/

      /* eslint no-unused-vars: ["error", { "args": "none" }] */

      /* eslint guard-for-in: "off"*/

      /* eslint-env es6*/


      (function ($J) {
        if (!$J) {
          throw 'MagicJS not found';
        }

        if ($J.FX) {
          return;
        }

        var $ = $J.$;
        /**
         * Basic transition effects
         * @class
         * @constant
         * @static
         */

        var TRANSITION = {
          linear: 'linear',
          sineIn: 'easeInSine',
          sineOut: 'easeOutSine',
          expoIn: 'easeInExpo',
          expoOut: 'easeOutExpo',
          quadIn: 'easeInQuad',
          quadOut: 'easeOutQuad',
          cubicIn: 'easeInCubic',
          cubicOut: 'easeOutCubic',
          backIn: 'easeInBack',
          backOut: 'easeOutBack',
          elasticIn: function (p, x) {
            x = x || [];
            return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
          },
          elasticOut: function (p, x) {
            return 1 - TRANSITION.elasticIn(1 - p, x);
          },
          bounceIn: function (p) {
            for (var a = 0, b = 1; 1; a += b, b /= 2) {
              if (p >= (7 - 4 * a) / 11) {
                return b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
              }
            }
          },
          bounceOut: function (p) {
            return 1 - TRANSITION.bounceIn(1 - p);
          },
          none: function (x) {
            return 0;
          }
        };
        /**
         * @class
         * Class that applies animation to an element
         * @example
         * simple usage:
         * new $J.FX(el1), {
         *  'duration': 400
         * }).start({width:[startWidth, endWidth]});
         * @constructs
         * @param {String|Element} el Element to applied an effect
         * @param [opt] Options
         * @param {Number} opt.fps FPS
         * @param {Number} opt.duration Effect duration in miliseconds
         * @param {Function|String} opt.transition  Easing function
         * @param {Function|String} opt.cycles  The number of times the animation should repeat. Default is 1
         * @param {String} opt.direction  Indicates how the animation should play each cycle. Possible values:
         *                  normal - Default. The animation should play forward each cycle.
         *                  alternate - The animation should reverse direction each cycle.
         *                  reverse - The animation plays backward each cycle.
         *                  alternate-reverse - The animation starts backward, then continues to alternate.
         *                  continuous - The animation plays forward continuously (w/o cycles)
         *                  continuous-reverse - The animation plays backward continuously (w/o cycles)
         * @param {Function} opt.onStart Callback called when animation starts
         * @param {Function} opt.onComplete Callback called when animation completes
         * @param {Function} opt.onBeforeRender Callback called before each step of changing CSS properties
         * @param {Function} opt.onAfterRender Callback called after each step of changing CSS properties
         * @param {Boolean} opt.roundCss Use Math.round() when calculating css steps values
         */

        var FX = /*#__PURE__*/function () {
          "use strict";

          function FX(el
          /* can be array */
          , opt) {
            var _this22 = this;

            this.styles = null;
            this.cubicBezier = null;
            this.easeFn = null;
            this.state = 0; // 0 - init,  1 - started, 2 - started, 3 - ended

            this.pStyles = []; // styles set in percent

            this.alternate = false;
            this.continuous = false;
            this.startTime = null;
            this.finishTime = null;
            this.options = {
              fps: 60,
              duration: 600,
              // transition: function(x) {return  -(Math.cos(Math.PI * x) - 1) / 2},
              transition: 'ease',
              cycles: 1,
              direction: 'normal',
              // normal | reverse | alternate | alternate-reverse | continuous | continuous-reverse
              onStart: function () {},
              onComplete: function () {},
              onBeforeRender: function () {},
              onAfterRender: function () {},
              forceAnimation: false,
              roundCss: false // use Math.round() when calculating css steps values

            };
            this.els = [];

            if (!Array.isArray(el)) {
              el = [el];
            }

            el.forEach(function (_el) {
              if (_el) {
                _this22.els.push($(_el));
              }
            });
            this.options = $J.extend(this.options, opt);
            this.timer = false;
            this.setTransition(this.options.transition);

            if ($J.typeOf(this.options.cycles) === 'string') {
              this.options.cycles = this.options.cycles === 'infinite' ? Infinity : parseInt(this.options.cycles, 10) || 1;
            }
          }

          FX.getTransition = function getTransition() {
            return TRANSITION;
          };

          var _proto10 = FX.prototype;

          _proto10.setTransition = function setTransition(easing) {
            this.options.transition = easing; // this.easeFn = this.cubicBezierAtTime;

            this.easeFn = FX.cubicBezierAtTime;

            var _easing = TRANSITION[this.options.transition] || this.options.transition;

            if ($J.typeOf(_easing) === 'function') {
              this.easeFn = _easing;
            } else {
              this.cubicBezier = this.parseCubicBezier(_easing) || this.parseCubicBezier('ease');
            }
          }
          /**
           * Start animation
           */
          ;

          _proto10.start = function start(styles
          /**Hash*/
          ) {
            var _this23 = this;

            var runits = /\%$/;
            var s;
            var i;

            if (this.state === 2) {
              return this;
            }

            this.state = 1;
            this.cycle = 0;
            this.alternate = $J.contains(['alternate', 'alternate-reverse'], this.options.direction);
            this.continuous = $J.contains(['continuous', 'continuous-reverse'], this.options.direction);

            if (!styles) {
              styles = {};
            }

            if (!Array.isArray(styles)) {
              styles = [styles];
            }

            this.styles = styles;
            var l = this.styles.length;
            this.pStyles = new Array(l);

            for (i = 0; i < l; i++) {
              this.pStyles[i] = {};

              for (s in this.styles[i]) {
                if (runits.test(this.styles[i][s][0])) {
                  this.pStyles[s] = true;
                }

                if ($J.contains(['reverse', 'alternate-reverse', 'continuous-reverse'], this.options.direction)) {
                  this.styles[i][s].reverse();
                }
              }
            }

            this.startTime = $J.now();
            this.finishTime = this.startTime + this.options.duration;
            this.options.onStart();

            if (this.options.duration === 0) {
              // apply all styles immediately
              this.render(1.0);
              this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els);
            } else {
              this.state = 2;

              if (!this.options.forceAnimation && $J.browser.features.requestAnimationFrame) {
                this.timer = $J.browser.requestAnimationFrame.call($J.W.node, this.loop.bind(this));
              } else {
                this.timer = setInterval(function () {
                  _this23.loop();
                }, Math.round(1000 / this.options.fps));
              }
            }

            return this;
          };

          _proto10.stopAnimation = function stopAnimation() {
            if (this.timer) {
              if (!this.options.forceAnimation && $J.browser.features.requestAnimationFrame && $J.browser.cancelAnimationFrame) {
                $J.browser.cancelAnimationFrame.call($J.W.node, this.timer);
              } else {
                clearInterval(this.timer);
              }

              this.timer = false;
            }
          }
          /**
           * Stop animation
           */
          ;

          _proto10.stop = function stop(complete
          /** Boolean*/
          ) {
            if ($J.contains([0, 3], this.state)) {
              return this;
            }

            if (!$J.defined(complete)) {
              complete = false;
            }

            this.stopAnimation();
            this.state = 3;

            if (complete) {
              this.render(1.0); // clearTimeout(this._completeTimer);
              // this._completeTimer = setTimeout(() => {

              this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els); // }, 10);
            }

            return this;
          }
          /**
           * @ignore
           */
          ;

          _proto10.loop = function loop() {
            var _now = $J.now();

            var i;
            var dx = (_now - this.startTime) / this.options.duration;
            var cycle = Math.floor(dx);

            if (_now >= this.finishTime && cycle >= this.options.cycles) {
              this.stopAnimation();
              this.render(1.0); // clearTimeout(this._completeTimer);
              // this._completeTimer = setTimeout(() => {

              this.options.onComplete(this.els.length < 2 ? this.els[0] : this.els); // }, 10);

              return this;
            }

            if (this.alternate && this.cycle < cycle) {
              for (i = 0; i < this.styles.length; i++) {
                for (var s in this.styles[i]) {
                  this.styles[i][s].reverse();
                }
              }
            }

            this.cycle = cycle;

            if (!this.options.forceAnimation && $J.browser.features.requestAnimationFrame) {
              this.timer = $J.browser.requestAnimationFrame.call($J.W.node, this.loop.bind(this));
            }

            this.render((this.continuous ? cycle : 0) + this.easeFn(dx % 1, this.options.duration, this.cubicBezier));
          }
          /**
           * ignore
           */
          ;

          _proto10.render = function render(dx) {
            var i;
            var css = [];

            var _el;

            var _css;

            var l = this.els.length;

            for (i = 0; i < l; i++) {
              css.push(this.renderOverLoad(dx, this.els[i], this.styles[i], this.pStyles[i]));
            }

            _el = this.els;
            _css = css;

            if (l < 2) {
              _el = this.els[0];
              _css = css[0];
            }

            this.options.onBeforeRender(_css, _el);
            this.set(css);
            this.options.onAfterRender(_css, _el);
          }
          /**
           * ignore
           */
          ;

          _proto10.renderOverLoad = function renderOverLoad(dx, el, styles, pStyles) {
            var css = {};
            var change = dx; // eslint-disable-line no-unused-vars

            var s;

            for (s in styles) {
              if (s === 'opacity') {
                css[s] = Math.round(this.calc(styles[s][0], styles[s][1], dx) * 100) / 100;
              } else {
                css[s] = this.calc(styles[s][0], styles[s][1], dx); // if (this.options.roundCss) { css[s] = Math.round(css[s]); } // если двигать кубиком базье в процентах - то без округления лучше двигает
                // Styles defined in percent. Ap

                pStyles[s] && (css[s] += '%');
              }
            }

            return css;
          }
          /**
           * @ignore
           */
          ;

          _proto10.calc = function calc(from, to, dx) {
            from = parseFloat(from);
            to = parseFloat(to);
            return (to - from) * dx + from;
          }
          /**
           * @ignore
          */
          ;

          _proto10.set = function set(css) {
            for (var i = 0; i < this.els.length; i++) {
              this.els[i].setCss(css[i]);
            }

            return this;
          }
          /**
           *
           * Parse timing function string
           *
           * @ignore
           * @example
           * 'cubic-bezier(.0,1.0,.34,.1)'
           * 'ease-in-out'
           */
          ;

          _proto10.parseCubicBezier = function parseCubicBezier(cubicbezier) {
            var i;
            var points = null;

            if ($J.typeOf(cubicbezier) !== 'string') {
              return null;
            }

            switch (cubicbezier) {
              // Standard
              case 'linear':
                points = $([0.000, 0.000, 1.000, 1.000]);
                break;

              case 'ease':
                points = $([0.250, 0.100, 0.250, 1.000]);
                break;

              case 'ease-in':
                points = $([0.420, 0.000, 1.000, 1.000]);
                break;

              case 'ease-out':
                points = $([0.000, 0.000, 0.580, 1.000]);
                break;

              case 'ease-in-out':
                points = $([0.420, 0.000, 0.580, 1.000]);
                break;
              // Sine
              // case 'easeInSine':
              //     points = $([0.470, 0.000, 0.745, 0.715]);
              //     break;
              // case 'easeOutSine':
              //     points = $([0.39, 0.575, 0.565, 1.000]);
              //     break;
              // case 'easeInOutSine':
              //     points = $([0.445, 0.050, 0.550, 0.950]);
              //     break;
              // Quad
              // case 'easeInQuad':
              //     points = $([0.550, 0.085, 0.680, 0.530]);
              //     break;
              // case 'easeOutQuad':
              //     points = $([0.250, 0.460, 0.450, 0.940]);
              //     break;
              // case 'easeInOutQuad':
              //     points = $([0.455, 0.030, 0.515, 0.955]);
              //     break;
              // Cubic
              // case 'easeInCubic':
              //     points = $([0.550, 0.055, 0.675, 0.190]);
              //     break;
              // case 'easeOutCubic':
              //     points = $([0.215, 0.610, 0.355, 1.000]);
              //     break;
              // case 'easeInOutCubic':
              //     points = $([0.645, 0.045, 0.355, 1.000]);
              //     break;
              // Quart
              // case 'easeInQuart':
              //     points = $([0.895, 0.030, 0.685, 0.220]);
              //     break;
              // case 'easeOutQuart':
              //     points = $([0.165, 0.840, 0.440, 1.000]);
              //     break;
              // case 'easeInOutQuart':
              //     points = $([0.770, 0.000, 0.175, 1.000]);
              //     break;
              // Quint
              // case 'easeInQuint':
              //     points = $([0.755, 0.050, 0.855, 0.060]);
              //     break;
              // case 'easeOutQuint':
              //     points = $([0.230, 1.000, 0.320, 1.000]);
              //     break;
              // case 'easeInOutQuint':
              //     points = $([0.860, 0.000, 0.070, 1.000]);
              //     break;
              // Expo
              // case 'easeInExpo':
              //     points = $([0.950, 0.050, 0.795, 0.035]);
              //     break;
              // case 'easeOutExpo':
              //     points = $([0.190, 1.000, 0.220, 1.000]);
              //     break;
              // case 'easeInOutExpo':
              //     points = $([1.000, 0.000, 0.000, 1.000]);
              //     break;
              // Circ
              // case 'easeInCirc':
              //     points = $([0.600, 0.040, 0.980, 0.335]);
              //     break;
              // case 'easeOutCirc':
              //     points = $([0.075, 0.820, 0.165, 1.000]);
              //     break;
              // case 'easeInOutCirc':
              //     points = $([0.785, 0.135, 0.150, 0.860]);
              //     break;
              // Back
              // case 'easeInBack':
              //     points = $([0.600, -0.280, 0.735, 0.045]);
              //     break;
              // case 'easeOutBack':
              //     points = $([0.175, 0.885, 0.320, 1.275]);
              //     break;
              // case 'easeInOutBack':
              //     points = $([0.680, -0.550, 0.265, 1.550]);
              //     break;

              default:
                cubicbezier = cubicbezier.replace(/\s/g, '');

                if (cubicbezier.match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
                  points = cubicbezier.replace(/^cubic-bezier\s*\(|\)$/g, '').split(',');

                  for (i = points.length - 1; i >= 0; i--) {
                    points[i] = parseFloat(points[i]);
                  }
                }

            }

            return $(points);
          } // From: http://www.netzgesta.de/dev/cubic-bezier-timing-function.html
          // 1:1 conversion to js from webkit source files
          // UnitBezier.h, WebCore_animation_AnimationBase.cpp
          ;

          FX.cubicBezierAtTime = function cubicBezierAtTime(t, duration, cubicBezier) {
            var ax = 0;
            var bx = 0;
            var cx = 0;
            var ay = 0;
            var by = 0;
            var cy = 0; // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.

            var sampleCurveX = function (t) {
              return ((ax * t + bx) * t + cx) * t;
            };

            var sampleCurveY = function (t) {
              return ((ay * t + by) * t + cy) * t;
            };

            var sampleCurveDerivativeX = function (t) {
              return (3.0 * ax * t + 2.0 * bx) * t + cx;
            }; // The epsilon value to pass given that the animation is going to run over |dur| seconds. The longer the
            // animation, the more precision is needed in the timing function result to avoid ugly discontinuities.


            var solveEpsilon = function (duration) {
              return 1.0 / (200.0 * duration);
            }; // const solve = (x, epsilon) => {
            //     return sampleCurveY(solveCurveX(x, epsilon));
            // };
            // Given an x value, find a parametric value it came from.


            var solveCurveX = function (x, epsilon) {
              var t0;
              var t1;
              var t2;
              var x2;
              var d2;
              var i;

              var fabs = function (n) {
                if (n >= 0) {
                  return n;
                }

                return 0 - n;
              }; // First try a few iterations of Newton's method -- normally very fast.


              for (t2 = x, i = 0; i < 8; i++) {
                x2 = sampleCurveX(t2) - x;

                if (fabs(x2) < epsilon) {
                  return t2;
                }

                d2 = sampleCurveDerivativeX(t2);

                if (fabs(d2) < 1e-6) {
                  break;
                }

                t2 -= x2 / d2;
              } // Fall back to the bisection method for reliability.


              t0 = 0.0;
              t1 = 1.0;
              t2 = x;

              if (t2 < t0) {
                return t0;
              }

              if (t2 > t1) {
                return t1;
              }

              while (t0 < t1) {
                x2 = sampleCurveX(t2);

                if (fabs(x2 - x) < epsilon) {
                  return t2;
                }

                if (x > x2) {
                  t0 = t2;
                } else {
                  t1 = t2;
                }

                t2 = (t1 - t0) * 0.5 + t0;
              }

              return t2; // Failure.
            };

            var solve = function (x, epsilon) {
              return sampleCurveY(solveCurveX(x, epsilon));
            }; // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).


            cx = 3.0 * cubicBezier[0];
            bx = 3.0 * (cubicBezier[2] - cubicBezier[0]) - cx;
            ax = 1.0 - cx - bx;
            cy = 3.0 * cubicBezier[1];
            by = 3.0 * (cubicBezier[3] - cubicBezier[1]) - cy;
            ay = 1.0 - cy - by; // Convert from input time to parametric value in curve, then from that to output time.

            return solve(t, solveEpsilon(duration));
          };

          return FX;
        }();

        $J.FX = FX;
      })(magicJS);
      /*eslint no-throw-literal: "off"*/

      /*eslint quote-props: ["off"]*/

      /* eslint no-restricted-syntax: ["error",  "WithStatement", "BinaryExpression[operator='in']"] */

      /*eslint guard-for-in: "off"*/

      /*eslint no-continue: "off"*/

      /*eslint no-else-return: "off"*/

      /*eslint no-undef: "off"*/

      /*eslint consistent-return: "off"*/

      /* eslint no-unused-vars: ["error", { "args": "none" }] */

      /*eslint no-prototype-builtins: "off"*/

      /*eslint dot-notation: ["off"]*/

      /*eslint-env es6*/


      (function ($J) {
        if (!$J) {
          throw 'MagicJS not found';
        }

        if ($J.Options) {
          return;
        }

        var $ = $J.$;
        var globalValue = null;
        var dataTypes = {
          'boolean': 1,
          'array': 2,
          'number': 3,
          'function': 4,
          'url': 5,
          'string': 100
        };

        var isAbsoluteUrl = function (v) {
          return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(v);
        };

        var typeValidators = {
          'boolean': function (option, v, strict) {
            if ($J.typeOf(v) !== 'boolean') {
              if (strict || $J.typeOf(v) !== 'string') {
                return false;
              } else if (!/^(true|false)$/.test(v)) {
                return false;
              } else {
                v = !v.replace(/true/i, '').trim();
              }
            }

            if (option.hasOwnProperty('enum') && !$J.contains(option['enum'], v)) {
              return false;
            }

            globalValue = v;
            return true;
          },
          'url': function (option, v, strict) {
            var result = false;

            if ($J.typeOf(v) === 'string' && isAbsoluteUrl(v)) {
              if (option.hasOwnProperty('enum')) {
                if ($J.contains(option['enum'], v)) {
                  result = true;
                }
              } else {
                result = true;
              }
            }

            return result;
          },
          'string': function (option, v, strict) {
            if ($J.typeOf(v) !== 'string') {
              return false;
            } else if (option.hasOwnProperty('enum') && !$J.contains(option['enum'], v)) {
              return false;
            } else {
              globalValue = '' + v;
              return true;
            }
          },
          'number': function (option, v, strict) {
            var r = /%$/;
            var percent = $J.typeOf(v) === 'string' && r.test(v); // if (strict && typeof(v) !== 'number') {

            if (strict && !'number' === typeof v) {
              // eslint-disable-line valid-typeof
              return false;
            }

            v = parseFloat(v);

            if (isNaN(v)) {
              return false;
            }

            if (isNaN(option.minimum)) {
              option.minimum = Number.NEGATIVE_INFINITY;
            }

            if (isNaN(option.maximum)) {
              option.maximum = Number.POSITIVE_INFINITY;
            }

            if (option.hasOwnProperty('enum') && !$J.contains(option['enum'], v)) {
              return false;
            }

            if (option.minimum > v || v > option.maximum) {
              return false;
            }

            globalValue = percent ? v + '%' : v;
            return true;
          },
          'array': function (option, v, strict) {
            if ($J.typeOf(v) === 'string') {
              try {
                v = v.replace(/'/g, '"');
                v = $J.W.node.JSON.parse(v);
              } catch (ex) {
                return false;
              }
            }

            if ($J.typeOf(v) === 'array') {
              globalValue = v;
              return true;
            } else {
              return false;
            }
          },
          'function': function (option, v, strict) {
            if ($J.typeOf(v) === 'function') {
              globalValue = v;
              return true;
            }

            return false;
          }
        };
        /**
         * Validate parameter value
         * @param  {object} param  parameter definition
         * @param  {mixed} value  [description]
         * @param  {boolean} strict Should stict validation be applied
         * @return {boolean}        [description]
         */

        var validateParamValue = function (param, value, strict) {
          var opts = param.hasOwnProperty('oneOf') ? param.oneOf : [param];

          if ($J.typeOf(opts) !== 'array') {
            return false;
          }

          for (var i = 0, l = opts.length - 1; i <= l; i++) {
            if (typeValidators[opts[i].type](opts[i], value, strict)) {
              return true;
            }
          }

          return false;
        };
        /**
         * Normalize schema parameter definition
         * @param  {object} param parameter defition
         * @return {object} normalized parameter definition
         */


        var normalizeParam = function (param) {
          var i;
          var j;
          var oneOf; // eslint-disable-line no-unused-vars

          var l;
          var temp;

          if (param.hasOwnProperty('oneOf')) {
            l = param.oneOf.length;

            for (i = 0; i < l; i++) {
              for (j = i + 1; j < l; j++) {
                if (dataTypes[param.oneOf[i]['type']] > dataTypes[param.oneOf[j].type]) {
                  temp = param.oneOf[i];
                  param.oneOf[i] = param.oneOf[j];
                  param.oneOf[j] = temp;
                }
              }
            }
          }

          return param;
        };
        /**
         * Validate parameter definition
         * @param  {object} param parameter definition
         * @return {boolean}     [description]
         */


        var validateSchemaParam = function (param) {
          // validate types
          var opts = param.hasOwnProperty('oneOf') ? param.oneOf : [param];

          if ($J.typeOf(opts) !== 'array') {
            return false;
          }

          for (var i = opts.length - 1; i >= 0; i--) {
            if (!opts[i].type || !dataTypes.hasOwnProperty(opts[i].type)) {
              return false;
            } // validate enum option if present


            if ($J.defined(opts[i]['enum'])) {
              if ($J.typeOf(opts[i]['enum']) !== 'array') {
                return false;
              }

              for (var j = opts[i]['enum'].length - 1; j >= 0; j--) {
                if (!typeValidators[opts[i].type]({
                  'type': opts[i].type
                }, opts[i]['enum'][j], true)) {
                  return false;
                }
              }
            }
          } // validate default value


          if (param.hasOwnProperty('defaults') && !validateParamValue(param, param['defaults'], true)) {
            return false;
          }

          return true;
        };

        var isDefaults = function (obj) {
          var i;
          var result = false;

          for (i in obj) {
            if (i === 'defaults') {
              result = true;
              break;
            }
          }

          return result;
        };

        var parseObj = function (obj) {
          var result = {};

          var parseVars = function (map, pathTo) {
            var prop;

            var _pathTo;

            for (prop in map) {
              _pathTo = pathTo.slice(0);

              if ($J.typeOf(map[prop]) !== 'object' || isDefaults(map[prop])) {
                _pathTo.push(prop);

                result[_pathTo.join('.')] = map[prop];
              } else {
                _pathTo.push(prop);

                parseVars(map[prop], _pathTo);
              }
            }
          };

          parseVars(obj, []);
          return result;
        };

        var convertToDeepObj = function (obj) {
          var key;
          var result = {};

          var setObjValue = function (arr, value) {
            var tmp = result;
            var l = arr.length;

            if (arr[l - 1].trim() === '') {
              arr.splice(l - 1, 1);
            }

            arr.forEach(function (v, index) {
              if (index === l - 1) {
                tmp[v] = value;
              } else {
                if (!tmp[v]) {
                  tmp[v] = {};
                }

                tmp = tmp[v];
              }
            });
          };

          for (key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              setObjValue(key.split('.'), obj[key]);
            }
          }

          return result;
        };

        var normalizeString = function (str) {
          return $J.camelize((str + '').trim());
        };

        var Options = /*#__PURE__*/function () {
          "use strict";

          function Options(schema) {
            this.schema = {};
            this.options = {};
            this.parseSchema(schema);
          }

          var _proto11 = Options.prototype;

          _proto11.parseSchema = function parseSchema(schema, force) {
            var i;
            var key;
            schema = parseObj(schema);

            for (i in schema) {
              if (!schema.hasOwnProperty(i)) {
                continue;
              }

              key = normalizeString(i);

              if (!this.schema.hasOwnProperty(key) || force) {
                this.schema[key] = normalizeParam(schema[i]);

                if (!validateSchemaParam(this.schema[key])) {
                  throw 'Incorrect definition of the \'' + i + '\' parameter in ' + schema;
                } // Preserve existing option value


                if ($J.defined(this.options[key])) {
                  if (!this.checkValue(key, this.options[key])) {
                    this.options[key] = $J.U;
                  }
                } else {
                  this.options[key] = $J.U;
                }
              }
            }
          };

          _proto11.set = function set(id, value) {
            id = normalizeString(id);

            if ($J.typeOf(value) === 'string') {
              value = value.trim();
            }

            if (this.schema.hasOwnProperty(id)) {
              globalValue = value;

              if (validateParamValue(this.schema[id], value)) {
                this.options[id] = globalValue;
              }

              globalValue = null;
            }
          };

          _proto11.get = function get(id) {
            id = normalizeString(id);

            if (this.schema.hasOwnProperty(id)) {
              return $J.defined(this.options[id]) ? this.options[id] : this.schema[id]['defaults'];
            }
          };

          _proto11.fromJSON = function fromJSON(obj) {
            obj = parseObj(obj);

            for (var i in obj) {
              this.set(i, obj[i]);
            }
          };

          _proto11.getJSON = function getJSON() {
            var json = $J.extend({}, this.options);

            for (var i in json) {
              if (json[i] === $J.U && this.schema[i]['defaults'] !== $J.U) {
                json[i] = this.schema[i]['defaults'];
              }
            }

            return convertToDeepObj(json);
          }
          /**
           * Set options from string
           * @param    str     {String} String with options. Example - "param1:value1;param2:value2;param3:value3; ...."
           * @param    exclude {Object} Object with regexps for options which we want to exclude. Example - { nameOfRegExp1: new RegExp('param2', 'g') }
           * @returns          {Object} Object with options which were excluded. Example - { nameOfRegExp1: 'param2:value2;' }
           */
          ;

          _proto11.fromString = function fromString(str, exclude) {
            var _this24 = this;

            var result = {};

            if (!exclude) {
              exclude = {};
            }

            var check = function (substr) {
              var key;
              var _result = true;
              substr = substr.trim();

              for (key in exclude) {
                if (Object.prototype.hasOwnProperty.call(exclude, key)) {
                  if (exclude[key].test && exclude[key].test(substr)) {
                    if (!result[key]) {
                      result[key] = '';
                    }

                    result[key] += substr + ';';
                    _result = false;
                    break;
                  }
                }
              }

              return _result;
            };

            str.split(';').forEach(function (chunk) {
              if (check(chunk)) {
                chunk = chunk.split(':');

                _this24.set(chunk.shift().trim(), chunk.join(':'));
              }
            });
            return result;
          };

          _proto11.checkValue = function checkValue(id, value) {
            var result = false;
            id = normalizeString(id);

            if ($J.typeOf(value) === 'string') {
              value = value.trim();
            }

            if (this.schema.hasOwnProperty(id)) {
              globalValue = value;

              if (validateParamValue(this.schema[id], value)) {
                result = true;
              }

              globalValue = null;
            }

            return result;
          };

          _proto11.exists = function exists(id) {
            id = normalizeString(id);
            return this.schema.hasOwnProperty(id);
          };

          _proto11.isset = function isset(id) {
            id = normalizeString(id);
            return this.exists(id) && $J.defined(this.options[id]);
          };

          _proto11.remove = function remove(id) {
            id = normalizeString(id);

            if (this.exists(id)) {
              delete this.options[id];
              delete this.schema[id];
            }
          };

          return Options;
        }();

        $J.Options = Options;
      })(magicJS);

      return magicJS;
    });
    Sirv.define('globalVariables', ['bHelpers', 'magicJS'], function (bHelpers, magicJS) {
      var moduleName = 'globalVariables';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* global $J, $ */

      /* eslint-disable no-lonely-if */

      /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "GLOBAL_VARIABLES" }] */

      var smv = 'smv';
      var GLOBAL_VARIABLES = {
        smv: smv,
        CSS_RULES_ID: 'sirv-core-css-reset',
        SIRV_HTTP_PROTOCOL: 'https:',
        SIRV_ASSETS_URL: '',
        SIRV_BASE_URL: '',
        CSS_CURSOR_ZOOM_IN: smv + '-cursor-zoom-in',
        CSS_CURSOR_FULSCREEN_ALWAYS: smv + '-cursor-fullscreen-always',
        // eslint-disable-next-line
        REG_URL_QUERY_STRING: /([^\?]+)\??([^\?]+)?/,
        FULLSCREEN_VIEWERS_IDs_ARRAY: [],
        CUSTOM_DEPENDENCIES: null,
        MIN_RATIO: 1.2,

        /**
         * slideShownBy
         * 0 - state of hiden slide
         * 1 - slider wants the slide
         * 2 - custumer wants the slide
         * 3 - first slide
         * 4 - disable or enable slide
         */
        SLIDE_SHOWN_BY: {
          NONE: 0,
          AUTOPLAY: 1,
          USER: 2,
          INIT: 3,
          ENABLE: 4
        },
        VIDEO: {
          NONE: 0,
          PLAY: 1,
          PAUSE: 2,
          PLAYING: 3
        },
        FULLSCREEN: {
          CLOSED: 0,
          OPENING: 1,
          OPENED: 2,
          CLOSING: 3
        },
        APPEARANCE: {
          HIDDEN: 0,
          SHOWING: 1,
          SHOWN: 2,
          HIDING: 3
        },
        SLIDE: {
          TYPES: {
            NONE: 0,
            HTML: 1,
            IMAGE: 2,
            PANZOOM: 3,
            ZOOM: 4,
            SPIN: 5,
            VIDEO: 6
          },
          NAMES: ['none', 'html', 'image', 'panzoom', 'zoom', 'spin', 'video']
        }
      };
      return GLOBAL_VARIABLES;
    });
    Sirv.define('globalFunctions', ['bHelpers', 'magicJS', 'globalVariables', 'helper', 'Promise!'], function (bHelpers, magicJS, globalVariables, helper, Promise) {
      var moduleName = 'globalFunctions';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* global $ */

      /* global $J */

      /* global globalVariables */

      /* global helper */

      /* eslint-disable no-restricted-syntax */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      /* eslint-disable no-unused-vars */
      // const SIRV_CSS = {
      //     src: 'viewer.css',
      //     state: -1
      // };

      var adjustURLProto = function (url) {
        var result = url.replace(/^(https?:)?/, 'https:');

        if (/^(http(s)?:)?\/\/[^/]+?sirv\.localhost(:\d+)?\/.*$/i.test(url)) {
          // dev env on localhost
          result = url.replace(/^(https?:)?/, 'http:');
        }

        return result;
      };

      var sanitizeURLComponent = function (str) {
        try {
          str = decodeURIComponent(str);
        } catch (ex) {
          /* empty */
        }

        return encodeURIComponent(str);
      };

      var sanitizeURL = function (url) {
        return url.replace(/^((?:https?:)?\/\/)([^/].*)/, function (match, proto, uri) {
          return proto + uri.split('/').map(function (str, index) {
            if (index === 0) {
              return str;
            }

            return sanitizeURLComponent(str);
          }).join('/');
        });
      };

      var RootDOM = /*#__PURE__*/function () {
        "use strict";

        function RootDOM() {
          this.CSSMap = {};
          this.sirvNodesMap = new WeakMap();
          this.rootNodesMap = new Map();
          this.rootNodes = []; // ie11 does not support this.rootNodesCollection.keys()

          this.sirvCSSSrc = 'viewer.css';
          this.mainCSSID = 'sirv-stylesheet-sirv';
        }

        RootDOM.getShadowDOM = function getShadowDOM(node
        /* Element which has 'Sirv' class name */
        ) {
          node = $(node).node;
          var result = false;
          var parent = node.parentNode;

          if (parent && window.ShadowRoot) {
            if (parent instanceof window.ShadowRoot) {
              result = parent;
            } else {
              result = RootDOM.getShadowDOM(parent);
            }
          }

          return result;
        };

        var _proto12 = RootDOM.prototype;

        _proto12.rootContains = function rootContains(node) {
          return this.rootNodes.some(function (root) {
            if (root === $J.D.node) {
              root = $J.D.node.body;
            }

            if (root) {
              return root.contains(node);
            }

            return false;
          });
        };

        _proto12.addModuleCSSByName = function addModuleCSSByName(moduleName, functionOfCssString, id, position) {
          if (!this.CSSMap[moduleName]) {
            this.CSSMap[moduleName] = {
              functionOfCssString: functionOfCssString,
              id: id,
              position: position
            };
          }
        };

        _proto12.getRootNode = function getRootNode(node
        /* Element which has 'Sirv' class name */
        ) {
          node = $(node).node;
          var shadowDOM = RootDOM.getShadowDOM(node);
          var rootNode = shadowDOM || $J.D.node;

          if (!this.rootNodesMap.has(rootNode)) {
            this.rootNodesMap.set(rootNode, {
              isResetCSSAdded: false,
              isVideoCSSAdded: false,
              isSirvAdAdded: false,
              styles: {},
              modulesCss: {},
              isShadowDOM: !!shadowDOM
            });
            this.rootNodes.push(rootNode);
          }

          return rootNode;
        }
        /*
            Attach node to root node
        */
        ;

        _proto12.attachNode = function attachNode(node
        /* Element which has 'Sirv' class name */
        ) {
          node = $(node).node;

          if (!this.sirvNodesMap.has(node)) {
            var rootNode = this.getRootNode(node);
            this.sirvNodesMap.set(node, rootNode);
          }
        }
        /*
            Detach node from root node
        */
        ;

        _proto12.detachNode = function detachNode(node
        /* Element which has 'Sirv' class name */
        ) {
          node = $(node).node;
          return this.sirvNodesMap.delete(node);
        };

        _proto12.addCSSStringToHtml = function addCSSStringToHtml() {
          this.addCSSString($J.D.node.head || $J.D.node.body);
        };

        _proto12.addCSSString = function addCSSString(node
        /* Element which has 'Sirv' class name */
        ) {
          var _this25 = this;

          if (!node) {
            node = $J.D.node.head || $J.D.node.body;
          }

          node = $(node).node;
          var root = this.sirvNodesMap.get(node);
          var rootObject = this.rootNodesMap.get(root);
          var shadowRoot = null;

          if (rootObject.isShadowDOM) {
            shadowRoot = root;
          }

          helper.objEach(this.CSSMap, function (key, value) {
            if (!rootObject.modulesCss[key]) {
              rootObject.modulesCss[key] = 1;
              helper.addCss(value.functionOfCssString(), value.id, value.position, shadowRoot, '#' + _this25.mainCSSID);
            }
          });
        };

        _proto12.addMainStyleToHtml = function addMainStyleToHtml() {
          this.resetGlobalCSS($J.D.node.head || $J.D.node.body);
          this.addStyle($J.D.node.head || $J.D.node.body, globalVariables.SIRV_ASSETS_URL + this.sirvCSSSrc, this.mainCSSID, '#' + globalVariables.CSS_RULES_ID);
        };

        _proto12.addMainStyle = function addMainStyle(node
        /* Element which has 'Sirv' class name */
        ) {
          this.addMainStyleToHtml();
          this.resetGlobalCSS(node);
          return this.addStyle(node, globalVariables.SIRV_ASSETS_URL + this.sirvCSSSrc, this.mainCSSID, '#' + globalVariables.CSS_RULES_ID);
        };

        _proto12.addStyle = function addStyle(node
        /* Element which has 'Sirv' class name */
        , url, id, querySelector) {
          node = $(node).node;
          var root = this.sirvNodesMap.get(node);
          var rootObject = this.rootNodesMap.get(root);

          if (!rootObject.styles[id]) {
            rootObject.styles[id] = new Promise(function (resolve, reject) {
              var _shadowRoot = null;

              if (rootObject.isShadowDOM) {
                _shadowRoot = root;
              }

              helper.loadStylesheet(url, id, _shadowRoot, querySelector).then(resolve).catch(reject);
            });
          }

          return rootObject.styles[id];
        };

        _proto12.resetGlobalCSS = function resetGlobalCSS(node
        /* Element which has 'Sirv' class name */
        ) {
          if (!node) {
            node = $J.D.node.head || $J.D.node.body;
          }

          node = $(node).node;
          var root = this.sirvNodesMap.get(node);
          var rootObject = this.rootNodesMap.get(root);

          if (rootObject.isResetCSSAdded) {
            return;
          }

          rootObject.isResetCSSAdded = true;
          var shadowRoot = null;

          if (rootObject.isShadowDOM) {
            shadowRoot = root;
          }

          $J.addCSS('.smv', {
            display: 'flex !important'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('.smv.smv-selectors-top', {
            'flex-direction': 'column-reverse'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('.smv.smv-selectors-left', {
            'flex-direction': 'row-reverse'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('.smv.smv-selectors-right', {
            'flex-direction': 'row'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('.smv.smv-selectors-bottom', {
            'flex-direction': 'column'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('.smv-slides-box', {
            'flex-grow': 1,
            'flex-shrink': 1
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('figure > .Sirv', {
            'vertical-align': 'top'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('.Sirv > iframe, .Sirv > video', {
            'display': 'none'
          }, globalVariables.CSS_RULES_ID, shadowRoot); // Hide custom thumbnail content until the viewer initialized.

          $J.addCSS(':not(.smv) smv-thumbnail', {
            'display': 'none'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('.Sirv, .Sirv .smv-component', {
            '-webkit-box-sizing': 'border-box !important',
            '-moz-box-sizing': 'border-box !important',
            'box-sizing': 'border-box !important'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('div.Sirv, div.Sirv div.smv-component, figure.Sirv, div.smv-component', {
            width: '100%',
            height: '100%',
            margin: 0,
            'text-align': 'center'
          }, globalVariables.CSS_RULES_ID, shadowRoot); // It was added in 'fix video empty height' commit
          // I do not know why I added it, but it break Sirv if block where Sirv is has height. See test/zoom-test.html
          // $J.addCSS('div.Sirv', {
          //     'block-size': 'auto'
          // }, globalVariables.CSS_RULES_ID, shadowRoot);

          $J.addCSS('div.Sirv', {
            'max-height': '100%',
            'block-size': 'inherit'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('.Sirv img', {
            'width': '100%',
            'height': '100%'
          }, globalVariables.CSS_RULES_ID, shadowRoot); // ResponsiveImage

          $J.addCSS('img.Sirv, .Sirv img', {
            'max-width': '100%'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('img.Sirv:not([width]):not([height])', {
            'width': '100%'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('img.Sirv', {
            'display': 'inline-block',
            'font-size': 0,
            'line-height': 0
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('.Sirv.smv-bg-image.smv-bg-contain, .Sirv.smv-bg-image.smv-bg-cover', {
            'background-repeat': 'no-repeat',
            'background-position': 'center'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('.Sirv.smv-bg-image.smv-bg-contain', {
            'background-size': 'contain'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('.Sirv.smv-bg-image.smv-bg-cover', {
            'background-size': 'cover'
          }, globalVariables.CSS_RULES_ID, shadowRoot); // $J.addCSS('img.Sirv[width], .Sirv img[width], img.Sirv[height], .Sirv img[height]', {
          //     'max-width': 'none'
          // }, globalVariables.CSS_RULES_ID, shadowRoot);

          $J.addCSS('img.Sirv:not([src]), img.Sirv.sirv-image-loading:not([src])', {
            'opacity': '0' // 'transition': 'opacity 0.5s linear'

          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('img.Sirv.sirv-image-loaded', {
            'opacity': '1',
            'transition': 'opacity 0.5s linear'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
        };

        _proto12.showSirvAd = function showSirvAd(node
        /* Element which has 'Sirv' class name */
        , targetNode, landing, desc) {
          if (/^my.sirv.(com|localhost)$/i.test($J.D.node.location.hostname)) {
            // do not show Ad inside web app
            return;
          }

          if (!node) {
            node = $J.D.node.head || $J.D.node.body;
          }

          node = $(node).node;
          var root = this.sirvNodesMap.get(node);
          var rootObject = this.rootNodesMap.get(root);
          var shadowRoot = null;

          if (rootObject.isShadowDOM) {
            shadowRoot = root;
          }

          var crId = 'sirvCR' + Math.floor(Math.random() * $J.now());
          var BRAND_LOGO = {
            width: 90,
            height: 18,
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAAkCAYAAAAgqxBxAAAMJ0lEQVR4nO1ce5AUxRnv4yH4wCfREogIqFHOI94uVoSNMnFvZ6e/30+TGB/BRFPRUomWRiMKd2tUTKEWKlGSCBKCxtJSSKkxKLhnKqaiJvgOYjSAAhdQ8EDkIYgm8fLH9hzNZGZn9+68o8r5VU3V7fbXX389+5vu79FzSiVIkCBBggQJegiu6w4DMIlkkeRKklsBbCG5EsAzJKeJyCnldDiOs5/neaO6y+YECUJBciaAz0i2xV0AFmut+wV1iMhoAK1GZqnjOAN7Yi4JvsDQWu9PckkIaTcBWAbgHZI7Am1vKqV6BXUBWBzQ87MemFKCLzJIvhIg671a63Gu6+7ryziOMxBAA4DpADYDuDRC14qArl9130wSfOEhIpcFCPjduD75fP5gx3H2C2sDcJal62MAx3W91QkShKMGwDqL0DO7QimAsQAubGhoOKIr9CVIUBHy+XxtYHUe3tM2JUjQYWitT7PI/EFP25MgQadA8kxrhd7mOE6fnrYpk8kMEJHRnud9padtSRADkm0NDQ0HRLU3NDQcAWBzd9njed7XbZdDa31SZ3WKSB2AR80133GcA+1213W/bLXf5H+fzWYPATAHwAdmx1jjt+Xz+YMBPALgIZIPxxV2gkhNLp6TamqeV18oPlxfKM7p7BwTGOxphM5kMgNI/tdyO57urE7bjTHXYLsdwHFW2/umz5BAcNoGYIvfx3GcPradJP9cjU2pQnFdqtDclio0t9UXis93do4JDPY0QiulFIB7AkS6Kb5XNLTWp1r6Pslms4fZ7SQHW+RcaL5bGXgI/gNgmVKqxu8nIj+xZTKZzIBK7Plq45PH+GROFZrbUpOL6c7ML4GFPZHQjuMcCODfAUI9lsvlBnVEXxyhXdc9lOQnfgGHZKP1MP0GwNhcLjcon88frqxKZD6fPzzgHp1TiT31heYpu1bn5tWVTqKfiAw1N6EmTh7AQQCGl/txuwqmwjU87NxBEFrrfp7nHWl+hOA8anK53CARGVpB8FRDcrCIDLXHrZbQ/n0123bsfe0oAJwccl5jB8lpWush1eiKI3Q2mz3EKqOvB7DTkPkHFdj5nKV7QSX2pJqKS9tX56ZiIcrokQCeBnAQybnGsKUAVgFYJyITwvp5npcl+aI5vLKE5EZzyCVjGV0AMCOsP8lbSD4c0fZrABf6n0UkZ8ZoIfmqGWt2Op3ex+4H4HXHcfqIyDUkN5JcYUq7x1kyFwNYTfKfJJcAaAXQpEJIJiJXkHwXwCqSb5B8n+TMdDq9D4CdlRDacZz9ANxN8n1zX1cDeE9ErvLHBPAQgO9H6TIrWktwvlEwxZDWEGJ/AuC+Sit+cYQ2nNkecHNmVaKb5EVWn521tbV7lZOvb1w40nY3aictCC/0iEgdyQ0A/iIil6TT6b5W2wkkV4jINYE+3zE/rqhdROhtSqUbtNauUu2Rd0vIsDWGVOtDyq41ANb5qR6t9bcArNFaj/MFMpnMAADzADxlja9ItgC4EsDvABwUHBTATwG8TPJo/zsTxLwAYGpAdgrJN0Skzv/OcZz+ACaSXEByaxyhzcOwSEQm2DuByR68TvIW8/lsAM9E6SJ5LYD7otrDYDINs0JI7V932b91GCohNICPLJntjuP0r9S+atyOVFOx0O5uNBWfixQ0hG4jeWNYu+d5o0hu9yeTTqf3IblRa31qmDzJMwGsMU9cbwCbXdc91pbRWmdIPgtgnoicbbcBON5/CMzq1gpgbHAcQ67V/sNjxm4B8HrY0661HklyY/BHMfdgKMkdxtdTnucdSXK71npE2ByNvxjrcvjEidAxnOQO13WH1dbW7kVyg+u6wyJk3wRwctRY5SAiJwCYjdI56OAJvGX5fL42qm+1hAYwrxrbAPze6ju/nGyqqfiWRegLyk24zvw4kbV6AM8DuMDIjwfwUoyhy0WE5u/5InJFYMw7jVtwUdDtMCvsHCN3HoDIpxHA7SR/6X82hL48Yp53AvhFGV3NvptjVuHHomSNu1URoT3PO7HMmE8AmGj+niEiNwRltNYnAViuOul3mxXxRpJbg25I1IPbAUJfXY1NZqdvLwZFxUappkWjdvnOzZ8edfnC6BjKbH8flRsYwAwA083f0wH8PEZ+Ns3ZWQAXAHjCau4FYC3Jo3O53CAAmwPB1gKYU2IA7gFwa9Q4JC8ybof/uSWqoADghXLbGoC7ReRm8/dDACZFyWaz2cMqJXS5ABbAFN+V0FrXk1ypAsQFMEtEJkfpqBau6x4K4NHASr1GKdU7KNsBQp9RjS2O4/Qnuc3vLyLfDJOzsxuppubyu4Ah9JoYmetI3q+UUiQfjLvBAG4CMFsppXK53CD76UMpCn/Fkn1Oa32aUkql0+m+JpAaaNoeB/ABgHfCLuPHP+vrItli+7wBm9YanzZK14cA7jZ6/ogykbopDlSS5fi43H0yxz3bI3yWAl7H/zxmzJi9WQpuB4cq6AQAzAmQ+sqgTLWE1lrrDtjxgEXo34bJpArFt31CnzB5kVNWoSF0a8yg15Oc6xuAUlagnPxUWIfBAfwdwDfM3zNINlrjX+Xr1lpnALxs9XtcRK4xNy70spPyMYReo7V2y+nyswgA/kTy/Kj5pdPpvhUSeme5+0Tyx7ZrA+ByAPda92Z8YHfrUgBYbhH67WB7tYT23cxqICJeIKjcLY1a11g81vKdy/LUV1gH4NNy+VgAs/3tWERu9lffKARXcZZSdD9TpZzuu7SyDCYgW6+U6iUik20XA6Uo/ZbYSewapxyhXwBwViV6AMwjeW1Uu18YqMTlKJdqA3Cbvyso1e7nbrQerCeq3carQcgLAbsdOe0OQiulFMkPfR2e52XttlSheJuVe55WyaTqSLbl8/lUmQFXWEFeA4BVKuQdNKXat+P1dj5aRE4h+azWuh7AayH6X/Q870SSf7AnJCLjSb4aO4ldeiIJTXKaH2zGwQSskUEhAFThQ4+LkgHwkoicF/huvoic6zjOQJLvxuVnOwOTlrVTZ67d3l2ENjFXqNtR3/TUivYVunHhyEomVYfS28FzI9rPBbDayln2YqkgEfoeGoBJxm1oD27MFr3e+OKNwT4s5VmvN25BexA1ZsyYvY3v+73YiajyhNZajzC+fH2cHq31EJJbtdahNxDAkwA+q4TQiEhHkRSSG4N5eK21NoHxpSTviLO1MzDpSTvjIQFbuoXQIvI1a5wdjqPavYX6QnGOIXRlC5sh9FIAj5C8S0SOUUrVmGN+l7JUKBkX7GMIeoPrusPS6XTffD5/FIBbAaxFSCUKpWLHWtvd8GH6rgWwKNhm/OpWAFO01iMcx+njOE5/z/NGAZgoIqN92XKENnb/EECriEwwgVZNJpMZYFJjU13XPdSSnQBgDYAzDOl6marqAyYF+I8KfOjnSc4FMMcUino1NDQcgFLmp9UPhgPobYLUJQCOj9LfFRCR0Tahg7t0dxHa6HrP13O6m835348qPHNSqtDclmpsjnQBg5OqA7DKlIyvMpH2BgDvoVT4iFrxhgCYhVIpd5MJMO7yixNBkPw2ylS7ANwXtRKb1W4mgOVmrLUk/yoi12mtv2SN8WBUccIaJ43SWdwWAJtYKqcXReSyYIoNQN6sxuvMQ7UYpkRtHoB9w0cppcdMhbWGpfTiYuu+PgIg8qQYgNsBLC43j64AgIJF2K3BymE3E/rWMLfjsInFfeubiu+OaipW9nCb1TasPJ2ghwDgSRG55PMcw8Q6G6yA8N6gTHcS2vbnAWyy21JNi0aps+b/X548SlFC6D0IxlXZorXev5p+psQ93XabomCyKX8LuBtHBeW6k9BG37JdAaoberQiFgmh9yyQvCMuLRoGa8veZty38wEcr7XeX2vdz8REYwFMZalYY6frQkvW3U1olkrzJZt4etX3QCmVEHpPgO+7m8LP5rDAOQ4mHgg7VbeVpYrq9rB2BE4ZBuw61ZL7NO74aGcJ7bruMGu8dR1SkhC654HSwagtJP8F4PSO6NBanwbg6QhSh12vRGRZdtMZ6LNbCd7kytssQo/viO02ALy5y+1gWfui0Ls73jZJEIvKgp4YaK1HAPgRyftReivkDZJvAXgNwFMicnOlb1obf34igKsBXBmsejqO019ErjAyE9EF/9wGwMVmV9nGzzkPnyBBggQJugP/A94x91x//ZrKAAAAAElFTkSuQmCC'
          };
          $J.addCSS('#' + crId, {
            display: 'inline-block !important;',
            visibility: 'visible !important;',
            'z-index': '2147483647 !important;',
            width: 'auto !important;',
            height: 'auto !important;',
            'max-width': 'none !important;',
            'max-height': 'none !important;',
            transform: 'none !important;',
            left: 'auto !important;',
            top: 'auto !important;',
            bottom: '8 !important;',
            right: '8 !important;',
            margin: 'auto !important',
            padding: '0 !important',
            opacity: '1 !important;'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          $J.addCSS('#crSirv' + crId + ' > img', {
            display: 'inline-block !important;',
            visibility: 'visible !important;',
            position: 'static !important;',
            width: '90px !important;',
            height: '18px !important;',
            'max-width': 'none !important;',
            'max-height': 'none !important;',
            transform: 'none !important;',
            margin: '0 !important',
            padding: '0 !important'
          }, globalVariables.CSS_RULES_ID, shadowRoot);
          var el = $J.$new('a', {
            id: crId,
            href: landing,
            target: '_blank'
          });
          el.attr('style', 'position: absolute !important; opacity: 1 !important');
          el.setCss({
            display: 'inline-block',
            overflow: 'hidden',
            visibility: 'visible',
            'font-size': 0,
            'font-weight': 'normal',
            'font-family': 'sans-serif',
            bottom: 8,
            right: 8,
            margin: 'auto',
            width: 'auto',
            height: 'auto',
            transform: 'none',
            'z-index': 2147483647
          }).appendTo(targetNode).addEvent('tap btnclick', function (e) {
            e.stopDistribution();
            $J.W.node.open(el.attr('href'));
          }).append($J.$new('img', BRAND_LOGO).setProps({
            alt: desc
          }));
        };

        return RootDOM;
      }();

      var GLOBAL_FUNCTIONS = {
        rootDOM: new RootDOM(),
        viewerFilters: [],
        getNodeWithSirvClassName: function (node) {
          var result = null;

          if (node) {
            node = $(node);

            if (node.hasClass('Sirv')) {
              result = node.node;
            } else {
              result = GLOBAL_FUNCTIONS.getNodeWithSirvClassName(node.node.parentNode);
            }
          }

          return result;
        },
        iconsHash: {
          nodes: [],
          elements: [[{
            classes: ['smv-arrow-control']
          }, {
            classes: ['smv-arrow']
          }, {
            classes: ['smv-icon']
          }], [{
            classes: ['smv-button-fullscreen-open']
          }, {
            classes: ['smv-icon']
          }], [{
            classes: ['smv-button-fullscreen-close']
          }, {
            classes: ['smv-icon']
          }], [{
            classes: ['smv-thumbnails']
          }, {
            classes: ['smv-selector'],
            attrs: [{
              name: 'data-type',
              value: 'spin'
            }]
          }]],
          waitBody: function () {
            return new Promise(function (resolve, reject) {
              var body = document.body;

              if (body) {
                resolve(body);
              } else {
                setTimeout(function () {
                  GLOBAL_FUNCTIONS.iconsHash.waitBody().then(resolve);
                }, 16);
              }
            });
          },
          make: function () {
            GLOBAL_FUNCTIONS.iconsHash.elements.forEach(function (data) {
              var elements = [];
              data.reverse().forEach(function (el) {
                var node = $J.$new('div');

                if (el.classes) {
                  el.classes.forEach(function (className) {
                    node.addClass(className);
                  });
                }

                if (el.attrs) {
                  el.attrs.forEach(function (attr) {
                    node.attr(attr.name, attr.value);
                  });
                }

                elements.push(node);
              });

              for (var i = 1, l = elements.length; i < l; i++) {
                elements[i].append(elements[i - 1]);
              }

              GLOBAL_FUNCTIONS.iconsHash.nodes.push(elements[elements.length - 1]);
            });
            GLOBAL_FUNCTIONS.iconsHash.nodes.forEach(function (el) {
              el.setCss({
                top: '-10000px',
                left: '-10000px',
                width: '10px',
                height: '10px',
                position: 'absolute',
                visibility: 'hodden',
                opacity: 0
              });
              GLOBAL_FUNCTIONS.iconsHash.waitBody().finally(function () {
                $J.$($J.D.node.body).append(el);
              });
            });
          },
          remove: function () {
            if (GLOBAL_FUNCTIONS.iconsHash.nodes.length) {
              GLOBAL_FUNCTIONS.iconsHash.nodes.forEach(function (el) {
                el.remove();
              });
              GLOBAL_FUNCTIONS.iconsHash.nodes = [];
            }
          }
        },
        adjustURL: function (url) {
          if (!/^(http(s)?:)?\/\//.test(url)) {
            url = globalVariables.SIRV_BASE_URL + url;
          }

          return adjustURLProto(url).replace(/([^:])\/+/g, '$1/');
        },
        normalizeURL: function (url) {
          return sanitizeURL(adjustURLProto(url));
        }
      };
      GLOBAL_FUNCTIONS.rootDOM.attachNode($J.D.node.head || $J.D.node.body);
      return GLOBAL_FUNCTIONS;
    });

    var _this = this;

    Sirv.define('helper', ['require', 'bHelpers', 'magicJS', 'globalVariables', 'Promise!'], function (sirvRequire, bHelpers, magicJS, globalVariables, Promise) {
      var moduleName = 'helper';
      var $J = magicJS;
      var $ = $J.$;
      var helper = {};
      /* global $J, helper */

      /* eslint-env es6 */

      var WaitToStart = /*#__PURE__*/function () {
        "use strict";

        function WaitToStart() {
          this.started = false;
          this.callbacks = [];
        }

        var _proto = WaitToStart.prototype;

        _proto.wait = function wait(cb) {
          if (this.started) {
            cb();
          } else {
            this.callbacks.push(cb);
          }
        };

        _proto.start = function start() {
          if (!this.started) {
            this.started = true;
            this.callbacks.forEach(function (cb) {
              return cb();
            });
          }
        };

        _proto.destroy = function destroy() {
          this.callbacks = [];
        };

        return WaitToStart;
      }();

      helper.WaitToStart = WaitToStart;
      /* global $J, helper */

      /* eslint-env es6 */
      // helper.addCss = (css, id, position) => {
      //     if (!position) { position = 'top'; }
      //     const stl = $J.$new('style', { id: (id || 'sirv-module-' + helper.generateUUID()), type: 'text/css' }).appendTo((document.head || document.body), position);
      //     stl.node.innerHTML = css;
      //     return stl;
      // };

      helper.addCss = function (css, id, position, root, selector) {
        var rootNode = document.head || document.body;
        var stl = $J.$new('style', {
          type: 'text/css'
        });
        stl.attr('id', id || 'sirv-module-' + stl.$J_UUID);

        if (!position) {
          position = 'top';
        }

        if (root) {
          rootNode = $(root).node || root;
        }

        var nextSibling;

        if (position === 'top') {
          nextSibling = rootNode.firstChild;
        }

        var addAfter = rootNode.querySelector(selector);

        if (addAfter && addAfter.nextSibling) {
          nextSibling = addAfter.nextSibling;
        }

        rootNode.insertBefore(stl.node, nextSibling);
        stl.node.innerHTML = css;
        return stl;
      };
      /* eslint-env es6 */

      /* global helper */


      helper.cleanQueryString = function (str) {
        str = str.replace(/&+/g, '&');
        str = str.replace(/&$/, '');
        str = str.replace(/\?&/, '?');
        str = str.replace(/profile=&|profile=$/g, '');
        str = str.replace(/image=&/g, 'image&');
        str = str.replace(/image=$/g, 'image');
        return str;
      };
      /* eslint-env es6 */

      /* global helper */


      helper.createReadOnlyProp = function (obj, name, value) {
        Object.defineProperty(obj, name, {
          value: value,
          writable: false
        });
      };
      /* global $J, helper */

      /* eslint-env es6 */
      // Returns if a value is an object


      var isObject = function (value) {
        return value && typeof value === 'object' && value.constructor === Object;
      };
      /**
       * Creates a debounced function that delays invoking `func` until after `wait`
       * milliseconds have elapsed since the last time the debounced function was
       * invoked, or until the next browser frame is drawn. The debounced function
       * comes with a `cancel` method to cancel delayed `func` invocations and a
       * `flush` method to immediately invoke them. Provide `options` to indicate
       * whether `func` should be invoked on the leading and/or trailing edge of the
       * `wait` timeout. The `func` is invoked with the last arguments provided to the
       * debounced function. Subsequent calls to the debounced function return the
       * result of the last `func` invocation.
       *
       * **Note:** If `leading` and `trailing` options are `true`, `func` is
       * invoked on the trailing edge of the timeout only if the debounced function
       * is invoked more than once during the `wait` timeout.
       *
       * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
       * until the next tick, similar to `setTimeout` with a timeout of `0`.
       *
       * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
       * invocation will be deferred until the next frame is drawn (typically about
       * 16ms).
       *
       * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
       * for details over the differences between `debounce` and `throttle`.
       *
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to debounce.
       * @param {number} [wait=0]
       *  The number of milliseconds to delay; if omitted, `requestAnimationFrame` is
       *  used (if available).
       * @param {Object} [options={}] The options object.
       * @param {boolean} [options.leading=false]
       *  Specify invoking on the leading edge of the timeout.
       * @param {number} [options.maxWait]
       *  The maximum time `func` is allowed to be delayed before it's invoked.
       * @param {boolean} [options.trailing=true]
       *  Specify invoking on the trailing edge of the timeout.
       * @returns {Function} Returns the new debounced function.
       * @example
       *
       * // Avoid costly calculations while the window size is in flux.
       * jQuery(window).on('resize', debounce(calculateLayout, 150))
       *
       * // Invoke `sendMail` when clicked, debouncing subsequent calls.
       * jQuery(element).on('click', debounce(sendMail, 300, {
       *   'leading': true,
       *   'trailing': false
       * }))
       *
       * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
       * const debounced = debounce(batchLog, 250, { 'maxWait': 1000 })
       * const source = new EventSource('/stream')
       * jQuery(source).on('message', debounced)
       *
       * // Cancel the trailing debounced invocation.
       * jQuery(window).on('popstate', debounced.cancel)
       *
       * // Check for pending invocations.
       * const status = debounced.pending() ? "Pending..." : "Ready"
       */


      helper.debounce = function (func, wait, options) {
        var lastArgs;
        var lastThis;
        var maxWait;
        var result;
        var timerId;
        var lastCallTime;
        var lastInvokeTime = 0;
        var leading = false;
        var maxing = false;
        var trailing = true; // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
        // const useRAF = (!wait && wait !== 0 && typeof root.requestAnimationFrame === 'function');

        var useRAF = !wait && wait !== 0 && $J.browser.features.requestAnimationFrame;

        if (typeof func !== 'function') {
          throw new TypeError('Expected a function');
        }

        wait = +wait || 0;

        if (isObject(options)) {
          leading = !!options.leading;
          maxing = 'maxWait' in options;
          maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
          trailing = 'trailing' in options ? !!options.trailing : trailing;
        }

        var invokeFunc = function (time) {
          var args = lastArgs;
          var thisArg = lastThis;
          lastArgs = $J.U;
          lastThis = lastArgs;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        };

        var startTimer = function (pendingFunc, _wait) {
          if (useRAF) {
            $J.browser.cancelAnimationFrame(timerId);
            return $J.browser.requestAnimationFrame(pendingFunc);
          }

          return setTimeout(pendingFunc, _wait);
        };

        var cancelTimer = function (id) {
          if (useRAF) {
            $J.browser.cancelAnimationFrame(id);
          } else {
            clearTimeout(id);
          }
        };

        var remainingWait = function (time) {
          var timeSinceLastCall = time - lastCallTime;
          var timeSinceLastInvoke = time - lastInvokeTime;
          var timeWaiting = wait - timeSinceLastCall;
          return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        };

        var shouldInvoke = function (time) {
          var timeSinceLastCall = time - lastCallTime;
          var timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
          // trailing edge, the system time has gone backwards and we're treating
          // it as the trailing edge, or we've hit the `maxWait` limit.

          return lastCallTime === $J.U || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        };

        var trailingEdge = function (time) {
          timerId = $J.U; // Only invoke if we have `lastArgs` which means `func` has been
          // debounced at least once.

          if (trailing && lastArgs) {
            return invokeFunc(time);
          }

          lastArgs = $J.U;
          lastThis = lastArgs;
          return result;
        };

        var timerExpired = function () {
          var time = Date.now();

          if (shouldInvoke(time)) {
            return trailingEdge(time);
          } // Restart the timer.


          timerId = startTimer(timerExpired, remainingWait(time));
          return $J.U;
        };

        var leadingEdge = function (time) {
          // Reset any `maxWait` timer.
          lastInvokeTime = time; // Start the timer for the trailing edge.

          timerId = startTimer(timerExpired, wait); // Invoke the leading edge.

          return leading ? invokeFunc(time) : result;
        };

        var cancel = function () {
          if (timerId !== $J.U) {
            cancelTimer(timerId);
          }

          lastInvokeTime = 0;
          lastArgs = $J.U;
          lastCallTime = lastArgs;
          lastThis = lastArgs;
          timerId = lastArgs;
        };

        var flush = function () {
          return timerId === $J.U ? result : trailingEdge(Date.now());
        };

        var pending = function () {
          return timerId !== $J.U;
        };

        var debounced = function () {
          var time = Date.now();
          var isInvoking = shouldInvoke(time);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          lastArgs = args;
          lastThis = _this;
          lastCallTime = time;

          if (isInvoking) {
            if (timerId === $J.U) {
              return leadingEdge(lastCallTime);
            }

            if (maxing) {
              // Handle invocations in a tight loop.
              timerId = startTimer(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }

          if (timerId === $J.U) {
            timerId = startTimer(timerExpired, wait);
          }

          return result;
        };

        debounced.cancel = cancel;
        debounced.flush = flush;
        debounced.pending = pending;
        return debounced;
      };
      /* global $, $J, helper */

      /* eslint-env es6 */

      /* eslint no-unused-vars: ["error", { "args": "none" }] */


      helper.deepExtend = function () {
        var extend = function (extendingObject, source) {
          var type = $J.typeOf(source);

          if (!$J.defined(extendingObject)) {
            if (type === 'array') {
              extendingObject = [];
            } else {
              extendingObject = {};
            }
          }

          if (type === 'array') {
            source.forEach(function (value, index) {
              var _type = $J.typeOf(value); // if (!$J.contains(extendingObject, value)) {


              if (_type === 'array' && $J.typeOf(extendingObject[index]) === 'array' || _type === 'object' && $J.typeOf(extendingObject[index]) === 'object') {
                extendingObject[index] = extend(extendingObject[index], value);
              } else {
                extendingObject.push(value);
              } // }

            });
          } else {
            helper.objEach(source, function (key, value, index) {
              var _type = $J.typeOf(value);

              if (_type === 'array' || _type === 'object') {
                extendingObject[key] = extend(extendingObject[key], value);
              } else {
                extendingObject[key] = value;
              }
            });
          }

          return extendingObject;
        };

        return function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var result = null;
          args = $J.$A(args);

          if (args.length) {
            result = args.shift();
            args.forEach(function (value) {
              var _type = $J.typeOf(value);

              if (_type === 'array' || _type === 'object') {
                result = extend(result, value);
              }
            });
          }

          return result;
        };
      }();
      /* global $J, helper */

      /* eslint-env es6 */


      helper.fixSize = function (node, size) {
        node = $(node);

        var checkAuto = function (_node, side) {
          return _node.attr(side) === 'auto';
        };

        var correctSizeValue = function (value) {
          if (value <= 4) {
            value = 0;
          }

          return value;
        };

        ['width', 'height'].forEach(function (side) {
          if ($J.browser.ieMode && !node.attr('src')) {
            if (checkAuto(node, side)) {
              size[side] = 0;
            }
          }

          if (size[side] === 0) {
            // check "width" / "height" attribute
            size[side] = helper.imageLib.getPartSize(node, side);
          }

          size[side] = correctSizeValue(size[side]);
        });
        return size;
      };
      /* global $J, helper */

      /* eslint-env es6 */


      helper.generateUUID = function () {
        return parseInt(Math.random() * 10000000, 10);
      };
      /* global helper */

      /* eslint-env es6 */


      helper.getArrayIndex = function (index, length) {
        index %= length;

        if (index < 0) {
          index += length;
        }

        return index;
      };
      /* global $J, helper */

      /* eslint-env es6 */


      helper.getDPPX = function (value, maxValue, upscale) {
        var result = maxValue / value;
        var count = 100;

        if (result >= $J.DPPX || upscale) {
          result = $J.DPPX;
        } else {
          result *= count;
          result = Math.ceil(result) / count;
        }

        return result;
      };
      /* global helper */

      /* global $ */

      /* eslint-env es6 */


      helper.getMatrix = function (node) {
        var result = null;
        var is3D;
        var matrix = $(node).getCss('transform') + '';

        var getNumber = function (str) {
          return parseFloat(str.trim());
        };

        var getTrObj = function (arrIndexes, arr) {
          var _result = {};
          var axises = ['x', 'y', 'z'];
          arrIndexes.forEach(function (v, i) {
            _result[axises[i]] = getNumber(arr[v]);
          });
          return _result;
        };

        if (matrix !== 'none') {
          result = {};
          matrix = matrix.split('(')[1];
          matrix = matrix.split(')')[0];
          matrix = matrix.split(',');
          is3D = matrix.length > 6;
          result.transform = getTrObj(is3D ? [12, 13, 14] : [4, 5], matrix);
          result.scale = getTrObj(is3D ? [0, 5, 10] : [0, 3], matrix);
        }

        return result;
      };
      /* global $J, helper, Promise */

      /* eslint no-throw-literal: "off" */

      /* eslint-env es6 */


      helper.getRemoteData = function () {
        var __XMLHttpRequest = function (url) {
          return new Promise(function (resolve, reject) {
            var xhr = null;

            if ($J.browser.features.xhr2) {
              xhr = new XMLHttpRequest();
            } else if (window.XDomainRequest) {
              xhr = new XDomainRequest();
            }

            if (xhr) {
              xhr.onerror = function (e) {
                reject(e || true);
              };

              xhr.onload = function (e) {
                try {
                  if (xhr.status === 200) {
                    var value = JSON.parse(xhr.responseText);
                    resolve(value);
                  } else {
                    throw {
                      status: xhr.status,
                      data: e
                    };
                  }
                } catch (_err) {
                  reject(_err);
                }
              };

              xhr.open('GET', url);

              if (undefined !== xhr.responseType) {
                xhr.responseType = 'text';
              }

              xhr.send(null);
            } else {
              reject(true);
            }
          });
        };

        var getByFetch = function (url, referrerPolicy) {
          return fetch(url, {
            referrerPolicy: referrerPolicy || 'no-referrer-when-downgrade'
          }).then(function (response) {
            if (response.status === 200) {
              return response.json();
            }

            throw {
              status: response.status,
              data: response
            };
          });
        };

        var getData = window.fetch ? getByFetch : __XMLHttpRequest;

        var __jsonp = function (url, callbackName) {
          return new Promise(function (resolve, reject) {
            var scriptOk = false;
            var script = document.createElement('script');

            if (!window[callbackName]) {
              window[callbackName] = function () {
                scriptOk = true;
                delete window[callbackName];
                document.body.removeChild(script);
                resolve(arguments.length <= 0 ? undefined : arguments[0]);
              };
            }

            var checkCallback = function () {
              if (scriptOk) return;
              delete window[callbackName];
              document.body.removeChild(script);
              reject(url);
            };

            script.onreadystatechange = function () {
              if (_this.readyState === 'complete' || _this.readyState === 'loaded') {
                _this.onreadystatechange = null;
                setTimeout(checkCallback, 0);
              }
            };

            script.onerror = checkCallback;
            script.onload = checkCallback;
            script.src = url + '&callback=' + callbackName;
            document.body.appendChild(script);
          });
        };

        return function (url, callbackName
        /* for jsonp */
        , referrerPolicy) {
          return new Promise(function (resolve, reject) {
            getData(url, referrerPolicy).then(resolve).catch(function (err) {
              if (err && err.status && $J.contains([404, 200], err.status)) {
                reject(err);
              } else {
                // eslint-disable-next-line no-console
                console.log('XHR error. Switching to JSONP.');

                if (!callbackName) {
                  callbackName = 'sirv_data_' + helper.generateUUID();
                }

                __jsonp(url, callbackName).then(resolve).catch(reject);
              }
            });
          });
        };
      }();
      /* global helper */

      /* global $ */

      /* eslint-env es6 */


      helper.getSirvType = function () {
        var isNotEmptyString = function (str) {
          var result = false;

          if (str) {
            str += '';
            result = str.trim() !== '';
          }

          return result;
        };

        return function (node) {
          node = $(node);
          var tmp = node.attr('data-type') || node.attr('data-effect');
          var viewContent = node.fetch('view-content');
          var result = null;
          var componentType;
          var imgSrc;

          if (isNotEmptyString(tmp) && tmp !== 'static') {
            var index = globalVariables.SLIDE.NAMES.indexOf(tmp);
            componentType = index >= 0 ? index : globalVariables.SLIDE.TYPES.ZOOM;
            tmp = node.attr('data-src');

            if (isNotEmptyString(tmp)) {
              imgSrc = tmp;
            } else {
              tmp = $(node.node.getElementsByTagName('img')[0]);

              if (tmp.attr) {
                imgSrc = tmp.attr('src') || tmp.attr('data-src');
              }
            }
          } else {
            tmp = node.attr('data-src');

            if (isNotEmptyString(tmp)) {
              if (helper.isSpin(tmp) && node.getTagName() !== 'img' || viewContent === globalVariables.SLIDE.TYPES.SPIN) {
                componentType = globalVariables.SLIDE.TYPES.SPIN;
                imgSrc = tmp;
              } else if (helper.isVideo(tmp)) {
                componentType = globalVariables.SLIDE.TYPES.VIDEO;
                imgSrc = tmp;
              } else {
                imgSrc = tmp;
                componentType = globalVariables.SLIDE.TYPES.IMAGE;

                if (viewContent) {
                  componentType = viewContent;
                }
              }
            } else {
              tmp = node.attr('src');

              if (isNotEmptyString(tmp) && node.getTagName() === 'img') {
                imgSrc = tmp;
                componentType = globalVariables.SLIDE.TYPES.IMAGE;
              }
            }
          }

          if (componentType) {
            result = {
              type: componentType,
              imgSrc: imgSrc
            };
          }

          return result;
        };
      }();
      /* global $J, $ */

      /* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */

      /* eslint no-prototype-builtins: "off" */

      /* eslint lines-around-directive: ["off"] */

      /* eslint strict: ["off"] */

      /* eslint-env es6 */


      if (!$J.hashKeys) {
        if (Object.keys) {
          $J.hashKeys = Object.keys;
        } else {
          (function () {
            'use strict';

            var hasOwnProperty = Object.prototype.hasOwnProperty;
            var hasDontEnumBug = !{
              toString: null
            }.propertyIsEnumerable('toString');
            var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
            var dontEnumsLength = dontEnums.length;
            return function (obj) {
              if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
              }

              var result = [];
              var prop;
              var i;

              for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                  result.push(prop);
                }
              }

              if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                  if (hasOwnProperty.call(obj, dontEnums[i])) {
                    result.push(dontEnums[i]);
                  }
                }
              }

              return result;
            };
          })();
        }
      }
      /* global $, $J, helper */

      /* eslint-env es6 */


      helper.imageLib = {
        isNumber: function (value) {
          return /(px|%)$/.test(value);
        },
        getSize: function (node, count) {
          // eslint-disable-next-line
          return new Promise(function (resolve, reject) {
            var size = $(node).getInnerSize();

            if (!count) {
              count = 100;
            }

            count -= 1;

            if (!size.width && !size.height && count > 0) {
              setTimeout(function () {
                helper.imageLib.getSize(node, count).then(resolve);
              }, 16);
            } else {
              resolve(size);
            }
          });
        },
        // just for pixels
        getBackgroundValue: function (value) {
          var result = null;

          if (value && /px$/.test(value)) {
            result = parseInt(value, 10);
          }

          return result;
        },
        // just for pixels
        getBackgroundSize: function (node) {
          var result = null;
          var value = $(node).getCss('background-size');

          if (value) {
            value = value.split(',')[0].split(' ');
            var w = helper.imageLib.getBackgroundValue((value[0] || '').trim());
            var h = helper.imageLib.getBackgroundValue((value[1] || '').trim());

            if (w !== null) {
              result = {
                width: w
              };
            }

            if (h !== null) {
              if (!result) {
                result = {};
              }

              result.height = h;
            }
          }

          return result;
        },
        calcProportionalBackgroundSize: function (bgSize, infoSize) {
          var result = {
            width: infoSize.width,
            height: infoSize.height
          };

          if (bgSize.width && infoSize.width > bgSize.width) {
            result.width = bgSize.width;
            result.height = bgSize.width * infoSize.height / infoSize.width;
          }

          if (bgSize.height && infoSize.height > bgSize.height) {
            result.height = bgSize.height;
            result.width = bgSize.height * infoSize.width / infoSize.height;
          }

          return result;
        },
        getBackgroundPositionValue: function (value) {
          var result;

          switch (value) {
            case 'top':
            case 'left':
              result = 0;
              break;

            case 'center':
              result = 50;
              break;

            case 'right':
            case 'bottom':
              result = 100;
              break;

            default:
              if (helper.imageLib.isNumber(value)) {
                result = parseInt(value, 10);
              } else {
                result = 0;
              }

          }

          return result;
        },
        getBackgroundPosition: function (node) {
          var x = {
            side: 'left',
            position: 0,
            sign: '%'
          };
          var y = {
            side: 'top',
            position: 0,
            sign: '%'
          };
          var xIndex = 0;
          var yIndex = 1;
          var value = $(node).getCss('background-position');

          if (value) {
            value = value.replace(/important/, '');
            value = value.replace(/!/g, '');
            value = value.trim();
            value = value.replace(/\s+/g, ' ');
            value = value.split(' ');

            if (value.length > 2) {
              xIndex = 1;
              yIndex = 3;

              if ($J.contains(['left', 'right'], value[0])) {
                x.side = value[0];
              }

              if ($J.contains(['top', 'bottom'], value[2])) {
                y.side = value[2];
              }
            }

            x.position = helper.imageLib.getBackgroundPositionValue(value[xIndex]);
            y.position = helper.imageLib.getBackgroundPositionValue(value[yIndex]);

            if (/px$/.test(value[xIndex])) {
              x.sign = 'px';
            }

            if (/px$/.test(value[yIndex])) {
              y.sign = 'px';
            }
          }

          return {
            x: x,
            y: y
          };
        },
        getPartSize: function (node, side) {
          var result = 0,
              value;

          if ($J.browser.ieMode) {
            value = (node.currentStyle[side] || '0').replace(/px$/, '');
          } else {
            value = (node.getCss(side) || '0').replace(/px$/, '');
          }

          if (isFinite(value)) {
            result = Math.round(parseFloat(value)) - parseFloat(node.getCss('border-top-width') || 0) - parseFloat(node.getCss('border-bottom-width') || 0) - parseFloat(node.getCss('padding-top') || 0) - parseFloat(node.getCss('padding-bottom') || 0);
          }

          return result;
        },
        checkMaxSize: function (size, originSize, dppx) {
          var firstSide, secondSide;

          if (size.width > originSize.width * dppx || size.height > originSize.height * dppx) {
            if (size.width > originSize.width) {
              firstSide = 'width';
              secondSide = 'height';
            } else {
              firstSide = 'height';
              secondSide = 'width';
            }

            size[firstSide] = originSize[firstSide];

            if (size[secondSide]) {
              size[secondSide] = originSize[secondSide];
            }

            size.round = false;
          }

          return size;
        },
        calcImageProportion: function (firstSide, secondSide, proportionSize, baseFirstSize) {
          var prop = proportionSize[secondSide] / proportionSize[firstSide];
          var result = {};
          result[firstSide] = baseFirstSize;
          result[secondSide] = parseInt(prop * result[firstSide], 10);
          return result;
        },
        contain: function (imageSize, containerSize) {
          var result = {
            width: imageSize.width,
            height: imageSize.height
          };

          if (containerSize.width && result.width > containerSize.width) {
            result = helper.imageLib.calcImageProportion('width', 'height', result, containerSize.width);
          }

          if (containerSize.height && result.height > containerSize.height) {
            result = helper.imageLib.calcImageProportion('height', 'width', result, containerSize.height);
          }

          return result;
        },
        cover: function (imageSize, containerSize) {
          var result = {
            width: imageSize.width,
            height: imageSize.height
          };

          if (containerSize.width && result.width < containerSize.width) {
            result = helper.imageLib.calcImageProportion('width', 'height', result, containerSize.width);
          }

          if (containerSize.height && result.height < containerSize.height) {
            result = helper.imageLib.calcImageProportion('height', 'width', result, containerSize.height);
          }

          return result;
        },
        calcProportionSize: function (size, originSize, fitSize) {
          var result = {};
          var w = originSize.width;
          var h = originSize.height;
          var wh = w / h;
          var hw = h / w;

          var setW = function () {
            result.height = size.height;
            result.width = parseInt(wh * size.height, 10);
          };

          var setH = function () {
            result.width = size.width;
            result.height = parseInt(hw * size.width, 10);
          };

          if (size.width > w || size.height > h) {
            if (size.width > w) {
              size.width = w;

              if (size.height) {
                if (size.height > h) {
                  size.height = h;
                } else {
                  setW();
                }
              }
            } else {
              size.height = h;

              if (size.width) {
                if (size.width > w) {
                  size.width = w;
                } else {
                  setH();
                }
              }
            }
          }

          if (size.width || size.height) {
            if (size.width && size.height) {
              // if (Math.abs(size.width / size.height - wh) <= Math.abs(size.height / size.width - hw)) {
              if (size.width / size.height - wh <= size.height / size.width - hw) {
                setH();
              } else {
                setW();
              }
            } else if (!size.width) {
              setW();
            } else {
              setH();
            }
          }

          if (fitSize) {
            if (helper.imageLib.isNumber(fitSize.width) && helper.imageLib.isNumber(fitSize.height)) {
              w = parseInt(fitSize.width, 10);

              if (/%$/.test(fitSize.width)) {
                w = w / 100 * size.width;
              }

              h = parseInt(fitSize.height, 10);

              if (/%$/.test(fitSize.height)) {
                h = h / 100 * size.height;
              }

              if (w < originSize.width / originSize.height * h) {
                result = helper.imageLib.calcImageProportion('width', 'height', originSize, w);
              } else {
                result = helper.imageLib.calcImageProportion('height', 'width', originSize, h);
              }
            } else {
              if (helper.imageLib.isNumber(fitSize.width)) {
                w = parseInt(fitSize.width, 10);

                if (/%$/.test(fitSize.width)) {
                  w = w / 100 * size.width;
                }

                result = helper.imageLib.calcImageProportion('width', 'height', originSize, w);
              }

              if (helper.imageLib.isNumber(fitSize.height)) {
                h = parseInt(fitSize.height, 10);

                if (/%$/.test(fitSize.height)) {
                  h = h / 100 * size.height;
                }

                result = helper.imageLib.calcImageProportion('height', 'width', originSize, h);
              }

              if ($J.contains([fitSize.width, fitSize.height], 'initial')) {
                result.width = originSize.width;
                result.height = originSize.height;
              } else if ($J.contains([fitSize.width, fitSize.height], 'cover')) {
                result = helper.imageLib.cover(result, size);
              } else if ($J.contains([fitSize.width, fitSize.height], 'contain')) {
                result = helper.imageLib.contain(result, size);
              }
            }
          }

          return result;
        }
      };
      /* eslint-env es6 */

      /* global $, $J, helper */

      /* eslint-disable indent */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      /* eslint no-unused-vars: ["error", { "args": "none"}] */

      /* eslint no-empty: "error"*/

      helper.InViewModule = function () {
        var elementIsShown = function (node) {
          var result = true;

          if (node.getTagName() !== 'body') {
            if (node.getCss('display') === 'none') {
              result = false;
            } else {
              result = elementIsShown($(node.node.parentNode));
            }
          }

          return result;
        };

        var Timer = /*#__PURE__*/function () {
          "use strict";

          function Timer() {
            this.timer = null;
            this.started = false;
            this.list = [];
          }

          var _proto2 = Timer.prototype;

          _proto2._startTimer = function _startTimer() {
            var _this2 = this;

            if (this.list.length) {
              clearTimeout(this.timer);
              this.timer = setTimeout(function () {
                _this2._check();

                if (_this2.started) {
                  _this2._startTimer();
                }
              }, 500);
            }
          };

          _proto2._check = function _check() {
            this.list.forEach(function (obj) {
              var isShown = elementIsShown(obj.obj.node);
              var callCB = isShown !== obj.obj.isShown;
              obj.obj.isShown = isShown;

              if (callCB) {
                obj.callback(obj.obj);
              }
            });
          };

          _proto2.push = function push(obj, cb) {
            var insideObj = {
              obj: obj,
              callback: cb
            };
            this.list.push(insideObj);

            if (!this.started) {
              this.started = true;

              this._startTimer();
            }
          };

          _proto2.remove = function remove(node) {
            for (var i = 0, l = this.list.length; i < l; i++) {
              if (this.list[i].obj.node.node === node) {
                this.list.splice(i, 1);
                break;
              }
            }

            if (!this.list.length) {
              this.started = false;
            }
          };

          return Timer;
        }();

        var timerInstance = new Timer();

        var getPercent = function (full, current) {
          var result = 0;

          if (full > 0) {
            result = current / full;
          }

          return result;
        };

        var checkValue = function (value) {
          var result = null;

          if (value !== null) {
            value = parseFloat(value);

            if (!isNaN(value)) {
              if (value < 0) {
                value = 0;
              }

              if (value > 1) {
                value = 1;
              }

              result = value;
            }
          }

          return result;
        };

        var getRootSize = function (node) {
          if (!node) {
            node = window;
          }

          return {
            width: node.offsetWidth || node.innerWidth || document.documentElement.clientWidth,
            height: node.offsetHeight || node.innerHeight || document.documentElement.clientHeight
          };
        };

        var getRootData = function (node, pos, size) {
          var tmp;
          var result = $J.extend({}, pos);

          try {
            tmp = $(node).getBoundingClientRect();
            result.top += tmp.top;
            result.left += tmp.left;
          } catch (e) {
            /* empty */
          }

          result = $J.extend(result, size);
          return result;
        }; // px and % only


        var checkRootMargin = function (value) {
          var result = [];
          var l;
          var i;

          var f = function () {
            return 0;
          };

          if (value && !Array.isArray(value)) {
            if ($J.typeOf(value) === 'number') {
              value = [value];
            } else if ($J.typeOf(value) === 'string') {
              value = value.split(' ');
              l = value.length;

              for (i = 0; i < l; i++) {
                value[i] = value[i].trim();
              }
            } else {
              value = null;
            }
          }

          if (Array.isArray(value)) {
            l = value.length;

            if (l > 4) {
              l = 4;
            }

            value.forEach(function (v) {
              if ($J.contains(['string', 'number'], $J.typeOf(v))) {
                var number = parseInt(v, 10);

                if (/%$/.test(v)) {
                  result.push(function (width) {
                    return width / 100 * number;
                  });
                } else {
                  result.push(function (width) {
                    return number;
                  });
                }
              } else {
                result.push(f);
              }
            }); // [top, right, bottom, left]

            switch (l) {
              case 1:
                result.push(result[0]);
                result.push(result[0]);
                result.push(result[0]);
                break;

              case 2:
                result.push(result[0]);
                result.push(result[1]);
                break;

              case 3:
                result.push(result[1]);
                break;
              // no default
            }
          } else {
            result = [f, f, f, f];
          }

          return result;
        };

        var checkThreshold = function (value) {
          var result = [];
          var tmp;

          if (Array.isArray(value)) {
            value.forEach(function (v) {
              tmp = checkValue(v);

              if (tmp !== null && !$J.contains(result, tmp)) {
                result.push(tmp);
              }
            });
          } else {
            result = [0];
          }

          return result;
        };

        var getIntersectionRatio = function (rect, viewPortSize) {
          var width;
          var height;
          var rw = rect.width || 1;
          var rh = rect.height || 1;
          width = Math.min(rect.left + rw, viewPortSize.left + viewPortSize.width) - Math.max(rect.left, viewPortSize.left);
          height = Math.min(rect.top + rh, viewPortSize.top + viewPortSize.height) - Math.max(rect.top, viewPortSize.top);

          if (width < 0) {
            width = 0;
          }

          if (height < 0) {
            height = 0;
          }

          return getPercent(rw * rh, width * height);
        };

        var checkThresholdQueue = function (arr, lastIntersectionRatio, currentIntersectionRatio) {
          var result = false;
          var i;
          var l = arr.length;

          if (lastIntersectionRatio !== currentIntersectionRatio) {
            if (lastIntersectionRatio < currentIntersectionRatio) {
              for (i = 0; i < l; i++) {
                if (arr[i] === 0 && lastIntersectionRatio === 0 || lastIntersectionRatio < arr[i] && arr[i] <= currentIntersectionRatio) {
                  result = true;
                  break;
                }
              }
            } else {
              for (i = 0; i < l; i++) {
                if (arr[i] === 1 && lastIntersectionRatio === 1 || lastIntersectionRatio > arr[i] && arr[i] >= currentIntersectionRatio) {
                  result = true;
                  break;
                }
              }
            }
          }

          return result;
        };

        var FakeIntersectionObserver = /*#__PURE__*/function () {
          "use strict";

          function FakeIntersectionObserver(callback, options) {
            this.callback = callback;
            this.options = $J.extend({
              rootMargin: '0px',
              threshold: [0],
              root: null
            }, options || {});
            this.options.rootMargin = checkRootMargin(this.options.rootMargin);
            this.options.threshold = checkThreshold(this.options.threshold);
            this.nodeList = [];
            this.last = [];
            this.viewPortSize = {
              top: 0,
              left: 0,
              width: 0,
              height: 0
            };
            this.correctPosition = {
              top: 0,
              left: 0
            };
            this.eventWasAdded = false;
            this.bindedRender = this._render.bind(this);
            this.bindedResize = this._resize.bind(this);

            this._resize();
          }

          var _proto3 = FakeIntersectionObserver.prototype;

          _proto3._setEvents = function _setEvents(e) {
            if (!this.eventWasAdded) {
              this.eventWasAdded = true;
              $(window).addEvent('resize', this.bindedResize);
              $(this.options.root || window).addEvent('scroll', this.bindedRender);
            }
          };

          _proto3._removeEvents = function _removeEvents(e) {
            if (this.eventWasAdded) {
              this.eventWasAdded = false;
              $(window).removeEvent('resize', this.bindedResize);
              $(this.options.root || window).removeEvent('scroll', this.bindedRender);
            }
          };

          _proto3._resize = function _resize(e) {
            var m = this.options.rootMargin;
            var rootSize = getRootSize(this.options.root);
            $(m).map(function (v) {
              return v(rootSize.width);
            });
            this.correctPosition = {
              top: 0 - m[0](rootSize.width),
              left: 0 - m[1](rootSize.width)
            };
            this.viewPortSize = {
              width: rootSize.width + m[1](rootSize.width) + m[3](rootSize.width),
              height: rootSize.height + m[0](rootSize.width) + m[2](rootSize.width)
            };
          };

          _proto3._renderElement = function _renderElement(nodeObj) {
            var result = null;

            if (nodeObj.isShown) {
              var rootData = getRootData(this.options.root, this.correctPosition, this.viewPortSize);
              var intersectionRatio = getIntersectionRatio(nodeObj.node.node.getBoundingClientRect(), rootData);

              if (checkThresholdQueue(this.options.threshold, nodeObj.intersectionRatio, intersectionRatio)) {
                nodeObj.intersectionRatio = intersectionRatio;
                result = {
                  target: nodeObj.node.node,
                  intersectionRatio: nodeObj.intersectionRatio,
                  isIntersecting: nodeObj.intersectionRatio > 0
                };
              }
            }

            return result;
          };

          _proto3._render = function _render() {
            var _this3 = this;

            var changedNodes = [];
            this.nodeList.forEach(function (node) {
              var result = _this3._renderElement(node);

              if (result) {
                changedNodes.push(result);
              }
            });

            if (changedNodes.length) {
              this.last = changedNodes;
              this.callback(changedNodes);
            }
          };

          _proto3.takeRecords = function takeRecords() {
            this._render();

            return this.last;
          };

          _proto3.observe = function observe(node) {
            var _this4 = this;

            var cbData;
            node = $(node);
            node = {
              node: node,
              isShown: elementIsShown(node),
              intersectionRatio: 0,
              isIntersecting: false
            };
            timerInstance.push(node, function (_node) {
              var result = _this4._renderElement(_node);

              if (result) {
                _this4.last = [result];

                _this4.callback([result]);
              }
            });
            this.nodeList.push(node);

            this._setEvents();

            var result = this._renderElement(node);

            if (result) {
              cbData = result;
            } else {
              cbData = {
                target: node.node.node,
                intersectionRatio: 0,
                isIntersecting: false
              };
            }

            this.callback([cbData]);
          };

          _proto3.unobserve = function unobserve(node) {
            var nodes = [];
            node = $(node);
            this.nodeList.forEach(function (obj) {
              nodes.push(obj.node.node);
            });
            var index = nodes.indexOf(node.node);
            timerInstance.remove(node.node);

            if (index > -1) {
              this.nodeList.splice(index, 1);
            }

            if (!this.nodeList.length) {
              this._removeEvents();
            }
          };

          _proto3.disconnect = function disconnect() {
            this.nodeList.forEach(function (node) {
              timerInstance.remove(node.node);
            });
            this.nodeList = [];

            this._removeEvents();
          };

          return FakeIntersectionObserver;
        }();

        var Instance = /*#__PURE__*/function () {
          "use strict";

          function Instance(callback, options) {
            var IntersectionObserverClass = window.IntersectionObserver || FakeIntersectionObserver;
            this.observer = new IntersectionObserverClass(callback, options || {});
          }

          Instance.isInView = function isInView(node) {
            var rect = $(node).getBoundingClientRect();
            return (rect.top >= 0 || rect.top - rect.bottom < rect.top) && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
          };

          var _proto4 = Instance.prototype;

          _proto4.takeRecords = function takeRecords() {
            return this.observer.takeRecords();
          };

          _proto4.observe = function observe(target) {
            if (target.node) {
              target = target.node;
            }

            this.observer.observe(target);
          };

          _proto4.unobserve = function unobserve(target) {
            this.observer.unobserve(target);
          };

          _proto4.disconnect = function disconnect() {
            this.observer.disconnect();
          };

          return Instance;
        }();

        return Instance;
      }();
      /* global $J, helper */

      /* eslint-env es6 */


      helper.isIe = function () {
        return $J.browser.uaName === 'edge' || $J.browser.uaName === 'ie' && $J.contains([10, 11], $J.browser.uaVersion);
      };
      /* global helper */

      /* eslint-env es6 */


      helper.isPercentage = function (value) {
        return /^([-]?[0-9]*\.?[0-9]+)%$/.test('' + value);
      };
      /* global $J, helper */

      /* eslint-env es6 */


      helper.isSVG = function (url) {
        var result = false;

        if (url) {
          url = url.split('?')[0];
          url = url.split('.');
          url = url[url.length - 1];
          result = /svg/i.test(url);
        }

        return result;
      };
      /* global helper */

      /* eslint-env es6 */


      helper.isSpin = function (str) {
        str = (str || '').split('?')[0];
        return /([^#?]+)\/?([^#?]+\.spin)(\?([^#]*))?(#(.*))?$/.test(str);
      };
      /* global helper */

      /* eslint-env es6 */


      helper.isVideo = function (str) {
        str = (str || '').split('?')[0];
        return /([^#?]+)\/?([^#?]+\.(mp4|mov|avi|m4v|mkv|webm|wmv|ogv|ogg))(\?([^#]*))?(#(.*))?$/i.test(str);
      };
      /* global helper */

      /* global $J */

      /* global $ */

      /* eslint-env es6 */


      helper.loadImage = function (sources) {
        return new Promise(function (resolve, reject) {
          var img;
          var container;
          var createContainer = false;

          if ($J.contains(['array', 'string'], $J.typeOf(sources))) {
            if ($J.typeOf(sources) === 'string') {
              sources = [sources];
            }

            img = $J.$new('img').setCss({
              maxWidth: 'none',
              maxHeight: 'none'
            });
            img.attr('referrerpolicy', 'no-referrer-when-downgrade');
            createContainer = true;
          } else {
            img = $(sources);

            if (!img.node.parentNode) {
              createContainer = true;
            }
          }

          if (createContainer) {
            container = $J.$new('div').setCss({
              top: '-10000px',
              left: '-10000px',
              width: '10px',
              height: '10px',
              position: 'absolute',
              overflow: 'hidden'
            });
            container.append(img);
            $($J.D.node.body).append(container);
          } // if (!img.complete || $J.browser.engine === 'gecko') {


          if (!img.node.complete || !img.node.src) {
            var handler = function (e) {
              img.removeEvent('load error', handler);

              if (e.type === 'error') {
                reject({
                  error: e
                });
              } else {
                resolve({
                  image: e,
                  size: {
                    width: img.node.naturalWidth || img.node.width,
                    height: img.node.naturalHeight || img.node.height
                  }
                });
              }

              if (container) {
                container.remove();
              }
            };

            img.addEvent('load error', handler);

            if (container && $J.typeOf(sources) === 'array') {
              img.attr('src', sources[0]);

              if (sources[1]) {
                // img.attr('srcset', encodeURI(sources[1]) + ' 2x');
                img.attr('srcset', sources[1] + ' 2x');
              }
            }
          } else {
            if (container) {
              container.remove();
            }

            resolve({
              image: null,
              size: img.getSize()
            });
          }
        });
      };
      /* global $J, helper */

      /* eslint-env es6 */


      helper.loadStylesheet = function (url, id, shadowRoot, selector) {
        return new Promise(function (resolve, reject) {
          var alreadyIncluded = false;
          var rootElement = shadowRoot || $J.D.node;
          $J.$A(rootElement.querySelectorAll('link')).forEach(function (link) {
            var href = $(link).attr('href') || '';

            if ($J.getAbsoluteURL(href) === $J.getAbsoluteURL(url)) {
              alreadyIncluded = true;
            }
          });

          if (alreadyIncluded) {
            resolve();
          } else {
            var slink = $J.$new('link');

            if (id !== $J.U) {
              slink.node.id = id;
            }

            slink.node.rel = 'stylesheet';
            slink.node.type = 'text/css';

            slink.node.onload = function () {
              resolve();
            };

            slink.node.onerror = function (e) {
              reject(e);
            };

            slink.node.href = url;
            var root = $J.D.node.head || $J.D.node.getElementsByTagName('head')[0] || $J.D.node.body || $J.D.node.documentElement;

            if (shadowRoot) {
              root = shadowRoot;
            }

            var nextSibling = root.firstChild;
            var addAfter = root.querySelector(selector);

            if (addAfter && addAfter.nextSibling) {
              nextSibling = addAfter.nextSibling;
            }

            root.insertBefore(slink.node, nextSibling);
          }
        });
      };
      /* global helper */

      /* eslint-env es6 */


      helper.makeQueryblePromise = function (promise) {
        if (promise.isResolved) {
          return promise;
        }

        var isPending = true;
        var isRejected = false;
        var isFulfilled = false;
        var result = promise.then(function (res) {
          isPending = false;
          isFulfilled = true;
          return res;
        }, function (err) {
          isPending = false;
          isRejected = true;
          return err;
        });

        result.isFulfilled = function () {
          return isFulfilled;
        };

        result.isPending = function () {
          return isPending;
        };

        result.isRejected = function () {
          return isRejected;
        };

        return result;
      };
      /* global helper */

      /* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */

      /* eslint-env es6 */


      helper.objEach = function (obj, cb) {
        var index = 0;

        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cb(key, obj[key], index);
            index += 1;
          }
        }
      };
      /* global $, $J, helper */

      /* eslint quote-props: ["off", "always"] */

      /* eslint-env es6 */


      helper.paramsFromQueryString = function () {
        var IMG_OPTION_ALIAS = {
          w: 'scale.width',
          h: 'scale.height',
          cw: 'crop.width',
          ch: 'crop.height',
          cx: 'crop.x',
          cy: 'crop.y',
          q: 'quality',
          s: 'size',
          // p         : 'profile', // WE SHOULD UPDATE NGINX CONFIGS FOR THIS
          text: 'text.text',
          watermark: 'watermark.image',
          'watermark.w': 'watermark.scale.width',
          'watermark.h': 'watermark.scale.height',
          'watermark.cw': 'watermark.crop.width',
          'watermark.ch': 'watermark.crop.height',
          'watermark.cx': 'watermark.crop.x',
          'watermark.cy': 'watermark.crop.y'
        }; // fix: if the '<meta http-equiv="Content-Type" content="text/html;charset=utf-8">' is absent

        var decodeURIComponentX = function (str) {
          var out = '';
          var i = 0;
          var l;
          var x;
          var arr = str.split(/(%(?:D0|D1)%.{2})/);

          for (l = arr.length; i < l; i++) {
            try {
              x = decodeURIComponent(arr[i]);
            } catch (e) {
              x = arr[i];
            }

            out += x;
          }

          return out;
        };
        /**
         * Converts query string to Object
         * @param  {String} query   Query string
         * @return {Object}
         */


        return function (query) {
          var params = {};

          if (query) {
            $(query.split('&')).forEach(function (pair) {
              var setting = pair.split('='); // Convert option alias to a real name

              setting[0] = IMG_OPTION_ALIAS[setting[0]] || setting[0];
              setting[0].trim().split('.').reduce(function (res, val, ind, col) {
                if (/^\d$/.test(val)) {
                  // save text.0.text='hello' as object and then convert to array
                  res.__toArray = true;
                }

                if (res[val] === undefined) {
                  if (ind < col.length - 1) {
                    res[val] = {};
                  } else {
                    // res[val] = decodeURIComponent(setting[1] || '');
                    res[val] = decodeURIComponentX(setting[1] || '');
                  }
                }

                return res[val];
              }, params);
            });
            $($J.hashKeys(params)).forEach(function (key) {
              var objKeys;

              if (typeof params[key] === 'object' && params[key].__toArray) {
                delete params[key].__toArray;
                objKeys = $J.hashKeys(params[key]);
                params[key] = $(objKeys).map(function (idx) {
                  return params[key][idx];
                });
              }
            });
          }

          return params;
        };
      }();
      /* global $, $J, helper */

      /* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */

      /* eslint no-continue: "off" */

      /* eslint no-loop-func: "off" */

      /* eslint-env es6 */

      /**
       * Convert JSON data to query string
       * @param  {Object} data - JSON data
       * @param  {String} [prefix] Prefix added to parameter name in query string
       * @return {[type]}          Query string.
       */


      helper.paramsToQueryString = function () {
        var URL_OPTIONS_ALIASES = {
          'scale.width': 'w',
          'scale.height': 'h',
          'crop.width': 'cw',
          'crop.height': 'ch',
          'crop.x': 'cx',
          'crop.y': 'cy',
          'quality': 'q',
          'size': 's',
          'text.text': 'text',
          'watermark.image': 'watermark',
          'watermark.scale.width': 'watermark.w',
          'watermark.scale.height': 'watermark.h',
          'watermark.crop.width': 'watermark.cw',
          'watermark.crop.height': 'watermark.ch',
          'watermark.crop.x': 'watermark.cx',
          'watermark.crop.y': 'watermark.cy'
        };

        var paramsToQueryString = function (data, prefix) {
          var k;
          var value;
          var results = [];

          for (k in data) {
            if (!Object.prototype.hasOwnProperty.call(data, k)) {
              continue;
            }

            if ((k + '').substring(0, 2) === '$J') {
              continue;
            }

            value = data[k];

            if ($J.typeOf(value) === 'object') {
              value = paramsToQueryString(value, (prefix || '') + k + '.');
              results.push(value);
            } else if ($J.typeOf(value) === 'array') {
              $(value).forEach(function (item, idx) {
                value = paramsToQueryString(item, (prefix || '') + k + '.' + idx + '.');
                results.push(value);
              });
            } else {
              // results.push((prefix || '') + k + '=' + encodeURIComponent(value));
              var paramName = (prefix || '') + k;
              paramName = URL_OPTIONS_ALIASES[paramName] || paramName;
              results.push(paramName + '=' + encodeURIComponent(value));
            }
          }

          return results.join('&');
        };

        return paramsToQueryString;
      }();
      /* global helper */

      /* eslint no-restricted-properties: "off" */

      /* eslint-env es6 */


      helper.round = function (value, count, noTail) {
        var v;

        if (!count) {
          count = 0;
        }

        v = Math.pow(10, count);

        if (noTail) {
          v = parseInt(value * v, 10) / v;
        } else {
          v = Math.round(value * v) / v;
        }

        return v;
      };
      /* global helper */

      /* eslint-env es6 */


      helper.roundSize = function (value, roundValue) {
        if (!roundValue) {
          roundValue = 100;
        }

        if (value) {
          value = Math.ceil(value / roundValue) * roundValue;
        }

        return value;
      };
      /* global $J, helper */

      /* global globalVariables */

      /* eslint new-parens: "off" */

      /* eslint-env es6 */


      helper.sendRawStats = function (statsData, useBeacon) {
        try {
          var xhr = null;
          var endpoint = ($J.browser.ieMode < 11 ? globalVariables.SIRV_HTTP_PROTOCOL : 'https:') + '//stats.sirv.com/' + +new Date();

          if (useBeacon === true && navigator.sendBeacon) {
            navigator.sendBeacon(endpoint, helper.paramsToQueryString(statsData));
            return;
          }

          if ($J.browser.features.xhr2) {
            xhr = new XMLHttpRequest();
          } else if ($J.W.node.XDomainRequest) {
            xhr = new XDomainRequest();
          }

          if (!xhr) {
            return;
          }

          xhr.open('POST', endpoint);

          if (xhr.responseType !== undefined) {
            xhr.responseType = 'text';
          }

          xhr.send(helper.paramsToQueryString(statsData));
        } catch (ex) {//empty
        }
      };
      /* global $J, helper */

      /* eslint-env es6 */


      helper.sliderLib = {
        // getIndexFromDirection: (currentIndex, direction, length, loop) => {
        //     let index = currentIndex;
        //     switch (direction) {
        //         case 'next':
        //             index += 1;
        //             break;
        //         case 'prev':
        //             index -= 1;
        //             break;
        //         default:
        //             return currentIndex;
        //     }
        //     if (loop) {
        //         index = helper.getArrayIndex(index, length);
        //     } else {
        //         if (index < 0) {
        //             index = 0;
        //         } else if (index > length - 1) {
        //             index = length - 1;
        //         }
        //     }
        //     return index;
        // },
        findIndex: function (value, currentIndex, l, loop) {
          var result = null;

          if ($J.typeOf(value) === 'string') {
            switch (value) {
              case 'next':
                value = currentIndex + 1;
                break;

              case 'prev':
                value = currentIndex - 1;
                break;
              // no default
            }
          }

          if ($J.typeOf(value) === 'number') {
            result = value;

            if (result < 0) {
              if (loop) {
                result = helper.getArrayIndex(result, l);
              } else {
                result = 0;
              }
            } else if (value >= l) {
              if (loop) {
                result = helper.getArrayIndex(result, l);
              } else {
                result = l - 1;
              }
            }
          }

          return result;
        },
        // getDirectionFromIndex: function (currentIndex, index, length, loop) {
        //     var direction = 'next', fl, rl;
        //     function getForwardLeft() {
        //         var result;
        //         if (index < currentIndex) {
        //             result = currentIndex - index;
        //         } else {
        //             result = length - index + currentIndex;
        //         }
        //         return result;
        //     }
        //     function getForwardRight() {
        //         var result;
        //         if (currentIndex < index) {
        //             result = index - currentIndex;
        //         } else {
        //             result = length - currentIndex + index;
        //         }
        //         return result;
        //     }
        //     if (loop) {
        //         fl = getForwardLeft();
        //         rl = getForwardRight();
        //         if (fl === rl && currentIndex > index || fl < rl) {
        //             direction = 'prev';
        //         }
        //     } else {
        //         if (index < currentIndex) { direction = 'prev'; }
        //     }
        //     return direction;
        // },
        getSrc: function (src) {
          var result = null;

          if ($J.defined(src) && (src + '').trim() !== '') {
            result = src + '';
          }

          return result;
        }
      };
      /* global $, $J, helper */

      /* eslint-env es6 */

      /* eslint no-unused-vars: ["error", { "args": "none" }] */

      helper.sortSlidesByOrder = function (order, slides) {
        var oldSlidesArr = slides.slice();
        var newSlidesArr = [];

        if (order && order.length) {
          for (var i = 0, l = Math.min(order.length, oldSlidesArr.length); i < l; i++) {
            for (var j = 0, l2 = oldSlidesArr.length; j < l2; j++) {
              if (globalVariables.SLIDE.NAMES.indexOf(order[i]) === oldSlidesArr[j].type && oldSlidesArr[j].enabled) {
                newSlidesArr.push(oldSlidesArr[j]);
                oldSlidesArr.splice(j, 1);
                break;
              }
            }
          }
        }

        oldSlidesArr.forEach(function (item) {
          newSlidesArr.push(item);
        });
        return newSlidesArr;
      };
      /* global $J, helper */

      /* eslint no-unused-vars: ["error", { "args": "none" }] */

      /* eslint-env es6 */

      /* eslint-env es6 */


      helper.spinLib = function () {
        // eslint-disable-next-line no-unused-vars
        var FULLSCREEN_PERCENT_WITHOUT_ACTION = 15; // 0% - 100%

        var sirvlib = {
          calcProportionSize: function (spinSize, originSize, isFullscreen, oldSize) {
            var width = originSize.width;
            var height = originSize.height;
            var tmp; // if (isFullscreen) {
            //     if (spinSize.width > spinSize.height) {
            //         spinSize.height -= 20;
            //     } else {
            //         spinSize.width -= 20;
            //     }
            // }

            if (width > spinSize.width) {
              tmp = height / width;
              width = spinSize.width;
              height = parseInt(width * tmp, 10);
            }

            if (height > spinSize.height) {
              tmp = width / height;
              height = spinSize.height;
              width = parseInt(height * tmp, 10);
            }
            /* eslint-disable */
            // if (isFullscreen) {


            if (oldSize) {// if (oldSize.width / (originSize.width / 100) >= 100 - spinLib.FULLSCREEN_PERCENT_WITHOUT_ACTION) {
              //     width = oldSize.width;
              //     height = oldSize.height;
              // }
            } else {
              if (originSize.width < width) {
                width = originSize.width;
                height = originSize.height;
              }
            } // }

            /* eslint-enable */


            return {
              width: width,
              height: height
            };
          },
          reverse: function (col, row, arr) {
            if (col) {
              for (var i = 0, l = arr.length; i < l; i++) {
                arr[i].reverse();
              }
            }

            if (row) {
              arr.reverse();
            }

            return arr;
          },
          getNextIndex: function (currentValue, value, direction, length, loop) {
            var result;

            if (direction) {
              if (direction === 'next') {
                result = currentValue + value;

                if (loop) {
                  result = helper.getArrayIndex(result, length);
                } else if (result >= length) {
                  result = length - 1;
                }
              } else {
                result = currentValue - value;

                if (loop) {
                  result = helper.getArrayIndex(result, length);
                } else if (result < 0) {
                  result = 0;
                }
              }
            } else {
              result = value;

              if (loop) {
                result = helper.getArrayIndex(result, length);
              } else {
                if (result >= length) {
                  result = length - 1;
                }

                if (result < 0) {
                  result = 0;
                }
              }
            }

            return result;
          },
          getUrl: function (path) {
            var url = path;
            url = url.split('/');
            url.splice(url.length - 1, 1);
            url = url.join('/');
            url = url.replace(/https?:/, '');
            return url;
          },
          swapLayers: function (layers, revers) {
            var result = layers;

            if (revers) {
              result = {};
              helper.objEach(layers, function (rowKey, rowValue) {
                helper.objEach(rowValue, function (colKey, colValue) {
                  if (!result[colKey]) {
                    result[colKey] = {};
                  }

                  result[colKey][rowKey] = colValue;
                });
              });
            }

            return result;
          },
          getMaxCount: function (layers) {
            var result = 0;
            helper.objEach(layers, function (key, value, index) {
              var l = $J.hashKeys(value).length;

              if (result < l) {
                result = l;
              }
            });
            return result;
          },
          correctArray: function (keysArray, count) {
            var i;
            var result = [];
            var correctCount = count - keysArray.length;
            var diff;
            var l = keysArray.length;
            var curr;
            var next;

            if (correctCount > 0) {
              for (i = 0; i < l - 1; i++) {
                curr = parseInt(keysArray[i], 10);
                next = parseInt(keysArray[i + 1], 10);
                diff = next - curr - 1;
                result.push(keysArray[i]);

                if (diff > 0) {
                  if (correctCount > 0) {
                    if (diff > correctCount) {
                      diff = correctCount;
                    }

                    while (diff > 0) {
                      diff -= 1;
                      correctCount -= 1;
                      result.push(keysArray[i]);
                    }
                  }
                }
              }

              result.push(keysArray[l - 1]);

              if (correctCount > 0) {
                diff = parseInt(keysArray[0], 10) - 1;

                if (diff > 0) {
                  while (diff > 0) {
                    diff -= 1;
                    correctCount -= 1;
                    result.unshift(keysArray[0]);
                  }
                }

                if (correctCount > 0) {
                  while (correctCount > 0) {
                    correctCount -= 1;
                    result.push(keysArray[keysArray.length - 1]);
                  }
                }
              }
            } else {
              result = JSON.parse(JSON.stringify(keysArray));
            }

            return result;
          },
          getFrames: function (frames, count) {
            var result = {};
            var newKeys = sirvlib.correctArray($J.hashKeys(frames), count);
            $(newKeys).forEach(function (value, index) {
              result[index + 1 + ''] = frames[value];
            });
            return result;
          },
          checkLayers: function (layers) {
            var result = {};
            var count = sirvlib.getMaxCount(layers);
            helper.objEach(layers, function (key, value, index) {
              result[index + 1 + ''] = sirvlib.getFrames(value, count);
            });
            return result;
          }
        };
        return sirvlib;
      }();
      /* eslint-env es6 */

      /* global $, $J, helper */

      /* global sirvRequire */

      /* eslint quote-props: ["off", "always"]*/

      /* eslint no-unused-vars: ["error", { "args": "none" }] */

      /*eslint no-lonely-if: "off"*/

      /* eslint-disable no-multi-spaces */

      /* eslint-disable no-use-before-define */


      helper.videoModule = function () {
        var vimeoPromise = null;
        var youtubePromise = null;
        var sources = {};
        var youtubeImgs = {
          'thumb1': '1.jpg',
          // 120x90
          'thumb2': '2.jpg',
          // 120x90
          'thumb3': '3.jpg',
          // 120x90
          'def0': '0.jpg',
          // 480x360
          'def1': 'default.jpg',
          // 120x90
          'middleQuality': 'mqdefault.jpg',
          // 320x180
          'highQuality': 'hqdefault.jpg',
          // 480x360
          'maxSize': 'maxresdefault.jpg' // 1920x1080

        };

        var getVimeoJSON = function (url) {
          return new Promise(function (resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.open('GET', url, true);

            xhttp.onreadystatechange = function () {
              if (xhttp.readyState === 4) {
                if (xhttp.status === 200) {
                  try {
                    var result = JSON.parse(xhttp.responseText)[0];
                    resolve(result);
                  } catch (e) {
                    reject(null);
                  }
                }
              }
            };

            xhttp.send(true);
          });
        };

        var isHtmlVideo = function (node) {
          node = $(node);
          return node && node.getTagName && node.getTagName() === 'video';
        };

        var getYouTobeId = function (url) {
          var result = null;
          url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

          if (url[2] !== undefined) {
            url = url[2].split(/[^0-9a-z_\-]/i);

            if (url.length && url[0]) {
              result = url[0];
            }
          }

          return result;
        };

        var getVimeoId = function (url) {
          var result = null;
          url = url.match(/(?:https?:\/\/)?(?:www.)?(?:player.)?vimeo.com\/(?:[a-z]*\/)*([0-9]{6,11})[?]?.*/)[1];

          if (url) {
            result = url;
          }

          return result;
        };

        var getSrc = function (node) {
          var result = null;
          var children;
          var child;

          if ($J.typeOf(node) === 'string') {
            result = node;
          } else {
            node = $(node);

            if (node && $J.typeOf(node.node) === 'element') {
              if ($J.contains(['iframe', 'div'], node.getTagName())) {
                result = node.attr('src') || node.attr('data-src');
              } else if (isHtmlVideo(node)) {
                result = node.attr('src') || node.attr('data-src');

                if (!result) {
                  result = null;
                  children = $J.$A(node.node.children);

                  do {
                    child = $(children.shift());

                    if (child && $J.typeOf(child.node) === 'element' && child.getTagName() === 'source') {
                      result = child.attr('src') || child.attr('data-src');
                    }
                  } while (!result && child);
                }
              }
            }
          }

          return result;
        };

        var getAPI = function (node) {
          var result = null;

          if (api.isVideo(node)) {
            switch (api.getType(node)) {
              case 'video':
                result = Promise.resolve();
                break;

              case 'vimeo':
                if (!vimeoPromise) {
                  // if (!$J.W.node.Vimeo || ($J.W.node.Vimeo && !$J.W.node.Vimeo.Player)) {
                  vimeoPromise = new Promise(function (resolve, reject) {
                    sirvRequire(['Vimeo'], function (p) {
                      resolve({
                        Player: p
                      } || $J.W.node.Vimeo);
                    });
                  }); // } else {
                  //     vimeoPromise = Promise.resolve($J.W.node.Vimeo);
                  // }
                }

                result = vimeoPromise;
                break;

              case 'youtube':
                if (!youtubePromise) {
                  if (!$J.W.node.YT) {
                    youtubePromise = new Promise(function (resolve, reject) {
                      var f = function () {};

                      var existingEvent = $J.W.node.onYouTubeIframeAPIReady || f;

                      $J.W.node.onYouTubeIframeAPIReady = function () {
                        existingEvent();
                        resolve($J.W.node.YT);
                      };

                      if (!document.querySelector('script[src$="youtube.com/iframe_api"]')) {
                        $J.$new('script', {
                          src: 'https://www.youtube.com/iframe_api'
                        }).appendTo($J.D.node.body);
                      }
                    });
                  } else {
                    youtubePromise = Promise.resolve($J.W.node.YT);
                  }
                }

                result = youtubePromise;
                break;
              // no default
            }
          } else {
            result = Promise.reject(true
            /*error*/
            );
          }

          return result;
        };

        var api = {
          aspectratio: 9 / 16,
          getAspectRatio: function (src) {
            return new Promise(function (resolve, reject) {
              var id;
              src = getSrc(src);

              if (src) {
                if (sources[src]) {
                  resolve(sources[src].aspectratio);
                }
              }

              var type = api.getType(src);

              if (type === 'vimeo') {
                id = getVimeoId(src);

                if (id) {
                  getVimeoJSON('https://vimeo.com/api/v2/video/' + id + '.json').then(function (data) {
                    resolve(data ? data.height / data.width : api.aspectratio);
                  }).catch(function (error) {
                    reject(error);
                  });
                } else {
                  resolve(api.aspectratio);
                }
              } else {
                resolve(api.aspectratio);
              }
            });
          },
          getId: function (src) {
            var result = null;

            if (api.isVideo(src)) {
              src = getSrc(src);

              switch (api.getType(src)) {
                case 'youtube':
                  result = getYouTobeId(src);
                  break;

                case 'vimeo':
                  result = getVimeoId(src);
                  break;
                // no default
              }
            }

            return result;
          },
          isVideo: function (src) {
            var result = false;

            if (isHtmlVideo(src)) {
              result = true;
            } else {
              src = getSrc(src);

              if (src) {
                result = $J.contains(['youtube', 'vimeo'], api.getType(src));
              }
            }

            return result;
          },
          getType: function (src) {
            var result = null;

            if (isHtmlVideo(src)) {
              result = 'video';
            } else {
              src = getSrc(src);

              if (src) {
                if (/^(https?:)?\/\/((www\.)?youtube\.com|youtu\.be)\//.test(src)) {
                  result = 'youtube';
                } else if (/^(https?:)?\/\/((www|player)\.)?vimeo\.com\//.test(src)) {
                  result = 'vimeo';
                }
              }
            }

            return result;
          },
          getImageSrc: function (src, getAll) {
            return new Promise(function (resolve, reject) {
              var type;
              var thumbUrl = null;
              var id;
              var node;

              if (src && $(src) && $J.typeOf($(src).node) === 'element') {
                node = src;
              }

              src = getSrc(src);

              if (src) {
                if (sources[src]) {
                  if (getAll) {
                    if (sources[src].all) {
                      resolve(sources[src].all);
                      return;
                    }
                  } else {
                    if (sources[src].url) {
                      resolve(sources[src].url);
                      return;
                    } else if (sources[src].all) {
                      resolve(sources[src].all.thumbnail.url);
                      return;
                    }
                  }
                }

                type = api.getType(node || src);

                switch (type) {
                  case 'youtube':
                    id = getYouTobeId(src);

                    if (id) {
                      if (getAll) {
                        thumbUrl = {
                          thumbnail: {
                            url: 'https://img.youtube.com/vi/' + id + '/' + youtubeImgs.def1,
                            width: 120,
                            height: 90
                          },
                          medium: {
                            url: 'https://img.youtube.com/vi/' + id + '/' + youtubeImgs.def0,
                            width: 480,
                            height: 360
                          }
                        };
                      } else {
                        thumbUrl = 'https://img.youtube.com/vi/' + id + '/' + youtubeImgs.def1;
                      }

                      if (!sources[src]) {
                        sources[src] = {};
                      }

                      sources[src].aspectratio = api.aspectratio;

                      if (getAll) {
                        sources[src].all = thumbUrl;
                      } else {
                        sources[src].url = thumbUrl;
                      }
                    }

                    resolve(thumbUrl);
                    break;

                  case 'vimeo':
                    id = getVimeoId(src);

                    if (id) {
                      thumbUrl = 'https://vimeo.com/api/v2/video/' + id + '.json';
                      getVimeoJSON(thumbUrl).then(function (data) {
                        var imgUrl = null;

                        if (data) {
                          if (getAll) {
                            imgUrl = {
                              thumbnail: {
                                url: data.thumbnail_small,
                                width: 100,
                                height: 75
                              },
                              medium: {
                                url: data.thumbnail_medium,
                                width: 200,
                                height: 150
                              }
                            };
                          } else {
                            imgUrl = data.thumbnail_small;
                          }
                        }

                        if (imgUrl) {
                          if (!sources[src]) {
                            sources[src] = {};
                          }

                          if (getAll) {
                            sources[src].all = imgUrl;
                          } else {
                            sources[src].url = imgUrl;
                          }

                          sources[src].aspectratio = data.height / data.width;
                        }

                        resolve(imgUrl);
                      }).catch(reject);
                    } else {
                      resolve(thumbUrl);
                    }

                    break;

                  case 'video':
                    if (node) {
                      node = $(node.node.cloneNode(true));

                      if (node.attr) {
                        thumbUrl = node.attr('poster');
                      }

                      if (thumbUrl && thumbUrl.trim() !== '') {
                        if (!sources[src]) {
                          sources[src] = {};
                        }

                        sources[src].aspectratio = api.aspectratio;

                        if (getAll) {
                          sources[src].all = {
                            thumbnail: {
                              url: thumbUrl,
                              width: 200,
                              height: 150
                            },
                            medium: {
                              url: thumbUrl,
                              width: 200,
                              height: 150
                            }
                          };
                          resolve(sources[src].all);
                        } else {
                          sources[src].url = thumbUrl;
                          resolve(thumbUrl);
                        }
                      } else {
                        var timeOfPoster = 0;
                        var canvas = $J.$new('canvas');
                        var context = canvas.node.getContext('2d');

                        var clear = function () {
                          // $J.$A(node.node.children).forEach(function (child) {
                          //     child = $(child)
                          //     if (child && child.getTagName() === 'source') {
                          //         child.removeEvent('abort error');
                          //     }
                          // });
                          node.removeEvent('loadedmetadata loadeddata abort error stalled');
                          node.remove();
                        };

                        var addSrc = function () {
                          var _src = node.attr('data-src');

                          if (_src) {
                            node.attr('src', _src);
                          }

                          $J.$A(node.node.children).forEach(function (child) {
                            child = $(child);

                            if (child && child.getTagName() === 'source') {
                              _src = child.attr('data-src');

                              if (_src) {
                                child.attr('src', _src);
                              }
                            }
                          });
                        };

                        addSrc();
                        node.setCss({
                          top: -100000,
                          left: -100000,
                          width: 200,
                          height: 150,
                          position: 'absolute'
                        });
                        node.muted = true;
                        node.addEvent('loadedmetadata', function (e) {
                          var size = node.getSize();

                          if (!size.width || !size.height) {
                            size.width = 200;
                            size.height = 150;
                          }

                          node.setCss({
                            width: size.width,
                            height: size.height
                          });
                          canvas.node.width = size.width;
                          canvas.node.height = size.height;

                          if (timeOfPoster < node.node.duration) {
                            node.node.currentTime = timeOfPoster;
                          }
                        }); // $J.$A(node.node.children).forEach(function (child) {
                        //     child = $(child);
                        //     if (child && child.getTagName() === 'source') {
                        //         child.addEvent('abort error', function (e) {
                        //             clear();
                        //             callback(null);
                        //         });
                        //     }
                        // });

                        node.addEvent('loadeddata', function (e) {
                          node.currentTime = timeOfPoster;
                        });
                        node.addEvent('abort error stalled', function (e) {
                          clear();
                          reject(null);
                        });
                        node.addEvent('seeked', function (e) {
                          context.drawImage(node.node, 0, 0, canvas.node.width, canvas.node.height);
                          clear();

                          try {
                            thumbUrl = canvas.node.toDataURL();
                          } catch (ex) {// empty
                          }

                          if (thumbUrl) {
                            if (!sources[src]) {
                              sources[src] = {};
                            }

                            sources[src].aspectratio = api.aspectratio;

                            if (getAll) {
                              sources[src].all = {
                                thumbnail: {
                                  url: thumbUrl,
                                  width: 200,
                                  height: 150
                                },
                                medium: {
                                  url: thumbUrl,
                                  width: 200,
                                  height: 150
                                }
                              };
                              resolve(sources[src].all);
                            } else {
                              sources[src].url = thumbUrl;
                              resolve(thumbUrl);
                            }
                          } else {
                            resolve(thumbUrl);
                          }
                        });
                        node.appendTo($J.D.node.body);
                        node.node.load();
                      }
                    } else {
                      resolve(thumbUrl);
                    }

                    break;

                  default:
                    resolve(thumbUrl);
                }
              } else {
                resolve(thumbUrl);
              }
            });
          },
          getSrc: getSrc,
          getAPI: getAPI
        };
        return api;
      }();

      return helper;
    });
    Sirv.define('EventEmitter', ['bHelpers', 'magicJS', 'helper'], function (bHelpers, magicJS, helper) {
      var moduleName = 'EventEmitter';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* global helper */

      /* eslint-disable indent */

      /* eslint-disable no-console */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
      // eslint-disable-next-line no-unused-vars

      var EventObject = /*#__PURE__*/function () {
        "use strict";

        function EventObject(type, direction, data) {
          this.type = type;
          this.direction = direction;
          this.propagation = true;
          this.nextCalls = true;
          this.emptyEvent = true;
          this.data = $J.extend(data, {
            eventType: this.type,
            eventDirection: this.direction,
            stopEmptyEvent: this.stopEmptyEvent.bind(this),
            stopPropagation: this.stopPropagation.bind(this),
            stopNextCalls: this.stopNextCalls.bind(this),
            stop: this.stop.bind(this),
            stopAll: this.stopAll.bind(this)
          });
        }

        var _proto13 = EventObject.prototype;

        _proto13.copyData = function copyData() {
          var result = {};
          helper.objEach(this.data, function (key, value) {
            if (!$J.contains(['eventDirection', 'stopEmptyEvent', 'stopPropagation', 'stopNextCalls', 'stop', 'stopAll'], key)) {
              result[key] = value;
            }
          });
          return result;
        };

        _proto13.getCustomData = function getCustomData() {
          return this.data;
        };

        _proto13.getDirection = function getDirection() {
          return this.direction;
        };

        _proto13.isEmptyEventStopped = function isEmptyEventStopped() {
          return !this.emptyEvent;
        };

        _proto13.isPropagationStopped = function isPropagationStopped() {
          return !this.propagation;
        };

        _proto13.isNextCallsStopped = function isNextCallsStopped() {
          return !this.nextCalls;
        };

        _proto13.stopEmptyEvent = function stopEmptyEvent() {
          this.emptyEvent = false;
        };

        _proto13.stopPropagation = function stopPropagation() {
          this.propagation = false;
        };

        _proto13.stopNextCalls = function stopNextCalls() {
          this.nextCalls = false;
        };

        _proto13.stop = function stop() {
          this.stopPropagation();
          this.stopEmptyEvent();
        };

        _proto13.stopAll = function stopAll() {
          this.stop();
          this.stopNextCalls();
        };

        return EventObject;
      }();
      /* eslint-env es6 */

      /* global EventObject */

      /* eslint-disable indent */

      /* eslint-disable no-console */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */


      var correctName = function (name, defaultName) {
        if ($J.typeOf(name) === 'string') {
          name = name.trim();

          if (name === '') {
            name = defaultName;
          }
        } else {
          name = defaultName;
        }

        return name;
      }; // eslint-disable-next-line no-unused-vars


      var EmitterInstance = /*#__PURE__*/function () {
        "use strict";

        function EmitterInstance() {
          this.__parent = null;
          this.__childs = $([]);
          this.__subscribers = {};
          this.__NAME_OF_EMPTY_EVENT = '__empty__';
        }

        var _proto14 = EmitterInstance.prototype;

        _proto14.__setChild = function __setChild(child) {
          this.__childs.push(child);
        };

        _proto14.__removeChild = function __removeChild(child) {
          var idx = this.__childs.indexOf(child);

          if (idx !== -1) {
            this.__childs.splice(idx, 1);
          }
        };

        _proto14.setParent = function setParent(parent) {
          this.__parent = parent;

          this.__parent.__setChild(this);
        };

        _proto14.__removeParent = function __removeParent() {
          if (this.__parent) {
            this.__parent.__removeChild(this);

            this.__parent = null;
          }
        };

        _proto14.__callNext = function __callNext(event) {
          if (!event.isPropagationStopped()) {
            if (event.getDirection() === 'up') {
              if (this.__parent) {
                this.__parent.__next(event);
              }
            } else {
              this.__childs.forEach(function (child) {
                child.__next(event);
              });
            }
          }
        };

        _proto14.__next = function __next(event) {
          var callbacks = this.__subscribers[event.type];
          event = new EventObject(event.type, event.direction, event.copyData());

          if (callbacks) {
            for (var i = 0; i < callbacks.length; i++) {
              callbacks[i](event.getCustomData(), event, this);

              if (event.isNextCallsStopped()) {
                break;
              }
            }
          }

          if (Object.prototype.hasOwnProperty.call(this.__subscribers, this.__NAME_OF_EMPTY_EVENT) && !event.isEmptyEventStopped()) {
            for (var _i = 0; _i < this.__subscribers[this.__NAME_OF_EMPTY_EVENT].length; _i++) {
              this.__subscribers[this.__NAME_OF_EMPTY_EVENT][_i](event.getCustomData());
            }
          }

          this.__callNext(event);
        };

        _proto14.emit = function emit(type, data) {
          // up
          if (!data || $J.typeOf(data) !== 'object') {
            if ($J.typeOf(type) === 'object') {
              data = type;
              type = null;
            } else {
              data = {};
            }
          }

          type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

          this.__callNext(new EventObject(type, 'up', data));
        };

        _proto14.broadcast = function broadcast(type, data) {
          // down
          if (!data || $J.typeOf(data) !== 'object') {
            if ($J.typeOf(type) === 'object') {
              data = type;
              type = null;
            } else {
              data = {};
            }
          }

          type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

          this.__callNext(new EventObject(type, 'down', data));
        };

        _proto14.on = function on(type, fn) {
          var self = this;

          if ($J.typeOf(type) === 'function') {
            fn = type;
            type = null;
          }

          if (!fn) {
            return null;
          }

          type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

          if (!this.__subscribers[type]) {
            this.__subscribers[type] = [];
          }

          this.__subscribers[type].push(fn);

          return function () {
            return self.off(type, fn);
          };
        };

        _proto14.off = function off(type, fn) {
          var idx;

          if ($J.typeOf(type) === 'function') {
            fn = type;
            type = null;
          }

          type = correctName(type, this.__NAME_OF_EMPTY_EVENT);

          if (!fn) {
            delete this.__subscribers[type];
          } else if (Object.prototype.hasOwnProperty.call(this.__subscribers, type)) {
            idx = this.__subscribers[type].indexOf(fn);

            if (idx !== -1) {
              this.__subscribers[type].splice(idx, 1);
            }
          }
        };

        _proto14.destroy = function destroy() {
          this.__removeParent();

          this.__childs = $([]);
          this.__subscribers = {};
        };

        return EmitterInstance;
      }();

      return EmitterInstance;
    });
    Sirv.define('EventManager', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'EventEmitter', 'helper'], function (bHelpers, magicJS, globalVariables, globalFunctions, EventEmitter, helper) {
      var moduleName = 'EventManager';
      var $J = magicJS;
      var $ = $J.$;
      /* global $, $J, EventEmitter, helper */

      /* eslint-env es6 */
      // eslint-disable-next-line no-unused-vars

      var EventManager = /*#__PURE__*/function (_EventEmitter) {
        "use strict";

        bHelpers.inheritsLoose(EventManager, _EventEmitter);

        function EventManager(items) {
          var _this26;

          _this26 = _EventEmitter.call(this) || this;
          _this26.items = items;
          _this26.events = {
            lazyimage: {},
            viewer: {},
            spin: {},
            // viewer component
            zoom: {},
            // viewer component
            image: {},
            // viewer component
            video: {} // viewer component

          };
          _this26.reversedEvents = [];

          _this26.setEvents();

          return _this26;
        }

        EventManager.eventsNameParser = function eventsNameParser(eventName) {
          var result = null;

          if (eventName && $J.typeOf(eventName) === 'string') {
            result = eventName.split(':').map(function (v) {
              return v.trim();
            }).filter(function (v) {
              return v !== '';
            });

            if (/sirv/i.test(result[0])) {
              result.shift();
            }

            if (result.length < 2) {
              result = null;
            }
          }

          return result;
        }
        /**
         * Trigger a DOM event
         * @param {String} eventType A name of the event.
         * @param {DOM Element} element The targe DOM element.
         * @param {Object} [detail] Additional event details.
         * @param {Boolean} [bubbles] Defines whether the event should bubble up through the event chain or not.
         * @param {Boolean} [cancelable] Defines whether the event can be canceled.
         */
        ;

        EventManager.triggerCustomEvent = function triggerCustomEvent(eventType, element, detail, bubbles, cancelable) {
          if (bubbles === $J.U) {
            bubbles = true;
          }

          if (cancelable === $J.U) {
            cancelable = true;
          }

          var event;

          try {
            event = new CustomEvent(eventType, {
              bubbles: bubbles,
              cancelable: cancelable,
              detail: detail
            });
          } catch (e) {
            try {
              event = $J.D.createEvent('Event');
              event.initEvent(eventType, bubbles, cancelable);
              event.detail = detail;
            } catch (ex) {
              /* empty */
            }
          }

          if (event) {
            element.node.dispatchEvent(event);
          }
        };

        var _proto15 = EventManager.prototype;

        _proto15.addReverseEvent = function addReverseEvent(eventName, callback, componentName) {
          this.reversedEvents.push({
            eventName: eventName,
            componentName: componentName,
            callback: callback
          });
        };

        _proto15.callReverseCallback = function callReverseCallback(componentName, eventName, eventData) {
          var result = false;

          for (var i = 0, l = this.reversedEvents.length; i < l; i++) {
            if (this.reversedEvents[i].componentName === componentName && this.reversedEvents[i].eventName === eventName) {
              this.reversedEvents[i].callback(eventData);
              this.reversedEvents.splice(i, 1);
              result = true;
              break;
            }
          }

          return result;
        };

        _proto15.setEvents = function setEvents() {
          var _this27 = this;

          this.on('destroy', function (e) {
            e.stopAll();
            globalFunctions.stop(e.data.node, 'viewer');
          });
          /*
              'onLoad'
          */

          this.on('imagePublicEvent', function (e) {
            e.stopAll();

            var isReversed = _this27.callReverseCallback('lazyimage', e.data.type, e.data.image);

            if (!isReversed) {
              EventManager.triggerCustomEvent('sirv:lazyimage:' + e.data.type, e.data.node, $J.extend({}, e.data.image));
              var evs = _this27.events.lazyimage[e.data.type];

              if (evs) {
                evs.forEach(function (callback) {
                  callback(e.data.image);
                });
              }
            }
          });
          /*
              viewer events
              'ready', 'fullscreenIn', 'fullscreenOut', 'beforeSlideIn', 'beforeSlideOut', 'afterSlideIn', 'afterSlideOut', 'enableItem', 'disableItem'
          */

          this.on('viewerPublicEvent', function (e) {
            e.stopAll();
            var node;
            var type;
            var eventData;
            var componentName = 'viewer';

            if (e.data.slider.type === 'componentEvent') {
              type = e.data.type;
              eventData = $J.extend({}, e.data.slide[e.data.slide.component]);
              componentName = e.data.slide.component;

              if (e.data.node) {
                node = e.data.componentEventData.node;
              }

              helper.objEach(e.data.componentEventData, function (key, value) {
                if (key === 'node') {
                  if (e.data.node) {
                    eventData[key] = value.node;
                  }
                } else if (key !== 'type') {
                  eventData[key] = value;
                }
              });
            } else {
              type = e.data.slider.type;

              if (type === 'ready') {
                globalFunctions.iconsHash.remove();
              }

              if (e.data.node) {
                node = e.data.node;
              }

              if (e.data.slider) {
                eventData = e.data.slider;

                if (type === 'sendStats') {
                  eventData.statsData = e.data.event;
                }
              }

              if ($J.contains(['beforeSlideIn', 'beforeSlideOut', 'afterSlideIn', 'afterSlideOut', 'enableItem', 'disableItem', 'thumbnailClick'], type)) {
                eventData = e.data.slide;
              }
            }

            var isReversed = _this27.callReverseCallback(componentName, type, eventData);

            if (!isReversed) {
              if (node) {
                EventManager.triggerCustomEvent('sirv:' + componentName + ':' + type, node, $J.extend({}, eventData));
              }

              var evs = _this27.events[componentName][type];

              if (evs) {
                evs.forEach(function (callback) {
                  callback(eventData);
                });
              }
            }
          });
          this.on(function (e) {
            e.stopAll();
          });
        };

        _proto15.addEvent = function addEvent(eventName, callback) {
          var _this28 = this;

          var result = function () {
            return false;
          };

          var events = EventManager.eventsNameParser(eventName);

          if (events && this.events[events[0]] && callback) {
            if (!this.events[events[0]][events[1]]) {
              this.events[events[0]][events[1]] = [];
            }

            this.events[events[0]][events[1]].push(callback);

            if ($J.contains(['ready', 'init', 'onLoad'], events[1])) {
              var itemName = events[0] === 'lazyimage' ? 'image' : 'viewer';

              if (itemName === 'viewer' && events[1] !== 'onLoad' || events[1] === 'onLoad' && itemName === 'image') {
                /*
                    we need the timeout because every event returns function which can remove this event
                     for example:
                    if event 'ready' already was
                    and we set new one
                    the variable 'removeReadyEvent' will be undefined
                     const removeReadyEvent = Sirv.on('viewer:ready', (e) => {
                        removeReadyEvent();
                    });
                */
                setTimeout(function () {
                  var items = _this28.items[itemName];
                  items.forEach(function (item) {
                    if (item.checkReadiness(events[1], events[0])) {
                      _this28.addReverseEvent(events[1], callback, events[0]);

                      item.sendEvent(events[1], events[0]);
                    }
                  });
                }, 0);
              }
            }

            result = function () {
              return _this28.removeEvent(eventName, callback);
            };
          }

          return result;
        };

        _proto15.removeEvent = function removeEvent(eventName, callback) {
          var events = EventManager.eventsNameParser(eventName);

          if (events && this.events[events[0]] && this.events[events[0]][events[1]]) {
            if (callback) {
              var index = this.events[events[0]][events[1]].indexOf(callback);

              if (index >= 0) {
                this.events[events[0]][events[1]].splice(index, 1);
                return true;
              }
            } else {
              delete this.events[events[0]][events[1]];
              return true;
            }
          }

          return false;
        };

        return EventManager;
      }(EventEmitter);

      return EventManager;
    });
    Sirv.define('ContextMenu', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions'], function (bHelpers, magicJS, globalVariables, globalFunctions) {
      var moduleName = 'ContextMenu';
      var $J = magicJS;
      var $ = $J.$;
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

        var _proto16 = ContextmenuInstance.prototype;

        _proto16.isExist = function isExist(idOfItem) {
          return !!this.items[idOfItem];
        };

        _proto16.setup = function setup(data) {
          var _this29 = this;

          this.context = $J.$new('ul').addClass(this.CSS_CLASS).addEvent('contextmenu dragstart selectstart', function (e) {
            e.stop();
          });
          data.forEach(function (item) {
            _this29.addItem(item);
          });
          this.hideFX = new $J.FX(this.context, {
            duration: 200,
            onComplete: function () {
              _this29.context.remove();
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
            if (!_this29.active) {
              return;
            }

            e.stop();

            if (e.getOriginEvent().keyCode === 27) {
              // Esc
              _this29.hide();
            }
          }).bind(this);
          $J.W.addEvent('keydown', this.hideBind, 1); // eslint-disable-next-line no-unused-vars

          this.hideOnScrollBind = $(function (e) {
            if (!_this29.active) {
              return;
            }

            _this29.hide();
          }).bind(this);
          $J.W.addEvent('scroll', this.hideOnScrollBind);
        };

        _proto16.addItem = function addItem(data) {
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

        _proto16.hideItem = function hideItem(id) {
          if (this.items[id]) {
            $(this.items[id]).setCss({
              display: 'none'
            });
          }
        };

        _proto16.showItem = function showItem(id) {
          if (this.items[id]) {
            $(this.items[id]).setCss({
              display: ''
            });
          }
        };

        _proto16.disableItem = function disableItem(id) {
          if (this.items[id]) {
            $(this.items[id]).attr('disabled', true);
          }
        };

        _proto16.enableItem = function enableItem(id) {
          if (this.items[id]) {
            $(this.items[id]).removeAttr('disabled');
          }
        };

        _proto16.show = function show(e) {
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

        _proto16.hide = function hide(e) {
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

        _proto16.setCanShow = function setCanShow(canShow) {
          this.canShow = canShow;
        };

        _proto16.setFullScreenBox = function setFullScreenBox(fullScreenBox) {
          this.setFullScreenBox = fullScreenBox;
        };

        _proto16.destroy = function destroy() {
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
    Sirv.define('BaseInstance', ['bHelpers', 'magicJS', 'EventEmitter', 'helper'], function (bHelpers, magicJS, EventEmitter, helper) {
      var moduleName = 'BaseInstance';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* eslint-disable indent */

      /* global EventEmitter, helper */

      /* eslint-disable class-methods-use-this */

      /* eslint-disable no-unused-vars */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      var DEFAULT_PREFIX = 'smv-';

      var BaseInstance = /*#__PURE__*/function (_EventEmitter2) {
        "use strict";

        bHelpers.inheritsLoose(BaseInstance, _EventEmitter2);

        function BaseInstance(node, options, defaultSchema) {
          var _this30;

          _this30 = _EventEmitter2.call(this) || this;
          _this30.defaultSchema = defaultSchema;
          _this30.options = options;
          _this30.instanceNode = $(node);
          _this30.instanceUrl = _this30.instanceNode.attr('data-src') || _this30.instanceNode.attr('src') || _this30.instanceNode.attr('data-bg-src');
          _this30.option = null;
          _this30._isReady = false;
          _this30.id = null;
          _this30.isCustomId = false;
          _this30.isStartedFullInit = false;
          _this30.isStarted = false;
          _this30.destroyed = false;
          _this30.referrerPolicy = _this30.instanceNode.attr('data-referrerpolicy') || _this30.instanceNode.attr('referrerpolicy') || 'no-referrer-when-downgrade';
          _this30.instanceOptions = _this30.makeOptions();

          _this30.createOptionFunction();

          _this30.api = {
            isReady: _this30.isReady.bind(bHelpers.assertThisInitialized(_this30)),
            resize: _this30.resize.bind(bHelpers.assertThisInitialized(_this30)),
            getOptions: _this30.getOptions.bind(bHelpers.assertThisInitialized(_this30))
          };
          return _this30;
        }

        var _proto17 = BaseInstance.prototype;

        _proto17.setOptions = function setOptions(optInstance, common, local, attr) {
          optInstance.fromJSON(common);
          optInstance.fromString(local);
          optInstance.fromString(attr);
          return optInstance;
        };

        _proto17.makeGlobalOptions = function makeGlobalOptions(optionsInstance) {
          var o = this.options.options;
          return this.setOptions(optionsInstance, o.common.common, o.local.common, this.instanceNode.attr('data-options') || '');
        };

        _proto17.makeMobileOptions = function makeMobileOptions(optionsInstance) {
          var o = this.options.options;
          return this.setOptions(optionsInstance, o.common.mobile, o.local.mobile, this.instanceNode.attr('data-mobile-options') || '');
        };

        _proto17.makeOptions = function makeOptions() {
          var options = new $J.Options(this.defaultSchema);
          options = this.makeGlobalOptions(options);

          if ($J.browser.touchScreen && $J.browser.mobile) {
            options = this.makeMobileOptions(options);
          }

          return options;
        };

        _proto17.getOptionsForStartFullInit = function getOptionsForStartFullInit(options) {
          if (options) {
            this.options.options = options;
            this.instanceOptions = this.makeOptions();
            this.createOptionFunction();
          }
        };

        _proto17.isReady = function isReady() {
          return this._isReady;
        };

        _proto17.getOptions = function getOptions() {
          return this.instanceOptions.getJSON();
        };

        _proto17.resize = function resize() {
          if (this._isReady) {
            return this.onResize();
          }

          return false;
        };

        _proto17.onResize = function onResize() {
          return true;
        };

        _proto17.getImageClassContainer = function getImageClassContainer() {
          return {};
        };

        _proto17.checkImage = function checkImage(setts, dontLoad) {
          var result;
          var imageClass = this.getImageClassContainer();

          if (dontLoad) {
            result = imageClass.isExist(setts); // because we do not load images with imageclass
          } else {
            result = imageClass.isLoaded(setts);
          }

          return result;
        };

        _proto17.getId = function getId(idPrefix, df) {
          this.id = this.instanceNode.attr('id');

          if (!this.id) {
            this.isCustomId = true;

            if (!idPrefix) {
              idPrefix = 'component-';
            }

            if (!df) {
              df = DEFAULT_PREFIX;
            }

            this.id = df + idPrefix + helper.generateUUID();
            this.id = this.id.trim();
            this.instanceNode.attr('id', this.id);
          }
        };

        _proto17.createOptionFunction = function createOptionFunction() {
          var _this31 = this;

          this.option = function () {
            if (arguments.length > 1) {
              return _this31.instanceOptions.set(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
            }

            return _this31.instanceOptions.get(arguments.length <= 0 ? undefined : arguments[0]);
          };
        };

        _proto17.startFullInit = function startFullInit(options) {
          if (this.destroyed || this.isStartedFullInit) {
            return;
          }

          this.isStartedFullInit = true;
          this.getOptionsForStartFullInit(options);
        };

        _proto17.getOriginImageUrl = function getOriginImageUrl() {} // instance 'start' metod rename to 'run'
        ;

        _proto17.run = function run() {
          if (!this.isStarted) {
            this.isStarted = true;
            return true;
          }

          return false;
        };

        _proto17.done = function done() {
          this._isReady = true;
        };

        _proto17.destroy = function destroy() {
          this.destroyed = true;
          this.isStarted = false;
          this._isReady = false;
          this.isStartedFullInit = false;

          if (this.isCustomId) {
            this.instanceNode.removeAttr('id');
            this.isCustomId = false;
          }

          this.instanceNode = null;

          _EventEmitter2.prototype.destroy.call(this);
        };

        return BaseInstance;
      }(EventEmitter);

      return BaseInstance;
    });
    Sirv.define('Instance', ['bHelpers', 'magicJS', 'Promise!', 'globalVariables', 'BaseInstance', 'helper'], function (bHelpers, magicJS, Promise, globalVariables, BaseInstance, helper) {
      var moduleName = 'Instance';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* eslint-disable indent */

      /* global BaseInstance */

      /* global helper */

      /* eslint-disable class-methods-use-this */

      /* eslint-disable no-unused-vars */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
      // eslint-disable-next-line no-unused-vars

      var createError = function (name) {
        return new Error('This method \'' + name + '\' is not implemented.');
      };

      var Instance = /*#__PURE__*/function (_BaseInstance) {
        "use strict";

        bHelpers.inheritsLoose(Instance, _BaseInstance);

        function Instance(node, options, defaultSchema) {
          var _this32;

          _this32 = _BaseInstance.call(this, node, options, defaultSchema) || this;
          _this32.type = globalVariables.SLIDE.TYPES.NONE;
          _this32.always = options.always;
          _this32.quality = options.quality;
          _this32.hdQuality = options.hdQuality;
          _this32.isHDQualitySet = options.isHDQualitySet;
          _this32.isFullscreenEnabled = options.isFullscreen;
          _this32.dataAlt = null;
          _this32.isSlideShown = false;
          _this32.isInView = false;
          _this32.preload = false;
          _this32.firstSlideAhead = false;
          _this32.infoSize = null;
          _this32.pinchCloud = null;
          _this32.onLoad = false;
          _this32.waitToStart = new helper.WaitToStart();
          _this32.waitGettingInfo = new helper.WaitToStart();
          _this32.gettingInfoPromise = null;
          _this32.fullscreenState = globalVariables.FULLSCREEN.CLOSED;

          _this32.on('stats', function (e) {
            e.data.component = globalVariables.SLIDE.NAMES[_this32.type];
          });

          return _this32;
        }

        var _proto18 = Instance.prototype;

        _proto18.sendEvent = function sendEvent(typeOfEvent, data) {
          if (!data) {
            data = {};
          }

          if (!data.event) {
            data.event = {};
          }

          data.id = this.id;
          data.url = this.instanceUrl;
          data.event.timestamp = +new Date();
          data.event.type = globalVariables.SLIDE.NAMES[this.type] + ':' + typeOfEvent;
          this.emit('componentEvent', {
            data: {
              type: typeOfEvent,
              data: data
            }
          });
        };

        _proto18.onStartActions = function onStartActions() {};

        _proto18.onStopActions = function onStopActions() {};

        _proto18.onInView = function onInView(value) {};

        _proto18.onBeforeFullscreenIn = function onBeforeFullscreenIn(data) {};

        _proto18.onAfterFullscreenIn = function onAfterFullscreenIn(data) {};

        _proto18.onBeforeFullscreenOut = function onBeforeFullscreenOut(data) {};

        _proto18.onAfterFullscreenOut = function onAfterFullscreenOut(data) {};

        _proto18.onMouseAction = function onMouseAction(type) {};

        _proto18.onSecondSelectorClick = function onSecondSelectorClick() {};

        _proto18.onStopContext = function onStopContext() {};

        _proto18.loadContent = function loadContent() {
          return true;
        };

        _proto18.loadThumbnail = function loadThumbnail() {
          if (!this.destroyed) {
            this.waitToStart.start();
            return true;
          }

          return false;
        };

        _proto18.startGettingInfo = function startGettingInfo() {
          if (!this.destroyed) {
            this.waitGettingInfo.start();
            return true;
          }

          return false;
        };

        _proto18.startFullInit = function startFullInit(options) {
          var _this33 = this;

          if (this.isStartedFullInit) {
            return;
          }

          _BaseInstance.prototype.startFullInit.call(this, options);

          if (options) {
            this.always = options.always;
          }

          this.dataAlt = this.instanceNode.attr('data-alt');
          this.on('startActions', function (e) {
            e.stop();
            _this33.isSlideShown = true;

            _this33.onStartActions(e.who);
          });
          this.on('stopActions', function (e) {
            e.stop();
            _this33.isSlideShown = false;

            _this33.onStopActions();
          });
          this.on('inView', function (e) {
            e.stop();
            var iv = e.data;

            _this33.onInView(iv);

            _this33.isInView = iv;
          });
          this.setEvents();
        };

        _proto18.isFullscreenActionEnded = function isFullscreenActionEnded() {
          return $J.contains([globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.OPENED], this.fullscreenState);
        };

        _proto18.setEvents = function setEvents() {
          var _this34 = this;

          this.on('beforeFullscreenIn', function (e) {
            e.stop();

            if (_this34.fullscreenState === globalVariables.FULLSCREEN.OPENED || _this34.destroyed) {
              return;
            }

            _this34.fullscreenState = globalVariables.FULLSCREEN.OPENING;

            _this34.onBeforeFullscreenIn(e.data);
          });
          this.on('afterFullscreenIn', function (e) {
            e.stop();

            if (!_this34.destroyed) {
              _this34.fullscreenState = globalVariables.FULLSCREEN.OPENED;

              _this34.onAfterFullscreenIn(e.data);
            }
          });
          this.on('beforeFullscreenOut', function (e) {
            e.stop();

            if (_this34.fullscreenState === globalVariables.FULLSCREEN.CLOSED || _this34.destroyed) {
              return;
            }

            _this34.fullscreenState = globalVariables.FULLSCREEN.CLOSING;

            _this34.onBeforeFullscreenOut(e.data);
          });
          this.on('afterFullscreenOut', function (e) {
            e.stop();

            if (!_this34.destroyed) {
              _this34.fullscreenState = globalVariables.FULLSCREEN.CLOSED;

              _this34.onAfterFullscreenOut(e.data);
            }
          });
        };

        _proto18.getOriginImageUrl = function getOriginImageUrl() {
          throw createError('getInfoSize');
        };

        _proto18.getSelectorImgUrl = function getSelectorImgUrl(data) {
          return Promise.reject(createError('getSelectorImgUrl'));
        };

        _proto18.getInfoSize = function getInfoSize() {
          return Promise.reject(createError('getInfoSize'));
        };

        _proto18.run = function run(isShown, preload, firstSlideAhead) {
          var result = _BaseInstance.prototype.run.call(this);

          if (result) {
            this.isSlideShown = isShown;
            this.preload = preload;
            this.firstSlideAhead = firstSlideAhead;

            if (!this.firstSlideAhead) {
              this.waitToStart.start();
            }
          }

          return result;
        };

        _proto18.getThumbnailData = function getThumbnailData() {
          return {
            src: null
          };
        };

        _proto18.getSocialButtonData = function getSocialButtonData(data) {
          var opt = data;

          if (this.infoSize.width < data.width || this.infoSize.height < data.height) {
            opt.width = this.infoSize.width;
            opt.height = this.infoSize.height;
          }

          var thumbnailData = this.getThumbnailData(opt);
          return thumbnailData.src;
        };

        _proto18.createPinchEvent = function createPinchEvent(node) {
          var _this35 = this;

          var pinchCloud = {
            isAdded: false,
            pinch: false,
            scale: 0,
            block: false,
            onPinchStart: function (e) {},
            onPinchResize: function (e) {},
            onPinchMove: function (e) {},
            onPinchEnd: function (e) {
              if (pinchCloud.pinch) {
                pinchCloud.pinch = false;

                _this35.sendEvent('pinchEnd');
              }

              pinchCloud.block = false;
            },
            handler: function (e) {
              switch (e.state) {
                case 'pinchstart':
                  pinchCloud.onPinchStart(e);
                  break;

                case 'pinchresize':
                  pinchCloud.onPinchResize(e);
                  break;

                case 'pinchmove':
                  pinchCloud.onPinchMove(e);
                  break;

                case 'pinchend':
                  pinchCloud.onPinchEnd(e);
                  break;

                default:
              }

              if (pinchCloud.pinch) {
                e.stop();
              }
            },
            addEvent: function () {
              if (!pinchCloud.isAdded && $J.browser.touchScreen) {
                node.addEvent('pinch', pinchCloud.handler);
                pinchCloud.isAdded = true;
              }
            },
            removeEvent: function () {
              if (pinchCloud.isAdded) {
                node.removeEvent('pinch', pinchCloud.handler);
                pinchCloud.isAdded = false;
                pinchCloud.block = false;
                pinchCloud.pinch = false;
              }
            }
          };
          pinchCloud.addEvent();
          this.pinchCloud = pinchCloud;
        };

        _proto18.done = function done() {
          var _this36 = this;

          _BaseInstance.prototype.done.call(this);

          this.createPinchEvent();
          this.on('resize', function (e) {
            e.stop();

            _this36.onResize();
          });
          this.on('stopContext', function (e) {
            e.stop();

            _this36.onStopContext();
          });
          this.on('secondSelectorClick', function (e) {
            e.stopAll();

            _this36.onSecondSelectorClick();
          });
          this.on('mouseAction', function (e) {
            e.stop();

            _this36.onMouseAction(e.data.type);
          });
          this.on('dragEvent', function (e) {
            e.stop();

            if (_this36.pinchCloud) {
              if (e.data.type === 'dragstart') {
                _this36.pinchCloud.removeEvent();
              } else if (e.data.type === 'dragend') {
                _this36.pinchCloud.addEvent();
              }
            }
          });
          this.sendEvent('ready');
        };

        _proto18.sendContentLoadedEvent = function sendContentLoadedEvent() {
          if (!this.onLoad) {
            this.onLoad = true;
            this.sendEvent('contentLoaded');
          }
        };

        _proto18.destroy = function destroy() {
          this.off('stats');
          this.off('startActions');
          this.off('stopActions');
          this.off('inView');
          this.off('resize');
          this.off('stopContext');
          this.off('secondSelectorClick');
          this.off('mouseAction');
          this.off('dragEvent');
          this.off('beforeFullscreenIn');
          this.off('afterFullscreenIn');
          this.off('beforeFullscreenOut');
          this.off('afterFullscreenOut');
          this.pinchCloud = null;
          this.isSlideShown = false;

          _BaseInstance.prototype.destroy.call(this);

          this.waitGettingInfo.destroy();
          this.waitGettingInfo = null;
          this.waitToStart.destroy();
          this.waitToStart = null;
          this.gettingInfoPromise = null;
        };

        return Instance;
      }(BaseInstance);

      return Instance;
    });
    Sirv.define('HotspotInstance', ['bHelpers', 'magicJS', 'Promise!', 'Instance'], function (bHelpers, magicJS, Promise, Instance) {
      var moduleName = 'HotspotInstance';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* eslint-disable indent */

      /* global Instance */

      /* eslint-disable class-methods-use-this */

      /* eslint-disable no-unused-vars */

      /* eslint no-console: ["error", { allow: ["warn"] }] */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      var warn = function (v1, v2) {
        console.warn('sirv.js: The ' + v1 + ' method is deprecated and will be removed. \r\n           Use ' + v2 + ' instead.');
      }; // eslint-disable-next-line no-unused-vars


      var HotspotInstance = /*#__PURE__*/function (_Instance) {
        "use strict";

        bHelpers.inheritsLoose(HotspotInstance, _Instance);

        function HotspotInstance(node, options, defaultSchema) {
          var _this37;

          _this37 = _Instance.call(this, node, options, defaultSchema) || this; // this variable is usin in spin, zoom and image component

          _this37.hotspots = null; // API

          var this_ = bHelpers.assertThisInitialized(_this37);
          _this37.api = $J.extend(_this37.api, {
            addHotspot: function (hotspotsData) {
              warn('.addHotspot()', '.hotspots.add()');
              this_.hotspots.api.add(hotspotsData);

              if (this_.isInView && this_.isSlideShown) {
                this_.hotspots.showNeededElements();
              }
            },
            removeHotspot: function (index) {
              warn('.removeHotspot()', '.hotspots.remove()');
              this_.hotspots.api.remove(index);
            },
            removeAllHotspots: function () {
              warn('.removeAllHotspots()', '.hotspots.removeAll()');
              this_.hotspots.api.removeAll();
            },
            getHotspots: function () {
              warn('.getHotspots()', '.hotspots.list()');
              return this_.hotspots.api.list();
            }
          });
          return _this37;
        }

        var _proto19 = HotspotInstance.prototype;

        _proto19.createHotspotsClass = function createHotspotsClass(HotspotsClass, hotspotOptions) {
          var _this38 = this;

          this.hotspots = new HotspotsClass(hotspotOptions);
          this.hotspots.setParent(this);
          this.on('hotspotActivate', function (e) {
            e.stopAll();

            _this38.onHotspotActivate(e.data);

            _this38.sendEvent('hotspotOpened');
          });
          this.on('hotspotDeactivate', function (e) {
            e.stopAll();

            _this38.onHotspotDeactivate(e.data);

            _this38.sendEvent('hotspotClosed');
          });
          this.api = $J.extend(this.api, {
            hotspots: this.hotspots.api
          });
          var this_ = this;

          this.api.hotspots.add = function (hsData) {
            if (hsData) {
              var clientRect = null;

              if (!this_.hotspots.getHotspots().length) {
                var parentContainer = _this38.getParentContainer();

                clientRect = this_.hotspots.getRightBoundengClientRect(_this38.getContainerForBoundengClientRect());
                this_.hotspots.appendTo(parentContainer);
              }

              this_.hotspots.addHotspot(hsData);
              this_.hotspots.setContainerSize(clientRect);
              this_.hotspots.showAll();

              if (this_.isInView && this_.isSlideShown) {
                this_.hotspots.showNeededElements();
              }
            }
          };
        };

        _proto19.getContainerForBoundengClientRect = function getContainerForBoundengClientRect() {
          return this.getParentContainer();
        };

        _proto19.done = function done() {
          if (!this._isReady && !this.destroyed) {
            var parentContainer = this.getParentContainer();

            if (this.hotspots) {
              if (this.hotspotsData && this.hotspotsData.length) {
                this.hotspots.appendTo(parentContainer);
              }

              this.hotspots.createHotspots(this.hotspotsData);

              if (this.nativeFullscreen) {
                this.hotspots.changeBoxContainerParent(true);
              }

              this.hotspots.showAll();
            }
          }

          _Instance.prototype.done.call(this);
        };

        _proto19.getParentContainer = function getParentContainer() {
          var parentContainer = this.instanceNode;

          if (parentContainer.getTagName() === 'img') {
            parentContainer = $(parentContainer.node.parentNode);
          }

          return parentContainer;
        };

        _proto19.onHotspotActivate = function onHotspotActivate(data) {};

        _proto19.onHotspotDeactivate = function onHotspotDeactivate(data) {};

        _proto19.onStartActions = function onStartActions() {
          if (this.hotspots && this.isInView && this.isSlideShown) {
            this.hotspots.showNeededElements();
          }

          _Instance.prototype.onStartActions.call(this);
        };

        _proto19.onStopActions = function onStopActions() {
          if (this.hotspots) {
            this.hotspots.hideActiveHotspotBox(true);
          }

          _Instance.prototype.onStopActions.call(this);
        };

        _proto19.onBeforeFullscreenIn = function onBeforeFullscreenIn(data) {
          if (this.hotspots) {
            this.hotspots.hideActiveHotspotBox();

            if (this.nativeFullscreen) {
              this.hotspots.changeBoxContainerParent(true);
            }
          }
        };

        _proto19.onBeforeFullscreenOut = function onBeforeFullscreenOut(data) {
          if (this.hotspots) {
            this.hotspots.hideActiveHotspotBox();

            if (this.nativeFullscreen) {
              this.hotspots.changeBoxContainerParent();
            }
          }
        };

        _proto19.onAfterFullscreenOut = function onAfterFullscreenOut(data) {
          if (this.hotspots && this.isInView && this.isSlideShown) {
            this.hotspots.showNeededElements();
          }
        };

        _proto19.destroy = function destroy() {
          if (this.hotspots) {
            this.hotspots.destroy();
          }

          this.hotspots = null;
          this.off('hotspotActivate');
          this.off('hotspotDeactivate');

          _Instance.prototype.destroy.call(this);
        };

        return HotspotInstance;
      }(Instance);

      return HotspotInstance;
    });
    Sirv.define('Loader', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'EventEmitter'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper, EventEmitter) {
      var moduleName = 'Loader';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* global EventEmitter */

      /* global $J */

      /* global $ */

      /* eslint-disable indent */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      /* eslint dot-notation: ["error", { "allowKeywords": false }]*/
      // eslint-disable-next-line no-unused-vars

      var Loader = /*#__PURE__*/function (_EventEmitter3) {
        "use strict";

        bHelpers.inheritsLoose(Loader, _EventEmitter3);

        function Loader(parent, options) {
          var _this39;

          _this39 = _EventEmitter3.call(this) || this;
          _this39.parentNode = $(parent);
          _this39.options = $J.extend({
            width: null,
            height: null,
            'class': null
          }, options || {});
          _this39.node = $J.$new('div').addClass('smv-loader');
          _this39.type = 'simple';
          _this39.inDoc = false;

          if (_this39.options['class']) {
            _this39.node.addClass(_this39.options['class']);
          }

          if (_this39.options.width) {
            _this39.node.setCssProp('width', _this39.options.width);
          }

          if (_this39.options.height) {
            _this39.node.setCssProp('height', _this39.options.height);
          }

          return _this39;
        }

        var _proto20 = Loader.prototype;

        _proto20.append = function append() {
          if (!this.inDoc) {
            this.inDoc = true;
            this.parentNode.append(this.node);
          }
        };

        _proto20.show = function show() {
          this.append();
          this.node.setCss({
            display: '',
            visibility: 'visible'
          });
        };

        _proto20.hide = function hide() {
          this.node.setCss({
            display: 'none',
            visibility: 'hidden'
          });
        };

        _proto20.destroy = function destroy() {
          this.hide();
          this.node.remove();
          this.node = null;
          this.inDoc = false;

          _EventEmitter3.prototype.destroy.call(this);
        };

        return Loader;
      }(EventEmitter);

      return Loader;
    });
    Sirv.define('RoundLoader', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'Loader'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper, Loader) {
      var moduleName = 'RoundLoader';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* global Loader */

      /* global $J */

      /* eslint-disable indent */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      var SHOW_CLASS = 'smv-show'; // eslint-disable-next-line no-unused-vars

      var RoundLoader = /*#__PURE__*/function (_Loader) {
        "use strict";

        bHelpers.inheritsLoose(RoundLoader, _Loader);

        function RoundLoader(parent, options) {
          var _this40;

          _this40 = _Loader.call(this, parent, options) || this;
          _this40.type = 'round';
          _this40.state = globalVariables.APPEARANCE.HIDDEN;
          _this40.timer = null;
          _this40.loaderElement = $J.$new('div');

          _this40.addClass();

          _this40.node.append(_this40.loaderElement);

          return _this40;
        }

        var _proto21 = RoundLoader.prototype;

        _proto21.addClass = function addClass() {
          this.node.addClass('smv-round-loader');
        };

        _proto21.isHiding = function isHiding() {
          return this.state === globalVariables.APPEARANCE.HIDING;
        };

        _proto21.show = function show() {
          var _this41 = this;

          if ($J.contains([globalVariables.APPEARANCE.SHOWING, globalVariables.APPEARANCE.SHOWN], this.state)) {
            return;
          }

          this.state = globalVariables.APPEARANCE.SHOWING;
          this.timer = setTimeout(function () {
            _this41.timer = null;

            _this41.append();

            _this41.node.removeEvent('transitionend');

            _this41.node.addEvent('transitionend', function (e) {
              e.stop();
              _this41.state = globalVariables.APPEARANCE.SHOWN;
            });

            _this41.node.getSize(); // render


            _this41.node.addClass(SHOW_CLASS);
          }, 250);
        };

        _proto21.hide = function hide(force) {
          var _this42 = this;

          if (this.state === globalVariables.APPEARANCE.HIDDEN && !force) {
            return;
          }

          clearTimeout(this.timer);
          this.node.removeEvent('transitionend');

          if (this.state !== globalVariables.APPEARANCE.SHOWN) {
            force = true;
          }

          this.state = globalVariables.APPEARANCE.HIDING;

          if (!force) {
            this.node.addEvent('transitionend', function (e) {
              e.stop();

              _this42.node.remove();

              _this42.inDoc = false;
              _this42.state = globalVariables.APPEARANCE.HIDDEN;
            });
          } else {
            this.node.remove();
            this.inDoc = false;
            this.state = globalVariables.APPEARANCE.HIDDEN;
          }

          this.node.removeClass(SHOW_CLASS);
        };

        _proto21.destroy = function destroy() {
          this.hide(true);
          this.state = globalVariables.APPEARANCE.HIDDEN;
          this.node.innerHTML = '';

          _Loader.prototype.destroy.call(this);
        };

        return RoundLoader;
      }(Loader);

      return RoundLoader;
    });
    Sirv.define('ComponentLoader', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'RoundLoader'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper, RoundLoader) {
      var moduleName = 'ComponentLoader';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* global RoundLoader */

      /* global $J */

      /* eslint-disable indent */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      var setDefaultOptions = function (options) {
        if (!options) {
          options = {};
        }

        if (!options.width) {
          options.width = '100%';
        }

        if (!options.height) {
          options.height = '100%';
        }

        return options;
      }; // eslint-disable-next-line no-unused-vars


      var ComponentLoader = /*#__PURE__*/function (_RoundLoader) {
        "use strict";

        bHelpers.inheritsLoose(ComponentLoader, _RoundLoader);

        function ComponentLoader(parent, options) {
          var _this43;

          options = setDefaultOptions(options);
          _this43 = _RoundLoader.call(this, parent, options) || this;
          _this43.type = 'component';

          _this43.loaderElement.addClass('smv-bounce-wrapper').append($J.$new('div').addClass('smv-bounce1')).append($J.$new('div').addClass('smv-bounce2'));

          return _this43;
        }

        var _proto22 = ComponentLoader.prototype;

        _proto22.addClass = function addClass() {
          this.node.addClass('smv-component-loader');
        };

        _proto22.destroy = function destroy() {
          this.loaderElement.removeClass('smv-bounce-wrapper');
          this.loaderElement.node.innerHTML = '';

          _RoundLoader.prototype.destroy.call(this);
        };

        return ComponentLoader;
      }(RoundLoader);

      return ComponentLoader;
    });
    Sirv.define('ResponsiveImage', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'Promise!', 'helper', 'EventEmitter'], function (bHelpers, magicJS, globalVariables, globalFunctions, Promise, helper, EventEmitter) {
      var moduleName = 'ResponsiveImage';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* global Promise */

      /* global helper */

      /* eslint-disable indent */

      /* eslint-disable no-lonely-if*/

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      /*
          Image class
              params:
                  name - name of image
                  url - image url,
                  srcSettings - settings which has current image
                  srcsetSettings - x2 settings which has current image
      */
      // eslint-disable-next-line no-unused-vars

      var requestCORSIfNotSameOrigin = function (img, url) {
        if (new URL(url).origin !== $J.W.location.origin) {
          img.crossOrigin = '';
        }
      };

      var getUrl = function (url, settings) {
        // let result = url + ('?' + paramsToQueryString(settings).replace(/(?:\?|&)profile\=$/, ''));
        var result = url + ('?' + helper.paramsToQueryString(settings));
        result = helper.cleanQueryString(result);
        return result;
      }; // eslint-disable-next-line no-unused-vars


      var _Image = /*#__PURE__*/function () {
        "use strict";

        function _Image(name, url, srcSettings, srcsetSettings, dontLoad, referrerPolicy) {
          this.name = name;
          this.state = 0; // not-loaded = 0, loading = 1, loaded = 2, error = 3

          this.imageNode = null;
          this.size = {
            width: 0,
            height: 0
          };
          this.loader = null;
          this.callbacks = [];
          this.srcSettings = srcSettings;
          this.srcsetSettings = srcsetSettings;
          this.dontLoad = dontLoad;
          this.dppx = this.srcsetSettings ? this.srcsetSettings.dppx : 1;
          this.referrerPolicy = referrerPolicy;

          if (srcSettings.profile === '') {
            delete srcSettings.profile;
          }

          if (srcsetSettings && srcsetSettings.profile === '') {
            delete srcsetSettings.profile;
          }

          this.src = getUrl(url, srcSettings);
          this.srcset = null;

          if (srcsetSettings) {
            this.srcset = getUrl(url, srcsetSettings.settings);
          }
        }

        var _proto23 = _Image.prototype;

        _proto23.load = function load() {
          var _this44 = this;

          return new Promise(function (resolve, reject) {
            if (_this44.dontLoad) {
              resolve(_this44);
            } else if (!_this44.state) {
              _this44.state = 1;
              _this44.imageNode = $(new Image());

              _this44.imageNode.attr('referrerpolicy', _this44.referrerPolicy || 'no-referrer-when-downgrade');

              _this44.imageNode.addEvent('load', function (e) {
                e.stop();
                _this44.state = 2;
                _this44.size = {
                  width: _this44.imageNode.node.naturalWidth || _this44.imageNode.node.width,
                  height: _this44.imageNode.node.naturalHeight || _this44.imageNode.node.height
                };

                if ($J.browser.uaName === 'safari') {
                  var correct = false;

                  if (_this44.srcSettings.scale.width) {
                    if (_this44.size.width > _this44.srcSettings.scale.width + 5) {
                      correct = true;
                    }
                  } else {
                    if (_this44.size.height > _this44.srcSettings.scale.height + 5) {
                      correct = true;
                    }
                  }

                  if (correct) {
                    _this44.size.width /= _this44.dppx;
                    _this44.size.height /= _this44.dppx;
                  }
                }

                resolve(_this44);
              });

              _this44.imageNode.addEvent('error', function (e) {
                e.stop();
                _this44.state = 3;
                _this44.imageNode = null;
                reject(_this44);
              }); // requestCORSIfNotSameOrigin(this.imageNode.node, this.src);


              _this44.setSrc();

              _this44.setSrcset();
            } else {
              resolve(_this44);
            }
          });
        };

        _proto23.setSrc = function setSrc() {
          this.imageNode.node.src = this.src;
        };

        _proto23.setSrcset = function setSrcset() {
          if (this.srcset) {
            // TODO because amount of tiles are different between 1x image and 1.5x image
            // this.imageNode.node.srcset = encodeURI(this.srcset) + ' 2x';
            // this.imageNode.node.srcset = this.srcset + ' 2x';
            this.imageNode.node.srcset = this.srcset + ' ' + this.dppx + 'x';
          }
        };

        _proto23.isLoading = function isLoading() {
          return this.state === 1;
        };

        _proto23.destroy = function destroy() {
          if (this.state === 1 && this.imageNode) {
            this.imageNode.attr('src', 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=');
          }

          this.state = 0;
        };

        return _Image;
      }();
      /* eslint-env es6 */

      /* global _Image */

      /* eslint-disable indent */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
      // eslint-disable-next-line no-unused-vars


      var _TileImage = /*#__PURE__*/function (_Image2) {
        "use strict";

        bHelpers.inheritsLoose(_TileImage, _Image2);

        function _TileImage(name, url, srcSettings, srcsetSettings, dontLoad, referrerPolicy, tileName) {
          var _this45;

          _this45 = _Image2.call(this, name, url, srcSettings, srcsetSettings, dontLoad, referrerPolicy) || this;
          _this45.tileName = tileName; // name of tile

          return _this45;
        }

        var _proto24 = _TileImage.prototype;

        _proto24.setSrc = function setSrc() {
          if (this.dppx === 1) {
            // TODO because amount of tiles are different between 1x image and 1.5x image
            _Image2.prototype.setSrc.call(this);
          }
        };

        return _TileImage;
      }(_Image);
      /* eslint-env es6 */

      /* global _Image, _TileImage, helper, EventEmitter */

      /* eslint-disable indent */

      /* eslint-disable no-console */

      /* eslint-disable no-lonely-if */

      /* eslint no-prototype-builtins: "off" */

      /* eslint no-useless-escape: "off" */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      /* eslint class-methods-use-this: ["off", { "_createImageData": ["error"] }] */

      /*
          RImage class
          params:
              source - sirv image url
              o - options
              infoId - id for info object (to save in global object IMAGE_INFO) or will be generated automatically
      
          public functions:
              getClearSizeWithoutProcessingSettings
              isExist
              isLoaded
              isReady
              getOriginSize
              sendLoad
              cancelLoadingImage
              getImageName
              getImage
              getOriginImageUrl
              getProcessingSettings
              getThumbnail
              destroy
      
          public events:
              'imageOnload' - fire when the image was loaded
      
          example:
          this.images = {
              '123234345456' (it is name of image): {
                  serverWidth: 150,
                  serverHeight: 150,
                  image: _Image class
              },
          };
      
      */


      var splitOptions = function (imageSettings, dppx) {
        var src = $J.extend({}, imageSettings);
        var srcset;
        delete src.src;
        delete src.srcset;
        src.imageSettings = $J.extend({}, (imageSettings == null ? void 0 : imageSettings.imageSettings) || {});

        if (dppx > 1) {
          srcset = JSON.parse(JSON.stringify(src));

          if (srcset.width) {
            srcset.width = parseInt(srcset.width * dppx, 10);
          }

          if (srcset.height) {
            srcset.height = parseInt(srcset.height * dppx, 10);
          }

          if (srcset.imageSettings.crop) {
            if (srcset.imageSettings.crop.width) {
              srcset.imageSettings.crop.width = parseInt(srcset.imageSettings.crop.width * dppx, 10);
            }

            if (srcset.imageSettings.crop.height) {
              srcset.imageSettings.crop.height = parseInt(srcset.imageSettings.crop.height * dppx, 10);
            }
          }

          srcset.dppx = dppx;
        }

        src.imageSettings = $J.extend(src.imageSettings, imageSettings.src);

        if (srcset && imageSettings.srcset) {
          srcset.imageSettings = $J.extend(srcset.imageSettings, imageSettings.srcset);
        }

        return {
          src: src,
          srcset: srcset
        };
      };

      var getOriginUrl = function (source) {
        return source.split('?')[0];
      };

      var toPercentageString = function (v) {
        return (v * 100).toFixed(4) + '%';
      };

      var _getImageName = function (url) {
        var hash;
        var result = null; // eslint-disable-line prefer-const, no-unused-vars

        url = url.replace('\?+', '?');
        url = url.replace('&+', '&');
        url = url.split('?');
        hash = url[1];
        url = url[0];
        hash = hash.split('&');
        hash = hash.sort();
        return '' + $J.getHashCode(url + '?' + hash.join('&'));
      };

      var getPropFromCrop = function (obj, name) {
        var result = null;

        if (obj && obj.crop && obj.crop[name]) {
          result = obj.crop[name];
        }

        return result;
      };

      var mixSettings = function (info, defaultImageSettings, imageSettings) {
        var result = helper.deepExtend({}, defaultImageSettings);

        if (info && info.imageSettings.processingSettings) {
          if (!result.crop) {
            result.crop = {};
          }

          result.crop = helper.deepExtend(result.crop, info.cropSettings); // if (result.crop) {
          //     if (result.crop.width && /100(\.0*)?%/.test(result.crop.width)) {
          //         delete result.crop.width;
          //     }
          //     if (result.crop.height && /100(\.0*)?%/.test(result.crop.height)) {
          //         delete result.crop.height;
          //     }
          // }

          if (!result.canvas) {
            result.canvas = {};
          }

          result.canvas = helper.deepExtend(result.canvas, info.canvasSettings);

          if (!result.frame) {
            result.frame = {};
          }

          result.frame = helper.deepExtend(result.frame, info.frameSettings);

          if (!result.scale) {
            result.scale = {};
          }

          if (!result.scale.option) {
            result.scale.option = 'fill';
          }
        }

        if (imageSettings.width && imageSettings.width !== 'auto') {
          result.scale.width = imageSettings.width;
        }

        if (imageSettings.height && imageSettings.height !== 'auto') {
          result.scale.height = imageSettings.height;
        }

        if (imageSettings.imageSettings) {
          result = helper.deepExtend(result, imageSettings.imageSettings);
        } // if (getPropFromCrop(defaultImageSettings, 'type') === 'focalpoint' || getPropFromCrop(info.imageSettings.processingSettings, 'type') === 'focalpoint') {
        //     const x = getPropFromCrop(defaultImageSettings, 'x') || getPropFromCrop(info.imageSettings.processingSettings, 'x');
        //     if (x) {
        //         result.crop.x = x;
        //     }
        //     const y = getPropFromCrop(defaultImageSettings, 'y') || getPropFromCrop(info.imageSettings.processingSettings, 'y');
        //     if (y) {
        //         result.crop.y = y;
        //     }
        //     result.scale = {};
        // }


        return result;
      };

      var INFO = 'sirv_image_info_';
      var IMAGE_INFO = {}; // eslint-disable-next-line no-unused-vars

      var RImage = /*#__PURE__*/function (_EventEmitter4) {
        "use strict";

        bHelpers.inheritsLoose(RImage, _EventEmitter4);

        function RImage(source, o) {
          var _this46;

          _this46 = _EventEmitter4.call(this) || this;

          if ($J.typeOf(source) !== 'string') {
            source = $(source).attr('src');
          }

          _this46.o = $J.extend({
            type: 'main',
            infoId: 'sirv-image-' + helper.generateUUID(),
            imageSettings: {},
            round: true,
            dontLoad: false,
            convertSmallerSideToZero: true,
            referrerPolicy: 'no-referrer-when-downgrade',

            /*
                loadNewImage:
                true - if image is missing - load image
                false - if image is missing but if bigger image is exist give large image else load image
            */
            loadNewImage: false
          }, o);
          _this46.imageInfoPromise = null;
          _this46.images = {};
          _this46.originUrl = getOriginUrl($J.getAbsoluteURL(source));
          _this46.infoUrl = _this46.originUrl + '?nometa&info';
          _this46.imageSettings = $J.extend({}, _this46.o.imageSettings);
          return _this46;
        }

        RImage.roundImageSize = function roundImageSize(size, originSize) {
          var tmp;

          if (!originSize) {
            originSize = {
              width: Number.MAX_VALUE,
              height: Number.MAX_VALUE
            };
          }

          if (size.width && size.height) {
            if (size.width >= size.height) {
              tmp = helper.roundSize(size.width);

              if (tmp <= originSize.width) {
                size.height = Math.floor(size.height / size.width * tmp);
                size.width = tmp;
              }
            } else {
              tmp = helper.roundSize(size.height);

              if (tmp <= originSize.height) {
                // size.width = Math.round((size.width / size.height) * tmp);
                // firefox
                // fix 'https://github.com/sirv/sirv.js/issues/148'
                // We need to use 'Math.floor' because this image 'https://demo.sirv.com/demo/vax/2759311-g.jpg?scale.option=fill&h=500' has wrong size in zoom
                size.width = Math.floor(size.width / size.height * tmp);
                size.height = tmp;
              }
            }
          } else if (size.width) {
            tmp = helper.roundSize(size.width);

            if (tmp <= originSize.width) {
              size.width = tmp;
            }
          } else if (size.height) {
            tmp = helper.roundSize(size.height);

            if (tmp <= originSize.height) {
              size.height = tmp;
            }
          }

          return size;
        };

        var _proto25 = RImage.prototype;

        _proto25._convertImageSettings = function _convertImageSettings(imageSettings) {
          var setSize = function (obj, size) {
            if (size.width) {
              obj.width = size.width;
            }

            if (size.height) {
              obj.height = size.height;
            }
          };

          if (!imageSettings) {
            imageSettings = {};
          }

          imageSettings = $J.extend({}, imageSettings); // correct tile size if we have canvas border

          var tmp = this.getClearSizeWithoutProcessingSettings({
            width: imageSettings.width,
            height: imageSettings.height
          });
          setSize(imageSettings, tmp);
          var result = splitOptions(imageSettings, imageSettings.dppx);

          if (imageSettings.round || !imageSettings.hasOwnProperty('round') && this.o.round) {
            var originSize = this.getOriginSize();
            tmp = RImage.roundImageSize(result.src, originSize);
            setSize(result, tmp);

            if (result.srcset) {
              tmp = RImage.roundImageSize(result.srcset, originSize);
              setSize(result, tmp);
            }
          }

          return result;
        };

        _proto25._mixSettings = function _mixSettings(settings) {
          return mixSettings(IMAGE_INFO[this.o.infoId], this.imageSettings, settings);
        };

        _proto25._calcProcessingSettings = function _calcProcessingSettings() {
          var info = IMAGE_INFO[this.o.infoId];
          var cropSettings = {};
          var canvasSettings = {};
          var frameSettings = {};

          if (!info.imageSettings.viewer) {
            info.imageSettings.viewer = {};
          }

          var viewer = info.imageSettings.viewer;
          var originSize = {
            width: info.imageSettings.original.width,
            height: info.imageSettings.original.height,
            widthScale: 1,
            heightScale: 1
          };

          if (viewer.scale) {
            if (viewer.scale.width) {
              originSize.width *= viewer.scale.width;
            }

            if (viewer.scale.height) {
              originSize.height *= viewer.scale.height;
            }
          }

          originSize.widthScale = originSize.width / info.imageSettings.width;
          originSize.heightScale = originSize.height / info.imageSettings.height;

          if (viewer.crop) {
            if (viewer.crop.width) {
              cropSettings.width = toPercentageString(viewer.crop.width);
            }

            if (viewer.crop.height) {
              cropSettings.height = toPercentageString(viewer.crop.height);
            }

            if (viewer.crop.x) {
              cropSettings.x = toPercentageString(viewer.crop.x);
            }

            if (viewer.crop.y) {
              cropSettings.y = toPercentageString(viewer.crop.y);
            }
          }

          if (viewer.canvas) {
            if (viewer.canvas.width) {
              canvasSettings.width = toPercentageString(viewer.canvas.width);
            }

            if (viewer.canvas.height) {
              canvasSettings.height = toPercentageString(viewer.canvas.height);
            }

            if (viewer.canvas.border) {
              canvasSettings.border = {};

              if (viewer.canvas.border.width) {
                canvasSettings.border.width = toPercentageString(viewer.canvas.border.width);
              }

              if (viewer.canvas.border.height) {
                canvasSettings.border.height = toPercentageString(viewer.canvas.border.height);
              }
            }
          }

          if (viewer.frame && viewer.frame.width) {
            frameSettings.width = toPercentageString(viewer.frame.width);
          }

          info = $J.extend(info, {
            cropSettings: cropSettings,
            canvasSettings: canvasSettings,
            frameSettings: frameSettings,
            originSize: originSize
          });
        };

        _proto25._addImage = function _addImage(name, imageSettings) {
          var _this47 = this;

          var dontLoad = $J.defined(imageSettings.src.dontLoad) ? imageSettings.src.dontLoad : this.o.dontLoad;

          var getSettings = function (sett) {
            var result = _this47._mixSettings(sett);

            if (result.scale && result.scale.width && result.scale.height && result.scale.option !== 'ignore') {
              if (result.scale.width >= result.scale.height) {
                if (_this47.o.convertSmallerSideToZero) {
                  result.scale.height = 0;
                }
              } else {
                if (_this47.o.convertSmallerSideToZero) {
                  result.scale.width = 0;
                }
              }
            }

            return result;
          };

          var src = getSettings(imageSettings.src);
          var srcset = null;
          var tile;
          var tileName = null;

          if (imageSettings.src.imageSettings && imageSettings.src.imageSettings.tile) {
            tile = imageSettings.src.imageSettings.tile;
            tileName = tile.number + '';
          }

          if (imageSettings.srcset) {
            srcset = {
              dppx: imageSettings.srcset.dppx,
              settings: getSettings(imageSettings.srcset)
            };
          }

          var imageInstance = null;

          if (tileName === null) {
            imageInstance = new _Image(name, this.originUrl, src, srcset, dontLoad, this.o.referrerPolicy);
          } else {
            imageInstance = new _TileImage(name, this.originUrl, src, srcset, dontLoad, this.o.referrerPolicy, tileName);
          }

          this.images[name] = {
            serverWidth: imageSettings.src.width,
            serverHeight: imageSettings.src.height,
            image: imageInstance
          };
          return this.images[name];
        };

        _proto25._load = function _load(name, imageSettings) {
          var _this48 = this;

          var img = this._addImage(name, imageSettings);

          var eventName;
          var instance;
          img.image.load().then(function (imgInst) {
            instance = imgInst;
            eventName = 'imageOnload';

            if (instance instanceof _Image) {
              _this48.someImageIsLoaded = true;
            }
          }).catch(function (imgInst) {
            instance = imgInst;
            eventName = 'imageOnerror';
          }).finally(function () {
            if (instance instanceof _Image) {
              _this48.someImageIsComplete = true;
            }

            var image = _this48.images[instance.name];

            if (image) {
              _this48.emit(eventName, {
                data: _this48._createImageData(image, imageSettings.src.callbackData)
              });
            }
          });
        };

        _proto25._createImageData = function _createImageData(img, callbackData) {
          var obj = img.image;
          var result = {
            callbackData: callbackData,
            name: obj.name,
            tileName: obj.tileName,
            tile: obj instanceof _TileImage,
            node: obj.imageNode,
            serverWidth: img.serverWidth,
            serverHeight: img.serverHeight,
            width: obj.size.width,
            height: obj.size.height,
            src: obj.src,
            srcset: obj.srcset,
            state: obj.state,
            dppx: obj.dppx || 1
          };
          return result;
        };

        _proto25._filter = function _filter(isTile) {
          var result = [];
          helper.objEach(this.images, function (key, image) {
            if (image.image instanceof _TileImage === !!isTile) {
              result.push(image);
            }
          });
          return result;
        };

        _proto25.getCropPosition = function getCropPosition() {
          var info = IMAGE_INFO[this.o.infoId];
          var x = getPropFromCrop(this.imageSettings, 'x');

          if (x && !/%$/.test(x)) {
            x = toPercentageString(x / info.originSize.width);
          }

          var y = getPropFromCrop(this.imageSettings, 'y');

          if (y && !/%$/.test(y)) {
            y = toPercentageString(y / info.originSize.height);
          }

          return {
            x: x || info.cropSettings.x,
            y: y || info.cropSettings.y,
            type: getPropFromCrop(this.imageSettings, 'type') || getPropFromCrop(info.imageSettings.processingSettings, 'type')
          };
        }
        /**
         * Is image exist with current size or more
         *
         * @param {Object}    Image settings object to check
         *
         * @returns {boolean} - Returns true if the image is exist
         */
        ;

        _proto25.isExist = function isExist(imageSettings) {
          imageSettings = this._convertImageSettings(imageSettings);
          var name = this.getImageName(imageSettings.src);
          var result = Object.prototype.hasOwnProperty.call(this.images, name);

          if (!result) {
            if (!(imageSettings.src.imageSettings && imageSettings.src.imageSettings.tile) && imageSettings.src.width) {
              var images = this._filter(false);

              result = this._getBiggerImage(imageSettings.src.width, images);
            }
          }

          return !!result;
        }
        /**
         * Is image exist with current size
         *
         * @param {Object}    Image settings object to check
         *
         * @returns {boolean} - Returns true if the image is loaded
         */
        ;

        _proto25.isLoaded = function isLoaded(imageSettings) {
          imageSettings = this._convertImageSettings(imageSettings);
          var result = this.images[this.getImageName(imageSettings.src)];

          if (result) {
            result = result.image.state === 2;
          }

          return !!result;
        }
        /**
         * Some of image is loaded
         *
         * @returns {boolean} - Returns true if some of image is loaded
         */
        ;

        _proto25.isReady = function isReady() {
          return this.someImageIsLoaded;
        };

        _proto25.isComplete = function isComplete() {
          return this.someImageIsComplete;
        }
        /**
         * Returns origin size of image from image info
         *
         * @returns {Hash} Size of the image  {width: x, height: x}
         */
        ;

        _proto25.getOriginSize = function getOriginSize() {
          var result = null;
          var info = null;

          if (IMAGE_INFO[this.o.infoId]) {
            info = IMAGE_INFO[this.o.infoId].imageSettings;
          }

          if (info) {
            var width;
            var height;

            if (info.processingSettings) {
              width = info.width;
              height = info.height;
            } else {
              width = info.original.width;
              height = info.original.height;
            }

            result = {
              width: width,
              height: height
            };
          }

          return result;
        };

        _proto25.getImageInfo = function getImageInfo() {
          var _this49 = this;

          if (!this.imageInfoPromise) {
            this.imageInfoPromise = new Promise(function (resolve, reject) {
              var url = _this49.originUrl;
              var hash = $J.getHashCode(_this49.infoUrl.replace(/^http(s)?:\/\//, ''));
              var imageSettings = helper.paramsToQueryString(_this49.imageSettings);

              if (imageSettings !== '') {
                url += '?' + imageSettings;
                url += '&';
              } else {
                url += '?';
              }

              url += 'nometa&info=' + INFO + hash + '_' + _this49.o.type;
              url = helper.cleanQueryString(url);
              helper.getRemoteData(url, 'image_info_' + helper.generateUUID(), _this49.o.referrerPolicy).then(function (data) {
                if (!data.width || data._isplaceholder) {
                  reject(data);
                } else {
                  IMAGE_INFO[_this49.o.infoId] = {
                    imageSettings: data
                  };

                  _this49._calcProcessingSettings();

                  resolve(IMAGE_INFO[_this49.o.infoId]);
                }
              }).catch(reject);
            });
          }

          return this.imageInfoPromise;
        };

        _proto25._getBiggerImage = function _getBiggerImage(width, images, dontLoad) {
          var result = null;

          if (!width) {
            width = 0;
          }

          if (!images) {
            images = this.images;
          }

          if (dontLoad === $J.U) {
            dontLoad = this.o.dontLoad;
          }

          helper.objEach(images, function (key, value) {
            if (width < value.serverWidth) {
              if ((value.image.state === 2 || dontLoad) && (!result || result.serverWidth > value.serverWidth)) {
                result = value;
              }
            }
          });
          return result;
        };

        _proto25.sendLoad = function sendLoad(imageSettings) {
          var img;
          imageSettings = this._convertImageSettings(imageSettings);
          img = this.images[this.getImageName(imageSettings.src)];

          if (!img) {
            img = this._getBiggerImage(imageSettings.src.width);
          }

          this.emit('imageOnload', {
            data: this._createImageData(img, imageSettings.src.callbackData)
          });
        }
        /**
         * Cancels loading image if it is
         *
         * @param {Object}    Image settings object to cansel
         */
        ;

        _proto25.cancelLoadingImage = function cancelLoadingImage(imageSettings) {
          imageSettings = this._convertImageSettings(imageSettings);
          var name = this.getImageName(imageSettings.src);
          var img = this.images[name];

          if (img) {
            if (img.image.isLoading()) {
              img.image.destroy();
              delete this.images[name];
            }
          }
        }
        /**
         * Returns image name
         *
         * @param {Object}    Image settings object
         *
         * @returns {String} name of image
         */
        ;

        _proto25.getImageName = function getImageName(imageSettings) {
          var result = _getImageName(helper.cleanQueryString(this.originUrl + ('?' + helper.paramsToQueryString(this._mixSettings(imageSettings)))));

          return result;
        };

        _proto25.getClearSizeWithoutProcessingSettings = function getClearSizeWithoutProcessingSettings(size) {
          var result = {};
          var info = IMAGE_INFO[this.o.infoId];

          if (size.width) {
            result.width = Math.round(size.width * info.originSize.widthScale);
          }

          if (size.height) {
            result.height = Math.round(size.height * info.originSize.heightScale);
          }

          return result;
        }
        /*
         * Returns image object if it is exist or load image if it isn't
         *
         * @param {Object}    Image settings object
         *
         * @returns {object or null} Returns image object
             imageOptions {
                width: 42,
                height: 42,
                round: true/false(default false) - round max size to 100
                maxSize: true/false(default true), - if the size of image is not exist send image with bigger size
                 additionalImageSettings = {
                    ...
                    quality: 1,
                    tile: {}
                    ...
                }
            }
        */
        ;

        _proto25.getImage = function getImage(imageSettings) {
          var options = this._convertImageSettings(imageSettings);

          var dontLoad = $J.defined(options.src.dontLoad) ? options.src.dontLoad : this.o.dontLoad;
          var name = this.getImageName(options.src);
          var result = this.images[name];

          if (!result) {
            this._load(name, $J.extend({}, options));
          }

          if (result && result.image.state < 2 && !dontLoad) {
            result = null;
          }

          if (!result && (options.src.maxSize || !this.o.loadNewImage)) {
            if (options.src.exactSize) {
              if (dontLoad) {
                result = this.images[name];
              }
            } else {
              result = this._getBiggerImage(null, null, dontLoad);
            }
          }

          if (result) {
            result = this._createImageData(result, options.src.callbackData);
          }

          return result;
        }
        /**
        * Returns origin url of image
        *
        * @returns {String} url
        */
        ;

        _proto25.getOriginImageUrl = function getOriginImageUrl() {
          var result = null;

          if (this.originUrl) {
            result = this.originUrl;
          }

          return result;
        }
        /**
         * Returns current processing settings
         *
         * @returns {object} processing settings
         */
        ;

        _proto25.getProcessingSettings = function getProcessingSettings() {
          var info = IMAGE_INFO[this.o.infoId];
          return {
            crop: info.cropSettings,
            cropClear: info.cropSettingsClear,
            canvas: info.canvasSettings,
            canvasClear: info.canvasSettingsClear
          };
        };

        _proto25.getDescription = function getDescription() {
          var result = null;
          var info = IMAGE_INFO[this.o.infoId];

          if (info) {
            result = info.imageSettings.original.description || null;
          }

          return result;
        }
        /**
         * Get thambnail urls (src, srcset)
         *
         * @param {Object}    Options for the image
         *
         * @returns {Object}  src, srcset and other datas
         */
        ;

        _proto25.getThumbnail = function getThumbnail(imageSettings) {
          var _this50 = this;

          var result = {
            imageSettings: null,
            size: null,
            src: null,
            srcset: null
          };

          if (IMAGE_INFO[this.o.infoId]) {
            var options = splitOptions(imageSettings, $J.DPPX);
            var srcset = null;
            var convertSmallerSideToZero = this.o.convertSmallerSideToZero;
            var originUrl = imageSettings.originUrl || this.originUrl;

            var getSrc = function (_size, _imageSettings) {
              var settings = {
                scale: {
                  option: 'fill'
                }
              };

              if (_size.width || _size.height) {
                if (_size.width && _size.height) {
                  settings.scale.width = _size.width;
                  settings.scale.height = _size.height;
                } else {
                  var _tmp2 = _size.width || _size.height;

                  settings.scale.width = _tmp2;
                  settings.scale.height = _tmp2;
                }
              }

              if (_size.width === _size.height) {
                if (imageSettings.crop) {
                  settings.crop = {
                    x: 'center',
                    y: 'center',
                    width: _size.width,
                    height: _size.height
                  };
                } else {
                  settings.scale.option = 'fit';

                  if (!settings.canvas) {
                    settings.canvas = {};
                  }

                  settings.canvas.width = _size.width;
                  settings.canvas.height = _size.height;
                }
              }

              if (settings.scale) {
                if (imageSettings.width && imageSettings.height) {
                  if (IMAGE_INFO[_this50.o.infoId].imageSettings.original.width >= IMAGE_INFO[_this50.o.infoId].imageSettings.original.height) {
                    if (convertSmallerSideToZero) {
                      settings.scale.height = 0;
                    }
                  } else {
                    if (convertSmallerSideToZero) {
                      settings.scale.width = 0;
                    }
                  }
                } else if (imageSettings.width) {
                  if (convertSmallerSideToZero) {
                    settings.scale.height = 0;
                  }
                } else if (imageSettings.height) {
                  if (convertSmallerSideToZero) {
                    settings.scale.width = 0;
                  }
                }
              }

              if (_imageSettings) {
                settings = $J.extend(settings, _imageSettings);
              }

              var tmp = settings;
              settings = {};
              settings.imageSettings = tmp;
              settings = _this50._mixSettings(settings);

              if (settings.text) {
                delete settings.text;
              }

              if (!imageSettings.watermark && settings.watermark) {
                delete settings.watermark;
              }

              return helper.paramsToQueryString(settings);
            };

            var getSize = function (is) {
              var r = {};

              if (is.width) {
                r.width = is.width;
              }

              if (is.height) {
                r.height = is.height;
              }

              return r;
            };

            if (options.src.crop || options.src.width && options.src.height) {
              convertSmallerSideToZero = false;
            }

            result = {
              callbackData: imageSettings.callbackData,
              size: getSize(options.src.imageSettings),
              src: helper.cleanQueryString(originUrl + '?' + getSrc(getSize(options.src), options.src.imageSettings))
            };

            if ($J.DPPX > 1) {
              srcset = getSrc(getSize(options.srcset), options.srcset.imageSettings);

              if (srcset) {
                result.srcset = helper.cleanQueryString(originUrl + '?' + srcset);
              }
            }
          }

          return result;
        };

        _proto25.getAccountInfo = function getAccountInfo() {
          var result = {};
          var info = IMAGE_INFO[this.o.infoId];

          if (info) {
            result.account = info.imageSettings.account;
            result.branded = info.imageSettings.branded;
          }

          return result;
        };

        _proto25.destroy = function destroy() {
          helper.objEach(this.images, function (key, img) {
            img.image.destroy();
          });
          this.images = {};
          this.someImageIsLoaded = false;
          this.someImageIsComplete = false;

          if (IMAGE_INFO[this.infoId]) {
            delete IMAGE_INFO[this.infoId];
            this.infoId = null;
          }

          _EventEmitter4.prototype.destroy.call(this);
        };

        return RImage;
      }(EventEmitter);

      return RImage;
    });
    Sirv.define('Hotspot', ['bHelpers', 'globalFunctions', 'magicJS', 'EventEmitter', 'helper', 'Promise!'], function (bHelpers, globalFunctions, magicJS, EventEmitter, helper, Promise) {
      var moduleName = 'Hotspot';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* global EventEmitter */

      /* global helper */

      /* eslint-disable no-restricted-syntax */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Hotspot" }] */

      var CSS_HOTSPOT_POINTER = 'sirv-hotspot-pointer';
      var CSS_HOTSPOT_POINTER_BACKWARD_COMPATIBILITY = 'hotspot-pointer';
      var CSS_HOTSPOT_TOOLTIP = 'sirv-hotspot-tooltip';
      var CSS_HOTSPOT_DEFAULT = 'pulsating-point';
      var CSS_HOTSPOT_BOX = 'sirv-hotspot-box';
      var CSS_HOTSPOT_WRAPPER = 'sirv-hotspot-box-wrapper';
      var CSS_HOTSPOT_BUTTON_CLOSE = 'sirv-hotspot-close-button';
      var CSS_HOTSPOT_CONTENT = 'sirv-hotspot-box-content';
      var CSS_HOTSPOT_BOX_OUT_OF_WIDTH = 'sirv-hotspot-box-out-of-width';
      var CSS_HOTSPOT_BOX_OUT_OF_HEIGHT = 'sirv-hotspot-box-out-of-height';
      var OVERWRITE_POINTER_EVENT = 'sirv-hotspot-overwrite-pointer-event';
      var STATES = {
        AUTO: 0,
        VISIBLE: 1
      };

      var Hotspot = /*#__PURE__*/function (_EventEmitter5) {
        "use strict";

        bHelpers.inheritsLoose(Hotspot, _EventEmitter5);

        function Hotspot(container, hotspotData, index) {
          var _this51;

          _this51 = _EventEmitter5.call(this) || this;
          _this51.container = container;
          _this51.hotspotData = hotspotData;
          _this51.id = index;
          _this51.box = null;
          _this51.boxContainer = $J.D.node.body;
          _this51.baseBoxSize = null;
          _this51.tooltip = null;
          _this51.version = 1;
          _this51.pointer = null;
          _this51.hotspotSettings = {};
          _this51.dX = 1;
          _this51.dY = 1;
          _this51.isActive = false;
          _this51.isDisabled = false;
          _this51.isPointerInDoc = false;
          _this51.isHovered = false;
          _this51.isShown = false;
          _this51.isBoxContent = false;
          _this51.tooltipState = STATES.AUTO;
          _this51.boxState = STATES.AUTO;

          _this51.init();

          return _this51;
        }

        var _proto26 = Hotspot.prototype;

        _proto26.isTooltipHovered = function isTooltipHovered() {
          return this.isHovered;
        };

        _proto26.isBoxActivated = function isBoxActivated() {
          return this.isActive;
        };

        _proto26.isBoxAlwaysVisible = function isBoxAlwaysVisible() {
          return this.boxState === STATES.VISIBLE;
        };

        _proto26.isTooltipAlwaysVisible = function isTooltipAlwaysVisible() {
          return this.tooltipState === STATES.VISIBLE;
        };

        _proto26.init = function init() {
          this.setVersion();
          this.parseHotspotData();
          this.createBlocks();
          this.setEvents();
          this.createBox();
        };

        _proto26.setVersion = function setVersion() {
          if (this.hotspotData.style || this.hotspotData.tooltip || this.hotspotData.box && this.hotspotData.box.content) {
            this.version = 2;
          }
        };

        _proto26.parseHotspotData = function parseHotspotData() {
          var _this52 = this;

          helper.objEach(this.hotspotData, function (key) {
            _this52.hotspotSettings[key] = _this52.hotspotData[key];
          });
          this.hotspotSettings.pointerPositionPercentage = {
            top: helper.isPercentage('' + this.hotspotSettings.pointer.y),
            left: helper.isPercentage('' + this.hotspotSettings.pointer.x)
          };
        };

        _proto26.createBlocks = function createBlocks() {
          this.pointer = $J.$new('div').addClass(CSS_HOTSPOT_POINTER).attr('data-spot-id', this.id);
          this.pointer.addClass(CSS_HOTSPOT_POINTER_BACKWARD_COMPATIBILITY);

          if (this.version > 1 && this.hotspotSettings.tooltip && this.hotspotSettings.tooltip.content) {
            this.tooltip = $J.$new('div').addClass(CSS_HOTSPOT_TOOLTIP).changeContent(this.hotspotSettings.tooltip.content);

            if (this.hotspotSettings.tooltip.style) {
              this.tooltip.addClass(CSS_HOTSPOT_TOOLTIP + '--' + this.hotspotSettings.tooltip.style);
            }
          }
        };

        _proto26.setTooltipPosition = function setTooltipPosition() {
          if (this.tooltip) {
            var pointerXY = this.pointer.getRect();
            var cssTooltip = {
              top: 0,
              left: 0
            };
            cssTooltip.top = this.hotspotSettings.tooltip.style ? pointerXY.top : pointerXY.bottom;
            cssTooltip.left = this.hotspotSettings.tooltip.style ? (pointerXY.left + pointerXY.right) / 2 : pointerXY.right;

            if ($J.$(this.boxContainer).getTagName() !== 'body') {
              pointerXY = this.pointer.node.getBoundingClientRect();
              cssTooltip.top = this.hotspotSettings.tooltip.style ? pointerXY.top - this.container.node.getBoundingClientRect().top : pointerXY.bottom - this.container.node.getBoundingClientRect().top;
              cssTooltip.left = this.hotspotSettings.tooltip.style ? pointerXY.left - this.container.node.getBoundingClientRect().left + pointerXY.width / 2 : pointerXY.left - this.container.node.getBoundingClientRect().left + pointerXY.width;
            }

            this.tooltip.setCss(cssTooltip);
          }
        };

        _proto26.showTooltip = function showTooltip() {
          if (!this.isHovered && !this.isDisabled) {
            if (this.tooltip) {
              this.setTooltipPosition();
              this.tooltip.appendTo(this.boxContainer).addClass(CSS_HOTSPOT_TOOLTIP + '-visible');
              this.isHovered = true;
              this.emit('hotspotHovered', {
                data: {
                  hotspot: this
                }
              });
            }
          }
        };

        _proto26.setEvents = function setEvents() {
          var _this53 = this;

          this.pointer.addEvent('click mousedown', function (e) {
            e.stop();
          });
          this.pointer.addEvent('btnclick tap', function (e) {
            if (e.getButton() === 3) {
              return true;
            }

            if (_this53.hotspotSettings.link) {
              $J.W.node.open(_this53.hotspotSettings.link);
              e.stop();
            } else if (_this53.isBoxContent) {
              e.stop();

              _this53.showBox();
            }

            return false;
          });

          if ($J.browser.uaName === 'edge' || $J.browser.ieMode) {
            this.pointer.addEvent('mousedown', function (e) {
              e.stopDistribution();
            });
          }

          if (this.hotspotSettings.tooltip && this.hotspotSettings.tooltip.content) {
            this.pointer.addEvent('mouseenter', function (e) {
              _this53.showTooltip();
            });
            this.pointer.addEvent('mouseleave', function () {
              if (_this53.tooltipState !== STATES.VISIBLE) {
                _this53.hideTooltip();

                _this53.isHovered = false;

                _this53.emit('hotspotLeft', {
                  data: {
                    hotspot: _this53
                  }
                });
              }
            });
          }

          var resizeTimer;
          $($J.W).addEvent('resize', function (e) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
              if (_this53.isActive) {
                var hotspotInfo = _this53.hotspotSettings;

                if (hotspotInfo) {
                  _this53.box.setCss(_this53.correctBoxPosition(_this53.getBoxPosition(hotspotInfo)));
                }
              }
            }, 42);
          });
        };

        _proto26.createBox = function createBox() {
          var _this54 = this;

          var boxContent = null;

          if (this.version > 1 && this.hotspotSettings.box && this.hotspotSettings.box.content) {
            boxContent = this.hotspotSettings.box.content;
          } else if (this.hotspotSettings.data) {
            boxContent = this.hotspotSettings.data;
          }

          this.box = $J.$new('div').addClass(CSS_HOTSPOT_BOX);

          if (boxContent) {
            this.isBoxContent = true;
            var wrapper = $J.$new('div').addClass(CSS_HOTSPOT_WRAPPER).append($J.$new('div').addEvent('btnclick tap', function (e) {
              if (_this54.boxState !== STATES.VISIBLE) {
                e.stop();

                _this54.hideBox(true);
              }
            }).addClass(CSS_HOTSPOT_BUTTON_CLOSE));
            var content = $J.$new('div').addClass(CSS_HOTSPOT_CONTENT).changeContent(boxContent + '').addEvent('click', function (e) {
              e.stopDistribution();
            });
            wrapper.append(content);
            this.box.append(wrapper);
          }

          this.box.setCss({
            top: '-10000px',
            left: '-10000px',
            position: 'absolute',
            opacity: 0
          });
        };

        _proto26.getBoxPosition = function getBoxPosition(hotspotInfo) {
          var result = {
            top: 0,
            left: 0,
            transform: ''
          };

          if (hotspotInfo && hotspotInfo.box) {
            var boxX = hotspotInfo.box.x;
            var boxY = hotspotInfo.box.y;

            if (this.hotspotSettings.box.fixed) {
              var boxBoundaries = this.container.getRect();
              result.position = 'absolute';

              if ($J.$(this.boxContainer).getTagName() !== 'body') {
                switch (boxY) {
                  case 'top':
                    result.top = 0;
                    break;

                  case 'bottom':
                    result.top = boxBoundaries.bottom - boxBoundaries.top;
                    result.transform += ' translateY(-100%)';
                    break;

                  case 'center':
                    result.top = (0 + (boxBoundaries.bottom - boxBoundaries.top)) / 2;
                    result.transform += ' translateY(-50%)';
                    break;

                  default:
                    result.top = 0 + (parseFloat(boxY) || 0);
                }

                switch (boxX) {
                  case 'left':
                    result.left = 0;
                    break;

                  case 'right':
                    result.left = boxBoundaries.right - boxBoundaries.left;
                    result.transform += ' translateX(-100%)';
                    break;

                  case 'center':
                    result.left = (boxBoundaries.right - boxBoundaries.left) / 2;
                    result.transform += ' translateX(-50%)';
                    break;

                  default:
                    result.left = boxBoundaries.left + (parseFloat(boxX) || 0);
                }
              } else {
                switch (boxY) {
                  case 'top':
                    result.top = boxBoundaries.top;
                    break;

                  case 'bottom':
                    result.top = boxBoundaries.bottom;
                    result.transform += ' translateY(-100%)';
                    break;

                  case 'center':
                    result.top = (boxBoundaries.top + boxBoundaries.bottom) / 2;
                    result.transform += ' translateY(-50%)';
                    break;

                  default:
                    result.top = boxBoundaries.top + (parseFloat(boxY) || 0);
                }

                switch (boxX) {
                  case 'left':
                    result.left = boxBoundaries.left;
                    break;

                  case 'right':
                    result.left = boxBoundaries.right;
                    result.transform += ' translateX(-100%)';
                    break;

                  case 'center':
                    result.left = (boxBoundaries.left + boxBoundaries.right) / 2;
                    result.transform += ' translateX(-50%)';
                    break;

                  default:
                    result.left = boxBoundaries.left + (parseFloat(boxX) || 0);
                }
              }
            } else {
              var pointerXY = this.pointer.getPosition();
              var scroll = $J.W.getScroll();
              result.left = pointerXY.left - scroll.x + (parseFloat(boxX) || 0);
              result.top = pointerXY.top - scroll.y + (parseFloat(boxY) || 0);
            }
          }

          return result;
        };

        _proto26.correctBoxPosition = function correctBoxPosition(position) {
          if (this.hotspotSettings.box && !this.hotspotSettings.box.fixed) {
            this.box.removeClass(CSS_HOTSPOT_BOX_OUT_OF_WIDTH);
            this.box.removeClass(CSS_HOTSPOT_BOX_OUT_OF_HEIGHT);
            var wSize = $J.W.getSize();

            if (this.baseBoxSize.width > wSize.width) {
              this.box.addClass(CSS_HOTSPOT_BOX_OUT_OF_WIDTH);
            } else if (position.left + this.baseBoxSize.width > wSize.width) {
              position.left = wSize.width - this.baseBoxSize.width;
            }

            if (this.baseBoxSize.height > wSize.height) {
              this.box.addClass(CSS_HOTSPOT_BOX_OUT_OF_HEIGHT);
            } else if (position.top + this.baseBoxSize.height > wSize.height) {
              position.top = wSize.height - this.baseBoxSize.height;
            }
          }

          return position;
        };

        _proto26.setBoxPosition = function setBoxPosition() {
          var boxCss = {
            transform: ''
          };
          boxCss = this.correctBoxPosition(this.getBoxPosition(this.hotspotSettings));
          this.box.setCssProp('position', '');
          this.box.setCss(boxCss).getSize();
        };

        _proto26.showBox = function showBox() {
          if (this.isActive || this.isDisabled) {
            return;
          }

          if (this.tooltip && this.tooltipState === STATES.AUTO) {
            this.tooltip.removeClass(CSS_HOTSPOT_TOOLTIP + '-visible');
          }

          this.box.setCss({
            opacity: 0
          });
          this.box.appendTo(this.boxContainer);
          this.setBaseBoxSize(this.box.getSize());
          this.setBoxPosition();
          this.box.setCss({
            opacity: 1
          });
          this.isActive = true;
          this.emit('hotspotActivate', {
            data: {
              hotspot: this
            }
          });
        };

        _proto26.hideBox = function hideBox(fade) {
          var _this55 = this;

          if (this.isActive) {
            if (fade) {
              if (this.box) {
                this.box.setCssProp('opacity', 0);
              }

              setTimeout(function () {
                _this55.hideBox();
              }, 300);
              return this.id;
            }

            if (this.box) {
              this.box.remove();
            }

            this.isActive = false;
            this.emit('hotspotDeactivate', {
              data: {
                hotspot: this
              }
            });
          }

          return this.id;
        };

        _proto26.changeBoxContainer = function changeBoxContainer(container) {
          this.boxContainer = container != null ? container : $J.D.node.body;
        };

        _proto26.setBaseBoxSize = function setBaseBoxSize(size, force) {
          if (size && force || !this.baseBoxSize) {
            this.baseBoxSize = {
              width: size.width,
              height: size.height
            };
          }
        };

        _proto26.setHotspotSettings = function setHotspotSettings(settings) {
          for (var item in settings) {
            if ({}.hasOwnProperty.call(settings, item)) {
              this.hotspotSettings[item] = settings[item];
            }
          }
        };

        _proto26.getHotspotSettings = function getHotspotSettings(settings) {
          return this.hotspotSettings;
        };

        _proto26.setAspectRatio = function setAspectRatio(x, y) {
          this.dX = x;
          this.dY = y;
        };

        _proto26.setPointerPosition = function setPointerPosition() {
          var hss = this.hotspotSettings;

          if (hss) {
            this.pointer.setCss({
              top: hss.pointerPositionPercentage.top ? hss.pointer.y : Math.ceil(hss.pointer.y * this.dY),
              left: hss.pointerPositionPercentage.left ? hss.pointer.x : Math.ceil(hss.pointer.x * this.dX)
            });
          }
        };

        _proto26.showPointer = function showPointer() {
          if (this.hotspotSettings && !this.isDisabled) {
            this.pointer.addClass(CSS_HOTSPOT_DEFAULT);
            this.setPointerPosition();

            if (this.hotspotSettings.style || this.hotspotSettings.pointer.style) {
              var dataStyle = this.hotspotSettings.style;

              if (!dataStyle) {
                dataStyle = this.hotspotSettings.pointer.style;
              }

              this.pointer.addClass(dataStyle);
            }

            if (!this.isPointerInDoc) {
              this.isPointerInDoc = true;
              this.pointer.appendTo(this.container);
            }
          } else {
            this.hidePointer();
          }
        };

        _proto26.hidePointer = function hidePointer() {
          if (this.isPointerInDoc) {
            this.isPointerInDoc = false;
            this.pointer.remove();
          }
        };

        _proto26.isHotspotShown = function isHotspotShown() {
          return this.isShown;
        };

        _proto26.show = function show() {
          if (!this.isDisabled && !this.isShown) {
            this.isShown = true;
            this.showPointer();

            if (this.boxState === STATES.SHOW) {
              this.showBox();
            }

            if (this.tooltipState === STATES.SHOW) {
              this.showTooltip();
            }
          }
        };

        _proto26.hide = function hide() {
          if (this.isShown) {
            this.isShown = false;
            this.hideBox();
            this.hideTooltip();
            this.hidePointer();
          }
        };

        _proto26.isEnabled = function isEnabled() {
          return !this.isDisabled;
        };

        _proto26.enable = function enable() {
          if (this.isDisabled) {
            this.isDisabled = false; // this.show();
          }
        };

        _proto26.disable = function disable() {
          if (!this.isDisabled) {
            this.isDisabled = true;
            this.hide();
          }
        };

        _proto26.hideTooltip = function hideTooltip() {
          if (this.isHovered) {
            this.isHovered = false;

            if (this.tooltip) {
              this.tooltip.removeClass(CSS_HOTSPOT_TOOLTIP + '-visible');
            }
          }
        };

        _proto26.overridePointerEvent = function overridePointerEvent() {
          if (!this.isBoxAlwaysVisible() && !this.isTooltipAlwaysVisible()) {
            this.container.addClass(OVERWRITE_POINTER_EVENT);
          }
        };

        _proto26.removeOverridePointerEvent = function removeOverridePointerEvent() {
          this.container.removeClass(OVERWRITE_POINTER_EVENT);
        };

        _proto26.getId = function getId() {
          return this.id;
        };

        _proto26.setId = function setId(id) {
          this.id = id;
        };

        _proto26.setState = function setState(settings, dontShow) {
          // For popup, tooltip, pointer - 1 - 'visible' | 0 - 'initial'
          if (this.boxState !== settings.popup) {
            this.boxState = settings.popup;

            if (settings.popup === STATES.VISIBLE) {
              if (!dontShow) {
                this.showBox();
              }
            } else {
              this.hideBox();
            }
          }

          if (this.tooltipState !== settings.tooltip) {
            this.tooltipState = settings.tooltip;

            if (settings.tooltip === STATES.VISIBLE) {
              if (!dontShow) {
                this.showTooltip();
              }
            } else {
              this.hideTooltip();
            }
          }
        };

        _proto26.rewriteAttrPointer = function rewriteAttrPointer(attr) {
          var attribute = attr || this.id;
          this.pointer.attr('data-spot-id', attribute);
        };

        _proto26.getHotspotPointer = function getHotspotPointer() {
          return this.pointer;
        };

        _proto26.destroy = function destroy() {
          this.hideBox();
          this.hideTooltip();
          this.hotspotData = null;
          this.container = null;
          this.id = null;
          this.pointer.clearEvents();

          if (this.tooltip) {
            this.tooltip.clearEvents();
          }

          this.pointer.remove();
          this.box = null;
          this.boxContainer = null;
          this.baseBoxSize = null;
          this.tooltip = null;
          this.version = null;
          this.pointer = null;
          this.hotspotSettings = null;
          this.isActive = false;
          this.isDisabled = false;
          this.isPointerInDoc = false;
          this.isHovered = false;

          _EventEmitter5.prototype.destroy.call(this);
        };

        return Hotspot;
      }(EventEmitter);

      return Hotspot;
    });
    Sirv.define('Hotspots', ['bHelpers', 'magicJS', 'globalFunctions', 'EventEmitter', 'Hotspot', 'helper', 'Promise!'], function (bHelpers, magicJS, globalFunctions, EventEmitter, Hotspot, helper, Promise) {
      var moduleName = 'Hotspots';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* global Hotspot */

      /* global EventEmitter */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "Hotspots" }] */

      var Hotspots = /*#__PURE__*/function (_EventEmitter6) {
        "use strict";

        bHelpers.inheritsLoose(Hotspots, _EventEmitter6);

        function Hotspots() {
          var _this56;

          _this56 = _EventEmitter6.call(this) || this;
          _this56.container = $J.$new('div').addClass('sirv-hotspot-container');
          _this56.hotspots = [];
          _this56.activeHotspots = [];
          _this56.hoveredHotspots = [];
          _this56.originImageSize = {
            width: 0,
            height: 0
          };
          _this56.instanceComponentNode = null;
          _this56.api = {
            add: _this56.addHotspot.bind(bHelpers.assertThisInitialized(_this56)),
            remove: _this56.removeHotspot.bind(bHelpers.assertThisInitialized(_this56)),
            removeAll: _this56.removeAllHotspots.bind(bHelpers.assertThisInitialized(_this56)),
            list: _this56.getPointerNodeHotspots.bind(bHelpers.assertThisInitialized(_this56)),
            setVisibility: _this56.setStateById.bind(bHelpers.assertThisInitialized(_this56)),
            enable: _this56.enable.bind(bHelpers.assertThisInitialized(_this56)),
            disable: _this56.disable.bind(bHelpers.assertThisInitialized(_this56))
          };

          _this56.setEvents();

          return _this56;
        }

        var _proto27 = Hotspots.prototype;

        _proto27.setOriginImageSize = function setOriginImageSize(width, height) {
          this.originImageSize = {
            width: width,
            height: height
          };
        };

        _proto27.appendTo = function appendTo(container) {
          this.container.appendTo(container);
        };

        _proto27.setInstanceComponentNode = function setInstanceComponentNode(instance) {
          this.instanceComponentNode = instance;
        };

        _proto27.setContainerSize = function setContainerSize(instNodeBoundingClientRect) {
          if (!this.hotspots.length || !instNodeBoundingClientRect) {
            return;
          }

          var componentSize = this.getRightBoundengClientRect();
          this.container.setCss({
            top: instNodeBoundingClientRect.top - componentSize.top,
            left: instNodeBoundingClientRect.left - componentSize.left,
            width: instNodeBoundingClientRect.width * 100 / componentSize.width + '%',
            height: instNodeBoundingClientRect.height * 100 / componentSize.height + '%'
          });
          var size = this.container.getSize();
          var dx = size.width / this.originImageSize.width;
          var dy = size.height / this.originImageSize.height;
          this.hotspots.forEach(function (hs) {
            return hs.setAspectRatio(dx, dy);
          });
        };

        _proto27.getActiveHotspot = function getActiveHotspot(id) {
          return this.activeHotspots.filter(function (hs) {
            return hs.id === id;
          })[0] || null;
        };

        _proto27.getHoveredHotspots = function getHoveredHotspots(id) {
          return this.hoveredHotspots.filter(function (hs) {
            return hs.id === id;
          })[0] || null;
        };

        _proto27.setEvents = function setEvents() {
          var _this57 = this;

          this.on('hotspotActivate', function (e) {
            var activeHotspot = _this57.getActiveHotspot(e.data.hotspot.id);

            if (!activeHotspot) {
              e.stopEmptyEvent();

              _this57.activeHotspots.forEach(function (hs) {
                if (!hs.isBoxAlwaysVisible()) {
                  hs.hideBox(true);
                }
              });

              _this57.activeHotspots.push(e.data.hotspot);

              _this57.activeHotspots[_this57.activeHotspots.length - 1].overridePointerEvent();

              e.data.id = e.data.hotspot.id;
              delete e.data.hotspot;
            }
          });
          this.on('hotspotDeactivate', function (e) {
            e.stopEmptyEvent();

            var activeHotspot = _this57.getActiveHotspot(e.data.hotspot.id);

            if (activeHotspot) {
              activeHotspot.removeOverridePointerEvent();
              _this57.activeHotspots = _this57.activeHotspots.filter(function (hs) {
                return hs.id !== activeHotspot.id;
              });
            }

            e.data.id = e.data.hotspot.id;
            delete e.data.hotspot;
          });
          this.on('hotspotHovered', function (e) {
            var hoveredHotspot = _this57.getHoveredHotspots(e.data.hotspot.id);

            if (!hoveredHotspot) {
              e.stopAll();

              _this57.hoveredHotspots.push(e.data.hotspot);
            }
          });
          this.on('hotspotLeft', function (e) {
            e.stopAll();

            var hoveredHotspot = _this57.getHoveredHotspots(e.data.hotspot.id);

            if (hoveredHotspot) {
              _this57.hoveredHotspots = _this57.hoveredHotspots.filter(function (hs) {
                return hs.id !== hoveredHotspot.id;
              });
            }
          });

          this.clickFn = function (e) {
            _this57.activeHotspots.forEach(function (hs) {
              if (!hs.isBoxAlwaysVisible()) {
                hs.hideBox(true);
              }
            });

            _this57.hoveredHotspots.forEach(function (hs) {
              if (!hs.isTooltipAlwaysVisible()) {
                hs.hideTooltip(true);
              }
            });
          };

          $($J.D).addEvent('click', this.clickFn);
        };

        _proto27.isHotspotActivated = function isHotspotActivated() {
          return this.activeHotspots.length > 0;
        };

        _proto27.createHotspots = function createHotspots(hotspotsData) {
          var _this58 = this;

          if (hotspotsData && hotspotsData.length) {
            hotspotsData.forEach(function (data) {
              _this58.createHotspot(data, _this58.hotspots.length);
            });
          }
        };

        _proto27.createHotspot = function createHotspot(hotspotData, index) {
          var hotspot = new Hotspot(this.container, hotspotData, index);
          hotspot.setParent(this);
          this.hotspots.push(hotspot);
        };

        _proto27.addHotspot = function addHotspot(hotspotsData) {
          if (!Array.isArray(hotspotsData)) {
            hotspotsData = [hotspotsData];
          }

          this.createHotspots(hotspotsData, this.hotspots.length);
        };

        _proto27.getRightBoundengClientRect = function getRightBoundengClientRect(hotspotsContainer) {
          if (!this.hotspots.length) {
            return this.instanceComponentNode ? this.instanceComponentNode.node.getBoundingClientRect() : hotspotsContainer.node.getBoundingClientRect();
          }

          return this.container.node.parentNode.getBoundingClientRect();
        };

        _proto27.changeBoxContainerParent = function changeBoxContainerParent(inside) {
          var c = inside ? this.container : null;
          this.hotspots.forEach(function (hotspot) {
            hotspot.changeBoxContainer(c);
          });
        };

        _proto27.hideActiveHotspotBox = function hideActiveHotspotBox(flag) {
          var result = this.activeHotspots.length || this.hoveredHotspots.length;
          this.activeHotspots.forEach(function (hs) {
            hs.hideBox(flag);
          });
          this.hoveredHotspots.forEach(function (hs) {
            hs.hideTooltip();
          });
          return result;
        };

        _proto27.show = function show(index) {
          var hs = this.hotspots[index];

          if (hs) {
            hs.show();
          }
        };

        _proto27.showAll = function showAll() {
          this.hotspots.forEach(function (hotspot) {
            hotspot.show();
          });
        };

        _proto27.hide = function hide(index) {
          var hs = this.hotspots[index];

          if (hs) {
            hs.hide();
          }
        };

        _proto27.hideAll = function hideAll() {
          this.hotspots.forEach(function (hotspot) {
            hotspot.hide();
          });
        };

        _proto27.enable = function enable(index) {
          var hs = this.hotspots[index];

          if (hs) {
            hs.enable();
            hs.show();
          }
        };

        _proto27.disable = function disable(index) {
          if (this.hotspots[index]) {
            this.hotspots[index].disable();
          }
        };

        _proto27.enableAll = function enableAll() {
          this.hotspots.forEach(function (hotspot) {
            hotspot.enable();
            hotspot.show();
          });
        };

        _proto27.disableAll = function disableAll() {
          this.hotspots.forEach(function (hotspot) {
            hotspot.disable();
          });
        };

        _proto27.showNeededElements = function showNeededElements() {
          this.hotspots.forEach(function (hs) {
            if (hs.isEnabled() && hs.isHotspotShown()) {
              if (hs.isBoxAlwaysVisible()) {
                if (hs.isBoxActivated()) {
                  hs.setBoxPosition();
                }

                hs.showBox();
              }

              if (hs.isTooltipAlwaysVisible()) {
                if (hs.isTooltipHovered()) {
                  hs.setTooltipPosition();
                }

                hs.showTooltip();
              }
            }
          });
        };

        _proto27.getHotspots = function getHotspots() {
          return this.hotspots;
        };

        _proto27.getPointerNodeHotspots = function getPointerNodeHotspots() {
          var pointers = [];
          this.hotspots.forEach(function (hotspot) {
            pointers.push(hotspot.getHotspotPointer());
          });
          return pointers;
        };

        _proto27.removeHotspot = function removeHotspot(index) {
          var hs = this.hotspots[index];

          if (hs) {
            hs.disable();
            hs.destroy();
            this.removeByIndex(index);

            if (!this.hotspots.length) {
              this.container.remove();
            }
          }
        };

        _proto27.removeAllHotspots = function removeAllHotspots() {
          for (var i = this.hotspots.length - 1; i >= 0; i--) {
            this.removeHotspot(i);
          }
        };

        _proto27.removeByIndex = function removeByIndex(index) {
          this.hotspots.splice(index, 1);

          if (this.hotspots.length > 0 && index === 0 || index > 0 && index <= this.hotspots.length - 1) {
            this.rewriteHotspotIndex(index);
          }
        };

        _proto27.rewriteHotspotIndex = function rewriteHotspotIndex(startIndex) {
          for (var index = startIndex, l = this.hotspots.length; index < l; index++) {
            this.hotspots[index].setId(index);
            this.hotspots[index].rewriteAttrPointer();
          }
        };

        _proto27.setStateById = function setStateById(index, settings) {
          if (this.hotspots[index]) {
            this.hotspots[index].setState(settings);
          }
        };

        _proto27.destroy = function destroy() {
          $($J.D).removeEvent('click', this.clickFn);
          this.hotspots.forEach(function (hotspot) {
            hotspot.destroy();
          });
          this.container = null;
          this.activeHotspots = [];
          this.hoveredHotspots = [];
          this.instanceComponentNode = null;
          this.off('hotspotActivate');
          this.off('hotspotDeactivate');
          this.off('hotspotHovered');
          this.off('hotspotLeft');
          this.hotspots = null;

          _EventEmitter6.prototype.destroy.call(this);
        };

        return Hotspots;
      }(EventEmitter);

      return Hotspots;
    });
    Sirv.define('SpinHotspots', ['bHelpers', 'magicJS', 'globalFunctions', 'EventEmitter', 'Hotspots', 'helper', 'Promise!'], function (bHelpers, magicJS, globalFunctions, EventEmitter, Hotspots, helper, Promise) {
      var moduleName = 'SpinHotspots';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* global Hotspots, helper*/

      /* eslint-disable guard-for-in */

      /* eslint-disable no-restricted-syntax */

      /* eslint-disable no-loop-func */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SpinHotspots" }] */

      var SpinHotspots = /*#__PURE__*/function (_Hotspots) {
        "use strict";

        bHelpers.inheritsLoose(SpinHotspots, _Hotspots);

        function SpinHotspots() {
          var _this59;

          _this59 = _Hotspots.call(this) || this;
          _this59.options = {
            rows: 1,
            columns: 36,
            rowsRevers: false,
            columnsRevers: false,
            originImageSize: {}
          };
          _this59.row = null;
          _this59.col = null;
          _this59.hotspotsSettings = [];
          return _this59;
        }

        var _proto28 = SpinHotspots.prototype;

        _proto28.setOptions = function setOptions(options) {
          this.options = $J.extend(this.options, options || {});
        };

        _proto28.getFrameIndex = function getFrameIndex() {
          var result;

          if (this.options.rowsRevers && this.options.columnsRevers) {
            result = (this.options.rows - this.row - 1) * this.options.columns + (this.options.columns - this.col);
          } else if (this.options.rowsRevers) {
            result = (this.options.rows - this.row - 1) * this.options.columns + this.col + 1;
          } else if (this.options.columnsRevers) {
            result = this.row * this.options.columns + (this.options.columns - this.col);
          } else {
            result = this.row * this.options.columns + this.col + 1;
          }

          return result;
        };

        _proto28.createHotspotsSettings = function createHotspotsSettings(dataSettings) {
          var _this60 = this;

          var firstFrame = true;

          var _loop = function (index, l) {
            var map = new Map();
            var settings = {};
            helper.objEach(dataSettings[index].frames, function (frame) {
              settings = dataSettings[index].frames[frame];
              settings.pointerPositionPercentage = {
                top: helper.isPercentage('' + dataSettings[index].frames[frame].pointer.y),
                left: helper.isPercentage('' + dataSettings[index].frames[frame].pointer.x)
              };
              helper.objEach(dataSettings[index], function (item) {
                if (item !== 'frames') {
                  if (!(item === 'data' && !firstFrame)) {
                    settings[item] = dataSettings[index][item];
                    firstFrame = false;
                  }
                }
              });
              map.set(parseInt(frame, 10), settings);
            });

            _this60.hotspotsSettings.push(map);

            firstFrame = true;
          };

          for (var index = 0, l = dataSettings.length; index < l; index++) {
            _loop(index, l);
          }
        };

        _proto28.createHotspots = function createHotspots(hotspotsData) {
          if (!Array.isArray(hotspotsData)) {
            hotspotsData = [hotspotsData];
          }

          this.createHotspotsSettings(hotspotsData);
          var hotspotSettings = this.getStartHotspotSettings();

          _Hotspots.prototype.createHotspots.call(this, hotspotSettings);
        };

        _proto28.addHotspot = function addHotspot(hotspotData) {
          if (!Array.isArray(hotspotData)) {
            hotspotData = [hotspotData];
          }

          this.createHotspotsSettings(hotspotData);
          var hotspotSettings = this.getStartHotspotSettings();

          _Hotspots.prototype.createHotspots.call(this, hotspotSettings.slice(hotspotSettings.length - hotspotData.length));

          this.updateAndShow();
        };

        _proto28.getStartHotspotSettings = function getStartHotspotSettings() {
          var tempHotspotData = [];
          this.hotspotsSettings.forEach(function (map) {
            var startSettings = null;

            if ($J.browser.uaName === 'ie') {
              map.forEach(function (value) {
                if (!startSettings) {
                  startSettings = value;
                }
              });
            } else if (map.entries().next().value) {
              startSettings = map.entries().next().value[1];
            }

            if (startSettings) {
              tempHotspotData.push(startSettings);
            }
          });
          return tempHotspotData;
        };

        _proto28.setFramePosition = function setFramePosition(row, col) {
          this.row = row;
          this.col = col;
        };

        _proto28.updateAndShow = function updateAndShow() {
          var _this61 = this;

          var frameIndex = this.getFrameIndex();
          this.hotspotsSettings.forEach(function (hotspotSettings, index) {
            var sett = hotspotSettings.get(frameIndex);
            var hs = _this61.hotspots[index];

            if (sett && hs.isEnabled()) {
              hs.setHotspotSettings(sett);

              if (hs.isHotspotShown()) {
                hs.setPointerPosition();

                _this61.showNeededElements();

                if (hs.isBoxAlwaysVisible()) {
                  hs.setBaseBoxSize(hs.box.getSize());
                  hs.setBoxPosition();
                }

                if (hs.isTooltipAlwaysVisible()) {
                  hs.setTooltipPosition();
                }
              } else {
                _this61.show(index);
              }
            } else {
              _this61.hide(index);
            }
          });
        };

        _proto28.hideNeededElements = function hideNeededElements(flag) {
          this.activeHotspots.forEach(function (hs) {
            if (!hs.isBoxAlwaysVisible()) {
              hs.hideBox(flag);
            }
          });
          this.hoveredHotspots.forEach(function (hs) {
            if (hs.isTooltipAlwaysVisible()) {
              hs.hideTooltip(flag);
            }
          });
        };

        _proto28.changeHotspotsPosition = function changeHotspotsPosition(row, col) {
          if (this.row !== row || this.col !== col) {
            this.setFramePosition(row, col);
            this.updateAndShow();
          }
        };

        _proto28.showAll = function showAll() {
          var _this62 = this;

          var position = this.getFrameIndex();
          this.hotspotsSettings.forEach(function (map, index) {
            if (map.get(position)) {
              _this62.show(index);
            }
          });
        };

        _proto28.enable = function enable(index) {
          if (this.hotspotsSettings[index]) {
            var hs = this.hotspots[index];
            hs.enable();

            if (this.hotspotsSettings[index].get(this.getFrameIndex())) {
              hs.show();
            }
          }
        };

        _proto28.setStateById = function setStateById(index, settings) {
          if (this.hotspots[index]) {
            this.hotspots[index].setState(settings, !this.hotspotsSettings[index].get(this.getFrameIndex()));
          }
        };

        _proto28.removeHotspot = function removeHotspot(index) {
          if (this.hotspots[index]) {
            this.hotspotsSettings.splice(index, 1);

            _Hotspots.prototype.removeHotspot.call(this, index);
          }
        };

        _proto28.destroy = function destroy() {
          _Hotspots.prototype.destroy.call(this);

          this.options = null;
          this.row = null;
          this.col = null;
          this.hotspotsSettings = null;
        };

        return SpinHotspots;
      }(Hotspots);

      return SpinHotspots;
    });
    Sirv.define('SliderBuilder', ['bHelpers', 'magicJS', 'EventEmitter', 'helper', 'globalVariables', 'globalFunctions', 'Promise!'], function (bHelpers, magicJS, EventEmitter, helper, globalVariables, globalFunctions, Promise) {
      var moduleName = 'SliderBuilder';
      var $J = magicJS;
      var $ = $J.$;
      /* eslint-env es6 */

      /* global $J, helper, Promise */

      /* eslint-disable no-extra-semi */

      /* eslint-disable no-unused-vars */

      /* eslint class-methods-use-this: ["error", {"exceptMethods": ["loadData"]}] */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      var SLIDER_BUILDER_CONF_VER = 1;

      var getInfoUrl = function (url, callbackName) {
        return url + ($J.stringHas(url, '?') ? '&' : '?') + 'nometa&info=' + callbackName;
      };

      var SliderBuilder = /*#__PURE__*/function () {
        "use strict";

        function SliderBuilder(sirvOption, node) {
          this.mainNode = $(node);
          this.sirvOptions = helper.deepExtend({}, sirvOption || {});
          this.nodes = [];
          this.configURL = null;
          this.dataJSON = null;
          this.configHash = null;
          this.attrbMainNode = null;
          this.cfCallbackName = null;
          this.urlParams = null;
          this.componentsList = [];
          this.referrerPolicy = this.mainNode.attr('data-referrerpolicy') || this.mainNode.attr('referrerpolicy') || 'no-referrer-when-downgrade';
        }

        var _proto29 = SliderBuilder.prototype;

        _proto29.getOptions = function getOptions() {
          var _this63 = this;

          return new Promise(function (resolve, reject) {
            if (_this63.checkNode()) {
              _this63.buildCallBackName();

              helper.getRemoteData(getInfoUrl(_this63.configURL, _this63.cfCallbackName), _this63.cfCallbackName, _this63.referrerPolicy).then(function (result) {
                if (result && result.assets) {
                  _this63.dataJSON = result;

                  _this63.buildOptions();

                  resolve({
                    'dataOptions': _this63.sirvOptions
                  });
                } else {
                  var contentType = globalVariables.SLIDE.TYPES.IMAGE;

                  if (result.layers) {
                    contentType = globalVariables.SLIDE.TYPES.SPIN;
                  }

                  resolve({
                    'content': contentType,
                    'dataOptions': _this63.sirvOptions
                  });
                }
              }).catch(function (error) {
                error = _this63.configURL;
                reject({
                  'error': _this63.configURL,
                  'dataOptions': _this63.sirvOptions
                });
              });
            } else {
              resolve({
                'dataOptions': _this63.sirvOptions
              });
            }
          });
        };

        _proto29.buildViewer = function buildViewer() {
          var _this64 = this;

          return new Promise(function (resolve, reject) {
            if (_this64.dataJSON) {
              var parsedURL = /(^https?:\/\/[^/]*)([^#?]*)\/.*$/.exec(_this64.configURL);
              var pathname = _this64.dataJSON.dirname || parsedURL[2];

              _this64.prepareListComponents(_this64.dataJSON.assets, parsedURL[1], pathname);

              _this64.generateComponents();

              _this64.addAllComponents();
            }

            resolve({
              'mainNode': _this64.mainNode
            });
          });
        };

        _proto29.prepareListComponents = function prepareListComponents(listComponents, origin, folderPath) {
          var _this65 = this;

          listComponents.forEach(function (component) {
            var path;
            var is3rd = /^(https?:)?\/\/[^/]/.test(component.name);

            if (is3rd) {
              path = component.name;
            } else if (/^\//.test(component.name)) {
              path = origin + component.name;
            } else {
              path = origin + folderPath + '/' + component.name;
            }

            _this65.componentsList.push({
              'path': is3rd ? path : globalFunctions.normalizeURL(path),
              'type': globalVariables.SLIDE.NAMES.indexOf(component.type),
              'is3rd': is3rd
            });
          });
        };

        _proto29.checkNode = function checkNode() {
          var result = false;
          var template = /([^#?]+)\/?([^#?]+\.view)(\?([^#]*))?(#(.*))?$/;

          if (this.mainNode) {
            this.attrbMainNode = this.mainNode.attr('data-src');

            if (this.attrbMainNode && template.test(this.attrbMainNode)) {
              result = true;
            }
          }

          return result;
        };

        _proto29.buildOptions = function buildOptions() {
          this.sirvOptions.common = helper.deepExtend(this.sirvOptions.common, this.dataJSON.settings || {});
          this.sirvOptions.mobile = helper.deepExtend(this.sirvOptions.mobile, this.dataJSON.settings || {});
        };

        _proto29.buildCallBackName = function buildCallBackName() {
          this.configURL = globalFunctions.normalizeURL(this.attrbMainNode.replace(globalVariables.REG_URL_QUERY_STRING, '$1'));
          this.urlParams = this.attrbMainNode.replace(globalVariables.REG_URL_QUERY_STRING, '$2');

          if (this.urlParams) {
            this.configURL += '?' + this.urlParams;
          }

          this.configHash = $J.getHashCode(this.configURL.replace(/^http(s)?:\/\//, ''));
          this.cfCallbackName = 'view-' + SLIDER_BUILDER_CONF_VER + '_' + this.configHash;
        };

        _proto29.generateComponents = function generateComponents() {
          var _this66 = this;

          this.componentsList.forEach(function (item) {
            var node = $J.$new('div');

            if (item.type === globalVariables.SLIDE.TYPES.IMAGE) {
              if (item.is3rd) {
                node = $J.$new('img');
                node.attr('data-type', 'static');
              } else {
                node.attr('data-type', 'zoom');
              }
            }

            var path = item.path;

            if (_this66.urlParams) {
              path += '?' + _this66.urlParams;
            }

            node.attr('data-src', path);

            _this66.nodes.push(node);
          });
        };

        _proto29.addAllComponents = function addAllComponents() {
          var _this67 = this;

          this.mainNode.node.innerHTML = '';
          this.nodes.forEach(function (item) {
            _this67.mainNode.node.appendChild(item.node);
          });
        };

        _proto29.destroy = function destroy() {
          this.mainNode = null;
          this.sirvOptions = null;
          this.nodes = [];
          this.configURL = null;
          this.dataJSON = null;
          this.configHash = null;
          this.cfCallbackName = null;
          this.componentsList = [];
        };

        return SliderBuilder;
      }();

      return SliderBuilder;
    });
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
    Sirv.define('ViewerImage', ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'helper', 'Promise!', 'ResponsiveImage', 'HotspotInstance', 'Hotspots', 'getDPPX'], function (bHelpers, magicJS, globalVariables, globalFunctions, helper, Promise, ResponsiveImage, HotspotInstance, Hotspots, getDPPX) {
      var moduleName = 'ViewerImage';
      var $J = magicJS;
      var $ = $J.$;
      /* global $, $J */

      /* global helper */

      /* global HotspotInstance */

      /* global globalVariables */

      /* global ResponsiveImage */

      /* global Hotspots */

      /* global getDPPX */

      /* eslint-disable indent */

      /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

      /* eslint-env es6 */

      var BRAND_LANDING = 'https://sirv.com/about-image/?utm_source=client&utm_medium=sirvembed&utm_content=typeofembed(image)&utm_campaign=branding'; // eslint-disable-next-line no-unused-vars

      var ViewerImage = /*#__PURE__*/function (_HotspotInstance) {
        "use strict";

        bHelpers.inheritsLoose(ViewerImage, _HotspotInstance);

        function ViewerImage(node, options) {
          var _this68;

          _this68 = _HotspotInstance.call(this, node, options, {}) || this;
          _this68.type = globalVariables.SLIDE.TYPES.IMAGE;

          _this68.instanceNode.attr('referrerpolicy', _this68.referrerPolicy);

          _this68.image = null;
          _this68.isInfoLoaded = false;
          _this68.getImageInfoPromise = null;
          _this68.loadStaticImagePromise = null;
          _this68.imageShowPromise = null;
          _this68.srcWasSetted = false;
          _this68.lastImageSize = {
            width: 0,
            height: 0
          };
          _this68.imageIndex = options.imageIndex;
          _this68.dppx = 1;
          _this68.upscale = false;
          _this68.size = {
            width: 0,
            height: 0
          };
          _this68.dontLoad = true;
          _this68.accountInfo = {};
          _this68.countOfTries = 1;
          _this68.isFullscreen = options.isFullscreen;
          _this68.nativeFullscreen = options.nativeFullscreen;
          _this68.infoAlt = null;
          _this68.originAlt = _this68.instanceNode.attr('alt');
          _this68.originTitle = _this68.instanceNode.attr('title');
          _this68.src = _this68.instanceNode.attr('src');
          _this68.srcset = _this68.instanceNode.attr('srcset');
          _this68.startedSrc = _this68.src;
          _this68.dataSrc = _this68.instanceNode.attr('data-src');
          _this68.isStaticImage = _this68.src && !_this68.dataSrc;
          _this68.imageUrl = _this68.dataSrc || _this68.src;
          _this68.getImageTimer = helper.debounce(function () {
            _this68.getImage();
          }, 32);
          _this68.firstSlideAhead = false; // Image URL

          _this68.src = globalFunctions.normalizeURL(_this68.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$1'));
          _this68.queryParamsQuality = null;
          _this68.queryParams = helper.paramsFromQueryString(_this68.imageUrl.replace(globalVariables.REG_URL_QUERY_STRING, '$2')); // Image default params

          _this68.getQueryParams();

          _this68.isNotSirv = false;

          if (helper.isSVG(_this68.imageUrl)) {
            _this68.isNotSirv = true;
          } // this.api = $J.extend(this.api, {
          //     isReady: this.isReady.bind(this), // parent class
          //     resize: this.resize.bind(this), // parent class
          //     getOptions: this.getOptions.bind(this) // parent class
          //     hotspots: {} // parent class, hotspots api
          // });


          _this68.createHotspotsClass(Hotspots);

          _this68.createSirvImage();

          return _this68;
        }

        var _proto30 = ViewerImage.prototype;

        _proto30.sendEvent = function sendEvent(typeOfEvent, data) {
          if (!data) {
            data = {};
          }

          data.imageIndex = this.imageIndex;

          _HotspotInstance.prototype.sendEvent.call(this, typeOfEvent, data);
        };

        _proto30.getInfo = function getInfo() {
          var _this69 = this;

          if (!this.gettingInfoPromise) {
            this.gettingInfoPromise = new Promise(function (resolve, reject) {
              _this69.waitGettingInfo.wait(function () {
                _this69.image.getImageInfo().then(function (info) {
                  if (!_this69.destroyed) {
                    _this69.isInfoLoaded = true;
                    _this69.infoAlt = _this69.image.getDescription();
                    _this69.infoSize = _this69.image.getOriginSize();
                    _this69.accountInfo = _this69.image.getAccountInfo();
                    _this69.hotspotsData = info.hotspots;

                    if (_this69.hotspots) {
                      _this69.hotspots.setOriginImageSize(_this69.infoSize.width, _this69.infoSize.height);
                    }

                    resolve();
                  }
                }).catch(function (err) {
                  if (!_this69.destroyed) {
                    _this69.isInfoLoaded = true;

                    if (!err.status || err.status !== 404) {
                      _this69.isNotSirv = true;
                    }

                    reject(err);
                  }
                });
              });
            });
          }

          return this.gettingInfoPromise;
        };

        _proto30.getQueryParams = function getQueryParams() {
          if (this.imageUrl) {
            if (this.queryParams) {
              var q = parseInt(this.queryParams.quality, 10);

              if (isNaN(q)) {
                delete this.queryParams.quality;
              } else {
                this.queryParams.quality = q;
              }
            }

            this.queryParamsQuality = this.queryParams.quality || null;
          }
        };

        _proto30.getImageCreateSettings = function getImageCreateSettings() {
          var setts = {
            src: {},
            srcset: {}
          };

          if (this.quality !== null && this.queryParamsQuality === null) {
            setts.src.quality = this.quality;
          }

          var hdQuality = this.hdQuality;

          if (this.queryParamsQuality === null || this.isHDQualitySet && hdQuality < this.queryParamsQuality) {
            setts.srcset = {
              quality: hdQuality
            };
          }

          setts.width = this.size.width;

          if (this.size.height) {
            setts.height = this.size.height;
          }

          setts = helper.imageLib.checkMaxSize(setts, this.infoSize);

          if (this.infoSize.width === setts.width || this.infoSize.height === setts.height) {
            setts.round = false;
          }

          if ($J.DPPX > 1) {
            setts.dppx = this.dppx;
          }

          return setts;
        };

        _proto30.setHDQuality = function setHDQuality(opt) {
          if (opt.dppx > 1 && opt.dppx < 1.5) {
            if (this.queryParamsQuality === null && this.quality !== null) {
              opt.srcset.quality = this.quality;
            } else if (opt.srcset) {
              delete opt.srcset.quality;
            }
          }

          return opt;
        };

        _proto30.replaceSrc = function replaceSrc() {
          var img;

          if (this.isNotSirv) {
            if (this.srcWasSetted) {
              return;
            }

            this.srcWasSetted = true;
            img = {
              src: this.imageUrl
            };
          } else {
            var opt = this.getImageCreateSettings();

            if (opt.dppx > 1 && opt.dppx < 1.5) {
              delete opt.srcset.quality;
            }

            opt = this.setHDQuality(opt);
            img = this.image.getImage(opt);
            this.lastImageSize.width = img.width || img.serverWidth;
            this.lastImageSize.height = img.height || img.serverHeight;
          }

          this.instanceNode.attr('src', img.src);

          if (img.srcset) {
            if (!this.isNotSirv && this.dppx > 1) {
              this.instanceNode.attr('srcset', img.srcset + ' ' + this.dppx + 'x');
            }
          } else {
            this.instanceNode.removeAttr('srcset');
          }
        };

        _proto30.showImage = function showImage() {
          var _this70 = this;

          if (!this.imageShowPromise) {
            // eslint-disable-next-line
            this.imageShowPromise = new Promise(function (resolve, reject) {
              if (_this70.isStaticImage) {
                _this70.instanceNode.setCssProp('opacity', '');

                resolve();
              } else if (_this70.isInView && _this70.isSlideShown) {
                _this70.instanceNode.addEvent('transitionend', function (e) {
                  if (e.propertyName === 'opacity') {
                    e.stop();

                    _this70.instanceNode.removeEvent('transitionend');

                    _this70.instanceNode.setCss({
                      opacity: '',
                      transition: ''
                    });

                    resolve();
                  }
                });

                _this70.instanceNode.getSize();

                _this70.instanceNode.setCss({
                  opacity: 1,
                  transition: 'opacity 0.3s linear'
                });
              } else {
                _this70.instanceNode.setCssProp('opacity', '');

                resolve();
              }
            });
          }

          return this.imageShowPromise;
        };

        _proto30.createSirvImage = function createSirvImage() {
          var _this71 = this;

          if (!this.imageUrl || this.isNotSirv) {
            return;
          }

          this.on('imageOnload', function (e) {
            e.stopAll();

            _this71.replaceSrc();

            if (!_this71._isReady) {
              if (e.data.node) {
                _this71.showImage().finally(function () {
                  _this71.done();
                });
              } else {
                helper.loadImage(_this71.instanceNode).finally(function () {
                  _this71.showImage().finally(function () {
                    _this71.done();

                    _this71.sendContentLoadedEvent();
                  });
                });
              }
            }
          });
          this.on('imageOnerror', function (e) {
            e.stopAll();
            console.log('image error');
          });
          this.image = new ResponsiveImage(this.imageUrl, {
            imageSettings: this.queryParams,
            round: true,
            dontLoad: this.dontLoad,
            referrerPolicy: this.referrerPolicy
          });
          this.image.setParent(this);
          this.getInfo();
        };

        _proto30.getInfoSize = function getInfoSize() {
          var _this72 = this;

          if (!this.getImageInfoPromise) {
            this.getImageInfoPromise = new Promise(function (resolve, reject) {
              if (_this72.image) {
                _this72.getInfo().then(function () {
                  resolve({
                    size: _this72.infoSize,
                    imageIndex: _this72.imageIndex
                  });
                }).catch(function (err) {
                  reject({
                    error: err,
                    isPlaceholder: err._isplaceholder,
                    imageIndex: _this72.imageIndex
                  });
                });
              } else {
                reject({
                  error: 'nonsirv',
                  isPlaceholder: false,
                  imageIndex: _this72.imageIndex
                });
              }
            });
          }

          return this.getImageInfoPromise;
        };

        _proto30.startFullInit = function startFullInit(options) {
          if (this.isStartedFullInit) {
            return;
          }

          _HotspotInstance.prototype.startFullInit.call(this, options);

          this.getId('responsive-image-'); // TODO check css

          if (!this.isStaticImage) {
            this.instanceNode.setCssProp('opacity', 0);
          }
        };

        _proto30.run = function run(isShown, preload, firstSlideAhead, loadContent) {
          var _this73 = this;

          this.firstSlideAhead = firstSlideAhead;

          var result = _HotspotInstance.prototype.run.call(this, isShown, preload, firstSlideAhead);

          if (result) {
            if (this.destroyed) {
              result = false;
            } else {
              // Remove ALT to properly calculate image size.
              // Safari and Edge/IE return image size with a height if ALT text is present.
              this.instanceNode.removeAttr('alt'); // Remove TITLE to properly calculate image size.
              // The latest version(s) of Chrome returns image size with a height if TITLE is set.

              this.instanceNode.removeAttr('title'); // This force browsers to re-layout image and recalculate its dimensions.

              this.instanceNode.setCss({
                display: 'inline-flex'
              }).getSize();
              this.instanceNode.setCss({
                display: ''
              }).getSize();
              var size = null;
              helper.imageLib.getSize(this.instanceNode.node.parentNode).then(function (dataSize) {
                size = dataSize;
              }).finally(function () {
                if (!_this73.destroyed) {
                  // sometimes when we have very slow internet connection and the image is first slide and thumbnails have left position we get wrong height
                  if (size.width && size.height <= 20) {
                    size.height = 0;
                  } // size = helper.fixSize(this.instanceNode, size);


                  _this73.size = helper.imageLib.calcProportionSize(size, _this73.infoSize);

                  if (_this73.originAlt || _this73.infoAlt) {
                    // Restore ALT text
                    $(_this73.instanceNode).attr('alt', _this73.originAlt || _this73.infoAlt);
                  }

                  if (_this73.originTitle) {
                    // Restore TITLE text
                    $(_this73.instanceNode).attr('title', _this73.originTitle);
                  }

                  if (_this73.isStaticImage) {
                    _this73.loadStaticImage().finally(function () {
                      if (_this73.isInfoLoaded) {
                        _this73.done();
                      }
                    });
                  } else {
                    if (_this73.originAlt) {
                      // Restore ALT text
                      $(_this73.instanceNode).attr('alt', _this73.originAlt);
                    }

                    if (_this73.isInView && (_this73.isSlideShown || _this73.preload || loadContent)) {
                      _this73.getImage();
                    }
                  }

                  if (_this73.dataAlt) {
                    $(_this73.instanceNode).attr('alt', _this73.dataAlt);
                  }
                }
              });
              this.startGettingInfo();
            }
          }

          return result;
        };

        _proto30.loadContent = function loadContent() {
          this.getImage(true);
        };

        _proto30.loadStaticImage = function loadStaticImage() {
          var _this74 = this;

          if (!this.loadStaticImagePromise) {
            this.loadStaticImagePromise = new Promise(function (resolve, reject) {
              if (_this74.isStaticImage) {
                if (_this74.instanceNode.node.complete) {
                  resolve();
                } else {
                  // eslint-disable-next-line
                  _this74.instanceNode.addEvent('load', function (e) {
                    _this74.sendContentLoadedEvent();

                    resolve();
                  }); // eslint-disable-next-line


                  _this74.instanceNode.addEvent('error', function (e) {
                    reject();
                  });
                }
              } else {
                resolve();
              }
            });
          }

          return this.loadStaticImagePromise;
        };

        _proto30.getImage = function getImage(loadContent) {
          var _this75 = this;

          if (this.isStaticImage) {
            return;
          }

          if (!this.isNotSirv && !this._isReady && !this.size.width && !this.size.height) {
            // fix for if the viewer was with display none
            if (this.countOfTries < 100) {
              setTimeout(function () {
                _this75.countOfTries += 1;
                _this75.isStarted = false;

                _this75.run(_this75.isSlideShown, _this75.preload, _this75.firstSlideAhead, loadContent);
              }, 16 * this.countOfTries);
            }

            return;
          }

          this.waitToStart.start();

          if (this.isNotSirv) {
            this.replaceSrc();
          } else {
            this.getSirvImg();
          }
        };

        _proto30.getImageClassContainer = function getImageClassContainer() {
          return this.image;
        };

        _proto30.getSirvImg = function getSirvImg() {
          var setts = this.getImageCreateSettings();

          if ($J.DPPX > 1) {
            var originSize = this.image.getOriginSize();
            this.dppx = getDPPX(setts.width, setts.height, originSize.width, originSize.height, !$J.defined(setts.round) || setts.round, this.upscale);
            setts.dppx = this.dppx;
          }

          setts = this.setHDQuality(setts);

          if (this.checkImage(setts, this.dontLoad)) {
            this.replaceSrc();
          } else {
            this.image.getImage(setts);
          }
        };

        _proto30.getOriginImageUrl = function getOriginImageUrl() {
          return this.src;
        };

        _proto30.done = function done() {
          if (!this._isReady) {
            if (this.accountInfo.branded) {
              var n = this.instanceNode;

              if (n.getTagName() === 'img') {
                n = n.node.parentNode;
              }

              var nodeWithSirvClassName = globalFunctions.getNodeWithSirvClassName(this.instanceNode) || $J.D.node.head || $J.D.node.body;
              globalFunctions.rootDOM.showSirvAd(nodeWithSirvClassName, n, BRAND_LANDING, 'Image viewer by Sirv');
            }

            _HotspotInstance.prototype.done.call(this);

            if (this.hotspots) {
              this.hotspots.setContainerSize(this.instanceNode.node.getBoundingClientRect());
            }

            if (!this.isFullscreenEnabled) {
              this.pinchCloud.removeEvent();
              this.pinchCloud = null;
            }
          }
        };

        _proto30.getSelectorImgUrl = function getSelectorImgUrl(data) {
          var _this76 = this;

          return new Promise(function (resolve, reject) {
            var defOpt = _this76.getImageCreateSettings();

            if (defOpt.src) {
              data.src = defOpt.src;
            }

            data.srcset = defOpt.srcset;

            if (_this76.isInfoLoaded) {
              _this76.waitToStart.wait(function () {
                resolve($J.extend(_this76.image.getThumbnail(data), {
                  imageIndex: _this76.imageIndex,
                  alt: _this76.dataAlt || _this76.originAlt || _this76.infoAlt,
                  'referrerpolicy': _this76.instanceNode.attr('referrerpolicy')
                }));
              });
            } else {
              _this76.getInfo().then(function () {
                _this76.waitToStart.wait(function () {
                  resolve($J.extend(_this76.image.getThumbnail(data), {
                    imageIndex: _this76.imageIndex,
                    alt: _this76.dataAlt || _this76.originAlt || _this76.infoAlt,
                    referrerpolicy: _this76.instanceNode.attr('referrerpolicy')
                  }));
                });
              }).catch(reject);
            }
          });
        };

        _proto30.getThumbnailData = function getThumbnailData(opt) {
          return this.image.getThumbnail(opt);
        };

        _proto30.createPinchEvent = function createPinchEvent() {
          var _this77 = this;

          // difference between scale
          var FS_OUT = 0.2;
          var FS_IN = 2;

          _HotspotInstance.prototype.createPinchEvent.call(this, this.instanceNode);

          this.pinchCloud.onPinchStart = function (e) {
            if ($J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.CLOSING], _this77.fullscreenState)) {
              return;
            }

            _this77.pinchCloud.pinch = true;
            _this77.pinchCloud.scale = e.scale;

            _this77.sendEvent('pinchStart');
          };

          this.pinchCloud.onPinchMove = function (e) {
            if (_this77.pinchCloud.pinch && !_this77.pinchCloud.block) {
              if (_this77.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
                if (e.scale < FS_OUT) {
                  _this77.pinchCloud.block = true;

                  _this77.sendEvent('fullscreenOut');
                }
              } else if (e.scale >= FS_IN) {
                _this77.pinchCloud.block = true;

                _this77.sendEvent('fullscreenIn');
              }
            }
          };
        };

        _proto30.onStartActions = function onStartActions() {
          if (!this._isReady) {
            if (this.isInView && this.isStarted) {
              if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
                this.onResize();
              }

              if (this.always) {
                /*
                    it can happen when fullscreen always is true and we came to this slide by thumbnail
                    we need timer to clear it in 'onBeforeFullscreenIn' handler and don't if we are in standard mode
                */
                this.getImageTimer();
              } else {
                this.getImage();
              }
            }
          }

          _HotspotInstance.prototype.onStartActions.call(this);
        };

        _proto30.onStopActions = function onStopActions() {
          _HotspotInstance.prototype.onStopActions.call(this);
        };

        _proto30.onInView = function onInView(value) {
          if (value && !this.isStaticImage) {
            if (!this._isReady && !this.isInView) {
              if (this.isStarted) {
                this.isInView = true;

                if (this.isInfoLoaded && (this.preload || this.isSlideShown)) {
                  this.getImage();
                }
              }
            }
          }
        } // eslint-disable-next-line no-unused-vars
        ;

        _proto30.onBeforeFullscreenIn = function onBeforeFullscreenIn(data) {
          this.getImageTimer.cancel();

          if (this._isReady && !this.isStaticImage) {
            this.instanceNode.setCssProp('visibility', 'hidden');
          }

          _HotspotInstance.prototype.onBeforeFullscreenIn.call(this, data);

          if (this.hotspots) {
            this.hotspots.disableAll();
          }
        } // eslint-disable-next-line no-unused-vars, class-methods-use-this
        ;

        _proto30.onAfterFullscreenIn = function onAfterFullscreenIn(data) {
          var _this78 = this;

          // if we use it, we do not have pinchend event and touchdrag after that
          // if (this.pinchCloud) {
          //     this.pinchCloud.removeEvent();
          //     this.pinchCloud.addEvent();
          // }
          if (this.always && !this._isReady && this.isInView && this.isStarted) {
            this.onResize();
            this.getImage();
          }

          if (this.hotspots) {
            setTimeout(function () {
              // we have to wait a little bit for 'onResize' function
              if (_this78.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
                // if we will exit from fullscreen before the timeout end
                _this78.hotspots.enableAll();

                if (_this78.isInView && _this78.isSlideShown) {
                  _this78.hotspots.showNeededElements();
                }
              }
            }, 100);
          }
        } // eslint-disable-next-line no-unused-vars
        ;

        _proto30.onBeforeFullscreenOut = function onBeforeFullscreenOut(data) {
          this.instanceNode.setCss({
            width: '',
            height: '',
            visibility: ''
          });

          _HotspotInstance.prototype.onBeforeFullscreenOut.call(this, data);
        } // eslint-disable-next-line no-unused-vars, class-methods-use-this
        ;

        _proto30.onAfterFullscreenOut = function onAfterFullscreenOut(data) {
          // if we use it, we do not have pinchend event and touchdrag after that
          // if (this.pinchCloud) {
          //     this.pinchCloud.removeEvent();
          //     this.pinchCloud.addEvent();
          // }
          _HotspotInstance.prototype.onAfterFullscreenOut.call(this, data);
        };

        _proto30.onResize = function onResize() {
          if (!this.isStarted || this.isStaticImage || this.isNotSirv) {
            return false;
          }

          if (this.isFullscreenActionEnded()) {
            var size = $(this.instanceNode.node.parentNode).getSize();
            size = helper.imageLib.calcProportionSize(size, this.infoSize);

            if (this.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
              this.instanceNode.setCss({
                width: size.width + 'px',
                height: size.height + 'px'
              });
              this.instanceNode.setCssProp('visibility', '');
            }

            this.size.width = size.width;

            if (this.size.height) {
              this.size.height = size.height;
            }

            if (this._isReady) {
              var upscale = 50;

              if (this.size.width - this.lastImageSize.width > upscale || this.size.height - this.lastImageSize.height > upscale) {
                this.getImage();
              }

              if (this.hotspots) {
                this.hotspots.setContainerSize(this.instanceNode.node.getBoundingClientRect());

                if (this.isInView && this.isSlideShown) {
                  this.hotspots.showNeededElements();
                }
              }
            }

            return true;
          }

          return false;
        };

        _proto30.getType = function getType() {
          return this.type;
        };

        _proto30.destroy = function destroy() {
          if (this.image) {
            this.off('imageOnload');
            this.off('imageOnerror');
            this.image.destroy();
            this.image = null;
          }

          this.getImageTimer.cancel();
          this.getImageTimer = null;
          this.instanceNode.setCssProp('opacity', '');

          if (this.hotspot) {
            $(this.instanceNode.node.parentNode).removeEvent('tap');
          }

          if (this.instanceNode.node.hasAttribute('src')) {
            try {
              this.instanceNode.removeAttr('src');

              if (this.isStaticImage) {
                this.instanceNode.attr('src', this.imageUrl);
              }
            } catch (e) {// empty
            }
          }

          if (!this.isStaticImage) {
            this.instanceNode.removeAttr('src');
          } else {
            this.instanceNode.attr('src', this.src);
          }

          if (this.srcset) {
            this.instanceNode.attr('srcset', this.srcset);
          } else {
            try {
              this.instanceNode.removeAttr('srcset');
            } catch (e) {// empty
            }
          }

          this.srcset = null;

          if (!this.originAlt && (this.infoAlt || this.dataAlt)) {
            this.instanceNode.removeAttr('alt');
          }

          this.instanceNode.removeEvent('load');
          this.hotspotsData = null;

          _HotspotInstance.prototype.destroy.call(this);

          return true;
        };

        return ViewerImage;
      }(HotspotInstance);

      return ViewerImage;
    });
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
    Sirv.define('Slider', ['require', 'module', 'bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'ResponsiveImage', 'helper', 'Promise!', 'EventEmitter', 'ContextMenu', 'ComponentLoader', 'defaultsVideoOptions', 'ViewerImage', 'SliderBuilder'], function (sirvRequire, sirvModule, bHelpers, magicJS, globalVariables, globalFunctions, ResponsiveImage, helper, Promise, EventEmitter, ContextMenu, ComponentLoader, defaultsVideoOptions, ViewerImage, SliderBuilder) {
      var moduleName = 'Slider';
      var $J = magicJS;
      var $ = $J.$;
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


      var SirvService = /*#__PURE__*/function (_EventEmitter7) {
        "use strict";

        bHelpers.inheritsLoose(SirvService, _EventEmitter7);

        function SirvService(node, options, additionalOptions) {
          var _this79;

          _this79 = _EventEmitter7.call(this) || this;
          _this79.node = $(node);
          _this79.options = options;
          _this79.type = globalVariables.SLIDE.TYPES.NONE;
          _this79.imgSrc = null;
          _this79.effect = null;
          _this79.additionalEffects = [];
          _this79.isStarted = false;
          _this79.isPrepared = false;
          _this79.toolOptions = {};
          _this79.api = {};
          _this79.isActive = false;
          _this79.additionalOptions = additionalOptions;

          _this79.parse();

          _this79.setEvents();

          return _this79;
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

        var _proto31 = SirvService.prototype;

        _proto31.createAPI = function createAPI() {
          var _this80 = this;

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
              var _oldMethod = _this80.api[method];

              _this80.api[method] = function () {
                var result = false;
                var om = _oldMethod;

                if (_this80.isActive) {
                  for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                    args[_key5] = arguments[_key5];
                  }

                  result = om.apply(_this80, args);
                }

                return result;
              };
            });
          }
        };

        _proto31.setEvents = function setEvents() {
          var _this81 = this;

          this.on('stats', function (e) {
            e.stopEmptyEvent();
            e.data.component = globalVariables.SLIDE.NAMES[_this81.type];
          }); // init, ready, zoomIn, zoomOut

          this.on('componentEvent', function (e) {
            e.stopEmptyEvent();
            e.data.component = globalVariables.SLIDE.NAMES[_this81.type];

            if (e.data.type === 'ready') {
              if (_this81.type === globalVariables.SLIDE.TYPES.IMAGE && e.data.data.imageIndex !== null) {
                e.stopAll();
              }

              _this81.toolOptions = _this81.effect.getOptions();
            }
          });
        };

        _proto31.parse = function parse() {
          var resultOfParse = helper.getSirvType(this.node.node);

          if (resultOfParse) {
            this.type = resultOfParse.type;
            this.imgSrc = resultOfParse.imgSrc;
          }
        };

        _proto31.push = function push(imgNode) {
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

        _proto31.sendEvent = function sendEvent(nameOfEvent) {
          if (this.effect && this.effect.sendEvent) {
            this.effect.sendEvent(nameOfEvent);
          }
        };

        _proto31.resize = function resize() {
          this.broadcast('resize');
        };

        _proto31.startFullInit = function startFullInit(options) {
          var _this82 = this;

          if (this.effect) {
            this.effect.startFullInit(options ? options[this.type] : null);

            if (this.additionalEffects.length) {
              this.additionalEffects.forEach(function (effect) {
                if (effect.effect) {
                  effect.effect.startFullInit(options ? options[_this82.type] : null);
                }
              });
            }
          }
        };

        _proto31.getSelectorImgUrl = function getSelectorImgUrl(data) {
          return this.effect.getSelectorImgUrl(data);
        };

        _proto31.getInfoSize = function getInfoSize() {
          var _this83 = this;

          var result = null;

          if (this.type === globalVariables.SLIDE.TYPES.IMAGE) {
            result = new Promise(function (resolve, reject) {
              Promise.all([_this83.effect.getInfoSize()].concat(_this83.additionalEffects.map(function (value) {
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

        _proto31.start = function start() {
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

        _proto31.isThumbnailGif = function isThumbnailGif() {
          if (this.effect && this.type === globalVariables.SLIDE.TYPES.SPIN) {
            return this.effect.isThumbnailGif();
          }

          return false;
        };

        _proto31.isZoomSizeExist = function isZoomSizeExist() {
          var t = globalVariables.SLIDE.TYPES;

          if (this.effect && $J.contains([t.SPIN, t.PANZOOM, t.ZOOM], this.type)) {
            return this.effect.isZoomSizeExist();
          }

          return false;
        };

        _proto31.startGettingInfo = function startGettingInfo() {
          if (this.effect) {
            this.effect.startGettingInfo();
          }
        };

        _proto31.startTool = function startTool(isShown, preload, firstSlideAhead) {
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

        _proto31.loadContent = function loadContent() {
          if (this.isStarted) {
            this.effect.loadContent();
          }
        };

        _proto31.loadThumbnail = function loadThumbnail() {
          if (this.isStarted) {
            this.effect.loadThumbnail();
          }
        };

        _proto31.getType = function getType() {
          return this.type;
        };

        _proto31.getData = function getData() {
          var result = {};

          if (this.effect) {
            result = $J.extend(result, this.api);
            delete result.start;
            delete result.stop;
            delete result.refresh;
          }

          return result;
        };

        _proto31.getOriginImageUrl = function getOriginImageUrl() {
          if (this.effect) {
            return this.effect.getOriginImageUrl();
          }

          return null;
        };

        _proto31.getZoomData = function getZoomData() {
          if ($J.contains([globalVariables.SLIDE.TYPES.SPIN, globalVariables.SLIDE.TYPES.ZOOM], this.type)) {
            return {
              isZoomed: this.effect.isZoomed(),
              zoom: this.effect.getZoomData()
            };
          }

          return null;
        };

        _proto31.getSpinOrientation = function getSpinOrientation() {
          if (this.type === globalVariables.SLIDE.TYPES.SPIN) {
            return this.effect.getOrientation();
          }

          return null;
        };

        _proto31.getSocialButtonData = function getSocialButtonData(data, isSpin) {
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

        _proto31.loadVideoSources = function loadVideoSources() {
          if (this.effect) {
            this.effect.addSources();
          }
        }
        /**
         * Viewer has touchdrag event for slideing slides and if we have touchdrag event in the effect (spin) it can make conflict
         * The method fixes conflict
         */
        ;

        _proto31.isEffectActive = function isEffectActive() {
          if (this.effect && this.type === 'spin') {
            return this.effect.isActive();
          }

          return false;
        };

        _proto31.activate = function activate() {
          if (!this.isActive) {
            this.isActive = true;
          }
        };

        _proto31.deactivate = function deactivate() {
          this.isActive = false;
        };

        _proto31.getToolOptions = function getToolOptions() {
          return this.toolOptions;
        };

        _proto31.destroy = function destroy() {
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

          _EventEmitter7.prototype.destroy.call(this);
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

        var Effect_ = /*#__PURE__*/function (_EventEmitter8) {
          "use strict";

          bHelpers.inheritsLoose(Effect_, _EventEmitter8);

          function Effect_(options) {
            var _this84;

            _this84 = _EventEmitter8.call(this) || this;
            _this84.options = $J.extend({
              effect: 'blank',
              orientation: 'horizontal',
              time: 600,
              easing: 'ease-in-out'
            }, options);
            _this84.isMove = false;
            _this84.callbackData = null;
            _this84.effectName = 'blank';
            _this84.effect = null;

            _this84.setEvents();

            return _this84;
          }

          var _proto32 = Effect_.prototype;

          _proto32.setEvents = function setEvents() {
            var _this85 = this;

            this.on('effectStart', function (e) {
              e.data = {
                callbackData: _this85.callbackData
              };
              _this85.isMove = true;
            });
            this.on('effectEnd', function (e) {
              e.data = {
                callbackData: _this85.callbackData
              };
              _this85.isMove = false;

              _this85.effect.destroy();

              _this85.effect = null;
            });
          };

          _proto32.getNamesOfEffects = function getNamesOfEffects() {
            return $J.hashKeys(Effects);
          };

          _proto32.make = function make(element1, element2, options, callbackData) {
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

          _proto32.stop = function stop() {
            if (this.effect) {
              this.effect.destroy();
              this.effect = null;
            }

            this.callbackData = null;
          };

          _proto32.destroy = function destroy() {
            this.stop();
            this.off('effectStart');
            this.off('effectEnd');
            this.isMove = false;

            _EventEmitter8.prototype.destroy.call(this);
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


      var Blank_ = /*#__PURE__*/function (_EventEmitter9) {
        "use strict";

        bHelpers.inheritsLoose(Blank_, _EventEmitter9);

        function Blank_(element1, element2, options) {
          var _this86;

          _this86 = _EventEmitter9.call(this) || this;
          _this86.name = 'blank';
          _this86.elements = [element1, element2];
          _this86.elements[0].node = $(_this86.elements[0].node);
          _this86.elements[1].node = $(_this86.elements[1].node);
          _this86.options = $J.extend({}, options || {});
          _this86.states = {
            NOT_STARTED: 0,
            MOVING: 1,
            ENDED: 2
          };
          _this86.state = _this86.states.NOT_STARTED;
          _this86.isDestroyed = false;
          return _this86;
        }

        var _proto33 = Blank_.prototype;

        _proto33._show = function _show(index) {
          this.elements[index].node.setCss({
            opacity: 1,
            visibility: 'visible'
          });
        };

        _proto33._hide = function _hide(index) {
          this.elements[index].node.setCss({
            opacity: 0,
            visibility: 'hidden'
          });
        };

        _proto33._start = function _start() {
          this.emit('effectStart', {
            name: this.name,
            indexes: [this.elements[0].index, this.elements[1].index]
          });

          this._show(0);

          this.elements[0].node.setCssProp('z-index', 9);

          this._show(1);

          this.elements[1].node.setCssProp('z-index', 7);
        };

        _proto33._move = function _move(callback) {
          callback();
        };

        _proto33._end = function _end() {
          if (this.state !== this.states.ENDED) {
            this.state = this.states.ENDED;

            this._hide(0);

            this.emit('effectEnd', {
              name: this.name,
              indexes: [this.elements[0].index, this.elements[1].index]
            });
          }
        };

        _proto33._clear = function _clear() {
          this.elements.forEach(function (element) {
            element.node.setCss({
              zIndex: '',
              opacity: '',
              visibility: ''
            });
          });
        };

        _proto33.make = function make() {
          var _this87 = this;

          if (this.state === this.states.NOT_STARTED) {
            this.state = this.states.MOVING;

            this._start();

            this._move(function () {
              _this87._end();

              _this87._clear();
            });
          }
        };

        _proto33.destroy = function destroy() {
          if (!this.isDestroyed) {
            this.isDestroyed = true;

            this._end();

            this._clear();

            this.state = this.states.ENDED;

            _EventEmitter9.prototype.destroy.call(this, this);
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
            var _this88;

            _this88 = _Blank_.call(this, element1, element2, options) || this;
            _this88.options = $J.extend(_this88.options, $J.extend({
              direction: 'left',
              // top / left / right / bottom
              time: 600,
              easing: 'ease-in-out'
            }, options || {}));
            _this88.name = 'slide';
            _this88.from = $([0, -100]);
            _this88.to = $([100, 0]);

            if ($J.contains(['right', 'bottom'], _this88.options.direction)) {
              _this88.from[1] *= -1;
              _this88.to[0] *= -1;
            }

            _this88.from = getNormalizeArray(_this88.from);
            _this88.to = getNormalizeArray(_this88.to);
            return _this88;
          }

          var _proto34 = Slide_.prototype;

          _proto34._show = function _show(index) {
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

          _proto34._move = function _move(callback) {
            var _this89 = this;

            var options = this.options;
            this.elements[1].node.addEvent('transitionend', function (e) {
              if (_this89.elements[1].node.node !== e.getTarget()) {
                return;
              }

              e.stop();

              _Blank_.prototype._move.call(_this89, callback);
            });
            this.elements.forEach(function (element, index) {
              element.node.getSize();
              element.node.setCssProp('transition', 'transform ' + options.time + 'ms ' + options.easing);
              element.node.setCssProp('transform', 'translate3d(' + _this89.to[index] + ', 0px)');
            });
          };

          _proto34._clear = function _clear() {
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
          var _this90;

          _this90 = _Blank_2.call(this, element1, element2, options) || this;
          _this90.options = $J.extend(_this90.options, $J.extend({
            time: 600,
            easing: 'linear'
          }, options || {}));
          _this90.name = 'fade';
          _this90.from = $([1, 0]);
          _this90.to = $([0, 1]);
          return _this90;
        }

        var _proto35 = Fade_.prototype;

        _proto35._show = function _show(index) {
          _Blank_2.prototype._show.call(this, index);

          var el = this.elements[index].node;
          el.setCssProp('opacity', this.from[index]);
        };

        _proto35._move = function _move(callback) {
          var _this91 = this;

          var options = this.options;
          this.elements[1].node.addEvent('transitionend', function (e) {
            if (_this91.elements[1].node.node !== e.getTarget()) {
              return;
            }

            e.stop();

            _Blank_2.prototype._move.call(_this91, callback);
          });
          this.elements.forEach(function (element, index) {
            element.node.getSize();
            element.node.setCssProp('transition', 'opacity ' + options.time + 'ms ' + options.easing);
            element.node.setCssProp('opacity', _this91.to[index]);
          });
        };

        _proto35._clear = function _clear() {
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

        var Arrows_ = /*#__PURE__*/function (_EventEmitter10) {
          "use strict";

          bHelpers.inheritsLoose(Arrows_, _EventEmitter10);

          function Arrows_(options) {
            var _this92;

            _this92 = _EventEmitter10.call(this) || this;
            _this92.options = $J.extend({
              orientation: 'horizontal',
              customClass: ''
            }, options || {});
            _this92.arrows = createArrows(_this92.options.orientation, _this92.options.customClass);

            _this92.arrows.forEach(function (arrow, index) {
              var _arrowType = !index ? 'prev' : 'next';

              var button = $(arrow.node.firstChild);
              arrow.store('arrowType', _arrowType);
              button.append($J.$new('div').addClass(CSS_MAIN_CLASS + '-icon'));
              button.addEvent('btnclick tap', $(function (typeOfArrow, e) {
                e.stop();

                if (!arrow.fetch('disabled')) {
                  _this92.emit('arrowAction', {
                    data: {
                      type: typeOfArrow
                    }
                  });
                }
              }).bind(bHelpers.assertThisInitialized(_this92), _arrowType));
            });

            _this92.isShow = true;
            return _this92;
          }

          var _proto36 = Arrows_.prototype;

          _proto36.getNodes = function getNodes() {
            return $([this.arrows[0], this.arrows[1]]);
          };

          _proto36.show = function show() {
            if (!this.isShow) {
              this.arrows.forEach(function (arrow) {
                arrow.removeClass(CSS_MAIN_CLASS + '-hidden');
              });
              this.isShow = true;
            }
          };

          _proto36.hide = function hide() {
            if (this.isShow) {
              this.isShow = false;
              this.arrows.forEach(function (arrow) {
                arrow.addClass(CSS_MAIN_CLASS + '-hidden');
              });
            }
          };

          _proto36.disable = function disable(arrow) {
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

          _proto36.destroy = function destroy() {
            this.arrows.forEach(function (arrow) {
              $(arrow.node.firstChild).removeEvent('btnclick tap');
              arrow.del('arrowType');
              arrow.del('disabled');
              arrow.remove();
            });
            this.arrows = $([]);
            this.isShow = false;

            _EventEmitter10.prototype.destroy.call(this);
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

        var SelectorContent = /*#__PURE__*/function (_EventEmitter11) {
          "use strict";

          bHelpers.inheritsLoose(SelectorContent, _EventEmitter11);

          function SelectorContent(node, type, size, orientation) {
            var _this93;

            _this93 = _EventEmitter11.call(this) || this;
            _this93.node = $(node);
            _this93.type = type;
            _this93.size = size; // 70

            _this93.orientation = orientation; // selectors orientation 'horizontal' | 'vertical'

            _this93.getPlaceholderSizePromise = null;
            _this93.destroyed = false;
            _this93.loaded = false;
            _this93.content = null;

            if (_this93.node.getTagName() === SELECTOR_TAG) {
              _this93.content = $J.$A(_this93.node.node.childNodes);
            }

            return _this93;
          }

          var _proto37 = SelectorContent.prototype;

          _proto37.isLoaded = function isLoaded() {
            return this.loaded;
          };

          _proto37.setCssSize = function setCssSize() {
            var css = this.getSelectorSize();
            this.node.setCss(css);
          };

          _proto37.getSelectorSize = function getSelectorSize() {
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

          _proto37.getPlaceholderSize = function getPlaceholderSize() {
            var _this94 = this;

            if (!this.getPlaceholderSizePromise) {
              this.getPlaceholderSizePromise = new Promise(function (resolve) {
                var size = _this94.getSelectorSize();

                if (size.width && size.height) {
                  resolve(size);
                } else {
                  if (_this94.destroyed) {
                    resolve({
                      width: 0,
                      height: 0
                    });
                  } else {
                    var s;

                    _this94.getProportion().then(function (_size) {
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

          _proto37.getProportion = function getProportion() {
            return Promise.resolve(DEFAULT_SIZE);
          };

          _proto37.complete = function complete() {
            this.node.setCss({
              width: '',
              height: ''
            });
            this.setCssSize();
            return Promise.resolve();
          };

          _proto37.getNode = function getNode() {
            return this.node;
          };

          _proto37.appendTo = function appendTo(container) {
            if (this.content) {
              this.content.forEach(function (node) {
                container.append(node);
              });
            } else {
              container.append(this.getNode());
            }
          };

          _proto37.destroy = function destroy() {
            this.destroyed = true;
            this.node = null;
            this.getPlaceholderSizePromise = null;

            _EventEmitter11.prototype.destroy.call(this);
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
            var _this95;

            _this95 = _SelectorContent.call(this, node, type, size, orientation) || this;
            _this95.imageOrientation = 'horizontal'; // 'horizontal' | 'vertical'

            _this95.isSirv = false;
            _this95.watermark = watermark;
            _this95.src = null;
            _this95.srcset = null;
            _this95.imageSize = {
              width: 0,
              height: 0
            };
            _this95.getProportionPromise = null;
            _this95.getUrlPromise = null;
            _this95.loadImagePromise = null;
            return _this95;
          }

          var _proto38 = ImageSelectorContent.prototype;

          _proto38.setCssSize = function setCssSize() {
            if ($J.contains(['square', 'crop'], this.type)) {
              this.customSquare();
            } else {
              this.removeCustomSquare();
            }

            _SelectorContent.prototype.setCssSize.call(this);
          };

          _proto38.getProportion = function getProportion() {
            var _this96 = this;

            if (!this.getProportionPromise) {
              this.getProportionPromise = new Promise(function (resolve, reject) {
                if (_this96.destroyed) {
                  resolve({
                    width: 0,
                    height: 0
                  });
                } else {
                  _this96.emit('getSelectorProportion', {
                    data: {
                      resultingCallback: function (data) {
                        var size = data.size;
                        _this96.isSirv = data.isSirv;

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

          _proto38.setImageUrl = function setImageUrl(src, srcset, alt, referrerpolicy) {
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

          _proto38.getUrl = function getUrl() {
            var _this97 = this;

            if (!this.getUrlPromise) {
              this.getUrlPromise = new Promise(function (resolve, reject) {
                if (_this97.destroyed) {
                  resolve(_this97);
                } else {
                  var selectorSize = _this97.getSelectorSize();

                  _this97.emit('getSelectorImgUrl', {
                    data: {
                      crop: _this97.type === 'crop',
                      type: _this97.type,
                      watermark: _this97.watermark,
                      size: selectorSize,
                      resultingCallback: function (result) {
                        if (result) {
                          _this97.setImageUrl(result.src, result.srcset, result.alt, result.referrerpolicy);

                          resolve(_this97);
                        } else {
                          reject(_this97);
                        }
                      }
                    }
                  });
                }
              });
            }

            return this.getUrlPromise;
          };

          _proto38.setImageData = function setImageData(size) {
            this.imageSize = size;
            this.imageOrientation = this.imageSize.width >= this.imageSize.height ? 'horizontal' : 'vertical';
          };

          _proto38.loadImage = function loadImage() {
            var _this98 = this;

            if (!this.loadImagePromise) {
              this.loadImagePromise = new Promise(function (resolve, reject) {
                if (_this98.node) {
                  helper.loadImage(_this98.isSirv ? _this98.node.node : _this98.node.node.src).then(function (imageData) {
                    _this98.loaded = true;

                    _this98.setImageData(imageData.size);

                    _this98.setCssSize();

                    resolve(_this98);
                  }).catch(function (error) {
                    if (_this98.destroyed) {
                      resolve(_this98);
                    } else {
                      reject(_this98);
                    }
                  });
                } else {
                  resolve(_this98);
                }
              });
            }

            return this.loadImagePromise;
          };

          _proto38.customSquare = function customSquare() {
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

          _proto38.removeCustomSquare = function removeCustomSquare() {
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

          _proto38.complete = function complete() {
            var _this99 = this;

            return this.getUrl().then(function () {
              return _this99.loadImage();
            });
          };

          _proto38.destroy = function destroy() {
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


        var Selector = /*#__PURE__*/function (_EventEmitter12) {
          "use strict";

          bHelpers.inheritsLoose(Selector, _EventEmitter12);

          function Selector(parentNode, index, selector, uuid, options, infoPromise) {
            var _this100;

            _this100 = _EventEmitter12.call(this) || this;
            _this100.UUID = uuid;
            _this100.options = helper.deepExtend({
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
            _this100.parentContainer = $(parentNode);
            _this100.index = index;
            _this100.selector = $(selector) || $J.$new('div');
            _this100.container = $J.$new('div').addClass(CSS_MAIN_CLASS + '-item').setCss({
              display: 'inline-block'
            }); // itemContainer

            _this100.placeholder = $J.$new('div').addClass(_this100.options.placeholderClass);
            _this100.size = {
              width: 0,
              height: 0
            };
            _this100.currentObject = null;
            _this100.isActive = false;
            _this100.disabled = false;
            _this100.destroyed = false;

            _this100.container.append(_this100.selector);

            _this100.parentContainer.append(_this100.container);

            if (_this100.options.disabled) {
              _this100.disable();
            }

            _this100.infoPromise = infoPromise || Promise.resolve(false);
            _this100.state = SELECTORS_STATE.NONE;
            _this100.initPromise = null;

            _this100.init();

            return _this100;
          }

          var _proto39 = Selector.prototype;

          _proto39.init = function init() {
            var _this101 = this;

            if (!this.initPromise) {
              this.initPromise = new Promise(function (resolve) {
                _this101.infoPromise.then(function () {
                  _this101.standard = _this101.createContent(_this101.options.standard);

                  if (_this101.standard && _this101.standard instanceof ImageSelectorContent && equalOptions(_this101.options.standard, _this101.options.fullscreen)) {
                    _this101.fullscreen = _this101.standard;
                  } else {
                    _this101.fullscreen = _this101.createContent(_this101.options.fullscreen, true);
                  }

                  _this101.selector.append(_this101.placeholder);

                  var dataType = _this101.selector.attr('data-type');

                  if (!dataType) {
                    _this101.selector.setCssProp('font-size', 0);
                  }

                  _this101.setEvents();

                  _this101.setCustomEvent();

                  resolve();
                });
              });
            }

            return this.initPromise;
          };

          _proto39.createContent = function createContent(options, fullscreen) {
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

          _proto39.getProportion = function getProportion() {
            var _this102 = this;

            var result = Promise.resolve();

            if (!this.disabled) {
              if (this.state === SELECTORS_STATE.FULLSCREEN && this.fullscreen) {
                result = this.fullscreen.getProportion();
              } else if (this.standard) {
                result = this.standard.getProportion();
              }
            }

            return new Promise(function (resolve, reject) {
              _this102.init().then(function () {
                result.then(resolve).catch(reject);
              });
            });
          };

          _proto39.activatedSelector = function activatedSelector() {
            return this.options.activated;
          };

          _proto39.setEvents = function setEvents() {
            var _this103 = this;

            this.on('getSelectorProportion', function (e) {
              e.data.UUID = _this103.UUID;
            });
            this.on('getSelectorImgUrl', function (e) {
              e.data.UUID = _this103.UUID;
            });
          };

          _proto39.addPlaceholder = function addPlaceholder(selectorType, size) {
            this.container.attr('data-selector-type', selectorType);
            this.selector.append(this.placeholder);
            this.placeholder.setCss(size);
          }
          /*
              1 - SELECTORS_STATE.STANDARD,
              2 - SELECTORS_STATE.FULLSCREEN
          */
          ;

          _proto39.toggle = function toggle(state
          /* 1 or 2 only */
          ) {
            var _this104 = this;

            return new Promise(function (res, rej) {
              _this104.init().then(function () {
                var result;

                var _resolve = Promise.resolve();

                if (_this104.state !== state) {
                  _this104.state = state;

                  if (_this104.disabled) {
                    result = _resolve;
                  } else {
                    var selector = _this104.standard;
                    var selectorType = _this104.options.standard.type;

                    if (state === 2) {
                      selector = _this104.fullscreen;
                      selectorType = _this104.options.fullscreen.type;
                    }

                    if (selectorType === 'bullets') {
                      _this104.selector.node.innerHTML = '';
                      _this104.currentObject = selectorType;

                      _this104.container.attr('data-selector-type', selectorType);

                      _this104.emit('resize');

                      result = _resolve;
                    } else {
                      if (!(selector instanceof ImageSelectorContent)) {
                        _this104.container.attr('data-selector-type', selectorType);
                      }

                      result = new Promise(function (resolve, reject) {
                        if (selector) {
                          selector.getPlaceholderSize().then(function (size) {
                            if (_this104.state === state && !_this104.destroyed) {
                              if (!selector.isLoaded() && !_this104.options.selectorContent) {
                                // NOTE: this.selector.node.innerHTML = ''; doesn't work properly in IE 11
                                while (_this104.selector.node.firstChild) {
                                  _this104.selector.node.removeChild(_this104.selector.node.firstChild);
                                }

                                _this104.addPlaceholder(selectorType, size);
                              }

                              resolve();
                              selector.complete().then(function () {
                                if (_this104.state === state && !_this104.destroyed) {
                                  _this104.container.attr('data-selector-type', selectorType);

                                  _this104.placeholder.remove(); // NOTE: this.selector.node.innerHTML = ''; doesn't work properly in IE 11


                                  while (_this104.selector.node.firstChild) {
                                    _this104.selector.node.removeChild(_this104.selector.node.firstChild);
                                  }

                                  selector.appendTo(_this104.selector);
                                  _this104.currentObject = selector;

                                  _this104.emit('resize');
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

          _proto39.setEvent = function setEvent() {
            var _this105 = this;

            this.container.addEvent('btnclick tap', function (e) {
              e.stop();

              _this105.emit('selectorAction', {
                data: _this105.UUID
              });
            });
          };

          _proto39.setCustomEvent = function setCustomEvent() {
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

          _proto39.activate = function activate() {
            if (!this.isActive) {
              this.isActive = true;
              this.container.addClass(this.options.activeClass);
            }
          };

          _proto39.isActivate = function isActivate() {
            return this.isActive;
          };

          _proto39.deactivate = function deactivate() {
            if (this.isActive) {
              this.isActive = false;
              this.container.removeClass(this.options.activeClass);
            }
          };

          _proto39.getSize = function getSize() {
            this.size = this.container.getSize();
            return this.size;
          };

          _proto39.disable = function disable() {
            if (!this.disabled) {
              this.disabled = true;
              this.container.attr('disabled', 'true');
              this.container.setCssProp('display', 'none');
              this.deactivate();
              this.emit('resize');
            }
          };

          _proto39._toggleForEnable = function _toggleForEnable() {
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

          _proto39.enable = function enable() {
            var _this106 = this;

            if (this.disabled) {
              this.disabled = false;

              this._toggleForEnable().then(function () {
                if (!_this106.disabled) {
                  _this106.container.removeAttr('disabled');

                  _this106.container.setCssProp('display', '');

                  _this106.emit('resize');
                }
              });
            }
          };

          _proto39.setIndex = function setIndex(index) {
            this.index = index;
          };

          _proto39.getContainer = function getContainer() {
            return this.container;
          };

          _proto39.getOptions = function getOptions() {
            return this.options;
          };

          _proto39.isDestroyed = function isDestroyed() {
            return this.destroyed;
          };

          _proto39.isDisabled = function isDisabled() {
            return this.disabled;
          };

          _proto39.destroy = function destroy() {
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

            _EventEmitter12.prototype.destroy.call(this);
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

        var Selectors_ = /*#__PURE__*/function (_EventEmitter13) {
          "use strict";

          bHelpers.inheritsLoose(Selectors_, _EventEmitter13);

          function Selectors_(selectors, options) {
            var _this107;

            _this107 = _EventEmitter13.call(this) || this;
            _this107.options = $J.extend({
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
            _this107.instanceNode = $J.$new('div').addClass(CSS_MAIN_CLASS + '-' + SELECTORS).setCss({
              opacity: 0,
              visibility: 'hidden',
              transition: ''
            });
            _this107.selectorsContainer = $J.$new('div').addClass(CSS_MAIN_CLASS + '-ss');
            _this107.selectorsScroll = $J.$new('div').addClass(CSS_MAIN_CLASS + '-scroll').setCss({
              transform: 'translate3d(0, 0, 0)'
            });
            _this107.controlButton = $J.$new('div').addClass(CSS_MAIN_CLASS + '-' + SELECTORS + '-toggle-switch');
            _this107.selectorsScrollContainer = $J.$new('div').addClass(CSS_MAIN_CLASS + '-selectors-scroll-container');
            _this107.pinnedNodeAtStart = null;
            _this107.pinnedNodeAtEnd = null;
            _this107.hasPinnedSelector = false;
            _this107.baseSelectorsList = null;
            _this107.blocksPinnedInited = false;
            _this107.pinnedStartList = [];
            _this107.pinnedEndList = [];
            _this107.isMove = false;
            _this107.currentPosition = 0;
            _this107.containerSize = {
              width: 0,
              height: 0
            };
            _this107.halfContainerSize = 0;
            _this107.scrollSize = {
              width: 0,
              height: 0
            };
            _this107.halfScrollSize = 0;
            _this107.currentActiveItem = null;
            _this107.isShown = false;
            _this107.isControlShown = true;
            _this107.isControlInDoc = false;
            _this107.controlDebounce = null;
            _this107.isReady = false;
            _this107.resizeTimeout = null;
            _this107.isActionsEnabled = true;
            _this107.isDone = false;
            _this107.isInView = false;
            _this107.state = SELECTORS_STATE.STANDARD;
            _this107.arrows = null;
            _this107.currentStylePosition = _this107.options.standardPosition;
            _this107.longSide = null;
            _this107.shortSide = null;
            _this107.currentAxis = 'x';
            _this107.isStarted = false;
            _this107.isDestroyed = false;

            _this107.setHasPinnedSelector(selectors);

            _this107.initPinnedBlocks();

            _this107.selectors = [];
            selectors.forEach(function (_selector, index) {
              _this107.selectors.push(_this107.createSelector(_selector, index));
            });

            _this107.sortByBaseSelectors(_this107.selectors);

            _this107.orderPinnedSelectorByType(_this107.selectors);

            _this107.identifyVariables();

            _this107.setContainerCss();

            return _this107;
          }

          var _proto40 = Selectors_.prototype;

          _proto40.getSelectorsIndexByUUID = function getSelectorsIndexByUUID(uuid) {
            var result = null;

            for (var i = 0, l = this.selectors.length; i < l; i++) {
              if (this.selectors[i].UUID === uuid) {
                result = i;
                break;
              }
            }

            return result;
          };

          _proto40.getSelectorByUUID = function getSelectorByUUID(uuid) {
            var result = this.getSelectorsIndexByUUID(uuid);

            if (result !== null) {
              result = this.selectors[result];
            }

            return result;
          };

          _proto40.insertSelectorBefore = function insertSelectorBefore(index, selector) {
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

          _proto40.insertSelector = function insertSelector(selectorIndex, selectorObj) {
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

          _proto40.getScrollContainer = function getScrollContainer(targetSelector) {
            if (targetSelector.pinned === 'start') {
              return this.getPinnedScrollContainer(this.pinnedNodeAtStart);
            } else if (targetSelector.pinned === 'end') {
              return this.getPinnedScrollContainer(this.pinnedNodeAtEnd);
            }

            return this.selectorsScroll;
          };

          _proto40.disableSelector = function disableSelector(selectorUUID) {
            var selector = this.getSelectorByUUID(selectorUUID);

            if (selector) {
              if (this.currentActiveItem && this.currentActiveItem === selector) {
                this.currentActiveItem = null;
              }

              this.hide();
              selector.disable();
            }
          };

          _proto40.enableSelector = function enableSelector(selectorUUID) {
            var selector = this.getSelectorByUUID(selectorUUID);

            if (selector) {
              this.hide();
              selector.enable();
            }
          };

          _proto40.pickOut = function pickOut(selectorUUID) {
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

          _proto40.reorderDataSelectors = function reorderDataSelectors(statusSelector) {
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

          _proto40.createSelector = function createSelector(selectorData, index) {
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

          _proto40.setEventsFromSelectors = function setEventsFromSelectors() {
            var _this108 = this;

            this.on('selectorAction', function (e) {
              e.stopAll();

              _this108.emit('changeSlide', {
                data: {
                  UUID: e.data
                }
              });

              var index = _this108.getSelectorsIndexByUUID(e.data);

              if (index !== null) {
                _this108.setActiveItem(index);
              }
            });
            var timer;
            this.on('resize', function (e) {
              e.stopAll();
              clearTimeout(timer);
              timer = setTimeout(function () {
                _this108.onResize();
              }, 16);
            });
          };

          _proto40.initPinnedBlocks = function initPinnedBlocks() {
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

          _proto40.addPinnedBlocks = function addPinnedBlocks() {
            if (this.blocksPinnedInited && this.hasPinnedSelector) {
              this.instanceNode.append(this.pinnedNodeAtStart);
              this.instanceNode.append(this.pinnedNodeAtEnd);
            }
          };

          _proto40.setHasPinnedSelector = function setHasPinnedSelector(dataSelectors) {
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

          _proto40.orderPinnedSelectorByType = function orderPinnedSelectorByType(dataSelectors) {
            var _this109 = this;

            if (this.hasPinnedSelector) {
              if (Array.isArray(dataSelectors)) {
                this.pinnedStartList = [];
                this.pinnedEndList = [];
                dataSelectors.forEach(function (dataSelector) {
                  var selectorType = dataSelector.options.pinned;

                  if (selectorType === 'start') {
                    _this109.pinnedStartList.push(dataSelector);
                  } else if (selectorType === 'end') {
                    _this109.pinnedEndList.push(dataSelector);
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

          _proto40.updateIndex = function updateIndex(selectors, selector) {
            return selectors.indexOf(selector);
          };

          _proto40.init = function init() {
            var _this110 = this;

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
              _this110.isReady = true;

              _this110.emit('selectorsReady');
            });
          };

          _proto40.identifyVariables = function identifyVariables() {
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

          _proto40.changeSelectors = function changeSelectors(direction) {
            return Promise.all(this.selectors.map(function (selector) {
              return selector.toggle(direction);
            }));
          };

          _proto40.getSelectorsSize = function getSelectorsSize() {
            this.selectors.forEach(function (selector) {
              if (!selector.isDestroyed()) {
                selector.getSize();
              }
            });
          };

          _proto40.enableActions = function enableActions() {
            if (!this.isActionsEnabled) {
              this.isActionsEnabled = true;
              this.show();

              if (this.options.fullscreenAutohide) {
                this.setSelectorsState(true);
              }
            }
          };

          _proto40.disableActions = function disableActions() {
            if (this.isActionsEnabled) {
              this.isActionsEnabled = false;
              this.hide();

              if (this.controlDebounce) {
                this.controlDebounce.cancel();
              }
            }
          };

          _proto40.show = function show(force) {
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

          _proto40.getActiveItem = function getActiveItem() {
            return this.currentActiveItem ? this.currentActiveItem.index : 0;
          };

          _proto40.setCurrentActiveItemByUUID = function setCurrentActiveItemByUUID(selectorUUID) {
            var selector = this.getSelectorByUUID(selectorUUID);

            if (selector && !this.currentActiveItem) {
              this.currentActiveItem = selector;
            }
          };

          _proto40.hide = function hide() {
            if (this.isShown) {
              this.isShown = false;
              this.instanceNode.setCss({
                opacity: 0,
                visibility: 'hidden',
                transition: ''
              });
            }
          };

          _proto40.start = function start(parentSlider) {
            var _this111 = this;

            if (!this.isStarted && this.isInView) {
              this.isStarted = true;

              if (this.currentStylePosition) {
                this.changeSelectors(1).then(function () {
                  return globalFunctions.rootDOM.addMainStyle(parentSlider);
                }).then(function () {
                  if (!_this111.isDestroyed) {
                    _this111.getSelectorsSize();

                    _this111.done();

                    _this111.show();
                  }
                });
              } else {
                this.done();
              }
            }
          };

          _proto40.addControl = function addControl() {
            var _this112 = this;

            if (!this.isControlInDoc) {
              this.instanceNode.addEvent('mouseover mouseout', function (e) {
                var relatedTarget = e.getRelated();

                if (relatedTarget) {
                  relatedTarget = $(relatedTarget);
                }

                while (relatedTarget && relatedTarget.node !== _this112.instanceNode.node && relatedTarget.node !== $J.D.node.body) {
                  relatedTarget = relatedTarget.node.parentNode;

                  if (relatedTarget) {
                    relatedTarget = $(relatedTarget);
                  }
                }

                if (!relatedTarget || relatedTarget.node !== _this112.instanceNode.node) {
                  _this112.setControlTimeout(e.type === 'mouseover');
                }
              });
              this.controlButton.addEvent('btnclick tap', function (e) {
                _this112.setControlTimeout(true);

                _this112.setSelectorsState(!_this112.isControlShown);
              });
              $(this.instanceNode.node.parentNode).append(this.controlButton);
              this.controlDebounce = helper.debounce(function () {
                _this112.setSelectorsState(false);
              }, 3000);
              this.isControlInDoc = true;
            }
          };

          _proto40.removeControl = function removeControl() {
            if (this.isControlInDoc) {
              this.instanceNode.removeEvent('mouseover mouseout');
              this.controlDebounce.cancel();
              this.isControlShown = true;
              this.controlButton.removeEvent('btnclick tap');
              this.controlButton.remove();
              this.isControlInDoc = false;
            }
          };

          _proto40.setSelectorsState = function setSelectorsState(open) {
            this.isControlShown = open;
            this.setControlTimeout();
            this.emit('visibility', {
              action: this.isControlShown ? 'show' : 'hide'
            });
          };

          _proto40.setControlTimeout = function setControlTimeout(justClear) {
            if (this.isControlInDoc) {
              this.controlDebounce.cancel();

              if (this.isControlShown && !justClear) {
                this.controlDebounce();
              }
            }
          };

          _proto40.getNode = function getNode() {
            return this.instanceNode;
          };

          _proto40.isHorizontal = function isHorizontal() {
            return getOrientation(this.currentStylePosition) === 'horizontal';
          };

          _proto40.inView = function inView(value, parentSlider) {
            this.isInView = value; // sometimes selectors can be inside external container and we do not know which container with 'Sirv' class name inicialide it
            // so we need pass it for right adding css in shadow dom

            this.start(parentSlider);
          };

          _proto40.done = function done() {
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

          _proto40.setActiveItem = function setActiveItem(index) {
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

          _proto40.createArrows = function createArrows() {
            var _this113 = this;

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

              _this113.jump(e.data.type);
            });
          };

          _proto40.isGrid = function isGrid() {
            if (this.state === SELECTORS_STATE.FULLSCREEN) {
              return this.options.isFullscreenGrid;
            }

            return this.options.isStandardGrid;
          };

          _proto40.calculateContainerScroll = function calculateContainerScroll() {
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

          _proto40.sortByBaseSelectors = function sortByBaseSelectors(selectors) {
            if (this.hasPinnedSelector) {
              this.baseSelectorsList = selectors.filter(function (selector) {
                return !selector.getOptions().pinned;
              });
            }
          };

          _proto40.getIndexBaseSelectors = function getIndexBaseSelectors(index) {
            var result = this.baseSelectorsList.indexOf(this.selectors[index]);

            if (result < 0) {
              result = index;
            }

            return result;
          };

          _proto40.normalizePositionValue = function normalizePositionValue(value) {
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

          _proto40.findItemPosition = function findItemPosition(index) {
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

          _proto40.stopMoving = function stopMoving() {
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

          _proto40.clearAnimation = function clearAnimation() {
            if (this.selectorsScroll) {
              this.selectorsScroll.removeEvent('transitionend');
              this.selectorsScroll.setCssProp('transition', '');
            }

            this.isMove = false;
          };

          _proto40.jump = function jump(direction, withoutAnimation) {
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

          _proto40.move = function move(value, speed, withoutAnimation) {
            var _this114 = this;

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

                _this114.clearAnimation();
              });
              css.transition = 'transform ' + getTime(speed, this.containerSize[this.longSide], Math.abs(value) - Math.abs(this.currentPosition)) + 'ms ease';
            }

            css.transform = 'translate3d(' + convertToTranslateString(value, this.isHorizontal()) + ', 0)';
            this.selectorsScroll.setCss(css);
            this.currentPosition = value;
          };

          _proto40.getSizes = function getSizes() {
            this.containerSize = this.selectorsContainer.getSize();
            this.halfContainerSize = this.containerSize[this.longSide] / 2;
            this.scrollSize = this.selectorsScroll.getSize();
            this.halfScrollSize = this.scrollSize[this.longSide] / 2;
          };

          _proto40.setDrag = function setDrag() {
            var _this115 = this;

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
              axis = _this115.currentAxis;
              otherAxis = axis === 'x' ? 'y' : 'x';
              side = _this115.longSide;
              lastXY = {
                x: e.x,
                y: e.y
              };

              if (_this115.containerSize[side] < _this115.scrollSize[side]) {
                move = true;
              }

              containerPosition = _this115.selectorsContainer.getPosition();

              _this115.stopMoving();

              last = getXY(e.x, e.y)[axis];
              diffSize = _this115.containerSize[side] - _this115.scrollSize[side];
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
                value = _this115.currentPosition - culcDistance(distance, speed);

                if (value > 0 || value < diffSize) {
                  if (value > 0) {
                    value = 0;
                  } else {
                    value = diffSize;
                  }
                }

                value = _this115.normalizePositionValue(value);

                _this115.move(value);

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
                  _this115.currentPosition -= diff;
                  dir = getDirection(last, point[axis]);

                  if (!direction || dir !== direction) {
                    distance = 0;
                  }

                  distance += diff;
                  last = point[axis];
                  direction = dir;
                }

                _this115.selectorsScroll.setCssProp('transform', 'translate3d(' + convertToTranslateString(_this115.currentPosition, _this115.isHorizontal()) + ', 0)');
              }

              lastXY = {
                x: e.x,
                y: e.y
              };
            };

            this.selectorsContainer.addEvent('mousedrag touchdrag', onDrag);
          };

          _proto40.setContainerCss = function setContainerCss() {
            var css = {};
            var size = this.options.standardSize;

            if (this.state === SELECTORS_STATE.FULLSCREEN) {
              size = this.options.fullscreenSize;
            }

            css['min-' + this.shortSide] = size + 'px';
            css[this.shortSide] = '100%';
            this.instanceNode.setCss(css);
          };

          _proto40.beforeEnterFullscreen = function beforeEnterFullscreen() {
            this.hide();
            this.state = SELECTORS_STATE.FULLSCREEN;
            this.currentStylePosition = this.options.fullscreenPosition;

            if (!this.currentStylePosition) {
              this.instanceNode.setCssProp('display', 'none');
              $(this.instanceNode.node.parentNode).setCssProp('display', 'none');
            }

            this.identifyVariables();
          };

          _proto40.afterEnterFullscreen = function afterEnterFullscreen() {
            var _this116 = this;

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
                _this116.getSelectorsSize();

                setTimeout(function () {
                  _this116.show();
                }, 150); // must be more than resize timeout

                if (_this116.currentStylePosition && _this116.isActionsEnabled) {
                  setTimeout(function () {
                    _this116.setSelectorsState(true);
                  }, 1000);
                }
              });
            }
          };

          _proto40.beforeExitFullscreen = function beforeExitFullscreen() {
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

          _proto40.afterExitFullscreen = function afterExitFullscreen() {
            var _this117 = this;

            if (this.currentStylePosition) {
              this.instanceNode.setCssProp('display', '');
              $(this.instanceNode.node.parentNode).setCssProp('display', '');
              this.setContainerCss();
              this.removeStyleForIE();
              this.changeSelectors(1).then(function () {
                _this117.getSelectorsSize();

                _this117.show();
              });
            }
          };

          _proto40.getPinnedScrollContainer = function getPinnedScrollContainer(pinnedNode) {
            return pinnedNode ? pinnedNode.node.firstChild.firstChild : null;
          };

          _proto40.getCurrentStylePosition = function getCurrentStylePosition() {
            return this.getCurrentStylePosition;
          };

          _proto40.removeStyleForIE = function removeStyleForIE() {
            if ($J.browser.uaName === 'ie') {
              this.selectorsScroll.setCssProp(this.shortSide, '');
            }
          };

          _proto40.isSelectorsActionEnabled = function isSelectorsActionEnabled() {
            return this.isActionsEnabled;
          };

          _proto40.getShortSide = function getShortSide() {
            return this.shortSide;
          };

          _proto40.sortSelectorsByUUID = function sortSelectorsByUUID(uuidList) {
            var _this118 = this;

            var sortredSelectors = [];
            uuidList.forEach(function (uuid) {
              for (var i = 0, l = _this118.selectors.length; i < l; i++) {
                if (uuid === _this118.selectors[i].UUID) {
                  sortredSelectors.push(_this118.selectors[i]);
                  break;
                }
              }
            });
            this.selectors = sortredSelectors;
          };

          _proto40.sortNodesSelectors = function sortNodesSelectors(lengthOrder) {
            for (var i = lengthOrder - 1; i >= 0; i--) {
              this.selectorsScroll.node.insertBefore(this.selectors[i].getContainer().node, this.selectorsScroll.node.firstChild);
            }
          };

          _proto40.rewriteSelectorsIndexes = function rewriteSelectorsIndexes() {
            this.selectors.forEach(function (selector, index) {
              selector.setIndex(index);
            });
          };

          _proto40.sortSelectors = function sortSelectors(uuidList, orderLength) {
            this.sortSelectorsByUUID(uuidList);
            this.rewriteSelectorsIndexes();
            this.sortNodesSelectors(orderLength);
          };

          _proto40.onResize = function onResize() {
            var _this119 = this;

            if (this.isDone && this.currentStylePosition && !this.isDestroyed) {
              clearTimeout(this.resizeTimeout);
              this.resizeTimeout = setTimeout(function () {
                // the timer helps calc new size of selectors after changing size of images
                var itemIndex = _this119.getActiveItem();

                _this119.clearAnimation();

                var selectorSize = 0;

                _this119.selectors.forEach(function (selector) {
                  if (!selector.isDestroyed()) {
                    var size = selector.getSize();
                    selectorSize += size[_this119.longSide];
                  }
                });

                if ($J.browser.uaName === 'ie') {
                  if (_this119.isGrid()) {
                    selectorSize = '';
                  }

                  _this119.selectorsScroll.setCssProp(_this119.longSide, selectorSize);
                }

                _this119.getSizes();

                _this119.calculateContainerScroll();

                _this119.setActiveItem(itemIndex);

                _this119.normalizePositionValue();

                _this119.jump(itemIndex, true);

                _this119.show();
              }, 100);
            }
          };

          _proto40.destroy = function destroy() {
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

            _EventEmitter13.prototype.destroy.call(this);
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

        var HTMLVideo = /*#__PURE__*/function (_EventEmitter14) {
          "use strict";

          bHelpers.inheritsLoose(HTMLVideo, _EventEmitter14);

          function HTMLVideo(node, options) {
            var _this120;

            _this120 = _EventEmitter14.call(this) || this;
            _this120.node = $(node);
            _this120.instanceOptions = getOptions(_this120.node, options);

            _this120.option = function () {
              if (arguments.length > 1) {
                return _this120.instanceOptions.set(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
              }

              return _this120.instanceOptions.get(arguments.length <= 0 ? undefined : arguments[0]);
            };

            _this120.type = 'video';
            _this120.player = null;
            _this120.state = globalVariables.VIDEO.NONE;
            _this120.isReady = false;
            _this120.isShown = false;
            _this120.id = null;
            _this120.playDebounce = null;
            _this120.currentTime = 0;
            _this120.videoNode = $J.$new('div');
            _this120.videoWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-video').setCss({
              transition: 'opacity .3 linear'
            });

            _this120.videoWrapper.attr('data-video-type', _this120.type);

            _this120.fullscreen = _this120.option('controls.fullscreen');

            _this120.hide();

            return _this120;
          }

          var _proto41 = HTMLVideo.prototype;

          _proto41.isAutoplay = function isAutoplay() {
            return this.option('autoplay');
          };

          _proto41.onBeforeFullscreenIn = function onBeforeFullscreenIn() {
            this.getCurrentTime();
            this.fullscreen = false;
          };

          _proto41.onAfterFullscreenIn = function onAfterFullscreenIn() {};

          _proto41.onBeforeFullscreenOut = function onBeforeFullscreenOut() {
            this.getCurrentTime();
            this.fullscreen = this.option('controls.fullscreen');
          };

          _proto41.onAfterFullscreenOut = function onAfterFullscreenOut() {};

          _proto41.getSize = function getSize() {
            var _this121 = this;

            return new Promise(function (resolve) {
              var size = _this121.videoWrapper.getSize();

              if (size.width && size.height) {
                resolve(size);
              } else {
                helper.videoModule.getAspectRatio(_this121.node).then(function (aspectratio) {
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

          _proto41.createPlayer = function createPlayer(player) {
            var _this122 = this;

            this.player = {
              ready: true,
              play: function () {
                _this122.playDebounce();
              },
              pause: function () {
                _this122.player.player.node.pause();
              },
              player: this.node
            };
            this.playDebounce = helper.debounce(function () {
              _this122.player.player.node.play();
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

          _proto41.getVideoNode = function getVideoNode() {
            return this.videoWrapper;
          };

          _proto41.init = function init() {
            var _this123 = this;

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
              _this123.createPlayer(player).then(function () {
                data.error = false;
              }).catch(function (_err) {
                data.error = !!_err;
              }).finally(function () {
                _this123.isReady = true; // this.emit('slideVideoReady', { data: data });
              });
            }).catch(function (err) {
              data.error = true;

              _this123.emit('slideVideoReady', {
                data: data
              });
            });
          };

          _proto41.setEvents = function setEvents() {
            var _this124 = this;

            this.player.player.addEvent('play', function (e) {
              e.stop();
              _this124.state = globalVariables.VIDEO.PLAY;

              _this124.emit('slideVideoPlay', {
                data: {
                  type: _this124.type
                }
              });
            });
            this.player.player.addEvent('pause', function (e) {
              e.stop();
              _this124.state = globalVariables.VIDEO.PAUSE;

              _this124.emit('slideVideoPause', {
                data: {
                  type: _this124.type
                }
              });
            });
            this.player.player.addEvent('ended', function (e) {
              e.stop();
              _this124.state = globalVariables.VIDEO.PAUSE;

              _this124.emit('slideVideoEnd', {
                data: {
                  type: _this124.type
                }
              });
            });
          };

          _proto41.play = function play() {
            if (this.player && this.player.ready) {
              this.setCurrentTime();
              this.player.play();
            }
          };

          _proto41.pause = function pause() {
            if (this.player && this.player.ready) {
              this.player.pause();
            }
          };

          _proto41.getCurrentTime = function getCurrentTime() {
            if (this.player && this.player.player) {
              this.currentTime = this.player.player.currentTime;
            }
          };

          _proto41.setCurrentTime = function setCurrentTime() {
            if (this.player && this.player.ready) {
              this.player.player.currentTime = this.currentTime;
            }
          };

          _proto41.isPreStart = function isPreStart() {
            return this.state === globalVariables.VIDEO.NONE;
          };

          _proto41.isPaused = function isPaused() {
            return this.state === globalVariables.VIDEO.PAUSE;
          };

          _proto41.show = function show() {
            this.isShown = true;
            this.videoWrapper.setCssProp('opacity', 1);
          };

          _proto41.hide = function hide() {
            this.isShown = false;
            this.videoWrapper.setCssProp('opacity', 0);
          };

          _proto41.destroy = function destroy() {
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

            _EventEmitter14.prototype.destroy.call(this);
          };

          return HTMLVideo;
        }(EventEmitter);

        var YouTubeVideo = /*#__PURE__*/function (_HTMLVideo) {
          "use strict";

          bHelpers.inheritsLoose(YouTubeVideo, _HTMLVideo);

          function YouTubeVideo(node, options) {
            var _this125;

            _this125 = _HTMLVideo.call(this, node, options) || this;
            _this125.type = 'youtube';
            _this125.playerState = -1;

            _this125.videoWrapper.attr('data-video-type', _this125.type);

            _this125.apiPlayer = null;
            return _this125;
          }

          var _proto42 = YouTubeVideo.prototype;

          _proto42.setCurrentTime = function setCurrentTime() {
            if (this.player && this.player.ready) {
              this.player.player.seekTo(this.currentTime);
            }
          };

          _proto42.getCurrentTime = function getCurrentTime() {
            if (this.player && this.player.player) {
              if (this.player.player.getCurrentTime) {
                this.currentTime = this.player.player.getCurrentTime();
              } else {
                this.currentTime = 0;
              }
            }
          };

          _proto42.destroyVideoPlayer = function destroyVideoPlayer() {
            this.getCurrentTime();

            if (this.player && this.player.player) {
              this.player.ready = false;
              this.player.player.destroy();
            }

            this.playerState = -1;
          };

          _proto42.onBeforeFullscreenIn = function onBeforeFullscreenIn() {
            this.fullscreen = false; // we must destroy and create player because the 'onStateChange' won't work after change DOM

            this.destroyVideoPlayer();
          };

          _proto42.onAfterFullscreenIn = function onAfterFullscreenIn() {
            this.createPlayer(this.apiPlayer);
          };

          _proto42.onBeforeFullscreenOut = function onBeforeFullscreenOut() {
            this.fullscreen = this.option('controls.fullscreen'); // we must destroy and create player because the 'onStateChange' won't work after change DOM

            this.destroyVideoPlayer();
          };

          _proto42.onAfterFullscreenOut = function onAfterFullscreenOut() {
            this.createPlayer(this.apiPlayer);
          };

          _proto42.createPlayer = function createPlayer(player) {
            var _this126 = this;

            this.apiPlayer = player;
            return new Promise(function (resolve, reject) {
              var videoID = helper.videoModule.getId(_this126.node);
              _this126.player = {
                ready: false,
                play: function () {
                  _this126.player.player.playVideo();
                },
                pause: function () {
                  _this126.player.player.pauseVideo();
                },
                player: new player.Player(_this126.id, {
                  videoId: videoID,
                  playerVars: {
                    playlist: videoID,
                    // it is just for loop parameter
                    fs: _this126.fullscreen ? 1 : 0,
                    rel: 0,
                    loop: _this126.option('loop') ? 1 : 0,
                    autoplay: 0,
                    playsinline: 1,
                    controls: _this126.option('controls.enable') ? 1 : 0
                  },
                  events: {
                    'onReady': function () {
                      _this126.playerState = -1;
                      _this126.player.ready = true;

                      _this126.player.player.setVolume(_this126.option('volume'));

                      _this126.emit('slideVideoReady', {
                        data: {
                          type: _this126.type,
                          error: null
                        }
                      });

                      resolve();
                    },
                    'onError': function (err) {
                      if (err.data === 100) {
                        // 'Video is not found'
                        _this126.player = null;
                      }

                      _this126.emit('slideVideoReady', {
                        data: {
                          type: _this126.type,
                          error: true
                        }
                      });

                      reject(true);
                    },
                    'onStateChange': _this126.setEvents.bind(_this126)
                  }
                })
              };
            });
          };

          _proto42.setEvents = function setEvents(e) {
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

          _proto42.destroy = function destroy() {
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
            var _this127;

            _this127 = _HTMLVideo2.call(this, node, options) || this;
            _this127.type = 'vimeo';
            _this127.apiPlayer = null;

            _this127.videoWrapper.attr('data-video-type', _this127.type);

            return _this127;
          }

          var _proto43 = VimeoVideo.prototype;

          _proto43.createPlayer = function createPlayer(player) {
            var _this128 = this;

            this.apiPlayer = player;
            return new Promise(function (resolve, reject) {
              _this128.videoNode.attr('data-vimeo-id', helper.videoModule.getId(_this128.node));

              if (player.Player) {
                var tmp = _this128.videoNode.attr('data-src');

                if (tmp) {
                  _this128.videoNode.attr('src', tmp);
                }

                var opt = {
                  id: helper.videoModule.getId(_this128.node),
                  loop: _this128.option('loop'),
                  controls: _this128.option('controls.enable'),
                  speed: _this128.option('controls.speed')
                };
                _this128.player = {
                  ready: false,
                  play: function () {
                    _this128.player.player.setVolume(0);

                    _this128.player.player.play();
                  },
                  pause: function () {
                    _this128.player.player.pause();
                  },
                  player: new player.Player(_this128.videoNode.node, opt)
                };

                _this128.setEvents(resolve);
              } else {
                reject(true);
              }
            });
          };

          _proto43.destroyVideoPlayer = function destroyVideoPlayer() {
            if (this.player && this.player.player) {
              this.player.ready = false;
              this.player.player.destroy();
            }
          };

          _proto43.play = function play() {
            if (this.player && this.player.ready) {
              this.setCurrentTime();
              this.player.play();
            }
          };

          _proto43.onBeforeFullscreenIn = function onBeforeFullscreenIn() {
            this.destroyVideoPlayer();
          };

          _proto43.onAfterFullscreenIn = function onAfterFullscreenIn() {
            this.createPlayer(this.apiPlayer);
          };

          _proto43.onBeforeFullscreenOut = function onBeforeFullscreenOut() {
            this.destroyVideoPlayer();
          };

          _proto43.onAfterFullscreenOut = function onAfterFullscreenOut() {
            this.createPlayer(this.apiPlayer);
          };

          _proto43.getCurrentTime = function getCurrentTime() {};

          _proto43.setCurrentTime = function setCurrentTime() {
            if (this.player && this.player.ready) {
              this.player.player.setCurrentTime(this.currentTime);
            }
          };

          _proto43.setEvents = function setEvents(callback) {
            var _this129 = this;

            this.player.player.on('play', function () {
              _this129.state = globalVariables.VIDEO.PLAY;

              _this129.emit('slideVideoPlay', {
                data: {
                  type: _this129.type
                }
              });
            });
            this.player.player.on('pause', function () {
              _this129.state = globalVariables.VIDEO.PAUSE;

              _this129.emit('slideVideoPause', {
                data: {
                  type: _this129.type
                }
              });
            });
            this.player.player.on('ended', function () {
              _this129.state = globalVariables.VIDEO.PAUSE;

              _this129.emit('slideVideoEnd', {
                data: {
                  type: _this129.type
                }
              });
            });
            this.player.player.on('loaded', function () {// empty
            });
            this.player.player.on('timeupdate', function (data) {
              _this129.currentTime = data.seconds;
            }); // vimeo api bug
            // If we use the ready event before then we add listerners of vimeo events then events do not work

            if (this.player.player) {
              this.player.player.ready().then(function () {
                _this129.player.ready = true;

                if (_this129.state === globalVariables.VIDEO.PLAY) {
                  _this129.state = globalVariables.VIDEO.PAUSE;
                }

                _this129.player.player.setVolume(0); // this.player.player.setVolume(this.option('volume') / 100);


                _this129.emit('slideVideoReady', {
                  data: {
                    type: _this129.type,
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

          _proto43.destroy = function destroy() {
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

        var Slide_ = /*#__PURE__*/function (_EventEmitter15) {
          "use strict";

          bHelpers.inheritsLoose(Slide_, _EventEmitter15);

          function Slide_(node, index, options, isCustomAdded) {
            var _this130;

            _this130 = _EventEmitter15.call(this) || this;
            _this130.$J_UUID = $J.$uuid(bHelpers.assertThisInitialized(_this130));
            _this130.groups = ($(node).attr('data-group') || '').split(/\s*(?:,|$)\s*/);
            var slideData = Slide.parse(node);
            _this130.id = slideData.id; // data-id attr

            _this130.enabled = slideData.enabled;
            _this130.type = slideData.type;
            _this130.url = slideData.url;
            _this130.slideContent = $(node);
            _this130.index = index;
            _this130.isCustomAdded = isCustomAdded || false;
            _this130.options = {};

            _this130.setOptions(options);

            _this130.instanceNode = $J.$new('div').addClass(CSS_MAIN_CLASS + '-slide').setCss({
              position: 'absolute'
            });

            _this130.instanceNode.setCss(NECESSARY_CSS);

            _this130.contentWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-content');

            _this130.contentWrapper.setCss(NECESSARY_CSS);

            _this130.fullscreenOnlyNode = null;
            _this130.selector = {
              UUID: _this130.$J_UUID,
              isCustom: false,
              node: getCustomSelectorNode(_this130.slideContent),
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
            _this130.selector.isStatic = Slide_.checkNonSirv(_this130.selector.node);
            _this130.selector.pinned = Slide_.findPinnedSelectorSide(_this130.slideContent.node.querySelector(SELECTOR_TAG) || _this130.slideContent.node);
            _this130.selector.isCustom = !!_this130.selector.node;
            _this130.thumbnailReferrerPolicy = _this130.getSelectorReferrerPolicy();
            _this130.availableSlide = true;
            _this130.isStartedFullInit = false;
            _this130.fullscreenState = globalVariables.FULLSCREEN.CLOSED;
            _this130.isStarted = false;
            _this130.sirvService = null;
            _this130.componentSize = null;
            _this130.inView = false;
            _this130.isActive = false;
            _this130.isReady = false;
            _this130.video = null;
            _this130.isVideoPaused = false;
            _this130.isVideoReady = false;
            _this130.slideShownBy = globalVariables.SLIDE_SHOWN_BY.NONE;
            _this130.componentLoader = null;
            _this130.infoSize = null;
            _this130.sizePromise = null;
            _this130.isInDom = 0; // 0 / 1

            _this130.multiImages = [];
            _this130.lastOriginNode = null;
            _this130.dataThumbnailImage = _this130.getThumbnailImage();
            _this130.dataThumbnailHtml = _this130.slideContent.attr('data-thumbnail-html');
            _this130.dataHiddenSelector = _this130.slideContent.hasAttribute('data-hidden-selector'); // Disables switching slides by swipe on touchscreen.

            _this130.swipeDisabled = _this130.slideContent.hasAttribute('data-swipe-disabled');
            _this130.spinWasInited = false;
            _this130.socialbuttons = null;
            _this130.getVideoThumbnailPromise = null;
            _this130.isPlaceholder = false;
            _this130.customThumbnailImageClassPromise = null;
            var this_ = bHelpers.assertThisInitialized(_this130);
            _this130.api = {
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

            _this130.sendEventCloseFullscreenByClick = function (e) {
              e.stop();

              _this130.emit('goToFullscreenOut');
            };

            _this130.beforeParseSlide();

            _this130.parseSlide();

            return _this130;
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

          var _proto44 = Slide_.prototype;

          _proto44.isSwipeDisabled = function isSwipeDisabled() {
            return this.swipeDisabled;
          };

          _proto44.getThumbnailImage = function getThumbnailImage() {
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

          _proto44.startGettingInfo = function startGettingInfo() {
            if (this.isSirv()) {
              this.sirvService.startGettingInfo();
            }
          };

          _proto44.loadContent = function loadContent() {
            var _this131 = this;

            if (this.isSirv()) {
              this.getSlideSize().then(function (infoSize) {
                if (_this131.isInDom) {
                  _this131.sirvService.loadContent();
                }
              }).catch(function (err) {});
            }
          };

          _proto44.loadThumbnail = function loadThumbnail() {
            var _this132 = this;

            if (this.isSirv()) {
              this.getSlideSize().then(function (infoSize) {
                if (_this132.isInDom) {
                  _this132.sirvService.loadThumbnail();
                }
              }).catch(function (err) {});
            }
          };

          _proto44.isVideoSlide = function isVideoSlide() {
            var result = false;

            if (this.isSirv()) {
              result = this.sirvService.getType() === globalVariables.SLIDE.TYPES.VIDEO;
            } else if (this.video) {
              result = true;
            }

            return result;
          };

          _proto44.belongsTo = function belongsTo(group) {
            var _this133 = this;

            var result = false;

            if (group) {
              if ($J.typeOf(group) === 'string') {
                group = [group];
              }

              result = group.some(function (g) {
                return $J.contains(_this133.groups, g);
              });
            }

            return result;
          };

          _proto44.addGroup = function addGroup(newGroup) {
            var result = false;

            if (newGroup && $J.typeOf(newGroup) === 'string' && !$J.contains(this.groups, newGroup)) {
              result = true;
              this.groups.push(newGroup);
            }

            return result;
          };

          _proto44.removeGroup = function removeGroup(group) {
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

          _proto44.isCustomSelector = function isCustomSelector() {
            return this.selector.isCustom;
          };

          _proto44.single = function single(isSingle) {
            if (this.isSirv()) {
              this.broadcast('isSingleSlide', {
                data: {
                  isSingle: isSingle
                }
              });
            }
          };

          _proto44.setNewIndex = function setNewIndex(index) {
            this.index = index;
          };

          _proto44.getIndex = function getIndex() {
            return this.index;
          };

          _proto44.checkReadiness = function checkReadiness(eventName, component) {
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

          _proto44.sendReadyEvent = function sendReadyEvent(eventName, component) {
            if (this.isSirv() && globalVariables.SLIDE.NAMES[this.sirvService.getType()] === component) {
              this.sirvService.sendEvent(eventName);
            }
          };

          _proto44.createFullscreenOnlyScreen = function createFullscreenOnlyScreen() {
            var _this134 = this;

            if (this.options.fullscreenOnly) {
              this.fullscreenOnlyNode = $J.$new('div').addClass(CSS_MAIN_CLASS + '-fullscreen-always'); // this.fullscreenOnlyNode.addEvent('mousedown touchstart', (e) => {

              this.fullscreenOnlyNode.addEvent('btnclick tap', function (e) {
                e.stop();

                _this134.emit('goToFullscreen');
              });
              this.createPinchEvent(this.fullscreenOnlyNode);
              this.instanceNode.append(this.fullscreenOnlyNode, 'top');
            }
          };

          _proto44.createPinchEvent = function createPinchEvent(node) {
            var _this135 = this;

            if ($J.browser.touchScreen) {
              // difference between scale
              var FS_IN = 2;
              node.addEvent('pinch', function (e) {
                e.stop();

                switch (e.state) {
                  case 'pinchend':
                    if (_this135.fullscreenState === 0 && e.scale >= FS_IN) {
                      _this135.emit('goToFullscreen');
                    }

                    break;

                  default:
                }
              });
            }
          };

          _proto44.isEnabled = function isEnabled() {
            return this.enabled;
          };

          _proto44.disable = function disable() {
            this.enabled = false;

            if (this.video) {
              this.video.pause();
            }

            if (this.componentLoader) {
              this.componentLoader.hide(true);
            }
          };

          _proto44.enable = function enable() {
            this.enabled = true;
          };

          _proto44.isBlokedTouchdrag = function isBlokedTouchdrag() {
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

          _proto44.setOptions = function setOptions(options) {
            this.options = $J.extend({
              spin: {},
              zoom: {},
              image: {},
              video: {},
              fullscreenOnly: false
            }, options || {});
          };

          _proto44.dragEvent = function dragEvent(type) {
            if (this.sirvService) {
              this.broadcast('dragEvent', {
                data: {
                  type: type
                }
              });
            }
          };

          _proto44.startFullInit = function startFullInit(options) {
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

          _proto44.createComponentLoader = function createComponentLoader() {
            if (!this.componentLoader) {
              this.componentLoader = new ComponentLoader(this.instanceNode);
              this.componentLoader.show();
            }
          };

          _proto44.isSlideAvailable = function isSlideAvailable() {
            return this.availableSlide;
          };

          _proto44.isSelectorPinned = function isSelectorPinned() {
            return $J.contains(['start', 'end'], this.selector.pinned);
          };

          _proto44.getPinnedSelectorSide = function getPinnedSelectorSide() {
            return this.selector.pinned;
          };

          _proto44.setFullscreenEvents = function setFullscreenEvents() {
            var _this136 = this;

            this.on('beforeFullscreenIn', function (e) {
              if (_this136.fullscreenState === globalVariables.FULLSCREEN.OPENING) {
                e.stopPropagation();
              } else {
                _this136.fullscreenState = globalVariables.FULLSCREEN.OPENING;

                if (_this136.video) {
                  _this136.isVideoPaused = _this136.video.isPaused();

                  _this136.video.onBeforeFullscreenIn();
                }
              }

              if (_this136.fullscreenOnlyNode) {
                _this136.fullscreenOnlyNode.setCssProp('display', 'none');
              }

              _this136.addEventCloseFullscreenByClick();
            });
            this.on('afterFullscreenIn', function (e) {
              if (_this136.socialbuttons) {
                _this136.socialbuttons.closeButtons();
              }

              if (_this136.fullscreenState === globalVariables.FULLSCREEN.OPENED) {
                e.stopPropagation();
              } else {
                _this136.fullscreenState = globalVariables.FULLSCREEN.OPENED;

                if (_this136.isSirv() && _this136.componentLoader.isHiding()) {
                  _this136.componentLoader.hide(true);
                }

                if (_this136.video) {
                  _this136.video.onAfterFullscreenIn();

                  if (_this136.video.isAutoplay() || !_this136.video.isPreStart()) {
                    _this136.playVideo();
                  }
                }
              }
            });
            this.on('beforeFullscreenOut', function (e) {
              if (_this136.socialbuttons) {
                _this136.socialbuttons.closeButtons();
              }

              if (_this136.fullscreenState === globalVariables.FULLSCREEN.CLOSING) {
                e.stopPropagation();
              } else {
                _this136.fullscreenState = globalVariables.FULLSCREEN.CLOSING;

                if (_this136.video) {
                  _this136.isVideoPaused = _this136.video.isPaused();

                  _this136.video.onBeforeFullscreenOut();
                }
              }

              if (_this136.fullscreenOnlyNode) {
                _this136.fullscreenOnlyNode.setCssProp('display', '');
              }
            });
            this.on('afterFullscreenOut', function (e) {
              if (_this136.fullscreenState === globalVariables.FULLSCREEN.CLOSED) {
                e.stopPropagation();
              } else {
                _this136.fullscreenState = globalVariables.FULLSCREEN.CLOSED;

                if (_this136.video) {
                  _this136.video.onAfterFullscreenOut();

                  if (_this136.video.isAutoplay() || !_this136.video.isPreStart()) {
                    _this136.playVideo();
                  }
                }
              }

              _this136.removeEventCloseFullscreeByClick();
            });
            this.on('inView', function (e) {
              _this136.inView = e.data;

              if (_this136.video) {
                if (_this136.inView) {
                  if (!_this136.isVideoPaused && !_this136.video.isPreStart() || _this136.video.isAutoplay()) {
                    _this136.playVideo();
                  }
                } else {
                  _this136.isVideoPaused = _this136.video.isPaused();

                  _this136.video.getCurrentTime();

                  _this136.video.pause();
                }
              }
            });
          };

          _proto44.addEventCloseFullscreenByClick = function addEventCloseFullscreenByClick() {
            if (this.options.fullscreenOnly && this.type === globalVariables.SLIDE.TYPES.IMAGE) {
              this.contentWrapper.addEvent('btnclick tap', this.sendEventCloseFullscreenByClick);
              this.slideContent.addEvent('btnclick tap', this.sendEventCloseFullscreenByClick);
            }
          };

          _proto44.removeEventCloseFullscreeByClick = function removeEventCloseFullscreeByClick() {
            if (this.options.fullscreenOnly && this.type === globalVariables.SLIDE.TYPES.IMAGE) {
              this.contentWrapper.removeEvent('btnclick tap', this.sendEventCloseFullscreenByClick);
              this.slideContent.removeEvent('btnclick tap', this.sendEventCloseFullscreenByClick);
            }
          };

          _proto44.isSirv = function isSirv() {
            return !!this.sirvService;
          };

          _proto44.getNode = function getNode() {
            return this.instanceNode;
          };

          _proto44.getOriginNode = function getOriginNode() {
            return this.lastOriginNode || this.slideContent;
          };

          _proto44.getOriginImageUrl = function getOriginImageUrl() {
            if (this.isSirv()) {
              return this.sirvService.getOriginImageUrl();
            }

            return null;
          };

          _proto44.zoomIn = function zoomIn(x, y) {
            this.broadcast('zoomUp', {
              data: {
                x: x,
                y: y
              }
            });
          };

          _proto44.zoomOut = function zoomOut(x, y) {
            this.broadcast('zoomDown', {
              data: {
                x: x,
                y: y
              }
            });
          };

          _proto44.mouseAction = function mouseAction(type, originEvent) {
            if (this.isSirv()) {
              this.broadcast('mouseAction', {
                data: {
                  type: type,
                  originEvent: originEvent
                }
              });
            }
          };

          _proto44.getZoomData = function getZoomData() {
            if (this.isSirv()) {
              return this.sirvService.getZoomData();
            }

            return null;
          };

          _proto44.getTypeOfSlide = function getTypeOfSlide() {
            var result = null;

            if (this.isSirv()) {
              result = this.sirvService.getType();
            }

            return result;
          };

          _proto44.getOptions = function getOptions() {
            return this.isSirv() ? this.sirvService.getToolOptions() : {};
          };

          _proto44.createSlideApi = function createSlideApi() {
            if (this.isSirv() && !this.isStarted) {
              this.isStarted = true;
              this.api[globalVariables.SLIDE.NAMES[this.sirvService.getType()]] = this.sirvService.getData();
            }
          };

          _proto44.beforeShow = function beforeShow() {
            this.isActive = true;
            this.show();

            if (this.isSirv()) {
              this.sirvService.activate();
            }

            this.createSlideApi();
          };

          _proto44.afterShow = function afterShow(whoUse) {
            this.slideShownBy = whoUse || globalVariables.SLIDE_SHOWN_BY.NONE;
            this.broadcast('startActions', {
              who: this.slideShownBy
            });

            if (this.video && this.video.isAutoplay()) {
              this.playVideo();
            }
          };

          _proto44.beforeHide = function beforeHide() {
            if (this.video) {
              this.video.pause();
            } else {
              this.broadcast('stopActions');
            }
          };

          _proto44.afterHide = function afterHide() {
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

          _proto44.show = function show() {
            this.instanceNode.removeClass(CSS_MAIN_CLASS + '-hidden');
            this.instanceNode.addClass(CSS_MAIN_CLASS + '-shown');
          };

          _proto44.hide = function hide() {
            this.instanceNode.removeClass(CSS_MAIN_CLASS + '-shown');
            this.instanceNode.addClass(CSS_MAIN_CLASS + '-hidden');
          };

          _proto44.isZoomSizeExist = function isZoomSizeExist() {
            if (this.isSirv()) {
              return this.sirvService.isZoomSizeExist();
            }

            return false;
          };

          _proto44.startTool = function startTool(isShown, preload, firstSlideAhead) {
            var _this137 = this;

            if (this.isSirv()) {
              this.getSlideSize().then(function (infoSize) {
                if (_this137.isInDom) {
                  _this137.sirvService.startTool(isShown || _this137.isActive, preload, firstSlideAhead);

                  _this137.addSocialButtons();
                }
              }).catch(function (err) {});
            } else {
              this.getSlideSize().then(function () {
                _this137.emit('contentLoaded', {
                  data: {
                    slide: {
                      index: _this137.index
                    }
                  }
                });
              });
            }
          };

          _proto44.getSlideSize = function getSlideSize() {
            var _this138 = this;

            if (!this.sizePromise) {
              this.sizePromise = new Promise(function (resolve, reject) {
                if (_this138.isSirv()) {
                  var result = {
                    UUID: _this138.$J_UUID
                  };

                  _this138.sirvService.getInfoSize().then(function (infoSize) {
                    if (!_this138.infoSize && infoSize.size) {
                      _this138.infoSize = infoSize.size;
                    }

                    result.size = _this138.infoSize;
                    resolve(result);
                  }).catch(function (err) {
                    result.error = true;

                    if (_this138.sirvService) {
                      var typeOfSirvService = _this138.sirvService.getType();

                      _this138.removeSirvService();

                      if (err && err.error && err.error.status && err.error.status === 404) {
                        result.error = err.error;
                        reject(result);
                      } else if (err && (err.error === 'changeSpinToImage' || typeOfSirvService === globalVariables.SLIDE.TYPES.IMAGE || err.isPlaceholder)) {
                        _this138.isPlaceholder = err.isPlaceholder;

                        if (typeOfSirvService === globalVariables.SLIDE.TYPES.IMAGE) {
                          _this138.isInDom = 0;

                          _this138.appendToDOM();

                          var data = findSomethingForSelector(_this138.slideContent.node);

                          if (!_this138.selector.isCustom) {
                            _this138.selector.src = data ? data.data : null;
                            _this138.selector.isSirv = false;
                          }
                        } else {
                          _this138.changeSpinToImage();
                        } // финт ушами


                        var oldPromise = _this138.sizePromise;
                        _this138.sizePromise = null;

                        var newPromise = _this138.getSlideSize();

                        _this138.sizePromise = oldPromise;
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
                    if (_this138.isCustomAdded) {
                      _this138.emit('infoReady', {
                        data: {
                          index: _this138.index
                        }
                      });
                    }
                  });
                } else {
                  var img;
                  var src;

                  if (_this138.slideContent.getTagName() === 'img') {
                    img = _this138.slideContent.node;
                  } else {
                    try {
                      img = _this138.slideContent.node.getElementsByTagName('img')[0];
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
                      _this138.infoSize = imageData.size;
                      resolve({
                        size: _this138.infoSize,
                        UUID: _this138.$J_UUID
                      });
                    }).catch(function (error) {
                      resolve({
                        size: _this138.infoSize,
                        UUID: _this138.$J_UUID,
                        error: {
                          status: 404
                        }
                      });
                    });
                  } else {
                    if (_this138.video) {
                      _this138.video.getSize().then(function (size) {
                        _this138.infoSize = size || {
                          width: 0,
                          height: 0
                        };
                        resolve({
                          size: _this138.infoSize,
                          UUID: _this138.$J_UUID
                        });
                      }).catch(function (err) {
                        reject({
                          size: _this138.infoSize,
                          UUID: _this138.$J_UUID,
                          error: err
                        });
                      });
                    } else {
                      getContentSize(_this138.slideContent.node).then(function (size) {
                        _this138.infoSize = size || {
                          width: 0,
                          height: 0
                        };
                        resolve({
                          size: _this138.infoSize,
                          UUID: _this138.$J_UUID
                        });
                      }).catch(function (err) {
                        reject({
                          size: _this138.infoSize,
                          UUID: _this138.$J_UUID,
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

          _proto44.getData = function getData() {
            return this.api;
          };

          _proto44.removeSirvService = function removeSirvService() {
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

          _proto44.changeSpinToImage = function changeSpinToImage() {
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

          _proto44.setSirvEvents = function setSirvEvents() {
            var _this139 = this;

            this.on('stats', function (e) {
              e.stopEmptyEvent();
              e.data.index = _this139.index;
            }); // init, ready, zoomIn, zoomOut

            this.on('componentEvent', function (e) {
              e.stopEmptyEvent();
              var eventData = e.data.data;
              eventData.type = e.data.type;
              eventData.node = _this139.slideContent;

              if (e.data.type === 'ready') {
                _this139.isReady = true;
              }

              e.data.slide = _this139.getData();
              e.data.componentEventData = eventData;

              if (e.data.component === globalVariables.SLIDE.NAMES[globalVariables.SLIDE.TYPES.SPIN]) {
                if (e.data.type === 'init') {
                  _this139.componentLoader.hide();

                  _this139.spinWasInited = true;
                  var spinTypeClassMap = {
                    row: 'spin-x',
                    col: 'spin-y',
                    'multi-row': 'spin-xy'
                  };

                  if (_this139.selector.node) {
                    _this139.selector.node.addClass(spinTypeClassMap[_this139.sirvService.getSpinOrientation()] || '');
                  }
                }
              } else {
                if (e.data.type === 'ready') {
                  _this139.componentLoader.hide();
                }
              }

              if (e.data.type === 'ready' && $J.contains(['spin', 'zoom'], e.data.component)) {
                if (_this139.sirvService.isZoomSizeExist()) {
                  _this139.contentWrapper.addClass(CAN_ZOOM_CLASS);
                }
              }
            });
          };

          _proto44.addSocialButtons = function addSocialButtons() {
            var _this140 = this;

            if (this.validateComponentSocialButton()) {
              var arr = ['facebook', 'twitter', 'linkedin', 'reddit', 'tumblr', 'pinterest', 'telegram'];
              var sTypes = {};
              arr.forEach(function (value) {
                sTypes[value] = _this140.options['sb' + $J.camelize('-' + value)];
              });
              var dataImageSB = SocialButtons.getDataImage();
              var link = {};
              arr.forEach(function (value) {
                link[value] = _this140.getLinkSocialButton(dataImageSB[value], sTypes[value]);
              });
              this.socialbuttons = new SocialButtons({
                'text': this.slideContent.attr('alt'),
                'link': link,
                'title': this.slideContent.attr('title')
              }, sTypes, this.instanceNode);
            }
          };

          _proto44.validateComponentSocialButton = function validateComponentSocialButton() {
            if (this.options.sbEnable && SocialButtons && !this.socialbuttons) {
              if (this.isSirv() && this.sirvService.getType() !== globalVariables.SLIDE.TYPES.VIDEO || this.video && this.video.type !== 'video' || this.slideContent.getTagName() === 'img') {
                return true;
              }
            }

            return false;
          };

          _proto44.getLinkSocialButton = function getLinkSocialButton(data, isSpin, enable) {
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

          _proto44.searchImagesInHtmlContent = function searchImagesInHtmlContent() {
            var _this141 = this;

            var result = false;
            var images = $J.$A(this.slideContent.node.querySelectorAll('img'));

            if (images.length) {
              result = true;
              this.multiImages = images;
              images.forEach(function (img, index) {
                var isSirvImage = !Slide.checkNonSirv(img);

                if (isSirvImage) {
                  if (!_this141.sirvService) {
                    _this141.setSirvEvents();

                    _this141.selector.isSirv = true;
                    _this141.sirvService = new SirvService(img, _this141.options, {
                      quality: _this141.options.quality,
                      hdQuality: _this141.options.hdQuality,
                      isHDQualitySet: _this141.options.isHDQualitySet,
                      always: _this141.options.fullscreenOnly,
                      isFullscreen: _this141.options.isFullscreen,
                      nativeFullscreen: _this141.options.nativeFullscreen
                    });

                    _this141.sirvService.setParent(_this141);

                    _this141.sirvService.start();

                    _this141.createSlideApi();
                  } else {
                    _this141.sirvService.push(img);
                  }
                }

                _this141.multiImages.push({
                  isSirv: isSirvImage,
                  node: img,
                  src: $(img).attr('src'),
                  datasrc: $(img).attr('data-src')
                });
              });
            }

            return result;
          };

          _proto44.isCustomSlideEmpty = function isCustomSlideEmpty() {
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

          _proto44.beforeParseSlide = function beforeParseSlide() {
            if (this.isCustomSelector()) {
              if (this.isCustomSlideEmpty()) {
                this.availableSlide = false;
                this.selector.activated = false;
              }

              this.selector.node.remove();
            }
          };

          _proto44.createImgFromDiv = function createImgFromDiv() {
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

          _proto44.parseSlide = function parseSlide() {
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

          _proto44.appendToDOM = function appendToDOM() {
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

          _proto44.initVideoPlayer = function initVideoPlayer() {
            if (this.video) {
              this.video.init();
            } else if (this.isSirv() && this.sirvService.getType() === globalVariables.SLIDE.TYPES.VIDEO) {
              this.sirvService.loadVideoSources();
            }
          };

          _proto44.secondSelectorClick = function secondSelectorClick() {
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

          _proto44.isSirvSelector = function isSirvSelector() {
            if (!this.selector.isCustom) {
              return this.isSirv() && this.sirvService.getType() !== globalVariables.SLIDE.TYPES.VIDEO;
            }

            return false;
          };

          _proto44.getSelectorProportion = function getSelectorProportion() {
            var _this142 = this;

            var result;

            if (this.dataThumbnailImage) {
              result = new Promise(function (resolve, reject) {
                _this142.getResponsiveImage().then(function () {
                  return resolve($J.extend({}, _this142.selector));
                }).catch(function (error) {
                  helper.loadImage(_this142.dataThumbnailImage).then(function (imageData) {
                    _this142.selector.size = imageData.size;
                    resolve($J.extend({}, _this142.selector));
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

          _proto44.getSelectorReferrerPolicy = function getSelectorReferrerPolicy() {
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

          _proto44.getResponsiveImage = function getResponsiveImage() {
            var _this143 = this;

            if (!this.customThumbnailImageClassPromise) {
              this.customThumbnailImageClassPromise = new Promise(function (resolve, reject) {
                var image = new ResponsiveImage(_this143.dataThumbnailImage);
                image.getImageInfo().then(function (info) {
                  _this143.selector.isSirv = true;
                  _this143.selector.size = image.getOriginSize();
                  resolve(image);
                }).catch(reject);
              });
            }

            return this.customThumbnailImageClassPromise;
          };

          _proto44.getSirvThumbnailForCustomSelector = function getSirvThumbnailForCustomSelector(data_) {
            var _this144 = this;

            return new Promise(function (resolve, reject) {
              _this144.getResponsiveImage().then(function (rImageInstance) {
                var data = rImageInstance.getThumbnail(data_);
                data.referrerpolicy = _this144.thumbnailReferrerPolicy;
                resolve(data);
              }).catch(reject);
            });
          };

          _proto44.getSelectorImgUrl = function getSelectorImgUrl(type, size, crop, watermark) {
            var _this145 = this;

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
                _this145.selector.src = _data.src;
              }

              if (_data.srcset) {
                _this145.selector.srcset = _data.srcset;
              }

              var selectorData = $J.extend({}, _data);
              selectorData = $J.extend(selectorData, _this145.selector);
              return selectorData;
            };

            return new Promise(function (resolve, reject) {
              if (_this145.isSirv()) {
                _this145.sirvService.getInfoSize().then(function (infoSize) {
                  if (_this145.selector.isCustom) {
                    if (_this145.selector.isStatic) {
                      resolve($J.extend({}, _this145.selector));
                    } else {
                      _this145.getSirvThumbnailForCustomSelector(data).then(function (result) {
                        return resolve(extend(result));
                      }).catch(function () {
                        return resolve($J.extend({}, _this145.selector));
                      });
                    }
                  } else {
                    _this145.sirvService.getSelectorImgUrl(data).then(function (result) {
                      result.referrerpolicy = _this145.thumbnailReferrerPolicy;
                      resolve(extend(result));
                    }).catch(reject);
                  }
                }).catch(reject);
              } else {
                if (_this145.selector.isCustom && _this145.dataThumbnailImage) {
                  if (_this145.selector.isStatic) {
                    resolve($J.extend({}, _this145.selector));
                  } else {
                    _this145.getSirvThumbnailForCustomSelector(data).then(function (_result) {
                      return resolve(extend(_result));
                    }).catch(function () {
                      return resolve($J.extend({}, _this145.selector));
                    });
                  }
                } else if (_this145.slideContent.getTagName() === 'img' || _this145.multiImages.length) {
                  resolve($J.extend({}, _this145.selector));
                } else if (_this145.video) {
                  _this145.getNonSirvVideoThumbnail().then(resolve).catch(reject);
                } // if (this.slideContent.getTagName() === 'img' || this.multiImages.length || this.dataThumbnailImage) {
                //     resolve($J.extend({}, this.selector));
                // } else if (this.video) {
                //     this.getNonSirvVideoThumbnail().then(resolve).catch(reject);
                // }

              }
            });
          };

          _proto44.getNonSirvVideoThumbnail = function getNonSirvVideoThumbnail() {
            var _this146 = this;

            if (!this.getVideoThumbnailPromise) {
              this.getVideoThumbnailPromise = new Promise(function (resolve, reject) {
                helper.videoModule.getImageSrc(_this146.slideContent, true).then(function (data) {
                  if (!_this146.selector.isCustom) {
                    _this146.selector.src = data.thumbnail.url;
                    _this146.selector.size = {
                      width: data.thumbnail.width,
                      height: data.thumbnail.height
                    };
                  }

                  resolve($J.extend({}, _this146.selector));
                }).catch(function (err) {
                  if (!err || err === true) {
                    err = {
                      UUID: _this146.$J_UUID
                    };
                  } else {
                    err.UUID = _this146.$J_UUID;
                  }

                  reject(err);
                });
              });
            }

            return this.getVideoThumbnailPromise;
          };

          _proto44.isSpinInited = function isSpinInited() {
            return this.spinWasInited;
          };

          _proto44.isSlideReady = function isSlideReady() {
            return this.isReady;
          };

          _proto44.getSelector = function getSelector() {
            var _this147 = this;

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
                  _this147.getResponsiveImage().catch(function (err) {}).finally(function () {
                    resolve(_this147.selector.isSirv, _this147.selector.size);
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

          _proto44.getUUID = function getUUID() {
            return this.$J_UUID;
          };

          _proto44.isSlideActive = function isSlideActive() {
            return this.isActive;
          };

          _proto44.playVideo = function playVideo() {
            if (this.isActive && this.inView && this.video && (this.fullscreenState === globalVariables.FULLSCREEN.OPENED || $J.contains([globalVariables.SLIDE_SHOWN_BY.AUTOPLAY, globalVariables.SLIDE_SHOWN_BY.USER, globalVariables.SLIDE_SHOWN_BY.INIT], this.slideShownBy))) {
              this.video.play();
            }
          };

          _proto44.initVideo = function initVideo() {
            var _this148 = this;

            this.on('slideVideoReady', function (e) {
              e.stop();

              if (!_this148.isVideoReady) {
                _this148.isVideoReady = true;
                _this148.isReady = true;

                _this148.video.show();

                _this148.componentLoader.hide();
              }

              if (_this148.video.isAutoplay() || !_this148.video.isPreStart()) {
                _this148.playVideo();
              }
            });
            this.on('slideVideoPlay', function (e) {
              // e.stop();
              e.data.slide = _this148.getData();

              if (_this148.isVideoPaused && !_this148.video.isAutoplay()) {
                _this148.video.pause();
              }

              _this148.isVideoPaused = false;
            });
            this.on('slideVideoPause', function (e) {
              // e.stop();
              e.data.slide = _this148.getData();
            });
            this.on('slideVideoEnd', function (e) {
              // e.stop();
              e.data.slide = _this148.getData();
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

          _proto44.resize = function resize() {
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

          _proto44.destroy = function destroy() {
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

            _EventEmitter15.prototype.destroy.call(this);
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

        var Slider = /*#__PURE__*/function (_EventEmitter16) {
          "use strict";

          bHelpers.inheritsLoose(Slider, _EventEmitter16);

          function Slider(node, options) {
            var _this149;

            _this149 = _EventEmitter16.call(this) || this;
            _this149.instanceNode = $(node);
            _this149.instanceOptions = options.options;
            _this149.viewerFileContent = options.viewerFileContent;

            _this149.option = function () {
              if (arguments.length > 1) {
                return _this149.instanceOptions.set(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
              }

              return _this149.instanceOptions.get(arguments.length <= 0 ? undefined : arguments[0]);
            };

            _this149.slideOptions = $J.extend(options.slideOptions, {
              quality: _this149.instanceOptions.isset('quality') ? _this149.option('quality') : null,
              hdQuality: _this149.option('hdQuality'),
              isHDQualitySet: _this149.instanceOptions.isset('hdQuality'),
              fullscreenOnly: _this149.option(FULLSCREEN + '.always'),
              isFullscreen: _this149.option(FULLSCREEN + '.enable'),
              nativeFullscreen: _this149.option(FULLSCREEN + '.native'),
              sbEnable: _this149.option('slide.socialbuttons.enable'),
              sbFacebook: _this149.option('slide.socialbuttons.types.facebook'),
              sbTwitter: _this149.option('slide.socialbuttons.types.twitter'),
              sbLinkedin: _this149.option('slide.socialbuttons.types.linkedin'),
              sbReddit: _this149.option('slide.socialbuttons.types.reddit'),
              sbTumblr: _this149.option('slide.socialbuttons.types.tumblr'),
              sbPinterest: _this149.option('slide.socialbuttons.types.pinterest'),
              sbTelegram: _this149.option('slide.socialbuttons.types.telegram')
            });
            _this149.id = _this149.instanceNode.attr('id');

            if (!_this149.id) {
              _this149.id = CSS_MAIN_CLASS + '-' + helper.generateUUID();

              _this149.instanceNode.attr('id', _this149.id);
            }

            _this149.lazyInit = options.lazyInit;
            _this149.movingContainer = $J.$new('div').addClass(CSS_MAIN_CLASS);
            _this149.slideWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-slides-box');
            _this149.slidesContainer = $J.$new('div').addClass(CSS_MAIN_CLASS + '-slides');
            _this149.selectorsWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-selectors-box');
            _this149.fullScreenBox = $J.$new('div').addClass(CSS_MAIN_CLASS + '-' + FULLSCREEN + '-box');
            _this149.controlsWrapper = $J.$new('div').addClass(CSS_MAIN_CLASS + '-controls');
            _this149.producDetailsText = _this149.instanceNode.attr('data-product-detail');
            _this149.productDetail = null;

            _this149.fullScreenBox.addEvent('mousescroll touchstart', function (e) {
              e.stopDistribution();
            });

            _this149.isReady = false;
            _this149.isMoving = false;
            _this149.isSelectorsReady = false;
            _this149.isToolStarted = false;
            _this149.isInitialized = false;
            _this149.isStartedFullInit = false;
            _this149.inViewModule = null;
            _this149.isInView = false;
            _this149.firstSlideAhead = false;
            _this149.rootMargin = 0;
            _this149.fullscreenButton = null;
            _this149.doSetSize = false;
            _this149.heightProportion = null;
            _this149.slides = [];
            _this149.enabledIndexesOfSlides = [];
            _this149.selectors = null;
            _this149.arrows = null;
            _this149.contextMenu = null;
            _this149.countOfSizes = $([]);
            _this149.isFullscreen = globalVariables.FULLSCREEN.CLOSED;
            _this149.fullscreenStartTime = null;
            _this149.index = 0;
            _this149.movingContainerId = CSS_MAIN_CLASS + '-' + helper.generateUUID();
            _this149.cssRulesId = 'sirv_css_rules-' + helper.generateUUID();
            _this149.isComponentPinching = false;
            _this149.isZoomIn = false;
            _this149.hasSize = false;
            _this149.isPseudo = false;
            _this149.doHistory = true;
            _this149.isAutoplay = _this149.option('slide.autoplay');
            _this149.autoplayDelay = _this149.option('slide.delay');
            _this149.residualAutoplayTime = _this149.autoplayDelay;
            _this149.sliderNodes = [];
            _this149.destroyed = false;
            _this149.autoplayTimer = null;
            _this149.timerRemove = null;
            _this149.onResizeDebounce = helper.debounce(function () {
              _this149.onResizeWithoutSelectors();
            }, 16);
            _this149.selectorsDebounce = null;

            if (_this149.doHistory) {
              _this149.fullscreenViewId = Math.floor(Math.random() * $J.now());
              globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.push(_this149.fullscreenViewId);
            }

            _this149.controlsWrapperWasAppended = false;
            _this149.isStandardGrid = false;
            _this149.isFullscreenGrid = false; // conflict with pinch event make us to inject the timer
            // this.touchDragTimer = null;

            _this149.clearingTouchdragFunction = null;
            _this149.classes = {
              standard: {
                movingContainerClasses: $([]),
                selectorsWrapperClasses: $([])
              },
              fullscreen: {
                movingContainerClasses: $([]),
                selectorsWrapperClasses: $([])
              }
            };
            _this149.externalContainer = null;

            if ($J.browser.mobile) {
              _this149.movingContainer.addClass(CSS_MAIN_CLASS + '-mobile');
            }

            _this149.onResizeHandler = _this149.onResize.bind(bHelpers.assertThisInitialized(_this149));

            _this149.pseudoFSEvent = function (e) {
              if (e.oe.keyCode === 27) {
                // Esc
                $($J.D).removeEvent('keydown', _this149.pseudoFSEvent);

                _this149.exitFullScreen();
              }
            };

            _this149.keyBoardArrowsCallback = function (e) {
              var d;
              var kc = e.oe.keyCode;

              if (_this149.isReady) {
                if ($J.contains([37, 39], kc)) {
                  e.stop();
                  d = kc === 37 ? 'prev' : 'next';

                  _this149.jump(d, 2);
                }
              }
            };

            _this149.onHistoryStateChange = function (e) {
              try {
                if (e.oe.state && e.oe.state.name === 'Sirv.viewer') {
                  if (globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.indexOf(e.oe.state.hash) < 0) {
                    globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.splice(globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.indexOf(_this149.fullscreenViewId), 1);
                    _this149.fullscreenViewId = e.oe.state.hash;
                    globalVariables.FULLSCREEN_VIEWERS_IDs_ARRAY.push(_this149.fullscreenViewId);
                  }

                  if (e.oe.state.hash === _this149.fullscreenViewId) {
                    _this149.enterFullScreen();
                  }
                } else {
                  if (_this149.isFullscreenState()) {
                    _this149.exitFullScreen();
                  }
                }
              } catch (ex) {// empty
              }
            };

            var parsedSlides = _this149.getSlides();

            _this149.addComponentsCSS = helper.debounce(function () {
              globalFunctions.rootDOM.addCSSStringToHtml();
            }, 100);
            remoteModules.load(getExistComponents(parsedSlides, _this149.producDetailsText, _this149.option('slide.socialbuttons.enable'))).then(function () {
              if (!_this149.destroyed) {
                globalFunctions.rootDOM.addCSSStringToHtml();
                globalFunctions.rootDOM.addCSSString(_this149.instanceNode.node);

                _this149.setComponentsEvents();

                _this149.createSlides(parsedSlides);

                if ($J.browser.ready || $J.D.node.readyState !== 'loading') {
                  _this149.startFullInit();
                }

                if (ProductDetail && _this149.option('productdetail.enable') && _this149.producDetailsText) {
                  _this149.createProductDetails();
                }
              }
            });
            return _this149;
          }

          var _proto45 = Slider.prototype;

          _proto45.isFullscreenState = function isFullscreenState() {
            return $J.contains([globalVariables.FULLSCREEN.OPENING, globalVariables.FULLSCREEN.OPENED], this.isFullscreen);
          };

          _proto45.createProductDetails = function createProductDetails() {
            this.productDetail = new ProductDetail({
              text: this.producDetailsText,
              position: this.option('productdetail.position')
            }, this.movingContainer, this.fullScreenBox);
          };

          _proto45.setRootMargin = function setRootMargin() {
            var value = parseInt(this.option('threshold'), 10);

            if ($J.typeOf(this.option('threshold')) === 'string') {
              var v = ($J.W.node.innerHeight || $J.D.node.documentElement.clientHeight) / 100 * value;
              value = v;
            }

            this.rootMargin = value;
          };

          _proto45.startFullInit = function startFullInit(options) {
            var _this150 = this;

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
                  return _this150.instanceOptions.set(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
                }

                return _this150.instanceOptions.get(arguments.length <= 0 ? undefined : arguments[0]);
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
              slide.startFullInit(options ? _this150.slideOptions : null);
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
              if (_this150.destroyed) {
                return;
              }

              var size = _this150.slidesContainer.node.getBoundingClientRect();

              if (!size.height) {
                size = _this150.slideWrapper.node.getBoundingClientRect();
              }

              steps -= 1;

              if (steps > 0 && (!size.width && !size.height || containerHasHeight && !size.height)) {
                setTimeout(getSize, 16);
              } else {
                _this150.instanceNode.setCssProp('font-size', '');

                if (size.width) {
                  // size.height / size.width < 0.25 - fix for ie and firefox
                  // if (!size.height || size.height / size.width < 0.25) {
                  if (!size.height) {
                    _this150.doSetSize = true;
                  }
                } else {
                  // Fix for display none
                  _this150.doSetSize = true;
                }

                _this150.slides.forEach(function (slide) {
                  if (slide.isSlideAvailable()) {
                    _this150.slidesContainer.append(slide.getNode());
                  }

                  slide.appendToDOM(); // all elements must be in dom

                  slide.initVideoPlayer();
                });

                _this150.setClasses();

                _this150.searchingOfProportions();

                if (_this150.selectors) {
                  _this150.selectors.init();
                }

                _this150.postInitialization();
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

          _proto45.visibleSlides = function visibleSlides() {
            return this.slides.filter(function (slide) {
              return slide.isSlideAvailable() && slide.isEnabled();
            }).length;
          };

          _proto45.searchingOfProportions = function searchingOfProportions() {
            var _this151 = this;

            var l = this.slides.length;

            var initOtherComponents = function () {
              var i = _this151.index;
              var p = _this151.firstSlideAhead ? false : _this151.option('slide.preload');
              _this151.hasSize = _this151.setContainerSize();

              if (_this151.inViewModule && helper.isIe()) {
                _this151.inViewModule.takeRecords();
              }

              _this151.slides.forEach(function (_slide, index) {
                _slide.startTool(i === index, p, _this151.firstSlideAhead);
              });

              _this151.createEffect();

              _this151.isToolStarted = true;

              _this151.checkSingleSlide();

              _this151.slides[_this151.index].beforeShow();

              _this151.slides[_this151.index].afterShow(globalVariables.SLIDE_SHOWN_BY.INIT);

              _this151.postInitialization();
            };

            var getSlideSize = function (index, indexes) {
              return new Promise(function (resolve, reject) {
                var slide = _this151.slides[index];
                var slidesCount = _this151.slides.length;
                indexes.push(index);

                if (slide) {
                  var nextSearching = function () {
                    var nextIndex = helper.getArrayIndex(index + 1, l);

                    if (slidesCount !== _this151.slides.length && nextIndex > index) {
                      nextIndex = index;
                    }

                    if ($J.contains(indexes, nextIndex)) {
                      var tmp = _this151.slidesContainer.getSize();

                      if (!tmp.width) {
                        tmp.width = 500; // we don'n have any size
                      }

                      if (!tmp.height) {
                        // it can be video without sizes or html, but we have width
                        tmp.height = tmp.width * 0.5625; // (9/16)
                      }

                      _this151.heightProportion = tmp;
                      resolve();
                    } else {
                      getSlideSize(nextIndex, indexes).then(resolve);
                    }
                  };

                  slide.getSlideSize().then(function (data) {
                    var size = data.size;

                    if (size && size.width && size.height) {
                      _this151.heightProportion = size;
                      resolve();
                    } else {
                      nextSearching();
                    }
                  }).catch(function (err) {
                    var _l = _this151.slides.length;

                    if (err && err.error && err.error.status === 404) {
                      _l -= 1;

                      _this151.pickOut(err.UUID);
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

          _proto45.initTouchDrag = function initTouchDrag() {
            var _this152 = this;

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

                  _this152.sendEvent('beforeSlideIn', {
                    slide: nextSlide.getData()
                  });

                  _this152.sendEvent('beforeSlideOut', {
                    slide: middleSlide.getData()
                  });

                  _this152.index = nextSlide.getIndex();
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

                  if (_this152.selectors) {
                    _this152.selectors.setActiveItem(_this152.index);

                    _this152.selectors.jump(_this152.index);
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
                    _this152.checkLoop(_this152.index);

                    nextSlide.afterShow(globalVariables.SLIDE_SHOWN_BY.USER);
                    middleSlide.afterHide();

                    _this152.sendEvent('afterSlideIn', {
                      slide: nextSlide.getData()
                    });

                    _this152.sendEvent('afterSlideOut', {
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

                _this152.enableFullscreenButton();

                _this152.autoplay();

                isMoving = false;
                _this152.isMoving = false;
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
                currentIndex = _this152.index;
              }

              var index = _this152.getNextIndex(direction, currentIndex, _this152.slides.length, loop);

              if (index !== null) {
                var slide = _this152.slides[index];

                if (slide.getIndex() !== _this152.index) {
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

              _this152.effect.stop();

              if (_this152.index === null) {
                return;
              }

              middleSlide = _this152.slides[_this152.index];

              if (middleSlide.isSwipeDisabled()) {
                return;
              }

              isMoving = true;
              _this152.isMoving = true;
              containerPosition = _this152.slidesContainer.getPosition()[axises[1]];
              size = _this152.slidesContainer.getSize()[axises[2]];
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

              _this152.disableFullscreenButton();
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
              if (_this152.isComponentPinching || _this152.isZoomIn || _this152.slides[_this152.index].isBlokedTouchdrag() || _this152.option(FULLSCREEN + '.always') && _this152.isFullscreen !== globalVariables.FULLSCREEN.OPENED) {
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

          _proto45.appendSelectors = function appendSelectors(start) {
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

          _proto45.createClasses = function createClasses() {
            var _this153 = this;

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
              var grid = isStandard ? _this153.isStandardGrid : _this153.isFullscreenGrid;

              if (en) {
                if (!isStandard || !_this153.externalContainer) {
                  _this153.classes[_type].movingContainerClasses.push(CSS_MAIN_CLASS + '-selectors-' + s);
                }

                _this153.classes[_type].selectorsWrapperClasses.push(CSS_MAIN_CLASS + '-' + ss);

                _this153.classes[_type].selectorsWrapperClasses.push(CSS_MAIN_CLASS + '-' + getOrientation(s));

                if (grid) {
                  _this153.classes[_type].selectorsWrapperClasses.push(CSS_MAIN_CLASS + '-grid');
                }

                if (option('fullscreen.thumbnails.autohide') && !isStandard) {
                  _this153.classes[_type].movingContainerClasses.push(CSS_MAIN_CLASS + '-autohide');

                  _this153.classes[_type].movingContainerClasses.push(CSS_MAIN_CLASS + '-selectors-closed');
                }
              }
            });
          };

          _proto45.changeClasses = function changeClasses(obj, remove) {
            var _this154 = this;

            var action = remove ? 'removeClass' : 'addClass';
            obj.movingContainerClasses.forEach(function (className) {
              _this154.movingContainer[action](className);
            });
            obj.selectorsWrapperClasses.forEach(function (className) {
              _this154.selectorsWrapper[action](className);
            });
          };

          _proto45.setClasses = function setClasses() {
            if (this.isFullscreenState()) {
              this.changeClasses(this.classes.standard, true);
              this.changeClasses(this.classes.fullscreen);
            } else {
              this.changeClasses(this.classes.fullscreen, true);
              this.changeClasses(this.classes.standard);
            }
          };

          _proto45.setInViewAction = function setInViewAction() {
            var _this155 = this;

            if (this.option('autostart') === 'visible') {
              this.inViewModule = new helper.InViewModule(function (entries) {
                entries.forEach(function (entry) {
                  var last = _this155.isInView; // https://github.com/verlok/vanilla-lazyload/issues/293#issuecomment-469100338
                  // Sometimes 'intersectionRatio' can be 0 but 'isIntersecting' is true

                  var iv = entry.isIntersecting || entry.intersectionRatio > 0;

                  if (_this155.isFullscreenState() && !iv) {
                    iv = true;
                  }

                  if (last !== iv) {
                    _this155.isInView = iv;

                    _this155.postInitialization();

                    _this155.broadcast('inView', {
                      data: iv
                    });

                    if (_this155.isInView) {
                      _this155.autoplay();
                    } else {
                      _this155.pauseAutoplay();
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

          _proto45.sendEvent = function sendEvent(nameOfEvent, data) {
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

          _proto45.checkReadiness = function checkReadiness(eventName, component) {
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

          _proto45.sendReadyEvent = function sendReadyEvent(eventName, component) {
            if (component === 'viewer') {
              this.sendEvent('ready');
            } else {
              this.slides.forEach(function (slide) {
                slide.sendReadyEvent(eventName, component);
              });
            }
          };

          _proto45.sendStats = function sendStats(typeOfEvent, data) {
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

          _proto45.setComponentsEvents = function setComponentsEvents() {
            var _this156 = this;

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
              if (_this156.firstSlideAhead && index === _this156.index) {
                var p = _this156.option('slide.preload');

                _this156.enabledIndexesOfSlides.forEach(function (slideIndex) {
                  _this156.slides[slideIndex].startGettingInfo();

                  if (p) {
                    _this156.slides[slideIndex].loadContent();
                  } else {
                    _this156.slides[slideIndex].loadThumbnail();
                  }
                });
              }
            };

            var play = function (index) {
              if (_this156.index === index) {
                _this156.autoplay();
              }
            };

            var pause = function (index) {
              if (_this156.index === index) {
                _this156.pauseAutoplay();
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

              _this156.sendStats(null, e.data);
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
                  if (_this156.index === e.data.slide.index || _this156.slides[_this156.index] && _this156.slides[_this156.index].isSpinInited()) {
                    _this156.addControllWrapper();

                    _this156.enableFullscreenButton();

                    _this156.visibleFullscreenButton();
                  }

                  _this156.sendEvent('componentEvent', e.data);

                  break;

                case 'ready':
                  if (_this156.index === e.data.slide.index && e.data.component !== 'spin' && (!_this156.slides[e.data.slide.index].isVideoSlide() || _this156.isFullscreenState())) {
                    _this156.addControllWrapper();

                    _this156.enableFullscreenButton();

                    _this156.visibleFullscreenButton();
                  }

                  _this156.sendEvent('componentEvent', e.data);

                  break;

                case 'rotate':
                  _this156.sendEvent('componentEvent', e.data);

                  break;

                case 'fullscreenIn':
                  if (e.data.component === 'video') {
                    _this156.sendEvent('componentEvent', e.data);
                  } else if (_this156.option(FULLSCREEN + '.enable') && _this156.isFullscreen === globalVariables.FULLSCREEN.CLOSED) {
                    _this156.enterFullScreen();
                  }

                  break;

                case 'fullscreenOut':
                  if (e.data.component === 'video') {
                    _this156.sendEvent('componentEvent', e.data);
                  } else {
                    _this156.exitFullScreen();
                  }

                  break;

                case 'pinchStart':
                  // clearTimeout(this.touchDragTimer);
                  // this.touchDragTimer = null;
                  _this156.isComponentPinching = true;
                  break;

                case 'pinchEnd':
                  _this156.isComponentPinching = false;
                  break;

                case 'zoomIn':
                  _this156.isZoomIn = true;
                  pause(e.data.slide.index);

                  _this156.sendEvent('componentEvent', e.data);

                  break;

                case 'zoomOut':
                  _this156.isZoomIn = false;
                  play(e.data.slide.index);

                  _this156.sendEvent('componentEvent', e.data);

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

                    _this156.sendEvent('componentEvent', e.data);
                  }

                  break;

                case 'resume':
                  if (e.data.component === 'video') {
                    pause(e.data.slide.index);

                    _this156.sendEvent('componentEvent', e.data);
                  }

                  break;

                case 'pause':
                  if (e.data.component === 'video') {
                    _this156.sendEvent('componentEvent', e.data);
                  }

                  break;

                case 'end':
                  if (e.data.component === 'video') {
                    play(e.data.slide.index);

                    _this156.sendEvent('componentEvent', e.data);
                  }

                  break;

                case 'seek':
                  // video component event
                  _this156.sendEvent('componentEvent', e.data);

                  break;

                case 'contentLoaded':
                  loadContent(e.data.slide.index);
                  break;

                default: // no default

              }
            });
            this.on('goTo' + _FULLSCREEN, function (e) {
              e.stopAll();

              if (_this156.option(FULLSCREEN + '.enable') && _this156.isFullscreen === globalVariables.FULLSCREEN.CLOSED) {
                _this156.enterFullScreen();
              }
            });
            this.on('goTo' + _FULLSCREEN + 'Out', function (e) {
              e.stopAll();

              _this156.exitFullScreen();
            });
            this.on('infoReady', function (e) {
              // if slide was added by api
              e.stop();

              if (_this156.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
                var slide = _this156.slides[e.data.index];
                slide.broadcast('before' + _FULLSCREEN + 'In', {
                  data: {
                    pseudo: _this156.isPseudo
                  }
                });
                slide.broadcast('after' + _FULLSCREEN + 'In', {
                  data: {
                    pseudo: _this156.isPseudo
                  }
                });
              }
            });
            this.on(function (e) {
              e.stopAll();
            });
          };

          _proto45.normalizeOptions = function normalizeOptions() {
            var _this157 = this;

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
              if (isEmpty(_this157.option(opt))) {
                _this157.option(opt, false);
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

          _proto45.addControllWrapper = function addControllWrapper() {
            if (!this.controlsWrapperWasAppended && this.controlsWrapper.node.childNodes.length) {
              this.controlsWrapperWasAppended = true;
              this.slideWrapper.append(this.controlsWrapper);
            }
          };

          _proto45.postInitialization = function postInitialization() {
            var _this158 = this;

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

                  while (toElement && toElement !== _this158.movingContainer.node) {
                    toElement = toElement.parentNode;
                  }

                  if (_this158.movingContainer.node !== toElement && _this158.index !== null) {
                    _this158.slides[_this158.index].mouseAction('mouseout', e);
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

          _proto45.addHistory = function addHistory() {
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

          _proto45.setContainerSize = function setContainerSize() {
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

          _proto45.findSlideIndex = function findSlideIndex(id) {
            var result = -1;

            for (var i = 0, l = this.slides.length; i < l; i++) {
              if (this.slides[i].id && this.slides[i].id === id) {
                result = this.slides[i].index;
                break;
              }
            }

            return result;
          };

          _proto45.getCountOfEnabledSlides = function getCountOfEnabledSlides(isDisabled) {
            var result = this.enabledIndexesOfSlides.length;

            if (isDisabled) {
              result = this.slides.length - result;
            }

            return result;
          };

          _proto45.getItems = function getItems(settings) {
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

          _proto45.controlEnabledSlides = function controlEnabledSlides(indexOfSlide, remove) {
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

          _proto45.disableSlide = function disableSlide(indexOfSlide, withoutEvent) {
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

          _proto45.enableSlide = function enableSlide(slideIndex) {
            var _this159 = this;

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
                return _this159.slides[index].isSlideAvailable();
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

          _proto45.getSlidesByGroup = function getSlidesByGroup(group) {
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

          _proto45.enableGroupOfSlides = function enableGroupOfSlides(group) {
            var _this160 = this;

            var result = false;
            var slides = this.getSlidesByGroup(group);

            if (slides && slides.length) {
              result = true;
              slides.forEach(function (slide) {
                _this160.enableSlide(slide.getIndex());
              });
            }

            return result;
          };

          _proto45.disableGroupOfSlides = function disableGroupOfSlides(group) {
            var _this161 = this;

            var result = false;
            var slides = this.getSlidesByGroup(group);

            if (slides && slides.length) {
              result = true;
              slides.forEach(function (slide) {
                _this161.disableSlide(slide.getIndex());
              });
            }

            return result;
          };

          _proto45.switchGroupOfSlides = function switchGroupOfSlides(group) {
            var _this162 = this;

            var result = false;

            if (group) {
              var slides = this.getItems({
                enabled: true
              });
              slides.forEach(function (slide) {
                if (!_this162.slides[slide.index].belongsTo(group)) {
                  _this162.disableSlide(slide.index);
                }
              });
              result = this.enableGroupOfSlides(group);
            }

            return result;
          };

          _proto45.jump = function jump(direction, whoUse, fast, cIndex) {
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

          _proto45.checkLoop = function checkLoop(index) {
            var _this163 = this;

            if (this.arrows) {
              var l = this.enabledIndexesOfSlides.filter(function (indexSlide) {
                return !_this163.slides[indexSlide].isSelectorPinned() && _this163.slides[indexSlide].isSlideAvailable();
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

          _proto45.createFullscreenButton = function createFullscreenButton() {
            var _this164 = this;

            if (!this.option(FULLSCREEN + '.enable') || this.fullscreenButton) {
              return;
            }

            this.fullscreenButton = $J.$new('div').addClass(CSS_MAIN_CLASS + '-button').addClass(CSS_MAIN_CLASS + '-button-' + FULLSCREEN).addClass(STANDARD_BUTTON_CLASS);
            this.fullscreenButton.append($J.$new('div').addClass(CSS_MAIN_CLASS + '-icon'));
            this.disableFullscreenButton();
            this.hideFullscreenButton();
            this.fullscreenButton.addEvent('btnclick tap', function (e) {
              e.stop();

              if (_this164.isFullscreen === globalVariables.FULLSCREEN.CLOSED || _this164.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
                _this164.disableFullscreenButton();

                _this164.hideFullscreenButton();

                if (_this164.isFullscreen === globalVariables.FULLSCREEN.CLOSED) {
                  _this164.enterFullScreen();
                } else {
                  _this164.exitFullScreen();
                }
              }
            });
            this.controlsWrapper.append(this.fullscreenButton);

            if (this.slides[this.index].isSlideReady()) {
              setTimeout(function () {
                if (!_this164.slides[_this164.index].isVideoSlide() || _this164.isFullscreenState()) {
                  _this164.enableFullscreenButton();

                  _this164.visibleFullscreenButton();
                }
              }, 0);
            }
          };

          _proto45.visibleFullscreenButton = function visibleFullscreenButton() {
            if (this.fullscreenButton) {
              this.fullscreenButton.removeClass(FULLSCREEN_BUTTON_HIDE_CLASS);
            }
          };

          _proto45.hideFullscreenButton = function hideFullscreenButton() {
            if (this.fullscreenButton) {
              this.fullscreenButton.addClass(FULLSCREEN_BUTTON_HIDE_CLASS);
            }
          };

          _proto45.enableFullscreenButton = function enableFullscreenButton() {
            if (this.fullscreenButton) {
              this.fullscreenButton.removeAttr('disabled');
            }
          };

          _proto45.disableFullscreenButton = function disableFullscreenButton() {
            if (this.fullscreenButton) {
              this.fullscreenButton.attr('disabled', 'disabled');
            }
          };

          _proto45.createEffect = function createEffect() {
            var _this165 = this;

            this.effect = new Effect({
              time: this.option('slide.animation.duration'),
              orientation: this.option('orientation')
            });
            this.effect.setParent(this);
            this.on('effectStart', function (e) {
              e.stopAll();
              _this165.isMoving = true;

              _this165.disableFullscreenButton();

              if (_this165.slides[e.indexes[1]].isVideoSlide() && _this165.isFullscreen !== globalVariables.FULLSCREEN.OPENED) {
                _this165.hideFullscreenButton();
              }

              _this165.slides[e.indexes[0]].beforeHide();

              _this165.slides[e.indexes[1]].beforeShow();

              if (e.data.callbackData.whoUse !== 4) {
                _this165.sendEvent('beforeSlideIn', {
                  slide: _this165.slides[e.indexes[1]].getData()
                });

                _this165.sendEvent('beforeSlideOut', {
                  slide: _this165.slides[e.indexes[0]].getData()
                });
              }
            });
            this.on('effectEnd', function (e) {
              e.stopAll();

              if (!_this165.slides[e.indexes[1]].isVideoSlide() || _this165.isFullscreen === globalVariables.FULLSCREEN.OPENED) {
                _this165.enableFullscreenButton();

                _this165.visibleFullscreenButton();
              }

              _this165.slides[e.indexes[0]].afterHide();

              _this165.slides[e.indexes[1]].afterShow(e.data.callbackData.whoUse);

              if (e.data.callbackData.whoUse !== 4) {
                _this165.sendEvent('afterSlideIn', {
                  slide: _this165.slides[e.indexes[1]].getData()
                });

                _this165.sendEvent('afterSlideOut', {
                  slide: _this165.slides[e.indexes[0]].getData()
                });
              }

              _this165.autoplay();

              _this165.isMoving = false;
              _this165.residualAutoplayTime = _this165.autoplayDelay;
            });
          };

          _proto45.createArrows = function createArrows() {
            var _this166 = this;

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

              var index = _this166.getNextIndex(e.data.type, _this166.index, _this166.slides.length, _this166.option('loop'));

              _this166.jump(index, 2);
            });
            this.arrows.getNodes().forEach(function (node) {
              _this166.controlsWrapper.append(node);
            });
          };

          _proto45.getNextIndex = function getNextIndex(direction, index, length, loop) {
            var resultIndex = helper.sliderLib.findIndex(direction, index, length, loop);
            var result = resultIndex;

            if (resultIndex !== null && resultIndex !== this.index && (this.slides[resultIndex].isSelectorPinned() || !this.slides[resultIndex].isSlideAvailable() || !this.slides[resultIndex].isEnabled())) {
              result = this.getNextIndex(direction, resultIndex, length, loop);
            }

            return result;
          };

          _proto45.isHiddenSlides = function isHiddenSlides() {
            return !this.slides.some(function (slide) {
              return !slide.isCustomSelector() || slide.isCustomSelector() && slide.isSlideAvailable();
            });
          };

          _proto45.createSelectors = function createSelectors() {
            var _this167 = this;

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
              _this167.isSelectorsReady = true;

              _this167.postInitialization();
            });
            this.on('getSelectorProportion', function (e) {
              e.stopAll();

              var index = _this167.getSlideByUUID(e.data.UUID);

              if (index !== null) {
                var slide = _this167.slides[index];

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

                    _this167.pickOut(err.UUID);

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

              var index = _this167.getSlideByUUID(e.data.UUID);

              if (index !== null) {
                var slide = _this167.slides[index];

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

              var index = _this167.getSlideByUUID(e.data.UUID);

              if (index !== null) {
                var _tmp = _this167.option(FULLSCREEN + '.enable') && _this167.option(FULLSCREEN + '.always');

                if (_this167.slides[index].isCustomSelector()) {
                  _this167.sendEvent('thumbnailClick', {
                    slide: _this167.slides[index].getData()
                  });
                }

                _this167.jump(index, 2, _tmp);

                if (_tmp) {
                  _this167.enterFullScreen();
                }
              }
            });
            this.on('visibility', function (e) {
              e.stop();

              switch (e.action) {
                case 'show':
                  _this167.movingContainer.removeClass(CSS_MAIN_CLASS + '-selectors-closed');

                  break;

                case 'hide':
                  _this167.movingContainer.addClass(CSS_MAIN_CLASS + '-selectors-closed');

                  break;
                // no default
              }
            });
            this.on('selectorsDone', function (e) {
              e.stopAll();

              if ($J.contains(['left', 'right'], _this167.selectors.getCurrentStylePosition())) {
                _this167.onResize();
              }
            });
            this.selectorsWrapper.append(this.selectors.getNode());
            this.slides.forEach(function (slide, index) {
              if (!slide.isEnabled()) {
                _this167.selectors.disableSelector(slide.getUUID());
              }
            });
            this.showHideSelectors(true);
          };

          _proto45.findSlide = function findSlide() {
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

          _proto45.canPinSlide = function canPinSlide(node) {
            var side = Slide.findPinnedSelectorSide(node);
            var pinnedSlides = this.slides.filter(function (slide) {
              return slide.getPinnedSelectorSide() === side;
            });

            if (pinnedSlides.length < 3) {
              return true;
            }

            return false;
          };

          _proto45.getSlideByUUID = function getSlideByUUID(uuid) {
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

          _proto45.pickOut = function pickOut(uuid) {
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

          _proto45.getSlides = function getSlides(fromFindSlide) {
            var _this168 = this;

            var slides;

            if (fromFindSlide) {
              slides = $J.$A(this.instanceNode.node.childNodes);
            } else {
              slides = $J.$A(this.instanceNode.node.childNodes).filter(function (slide) {
                var result = false;

                _this168.sliderNodes.push(slide.cloneNode(true));

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
              var result = callback(_this168.id, fs);

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

          _proto45.createSlides = function createSlides(slides) {
            var _this169 = this;

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

                var _slide = new Slide(slide.node, index, _this169.slideOptions);

                _slide.setParent(_this169);

                _this169.slides.push(_slide);

                if (_slide.isEnabled() && _slide.isSlideAvailable()) {
                  _this169.enabledIndexesOfSlides.push(index);
                }

                index += 1;
              }
            });
            this.firstSlideAhead = this.enabledIndexesOfSlides.length > MAX_SLIDES_TO_CHANGE_PRELOAD_BEHAVIOR;
            this.enabledIndexesOfSlides.forEach(function (slideindex, i) {
              if (!_this169.firstSlideAhead || i < MAX_SLIDES_TO_CHANGE_PRELOAD_BEHAVIOR) {
                _this169.slides[slideindex].startGettingInfo();
              }
            });

            if (this.index > this.slides.length - 1) {
              this.index = 0;
            }

            this.postInitialization();
          };

          _proto45.checkSingleSlide = function checkSingleSlide() {
            var _this170 = this;

            var isSingle = this.enabledIndexesOfSlides.length === 1;
            this.enabledIndexesOfSlides.forEach(function (index) {
              _this170.slides[index].single(isSingle);
            });
          };

          _proto45.showHideArrows = function showHideArrows() {
            if (this.arrows) {
              var visibleSlides = this.visibleSlides();

              if (visibleSlides < 2 || this.option(FULLSCREEN + '.always') && !this.isFullscreenState()) {
                this.arrows.hide();
              } else if (visibleSlides > 1 && (!this.option(FULLSCREEN + '.always') || this.isFullscreenState())) {
                this.arrows.show();
              }
            }
          };

          _proto45.canShowSelectors = function canShowSelectors(selectorCount) {
            var property = this.isFullscreen === globalVariables.FULLSCREEN.OPENED ? 'fullscreen.thumbnails.always' : 'thumbnails.always';
            return this.option(property) || selectorCount > 1;
          };

          _proto45.showHideSelectors = function showHideSelectors(force
          /* container size can be set faster than we can detect selector's visibility */
          ) {
            var _this171 = this;

            if (this.selectors) {
              if (!this.selectorsDebounce) {
                this.selectorsDebounce = helper.debounce(function () {
                  if (_this171.selectors) {
                    var canShow = _this171.canShowSelectors(_this171.enabledIndexesOfSlides.length);

                    if (canShow) {
                      if (!_this171.selectors.isSelectorsActionEnabled()) {
                        _this171.movingContainer.setCssProp('height', '100%');

                        _this171.selectorsWrapper.removeClass(CSS_MAIN_CLASS + '-hide-selectors');

                        _this171.selectors.enableActions();

                        _this171.onResize();
                      }
                    } else {
                      if (_this171.selectors.isSelectorsActionEnabled()) {
                        _this171.selectorsWrapper.addClass(CSS_MAIN_CLASS + '-hide-selectors');

                        _this171.selectors.disableActions();

                        _this171.onResize();
                      }
                    }
                  }
                }, force ? 0 : 32);
              }

              this.selectorsDebounce();
            }
          };

          _proto45.getAvailableSlideIndex = function getAvailableSlideIndex(startIndex) {
            if (startIndex === this.slides.length - 1 && !this.slides[startIndex].isSlideAvailable()) {
              return -1;
            }

            if (this.slides[startIndex + 1].isSlideAvailable()) {
              return startIndex + 1;
            }

            return this.getAvailableSlideIndex(startIndex + 1);
          };

          _proto45.addAvailableSlideNode = function addAvailableSlideNode(slide, index) {
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

          _proto45.sortItems = function sortItems(order) {
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

          _proto45.insertSlide = function insertSlide(indexOfSlide, htmlNodeSlide) {
            var _this172 = this;

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
                  _this172.controlEnabledSlides(index);
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

          _proto45.removeSlide = function removeSlide(indexOfSlide) {
            var _this173 = this;

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
                  _this173.controlEnabledSlides(index);
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
                  if (_this173.instanceNode) {
                    _this173.emit('destroy', {
                      data: {
                        id: _this173.id,
                        node: _this173.instanceNode.node
                      }
                    });
                  }
                }, 100);
              }

              return true;
            }

            return false;
          };

          _proto45.createContextMenu = function createContextMenu() {
            var _this174 = this;

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
                      _this174.slides[_this174.index].zoomIn(e.left, e.top);
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
                      _this174.slides[_this174.index].zoomOut(e.left, e.top);
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
                      _this174.enterFullScreen();
                    }
                  });
                }

                if (option('contextmenu.text.' + FULLSCREEN + '.exit')) {
                  contextmenuData.push({
                    id: 'exit' + FULLSCREEN,
                    label: option('contextmenu.text.' + FULLSCREEN + '.exit'),
                    hidden: true,
                    action: function () {
                      _this174.exitFullScreen();
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

                    var url = _this174.slides[_this174.index].getOriginImageUrl();

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

                if (_this174.contextMenu && !_this174.isMoving && _this174.enabledIndexesOfSlides.length) {
                  var item = _this174.slides[_this174.index];
                  var typeOfSlide = item.getTypeOfSlide();
                  var t = globalVariables.SLIDE.TYPES;

                  if (_this174.isReady && item.isReady && item.isSirv() && typeOfSlide) {
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

                    if (magnify && _this174.slides[_this174.index].isZoomSizeExist() && (option('contextmenu.text.zoom.in') || option('contextmenu.text.zoom.out'))) {
                      zoomData = _this174.slides[_this174.index].getZoomData();

                      _this174.contextMenu.showItem(zoomin);

                      if (zoomData.isZoomed && zoomData.zoom === 1) {
                        _this174.contextMenu.disableItem(zoomin);
                      } else {
                        _this174.contextMenu.enableItem(zoomin);
                      }

                      _this174.contextMenu.showItem(zoomout); // if (!zoomData.isZoomed || zoomData.zoom === 0) {


                      if (!zoomData.isZoomed) {
                        _this174.contextMenu.disableItem(zoomout);
                      } else {
                        _this174.contextMenu.enableItem(zoomout);
                      }

                      zoomMenu = true;
                    } else {
                      _this174.contextMenu.hideItem(zoomin);

                      _this174.contextMenu.hideItem(zoomout);
                    }

                    if (option(FULLSCREEN + '.enable')) {
                      if (_this174.isFullscreenState()) {
                        _this174.contextMenu.hideItem(enterfullscreen);

                        if (_this174.contextMenu.isExist(exitfullscreen)) {
                          _this174.contextMenu.showItem(exitfullscreen);

                          if (zoomData && zoomData.isZoomed) {
                            _this174.contextMenu.disableItem(exitfullscreen);
                          } else {
                            _this174.contextMenu.enableItem(exitfullscreen);
                          }

                          fullscreenMenu = true;
                        }
                      } else {
                        if (_this174.contextMenu.isExist(enterfullscreen)) {
                          _this174.contextMenu.showItem(enterfullscreen);

                          if (zoomData && zoomData.isZoomed) {
                            _this174.contextMenu.disableItem(enterfullscreen);
                          } else {
                            _this174.contextMenu.enableItem(enterfullscreen);
                          }

                          fullscreenMenu = true;
                        }

                        _this174.contextMenu.hideItem(exitfullscreen);
                      }
                    }

                    if (_this174.contextMenu.isExist('download') && dl) {
                      _this174.contextMenu.showItem('download');

                      downloadMenu = true;
                    } else {
                      _this174.contextMenu.hideItem('download');
                    }

                    if (zoomMenu || fullscreenMenu || downloadMenu) {
                      if ((zoomMenu || fullscreenMenu) && downloadMenu && typeOfSlide !== t.VIDEO) {
                        _this174.contextMenu.showItem('sirv-separator');
                      } else {
                        _this174.contextMenu.hideItem('sirv-separator');
                      }

                      canShow = true;

                      _this174.broadcast('stopContext');
                    }
                  }

                  _this174.contextMenu.setCanShow(canShow);
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

          _proto45.enterFullScreen = function enterFullScreen() {
            var _this175 = this;

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
                if ($J.contains([globalVariables.FULLSCREEN.CLOSED, globalVariables.FULLSCREEN.OPENING], _this175.isFullscreen)) {
                  return;
                }

                _this175.isFullscreen = globalVariables.FULLSCREEN.CLOSING;

                _this175._beforeExitFullscreen();

                _this175.broadcast('before' + _FULLSCREEN + 'Out', {
                  data: {
                    pseudo: false
                  }
                });

                _this175.onExitFullScreen();
              },
              fallback: function () {
                var rootTag = $J.D.node.getElementsByTagName('html')[0];
                $(rootTag).addClass(PSEUDO_FULLSCREEN_CLASS);
                $(document.body).getSize();
                setTimeout(function () {
                  return _this175.onEnteredFullScreen(true);
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

          _proto45.onEnteredFullScreen = function onEnteredFullScreen(pseudo) {
            var _this176 = this;

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
                  _this176.enableFullscreenButton();

                  _this176.visibleFullscreenButton();
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

          _proto45._beforeExitFullscreen = function _beforeExitFullscreen() {
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

          _proto45.exitFullScreen = function exitFullScreen() {
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

          _proto45.onExitFullScreen = function onExitFullScreen(pseudo) {
            var _this177 = this;

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
                  _this177.enableFullscreenButton();

                  _this177.visibleFullscreenButton();
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

          _proto45.getSlide = function getSlide(index) {
            var _this$slides$index;

            if (index === null || $J.typeOf(index) === 'number' && index >= this.slides.length) {
              index = this.index;
            }

            if ($J.typeOf(index) === 'string') {
              index = this.findSlideIndex(index);
            }

            return (_this$slides$index = this.slides[index]) == null ? void 0 : _this$slides$index.getData();
          };

          _proto45.onResizeWithoutSelectors = function onResizeWithoutSelectors() {
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

          _proto45.onResize = function onResize() {
            if (this.destroyed) {
              return;
            } // this.setContainerSize();


            if (this.selectors) {
              this.selectors.onResize();
            }

            this.onResizeDebounce();
          };

          _proto45.play = function play(delay) {
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

          _proto45.pause = function pause() {
            var result = this.autoplayTimer;
            this.isAutoplay = false;
            clearTimeout(this.autoplayTimer);
            this.autoplayTimer = null;
            this.residualAutoplayTime = this.autoplayDelay;
            return result === null;
          };

          _proto45.pauseAutoplay = function pauseAutoplay() {
            clearTimeout(this.autoplayTimer);
            this.autoplayTimer = null;
            this.residualAutoplayTime -= $J.now() - this.currentAutoplayTime;
          };

          _proto45.autoplay = function autoplay() {
            var _this178 = this;

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
                if (!_this178.destroyed) {
                  _this178.jump('next', globalVariables.SLIDE_SHOWN_BY.AUTOPLAY);
                }
              }, delay);
            }
          };

          _proto45.destroy = function destroy() {
            var _this179 = this;

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
              return _this179.instanceNode.append(node);
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

            _EventEmitter16.prototype.destroy.call(this);
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

        var Slider_ = /*#__PURE__*/function (_EventEmitter17) {
          "use strict";

          bHelpers.inheritsLoose(Slider_, _EventEmitter17);

          function Slider_(node, options, force, lazyInit) {
            var _this180;

            _this180 = _EventEmitter17.call(this) || this;
            _this180.node = node;
            _this180.slider = null;
            _this180.lazyInit = lazyInit;
            _this180.options = {};
            _this180.spinOptions = {};
            _this180.zoomOptions = {};
            _this180.imageOptions = {};
            _this180.videoOptions = {};
            _this180.sliderBuilder = new SliderBuilder(options, _this180.node);

            _this180.parseOptions(options);

            _this180.privateOptions = {
              common: {},
              mobile: {}
            };
            _this180.toolOptions = null;
            _this180.inViewTimer = null;
            _this180.isRun = false;
            _this180.api = {
              isReady: _this180.isReady.bind(bHelpers.assertThisInitialized(_this180)),
              // start: this.start.bind(this),
              // stop: this.stop.bind(this),
              items: _this180.items.bind(bHelpers.assertThisInitialized(_this180)),
              disableItem: _this180.disableItem.bind(bHelpers.assertThisInitialized(_this180)),
              enableItem: _this180.enableItem.bind(bHelpers.assertThisInitialized(_this180)),
              enableGroup: _this180.enableGroup.bind(bHelpers.assertThisInitialized(_this180)),
              disableGroup: _this180.disableGroup.bind(bHelpers.assertThisInitialized(_this180)),
              switchGroup: _this180.switchGroup.bind(bHelpers.assertThisInitialized(_this180)),
              insertItem: _this180.insertItem.bind(bHelpers.assertThisInitialized(_this180)),
              removeItem: _this180.removeItem.bind(bHelpers.assertThisInitialized(_this180)),
              removeAllItems: _this180.removeAllItems.bind(bHelpers.assertThisInitialized(_this180)),
              jump: _this180.jump.bind(bHelpers.assertThisInitialized(_this180)),
              itemsCount: _this180.itemsCount.bind(bHelpers.assertThisInitialized(_this180)),
              next: _this180.next.bind(bHelpers.assertThisInitialized(_this180)),
              prev: _this180.prev.bind(bHelpers.assertThisInitialized(_this180)),
              isFullscreen: _this180.isFullscreen.bind(bHelpers.assertThisInitialized(_this180)),
              fullscreen: _this180.fullscreen.bind(bHelpers.assertThisInitialized(_this180)),
              child: _this180.child.bind(bHelpers.assertThisInitialized(_this180)),
              play: _this180.play.bind(bHelpers.assertThisInitialized(_this180)),
              pause: _this180.pause.bind(bHelpers.assertThisInitialized(_this180)),
              sortItems: _this180.sortItems.bind(bHelpers.assertThisInitialized(_this180))
            };

            _this180.on('viewerPublicEvent', function (e) {
              $J.extend(e.data.slider, _this180.api);

              if (e.data.slide) {
                e.data.slide.parent = function () {
                  return _this180.api;
                };

                if (e.data.slide[e.data.slide.component]) {
                  e.data.slide[e.data.slide.component].parent = function () {
                    return e.data.slide;
                  };
                }
              }
            });

            _this180.makeOptions();

            var as = _this180.toolOptions.get('autostart');

            if (as && as !== 'off' || force) {
              _this180.run();
            }

            return _this180;
          }

          var _proto46 = Slider_.prototype;

          _proto46.parseOptions = function parseOptions(options) {
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

          _proto46.getSlideOptions = function getSlideOptions() {
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

          _proto46.makeOptions = function makeOptions() {
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

          _proto46.createSlider = function createSlider(content) {
            this.slider = new SirvSlider(this.node, {
              options: this.toolOptions,
              slideOptions: this.getSlideOptions(),
              lazyInit: this.lazyInit,
              viewerFileContent: content
            });
            this.slider.setParent(this);
            this.api.id = this.slider.id;
          };

          _proto46.run = function run(force) {
            var _this181 = this;

            this.isRun = true;
            this.sliderBuilder.getOptions().then(function (data) {
              _this181.parseOptions(data.dataOptions);

              if (force) {
                _this181.makeOptions();
              }

              if (data.content) {
                _this181.createSlider(data.content);
              } else {
                _this181.sliderBuilder.buildViewer().then(function (data2) {
                  _this181.node = data2.mainNode;

                  _this181.createSlider();
                });
              }
            }).catch(function (error) {
              // eslint-disable-next-line no-console
              console.log('Sirv: cannot get view from ' + error.error);
            });
            return true;
          };

          _proto46.isReady = function isReady() {
            var result = false;

            if (this.slider) {
              result = this.slider.isReady;
            }

            return result;
          };

          _proto46.isFullscreen = function isFullscreen() {
            var result = false;

            if (this.isReady()) {
              result = this.slider.isFullscreen === 2;
            }

            return result;
          };

          _proto46.startFullInit = function startFullInit(options, force, lazyInit) {
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

          _proto46.start = function start() {
            var result = false;

            if (!this.slider) {
              result = this.run(true);
            }

            return result;
          };

          _proto46.stop = function stop() {
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

          _proto46.insertItem = function insertItem(htmlSlide, indexOfSlide) {
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

          _proto46.removeItem = function removeItem(indexOfSlide) {
            var result = false;

            if (this.isReady()) {
              result = this.slider.removeSlide(indexOfSlide);
            }

            return result;
          };

          _proto46.removeAllItems = function removeAllItems() {
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

          _proto46.itemsCount = function itemsCount(settings) {
            var result = 0;

            if (this.isReady()) {
              var items = this.items(settings);

              if (items !== null) {
                result = items.length;
              }
            }

            return result;
          };

          _proto46.items = function items(settings) {
            var _this182 = this;

            var result = null;

            if (this.isReady()) {
              result = this.slider.getItems(settings);
              result.forEach(function (item) {
                item.parent = function () {
                  return _this182.api;
                };
              });
            }

            return result;
          };

          _proto46.disableItem = function disableItem(indexOfSlide) {
            var result = false;

            if (this.isReady()) {
              result = this.slider.disableSlide(indexOfSlide);
            }

            return result;
          };

          _proto46.enableItem = function enableItem(indexOfSlide) {
            var result = false;

            if (this.isReady()) {
              result = this.slider.enableSlide(indexOfSlide);
            }

            return result;
          };

          _proto46.enableGroup = function enableGroup(group) {
            var result = false;

            if (this.isReady()) {
              result = this.slider.enableGroupOfSlides(group);
            }

            return result;
          };

          _proto46.disableGroup = function disableGroup(group) {
            var result = false;

            if (this.isReady()) {
              result = this.slider.disableGroupOfSlides(group);
            }

            return result;
          };

          _proto46.switchGroup = function switchGroup(group) {
            var result = false;

            if (this.isReady()) {
              result = this.slider.switchGroupOfSlides(group);
            }

            return result;
          };

          _proto46.jump = function jump(indexOfSlide) {
            var result = false;

            if (this.isReady()) {
              result = this.slider.jump(indexOfSlide);
            }

            return result;
          };

          _proto46.next = function next() {
            var result = false;

            if (this.isReady()) {
              result = this.slider.jump('next');
            }

            return result;
          };

          _proto46.prev = function prev() {
            var result = false;

            if (this.isReady()) {
              result = this.slider.jump('prev');
            }

            return result;
          };

          _proto46.fullscreen = function fullscreen() {
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

          _proto46.child = function child(numberOfSlide) {
            var _this183 = this;

            var result = null;

            if (this.isReady()) {
              numberOfSlide = checkArgument(numberOfSlide);
              result = this.slider.getSlide(numberOfSlide);

              if (result) {
                result.parent = function () {
                  return _this183.api;
                };
              }
            }

            return result;
          };

          _proto46.play = function play(delay) {
            var result = false;

            if (this.isReady()) {
              result = this.slider.play(delay);
            }

            return result;
          };

          _proto46.pause = function pause() {
            var result = false;

            if (this.isReady()) {
              result = this.slider.pause();
            }

            return result;
          };

          _proto46.sortItems = function sortItems(order) {
            if (this.isReady()) {
              this.slider.sortItems(order);
            }
          };

          _proto46.isEqual = function isEqual(node) {
            return node === this.node;
          };

          _proto46.checkReadiness = function checkReadiness(eventname, component) {
            var result = false;

            if (this.isReady()) {
              result = this.slider.checkReadiness(eventname, component);
            }

            return result;
          };

          _proto46.sendEvent = function sendEvent(eventname, component) {
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
    /* eslint-env es6 */

    /* global sirvRequirejs */

    /* global isLazyImage */

    /* global SIRV_ASSETS_URL */

    /* global SIRV_BASE_URL */

    /* global SIRV_HTTP_PROTOCOL */

    /* global sirvDeps */

    /* eslint-disable indent */

    /* eslint no-template-curly-in-string: "off" */

    /* eslint-disable dot-notation */

    /* eslint-disable no-use-before-define */

    /* eslint-disable no-lonely-if */

    /* eslint-disable no-case-declarations */

    /* eslint-disable no-global-assign */

    var w = window;
    var _Sirv = {
      items: {},
      eventManager: null,
      options: {}
    };

    sirvRequirejs.require(['globalVariables'], function (globalVariables) {
      globalVariables.SIRV_ASSETS_URL = SIRV_ASSETS_URL;
      globalVariables.SIRV_BASE_URL = SIRV_BASE_URL;
      globalVariables.SIRV_HTTP_PROTOCOL = SIRV_HTTP_PROTOCOL;
    });

    var waitModules = function () {
      var allCallbacks = [];

      var result = function (callback) {
        if (_Sirv.start) {
          callback();
        } else {
          allCallbacks.push(callback);
        }
      };

      result.start = function () {
        while (allCallbacks.length) {
          allCallbacks.shift()();
        }
      };

      return result;
    }();

    var baseModules = ['bHelpers', 'magicJS', 'globalVariables', 'globalFunctions', 'EventManager', 'helper', 'Slider'];

    if (isLazyImage) {
      baseModules.push('LazyImage');
    }

    sirvRequirejs.require(baseModules, function (bHelpers, magicJS, globalVariables, globalFunctions, EventManager, helper, Slider, LazyImage
    /* that 'LazyImage' argument must be last */
    ) {
      var $J = magicJS; // eslint-disable-next-line

      var $ = $J.$;

      var getQuerySelector = function (qSelector, context) {
        var result = qSelector;

        if ($J.typeOf(result) === 'string') {
          result = (context || document).querySelector(result);
        }

        return $J.$(result);
      };

      var findSirvItem = function (qSelector, type, context) {
        var t = [];
        var a = null;
        var storage = _Sirv.items[type];

        if (storage.length && qSelector) {
          a = getQuerySelector(qSelector, context);

          if (a) {
            t = storage.filter(function (_) {
              // return _.isEqual(a); // TODO ?????
              return _.node === a;
            });
          }
        }

        return t.length ? t[0] : null;
      };

      var getShadowDOM = function (node) {
        var result = false;
        var parent = node.parentNode;

        if (parent) {
          if (parent instanceof ShadowRoot) {
            result = parent;
          } else {
            result = getShadowDOM(parent);
          }
        }

        return result;
      };

      var getNodes = function (qSelectorAll, from) {
        var result;

        if (!from) {
          from = document;
        }

        if ($J.typeOf(qSelectorAll) === 'collection') {
          result = qSelectorAll;
        } else if ($J.typeOf(qSelectorAll) === 'element' || $J.typeOf(qSelectorAll) === 'magicjs-element') {
          result = [qSelectorAll];
        } else {
          // shadow dom is not magicjs element
          result = $J.$A(($J.$(from).node || from).querySelectorAll(qSelectorAll || '.Sirv')); // result = result.concat(getSirvShadowDOM(qSelectorAll || '.Sirv'));
        }

        return result;
      };

      var getTypeOfView = function (node) {
        var result = null; // let tmp;

        node = $J.$(node);

        if (node.hasClass('Sirv')) {
          if (node.getTagName() === 'img' || node.attr('data-bg-src') || node.getCss('background-image') && node.getCss('background-image') !== 'none') {
            result = 'image';
          } else {
            // tmp = node.attr('data-effect');
            // if (tmp) {
            //     result = tmp;
            // } else {
            //     tmp = node.attr('data-src');
            //     if (tmp) {
            //         result = 'spin';
            //     } else {
            //         result = 'viewer';
            //     }
            // }
            // if (node.attr('data-effect') || node.attr('data-src')) {
            result = 'viewer'; // }
          }
        }

        return result;
      };

      var stopLaunching = function (options, type) {
        var result = false;
        var currentType = type;

        if (currentType === 'image') {
          currentType = 'lazyImage';
        }

        if (options.common[currentType] && (options.common[currentType].autostart === false || $J.contains(['false', 'off'], options.common[currentType].autostart))) {
          result = true;
        }

        if (!result && $J.browser.touchScreen && $J.browser.mobile) {
          if (options.mobile[currentType] && (options.mobile[currentType].autostart === false || $J.contains(['false', 'off'], options.mobile[currentType].autostart))) {
            result = true;
          }
        }

        return result;
      };

      _Sirv.items.image = [];
      _Sirv.items.viewer = [];

      _Sirv.start = function (qSelectorAll, context, typeOfComponent, force) {
        var effect = null;
        var type;
        var lazyInit = false;

        if ($J.typeOf(qSelectorAll) === 'boolean') {
          lazyInit = qSelectorAll;
          qSelectorAll = undefined;
        }

        $J.$A(getNodes(qSelectorAll, context)).forEach(function (node) {
          var magicNode = $J.$(node);

          if (node && magicNode.hasClass('Sirv')) {
            type = getTypeOfView(magicNode.node);

            if (typeOfComponent) {
              if (typeOfComponent !== type) {
                type = null;
              }
            }

            _Sirv.options.common = helper.deepExtend({}, $J.W.node['SirvOptions'] || {});
            _Sirv.options.mobile = helper.deepExtend({}, $J.W.node['SirvMobileOptions'] || {});

            if (type) {
              if ($J.contains(['image', 'viewer'], type)) {
                if (!force && stopLaunching(_Sirv.options, type)) {
                  return;
                }

                effect = findSirvItem(magicNode.node, type);

                if (effect) {
                  effect.startFullInit($J.extend({}, _Sirv.options), force, lazyInit);
                } else {
                  switch (type) {
                    case 'image':
                      if (isLazyImage) {
                        globalFunctions.rootDOM.attachNode(node);
                        globalFunctions.rootDOM.resetGlobalCSS(node);
                        effect = new LazyImage(magicNode.node, {
                          options: {
                            common: helper.deepExtend({}, _Sirv.options.common.lazyImage || {}),
                            mobile: helper.deepExtend({}, _Sirv.options.mobile.lazyImage || {})
                          }
                        }, force); // if inline autostart option is not false

                        if (effect.isRun) {
                          _Sirv.items.image.push(effect);

                          effect.setParent(_Sirv.eventManager);
                        } else {
                          globalFunctions.rootDOM.detachNode(node);
                        }
                      } else {
                        console.info('Sirv: Image component wasn\'t found.');
                      }

                      break;

                    case 'viewer':
                      globalFunctions.rootDOM.attachNode(node);
                      globalFunctions.rootDOM.addMainStyle(node);
                      effect = new Slider(magicNode, $J.extend({}, _Sirv.options), force, lazyInit); // if inline autostart option is not false or off

                      if (effect.isRun) {
                        _Sirv.items.viewer.push(effect);

                        effect.setParent(_Sirv.eventManager);
                      } else {
                        globalFunctions.rootDOM.detachNode(node);
                      }

                      break;
                    // no default
                  }
                }
              }
            }
          }
        });
      };

      _Sirv.stop = function (qSelectorAll, context, typeOfComponent) {
        var types = ['image', 'viewer'];

        if (typeOfComponent) {
          types = [typeOfComponent];
        }

        types.forEach(function (type) {
          if (qSelectorAll || context) {
            $J.$A(getNodes(qSelectorAll, context)).forEach(function (node) {
              var item = findSirvItem(node, type);

              if (item && item.stop()) {
                _Sirv.items[type].splice(_Sirv.items[type].indexOf(item), 1);
              }
            });
          } else {
            _Sirv.items[type] = _Sirv.items[type].filter(function (_item) {
              return !_item.stop(true);
            });
          }
        });
      };

      _Sirv.getInstance = function (qSelector, type, context) {
        var inst = findSirvItem(qSelector, type, context);
        return inst ? inst.api : inst;
      };

      _Sirv.eventManager = new EventManager(_Sirv.items);

      _Sirv.addFilterCallback = function (callback, first) {
        if (first) {
          globalFunctions.viewerFilters.unshift(callback);
        } else {
          globalFunctions.viewerFilters.push(callback);
        }
      };

      _Sirv.removeFilterCallback = function (callback) {
        var newArray = [];
        globalFunctions.viewerFilters.forEach(function (cb) {
          if (cb !== callback) {
            newArray.push(cb);
          }
        });
        globalFunctions.viewerFilters = newArray;
      };

      _Sirv.removeAllFilterCallback = function () {
        globalFunctions.viewerFilters = [];
      };

      globalFunctions.stop = function (node, viewer) {
        return _Sirv.stop(node, null, viewer);
      };
      /**
       * Observe DOM changes; automatically start newly added .Sirv instances and stop removed ones.
       * @return
       */


      var observeDOM = function () {
        var notChild = function (node) {
          var result = false;

          if (node.closest) {
            result = !node.closest('div.Sirv');
          } else {
            result = $J.browser.engine === 'trident';
          }

          return result;
        };

        var domChanges = {
          added: [],
          removed: []
        };
        var processDOMChanges = helper.debounce(function () {
          var added = domChanges.added.splice(0);
          var removed = domChanges.removed.splice(0); // Process added nodes

          added.forEach(function (node) {
            node = $J.$(node);

            if (node.node && node.node.nodeType !== 3 && node.node.nodeType !== 8 && node.node.getElementsByClassName) {
              if (node.hasClass('Sirv')) {
                _Sirv.start(node, null, getTypeOfView(node));
              } else if (globalFunctions.rootDOM.rootContains(node.node) && notChild(node.node)) {
                _Sirv.start(null, node);
              }
            }
          }); // Process removed nodes

          var removedInstances = [];
          removed.forEach(function (node) {
            node = $J.$(node);

            if (node.node && node.node.nodeType !== 3 && node.node.nodeType !== 8 && node.node.getElementsByClassName) {
              if (node.hasClass('Sirv')) {
                removedInstances.push(node);
              } else {
                [].push.apply(removedInstances, node.node.getElementsByClassName('Sirv'));
              }
            }

            removedInstances.forEach(function (_node) {
              _node = $J.$(_node);

              if (!$J.D.node.body.contains(_node.node)) {
                try {
                  _Sirv.stop(_node, null, getTypeOfView(_node));
                } catch (ex) {
                  /* empty */
                }
              }
            });
          });
        }, 250); // eslint-disable-next-line

        var collectDOMChanges = function (mutations, observer) {
          for (var i = 0, l = mutations.length; i < l; i++) {
            if (mutations[i].type === 'childList') {
              [].push.apply(domChanges.added, mutations[i].addedNodes);
              [].push.apply(domChanges.removed, mutations[i].removedNodes);
            }
          }

          processDOMChanges();
        };

        if ($J.W.node.MutationObserver) {
          new MutationObserver(collectDOMChanges).observe($J.D.node.body, {
            childList: true,
            subtree: true,
            attributes: false
          });
        }
      };

      globalFunctions.rootDOM.resetGlobalCSS();
      globalFunctions.iconsHash.make();

      if ($J.D.node.readyState === 'loading') {
        _Sirv.start(true);
      }

      $J.D.addEvent('domready', function () {
        _Sirv.start();

        observeDOM(globalFunctions);
      });
      waitModules.start();
    });

    var sayDeprecated = function (apiName) {
      console.log('sirv.js: The method Sirv' + apiName + '.refresh() is deprecated. \r\n         Use Sirv' + apiName + '.stop() and Sirv' + apiName + '.start() instead.');
    };

    w.Sirv.version = '[[SirvJS_version]]';
    w.Sirv.build = '[[build_datetime]]';
    w.Sirv.options = {}; // w.Sirv.magicJS = null;

    w.Sirv.lazyimage = {
      start: function (qSelectorAll, context) {
        waitModules(function () {
          _Sirv.start(qSelectorAll, context, 'image', true);
        });
      },
      stop: function (qSelectorAll, context) {
        waitModules(function () {
          _Sirv.stop(qSelectorAll, context, 'image');
        });
      },
      getInstance: function (qSelector, context) {
        var result = null;

        if (_Sirv.getInstance) {
          result = _Sirv.getInstance(qSelector, 'image', context);
        }

        return result;
      },
      refresh: function () {
        sayDeprecated('.image');
      },
      on: function (nameOfEvent, callback) {
        return w.Sirv.on(nameOfEvent, callback);
      },
      off: function (nameOfEvent, callback) {
        return w.Sirv.off(nameOfEvent, callback);
      }
    };
    w.Sirv.viewer = {
      start: function (qSelectorAll, context) {
        waitModules(function () {
          _Sirv.start(qSelectorAll, context, 'viewer', true);
        });
      },
      stop: function (qSelectorAll, context) {
        waitModules(function () {
          _Sirv.stop(qSelectorAll, context, 'viewer');
        });
      },
      getInstance: function (qSelector, context) {
        var result = null;

        if (_Sirv.getInstance) {
          result = _Sirv.getInstance(qSelector, 'viewer', context);
        }

        return result;
      },
      refresh: function () {
        sayDeprecated('.viewer');
      },
      on: function (nameOfEvent, callback) {
        return w.Sirv.on(nameOfEvent, callback);
      },
      off: function (nameOfEvent, callback) {
        return w.Sirv.off(nameOfEvent, callback);
      },
      filters: {
        add: function (callback, first) {
          if (_Sirv.addFilterCallback) {
            _Sirv.addFilterCallback(callback, first);
          } else {
            waitModules(function () {
              _Sirv.addFilterCallback(callback, first);
            });
          }
        },
        remove: function (callback) {
          if (_Sirv.removeFilterCallback) {
            _Sirv.removeFilterCallback(callback);
          } else {
            waitModules(function () {
              _Sirv.removeFilterCallback(callback);
            });
          }
        },
        removeAll: function () {
          if (_Sirv.removeAllFilterCallback) {
            _Sirv.removeAllFilterCallback();
          } else {
            waitModules(function () {
              _Sirv.removeAllFilterCallback();
            });
          }
        }
      }
    };

    w.Sirv.start = function (qSelectorAll, context) {
      waitModules(function () {
        _Sirv.start(qSelectorAll, context, null, true);
      });
    };

    w.Sirv.stop = function (qSelectorAll, context) {
      waitModules(function () {
        _Sirv.stop(qSelectorAll, context);
      });
    };

    w.Sirv.getInstance = function (qSelector, type, context) {
      var instance = null;

      if (_Sirv.getInstance) {
        if (type === 'viewer') {
          instance = w.Sirv.viewer.getInstance(qSelector, context);
        } else if (type === 'lazyimage') {
          instance = w.Sirv.lazyimage.getInstance(qSelector, context);
        } else {
          instance = w.Sirv.viewer.getInstance(qSelector, context);
        }
      }

      return instance;
    };

    w.Sirv.refresh = function () {
      sayDeprecated('');
    };

    w.Sirv.on = function (nameOfEvent, callback) {
      var result = null;

      if (_Sirv.eventManager) {
        result = _Sirv.eventManager.addEvent(nameOfEvent, callback);
      } else {
        result = function () {
          var state = 1;

          var cb = function () {
            return true;
          };

          waitModules(function () {
            if (state) {
              cb = _Sirv.eventManager.addEvent(nameOfEvent, callback);
            }
          });
          return function () {
            state = 0;
            return cb();
          };
        }();
      }

      return result;
    };

    w.Sirv.off = function (nameOfEvent, callback) {
      var result = null;

      if (_Sirv.eventManager) {
        result = _Sirv.eventManager.removeEvent(nameOfEvent, callback);
      } else {
        result = function () {
          var state = 1;

          var cb = function () {
            return true;
          };

          waitModules(function () {
            if (state) {
              cb = _Sirv.eventManager.removeEvent(nameOfEvent, callback);
            }
          });
          return function () {
            state = 0;
            return cb();
          };
        }();
      }

      return result;
    };

    w.Sirv.whenReady = function (callback) {
      waitModules(callback);
    };

    w.Sirv.whenLoaded = function (callback) {
      sirvRequirejs.require(sirvDeps, function () {
        callback();
      });
    };
  })();
}
//# sourceMappingURL=sirv.light.js.map
