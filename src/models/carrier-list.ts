import Carrier, { CarrierData } from "./carrier.js";

export interface CarrierListData {
    /** The list of carriers returned */
    carriers: readonly CarrierData[];
}

/**
 * A list of carriers
 *
 * This is a class in case extra metadata fields are added later
 */
export default class CarrierList implements CarrierListData {
    public carriers: readonly Carrier[];

    constructor({ carriers }: CarrierListData) {
        this.carriers = carriers.map((carrier) => new Carrier(carrier));
    }
}
