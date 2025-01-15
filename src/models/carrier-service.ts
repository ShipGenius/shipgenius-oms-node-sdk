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
    readonly id: string;
    /** The user-facing name of the service */
    readonly name: string;
    /** The code used to specify the service when rating and shippiong */
    readonly code: string;
    /** Whether retail (non-business) accounts can use the service */
    readonly enabled_for_retail_user: boolean;
    /** The destinations the service handles */
    readonly shipping_region_type: ShippingRegionType;
    /** A brief description of the service */
    readonly description: string | null;

    /** Information about the carrier that offers the service */
    readonly carrier: Carrier | null;
}

/** A supported shipping service */
export default class CarrierService implements CarrierServiceInterface {
    public readonly id: string;
    public readonly name: string;
    public readonly code: string;
    public readonly enabled_for_retail_user: boolean;
    public readonly shipping_region_type: ShippingRegionType;
    public readonly description: string | null;
    public readonly carrier: Carrier | null;

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
