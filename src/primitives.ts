import _ from "lodash";
import { toParser } from "utils";

export const end = <TIn extends string | unknown[]>() => toParser<TIn, null>((input: TIn) => {
	if (input.length == 0) {
		return {
			result: 'ok',
			data: null,
			rest: input
		}
	} else {
		return {
			result: 'err',
			error: "End not reached"
		}
	}
})

export const just = <T extends string | unknown[] = string>(pattern: T) => toParser<T, T>((input: T) => {
	if (pattern.length > input.length) {
		return {
			result: 'err',
			error: `Expected ${pattern} but got ${input}`
		}
	} else {
		const rest = input.slice(pattern.length) as T;
		const data = input.slice(0, pattern.length) as T;
		if (_.isEqual(pattern, data)) {
			return {
				result: 'ok',
				data,
				rest
			}
		} else {
			return {
				result: 'err',
				error: `Expected ${pattern} but got ${input}`
			}
		}
	}
});