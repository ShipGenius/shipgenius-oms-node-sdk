/**
 * The client object used to connect to the
 * Shipgenius OMS API
 *
 * Default export is {@link ShipGeniusOmsClient}
 *
 * @module @shipgenius/oms/client
 */

import ShipGeniusOmsClient from "./client.js";
export default ShipGeniusOmsClient;
export * from "./client-types.js";
/**
 * Internal-use interfaces describing raw GQL input/output values
 *
 * @internal
 */
export * as gql_types from "./gql-types.js";
