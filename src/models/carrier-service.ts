import Carrier from "./carrier.js";

/** Where a service can ship from and to */
export enum ShippingRegionType {
    /** From a US location to a US location */
    US_DOMESTIC = "US_DOMESTIC",
    /** From a Canada location to a Canada location */
    CANADA_DOMESTIC = "CANADA_DOMESTIC",
    /** From a US location to a non-US location */
    INTERNATIONAL_FROM_US = "INTERNATIONAL_FROM_US",
}

/**
 * Interface version of {@link CarrierService}
 *
 * @internal
 */
export interface CarrierServiceInterface {
    /** The service's id the the Shipgenius OMS database */
    id: string;
    /** The user-facing name of the service */
    name: string;
    /** The code used to specify the service when rating and shippiong */
    code: string;
    /** Whether retail (non-business) accounts can use the service */
    enabled_for_retail_user: boolean;
    /** The destinations the service handles */
    shipping_region_type: ShippingRegionType;
    /** A brief description of the service */
    description: string | null;

    /** Information about the carrier that offers the service */
    carrier: Carrier | null;
}

/** A supported shipping service */
export default class CarrierService implements CarrierServiceInterface {
    public id: string;
    public name: string;
    public code: string;
    public enabled_for_retail_user: boolean;
    public shipping_region_type: ShippingRegionType;
    public description: string | null;
    public carrier: Carrier | null;

    /** @hidden */
    constructor(data: CarrierServiceInterface) {
        this.id = data.id;
        this.name = data.name;
        this.code = data.code;
        this.enabled_for_retail_user = data.enabled_for_retail_user;
        this.shipping_region_type = data.shipping_region_type;
        this.description = data.description;
        this.carrier = data.carrier === null ? null : new Carrier(data.carrier);
    }
}
