import CarrierService, { CarrierServiceData } from "./carrier-service.js";

export interface CarrierServiceListData {
    /** The list of carrier services returned */
    services: readonly CarrierServiceData[];
}

/**
 * A list of carrier services
 *
 * This is a class in case extra metadata fields are added later
 */
export default class CarrierServiceList implements CarrierServiceListData {
    public services: readonly CarrierService[];

    constructor({ services }: CarrierServiceListData) {
        this.services = services.map((service) => new CarrierService(service));
    }
}
