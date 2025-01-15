/** The name of a carrier, used when requesting rates */
export enum CarrierName {
    /** UPS */
    UPS = "UPS",
    /** USPS */
    USPS = "USPS",
    /** DHL */
    DHL = "DHL",
    /** FedEx */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    FedEx = "FedEx",
}

/**
 * Interface version of {@link Carrier}
 *
 * @internal
 */
export interface CarrierInterface {
    /** The carrier's id in the Shipgenius OMS database */
    readonly id: string;
    /** The carrier's name */
    readonly name: CarrierName;
    /** A brief description of the carrier */
    readonly description: string | null;
}

/** A mail carrier */
export default class Carrier implements CarrierInterface {
    public readonly id: string;
    public readonly name: CarrierName;
    public readonly description: string | null;

    /** @hidden */
    constructor(data: CarrierInterface) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
    }
}
