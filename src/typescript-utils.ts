/** A JSON primitive value */
export type JsonPrimitive = string | number | boolean | null;
/** A JSON object value, with `undefined` allowed because it gets stripped by JSON.parse */
export type JsonObject = { [member: string]: JsonValue | undefined };
/** A JSON array value */
export type JsonArray = Array<JsonValue>;
/** A value that can be passed to JSON.stringify */
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

/**
 * A list or single item, since GraphQL supports that for all list inputs
 */
export type GraphqlList<T> = T | T[];
