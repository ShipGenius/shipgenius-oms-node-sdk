import CarrierService, { CarrierServiceInterface } from "./carrier-service.js";

/**
 * Interface version of {@link CarrierServiceList}
 *
 * @internal
 */
export interface CarrierServiceListInterface {
    /** The list of carrier services returned */
    readonly services: CarrierServiceInterface[];
}

/**
 * A list of carrier services
 *
 * This is a class in case extra metadata fields are added later
 */
export default class CarrierServiceList implements CarrierServiceListInterface {
    public readonly services: CarrierService[];

    /** @hidden */
    constructor({ services }: CarrierServiceListInterface) {
        this.services = services.map((service) => new CarrierService(service));
    }
}
