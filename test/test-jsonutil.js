(function () {
	"use strict";

	var JSON_DATA1 = {
		prop1: "value1",
		prop2: "value2"
	};
	var JSON_DATA2 = {
		prop1: "value1b",
		prop2: "value2b"
	};

	module("JsonUtil", {
		setup: function () {
		}
	});

	test("clone object", function () {
		var result = JsonUtil.clone(JSON_DATA1);

		notEqual(result, JSON_DATA1);
		deepEqual(result, JSON_DATA1);
	});

	test("clone array", function () {
		var array = [JSON_DATA1, JSON_DATA2];
		var result = JsonUtil.clone(array);

		notEqual(result, array);
		deepEqual(result, array);
	});

	test("clone nest", function () {
		var data = {
			prop1: "value1",
			prop2: {
				prop21: "value21",
				prop22: "value22"
			}
		};
		var result = JsonUtil.clone(data);

		notEqual(result.prop2, data.prop2);
		deepEqual(result, data);
	});

	test("clone undefined", function () {
		var result = JsonUtil.clone({
			prop1: undefined,
			prop2: null
		});

		deepEqual(result, {
			prop1: undefined,
			prop2: null
		});
	});

	test("clone invalid", function () {
		expect(1);

		try {
			JsonUtil.clone(1);

		} catch (e) {
			equal(e.message, "invalid type: number");
		}
	});

	test("extractNotUndef object", function () {
		var result = JsonUtil.extractNotUndef(JSON_DATA1);

		notEqual(result, JSON_DATA1);
		deepEqual(result, JSON_DATA1);
	});

	test("extractNotUndef array", function () {
		var array = [JSON_DATA1, JSON_DATA2];
		var result = JsonUtil.extractNotUndef(array);

		notEqual(result, array);
		deepEqual(result, array);
	});

	test("extractNotUndef undefined", function () {
		var result = JsonUtil.extractNotUndef({
			prop1: undefined,
			prop2: null
		});

		deepEqual(result, {
			prop2: null
		});
	});

	test("alias frist", function () {
		var result = JsonUtil.alias(JSON_DATA1, {
			prop1: "alias1"
		});

		deepEqual(result, {
			alias1: "value1",
			prop2: "value2"
		});
	});

	test("alias last", function () {
		var result = JsonUtil.alias(JSON_DATA1, {
			prop2: "alias2"
		});

		deepEqual(result, {
			prop1: "value1",
			alias2: "value2"
		});
	});

	test("alias all", function () {
		var result = JsonUtil.alias(JSON_DATA1, {
			prop1: "alias1",
			prop2: "alias2"
		});

		deepEqual(result, {
			alias1: "value1",
			alias2: "value2"
		});
	});

	test("alias empty", function () {
		var result = JsonUtil.alias({}, {
			prop1: "alias1"
		});

		deepEqual(result, {});
	});

	test("alias not exists", function () {
		var result = JsonUtil.alias(JSON_DATA1, {
			prop0: "alias0",
			prop1: "alias1"
		});

		deepEqual(result, {
			alias1: "value1",
			prop2: "value2"
		});
	});

//TODO
//	test("alias delete by null", function () {
//		var result = JsonUtil.alias(JSON_DATA1, {
//			prop1: null
//		});
//
//		deepEqual(result, {
//			prop2: "value2"
//		});
//	});
//
//	test("alias delete by undefined", function () {
//		var result = JsonUtil.alias(JSON_DATA1, {
//			prop2: undefined
//		});
//
//		deepEqual(result, {
//			prop1: "value1"
//		});
//	});

	test("aliasList", function () {
		var result = JsonUtil.aliasList([JSON_DATA1, JSON_DATA2], {
			prop1: "alias1"
		});

		deepEqual(result, [{
			alias1: "value1",
			prop2: "value2"
		}, {
			alias1: "value1b",
			prop2: "value2b"
		}]);
	});

	test("extract first", function () {
		var result = JsonUtil.extract(JSON_DATA1, ["prop1"]);

		deepEqual(result, {
			prop1: "value1"
		});
	});

	test("extract last", function () {
		var result = JsonUtil.extract(JSON_DATA1, ["prop2"]);

		deepEqual(result, {
			prop2: "value2"
		});
	});

	test("extract all", function () {
		var result = JsonUtil.extract(JSON_DATA1, ["prop1", "prop2"]);

		deepEqual(result, {
			prop1: "value1",
			prop2: "value2"
		});
	});

	test("extract empty", function () {
		var result = JsonUtil.extract(JSON_DATA1, []);

		deepEqual(result, {});
	});

	test("extract not exists", function () {
		var result = JsonUtil.extract(JSON_DATA1, ["prop3"]);

		deepEqual(result, {
			prop3: undefined
		});
	});
})();
