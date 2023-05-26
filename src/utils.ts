import type { Parser, Result, ParseOutPrimitive } from "types"

export const toParser = <TIn, TOut>(fn: (i: TIn) => ParseOutPrimitive<TIn, TOut, string>): Parser<TOut, TIn> => {
	return {
		parse: (input: TIn) => {
			const res = fn(input);
			if (res.result === 'ok') return res.data;
			throw new Error(res.error);
		},
		parseFalible: fn
	}
}