/**
 * SDK for interacting with the Shipgenius OMS API
 *
 * Default Export: {@link ShipGeniusOmsClient}
 * 
 * {@link testing}
 *
 * @module @shipgenius/oms
 */

import ShipGeniusOmsClient from "./client/index.js";
export default ShipGeniusOmsClient;
/** Types and helpers for {@link ShipGeniusOmsClient} */
export * as client from "./client/index.js";
/** Interfaces and classes describing the input and output types for the API  */
export * as models from "./models/index.js";
export * as type_helpers from "./typescript-utils.js";
