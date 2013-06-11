/*
 * jsonutil.js - JSON utilities.
 *
 * Copyright (c) 2013 froop http://github.com/froop/js-json-util
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global JSON */
var JsonUtil = {};

(function () {
	"use strict";

	/**
	 * @returns deep copied object
	 */
	JsonUtil.clone = function (source) {
		function isArray(something) {
			return something instanceof Array;
		}
		function isObject(something) {
			return something instanceof Object;
		}
		function isNest(something) {
			return (something !== null && isObject(something)) ||
					isArray(something);
		}

		function cloneArray() {
			var res = [];
			var idx, item, length = source.length;
			for (idx = 0; idx < length; idx++) {
				item = source[idx];
				if (isNest(item)) {
					res[idx] = JsonUtil.clone(item);
				} else {
					res[idx] = item;
				}
			}
			return res;
		}

		function cloneObject() {
			var res = {};
			var key = "";
			var item = null;
			for (key in source) {
				item = source[key];
				if (isNest(item)) {
					res[key] = JsonUtil.clone(item);
				} else {
					res[key] = item;
				}
			}
			return res;
		}

		if (isArray(source)) {
			return cloneArray();
		} else if (isObject(source)) {
			return cloneObject();
		} else {
			throw Error("invalid type: " + typeof source);
		}
	};

	/**
	 * @returns deep copied object
	 */
	JsonUtil.extractNotUndef = function (source) {
		return JSON.parse(JSON.stringify(source));
	};

	JsonUtil.alias = function (obj, map) {
		var res = JsonUtil.clone(obj);
		var key = "";

		for (key in map) {
			if (!res[key]) {
				continue;
			}
			res[map[key]] = res[key];
			delete res[key];
		}

		return res;
	};

	JsonUtil.aliasList = function (list, map) {
		var res = [];
		var idx, length = list.length;

		for (idx = 0; idx < length; idx++) {
			res[idx] = JsonUtil.alias(list[idx], map);
		}

		return res;
	};

	JsonUtil.extract = function (obj, list) {
		var res = {};
		var idx = 0;
		var length = list.length;

		for (idx = 0; idx < length; idx++) {
			var key = list[idx];
			res[key] = obj[key];
		}

		return res;
	};
})();
