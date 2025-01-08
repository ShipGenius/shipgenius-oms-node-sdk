import { GraphqlList, JsonObject } from "../typescript-utils.js";

/** Base interface for addresses entered into the API */
export default interface AddressInput extends JsonObject {
    /** The street address. Note that most carriers will only accept the first two lines. */
    street: GraphqlList<string>;
    /** The city the address is in. */
    city: string;
    /** Whether the address is residential or commercial */
    residential?: boolean | null;
}
