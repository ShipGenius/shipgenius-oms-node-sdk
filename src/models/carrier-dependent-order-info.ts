import { JsonObject } from "../typescript-utils.js";

export default interface CarrierDependentOrderInfo extends JsonObject {
    /** Instructions to the delivery driver on how to deliver the package */
    delivery_instructions?: string | null;
}
