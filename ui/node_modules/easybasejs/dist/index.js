function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

function _interopNamespace(e) {
  if (e && e.__esModule) { return e; } else {
    var n = {};
    if (e) {
      Object.keys(e).forEach(function (k) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      });
    }
    n['default'] = e;
    return n;
  }
}

var fetch = _interopDefault(require('cross-fetch'));
var deepEqual = _interopDefault(require('fast-deep-equal'));
var easyqb = _interopDefault(require('easyqb'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var POST_TYPES;

(function (POST_TYPES) {
  POST_TYPES["UPLOAD_ATTACHMENT"] = "upload_attachment";
  POST_TYPES["HANDSHAKE"] = "handshake";
  POST_TYPES["VALID_TOKEN"] = "valid_token";
  POST_TYPES["GET_FRAME"] = "get_frame";
  POST_TYPES["TABLE_SIZE"] = "table_size";
  POST_TYPES["COLUMN_TYPES"] = "column_types";
  POST_TYPES["SYNC_STACK"] = "sync_stack";
  POST_TYPES["SYNC_DELETE"] = "sync_delete";
  POST_TYPES["SYNC_INSERT"] = "sync_insert";
  POST_TYPES["GET_QUERY"] = "get_query";
  POST_TYPES["USER_ATTRIBUTES"] = "user_attributes";
  POST_TYPES["SET_ATTRIBUTE"] = "set_attribute";
  POST_TYPES["SIGN_UP"] = "sign_up";
  POST_TYPES["REQUEST_TOKEN"] = "request_token";
  POST_TYPES["EASY_QB"] = "easyqb";
  POST_TYPES["RESET_PASSWORD"] = "reset_password";
  POST_TYPES["FORGOT_PASSWORD_SEND"] = "forgot_password_send";
  POST_TYPES["FORGOT_PASSWORD_CONFIRM"] = "forgot_password_confirm";
})(POST_TYPES || (POST_TYPES = {}));

var DB_STATUS;

(function (DB_STATUS) {
  DB_STATUS["ERROR"] = "error";
  DB_STATUS["PENDING"] = "pending";
  DB_STATUS["SUCCESS"] = "success";
})(DB_STATUS || (DB_STATUS = {}));

var EXECUTE_COUNT;

(function (EXECUTE_COUNT) {
  EXECUTE_COUNT["ALL"] = "all";
  EXECUTE_COUNT["ONE"] = "one";
})(EXECUTE_COUNT || (EXECUTE_COUNT = {}));

var GlobalNamespace;

(function (GlobalNamespace) {})(GlobalNamespace || (GlobalNamespace = {}));

var _g = _extends({}, GlobalNamespace);
function gFactory(_ref) {
  var ebconfig = _ref.ebconfig,
      options = _ref.options;

  var optionsObj = _extends({}, options); // Forces undefined to empty object


  var gaTrackingObj = options ? options.googleAnalyticsEventTracking : {};
  var defaultG = {
    options: optionsObj,
    ebconfig: ebconfig,
    GA_USER_ID_SALT: "m83WnAPrq",
    analyticsEventsToTrack: _extends({
      login: true,
      sign_up: true,
      forgot_password: true,
      forgot_password_confirm: true,
      reset_user_password: true
    }, gaTrackingObj)
  };
  return _extends({}, GlobalNamespace, defaultG);
}

var _propertiesBluePrint;

var INSERT = 'insert',
    UPDATE = 'update',
    DELETE = 'delete',
    REVERSE = 'reverse',
    SHUFFLE = 'shuffle',
    oMetaKey = Symbol('observable-meta-key'),
    validObservableOptionKeys = {
  async: 1
},
    validObserverOptionKeys = {
  path: 1,
  pathsOf: 1,
  pathsFrom: 1
},
    processObserveOptions = function processObserveOptions(options) {
  var result = {};

  if (options.path !== undefined) {
    if (typeof options.path !== 'string' || options.path === '') {
      throw new Error('"path" option, if/when provided, MUST be a non-empty string');
    }

    result.path = options.path;
  }

  if (options.pathsOf !== undefined) {
    if (options.path) {
      throw new Error('"pathsOf" option MAY NOT be specified together with "path" option');
    }

    if (typeof options.pathsOf !== 'string') {
      throw new Error('"pathsOf" option, if/when provided, MUST be a string (MAY be empty)');
    }

    result.pathsOf = options.pathsOf.split('.').filter(function (n) {
      return n;
    });
  }

  if (options.pathsFrom !== undefined) {
    if (options.path || options.pathsOf) {
      throw new Error('"pathsFrom" option MAY NOT be specified together with "path"/"pathsOf"  option/s');
    }

    if (typeof options.pathsFrom !== 'string' || options.pathsFrom === '') {
      throw new Error('"pathsFrom" option, if/when provided, MUST be a non-empty string');
    }

    result.pathsFrom = options.pathsFrom;
  }

  var invalidOptions = Object.keys(options).filter(function (option) {
    return !validObserverOptionKeys.hasOwnProperty(option);
  });

  if (invalidOptions.length) {
    throw new Error("'" + invalidOptions.join(', ') + "' is/are not a valid observer option/s");
  }

  return result;
},
    observe = function observe(observer, options) {
  if (typeof observer !== 'function') {
    throw new Error("observer MUST be a function, got '" + observer + "'");
  }

  var oMeta = this[oMetaKey],
      observers = oMeta.observers;

  if (!observers.some(function (o) {
    return o[0] === observer;
  })) {
    var opts;

    if (options) {
      opts = processObserveOptions(options);
    } else {
      opts = {};
    }

    observers.push([observer, opts]);
  } else {
    console.warn('observer may be bound to an observable only once; will NOT rebind');
  }
},
    unobserve = function unobserve() {
  var oMeta = this[oMetaKey];
  var observers = oMeta.observers;
  var ol = observers.length;

  if (ol) {
    var al = arguments.length;

    if (al) {
      while (al--) {
        var i = ol;

        while (i--) {
          if (observers[i][0] === arguments[al]) {
            observers.splice(i, 1);
            ol--;
          }
        }
      }
    } else {
      observers.splice(0);
    }
  }
},
    propertiesBluePrint = (_propertiesBluePrint = {}, _propertiesBluePrint[oMetaKey] = {
  value: null
}, _propertiesBluePrint.observe = {
  value: observe
}, _propertiesBluePrint.unobserve = {
  value: unobserve
}, _propertiesBluePrint),
    prepareObject = function prepareObject(source, oMeta) {
  propertiesBluePrint[oMetaKey].value = oMeta;
  var target = Object.defineProperties({}, propertiesBluePrint);

  for (var _i = 0, _Object$keys = Object.keys(source); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    target[key] = getObservedOf(source[key], key, oMeta);
  }

  return target;
},
    prepareArray = function prepareArray(source, oMeta) {
  var i = 0,
      l = source.length;
  propertiesBluePrint[oMetaKey].value = oMeta;
  var target = Object.defineProperties(new Array(l), propertiesBluePrint);

  for (; i < l; i++) {
    target[i] = getObservedOf(source[i], i, oMeta);
  }

  return target;
},
    prepareTypedArray = function prepareTypedArray(source, oMeta) {
  propertiesBluePrint[oMetaKey].value = oMeta;
  Object.defineProperties(source, propertiesBluePrint);
  return source;
},
    filterChanges = function filterChanges(options, changes) {
  var result = changes;

  if (options.path) {
    var oPath = options.path;
    result = changes.filter(function (change) {
      return change.path.join('.') === oPath;
    });
  } else if (options.pathsOf) {
    var oPathsOf = options.pathsOf;
    result = changes.filter(function (change) {
      return change.path.length === oPathsOf.length + 1 || change.path.length === oPathsOf.length && (change.type === REVERSE || change.type === SHUFFLE);
    });
  } else if (options.pathsFrom) {
    var oPathsFrom = options.pathsFrom;
    result = changes.filter(function (change) {
      return change.path.join('.').startsWith(oPathsFrom);
    });
  }

  return result;
},
    callObserverSafe = function callObserverSafe(listener, changes) {
  try {
    listener(changes);
  } catch (e) {
    console.error("failed to notify listener " + listener + " with " + changes, e);
  }
},
    callObserversFromMT = function callObserversFromMT() {
  var batches = this.batches;
  this.batches = null;

  for (var _iterator = _createForOfIteratorHelperLoose(batches), _step; !(_step = _iterator()).done;) {
    var _step$value = _step.value,
        listener = _step$value[0],
        options = _step$value[1];
    callObserverSafe(listener, options);
  }
},
    callObservers = function callObservers(oMeta, changes) {
  var currentObservable = oMeta;
  var observers, target, options, relevantChanges, i, newPath, tmp;
  var l = changes.length;

  do {
    observers = currentObservable.observers;
    i = observers.length;

    while (i--) {
      var _observers$i = observers[i];
      target = _observers$i[0];
      options = _observers$i[1];
      relevantChanges = filterChanges(options, changes);

      if (relevantChanges.length) {
        if (currentObservable.options.async) {
          //	this is the async dispatch handling
          if (!currentObservable.batches) {
            currentObservable.batches = [];
            queueMicrotask(callObserversFromMT.bind(currentObservable));
          }

          var rb = currentObservable.batches.find(function (b) {
            return b[0] === target;
          });

          if (!rb) {
            rb = [target, []];
            currentObservable.batches.push(rb);
          }

          Array.prototype.push.apply(rb[1], relevantChanges);
        } else {
          //	this is the naive straight forward synchronous dispatch
          callObserverSafe(target, relevantChanges);
        }
      }
    }

    var tmpa = void 0;

    if (currentObservable.parent) {
      tmpa = new Array(l);

      for (var _i2 = 0; _i2 < l; _i2++) {
        tmp = changes[_i2];
        newPath = [currentObservable.ownKey].concat(tmp.path);
        tmpa[_i2] = {
          type: tmp.type,
          path: newPath,
          value: tmp.value,
          oldValue: tmp.oldValue,
          object: tmp.object
        };
      }

      changes = tmpa;
      currentObservable = currentObservable.parent;
    } else {
      currentObservable = null;
    }
  } while (currentObservable);
},
    getObservedOf = function getObservedOf(item, key, parent) {
  if (!item || typeof item !== 'object') {
    return item;
  } else if (Array.isArray(item)) {
    return new ArrayOMeta({
      target: item,
      ownKey: key,
      parent: parent
    }).proxy;
  } else if (ArrayBuffer.isView(item)) {
    return new TypedArrayOMeta({
      target: item,
      ownKey: key,
      parent: parent
    }).proxy;
  } else if (item instanceof Date || item instanceof Error) {
    return item;
  } else {
    return new ObjectOMeta({
      target: item,
      ownKey: key,
      parent: parent
    }).proxy;
  }
},
    proxiedPop = function proxiedPop() {
  var oMeta = this[oMetaKey],
      target = oMeta.target,
      poppedIndex = target.length - 1;
  var popResult = target.pop();

  if (popResult && typeof popResult === 'object') {
    var tmpObserved = popResult[oMetaKey];

    if (tmpObserved) {
      popResult = tmpObserved.detach();
    }
  }

  var changes = [{
    type: DELETE,
    path: [poppedIndex],
    oldValue: popResult,
    object: this
  }];
  callObservers(oMeta, changes);
  return popResult;
},
    proxiedPush = function proxiedPush() {
  var oMeta = this[oMetaKey],
      target = oMeta.target,
      l = arguments.length,
      pushContent = new Array(l),
      initialLength = target.length;

  for (var i = 0; i < l; i++) {
    pushContent[i] = getObservedOf(arguments[i], initialLength + i, oMeta);
  }

  var pushResult = Reflect.apply(target.push, target, pushContent);
  var changes = [];

  for (var _i3 = initialLength, _l = target.length; _i3 < _l; _i3++) {
    changes[_i3 - initialLength] = {
      type: INSERT,
      path: [_i3],
      value: target[_i3],
      object: this
    };
  }

  callObservers(oMeta, changes);
  return pushResult;
},
    proxiedShift = function proxiedShift() {
  var oMeta = this[oMetaKey],
      target = oMeta.target;
  var shiftResult, i, l, item, tmpObserved;
  shiftResult = target.shift();

  if (shiftResult && typeof shiftResult === 'object') {
    tmpObserved = shiftResult[oMetaKey];

    if (tmpObserved) {
      shiftResult = tmpObserved.detach();
    }
  } //	update indices of the remaining items


  for (i = 0, l = target.length; i < l; i++) {
    item = target[i];

    if (item && typeof item === 'object') {
      tmpObserved = item[oMetaKey];

      if (tmpObserved) {
        tmpObserved.ownKey = i;
      }
    }
  }

  var changes = [{
    type: DELETE,
    path: [0],
    oldValue: shiftResult,
    object: this
  }];
  callObservers(oMeta, changes);
  return shiftResult;
},
    proxiedUnshift = function proxiedUnshift() {
  var oMeta = this[oMetaKey],
      target = oMeta.target,
      al = arguments.length,
      unshiftContent = new Array(al);

  for (var i = 0; i < al; i++) {
    unshiftContent[i] = getObservedOf(arguments[i], i, oMeta);
  }

  var unshiftResult = Reflect.apply(target.unshift, target, unshiftContent);

  for (var _i4 = 0, _l2 = target.length, item; _i4 < _l2; _i4++) {
    item = target[_i4];

    if (item && typeof item === 'object') {
      var tmpObserved = item[oMetaKey];

      if (tmpObserved) {
        tmpObserved.ownKey = _i4;
      }
    }
  } //	publish changes


  var l = unshiftContent.length;
  var changes = new Array(l);

  for (var _i5 = 0; _i5 < l; _i5++) {
    changes[_i5] = {
      type: INSERT,
      path: [_i5],
      value: target[_i5],
      object: this
    };
  }

  callObservers(oMeta, changes);
  return unshiftResult;
},
    proxiedReverse = function proxiedReverse() {
  var oMeta = this[oMetaKey],
      target = oMeta.target;
  var i, l, item;
  target.reverse();

  for (i = 0, l = target.length; i < l; i++) {
    item = target[i];

    if (item && typeof item === 'object') {
      var tmpObserved = item[oMetaKey];

      if (tmpObserved) {
        tmpObserved.ownKey = i;
      }
    }
  }

  var changes = [{
    type: REVERSE,
    path: [],
    object: this
  }];
  callObservers(oMeta, changes);
  return this;
},
    proxiedSort = function proxiedSort(comparator) {
  var oMeta = this[oMetaKey],
      target = oMeta.target;
  var i, l, item;
  target.sort(comparator);

  for (i = 0, l = target.length; i < l; i++) {
    item = target[i];

    if (item && typeof item === 'object') {
      var tmpObserved = item[oMetaKey];

      if (tmpObserved) {
        tmpObserved.ownKey = i;
      }
    }
  }

  var changes = [{
    type: SHUFFLE,
    path: [],
    object: this
  }];
  callObservers(oMeta, changes);
  return this;
},
    proxiedFill = function proxiedFill(filVal, start, end) {
  var oMeta = this[oMetaKey],
      target = oMeta.target,
      changes = [],
      tarLen = target.length,
      prev = target.slice(0);
  start = start === undefined ? 0 : start < 0 ? Math.max(tarLen + start, 0) : Math.min(start, tarLen);
  end = end === undefined ? tarLen : end < 0 ? Math.max(tarLen + end, 0) : Math.min(end, tarLen);

  if (start < tarLen && end > start) {
    target.fill(filVal, start, end);
    var tmpObserved;

    for (var i = start, item, tmpTarget; i < end; i++) {
      item = target[i];
      target[i] = getObservedOf(item, i, oMeta);

      if (prev.hasOwnProperty(i)) {
        tmpTarget = prev[i];

        if (tmpTarget && typeof tmpTarget === 'object') {
          tmpObserved = tmpTarget[oMetaKey];

          if (tmpObserved) {
            tmpTarget = tmpObserved.detach();
          }
        }

        changes.push({
          type: UPDATE,
          path: [i],
          value: target[i],
          oldValue: tmpTarget,
          object: this
        });
      } else {
        changes.push({
          type: INSERT,
          path: [i],
          value: target[i],
          object: this
        });
      }
    }

    callObservers(oMeta, changes);
  }

  return this;
},
    proxiedCopyWithin = function proxiedCopyWithin(dest, start, end) {
  var oMeta = this[oMetaKey],
      target = oMeta.target,
      tarLen = target.length;
  dest = dest < 0 ? Math.max(tarLen + dest, 0) : dest;
  start = start === undefined ? 0 : start < 0 ? Math.max(tarLen + start, 0) : Math.min(start, tarLen);
  end = end === undefined ? tarLen : end < 0 ? Math.max(tarLen + end, 0) : Math.min(end, tarLen);
  var len = Math.min(end - start, tarLen - dest);

  if (dest < tarLen && dest !== start && len > 0) {
    var prev = target.slice(0),
        changes = [];
    target.copyWithin(dest, start, end);

    for (var i = dest, nItem, oItem, tmpObserved; i < dest + len; i++) {
      //	update newly placed observables, if any
      nItem = target[i];

      if (nItem && typeof nItem === 'object') {
        nItem = getObservedOf(nItem, i, oMeta);
        target[i] = nItem;
      } //	detach overridden observables, if any


      oItem = prev[i];

      if (oItem && typeof oItem === 'object') {
        tmpObserved = oItem[oMetaKey];

        if (tmpObserved) {
          oItem = tmpObserved.detach();
        }
      }

      if (typeof nItem !== 'object' && nItem === oItem) {
        continue;
      }

      changes.push({
        type: UPDATE,
        path: [i],
        value: nItem,
        oldValue: oItem,
        object: this
      });
    }

    callObservers(oMeta, changes);
  }

  return this;
},
    proxiedSplice = function proxiedSplice() {
  var oMeta = this[oMetaKey],
      target = oMeta.target,
      splLen = arguments.length,
      spliceContent = new Array(splLen),
      tarLen = target.length; //	observify the newcomers

  for (var _i6 = 0; _i6 < splLen; _i6++) {
    spliceContent[_i6] = getObservedOf(arguments[_i6], _i6, oMeta);
  } //	calculate pointers


  var startIndex = splLen === 0 ? 0 : spliceContent[0] < 0 ? tarLen + spliceContent[0] : spliceContent[0],
      removed = splLen < 2 ? tarLen - startIndex : spliceContent[1],
      inserted = Math.max(splLen - 2, 0),
      spliceResult = Reflect.apply(target.splice, target, spliceContent),
      newTarLen = target.length; //	reindex the paths

  var tmpObserved;

  for (var _i7 = 0, _item; _i7 < newTarLen; _i7++) {
    _item = target[_i7];

    if (_item && typeof _item === 'object') {
      tmpObserved = _item[oMetaKey];

      if (tmpObserved) {
        tmpObserved.ownKey = _i7;
      }
    }
  } //	detach removed objects


  var i, l, item;

  for (i = 0, l = spliceResult.length; i < l; i++) {
    item = spliceResult[i];

    if (item && typeof item === 'object') {
      tmpObserved = item[oMetaKey];

      if (tmpObserved) {
        spliceResult[i] = tmpObserved.detach();
      }
    }
  }

  var changes = [];
  var index;

  for (index = 0; index < removed; index++) {
    if (index < inserted) {
      changes.push({
        type: UPDATE,
        path: [startIndex + index],
        value: target[startIndex + index],
        oldValue: spliceResult[index],
        object: this
      });
    } else {
      changes.push({
        type: DELETE,
        path: [startIndex + index],
        oldValue: spliceResult[index],
        object: this
      });
    }
  }

  for (; index < inserted; index++) {
    changes.push({
      type: INSERT,
      path: [startIndex + index],
      value: target[startIndex + index],
      object: this
    });
  }

  callObservers(oMeta, changes);
  return spliceResult;
},
    proxiedTypedArraySet = function proxiedTypedArraySet(source, offset) {
  var oMeta = this[oMetaKey],
      target = oMeta.target,
      souLen = source.length,
      prev = target.slice(0);
  offset = offset || 0;
  target.set(source, offset);
  var changes = new Array(souLen);

  for (var i = offset; i < souLen + offset; i++) {
    changes[i - offset] = {
      type: UPDATE,
      path: [i],
      value: target[i],
      oldValue: prev[i],
      object: this
    };
  }

  callObservers(oMeta, changes);
},
    proxiedArrayMethods = {
  pop: proxiedPop,
  push: proxiedPush,
  shift: proxiedShift,
  unshift: proxiedUnshift,
  reverse: proxiedReverse,
  sort: proxiedSort,
  fill: proxiedFill,
  copyWithin: proxiedCopyWithin,
  splice: proxiedSplice
},
    proxiedTypedArrayMethods = {
  reverse: proxiedReverse,
  sort: proxiedSort,
  fill: proxiedFill,
  copyWithin: proxiedCopyWithin,
  set: proxiedTypedArraySet
};

var OMetaBase = /*#__PURE__*/function () {
  function OMetaBase(properties, cloningFunction) {
    var target = properties.target,
        parent = properties.parent,
        ownKey = properties.ownKey;

    if (parent && ownKey !== undefined) {
      this.parent = parent;
      this.ownKey = ownKey;
    } else {
      this.parent = null;
      this.ownKey = null;
    }

    var targetClone = cloningFunction(target, this);
    this.observers = [];
    this.revocable = Proxy.revocable(targetClone, this);
    this.proxy = this.revocable.proxy;
    this.target = targetClone;
    this.options = this.processOptions(properties.options);
  }

  var _proto = OMetaBase.prototype;

  _proto.processOptions = function processOptions(options) {
    if (options) {
      if (typeof options !== 'object') {
        throw new Error("Observable options if/when provided, MAY only be an object, got '" + options + "'");
      }

      var invalidOptions = Object.keys(options).filter(function (option) {
        return !validObservableOptionKeys.hasOwnProperty(option);
      });

      if (invalidOptions.length) {
        throw new Error("'" + invalidOptions.join(', ') + "' is/are not a valid Observable option/s");
      }

      return Object.assign({}, options);
    } else {
      return {};
    }
  };

  _proto.detach = function detach() {
    this.parent = null;
    return this.target;
  };

  _proto.set = function set(target, key, value) {
    var oldValue = target[key];

    if (value !== oldValue) {
      var newValue = getObservedOf(value, key, this);
      target[key] = newValue;

      if (oldValue && typeof oldValue === 'object') {
        var tmpObserved = oldValue[oMetaKey];

        if (tmpObserved) {
          oldValue = tmpObserved.detach();
        }
      }

      var changes = oldValue === undefined ? [{
        type: INSERT,
        path: [key],
        value: newValue,
        object: this.proxy
      }] : [{
        type: UPDATE,
        path: [key],
        value: newValue,
        oldValue: oldValue,
        object: this.proxy
      }];
      callObservers(this, changes);
    }

    return true;
  };

  _proto.deleteProperty = function deleteProperty(target, key) {
    var oldValue = target[key];
    delete target[key];

    if (oldValue && typeof oldValue === 'object') {
      var tmpObserved = oldValue[oMetaKey];

      if (tmpObserved) {
        oldValue = tmpObserved.detach();
      }
    }

    var changes = [{
      type: DELETE,
      path: [key],
      oldValue: oldValue,
      object: this.proxy
    }];
    callObservers(this, changes);
    return true;
  };

  return OMetaBase;
}();

var ObjectOMeta = /*#__PURE__*/function (_OMetaBase) {
  _inheritsLoose(ObjectOMeta, _OMetaBase);

  function ObjectOMeta(properties) {
    return _OMetaBase.call(this, properties, prepareObject) || this;
  }

  return ObjectOMeta;
}(OMetaBase);

var ArrayOMeta = /*#__PURE__*/function (_OMetaBase2) {
  _inheritsLoose(ArrayOMeta, _OMetaBase2);

  function ArrayOMeta(properties) {
    return _OMetaBase2.call(this, properties, prepareArray) || this;
  }

  var _proto2 = ArrayOMeta.prototype;

  _proto2.get = function get(target, key) {
    if (proxiedArrayMethods.hasOwnProperty(key)) {
      return proxiedArrayMethods[key];
    } else {
      return target[key];
    }
  };

  return ArrayOMeta;
}(OMetaBase);

var TypedArrayOMeta = /*#__PURE__*/function (_OMetaBase3) {
  _inheritsLoose(TypedArrayOMeta, _OMetaBase3);

  function TypedArrayOMeta(properties) {
    return _OMetaBase3.call(this, properties, prepareTypedArray) || this;
  }

  var _proto3 = TypedArrayOMeta.prototype;

  _proto3.get = function get(target, key) {
    if (proxiedTypedArrayMethods.hasOwnProperty(key)) {
      return proxiedTypedArrayMethods[key];
    } else {
      return target[key];
    }
  };

  return TypedArrayOMeta;
}(OMetaBase);

var Observable = /*#__PURE__*/function () {
  function Observable() {
    throw new Error('Observable MAY NOT be created via constructor, see "Observable.from" API');
  }

  Observable.from = function from(target, options) {
    if (!target || typeof target !== 'object') {
      throw new Error('observable MAY ONLY be created from a non-null object');
    } else if (target[oMetaKey]) {
      return target;
    } else if (Array.isArray(target)) {
      return new ArrayOMeta({
        target: target,
        ownKey: null,
        parent: null,
        options: options
      }).proxy;
    } else if (ArrayBuffer.isView(target)) {
      return new TypedArrayOMeta({
        target: target,
        ownKey: null,
        parent: null,
        options: options
      }).proxy;
    } else if (target instanceof Date || target instanceof Error) {
      throw new Error(target + " found to be one of a on-observable types");
    } else {
      return new ObjectOMeta({
        target: target,
        ownKey: null,
        parent: null,
        options: options
      }).proxy;
    }
  };

  Observable.isObservable = function isObservable(input) {
    return !!(input && input[oMetaKey]);
  };

  return Observable;
}();

Object.freeze(Observable);

var imageExtensions = [
	"ase",
	"art",
	"bmp",
	"blp",
	"cd5",
	"cit",
	"cpt",
	"cr2",
	"cut",
	"dds",
	"dib",
	"djvu",
	"egt",
	"exif",
	"gif",
	"gpl",
	"grf",
	"icns",
	"heic",
	"ico",
	"iff",
	"jng",
	"jpeg",
	"jpg",
	"jfif",
	"jp2",
	"jps",
	"lbm",
	"max",
	"miff",
	"mng",
	"msp",
	"nitf",
	"ota",
	"pbm",
	"pc1",
	"pc2",
	"pc3",
	"pcf",
	"pcx",
	"pdn",
	"pgm",
	"PI1",
	"PI2",
	"PI3",
	"pict",
	"pct",
	"pnm",
	"pns",
	"ppm",
	"psb",
	"psd",
	"pdd",
	"psp",
	"px",
	"pxm",
	"pxr",
	"qfx",
	"raw",
	"rle",
	"sct",
	"sgi",
	"rgb",
	"int",
	"bw",
	"tga",
	"tiff",
	"tif",
	"vtf",
	"xbm",
	"xcf",
	"xpm",
	"3dv",
	"amf",
	"ai",
	"awg",
	"cgm",
	"cdr",
	"cmx",
	"dxf",
	"e2d",
	"egt",
	"eps",
	"fs",
	"gbr",
	"odg",
	"svg",
	"stl",
	"vrml",
	"x3d",
	"sxd",
	"v2d",
	"vnd",
	"wmf",
	"emf",
	"art",
	"xar",
	"png",
	"webp",
	"jxr",
	"hdp",
	"wdp",
	"cur",
	"ecw",
	"iff",
	"lbm",
	"liff",
	"nrrd",
	"pam",
	"pcx",
	"pgf",
	"sgi",
	"rgb",
	"rgba",
	"bw",
	"int",
	"inta",
	"sid",
	"ras",
	"sun",
	"tga"
];

var videoExtensions = [
	"3g2",
	"3gp",
	"aaf",
	"asf",
	"avchd",
	"avi",
	"drc",
	"flv",
	"m2v",
	"m4p",
	"m4v",
	"mkv",
	"mng",
	"mov",
	"mp2",
	"mp4",
	"mpe",
	"mpeg",
	"mpg",
	"mpv",
	"mxf",
	"nsv",
	"ogg",
	"ogv",
	"qt",
	"rm",
	"rmvb",
	"roq",
	"svi",
	"vob",
	"webm",
	"wmv",
	"yuv"
];

function utilsFactory(globals) {
  var g = globals || _g;

  var generateBareUrl = function generateBareUrl(type, integrationID) {
    return "https://api.easybase.io/" + type + "/" + integrationID;
  };

  var generateAuthBody = function generateAuthBody() {
    var stamp = Date.now();
    return {
      token: g.token,
      token_time: ~~(g.session / (stamp % 64)),
      now: stamp
    };
  };

  function log() {
    if (g.options.logging) {
      var _console;

      (_console = console).log.apply(_console, ["EASYBASE — "].concat([].slice.call(arguments)));
    }
  }

  return {
    generateAuthBody: generateAuthBody,
    generateBareUrl: generateBareUrl,
    log: log
  };
}

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

function authFactory(globals) {
  var g = globals || _g;

  var _utilsFactory = utilsFactory(g),
      generateBareUrl = _utilsFactory.generateBareUrl,
      generateAuthBody = _utilsFactory.generateAuthBody,
      log = _utilsFactory.log;

  function _clearTokens() {
    g.token = "";
    g.refreshToken = "";
    g.newTokenCallback();
    g.userID = undefined;
  }

  var getUserAttributes = function getUserAttributes() {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(tokenPost(POST_TYPES.USER_ATTRIBUTES)).then(function (attrsRes) {
          g.analyticsEnabled && g.analyticsEventsToTrack.get_user_attributes && g.analyticsEvent('get_user_attributes');
          return attrsRes.data;
        });
      }, function (error) {
        log(error);
        return error;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var setUserAttribute = function setUserAttribute(key, value) {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(tokenPost(POST_TYPES.SET_ATTRIBUTE, {
          key: key,
          value: value
        })).then(function (setAttrsRes) {
          g.analyticsEnabled && g.analyticsEventsToTrack.set_user_attribute && g.analyticsEvent('set_user_attribute', {
            key: key
          });
          return {
            success: setAttrsRes.success,
            message: JSON.stringify(setAttrsRes.data)
          };
        });
      }, function (error) {
        return {
          success: false,
          message: error.message || "Error",
          errorCode: error.errorCode || undefined
        };
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var forgotPassword = function forgotPassword(username, emailTemplate) {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(tokenPost(POST_TYPES.FORGOT_PASSWORD_SEND, {
          username: username,
          emailTemplate: emailTemplate
        })).then(function (setAttrsRes) {
          g.analyticsEnabled && g.analyticsEventsToTrack.forgot_password && g.analyticsEvent('forgot_password');
          return {
            success: setAttrsRes.success,
            message: setAttrsRes.data
          };
        });
      }, function (error) {
        return {
          success: false,
          message: error.message || "Error",
          errorCode: error.errorCode || undefined
        };
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var forgotPasswordConfirm = function forgotPasswordConfirm(code, username, newPassword) {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(tokenPost(POST_TYPES.FORGOT_PASSWORD_CONFIRM, {
          username: username,
          code: code,
          newPassword: newPassword
        })).then(function (setAttrsRes) {
          g.analyticsEnabled && g.analyticsEventsToTrack.forgot_password_confirm && g.analyticsEvent('forgot_password_confirm');
          return {
            success: setAttrsRes.success,
            message: setAttrsRes.data
          };
        });
      }, function (error) {
        return {
          success: false,
          message: error.message || "Error",
          errorCode: error.errorCode || undefined
        };
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var signUp = function signUp(newUserID, password, userAttributes) {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(tokenPost(POST_TYPES.SIGN_UP, {
          newUserID: newUserID,
          password: password,
          userAttributes: userAttributes
        })).then(function (signUpRes) {
          g.analyticsEnabled && g.analyticsEventsToTrack.sign_up && g.analyticsEvent('sign_up', {
            method: "Easybase"
          });
          return {
            success: signUpRes.success,
            message: signUpRes.data
          };
        });
      }, function (error) {
        return {
          success: false,
          message: error.message || "Error",
          errorCode: error.errorCode || undefined
        };
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var signIn = function signIn(userID, password) {
    try {
      var t1 = Date.now();
      g.session = Math.floor(100000000 + Math.random() * 900000000);
      var integrationType = g.ebconfig.integration.split("-")[0].toUpperCase() === "PROJECT" ? "PROJECT" : "REACT";
      return Promise.resolve(_catch(function () {
        return Promise.resolve(fetch(generateBareUrl(integrationType, g.ebconfig.integration), {
          method: "POST",
          headers: {
            'Eb-Post-Req': POST_TYPES.HANDSHAKE,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            version: g.ebconfig.version,
            session: g.session,
            instance: g.instance,
            userID: userID,
            password: password
          })
        })).then(function (res) {
          return Promise.resolve(res.json()).then(function (resData) {
            if (resData.token) {
              g.token = resData.token;
              g.refreshToken = resData.refreshToken;
              g.newTokenCallback();
              g.userID = resData.userID;
              g.mounted = true;
              return Promise.resolve(Promise.all([tokenPost(POST_TYPES.VALID_TOKEN), new Promise(function (resolve) { resolve(_interopNamespace(require('fast-sha256'))); }), new Promise(function (resolve) { resolve(_interopNamespace(require('@aws-sdk/util-utf8-browser'))); })])).then(function (_ref) {
                var validTokenRes = _ref[0],
                    hash = _ref[1].hash,
                    fromUtf8 = _ref[2].fromUtf8;
                var elapsed = Date.now() - t1;

                if (validTokenRes.success) {
                  log("Valid auth initiation in " + elapsed + "ms");

                  if (g.analyticsEnabled && g.analyticsEventsToTrack.login) {
                    var hashOut = hash(fromUtf8(g.GA_USER_ID_SALT + resData.userID));
                    var hexHash = Array.prototype.map.call(hashOut, function (x) {
                      return ('00' + x.toString(16)).slice(-2);
                    }).join('');
                    g.analyticsIdentify(hexHash);
                    g.analyticsEvent('login', {
                      method: "Easybase"
                    });
                  }

                  return {
                    success: true,
                    message: "Successfully signed in user"
                  };
                } else {
                  return {
                    success: false,
                    message: "Could not sign in user"
                  };
                }
              });
            } else {
              return {
                success: false,
                message: "Could not sign in user",
                errorCode: resData.ErrorCode || undefined
              };
            }
          });
        });
      }, function (error) {
        return {
          success: false,
          message: error.message || "Could not sign in user",
          errorCode: error.errorCode || undefined
        };
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var resetUserPassword = function resetUserPassword(currentPassword, newPassword) {
    try {
      if (typeof newPassword !== "string" || newPassword.length > 100) {
        return Promise.resolve({
          success: false,
          message: "newPassword must be of type string"
        });
      }

      if (typeof currentPassword !== "string" || currentPassword.length > 100) {
        return Promise.resolve({
          success: false,
          message: "currentPassword must be of type string"
        });
      }

      return Promise.resolve(_catch(function () {
        return Promise.resolve(tokenPost(POST_TYPES.RESET_PASSWORD, {
          currentPassword: currentPassword,
          newPassword: newPassword
        })).then(function (setAttrsRes) {
          g.analyticsEnabled && g.analyticsEventsToTrack.reset_user_password && g.analyticsEvent('reset_user_password');
          return {
            success: setAttrsRes.success,
            message: JSON.stringify(setAttrsRes.data)
          };
        });
      }, function (error) {
        return {
          success: false,
          message: error.message || "Error",
          errorCode: error.errorCode || undefined
        };
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var userID = function userID() {
    return g.userID || undefined;
  };

  var signOut = function signOut() {
    g.token = "";
    g.newTokenCallback();
    g.userID = undefined;
  };

  var initAuth = function initAuth() {
    try {
      var t1 = Date.now();
      g.session = Math.floor(100000000 + Math.random() * 900000000);
      log("Handshaking on" + g.instance + " instance");
      var integrationType = g.ebconfig.integration.split("-")[0].toUpperCase() === "PROJECT" ? "PROJECT" : "REACT";
      return Promise.resolve(_catch(function () {
        return Promise.resolve(fetch(generateBareUrl(integrationType, g.ebconfig.integration), {
          method: "POST",
          headers: {
            'Eb-Post-Req': POST_TYPES.HANDSHAKE,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            version: g.ebconfig.version,
            tt: g.ebconfig.tt,
            session: g.session,
            instance: g.instance
          })
        })).then(function (res) {
          return Promise.resolve(res.json()).then(function (resData) {
            if (resData.token) {
              g.token = resData.token;
              g.mounted = true;
              return Promise.resolve(tokenPost(POST_TYPES.VALID_TOKEN)).then(function (validTokenRes) {
                var elapsed = Date.now() - t1;

                if (validTokenRes.success) {
                  log("Valid auth initiation in " + elapsed + "ms");
                  return true;
                } else {
                  return false;
                }
              });
            } else {
              return false;
            }
          });
        });
      }, function (error) {
        console.error(error);
        return false;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var tokenPost = function tokenPost(postType, body) {
    try {
      var _temp7 = function _temp7() {
        var integrationType = g.ebconfig.integration.split("-")[0].toUpperCase() === "PROJECT" ? "PROJECT" : "REACT";
        return Promise.resolve(fetch(generateBareUrl(integrationType, g.ebconfig.integration), {
          method: "POST",
          headers: {
            'Eb-Post-Req': postType,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(_extends({
            _auth: generateAuthBody()
          }, body))
        })).then(function (res) {
          return Promise.resolve(res.json()).then(function (resData) {
            var _exit;

            if ({}.hasOwnProperty.call(resData, 'ErrorCode') || {}.hasOwnProperty.call(resData, 'code')) {
              if (resData.ErrorCode === "TokenExpired") {
                var _temp5 = function _temp5(_result) {
                  return _exit ? _result : tokenPost(postType, body);
                };

                var _temp6 = function () {
                  if (integrationType === "PROJECT") {
                    return _catch(function () {
                      return Promise.resolve(tokenPost(POST_TYPES.REQUEST_TOKEN, {
                        refreshToken: g.refreshToken,
                        token: g.token
                      })).then(function (req_res) {
                        if (req_res.success) {
                          g.token = req_res.data.token;
                          g.newTokenCallback();
                          _exit = 1;
                          return tokenPost(postType, body);
                        } else {
                          throw new Error(req_res.data || "Error");
                        }
                      });
                    }, function (error) {
                      _clearTokens();

                      _exit = 1;
                      return {
                        success: false,
                        data: error.message || error
                      };
                    });
                  } else {
                    return Promise.resolve(initAuth()).then(function () {});
                  }
                }();

                return _temp6 && _temp6.then ? _temp6.then(_temp5) : _temp5(_temp6);
              } else {
                var err = new Error(resData.body || resData.ErrorCode || resData.code || "Error");
                err.errorCode = resData.ErrorCode || resData.code;
                throw err;
              }
            } else {
              return {
                success: resData.success,
                data: resData.body
              };
            }
          });
        });
      };

      var _temp8 = function () {
        if (!g.mounted) {
          return Promise.resolve(initAuth()).then(function () {});
        }
      }();

      return Promise.resolve(_temp8 && _temp8.then ? _temp8.then(_temp7) : _temp7(_temp8));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var tokenPostAttachment = function tokenPostAttachment(formData, customHeaders) {
    try {
      var _temp15 = function _temp15() {
        var regularAuthbody = generateAuthBody();
        var attachmentAuth = {
          'Eb-token': regularAuthbody.token,
          'Eb-token-time': regularAuthbody.token_time,
          'Eb-now': regularAuthbody.now
        };
        var integrationType = g.ebconfig.integration.split("-")[0].toUpperCase() === "PROJECT" ? "PROJECT" : "REACT";
        return Promise.resolve(fetch(generateBareUrl(integrationType, g.ebconfig.integration), {
          method: "POST",
          headers: _extends({
            'Eb-Post-Req': POST_TYPES.UPLOAD_ATTACHMENT
          }, customHeaders, attachmentAuth),
          body: formData
        })).then(function (res) {
          return Promise.resolve(res.json()).then(function (resData) {
            var _exit2;

            if ({}.hasOwnProperty.call(resData, 'ErrorCode') || {}.hasOwnProperty.call(resData, 'code')) {
              if (resData.ErrorCode === "TokenExpired") {
                var _temp13 = function _temp13(_result2) {
                  return _exit2 ? _result2 : tokenPostAttachment(formData, customHeaders);
                };

                var _temp14 = function () {
                  if (integrationType === "PROJECT") {
                    return _catch(function () {
                      return Promise.resolve(tokenPost(POST_TYPES.REQUEST_TOKEN, {
                        refreshToken: g.refreshToken,
                        token: g.token
                      })).then(function (req_res) {
                        if (req_res.success) {
                          g.token = req_res.data.token;
                          g.newTokenCallback();
                          _exit2 = 1;
                          return tokenPostAttachment(formData, customHeaders);
                        } else {
                          throw new Error(req_res.data || "Error");
                        }
                      });
                    }, function (error) {
                      _clearTokens();

                      _exit2 = 1;
                      return {
                        success: false,
                        data: error.message || error
                      };
                    });
                  } else {
                    return Promise.resolve(initAuth()).then(function () {});
                  }
                }();

                return _temp14 && _temp14.then ? _temp14.then(_temp13) : _temp13(_temp14);
              } else {
                var err = new Error(resData.body || resData.ErrorCode || resData.code || "Error");
                err.errorCode = resData.ErrorCode || resData.code;
                throw err;
              }
            } else {
              return {
                success: resData.success,
                data: resData.body
              };
            }
          });
        });
      };

      var _temp16 = function () {
        if (!g.mounted) {
          return Promise.resolve(initAuth()).then(function () {});
        }
      }();

      return Promise.resolve(_temp16 && _temp16.then ? _temp16.then(_temp15) : _temp15(_temp16));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    initAuth: initAuth,
    tokenPost: tokenPost,
    tokenPostAttachment: tokenPostAttachment,
    signUp: signUp,
    setUserAttribute: setUserAttribute,
    getUserAttributes: getUserAttributes,
    signIn: signIn,
    signOut: signOut,
    resetUserPassword: resetUserPassword,
    forgotPassword: forgotPassword,
    forgotPasswordConfirm: forgotPasswordConfirm,
    userID: userID
  };
}

function tableFactory(globals) {
  var tableTypes = function tableTypes(tableName) {
    try {
      return Promise.resolve(tokenPost(POST_TYPES.COLUMN_TYPES, tableName ? {
        tableName: tableName
      } : {})).then(function (res) {
        if (res.success) {
          g.analyticsEnabled && g.analyticsEventsToTrack.table_types && g.analyticsEvent('table_types', {
            tableName: tableName || undefined
          });
          return res.data;
        } else {
          return {};
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var fullTableSize = function fullTableSize(tableName) {
    try {
      return Promise.resolve(tokenPost(POST_TYPES.TABLE_SIZE, tableName ? {
        tableName: tableName
      } : {})).then(function (res) {
        if (res.success) {
          g.analyticsEnabled && g.analyticsEventsToTrack.full_table_size && g.analyticsEvent('full_table_size', {
            tableName: tableName || undefined
          });
          return res.data;
        } else {
          return 0;
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var g = globals || _g;

  var _authFactory = authFactory(g),
      tokenPost = _authFactory.tokenPost;

  var Query = function Query(options) {
    try {
      var defaultOptions = {
        queryName: ""
      };

      var fullOptions = _extends({}, defaultOptions, options);

      return Promise.resolve(tokenPost(POST_TYPES.GET_QUERY, fullOptions)).then(function (res) {
        if (res.success) {
          g.analyticsEnabled && g.analyticsEventsToTrack.query && g.analyticsEvent('query', {
            queryName: fullOptions.queryName,
            tableName: fullOptions.tableName || undefined
          });
          return res.data;
        } else {
          return [];
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    Query: Query,
    fullTableSize: fullTableSize,
    tableTypes: tableTypes
  };
}

function _catch$1(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

function dbFactory(globals) {
  var g = globals || _g;

  var _authFactory = authFactory(g),
      tokenPost = _authFactory.tokenPost,
      tokenPostAttachment = _authFactory.tokenPostAttachment;

  var _listenerIndex = 0;
  var _listeners = {};

  function _runListeners() {
    for (var _i = 0, _Object$values = Object.values(_listeners); _i < _Object$values.length; _i++) {
      var cb = _Object$values[_i];
      cb.apply(void 0, [].slice.call(arguments));
    }
  }

  var dbEventListener = function dbEventListener(callback) {
    var currKey = '' + _listenerIndex++;
    _listeners[currKey] = callback;
    return function () {
      delete _listeners[currKey];
    };
  };

  var allCallback = function allCallback(trx, tableName, userAssociatedRecordsOnly) {
    try {
      trx.count = "all";
      trx.tableName = tableName;
      if (userAssociatedRecordsOnly) trx.userAssociatedRecordsOnly = userAssociatedRecordsOnly;

      _runListeners(DB_STATUS.PENDING, trx.type, EXECUTE_COUNT.ALL, tableName !== "untable" ? tableName : null);

      return Promise.resolve(_catch$1(function () {
        return Promise.resolve(tokenPost(POST_TYPES.EASY_QB, trx)).then(function (res) {
          if (res.success) {
            g.analyticsEnabled && g.analyticsEventsToTrack.db_all && g.analyticsEvent('db_all', {
              tableName: tableName !== "untable" ? tableName : undefined,
              type: trx.type
            });

            _runListeners(DB_STATUS.SUCCESS, trx.type, EXECUTE_COUNT.ALL, tableName !== "untable" ? tableName : null, res.data);

            return res.data;
          } else {
            _runListeners(DB_STATUS.ERROR, trx.type, EXECUTE_COUNT.ALL, tableName !== "untable" ? tableName : null);

            return res;
          }
        });
      }, function (error) {
        console.warn(error);

        _runListeners(DB_STATUS.ERROR, trx.type, EXECUTE_COUNT.ALL, tableName !== "untable" ? tableName : null);

        return [];
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var oneCallback = function oneCallback(trx, tableName, userAssociatedRecordsOnly) {
    try {
      trx.count = "one";
      trx.tableName = tableName;
      if (userAssociatedRecordsOnly) trx.userAssociatedRecordsOnly = userAssociatedRecordsOnly;

      _runListeners(DB_STATUS.PENDING, trx.type, EXECUTE_COUNT.ONE, tableName !== "untable" ? tableName : null);

      return Promise.resolve(_catch$1(function () {
        return Promise.resolve(tokenPost(POST_TYPES.EASY_QB, trx)).then(function (res) {
          if (res.success) {
            g.analyticsEnabled && g.analyticsEventsToTrack.db_one && g.analyticsEvent('db_one', {
              tableName: tableName !== "untable" ? tableName : undefined,
              type: trx.type
            });

            _runListeners(DB_STATUS.SUCCESS, trx.type, EXECUTE_COUNT.ONE, tableName !== "untable" ? tableName : null, res.data);

            return res.data;
          } else {
            _runListeners(DB_STATUS.ERROR, trx.type, EXECUTE_COUNT.ONE, tableName !== "untable" ? tableName : null);

            return res;
          }
        });
      }, function (error) {
        console.warn(error);

        _runListeners(DB_STATUS.ERROR, trx.type, EXECUTE_COUNT.ONE, tableName !== "untable" ? tableName : null);

        return {};
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var db = function db(tableName, userAssociatedRecordsOnly) {
    if (tableName && typeof tableName === "string") {
      return easyqb({
        allCallback: allCallback,
        oneCallback: oneCallback,
        userAssociatedRecordsOnly: userAssociatedRecordsOnly,
        tableName: tableName.toUpperCase()
      })(tableName.replace(/[^0-9a-zA-Z]/g, '_').toUpperCase());
    } else {
      return easyqb({
        allCallback: allCallback,
        oneCallback: oneCallback,
        userAssociatedRecordsOnly: userAssociatedRecordsOnly,
        tableName: "untable"
      })("untable");
    }
  };

  var _setAttachment = function _setAttachment(_ref) {
    var recordKey = _ref.recordKey,
        columnName = _ref.columnName,
        attachment = _ref.attachment,
        tableName = _ref.tableName,
        type = _ref.type;

    try {
      var ext = attachment.name.split(".").pop().toLowerCase();

      if (type === "image" && !imageExtensions.includes(ext)) {
        return Promise.resolve({
          success: false,
          message: "Image files must have a proper image extension in the file name"
        });
      }

      if (type === "video" && !videoExtensions.includes(ext)) {
        return Promise.resolve({
          success: false,
          message: "Video files must have a proper video extension in the file name"
        });
      }

      var formData = new FormData();
      formData.append("file", attachment);
      formData.append("name", attachment.name);
      var customHeaders = {
        'Eb-upload-type': type,
        'Eb-column-name': columnName,
        'Eb-record-id': recordKey,
        'Eb-table-name': tableName
      };
      return Promise.resolve(_catch$1(function () {
        return Promise.resolve(tokenPostAttachment(formData, customHeaders)).then(function (res) {
          if (res.success) {
            g.analyticsEnabled && g.analyticsEventsToTrack.db_one && g.analyticsEvent('db_one', {
              tableName: tableName !== "untable" ? tableName : undefined,
              type: "update"
            });

            _runListeners(DB_STATUS.SUCCESS, "update", EXECUTE_COUNT.ONE, tableName !== "untable" ? tableName : null, res.data);
          } else {
            _runListeners(DB_STATUS.ERROR, "update", EXECUTE_COUNT.ONE, tableName !== "untable" ? tableName : null);
          }

          return {
            message: res.data,
            success: res.success
          };
        });
      }, function (error) {
        console.warn(error);

        _runListeners(DB_STATUS.ERROR, "update", EXECUTE_COUNT.ONE, tableName !== "untable" ? tableName : null);

        return {
          message: "",
          success: false
        };
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var setImage = function setImage(recordKey, columnName, image, tableName) {
    try {
      return _setAttachment({
        recordKey: recordKey,
        columnName: columnName,
        tableName: tableName,
        attachment: image,
        type: "image"
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var setVideo = function setVideo(recordKey, columnName, video, tableName) {
    try {
      return _setAttachment({
        recordKey: recordKey,
        columnName: columnName,
        tableName: tableName,
        attachment: video,
        type: "video"
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var setFile = function setFile(recordKey, columnName, file, tableName) {
    try {
      return _setAttachment({
        recordKey: recordKey,
        columnName: columnName,
        tableName: tableName,
        attachment: file,
        type: "file"
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    db: db,
    dbEventListener: dbEventListener,
    e: easyqb().e,
    setImage: setImage,
    setFile: setFile,
    setVideo: setVideo
  };
}

function _catch$2(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

function EasybaseProvider(_ref) {
  var ebconfig = _ref.ebconfig,
      options = _ref.options;

  if (typeof ebconfig !== 'object' || ebconfig === null || ebconfig === undefined) {
    console.error("No ebconfig object passed. do `import ebconfig from \"./ebconfig.js\"` and pass it to the Easybase provider");
    return false;
  } else if (!ebconfig.integration) {
    console.error("Invalid ebconfig object passed. Download ebconfig.js from Easybase.io and try again.");
    return false;
  }

  var g = gFactory({
    ebconfig: ebconfig,
    options: options
  });

  var _authFactory = authFactory(g),
      tokenPost = _authFactory.tokenPost,
      tokenPostAttachment = _authFactory.tokenPostAttachment,
      signUp = _authFactory.signUp,
      setUserAttribute = _authFactory.setUserAttribute,
      getUserAttributes = _authFactory.getUserAttributes,
      signIn = _authFactory.signIn,
      signOut = _authFactory.signOut,
      resetUserPassword = _authFactory.resetUserPassword,
      forgotPassword = _authFactory.forgotPassword,
      forgotPasswordConfirm = _authFactory.forgotPasswordConfirm,
      userID = _authFactory.userID;

  var _tableFactory = tableFactory(g),
      Query = _tableFactory.Query,
      fullTableSize = _tableFactory.fullTableSize,
      tableTypes = _tableFactory.tableTypes;

  var _dbFactory = dbFactory(g),
      db = _dbFactory.db,
      dbEventListener = _dbFactory.dbEventListener,
      e = _dbFactory.e,
      setFile = _dbFactory.setFile,
      setImage = _dbFactory.setImage,
      setVideo = _dbFactory.setVideo;

  var _utilsFactory = utilsFactory(g),
      log = _utilsFactory.log; // eslint-disable-next-line dot-notation


  var isIE = typeof document !== 'undefined' && !!document['documentMode'];

  if (isIE) {
    console.error("EASYBASE — easybasejs does not support Internet Explorer. Please use a different browser.");
  }

  if (g.ebconfig.tt && g.ebconfig.integration.split("-")[0].toUpperCase() !== "PROJECT") {
    g.mounted = false;
  } else {
    g.mounted = true;
  }

  g.instance = "Node";
  var _isFrameInitialized = true;
  var _frameConfiguration = {
    offset: 0,
    limit: 0
  };
  var _observedChangeStack = [];

  var _recordIdMap = new WeakMap();

  var _observableFrame = {
    observe: function observe(_) {},
    unobserve: function unobserve() {}
  };
  var _frame = [];
  var isSyncing = false;

  function Frame(index) {
    if (typeof index === "number") {
      return _observableFrame[index];
    } else {
      return _observableFrame;
    }
  }

  var _recordIDExists = function _recordIDExists(record) {
    return !!_recordIdMap.get(record);
  };

  var configureFrame = function configureFrame(options) {
    _frameConfiguration = _extends({}, _frameConfiguration);
    if (options.limit !== undefined) _frameConfiguration.limit = options.limit;
    if (options.offset !== undefined && options.offset >= 0) _frameConfiguration.offset = options.offset;
    if (options.tableName !== undefined) _frameConfiguration.tableName = options.tableName;
    _isFrameInitialized = false;
    return {
      message: "Successfully configured frame. Run sync() for changes to be shown in frame",
      success: true
    };
  };

  var currentConfiguration = function currentConfiguration() {
    return _extends({}, _frameConfiguration);
  };

  var deleteRecord = function deleteRecord(options) {
    try {
      var _frameRecord = _frame.find(function (ele) {
        return deepEqual(ele, options.record);
      });

      if (_frameRecord && _recordIdMap.get(_frameRecord)) {
        return Promise.resolve(tokenPost(POST_TYPES.SYNC_DELETE, {
          _id: _recordIdMap.get(_frameRecord),
          tableName: options.tableName
        })).then(function (res) {
          return {
            success: res.success,
            message: res.data
          };
        });
      } else {
        return Promise.resolve(_catch$2(function () {
          return Promise.resolve(tokenPost(POST_TYPES.SYNC_DELETE, {
            record: options.record,
            tableName: options.tableName
          })).then(function (res) {
            return {
              success: res.success,
              message: res.data
            };
          });
        }, function (error) {
          console.error("Easybase Error: deleteRecord failed ", error);
          return {
            success: false,
            message: "Easybase Error: deleteRecord failed " + error,
            errorCode: error.errorCode || undefined
          };
        }));
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var addRecord = function addRecord(options) {
    try {
      var defaultValues = {
        insertAtEnd: false,
        newRecord: {},
        tableName: undefined
      };

      var fullOptions = _extends({}, defaultValues, options);

      return Promise.resolve(_catch$2(function () {
        return Promise.resolve(tokenPost(POST_TYPES.SYNC_INSERT, fullOptions)).then(function (res) {
          return {
            message: res.data,
            success: res.success
          };
        });
      }, function (error) {
        console.error("Easybase Error: addRecord failed ", error);
        return {
          message: "Easybase Error: addRecord failed " + error,
          success: false,
          errorCode: error.errorCode || undefined
        };
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }; // Only allow the deletion of one element at a time
  // First handle shifting of the array size. Then iterate


  var sync = function sync() {
    try {
      var _temp4 = function _temp4() {
        return _catch$2(function () {
          return Promise.resolve(tokenPost(POST_TYPES.GET_FRAME, _frameConfiguration)).then(function (res) {
            if (res.success === false) {
              console.error(res.data);
              isSyncing = false;
              return {
                success: false,
                message: "" + res.data
              };
            } else {
              _isFrameInitialized = true;

              _realignFrames(res.data);

              isSyncing = false;
              return {
                message: 'Success. Call frame for data',
                success: true
              };
            }
          }); // Check if the array recieved from db is the same as frame
          // If not, update it and send useFrameEffect
        }, function (error) {
          console.error("Easybase Error: get failed ", error);
          isSyncing = false;
          return {
            success: false,
            message: "Easybase Error: get failed " + error,
            errorCode: error.errorCode || undefined
          };
        });
      };

      var _realignFrames = function _realignFrames(newData) {
        var isNewDataTheSame = true;

        if (newData.length !== _frame.length) {
          isNewDataTheSame = false;
        } else {
          for (var i = 0; i < newData.length; i++) {
            var newDataNoId = _extends({}, newData[i]);

            delete newDataNoId._id;

            if (!deepEqual(newDataNoId, _frame[i])) {
              isNewDataTheSame = false;
              break;
            }
          }
        }

        if (!isNewDataTheSame) {
          var oldframe = [].concat(_frame);
          oldframe.length = newData.length;
          _recordIdMap = new WeakMap();

          for (var _i = 0; _i < newData.length; _i++) {
            var currNewEle = newData[_i];

            _recordIdMap.set(currNewEle, currNewEle._id);

            delete currNewEle._id;
            oldframe[_i] = currNewEle;
          }

          _frame = oldframe;

          _observableFrame.unobserve();

          _observableFrame = Observable.from(_frame);

          _observableFrame.observe(function (allChanges) {
            allChanges.forEach(function (change) {
              _observedChangeStack.push({
                type: change.type,
                path: change.path,
                value: change.value,
                _id: _recordIdMap.get(_frame[Number(change.path[0])]) // Not bringing change.object or change.oldValue

              });

              log(JSON.stringify({
                type: change.type,
                path: change.path,
                value: change.value,
                _id: _recordIdMap.get(_frame[Number(change.path[0])]) // Not bringing change.object or change.oldValue

              }));
            });
          });
        }
      };

      if (isSyncing) {
        return Promise.resolve({
          success: false,
          message: "Easybase Error: the provider is currently syncing, use 'await sync()' before calling sync() again"
        });
      }

      isSyncing = true;

      var _temp5 = function () {
        if (_isFrameInitialized) {
          var _temp6 = function () {
            if (_observedChangeStack.length > 0) {
              log("Stack change: ", _observedChangeStack);
              return Promise.resolve(tokenPost(POST_TYPES.SYNC_STACK, _extends({
                stack: _observedChangeStack
              }, _frameConfiguration))).then(function (res) {
                if (res.success) {
                  _observedChangeStack.length = 0;
                }
              });
            }
          }();

          if (_temp6 && _temp6.then) return _temp6.then(function () {});
        }
      }();

      return Promise.resolve(_temp5 && _temp5.then ? _temp5.then(_temp4) : _temp4(_temp5));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var updateRecordImage = function updateRecordImage(options) {
    return Promise.resolve(_updateRecordAttachment(options, "image"));
  };

  var updateRecordVideo = function updateRecordVideo(options) {
    return Promise.resolve(_updateRecordAttachment(options, "video"));
  };

  var updateRecordFile = function updateRecordFile(options) {
    return Promise.resolve(_updateRecordAttachment(options, "file"));
  };

  var _updateRecordAttachment = function _updateRecordAttachment(options, type) {
    try {
      var isFileFromURI = function isFileFromURI(f) {
        return f.uri !== undefined;
      };

      var _frameRecord = _frame.find(function (ele) {
        return deepEqual(ele, options.record);
      });

      if (_frameRecord === undefined || !_recordIDExists(_frameRecord)) {
        log("Attempting to add attachment to a new record that has not been synced. Please sync() before trying to add attachment.");
        return Promise.resolve({
          success: false,
          message: "Attempting to add attachment to a new record that has not been synced. Please sync() before trying to add attachment."
        });
      }

      var ext = options.attachment.name.split(".").pop().toLowerCase();
      log(ext);

      if (type === "image" && !imageExtensions.includes(ext)) {
        return Promise.resolve({
          success: false,
          message: "Image files must have a proper image extension in the file name"
        });
      }

      if (type === "video" && !videoExtensions.includes(ext)) {
        return Promise.resolve({
          success: false,
          message: "Video files must have a proper video extension in the file name"
        });
      }

      var formData = new FormData();

      if (isFileFromURI(options.attachment)) {
        formData.append("file", options.attachment);
        formData.append("name", options.attachment.name);
      } else {
        formData.append("file", options.attachment);
        formData.append("name", options.attachment.name);
      }

      var customHeaders = {
        'Eb-upload-type': type,
        'Eb-column-name': options.columnName,
        'Eb-record-id': _recordIdMap.get(_frameRecord),
        'Eb-table-name': options.tableName
      };
      return Promise.resolve(tokenPostAttachment(formData, customHeaders)).then(function (res) {
        return Promise.resolve(sync()).then(function () {
          return {
            message: res.data,
            success: res.success
          };
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var c = {
    /** +++ Will be deprecated */
    configureFrame: configureFrame,
    addRecord: addRecord,
    deleteRecord: deleteRecord,
    sync: sync,
    Frame: Frame,
    currentConfiguration: currentConfiguration,

    /** --- */
    updateRecordImage: updateRecordImage,
    updateRecordVideo: updateRecordVideo,
    updateRecordFile: updateRecordFile,
    fullTableSize: fullTableSize,
    tableTypes: tableTypes,
    Query: Query,
    signIn: signIn,
    signOut: signOut,
    signUp: signUp,
    resetUserPassword: resetUserPassword,
    setUserAttribute: setUserAttribute,
    getUserAttributes: getUserAttributes,
    db: db,
    dbEventListener: dbEventListener,
    e: e,
    setFile: setFile,
    setImage: setImage,
    setVideo: setVideo,
    forgotPassword: forgotPassword,
    forgotPasswordConfirm: forgotPasswordConfirm,
    userID: userID
  };
  return c;
}

/**
 * @async
 * Call a cloud function, created in Easybase interface.
 * @param {string} route Route as detailed in Easybase. Found under 'Deploy'. Will be in the form of ####...####-function-name.
 * @param {Record<string, any>} postBody Optional object to pass as the body of the POST request. This object will available in your cloud function's event.body.
 * @return {Promise<string>} Response from your cloud function. Detailed with a call to 'return context.succeed("RESPONSE")'.
 */
var callFunction = function callFunction(route, postBody) {
  try {
    return Promise.resolve(fetch(generateBareUrl('function', route.split("/").pop()), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody) || ""
    })).then(function (res) {
      return Promise.resolve(res.text());
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var generateBareUrl = function generateBareUrl(type, integrationID) {
  return "https://api.easybase.io/" + type + "/" + integrationID;
};

var isBadInt = function isBadInt(my_int) {
  return my_int !== undefined && my_int !== null && Math.floor(my_int) !== my_int;
};

var isBadString = function isBadString(my_string) {
  return my_string !== undefined && my_string !== null && typeof my_string !== "string";
};

var isBadIntegrationID = function isBadIntegrationID(my_string) {
  return my_string === undefined || my_string === null || typeof my_string !== "string";
};

var isBadObject = function isBadObject(my_obj) {
  return my_obj !== undefined && my_obj !== null && typeof my_obj !== "object";
};

var isBadBool = function isBadBool(my_bool) {
  return my_bool !== undefined && my_bool !== null && typeof my_bool !== "boolean";
};
/**
 *
 * @param {GetOptions} options GetOptions.
 * @returns {Promise<Array>} Array of records.
 *
 */


function get(options) {
  var defaultOptions = {
    integrationID: "",
    offset: undefined,
    limit: undefined,
    authentication: undefined,
    customQuery: undefined
  };

  var _defaultOptions$optio = _extends({}, defaultOptions, options),
      integrationID = _defaultOptions$optio.integrationID,
      offset = _defaultOptions$optio.offset,
      limit = _defaultOptions$optio.limit,
      authentication = _defaultOptions$optio.authentication,
      customQuery = _defaultOptions$optio.customQuery;

  if (isBadIntegrationID(integrationID)) throw new Error("integrationID is required and must be a string");
  if (isBadInt(offset)) throw new Error("offset must be an integer");
  if (isBadInt(limit)) throw new Error("limit must be an integer");
  if (isBadString(authentication)) throw new Error("authentication must be a string or null");
  if (isBadObject(customQuery)) throw new Error("customQuery must be an object or null");
  return new Promise(function (resolve, reject) {
    try {
      var fetch_body = {};
      if (typeof customQuery === "object") fetch_body = _extends({}, customQuery);
      if (offset !== undefined) fetch_body.offset = offset;
      if (limit !== undefined) fetch_body.limit = limit;
      if (authentication !== undefined) fetch_body.authentication = authentication;
      fetch(generateBareUrl('get', integrationID), {
        method: "POST",
        body: JSON.stringify(fetch_body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (resData) {
        if ({}.hasOwnProperty.call(resData, 'ErrorCode')) {
          console.error(resData.message);
          resolve([resData.message]);
        } else resolve(resData);
      });
    } catch (err) {
      reject(err);
    }
  });
}
/**
 *
 * @param {PostOptions} options PostOptions
 * @returns {Promise<String>} Post status.
 *
 */

function post(options) {
  var defaultValues = {
    integrationID: "",
    newRecord: {},
    authentication: undefined,
    insertAtEnd: undefined
  };

  var _defaultValues$option = _extends({}, defaultValues, options),
      integrationID = _defaultValues$option.integrationID,
      newRecord = _defaultValues$option.newRecord,
      authentication = _defaultValues$option.authentication,
      insertAtEnd = _defaultValues$option.insertAtEnd;

  if (isBadIntegrationID(integrationID)) throw new Error("integrationID is required and must be a string");
  if (isBadObject(newRecord)) throw new Error("newRecord is required and must be a string");
  if (isBadString(authentication)) throw new Error("authentication must be a string or null");
  if (isBadBool(insertAtEnd)) throw new Error("insertAtEnd must be a boolean or null");
  return new Promise(function (resolve, reject) {
    try {
      var fetch_body = _extends({}, newRecord);

      if (authentication !== undefined) fetch_body.authentication = authentication;
      if (insertAtEnd !== undefined) fetch_body.insertAtEnd = insertAtEnd;
      fetch(generateBareUrl('post', integrationID), {
        method: "POST",
        body: JSON.stringify(fetch_body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (resData) {
        if ({}.hasOwnProperty.call(resData, 'ErrorCode')) console.error(resData.message);
        resolve(resData);
      });
    } catch (err) {
      reject(err);
    }
  });
}
/**
 *
 * @param {UpdateOptions} options UpdateOptions
 * @returns {Promise<String>} Update status.
 */

function update(options) {
  var defaultValues = {
    integrationID: "",
    updateValues: {},
    authentication: undefined,
    customQuery: undefined
  };

  var _defaultValues$option2 = _extends({}, defaultValues, options),
      integrationID = _defaultValues$option2.integrationID,
      updateValues = _defaultValues$option2.updateValues,
      authentication = _defaultValues$option2.authentication,
      customQuery = _defaultValues$option2.customQuery;

  if (isBadIntegrationID(integrationID)) throw new Error("integrationID is required and must be a string");
  if (isBadObject(updateValues) || updateValues === undefined) throw new Error("updateValues is required and must be a string");
  if (isBadString(authentication)) throw new Error("authentication must be a string or null");
  if (isBadObject(customQuery)) throw new Error("customQuery must be an object or null");
  return new Promise(function (resolve, reject) {
    try {
      var fetch_body = _extends({
        updateValues: updateValues
      }, customQuery);

      if (authentication !== undefined) fetch_body.authentication = authentication;
      fetch(generateBareUrl('update', integrationID), {
        method: "POST",
        body: JSON.stringify(fetch_body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (resData) {
        if ({}.hasOwnProperty.call(resData, 'ErrorCode')) console.error(resData.message);
        resolve(resData.message);
      });
    } catch (err) {
      reject(err);
    }
  });
}
/**
 *
 * @param {DeleteOptions} options DeleteOptions
 * @return {Promise<String>} Delete status.
 */

function Delete(options) {
  var defaultValues = {
    integrationID: "",
    authentication: undefined,
    customQuery: undefined
  };

  var _defaultValues$option3 = _extends({}, defaultValues, options),
      integrationID = _defaultValues$option3.integrationID,
      authentication = _defaultValues$option3.authentication,
      customQuery = _defaultValues$option3.customQuery;

  if (isBadIntegrationID(integrationID)) throw new Error("integrationID is required and must be a string");
  if (isBadString(authentication)) throw new Error("authentication must be a string or null");
  if (isBadObject(customQuery)) throw new Error("customQuery must be an object or null");
  return new Promise(function (resolve, reject) {
    try {
      var fetch_body = _extends({}, customQuery);

      if (authentication !== undefined) fetch_body.authentication = authentication;
      fetch(generateBareUrl('delete', integrationID), {
        method: "POST",
        body: JSON.stringify(fetch_body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (resData) {
        if ({}.hasOwnProperty.call(resData, 'ErrorCode')) console.error(resData.message);
        resolve(resData.message);
      });
    } catch (err) {
      reject(err);
    }
  });
}

exports.Delete = Delete;
exports.EasybaseProvider = EasybaseProvider;
exports.callFunction = callFunction;
exports.get = get;
exports.post = post;
exports.update = update;
//# sourceMappingURL=index.js.map
