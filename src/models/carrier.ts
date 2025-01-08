/** The name of a carrier, used when requesting rates */
export enum CarrierName {
    UPS = "UPS",
    USPS = "USPS",
    DHL = "DHL",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    FedEx = "FedEx",
}

export interface CarrierData {
    /** The carrier's id in the Shipgenius OMS database */
    id: string;
    /** The carrier's name */
    name: CarrierName;
    /** A brief description of the carrier */
    description: string | null;
}

/** A mail carrier */
export default class Carrier implements CarrierData {
    public id: string;
    public name: CarrierName;
    public description: string | null;

    constructor(data: CarrierData) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
    }
}
