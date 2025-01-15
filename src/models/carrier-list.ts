import Carrier, { CarrierInterface } from "./carrier.js";

/**
 * Interface version of {@link CarrierList}
 *
 * @internal
 */
export interface CarrierListInterface {
    /** The list of carriers returned */
    readonly carriers: CarrierInterface[];
}

/**
 * A list of carriers
 *
 * This is a class in case extra metadata fields are added later
 */
export default class CarrierList implements CarrierListInterface {
    public readonly carriers: Carrier[];

    /** @hidden */
    constructor({ carriers }: CarrierListInterface) {
        this.carriers = carriers.map((carrier) => new Carrier(carrier));
    }
}
