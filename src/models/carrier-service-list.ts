import CarrierService, { CarrierServiceInterface } from "./carrier-service.js";

/**
 * Interface version of {@link CarrierServiceList}
 *
 * @internal
 */
export interface CarrierServiceListInterface {
    /** The list of carrier services returned */
    services: readonly CarrierServiceInterface[];
}

/**
 * A list of carrier services
 *
 * This is a class in case extra metadata fields are added later
 */
export default class CarrierServiceList implements CarrierServiceListInterface {
    public services: readonly CarrierService[];

    /** @hidden */
    constructor({ services }: CarrierServiceListInterface) {
        this.services = services.map((service) => new CarrierService(service));
    }
}
