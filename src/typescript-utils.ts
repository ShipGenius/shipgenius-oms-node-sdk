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
