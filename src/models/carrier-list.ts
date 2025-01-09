import Carrier, { CarrierInterface } from "./carrier.js";

/** Interface version of {@link CarrierList} */
export interface CarrierListInterface {
    /** The list of carriers returned */
    carriers: readonly CarrierInterface[];
}

/**
 * A list of carriers
 *
 * This is a class in case extra metadata fields are added later
 */
export default class CarrierList implements CarrierListInterface {
    public carriers: readonly Carrier[];

    constructor({ carriers }: CarrierListInterface) {
        this.carriers = carriers.map((carrier) => new Carrier(carrier));
    }
}
