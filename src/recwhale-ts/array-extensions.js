"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
var promise_helper_1 = require("./promise-helper");
//region manipulation
Array.prototype.firstOrDefault = function () {
    return this.length ? this[0] : undefined;
};
Array.prototype.last = function () {
    return this[this.length - 1];
};
Array.prototype.distinct = function () {
    return __spreadArray([], new Set(this), true);
};
Array.prototype.empty = function (fallbackItems) {
    return this.length ? this : fallbackItems;
};
Array.prototype.sortBy = function (keySelector, desc) {
    return this.sort(function (a, b) {
        var keyA = keySelector(a);
        var keyB = keySelector(b);
        var comparison = keyA < keyB ? -1
            : keyA > keyB ? 1
                : 0;
        return desc ? -comparison : comparison;
    });
};
Array.prototype.sortByEnumOrder = function (type, keySelector, desc) {
    var order = Object.values(type);
    return this.sortBy(function (x) { return order.indexOf(keySelector(x)); }, desc);
};
Array.prototype.chunk = function (count) {
    var chunk = [];
    for (var i = 0; i < this.length; i += count)
        chunk.push(this.slice(i, i + count));
    return chunk;
};
Array.prototype["delete"] = function (keySelector) {
    var index = this.findIndex(keySelector);
    if (index >= 0)
        this.splice(index, 1);
    return this;
};
Array.prototype.sum = function (keySelector) {
    return this.reduce(function (sum, x) {
        var _a;
        var n = (_a = keySelector === null || keySelector === void 0 ? void 0 : keySelector(x)) !== null && _a !== void 0 ? _a : x;
        return sum + n;
    }, 0);
};
Array.prototype.max = function (keySelector, defaultValue) {
    var _a;
    return (_a = this.reduce(function (all, x) {
        var key = keySelector(x);
        return !all || all < key ? key : all;
    }, undefined)) !== null && _a !== void 0 ? _a : defaultValue;
};
//end region
//region transformation
Array.prototype.mapStrict = function (selector) {
    return this.reduce(function (all, x) {
        var item = selector(x);
        if (item != null)
            all.push(item);
        return all;
    }, []);
};
Array.prototype.cast = function () {
    return this.map(function (x) { return x; });
};
Array.prototype.ofType = function (type) {
    return this.filter(function (x) { return x instanceof type; }).cast();
};
Array.prototype.groupBy = function (keySelector, deepCompare) {
    if (deepCompare) {
        var map = this.groupBy(function (x) { return JSON.stringify(keySelector(x)); });
        return map.mapKey(function (k) { return JSON.parse(k); });
    }
    return this.reduce(function (all, x) {
        var key = keySelector(x);
        var item = all.get(key);
        item ? item.push(x)
            : all.set(key, [x]);
        return all;
    }, new Map());
};
Array.prototype.toMap = function (keySelector) {
    return new Map(this.map(function (x) { return [keySelector(x), x]; }));
};
Array.prototype.toFlatSet = function (keysSelector) {
    var keys = new Set();
    this.forEach(function (x) {
        var itemKeys = keysSelector(x);
        itemKeys.forEach(function (k) { return keys.add(k); });
    });
    return keys;
};
//end region
//region parallel
Array.prototype.mapParallel = function (count, action) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, promise_helper_1.runParallel)(count, this, action)];
        });
    });
};
//end region
