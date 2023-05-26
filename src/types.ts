
export type ParseOutPrimitive<TIn, TOut, TErr> = { result: 'ok', data: TOut, rest: TIn } | { result: 'err', error: TErr };
export type Result<TOk, TErr> = { result: 'ok', data: TOk } | { result: 'err', error: TErr };

export type Parser<TOut, TIn = string, TError = unknown> = {
	parse: (input: TIn) => TOut;
	parseFalible: (input: TIn) => Result<TOut, TError>
}
