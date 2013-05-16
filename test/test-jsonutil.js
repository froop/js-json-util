(function () {
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

	test("clone", function () {
		var result = JsonUtil.clone(JSON_DATA1);

		notEqual(result, JSON_DATA1);
		deepEqual(result, JSON_DATA1);
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
})();
