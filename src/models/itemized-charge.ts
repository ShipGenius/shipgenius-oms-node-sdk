/** The type of reason a for a charge */
export enum ChargeType {
    /** The base charge of the shipment */
    BASE_CHARGE = "BASE_CHARGE",
    /** Our fee - will be tagged outside of integrations */
    FACILITATOR_FEE = "FACILITATOR_FEE",
    /** Charges related to expedited shipments */
    EXPEDITED_CHARGE = "EXPEDITED_CHARGE",
    /** Charges for fuel */
    FUEL_SURCHARGE = "FUEL_SURCHARGE",
    /** Charges for hazmat handling */
    HAZMAT_HANDLING = "HAZMAT_HANDLING",
    /** Extra charges for oversized packages */
    OVERSIZE_FEE = "OVERSIZE_FEE",
    /** Extra fees for corrections the carrier had to make to provided information */
    CARRIER_CORRECTION_FEE = "CARRIER_CORRECTION_FEE",
    /** Extra charges for deliveries to specific regions */
    DESTINATION_SURCHARGE = "DESTINATION_SURCHARGE",
    /** Extra charges due to high demand */
    DEMAND_SURCHARGE = "DEMAND_SURCHARGE",
    /** Charges for tracking */
    TRACKING = "TRACKING",
    /** Charges for insurance */
    INSURANCE = "INSURANCE",
    /** Charges for delivering on a weekend */
    WEEKEND_DELIVERY = "WEEKEND_DELIVERY",
    /** Other charges not otherwise specified */
    OTHER = "OTHER",
}

/**
 * Interface version of {@link ItemizedCharge}
 *
 * @internal
 */
export interface ItemizedChargeInterface {
    /** The type of reason given for an itemized charge */
    code: ChargeType;
    /** The code the carrier uses to represent the charge type, if applicable */
    carrier_charge_code: string | null;
    /** The carrier's description of the charge, if applicable */
    carrier_charge_description: string | null;
    /** The amount of the charge as a Decimal */
    charge_amount: `${number}`;
}

/** A line item on a list of itemized charges */
export default class ItemizedCharge implements ItemizedChargeInterface {
    public code: ChargeType;
    public carrier_charge_code: string | null;
    public carrier_charge_description: string | null;
    public charge_amount: `${number}`;

    /** @hidden */
    constructor(data: ItemizedChargeInterface) {
        this.code = data.code;
        this.carrier_charge_code = data.carrier_charge_code;
        this.carrier_charge_description = data.carrier_charge_description;
        this.charge_amount = data.charge_amount;
    }
}
