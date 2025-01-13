/**
 * Various Typescript type definitions used throughout the package
 *
 * @module
 */

/** A JSON primitive value */
export type JsonPrimitive = string | number | boolean | null;
/** A JSON object value, with `undefined` allowed because it gets stripped by {@link JSON.parse} */
export type JsonObject = { [field_name: string]: JsonValue | undefined };
/** A JSON array value */
export type JsonArray = Array<JsonValue>;
/** A value that can be passed to {@link JSON.stringify} */
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

/**
 * A list or single item, since GraphQL supports that for all list inputs
 *
 * @typeParam T - The input that that can be used raw or as a list
 */
export type GraphqlList<T> = T | T[];

/**
 * From https://stackoverflow.com/a/71131506
 *
 * Licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
 *
 * @author grahamaj
 * ({@link https://stackoverflow.com/users/5666581/grahamaj | Stackoverflow profile})
 *
 */
export type Explode<T> = keyof T extends infer K ? (K extends unknown ? { [I in keyof T]: I extends K ? T[I] : never } : never) : never;
/**
 * From https://stackoverflow.com/a/71131506
 *
 * Licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
 *
 * @author grahamaj
 * ({@link https://stackoverflow.com/users/5666581/grahamaj | Stackoverflow profile})
 *
 */
export type AtMostOne<T> = Explode<Partial<T>>;
/**
 * From https://stackoverflow.com/a/71131506
 *
 * Licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
 *
 * @author grahamaj
 * ({@link https://stackoverflow.com/users/5666581/grahamaj | Stackoverflow profile})
 *
 */
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
/**
 * From https://stackoverflow.com/a/71131506
 *
 * Licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
 *
 * @author grahamaj
 * ({@link https://stackoverflow.com/users/5666581/grahamaj | Stackoverflow profile})
 *
 */
export type ExactlyOne<T> = AtMostOne<T> & AtLeastOne<T>;
/**
 * Enforces that exactly one key is specified
 */
export type OneOf<T> = ExactlyOne<T>;
