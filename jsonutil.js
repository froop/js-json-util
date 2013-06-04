/*
 * jsonutil.js - JSON utilities.
 *
 * Created by froop http://github.com/froop/js-json-util
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
