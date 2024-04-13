{
	const getProxy = App.Utils.Diff.getProxy;

	App.Testing.executeTest("Overwrite first level", () => {
	}, () => {
		let proxy = getProxy({a: 1});

		proxy.a = 2;

		const original = proxy.diffOriginal;

		App.Testing.equals(original, {a: 1});
		App.Testing.equals(proxy.a, 2);

		App.Utils.Diff.applyDiff(original, proxy.diffChange);
		App.Testing.equals(original, {a: 2});
	}, () => {
	});

	App.Testing.executeTest("Overwrite second level", () => {
	}, () => {
		let proxy = getProxy({c: {a: 1}});

		proxy.c.a = 2;

		const original = proxy.diffOriginal;

		App.Testing.equals(original, {c: {a: 1}});
		App.Testing.equals(proxy.c.a, 2);

		App.Utils.Diff.applyDiff(original, proxy.diffChange);
		App.Testing.equals(original, {c: {a: 2}});
	}, () => {
	});

	App.Testing.executeTest("Delete first level", () => {
	}, () => {
		let proxy = getProxy({a: 1});

		delete proxy.a;

		const original = proxy.diffOriginal;

		App.Testing.equals(original, {a: 1});
		App.Testing.hasNoProperty(proxy, "a");

		App.Utils.Diff.applyDiff(original, proxy.diffChange);
		App.Testing.equals(original, {});
	}, () => {
	});

	App.Testing.executeTest("Delete in second level", () => {
	}, () => {
		let proxy = getProxy({c: {a: 1}});

		delete proxy.c.a;

		const original = proxy.diffOriginal;

		App.Testing.equals(original, {c: {a: 1}});
		App.Testing.hasProperty(proxy, "c");
		App.Testing.hasNoProperty(proxy.c, "a");

		App.Utils.Diff.applyDiff(original, proxy.diffChange);
		App.Testing.equals(original, {c: {}});
	}, () => {
	});

	App.Testing.executeTest("Delete with second level", () => {
	}, () => {
		let proxy = getProxy({c: {a: 1}});

		delete proxy.c;

		const original = proxy.diffOriginal;

		App.Testing.equals(original, {c: {a: 1}});
		App.Testing.hasNoProperty(proxy, "c");

		App.Utils.Diff.applyDiff(original, proxy.diffChange);
		App.Testing.equals(original, {});
	}, () => {
	});

	App.Testing.executeTest("add value", () => {
	}, () => {
		let proxy = getProxy({});

		proxy.d = 7;

		const original = proxy.diffOriginal;

		App.Testing.equals(original, {});
		App.Testing.hasProperty(proxy, "d");
		App.Testing.equals(proxy.d, 7);

		App.Utils.Diff.applyDiff(original, proxy.diffChange);
		App.Testing.equals(original, {d: 7});
	}, () => {
	});

	App.Testing.executeTest("add object", () => {
	}, () => {
		let proxy = getProxy({});

		proxy.d = {a: 5};

		const original = proxy.diffOriginal;

		App.Testing.equals(original, {});
		App.Testing.hasProperty(proxy, "d");
		App.Testing.hasProperty(proxy.d, "a");
		App.Testing.equals(proxy.d.a, 5);

		App.Utils.Diff.applyDiff(original, proxy.diffChange);
		App.Testing.equals(original, {d: {a: 5}});
	}, () => {
	});

	App.Testing.executeTest("Overwrite array entry", () => {
	}, () => {
		let proxy = getProxy({b: [1, 2]});

		proxy.b[1] = 5;

		const original = proxy.diffOriginal;

		App.Testing.equals(original, {b: [1, 2]});
		App.Testing.equals(proxy.b, [1, 5]);

		App.Utils.Diff.applyDiff(original, proxy.diffChange);
		App.Testing.equals(original, {b: [1, 5]});
	}, () => {
	});

	App.Testing.executeTest("array push", () => {
	}, () => {
		let proxy = getProxy({b: [1, 2]});

		proxy.b.push(5);

		const original = proxy.diffOriginal;

		App.Testing.equals(original, {b: [1, 2]});
		App.Testing.equals(proxy.b, [1, 2, 5]);

		App.Utils.Diff.applyDiff(original, proxy.diffChange);
		App.Testing.equals(original, {b: [1, 2, 5]});
	}, () => {
	});

	App.Testing.executeTest("array pop", () => {
	}, () => {
		let proxy = getProxy({b: [1, 2]});

		proxy.b.pop();

		const original = proxy.diffOriginal;

		App.Testing.equals(original, {b: [1, 2]});
		App.Testing.equals(proxy.b, [1]);

		App.Utils.Diff.applyDiff(original, proxy.diffChange);
		App.Testing.equals(original, {b: [1]});
	}, () => {
	});

	App.Testing.executeTest("new array unshift", () => {
	}, () => {
		let proxy = getProxy({});

		proxy.d = {a: [5]};
		proxy.d.a.unshift(9);

		const original = proxy.diffOriginal;

		App.Testing.equals(original, {});
		App.Testing.hasProperty(proxy.d, "a");
		App.Testing.equals(proxy.d.a, [9, 5]);

		App.Utils.Diff.applyDiff(original, proxy.diffChange);
		App.Testing.equals(original, {d: {a: [9, 5]}});
	}, () => {
	});


	App.Testing.executeTest("remove one eye", () => {
	}, () => {
		let proxy = getProxy({eye: new App.Entity.EyeState()});

		eyeSurgery(proxy, "left", "remove");

		const original = proxy.diffOriginal;

		App.Testing.equals(original, {eye: new App.Entity.EyeState()});
		App.Testing.equals(proxy.eye.left, null);

		App.Utils.Diff.applyDiff(original, proxy.diffChange);
		App.Testing.equals(original.eye.left, null);
	}, () => {
	});

	App.Testing.executeTest("remove both eyes", () => {
	}, () => {
		let proxy = getProxy({eye: new App.Entity.EyeState()});

		eyeSurgery(proxy, "both", "remove");

		const original = proxy.diffOriginal;

		App.Testing.equals(original, {eye: new App.Entity.EyeState()});
		App.Testing.equals(proxy.eye.left, null);
		App.Testing.equals(proxy.eye.right, null);

		App.Utils.Diff.applyDiff(original, proxy.diffChange);
		App.Testing.equals(original.eye.left, null);
		App.Testing.equals(original.eye.right, null);
	}, () => {
	});

	// Do this last
	App.Testing.unitDone();
}
