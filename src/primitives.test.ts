import { describe, test, expect } from "vitest";
import { end, just } from "primitives";

describe("end", () => {
	test("should return ok if input is empty", () => {
		expect(end().parse("")).toEqual(null)
	})
	test("should return err if input is not empty", () => {
		expect(end().parseFalible("a")).toMatchObject({
			result: 'err',
			error: "End not reached"
		})
	})
});

describe("just", () => {
	test("should return ok if input is equal to pattern", () => {
		const p = just("a")
		expect(p.parse("a")).toEqual("a")
	});
	test("should return err if input is not equal to pattern", () => {
		const p = just<string>("a")
		expect(p.parseFalible("b")).toMatchObject({
			result: 'err',
			error: "Expected a but got b"
		})
	});
	test("should return err if input is shorter than pattern", () => {
		const p = just<string>("ab")
		expect(p.parseFalible("a")).toMatchObject({
			result: 'err',
			error: "Expected ab but got a"
		})
	});

	test("return value and rest", () => {
		const p = just("ab" as string)
		expect(p.parseFalible("abc")).toMatchObject({
			result: 'ok',
			data: "ab",
			rest: "c"
		})
	});

	test("arrays", () => {
		const p = just([{ a: 'c' }]);
		expect(p.parse([
			{ a: 'c' },
			{ a: 'b' },
		]))
			.toMatchObject([{
				a: 'c'
			}])
	});
});