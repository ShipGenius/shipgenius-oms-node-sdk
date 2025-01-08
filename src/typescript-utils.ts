export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [member: string]: JsonValue | undefined };
export type JsonArray = Array<JsonValue>;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type GraphqlList<T> = T | T[];
